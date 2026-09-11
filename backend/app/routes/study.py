from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException,
)

from pathlib import Path
from fastapi.responses import FileResponse

from app.services.tts_service import generate_audio_lesson
from app.services.claude_service import (
    clean_transcript,
    translate_transcript,
    align_transcript_to_slides,
    generate_aligned_smart_notes,
    generate_quiz,
    generate_podcast_script,
)
from app.services.tts_service import generate_audio_lesson
from app.services.transcription import transcribe_audio
from app.services.pdf_extractor import extract_pdf_pages

from pydantic import BaseModel

from app.services.claude_service import (
    clean_transcript,
    translate_transcript,
    align_transcript_to_slides,
    generate_aligned_smart_notes,
)


router = APIRouter(prefix="/study", tags=["Study Pack"])
ALLOWED_AUDIO_TYPES = {
    "audio/mpeg",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/x-m4a",
    "video/mp4",
}


class SlidePage(BaseModel):
    page_number: int
    text: str

class SmartNotesRequest(BaseModel):
    transcript: str
    slide_text: str

class SlideAlignmentRequest(BaseModel):
    transcript: str
    pages: list[SlidePage]

class AlignmentItem(BaseModel):
    page_number: int
    slide_title: str
    matched: bool
    professor_explanation: str
    professor_additions: list[str]


class AlignedNotesRequest(BaseModel):
    pages: list[SlidePage]
    alignment: list[AlignmentItem]
    target_language: str = "English"


@router.post("/smart-notes")
async def create_smart_notes(request: SmartNotesRequest):
    notes = generate_smart_notes(
        transcript=request.transcript,
        slide_text=request.slide_text,
    )

    return {
        "smart_notes": notes
    }
    
@router.post("/slide-alignment")
async def create_slide_alignment(
    request: SlideAlignmentRequest
):
    alignment = align_transcript_to_slides(
        transcript=request.transcript,
        pages=[page.model_dump() for page in request.pages],
    )

    return {
        "alignment": alignment
    }
    
@router.post("/aligned-notes")
async def create_aligned_notes(
    request: AlignedNotesRequest
):
    notes = generate_aligned_smart_notes(
        pages=[
            page.model_dump()
            for page in request.pages
        ],
        alignment=[
            item.model_dump()
            for item in request.alignment
        ],
        target_language=request.target_language,
    )

    return {
        "notes": notes
    }
    
@router.post("/process")
async def process_study_pack(
    lecture: UploadFile = File(...),
    slides: UploadFile = File(...),
    target_language: str = Form("English"),
):
    # -------------------------
    # Validate files
    # -------------------------

    if lecture.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported lecture audio format.",
        )

    if slides.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Slides must be a PDF.",
        )

    # -------------------------
    # Read files
    # -------------------------

    lecture_bytes = await lecture.read()
    slide_bytes = await slides.read()

    # -------------------------
    # 1. Whisper transcription
    # -------------------------

    print("1/9 Transcribing lecture...")

    raw_transcript = transcribe_audio(
        file_bytes=lecture_bytes,
        filename=lecture.filename or "lecture.m4a",
    )

    # -------------------------
    # 2. Clean transcript
    # -------------------------

    print("2/9 Cleaning transcript...")

    cleaned_transcript = clean_transcript(
        raw_transcript
    )

    # -------------------------
    # 3. Translate transcript
    # -------------------------

    print("3/9 Translating transcript...")

    translation = translate_transcript(
        cleaned_transcript,
        target_language,
    )

    # -------------------------
    # 4. Extract PDF pages
    # -------------------------

    print("4/9 Reading slides...")

    pages = extract_pdf_pages(
        slide_bytes
    )

    # -------------------------
    # 5. Align lecture + slides
    # -------------------------

    print("5/9 Aligning transcript to slides...")

    alignment = align_transcript_to_slides(
        transcript=cleaned_transcript,
        pages=pages,
    )

    # -------------------------
    # 6. Generate Smart Notes
    # -------------------------

    print("6/9 Generating Smart Notes...")

    notes = generate_aligned_smart_notes(
        pages=pages,
        alignment=alignment,
        target_language=target_language,
    )
    
    
    print("7/9 Generating quiz...")

    quiz = generate_quiz(
        smart_notes=notes,
        number_of_questions=5,
    )

    print("8/9 Generating podcast script...")

    podcast_script = generate_podcast_script(
        smart_notes=notes,
        target_language=target_language,
    )

    print("9/9 Generating audio lesson...")

    audio_path = generate_audio_lesson(
        script=podcast_script,
        filename="audio_lesson.wav",
    )

    print("StudyPack complete!")

    return {
        
        "lecture_filename": lecture.filename,
        "slides_filename": slides.filename,
        "target_language": target_language,

        "transcript": {
            "raw": raw_transcript,
            "cleaned": cleaned_transcript,
            "translation": translation,
        },

        "slides": pages,
        "alignment": alignment,
        "smart_notes": notes,
        
        "quiz": quiz,

        "audio_lesson": {
            "script": podcast_script,
            "file_path": audio_path,
        },
    }
    
class PodcastRequest(BaseModel):
    smart_notes: list[dict]
    target_language: str = "English"


@router.post("/podcast-script")
async def create_podcast_script(
    request: PodcastRequest
):
    script = generate_podcast_script(
        smart_notes=request.smart_notes,
        target_language=request.target_language,
    )

    return {
        "podcast_script": script
    }
    
class AudioLessonRequest(BaseModel):
    podcast_script: str
    
@router.post("/audio-lesson")
async def create_audio_lesson(
    request: AudioLessonRequest,
):
    output_path = generate_audio_lesson(
        script=request.podcast_script
    )

    return FileResponse(
        output_path,
        media_type="audio/wav",
        filename="audio_lesson.wav",
    )
    
@router.get("/audio-lesson/file")
async def get_audio_lesson():
    audio_path = (
        Path(__file__).resolve().parents[2]
        / "generated"
        / "audio_lesson.wav"
    )

    if not audio_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Audio lesson not found.",
        )

    return FileResponse(
        path=str(audio_path),
        media_type="audio/wav",
        filename="audio_lesson.wav",
    )