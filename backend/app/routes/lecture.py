from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.transcription import transcribe_audio

from pydantic import BaseModel

from app.services.claude_service import (
    clean_transcript,
    translate_transcript,
)

router = APIRouter(prefix="/lecture", tags=["Lecture"])

ALLOWED_AUDIO_TYPES = {
    "audio/mpeg",      # mp3
    "audio/wav",       # wav
    "audio/x-wav",
    "audio/mp4",   
    "audio/x-m4a",# m4a sometimes
    "video/mp4",       # mp4 lecture recording
}


@router.post("/audio")

async def upload_audio(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported audio format."
        )

    contents = await file.read()
    
    transcript = transcribe_audio(
        file_bytes=contents,
        filename=file.filename or "lecture.mp3"
    )

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size_bytes": len(contents),
        "message": "Lecture audio uploaded successfully.",
        "transcript": transcript
    }
    
class TranscriptRequest(BaseModel):
    raw_transcript: str
    target_language: str = "English"


@router.post("/process-transcript")
async def process_transcript(request: TranscriptRequest):
    cleaned = clean_transcript(request.raw_transcript)

    translation = translate_transcript(
        cleaned,
        request.target_language
    )

    return {
        "raw_transcript": request.raw_transcript,
        "cleaned_transcript": cleaned,
        "translation": translation,
    }
    
@router.post("/process")
async def process_lecture(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported audio format."
        )

    contents = await file.read()

    raw_transcript = transcribe_audio(
        file_bytes=contents,
        filename=file.filename or "lecture.m4a"
    )

    cleaned_transcript = clean_transcript(raw_transcript)

    translation = translate_transcript(
        cleaned_transcript,
        "English"
    )

    return {
        "filename": file.filename,
        "raw_transcript": raw_transcript,
        "cleaned_transcript": cleaned_transcript,
        "translation": translation,
    }