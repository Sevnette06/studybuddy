"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

import {
  studyStore,
  restoreStudyPack,
  StudyPackResult,
} from "@/lib/studyStore";

export default function TranscriptPage() {
  const [result, setResult] = useState<StudyPackResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    restoreStudyPack();

    const currentResult = studyStore.result;

    console.log("TRANSCRIPT PAGE RESULT:", currentResult);
    console.log(
      "LECTURE FILE:",
      currentResult?.lecture_filename
    );
    console.log(
      "TRANSCRIPT TEXT:",
      currentResult?.transcript?.cleaned
    );

    setResult(currentResult);
    setLoaded(true);
  }, []);

  const downloadTranscript = (
    content: string,
    filename: string
  ) => {
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-[#666666]">
            Loading transcript...
          </p>
        </div>
      </main>
    );
  }

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
              className="mt-6 inline-flex rounded-md bg-[#6C4DFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5B3FE6]"
            >
              Go to Upload
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const originalTranscript =
    result.transcript?.cleaned || "";

  const translatedTranscript =
    result.transcript?.translation || "";

  return (
    <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold">
            Study<span className="text-[#6C4DFF]">Buddy</span>
          </h1>

          <p className="mt-3 text-sm text-[#666666]">
            Making Learning an Experience and Not a Hassle
          </p>
        </div>

        {/* Page title */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold">
            Transcript
          </h2>

          <p className="mt-2 text-sm text-[#777777]">
            Review your lecture in its original language and translated version.
          </p>

          <p className="mt-1 text-xs text-[#999999]">
            Source: {result.lecture_filename}
          </p>
        </div>

        {/* Transcript Sections */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Original Transcript */}
          <section className="rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#F0ECFF]">
                <FileText
                  className="h-6 w-6 text-[#6C4DFF]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h3 className="font-bold">
                  Original Transcript
                </h3>

                <p className="text-xs text-[#888888]">
                  Cleaned lecture transcript
                </p>
              </div>
            </div>

            <div className="mt-5 max-h-[500px] overflow-y-auto rounded-md bg-[#FAFAFC] p-5">
              {originalTranscript ? (
                <p className="whitespace-pre-wrap text-sm leading-7 text-[#555555]">
                  {originalTranscript}
                </p>
              ) : (
                <p className="text-sm text-[#999999]">
                  No original transcript available.
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!originalTranscript}
              onClick={() =>
                downloadTranscript(
                  originalTranscript,
                  "original_transcript.txt"
                )
              }
              className="mt-5 rounded-md bg-[#6C4DFF] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#5B3FE6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download Transcript
            </button>
          </section>

          {/* Translated Transcript */}
          <section className="rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#F0ECFF]">
                <FileText
                  className="h-6 w-6 text-[#6C4DFF]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h3 className="font-bold">
                  Translated Transcript
                </h3>

                <p className="text-xs text-[#888888]">
                  Translated to {result.target_language}
                </p>
              </div>
            </div>

            <div className="mt-5 max-h-[500px] overflow-y-auto rounded-md bg-[#FAFAFC] p-5">
              {translatedTranscript ? (
                <p className="whitespace-pre-wrap text-sm leading-7 text-[#555555]">
                  {translatedTranscript}
                </p>
              ) : (
                <p className="text-sm text-[#999999]">
                  No translated transcript available.
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!translatedTranscript}
              onClick={() =>
                downloadTranscript(
                  translatedTranscript,
                  `translated_transcript_${result.target_language.toLowerCase()}.txt`
                )
              }
              className="mt-5 rounded-md bg-[#6C4DFF] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#5B3FE6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download Translation
            </button>
          </section>
        </div>

        {/* Back button */}
        <div className="mt-10">
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