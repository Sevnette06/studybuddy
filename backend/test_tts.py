from kokoro_mlx import KokoroTTS

tts = KokoroTTS.from_pretrained()

print("Available voices:")
print(tts.list_voices())

tts.save(
    "Welcome to StudyBuddy. Today we're reviewing propositional logic. A statement is a sentence that can be classified as true or false.",
    "test_audio_lesson.wav",
    voice="af_heart",
    speed=1.0,
    sample_rate=48000,
)

print("Done! Created test_audio_lesson.wav")