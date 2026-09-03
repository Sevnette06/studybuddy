"use client";

import { useState } from "react";

const questions = [
  {
    question: "What is the main concept discussed in the lecture?",
    options: [
      "The first concept",
      "The second concept",
      "The third concept",
      "The fourth concept",
    ],
    answer: 0,
  },
  {
    question: "Which statement is correct?",
    options: [
      "Option A",
      "Option B",
      "Option C",
      "Option D",
    ],
    answer: 1,
  },
  {
    question: "What is an important point to remember?",
    options: [
      "Point A",
      "Point B",
      "Point C",
      "Point D",
    ],
    answer: 2,
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    }
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

        {/* Question card */}
        <div className="rounded-lg border border-[#E5E5E5] bg-white p-8 shadow-sm">

          <p className="text-lg font-bold text-[#6C4DFF]">
            Question {currentQuestion + 1}
          </p>

          <h3 className="mt-4 text-xl font-semibold">
            {question.question}
          </h3>

          {/* Answers */}
          <div className="mt-6 space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option}
                onClick={() => setSelected(index)}
                className={`w-full rounded-lg border px-5 py-4 text-left text-sm transition ${
                  selected === index
                    ? "border-[#6C4DFF] bg-[#F0ECFF]"
                    : "border-[#E5E5E5] bg-white hover:bg-[#F8F7FF]"
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
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
              className="h-3 rounded-full bg-[#6C4DFF] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Next button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={nextQuestion}
            disabled={selected === null}
            className="rounded-md bg-[#6C4DFF] px-8 py-3 text-sm font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentQuestion === questions.length - 1
              ? "Finish"
              : "Next →"}
          </button>
        </div>

        {/* Back */}
        <div className="mt-6">
          <a
            href="/studypack"
            className="text-sm font-semibold text-[#6C4DFF] hover:underline"
          >
            ← Back to StudyPack
          </a>
        </div>

      </div>
    </main>
  );
}