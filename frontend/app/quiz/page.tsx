"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  studyStore,
  restoreStudyPack,
  StudyPackResult,
} from "@/lib/studyStore";

export default function QuizPage() {
  const [result, setResult] = useState<StudyPackResult | null>(
    studyStore.result
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

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

  const questions = result.quiz;

  if (!questions || questions.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">
            Study<span className="text-[#6C4DFF]">Buddy</span>
          </h1>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold">
              No quiz available
            </h2>

            <p className="mt-3 text-sm text-[#666666]">
              A quiz could not be generated for this StudyPack.
            </p>

            <Link
              href="/studypack"
              className="mt-6 inline-flex rounded-md bg-[#6C4DFF] px-5 py-3 text-sm font-semibold text-white"
            >
              Back to StudyPack
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];

  const progress = finished
    ? 100
    : ((currentQuestion + 1) / questions.length) * 100;

  const isCorrect =
    selected !== null &&
    selected === question.correct_answer;

  function nextQuestion() {
    if (selected === null) return;

    const earnedPoint =
      selected === question.correct_answer ? 1 : 0;

    const newScore = score + earnedPoint;

    setScore(newScore);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
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

        {/* Title */}
        <h2 className="mb-6 text-2xl font-bold">
          Test Yourself
        </h2>

        {!finished ? (
          <>
            {/* Question card */}
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-8 shadow-sm">

              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-[#6C4DFF]">
                  Question {currentQuestion + 1}
                </p>

                <span className="text-sm text-[#777777]">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                {question.question}
              </h3>

              {/* Answers */}
              <div className="mt-6 space-y-3">
                {question.options.map((option, index) => {
                  let answerStyle =
                    "border-[#E5E5E5] bg-white hover:bg-[#F8F7FF]";

                  if (selected !== null) {
                    if (index === question.correct_answer) {
                      answerStyle =
                        "border-green-500 bg-green-50";
                    } else if (index === selected) {
                      answerStyle =
                        "border-red-400 bg-red-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => setSelected(index)}
                      className={`w-full rounded-lg border px-5 py-4 text-left text-sm transition ${answerStyle}`}
                    >
                      <span className="font-semibold">
                        {String.fromCharCode(65 + index)}.
                      </span>{" "}
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {selected !== null && (
                <div
                  className={`mt-6 rounded-lg p-5 ${
                    isCorrect
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  <p className="font-bold">
                    {isCorrect
                      ? "Correct! 🎉"
                      : "Not quite!"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#555555]">
                    {question.explanation}
                  </p>
                </div>
              )}

            </div>

            {/* Progress */}
            <div className="mt-10">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#666666]">
                  Your Progress
                </span>

                <span className="font-semibold text-[#6C4DFF]">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-[#E5E5E8]">
                <div
                  className="h-3 rounded-full bg-[#6C4DFF] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Next button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="rounded-md bg-[#6C4DFF] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#5B3FE6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {currentQuestion === questions.length - 1
                  ? "Finish"
                  : "Next →"}
              </button>
            </div>
          </>
        ) : (
          /* Results */
          <div className="rounded-xl border border-[#E5E5E5] bg-white p-10 text-center shadow-sm">

            <div className="text-5xl">
              🎉
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Quiz Complete!
            </h3>

            <p className="mt-3 text-sm text-[#666666]">
              You scored
            </p>

            <p className="mt-2 text-5xl font-bold text-[#6C4DFF]">
              {score}/{questions.length}
            </p>

            <p className="mt-3 text-sm text-[#777777]">
              {Math.round((score / questions.length) * 100)}%
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={restartQuiz}
                className="rounded-md border border-[#6C4DFF] px-6 py-3 text-sm font-semibold text-[#6C4DFF] transition hover:bg-[#F0ECFF]"
              >
                Try Again
              </button>

              <Link
                href="/studypack"
                className="rounded-md bg-[#6C4DFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5B3FE6]"
              >
                Back to StudyPack
              </Link>
            </div>

          </div>
        )}

        {/* Back */}
        {!finished && (
          <div className="mt-6">
            <Link
              href="/studypack"
              className="text-sm font-semibold text-[#6C4DFF] hover:underline"
            >
              ← Back to StudyPack
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}