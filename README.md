<div align="center">

# StudyBuddy

### From lecture to learning, all in one place.

**Making Learning an Experience and Not a Hassle**

<br>

Built by **Neil Iman Armani** and **Adriana Wafa**  

<br>

`AI-Powered` · `Multilingual` · `Lecture Transcription` · `Smart Notes` · `Quiz Generation` · `Audio Learning`

</div>

---

## About StudyBuddy

Studying in a language that is not your own can make even a single lecture feel like twice the work.

You record the lecture. Then you transcribe it. Then translate it. Then go through the slides. Then try to figure out which parts of the professor's explanation belong to which slide. After that, you still have to make notes and actually study.

We built **StudyBuddy** to bring that whole process into one place.

Upload a lecture recording and its matching slides, choose the language you want to study in, and StudyBuddy turns them into a complete **StudyPack**.

> **Less time preparing to learn. More time actually learning.**

---

## What StudyBuddy Does

A StudyPack brings together everything a student needs to review a lecture:

| Feature | What it does |
| --- | --- |
| **Lecture Transcript** | Converts a recorded lecture into readable text |
| **Translation** | Translates the lecture into the student's preferred language |
| **Smart Notes** | Combines slide content with the professor's explanations |
| **Key Takeaways** | Pulls out the most important points from each section |
| **AI Quiz** | Creates multiple-choice questions for revision |
| **Audio Lesson** | Turns study material into a podcast-style lesson |
| **Downloads** | Lets students save their original and translated transcripts |

---

## Main Features

### Lecture Transcription

StudyBuddy uses **OpenAI Whisper** to transcribe uploaded lecture recordings.

Supported formats:

`MP3` · `MP4` · `WAV` · `M4A`

---

### Translation

The lecture transcript can be translated into the student's preferred learning language.

The current interface supports:

- English
- Korean
- Malay

The system is designed so more languages can be added later.

---

### Slide Processing

StudyBuddy reads uploaded PDF lecture slides using **PyMuPDF**.

Instead of treating the entire presentation as one large document, the slides are processed page by page. This gives StudyBuddy the structure it needs to connect what the professor says with the relevant slide.

---

### Lecture and Slide Alignment

One of the main parts of StudyBuddy is connecting the spoken lecture with the presentation.

The system separates:

- Information written directly on the slides
- Explanations given verbally by the professor
- Additional examples
- Important professor additions
- Teaching advice and context

This allows the generated notes to reflect both the official lecture material and what was actually explained in class.

---

### Smart Notes

StudyBuddy creates structured notes for each relevant lecture slide.

Each note can contain:

- **Slide title**
- **Summary**
- **Key points**
- **Professor explanation**
- **Key takeaway**

The slides remain the source of truth for formulas, equations, definitions, tables, symbols, and other printed information.

The professor's lecture is used to add explanations and context without replacing the original material.

Smart Notes are also generated in the student's selected learning language.

---

### Quiz Generation

Once the Smart Notes are ready, StudyBuddy creates a multiple-choice quiz based on the lecture material.

Each question contains:

- Four answer choices
- One correct answer
- An explanation
- Score tracking

This gives students a quick way to check whether they actually understood what they studied.

---

### Audio Lesson

Some students learn better by listening.

StudyBuddy uses the generated study material to create a podcast-style lesson. **Claude** prepares the study script, and **Kokoro MLX** turns it into natural-sounding speech.

This makes it possible to review a lecture while walking, commuting, or doing something away from the screen.

---

### Downloadable Transcripts

Students can download both versions of their transcript:

- Cleaned original transcript
- Translated transcript

This makes the generated material useful outside StudyBuddy as well.

---

## How It Works

```text
Lecture Recording                 Lecture Slides
       |                                |
       v                                v
 OpenAI Whisper                  PDF Text Extraction
       |                                |
       v                                |
 Raw Transcript                         |
       |                                |
       v                                |
     Claude                             |
       |                                |
       +---- Transcript Cleanup         |
       |                                |
       +---- Translation                |
       |                                |
       +----------------+---------------+
                        |
                        v
             Lecture + Slide Alignment
                        |
                        v
                   Smart Notes
                    /       \
                   /         \
                  v           v
          Quiz Generation   Podcast Script
                                  |
                                  v
                              Kokoro MLX
                                  |
                                  v
                             Audio Lesson
```

---

## The Goal

StudyBuddy is not meant to replace studying.

It is meant to remove the repetitive work that happens **before** studying.

For international students especially, understanding the lecture should be the challenge — not spending hours moving the same content between transcription, translation, note-taking, and audio tools.

**StudyBuddy turns lecture preparation into one workflow, so students can focus on learning.**

---
