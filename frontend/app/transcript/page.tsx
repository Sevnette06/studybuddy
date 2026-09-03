export default function TranscriptPage() {
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

        {/* Page title */}
        <h2 className="mb-14 text-2xl font-bold">
          Transcript
        </h2>

        {/* Transcript cards */}
        <div className="flex justify-center gap-5">

          {/* Original Transcript */}
          <div className="flex h-[205px] w-[250px] flex-col items-center justify-center rounded-lg bg-[#F0F0F2]">

            {/* File icon */}
            <svg
              width="52"
              height="62"
              viewBox="0 0 52 62"
              fill="none"
              className="text-[#AAAAAA]"
            >
              <path
                d="M7 2H31L45 16V60H7V2Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M31 2V17H45"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            <p className="mt-3 text-xs text-[#888888]">
              Original Transcript
            </p>

            <p className="mt-1 text-xs text-[#888888]">
              21.3 mb
            </p>

            <button className="mt-4 rounded-md bg-[#6C4DFF] px-8 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#5B3FE6]">
              Download PDF
            </button>
          </div>

          {/* Translated Transcript */}
          <div className="flex h-[205px] w-[250px] flex-col items-center justify-center rounded-lg bg-[#F0F0F2]">

            {/* File icon */}
            <svg
              width="52"
              height="62"
              viewBox="0 0 52 62"
              fill="none"
              className="text-[#AAAAAA]"
            >
              <path
                d="M7 2H31L45 16V60H7V2Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M31 2V17H45"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            <p className="mt-3 text-xs text-[#888888]">
              Translated Transcript
            </p>

            <p className="mt-1 text-xs text-[#888888]">
              21.3 mb
            </p>

            <button className="mt-4 rounded-md bg-[#6C4DFF] px-8 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#5B3FE6]">
              Download PDF
            </button>
          </div>

        </div>

        {/* Back button */}
        <div className="mt-10">
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