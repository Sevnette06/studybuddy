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
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20 7C15 3 8 4 5 7V34C8 31 15 30 20 34C25 30 32 31 35 34V7C32 4 25 3 20 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 7V34"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
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
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M9 22V18C9 11.9 13.9 7 20 7C26.1 7 31 11.9 31 18V22"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 20H7C5.9 20 5 20.9 5 22V27C5 28.1 5.9 29 7 29H9V20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M31 20H33C34.1 20 35 20.9 35 22V27C35 28.1 34.1 29 33 29H31V20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M31 29C31 32 28 34 24 34"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
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
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M9 4H24L32 12V36H9V4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M24 4V13H32"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
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
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M9 5H31V35L20 28L9 35V5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
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

            <span className="text-2xl text-[#AAAAAA]">♩</span>
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

            <svg
              width="26"
              height="30"
              viewBox="0 0 26 30"
              fill="none"
              className="text-[#AAAAAA]"
            >
              <path
                d="M3 2H15L23 10V28H3V2Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M15 2V11H23"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

        </div>

      </div>
    </main>
  );
}