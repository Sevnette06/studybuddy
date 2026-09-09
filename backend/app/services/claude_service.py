import os
from pathlib import Path
import json

from anthropic import Anthropic
from dotenv import load_dotenv


# Load backend/.env
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)

api_key = os.getenv("ANTHROPIC_API_KEY")

if not api_key:
    raise RuntimeError("ANTHROPIC_API_KEY not found in .env")

client = Anthropic(api_key=api_key)

MODEL = "claude-sonnet-4-6"


def clean_transcript(raw_transcript: str) -> str:
    chunks = chunk_text(raw_transcript)

    cleaned_chunks = []

    for index, chunk in enumerate(chunks, start=1):
        print(f"Cleaning transcript chunk {index}/{len(chunks)}...")

        response = client.messages.create(
            model=MODEL,
            max_tokens=5000,
            messages=[
                {
                    "role": "user",
                    "content": f"""
You are cleaning one segment of an automatically generated
Korean university lecture transcript.

This segment is part of a longer lecture.

Rules:
- Fix obvious speech-to-text errors.
- Fix punctuation and spacing.
- Preserve ALL information from the professor.
- Preserve the original order.
- Preserve Korean and English technical terminology.
- Do NOT summarize.
- Do NOT remove information.
- Do NOT add new information.
- Do NOT add headings or commentary.
- If something is uncertain, do not invent a correction.
- Return ONLY the cleaned transcript segment.

TRANSCRIPT SEGMENT:
{chunk}
""",
                }
            ],
        )

        cleaned = "".join(
            block.text
            for block in response.content
            if block.type == "text"
        ).strip()

        cleaned_chunks.append(cleaned)

    return "\n\n".join(cleaned_chunks)


def translate_transcript(
    cleaned_transcript: str,
    target_language: str = "English",
) -> str:

    chunks = chunk_text(cleaned_transcript)

    translated_chunks = []

    for index, chunk in enumerate(chunks, start=1):
        print(f"Translating chunk {index}/{len(chunks)}...")

        response = client.messages.create(
            model=MODEL,
            max_tokens=5000,
            messages=[
                {
                    "role": "user",
                    "content": f"""
Translate this segment of a university lecture transcript
into {target_language}.

This segment is part of a longer lecture.

Rules:
- Preserve ALL information.
- Preserve the professor's meaning accurately.
- Keep technical terminology precise.
- Make the translation natural for a university student.
- Do NOT summarize.
- Do NOT remove information.
- Do NOT add information.
- Do NOT add headings or commentary.
- Return ONLY the translated transcript segment.

TRANSCRIPT SEGMENT:
{chunk}
""",
                }
            ],
        )

        translated = "".join(
            block.text
            for block in response.content
            if block.type == "text"
        ).strip()

        translated_chunks.append(translated)

    return "\n\n".join(translated_chunks)
    
def generate_smart_notes(
    transcript: str,
    slide_text: str,
) -> str:
    response = client.messages.create(
        model=MODEL,
        max_tokens=5000,
        messages=[
            {
                "role": "user",
                "content": f"""
You are an AI study assistant for university students.

Create clear, structured study notes using BOTH:
1. The professor's lecture transcript
2. The lecture slides

Rules:
- Focus on concepts important for learning and revision.
- Combine information from the lecture and slides.
- Preserve important technical terminology.
- Include useful explanations the professor gave that may not appear on the slides.
- Do not invent information.
- Organize the notes using headings and bullet points.
- Make the notes concise but educational.
- Highlight key concepts and important definitions.

LECTURE TRANSCRIPT:
{transcript}

SLIDE CONTENT:
{slide_text}
""",
            }
        ],
    )

    return "".join(
        block.text
        for block in response.content
        if block.type == "text"
    ).strip()
    
    
def align_transcript_to_slides(
    transcript: str,
    pages: list[dict],
) -> list[dict]:

    slide_data = json.dumps(
        pages,
        ensure_ascii=False,
        indent=2,
    )

    response = client.messages.create(
        model=MODEL,
        max_tokens=6000,
        messages=[
            {
                "role": "user",
                "content": f"""
You are aligning a university lecture transcript with its presentation slides.

You are given:
1. A cleaned lecture transcript
2. Slide text separated by page number

For each slide, determine what parts of the professor's lecture correspond to that slide.

Rules:
- Use ONLY information supported by the transcript and slides.
- Do not invent explanations.
- The transcript may be Korean while the slides may be English.
- Match concepts by meaning, not only exact wording.
- Some slides may have little or no spoken explanation.
- Preserve the original slide page number.
- Summarize the professor's additional explanation clearly.
- Include useful information spoken by the professor that is not written on the slide.
- If there is no clear match, set matched to false.

Return ONLY valid JSON.

Use this exact structure:

[
  {{
    "page_number": 1,
    "slide_title": "title if identifiable",
    "matched": true,
    "professor_explanation": "summary of what the professor explained",
    "professor_additions": [
      "important spoken information not explicitly written on the slide"
    ]
  }}
]

TRANSCRIPT:
{transcript}

SLIDES:
{slide_data}
""",
            }
        ],
    )

    text = "".join(
        block.text
        for block in response.content
        if block.type == "text"
    ).strip()

    # Remove Markdown fences if Claude accidentally adds them
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        text = text.rsplit("```", 1)[0]

    return json.loads(text)

def chunk_text(text: str, max_chars: int = 6000) -> list[str]:
    """
    Split long text into chunks without cutting words in half.
    """
    words = text.split()

    chunks = []
    current_chunk = []
    current_length = 0

    for word in words:
        word_length = len(word) + 1

        if current_length + word_length > max_chars and current_chunk:
            chunks.append(" ".join(current_chunk))
            current_chunk = []
            current_length = 0

        current_chunk.append(word)
        current_length += word_length

    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks

def generate_aligned_smart_notes(
    pages: list[dict],
    alignment: list[dict],
) -> list[dict]:

    slide_lookup = {
        page["page_number"]: page["text"]
        for page in pages
    }

    notes = []

    for item in alignment:
        page_number = item["page_number"]

        # Skip slides with no meaningful lecture match
        if not item.get("matched", False):
            continue

        slide_text = slide_lookup.get(page_number, "")

        prompt = f"""
You are creating StudyBuddy smart notes for ONE university lecture slide.

IMPORTANT SOURCE RULES:
- The SLIDE is the authority for formulas, equations, tables,
  definitions, symbols, and printed facts.
- The PROFESSOR EXPLANATION is the authority for spoken
  explanations, examples, context, and teaching advice.
- If the transcript conflicts with the slide on a formula,
  table value, or symbol, ALWAYS follow the slide.
- Do NOT invent information.
- Do NOT correct or complete missing slide content using outside knowledge.
- Ignore irrelevant classroom chatter, jokes, temperature comments,
  attendance comments, and unrelated conversation.
- Keep only educationally useful professor additions.

Return ONLY valid JSON in exactly this structure:

{{
  "page_number": {page_number},
  "slide_title": "{item.get("slide_title", "")}",
  "summary": "A concise explanation of what this slide teaches.",
  "key_points": [
    "important point"
  ],
  "professor_explanation": [
    "useful explanation given verbally"
  ],
  "key_takeaway": "The single most important thing a student should remember."
}}

SLIDE CONTENT:
{slide_text}

PROFESSOR EXPLANATION:
{item.get("professor_explanation", "")}

PROFESSOR ADDITIONS:
{json.dumps(
    item.get("professor_additions", []),
    ensure_ascii=False
)}
"""

        response = client.messages.create(
            model=MODEL,
            max_tokens=2000,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        text = "".join(
            block.text
            for block in response.content
            if block.type == "text"
        ).strip()

        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0]

        notes.append(json.loads(text))

    return notes

def generate_podcast_script(
    smart_notes: list[dict],
    target_language: str = "English",
) -> str:

    notes_json = json.dumps(
        smart_notes,
        ensure_ascii=False,
        indent=2,
    )

    response = client.messages.create(
        model=MODEL,
        max_tokens=5000,
        messages=[
            {
                "role": "user",
                "content": f"""
You are creating a short educational audio lesson based on university lecture notes.

Write the script in {target_language}.

Goals:
- Make it sound natural when spoken aloud.
- Explain concepts clearly rather than reading bullet points.
- Preserve the meaning of the lecture.
- Use important examples from the professor when helpful.
- Prioritize the most important concepts.
- Avoid irrelevant classroom chatter.
- Do not invent new academic information.
- Do not mention slide numbers unless necessary.
- Use smooth transitions between topics.
- Aim for an engaging study-review style.
- Do NOT use markdown headings or bullet points.
- Return ONLY the spoken script.

SMART NOTES:
{notes_json}
""",
            }
        ],
    )

    return "".join(
        block.text
        for block in response.content
        if block.type == "text"
    ).strip()