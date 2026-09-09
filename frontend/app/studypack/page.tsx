"use client";

import {
  BookOpenText,
  Headphones,
  FileText,
  BadgeCheck,
  AudioLines,
} from "lucide-react";

export default function StudyPackPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Study<span className="text-[#6C4DFF]">Buddy</span>
          </h1>

          <p className="mt-3 text-sm text-[#666666]">
            Making Learning an Experience and Not a Hassle
          </p>
        </div>

        {/* Title */}
        <h2 className="mb-8 text-center text-xl font-bold">
          Your StudyPack is Ready !
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Smart Notes */}
          <a
            href="/notes"
            className="flex min-h-[110px] items-center gap-5 rounded-lg border border-[#E5E5E5] bg-white px-8 text-left shadow-sm transition hover:shadow-md"
          >
            <div className="flex-shrink-0 text-[#6C4DFF]">
              <BookOpenText
                className="h-10 w-10"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">Smart Notes</h3>
              <p className="mt-2 text-xs text-[#777777]">
                AI-generated notes based on
                <br />
                your lecture and slides.
              </p>
            </div>
          </a>

          {/* Audio Lesson */}
          <a
            href="/audio"
            className="flex min-h-[110px] items-center gap-5 rounded-lg border border-[#E5E5E5] bg-white px-8 text-left shadow-sm transition hover:shadow-md"
          >
            <div className="flex-shrink-0 text-[#6C4DFF]">
              <Headphones
                className="h-10 w-10"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">Audio Lesson</h3>
              <p className="mt-2 text-xs text-[#777777]">
                Listen to your translated lecture
                <br />
                in an easy way.
              </p>
            </div>
          </a>

          {/* Transcript */}
          <a
            href="/transcript"
            className="flex min-h-[110px] items-center gap-5 rounded-lg border border-[#E5E5E5] bg-white px-8 text-left shadow-sm transition hover:shadow-md"
          >
            <div className="flex-shrink-0 text-[#6C4DFF]">
              <FileText
                className="h-10 w-10"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">Transcript</h3>
              <p className="mt-2 text-xs text-[#777777]">
                View the original and translated
                <br />
                transcript of your lecture.
              </p>
            </div>
          </a>

          {/* Quiz */}
          <a
            href="/quiz"
            className="flex min-h-[110px] items-center gap-5 rounded-lg border border-[#E5E5E5] bg-white px-8 text-left shadow-sm transition hover:shadow-md"
          >
            <div className="flex-shrink-0 text-[#6C4DFF]">
              <BadgeCheck
                className="h-10 w-10"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">Test Yourself</h3>
              <p className="mt-2 text-xs text-[#777777]">
                Test your understanding with
                <br />
                AI-generated quizzes.
              </p>
            </div>
          </a>

        </div>

        {/* Materials */}
        <h3 className="mt-6 mb-4 ml-10 text-sm font-bold">
          Your Materials :
        </h3>

        <div className="mx-auto flex max-w-[470px] gap-3">

          {/* Audio file */}
          <div className="flex flex-1 items-center justify-between rounded-md bg-[#F0F0F2] px-6 py-4">
            <div>
              <p className="text-xs font-medium text-[#888888]">
                Lecture1.mp3
              </p>

              <p className="mt-1 text-xs text-[#888888]">
                21.3 mb
              </p>
            </div>

            <AudioLines
              className="h-7 w-7 text-[#AAAAAA]"
              strokeWidth={1.8}
            />
          </div>

          {/* PDF file */}
          <div className="flex flex-1 items-center justify-between rounded-md bg-[#F0F0F2] px-6 py-4">
            <div>
              <p className="text-xs font-medium text-[#888888]">
                LectureSlide.pdf
              </p>

              <p className="mt-1 text-xs text-[#888888]">
                15.2 mb
              </p>
            </div>

            <FileText
              className="h-7 w-7 text-[#AAAAAA]"
              strokeWidth={1.8}
            />
          </div>

        </div>

      </div>
    </main>
  );
}