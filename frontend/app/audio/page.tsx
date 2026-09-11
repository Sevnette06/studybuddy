"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Headphones } from "lucide-react";

import {
  studyStore,
  restoreStudyPack,
  StudyPackResult,
} from "@/lib/studyStore";

export default function AudioPage() {
  const [result, setResult] = useState<StudyPackResult | null>(
    studyStore.result
  );

  useEffect(() => {
    restoreStudyPack();
    setResult(studyStore.result);
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">
            Study<span className="text-[#6C4DFF]">Buddy</span>
          </h1>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold">
              No StudyPack found
            </h2>

            <p className="mt-3 text-sm text-[#666666]">
              Please process a lecture first.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-md bg-[#6C4DFF] px-5 py-3 text-sm font-semibold text-white"
            >
              Go to Upload
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold">
            Study<span className="text-[#6C4DFF]">Buddy</span>
          </h1>

          <p className="mt-3 text-sm text-[#666666]">
            Making Learning an Experience and Not a Hassle
          </p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold">
          Audio Lesson
        </h2>

        <p className="mt-2 text-sm text-[#666666]">
          Listen to your AI-generated lesson in {result.target_language}.
        </p>

        {/* Audio Lesson Card */}
        <div className="mt-12 rounded-xl border border-[#E5E5E5] bg-white p-8 shadow-sm">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0ECFF]">
              <Headphones
                className="h-7 w-7 text-[#6C4DFF]"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">
                Your StudyBuddy Audio Lesson
              </h3>

              <p className="mt-1 text-xs text-[#777777]">
                Generated from your lecture and study notes
              </p>
            </div>
          </div>

          {/* REAL Kokoro Audio */}
          <audio
            className="mt-8 w-full"
            controls
            preload="metadata"
            src="http://127.0.0.1:8000/study/audio-lesson/file"
          >
            Your browser does not support audio playback.
          </audio>

        </div>

        {/* Podcast Script */}
        <div className="mt-8 rounded-xl border border-[#E5E5E5] bg-white p-8 shadow-sm">
          <h3 className="font-bold">
            Audio Lesson Script
          </h3>

          <p className="mt-2 text-xs text-[#777777]">
            The AI-generated script used to create your audio lesson.
          </p>

          <div className="mt-5 max-h-[350px] overflow-y-auto rounded-lg bg-[#FAFAFC] p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-[#555555]">
              {result.audio_lesson.script}
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/studypack"
            className="text-sm font-semibold text-[#6C4DFF] hover:underline"
          >
            ← Back to StudyPack
          </Link>
        </div>

      </div>
    </main>
  );
}