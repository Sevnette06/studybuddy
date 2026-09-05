from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.pdf_extractor import extract_pdf_text


router = APIRouter(prefix="/materials", tags=["Materials"])


@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    contents = await file.read()

    text = extract_pdf_text(contents)

    return {
        "filename": file.filename,
        "text": text,
    }