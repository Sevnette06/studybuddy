import hashlib
import os
import tempfile

import whisper


model = whisper.load_model("small")


def transcribe_audio(
    file_bytes: bytes,
    filename: str,
) -> str:

    suffix = "." + filename.split(".")[-1]

    # A fingerprint of the exact uploaded file bytes.
    file_hash = hashlib.sha256(file_bytes).hexdigest()

    print("")
    print("----- WHISPER INPUT -----")
    print(f"Filename: {filename}")
    print(f"Size: {len(file_bytes)} bytes")
    print(f"SHA256: {file_hash}")
    print("-------------------------")
    print("")

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix,
        ) as temp_file:
            temp_file.write(file_bytes)
            temp_path = temp_file.name

        print(f"Temporary audio file: {temp_path}")

        result = model.transcribe(
            temp_path,
            language="ko",
            fp16=False,
        )

        transcript = result["text"]

        print("")
        print("----- WHISPER OUTPUT -----")
        print(transcript[:500])
        print("--------------------------")
        print("")

        return transcript

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)