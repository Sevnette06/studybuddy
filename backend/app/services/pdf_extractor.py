import pymupdf


def extract_pdf_pages(file_bytes: bytes) -> list[dict]:
    document = pymupdf.open(
        stream=file_bytes,
        filetype="pdf"
    )

    pages = []

    for page_number, page in enumerate(document, start=1):
        pages.append({
            "page_number": page_number,
            "text": page.get_text().strip()
        })

    document.close()

    return pages


def extract_pdf_text(file_bytes: bytes) -> str:
    pages = extract_pdf_pages(file_bytes)

    return "\n\n".join(
        f"Slide {page['page_number']}:\n{page['text']}"
        for page in pages
    )