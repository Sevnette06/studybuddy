"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  studyStore,
  saveStudyPack,
  clearStudyPack,
} from "@/lib/studyStore";

import {
  AudioLines,
  Presentation,
  Brain,
  BookOpenCheck,
} from "lucide-react";

export default function ProcessingPage() {
  const router = useRouter();
  const hasStarted = useRef(false);

  const [status, setStatus] = useState(
    "Preparing your StudyPack..."
  );

  const [progress, setProgress] = useState(10);

  useEffect(() => {
    // Prevent React development mode from
    // accidentally running the pipeline twice.
    if (hasStarted.current) return;
    hasStarted.current = true;

    const processStudyPack = async () => {
      const lectureFile = studyStore.lectureFile;
      const slidesFile = studyStore.slidesFile;
      const targetLanguage = studyStore.targetLanguage;

      if (!lectureFile || !slidesFile) {
        alert(
          "Lecture and slides are required for this demo."
        );

        router.push("/");
        return;
      }

      try {
        /*
         * IMPORTANT:
         * Remove the previous StudyPack before
         * processing the new lecture.
         *
         * This does NOT delete lectureFile/slidesFile.
         * It only clears the previous generated result.
         */
        clearStudyPack();

        console.log(
          "Processing NEW lecture:",
          lectureFile.name
        );

        console.log(
          "Processing NEW slides:",
          slidesFile.name
        );

        setStatus("Uploading materials...");
        setProgress(20);

        const formData = new FormData();

        formData.append(
          "lecture",
          lectureFile
        );

        formData.append(
          "slides",
          slidesFile
        );

        formData.append(
          "target_language",
          targetLanguage
        );

        setStatus(
          "Transcribing and analyzing your lecture..."
        );

        setProgress(35);

        const response = await fetch(
          "http://127.0.0.1:8000/study/process",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorText =
            await response.text();

          throw new Error(
            `Backend error ${response.status}: ${errorText}`
          );
        }

        setStatus(
          "Building your StudyPack..."
        );

        setProgress(85);

        const data = await response.json();

        /*
         * VERY IMPORTANT:
         * Save the NEW backend result in both:
         *
         * 1. studyStore.result
         * 2. sessionStorage
         *
         * This replaces the previous lecture.
         */
        saveStudyPack(data);

        console.log(
          "NEW StudyPack saved:",
          data
        );

        console.log(
          "NEW transcript belongs to:",
          data.lecture_filename
        );

        setStatus(
          "StudyPack complete!"
        );

        setProgress(100);

        setTimeout(() => {
          router.push("/studypack");
        }, 500);

      } catch (error) {
        console.error(
          "StudyPack processing failed:",
          error
        );

        setStatus(
          "Something went wrong while processing."
        );

        setProgress(0);
      }
    };

    processStudyPack();

  }, [router]);

  return (
    <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold">
            Study
            <span className="text-[#6C4DFF]">
              Buddy
            </span>
          </h1>

          <p className="mt-3 text-sm text-[#666666]">
            Making Learning an Experience and Not a Hassle
          </p>
        </div>

        {/* Processing Card */}
        <div className="rounded-lg border border-[#E5E5E5] bg-white px-8 py-10 shadow-sm">

          <h2 className="text-center text-xl font-bold">
            Processing your materials...
          </h2>

          <p className="mt-3 text-center text-sm text-[#666666]">
            {status}
          </p>

          {/* Steps */}
          <div className="mt-12 flex items-start justify-between">

            {/* Step 1 */}
            <div className="flex flex-1 flex-col items-center">
              <div className="relative flex items-center">

                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full ${
                    progress >= 20
                      ? "border-2 border-[#6C4DFF] bg-[#F0ECFF]"
                      : "bg-[#F1F1F1]"
                  }`}
                >
                  <AudioLines
                    className={`h-10 w-10 ${
                      progress >= 20
                        ? "text-[#6C4DFF]"
                        : "text-[#B5B5B5]"
                    }`}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="absolute left-full top-1/2 h-[3px] w-[80px] -translate-y-1/2 bg-[#D9D9D9]" />

              </div>

              <p className="mt-4 text-center text-sm font-medium">
                Transcribing
                <br />
                audio
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-1 flex-col items-center">
              <div className="relative flex items-center">

                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full ${
                    progress >= 35
                      ? "border-2 border-[#6C4DFF] bg-[#F0ECFF]"
                      : "bg-[#F1F1F1]"
                  }`}
                >
                  <Presentation
                    className={`h-10 w-10 ${
                      progress >= 35
                        ? "text-[#6C4DFF]"
                        : "text-[#B5B5B5]"
                    }`}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="absolute left-full top-1/2 h-[3px] w-[80px] -translate-y-1/2 bg-[#D9D9D9]" />

              </div>

              <p className="mt-4 text-center text-sm font-medium">
                Reading
                <br />
                slides
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-1 flex-col items-center">
              <div className="relative flex items-center">

                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full ${
                    progress >= 85
                      ? "border-2 border-[#6C4DFF] bg-[#F0ECFF]"
                      : "bg-[#F1F1F1]"
                  }`}
                >
                  <Brain
                    className={`h-10 w-10 ${
                      progress >= 85
                        ? "text-[#6C4DFF]"
                        : "text-[#B5B5B5]"
                    }`}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="absolute left-full top-1/2 h-[3px] w-[80px] -translate-y-1/2 bg-[#D9D9D9]" />

              </div>

              <p className="mt-4 text-center text-sm font-medium">
                Analyzing
                <br />
                content
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-1 flex-col items-center">

              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  progress === 100
                    ? "border-2 border-[#6C4DFF] bg-[#F0ECFF]"
                    : "bg-[#F1F1F1]"
                }`}
              >
                <BookOpenCheck
                  className={`h-10 w-10 ${
                    progress === 100
                      ? "text-[#6C4DFF]"
                      : "text-[#B5B5B5]"
                  }`}
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-4 text-center text-sm font-medium">
                StudyPack
                <br />
                completed
              </p>

            </div>

          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 flex items-center gap-6">

          <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#EEEEF2] shadow-inner">

            <div
              className="h-full rounded-full bg-[#6C4DFF] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <span className="text-sm font-bold text-[#6C4DFF]">
            {progress}%
          </span>

        </div>

      </div>
    </main>
  );
}