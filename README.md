# StudyBuddy

**Making Learning an Experience and Not a Hassle**

StudyBuddy is an AI-powered study platform built for international university students who attend lectures in a language that is not their native language.

The idea came from a common problem: students often need several different tools just to understand one lecture. They may need to record it, transcribe it, translate it, compare it with lecture slides, rewrite it into notes, create revision questions, and sometimes turn those notes into audio.

StudyBuddy brings that entire process into one place.

## What StudyBuddy Does

Students upload a lecture recording and the matching lecture slides, choose the language they want to study in, and StudyBuddy creates a complete StudyPack.

A StudyPack can include:

- A cleaned lecture transcript
- A translated transcript
- Smart Notes based on both the lecture and the slides
- Professor explanations and key takeaways
- An AI-generated quiz
- A podcast-style study script
- An audio lesson

The goal is simple: help students spend less time preparing their materials and more time actually learning.

---

## Main Features

### Lecture Transcription

StudyBuddy uses OpenAI Whisper to transcribe uploaded lecture recordings.

Supported formats include:

- MP3
- MP4
- WAV
- M4A

### Translation

The lecture transcript can be translated into the student's preferred learning language.

The current interface includes:

- English
- Korean
- Malay

The system can be extended to support more languages later.

### Slide Processing

StudyBuddy extracts text from uploaded PDF lecture slides using PyMuPDF.

The slides are processed page by page so the system can connect the lecture with the correct material.

### Lecture and Slide Alignment

The system compares the professor's explanation with the lecture slides.

This helps separate:

- Information written directly on the slide
- Explanations spoken by the professor
- Extra examples
- Important additions
- Teaching advice

### Smart Notes

StudyBuddy generates structured notes for each lecture slide.

Each note can include:

- Slide title
- Summary
- Key points
- Professor explanation
- Key takeaway

The slides remain the source of truth for formulas, definitions, equations, tables, and other printed information.

The professor's lecture is used for explanations and additional context.

Smart Notes are generated in the language selected by the student.

### Quiz Generation

StudyBuddy creates multiple-choice revision questions based on the generated Smart Notes.

Each question includes:

- Four answer choices
- One correct answer
- An explanation
- Score tracking

### Audio Lesson

StudyBuddy can turn the study material into a podcast-style lesson.

Claude generates the study script, and Kokoro MLX converts it into speech.

This allows students to review the lecture by listening instead of only reading.

### Downloadable Transcripts

Students can download both:

- The cleaned original transcript
- The translated transcript

---

## How It Works

```text
Lecture Recording
      |
      v
OpenAI Whisper
      |
      v
Raw Transcript
      |
      v
Claude
      |
      +--> Transcript Cleanup
      |
      +--> Translation
      |
      v
Lecture Slides
      |
      v
PDF Text Extraction
      |
      v
Lecture + Slide Alignment
      |
      v
Smart Notes
      |
      +--> Quiz Generation
      |
      +--> Podcast Script
              |
              v
          Kokoro MLX
              |
              v
          Audio Lesson
