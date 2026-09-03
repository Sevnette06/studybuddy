export default function NotesPage() {
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

        {/* Notes */}
        <div className="space-y-5">

          {/* Topic 1 */}
          <section className="rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              1. Introduction to the Topic
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#555555]">
              This section introduces the main concepts discussed
              during the lecture and provides an overview of the
              important ideas students should understand.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[#555555]">
              <li>Understand the basic concepts introduced.</li>
              <li>Identify the key terms used in the lecture.</li>
              <li>Connect the lecture content with the provided slides.</li>
            </ul>
          </section>

          {/* Topic 2 */}
          <section className="rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              2. Key Concepts
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#555555]">
              The lecture explains several important concepts that
              form the foundation of this topic.
            </p>

            <div className="mt-5 rounded-md bg-[#F8F7FF] p-5">
              <h4 className="text-sm font-bold text-[#6C4DFF]">
                Important
              </h4>

              <p className="mt-2 text-sm leading-6 text-[#555555]">
                Focus on understanding the relationship between
                the concepts rather than memorising individual
                definitions.
              </p>
            </div>
          </section>

          {/* Topic 3 */}
          <section className="rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              3. Summary
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#555555]">
              The lecture and slides together provide a concise
              overview of the topic, highlighting the most
              important information for revision.
            </p>
          </section>

        </div>

        {/* Back button */}
        <div className="mt-8">
          <a
            href="/studypack"
            className="inline-flex rounded-md border border-[#E5E5E5] bg-white px-5 py-3 text-sm font-semibold transition hover:bg-[#F5F5F5]"
          >
            ← Back to StudyPack
          </a>
        </div>

      </div>
    </main>
  );
}