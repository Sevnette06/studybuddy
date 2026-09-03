"use client";

import { useState } from "react";

export default function Home() {
  const [lectureFile, setLectureFile] = useState<File | null>(null);
  const [materialFile, setMaterialFile] = useState<File | null>(null);

  const handleLectureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) setLectureFile(file);
  };

  const handleMaterialUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) setMaterialFile(file);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFC] px-6 py-12 text-[#18181B]">
      <div className="mx-auto max-w-3xl text-center">

        {/* Logo */}
        <h1 className="text-4xl font-bold tracking-tight">
          Study<span className="text-[#6C4DFF]">Buddy</span>
        </h1>

        <p className="mt-4 text-sm text-[#71717A]">
          Making Learning an Experience and Not a Hassle
        </p>

        {/* Upload Cards */}
        <div className="mt-12 flex flex-col justify-center gap-8 sm:flex-row">

          {/* Lecture */}
          <div
            className={`w-full rounded-lg border bg-white p-8 shadow-sm sm:w-64 ${
              lectureFile
                ? "border-[#6C4DFF] ring-1 ring-[#6C4DFF]"
                : "border-[#E4E4E7]"
            }`}
          >
            <div className="flex justify-center">
              <span className="text-5xl text-[#6C4DFF]">♩</span>
            </div>

            <h2 className="mt-5 font-semibold">
              Upload Lecture
            </h2>

            <p className="mt-2 text-xs text-[#71717A]">
              MP3/MP4
            </p>

            <label className="mt-5 flex h-12 cursor-pointer items-center justify-center rounded-md bg-[#F0ECFF] text-sm font-semibold text-[#6C4DFF] transition hover:bg-[#E7E0FF]">
              {lectureFile ? (
                <div className="px-3 text-left">
                  <p className="truncate text-xs font-medium text-[#18181B]">
                    {lectureFile.name}
                  </p>
                  <p className="text-xs text-[#71717A]">
                    {(lectureFile.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              ) : (
                "Click to add"
              )}

              <input
                type="file"
                accept=".mp3,.mp4,.wav"
                className="hidden"
                onChange={handleLectureUpload}
              />
            </label>
          </div>

          {/* Materials */}
          <div
            className={`w-full rounded-lg border bg-white p-8 shadow-sm sm:w-64 ${
              materialFile
                ? "border-[#6C4DFF] ring-1 ring-[#6C4DFF]"
                : "border-[#E4E4E7]"
            }`}
          >
            <div className="flex justify-center">
              <span className="text-5xl text-[#6C4DFF]">▱</span>
            </div>

            <h2 className="mt-5 font-semibold">
              Upload Materials
            </h2>

            <p className="mt-2 text-xs text-[#71717A]">
              PDF/PPT
            </p>

            <label className="mt-5 flex h-12 cursor-pointer items-center justify-center rounded-md bg-[#F0ECFF] text-sm font-semibold text-[#6C4DFF] transition hover:bg-[#E7E0FF]">
              {materialFile ? (
                <div className="px-3 text-left">
                  <p className="truncate text-xs font-medium text-[#18181B]">
                    {materialFile.name}
                  </p>
                  <p className="text-xs text-[#71717A]">
                    {(materialFile.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              ) : (
                "Click to add"
              )}

              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                className="hidden"
                onChange={handleMaterialUpload}
              />
            </label>
          </div>
        </div>

        {/* Language */}
        <div className="mx-auto mt-12 flex max-w-lg flex-col gap-6 sm:flex-row">

          <div className="w-full text-left">
            <label className="mb-2 block text-xs text-[#71717A]">
              Language:
            </label>

            <select className="w-full rounded-md border border-[#E4E4E7] bg-white px-4 py-3 text-sm shadow-sm outline-none">
              <option>Auto detect</option>
              <option>Korean</option>
              <option>English</option>
              <option>Malay</option>
            </select>
          </div>

          <div className="w-full text-left">
            <label className="mb-2 block text-xs text-[#71717A]">
              Translate to:
            </label>

            <select className="w-full rounded-md border border-[#E4E4E7] bg-white px-4 py-3 text-sm shadow-sm outline-none">
              <option>English</option>
              <option>Korean</option>
              <option>Malay</option>
            </select>
          </div>

        </div>

        {/* Start Button */}
        <button
          className="mt-8 w-full max-w-xs rounded-md bg-[#6C4DFF] px-6 py-4 font-semibold text-white shadow-md transition hover:bg-[#5B3FE6]"
          onClick={() => alert("AI processing will be connected here!")}
        >
          Start Learning
        </button>

      </div>
    </main>
  );
}