import sys
from kokoro_mlx import KokoroTTS


def main():
    if len(sys.argv) < 3:
        raise ValueError(
            "Usage: python tts_runner.py <input_text_file> <output_wav>"
        )

    input_text_file = sys.argv[1]
    output_wav = sys.argv[2]

    with open(input_text_file, "r", encoding="utf-8") as file:
        text = file.read()

    tts = KokoroTTS.from_pretrained()

    tts.save(
        text,
        output_wav,
        voice="af_heart",
        speed=0.95,
        sample_rate=48000,
    )

    print(output_wav)


if __name__ == "__main__":
    main()