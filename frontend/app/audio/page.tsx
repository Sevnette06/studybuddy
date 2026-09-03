export default function AudioPage() {
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
          Listen to your translated lecture in an easy way.
        </p>

        {/* Audio player */}
        <div className="mt-16">

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-[#E5E5E8]">
            <div className="h-2 w-[25%] rounded-full bg-[#6C4DFF]" />
          </div>

          <div className="mt-2 flex justify-between text-xs text-[#888888]">
            <span>05:42</span>
            <span>40:15</span>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-10">

            <button className="text-3xl text-[#6C4DFF]">
              ◀
            </button>

            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6C4DFF] text-2xl text-white">
              ▶
            </button>

            <button className="text-3xl text-[#6C4DFF]">
              ▶
            </button>

          </div>
        </div>

        {/* Chapters */}
        <div className="mt-14 space-y-3">

          <div className="flex items-center justify-between rounded-lg bg-[#F0ECFF] px-6 py-4">
            <span className="text-sm font-medium">
              Introduction
            </span>
            <span className="text-xs text-[#777777]">
              05:42
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm">
            <span className="text-sm font-medium">
              Part 1
            </span>
            <span className="text-xs text-[#777777]">
              13:42
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm">
            <span className="text-sm font-medium">
              Part 2
            </span>
            <span className="text-xs text-[#777777]">
              34:11
            </span>
          </div>

        </div>

        {/* Back */}
        <div className="mt-8">
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