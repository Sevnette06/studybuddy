import fitz


def extract_pdf_text(file_bytes: bytes) -> str:
    document = fitz.open(stream=file_bytes, filetype="pdf")

    pages = []

    for page in document:
        pages.append(page.get_text())

    return "\n".join(pages)