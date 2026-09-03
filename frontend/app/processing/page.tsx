"use client";

import { useEffect } from "react";

export default function ProcessingPage() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/studypack";
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-black">
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl font-bold">
                        Study<span className="text-[#6C4DFF]">Buddy</span>
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

                    {/* Steps */}
                    <div className="mt-12 flex items-start justify-between">

                        {/* Step 1 */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="relative flex items-center">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#6C4DFF] bg-[#F0ECFF]">
                                    <svg
                                        width="32"
                                        height="40"
                                        viewBox="0 0 32 40"
                                        fill="none"
                                    >
                                        <path
                                            d="M16 3V25"
                                            stroke="#6C4DFF"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M8 17V24C8 28.4183 11.5817 32 16 32C20.4183 32 24 28.4183 24 24V17"
                                            stroke="#6C4DFF"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M16 32V37"
                                            stroke="#6C4DFF"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M10 37H22"
                                            stroke="#6C4DFF"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>

                                {/* Connecting line */}
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

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F1F1F1]">
                                    <svg
                                        width="32"
                                        height="36"
                                        viewBox="0 0 32 36"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 2H19L27 10V34H5V2Z"
                                            stroke="#B5B5B5"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M19 2V11H27"
                                            stroke="#B5B5B5"
                                            strokeWidth="2"
                                        />
                                    </svg>
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

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F1F1F1]">
                                    <svg
                                        width="32"
                                        height="36"
                                        viewBox="0 0 32 36"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 2H19L27 10V34H5V2Z"
                                            stroke="#B5B5B5"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M19 2V11H27"
                                            stroke="#B5B5B5"
                                            strokeWidth="2"
                                        />
                                    </svg>
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

                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F1F1F1]">
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="26"
                                        height="26"
                                        rx="2"
                                        stroke="#B5B5B5"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M10 4V30"
                                        stroke="#B5B5B5"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M10 12H30"
                                        stroke="#B5B5B5"
                                        strokeWidth="2"
                                    />
                                </svg>
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
                            className="h-full rounded-full bg-[#6C4DFF]"
                            style={{ width: "35%" }}
                        />
                    </div>

                    <span className="text-sm font-bold text-[#6C4DFF]">
                        35%
                    </span>

                </div>

            </div>
        </main>
    );
}