import { Suspense } from "react";
import Link from "next/link";
import { CirclePlus, Download, GraduationCap, Sparkles } from "lucide-react";
import HeroSearchBar from "./HeroSearch";
import HeroActions from "./Heroactions";


const APP_DOWNLOAD_URL = "#download";

function SellButton({ className = "" }: { className?: string }) {
    return (
        <Link
            href="/add-post"
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#35858E] px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgba(53,133,142,0.75)] transition-all hover:bg-[#2d737b] active:scale-[0.98] ${className}`}
        >
            <CirclePlus className="h-5 w-5 text-[#F6CE71]" />
            <span>আপনার বই বিক্রি করুন</span>
        </Link>
    );
}

function DownloadButton({ className = "" }: { className?: string }) {
    return (
        <a
            href={APP_DOWNLOAD_URL}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#35858E]  px-6 py-3.5 text-base font-bold text-[#35858E] backdrop-blur-sm transition-all bg-[#35858E]/10 active:scale-[0.98] ${className}`}
        >
            <Download className="h-5 w-5" />
            <span>অ্যাপটি ডাউনলোড করুন</span>
        </a>
    );
}

/* Shared look for the frosted-glass shapes in the background */
const glass =
    "pointer-events-none absolute -z-10 border border-white/60 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_48px_-24px_rgba(53,133,142,0.35)] backdrop-blur-xl";

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F5F7F8] via-[#F8F9FA] to-[#F3EFE2] px-4 pb-8 pt-6 sm:px-6 sm:py-10 md:py-16 lg:py-20">
            {/* ===== BACKGROUND ===== */}

            {/* 1. Geometric pattern: diamond lattice, fades out toward the edges */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-30 h-full w-full text-[#35858E] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]"
            >
                <defs>
                    <pattern
                        id="hero-geo"
                        width="56"
                        height="56"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M28 0 L56 28 L28 56 L0 28 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeOpacity="0.14"
                            strokeWidth="1"
                        />
                        <path
                            d="M28 14 L42 28 L28 42 L14 28 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeOpacity="0.08"
                            strokeWidth="1"
                        />
                        <circle cx="28" cy="28" r="1.5" fill="currentColor" fillOpacity="0.2" />
                        <circle cx="0" cy="0" r="1.5" fill="currentColor" fillOpacity="0.2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-geo)" />
            </svg>

            {/* 2. Soft round radial gradients */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(53,133,142,0.32)_0%,rgba(53,133,142,0)_70%)] sm:h-[28rem] sm:w-[28rem]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-20 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(246,206,113,0.45)_0%,rgba(246,206,113,0)_70%)] sm:h-[28rem] sm:w-[28rem]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[35%] top-4 -z-20 hidden h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(125,167,140,0.28)_0%,rgba(125,167,140,0)_70%)] md:block"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 right-[6%] -z-20 hidden h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(246,206,113,0.35)_0%,rgba(246,206,113,0)_70%)] md:block"
            />

            {/* 3. Glassmorphism: frosted shapes sitting on top of the gradients */}
            <div
                aria-hidden="true"
                className={`${glass} -right-6 top-16 h-32 w-32 rounded-full sm:right-[6%] sm:top-14 sm:h-52 sm:w-52`}
            />
            <div
                aria-hidden="true"
                className={`${glass} -left-8 bottom-20 h-28 w-28 rounded-full sm:left-[4%] sm:h-44 sm:w-44`}
            />
            <div
                aria-hidden="true"
                className={`${glass} bottom-12 right-[14%] hidden h-44 w-44 rotate-12 rounded-[2.5rem] md:block`}
            />

            {/* ===== CONTENT ===== */}
            <div className="mx-auto max-w-7xl">
                {/* Badge: says what Milbe is */}
                <div className="hero-fade-up mb-4 flex justify-center sm:mb-5 md:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#35858E]/25 bg-white/80 px-4 py-1.5 text-xs font-bold text-[#35858E] shadow-2xs backdrop-blur-md sm:text-sm">
                        <GraduationCap className="h-4 w-4 shrink-0" />
                        <span>শিক্ষার্থীদের পুরোনো বইয়ের মার্কেটপ্লেস</span>
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#F6CE71]" />
                    </span>
                </div>

                <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-12 md:gap-8 lg:gap-12">
                    {/* LEFT: heading + desktop-only content */}
                    <div className="flex flex-col items-center md:col-span-6 md:items-start lg:col-span-7">
                        <h1 className="hero-fade-up hero-delay-1 text-center text-[2rem] font-black leading-[1.25] tracking-tight text-gray-900 md:hidden sm:text-5xl md:text-left lg:text-[3.5rem]">
                            মিলবে-তে আপনার...
                        </h1>

                        <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-gray-600 sm:text-xl md:block">
                            বাংলাদেশের শিক্ষার্থীদের একাডেমিক বই কেনাবেচা ও দান করার একমাত্র নির্ভরযোগ্য প্ল্যাটফর্ম।
                        </p>

                        {/* Search (desktop only). useSearchParams needs a Suspense boundary */}
                        <div className="mt-6 hidden w-full max-w-xl md:block">
                            <Suspense
                                fallback={
                                    <div className="h-[54px] w-full rounded-2xl border border-gray-200 bg-white/80" />
                                }
                            >
                                <HeroSearchBar />
                            </Suspense>
                        </div>

                        {/* Desktop CTAs */}
                        <div className="hero-fade-up hero-delay-3 mt-7 hidden items-center gap-4 md:flex">
                            <SellButton />
                            <DownloadButton />
                        </div>
                    </div>

                    {/* RIGHT: the three actions complete the sentence "মিলবে-তে আপনার…" */}
                    <div className="md:col-span-6 lg:col-span-5">
                        <div className="rounded-3xl border border-white/70 bg-white/65 p-2 shadow-[0_24px_48px_-24px_rgba(53,133,142,0.4)] backdrop-blur-xl sm:p-3">
                            <HeroActions />
                        </div>

                        {/* Mobile CTAs: sell is the primary action */}
                        <div className="hero-fade-up hero-delay-3 mt-4 flex flex-col gap-3 md:hidden">
                            <SellButton className="w-full py-4" />
                            <DownloadButton className="w-full py-3.5" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}