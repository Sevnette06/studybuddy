import tempfile
import whisper


model = whisper.load_model("small")


def transcribe_audio(file_bytes: bytes, filename: str) -> str:
    suffix = "." + filename.split(".")[-1]

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix
    ) as temp_file:
        temp_file.write(file_bytes)
        temp_path = temp_file.name

    result = model.transcribe(
        temp_path,
        language="ko"
    )

    return result["text"]