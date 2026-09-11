"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import {
  studyStore,
  restoreStudyPack,
  StudyPackResult,
} from "@/lib/studyStore";

import {
  BookOpenText,
  Headphones,
  FileText,
  BadgeCheck,
  AudioLines,
} from "lucide-react";

export default function StudyPackPage() {
  const [result, setResult] = useState<StudyPackResult | null>(
    studyStore.result
  );

  useEffect(() => {
    restoreStudyPack();
    setResult(studyStore.result);
  }, []);

  const lectureFile = studyStore.lectureFile;
  const slidesFile = studyStore.slidesFile;

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  

  if (!result) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold">
            Study<span className="text-[#6C4DFF]">Buddy</span>
          </h1>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold">
              No StudyPack found
            </h2>

            <p className="mt-3 text-sm text-[#666666]">
              Please process your lecture and materials first.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-md bg-[#6C4DFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5B3FE6]"
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
          Your StudyPack is Ready!
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Smart Notes */}
          <Link
            href="/notes"
            className="flex min-h-[110px] items-center gap-5 rounded-lg border border-[#E5E5E5] bg-white px-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex-shrink-0 text-[#6C4DFF]">
              <BookOpenText
                className="h-10 w-10"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">
                Smart Notes
              </h3>

              <p className="mt-2 text-xs text-[#777777]">
                AI-generated notes based on
                <br />
                your lecture and slides.
              </p>
            </div>
          </Link>

          {/* Audio Lesson */}
          <Link
            href="/audio"
            className="flex min-h-[110px] items-center gap-5 rounded-lg border border-[#E5E5E5] bg-white px-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex-shrink-0 text-[#6C4DFF]">
              <Headphones
                className="h-10 w-10"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">
                Audio Lesson
              </h3>

              <p className="mt-2 text-xs text-[#777777]">
                Listen to your AI-generated
                <br />
                audio lesson.
              </p>
            </div>
          </Link>

          {/* Transcript */}
          <Link
            href="/transcript"
            className="flex min-h-[110px] items-center gap-5 rounded-lg border border-[#E5E5E5] bg-white px-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex-shrink-0 text-[#6C4DFF]">
              <FileText
                className="h-10 w-10"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">
                Transcript
              </h3>

              <p className="mt-2 text-xs text-[#777777]">
                View the original and translated
                <br />
                transcript of your lecture.
              </p>
            </div>
          </Link>

          {/* Quiz */}
          <Link
            href="/quiz"
            className="flex min-h-[110px] items-center gap-5 rounded-lg border border-[#E5E5E5] bg-white px-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex-shrink-0 text-[#6C4DFF]">
              <BadgeCheck
                className="h-10 w-10"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-bold">
                Test Yourself
              </h3>

              <p className="mt-2 text-xs text-[#777777]">
                Test your understanding with
                <br />
                interactive questions.
              </p>
            </div>
          </Link>

        </div>

        {/* Materials */}
        <h3 className="mb-4 ml-10 mt-6 text-sm font-bold">
          Your Materials:
        </h3>

        <div className="mx-auto flex max-w-[470px] gap-3">

          {/* Audio file */}
          <div className="flex flex-1 items-center justify-between rounded-md bg-[#F0F0F2] px-6 py-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#888888]">
                {lectureFile?.name || result.lecture_filename}
              </p>

              {lectureFile && (
                <p className="mt-1 text-xs text-[#888888]">
                  {formatFileSize(lectureFile.size)}
                </p>
              )}
            </div>

            <AudioLines
              className="ml-3 h-7 w-7 flex-shrink-0 text-[#AAAAAA]"
              strokeWidth={1.8}
            />
          </div>

          {/* PDF file */}
          <div className="flex flex-1 items-center justify-between rounded-md bg-[#F0F0F2] px-6 py-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#888888]">
                {slidesFile?.name || result.slides_filename}
              </p>

              {slidesFile && (
                <p className="mt-1 text-xs text-[#888888]">
                  {formatFileSize(slidesFile.size)}
                </p>
              )}
            </div>

            <FileText
              className="ml-3 h-7 w-7 flex-shrink-0 text-[#AAAAAA]"
              strokeWidth={1.8}
            />
          </div>

        </div>

      </div>
    </main>
  );
}