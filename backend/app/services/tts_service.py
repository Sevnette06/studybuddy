import subprocess
import tempfile
from pathlib import Path


BACKEND_DIR = Path(__file__).resolve().parents[2]

TTS_PYTHON = BACKEND_DIR.parent / "tts_env" / "bin" / "python"
TTS_RUNNER = BACKEND_DIR / "tts_runner.py"

OUTPUT_DIR = BACKEND_DIR / "generated"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_audio_lesson(
    script: str,
    filename: str = "audio_lesson.wav",
) -> str:

    output_path = OUTPUT_DIR / filename

    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".txt",
        encoding="utf-8",
        delete=False,
    ) as temp_file:
        temp_file.write(script)
        temp_text_path = temp_file.name

    subprocess.run(
        [
            str(TTS_PYTHON),
            str(TTS_RUNNER),
            temp_text_path,
            str(output_path),
        ],
        check=True,
    )

    Path(temp_text_path).unlink(
        missing_ok=True
    )

    return str(output_path)