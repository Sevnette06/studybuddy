"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  studyStore,
  restoreStudyPack,
  StudyPackResult,
} from "@/lib/studyStore";

export default function NotesPage() {
  const [result, setResult] = useState<StudyPackResult | null>(
    studyStore.result
  );

  useEffect(() => {
    restoreStudyPack();
    setResult(studyStore.result);
  }, []);
  console.log("STUDYPACK RESULT:", result);
  console.log("SMART NOTES:", result?.smart_notes);

  if (!result) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">No StudyPack found</h1>

          <p className="mt-3 text-sm text-[#666666]">
            Please process a lecture first.
          </p>

          <a
            href="/"
            className="mt-6 inline-flex rounded-md bg-[#6C4DFF] px-5 py-3 text-sm font-semibold text-white"
          >
            Go back
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Study<span className="text-[#6C4DFF]">Buddy</span>
          </h1>

          <p className="mt-3 text-sm text-[#666666]">
            Making Learning an Experience and Not a Hassle
          </p>
        </div>

        {/* Page title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Smart Notes
            </h2>

            <p className="mt-2 text-sm text-[#777777]">
              AI-generated notes from your lecture and slides.
            </p>
          </div>

          <span className="rounded-md bg-[#F0ECFF] px-4 py-2 text-xs font-semibold text-[#6C4DFF]">
            AI Generated
          </span>
        </div>

        {/* Real AI Notes */}
        <div className="space-y-6">
          {result.smart_notes.map((note) => (
            <section
              key={note.page_number}
              className="rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6C4DFF]">
                Slide {note.page_number}
              </p>

              <h3 className="mt-2 text-lg font-bold">
                {note.slide_title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#555555]">
                {note.summary}
              </p>

              {/* Key Points */}
              {note.key_points.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-bold">
                    Key Points
                  </h4>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#555555]">
                    {note.key_points.map((point, index) => (
                      <li key={index}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Professor Explanation */}
              {note.professor_explanation.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-bold">
                    Professor&apos;s Explanation
                  </h4>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#555555]">
                    {note.professor_explanation.map((point, index) => (
                      <li key={index}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Takeaway */}
              {note.key_takeaway && (
                <div className="mt-5 rounded-md bg-[#F8F7FF] p-5">
                  <h4 className="text-sm font-bold text-[#6C4DFF]">
                    Key Takeaway
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-[#555555]">
                    {note.key_takeaway}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-8">
          <Link
            href="/studypack"
            className="inline-flex rounded-md border border-[#E5E5E5] bg-white px-5 py-3 text-sm font-semibold transition hover:bg-[#F5F5F5]"
          >
            ← Back to StudyPack
          </Link>
        </div>

      </div>
    </main>
  );
}