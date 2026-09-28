function SkeletonChip({ className = "" }: { className?: string }) {
    return <div className={`h-8 rounded-full bg-slate-200 ${className}`} />;
}

function SkeletonBookCard() {
    return (
        <div className="group overflow-hidden rounded-[18px] border border-[#E7ECEF] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.03)]">
            <div className="relative overflow-hidden bg-slate-200">
                <div className="h-48 w-full animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-200" />
                <div className="absolute right-3 top-3 h-7 w-16 rounded-full bg-white/80 backdrop-blur-sm" />
            </div>

            <div className="space-y-3 p-3.5 sm:p-4">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />

                <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="h-3 w-16 rounded bg-slate-200" />
                    <div className="h-5 w-16 rounded-full bg-slate-200" />
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                    <div className="h-3 w-20 rounded bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

function HeaderFiltersSkeleton() {
    return (
        <div className="w-full border-b border-[#E7ECEF] bg-[#F5F7F8]/90 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="hidden items-center gap-3 lg:flex">
                    <div className="h-10 w-36 rounded-xl border border-[#E7ECEF] bg-slate-200/80" />
                    <div className="h-10 w-36 rounded-xl border border-[#E7ECEF] bg-slate-200/80" />
                    <div className="ml-auto flex items-center gap-1 rounded-xl border border-[#E7ECEF] bg-white/80 p-1 shadow-sm">
                        <SkeletonChip className="w-16" />
                        <SkeletonChip className="w-16" />
                        <SkeletonChip className="w-16" />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 lg:hidden">
                    <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-xl border border-[#E7ECEF] bg-white/80 p-1 shadow-sm">
                        <SkeletonChip className="w-14" />
                        <SkeletonChip className="w-16" />
                        <SkeletonChip className="w-16" />
                    </div>
                    <div className="h-9 w-20 rounded-xl border border-[#E7ECEF] bg-slate-200/80" />
                </div>
            </div>
        </div>
    );
}

function HeroSkeleton() {
    return (
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F5F7F8] via-[#F8F9FA] to-[#F3EFE2] px-4 pb-8 pt-6 sm:px-6 sm:py-10 md:py-16 lg:py-20 animate-pulse">
            {/* Background Soft Gradients Placeholder */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 -z-20 h-72 w-72 rounded-full bg-[#35858E]/10 blur-3xl sm:h-[28rem] sm:w-[28rem]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-20 -z-20 h-72 w-72 rounded-full bg-[#F6CE71]/15 blur-3xl sm:h-[28rem] sm:w-[28rem]"
            />

            <div className="mx-auto max-w-7xl">
                {/* 1. Badge Placeholder */}
                <div className="mb-4 flex justify-center sm:mb-5 md:justify-start">
                    <div className="h-8 w-64 rounded-full bg-slate-200/80" />
                </div>

                <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-12 md:gap-8 lg:gap-12">
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col items-center md:col-span-6 md:items-start lg:col-span-7">
                        {/* Heading Placeholder */}
                        <div className="h-10 w-3/4 max-w-md rounded-xl bg-slate-200 md:hidden sm:h-12" />
                        <div className="hidden h-14 w-full max-w-lg rounded-2xl bg-slate-200 md:block" />

                        {/* Subtitle Placeholder (Desktop only) */}
                        <div className="mt-3 hidden w-full max-w-xl space-y-2 md:block">
                            <div className="h-4 w-full rounded-md bg-slate-200" />
                            <div className="h-4 w-4/5 rounded-md bg-slate-200" />
                        </div>

                        {/* Search Bar Placeholder (Desktop only) */}
                        <div className="mt-6 hidden h-[54px] w-full max-w-xl rounded-2xl bg-white/80 border border-gray-200/80 md:block" />

                        {/* Desktop CTAs Placeholder */}
                        <div className="mt-7 hidden items-center gap-4 md:flex">
                            <div className="h-13 w-48 rounded-xl bg-[#35858E]/30" />
                            <div className="h-13 w-48 rounded-xl bg-[#35858E]/15 border border-[#35858E]/20" />
                        </div>
                    </div>

                    {/* RIGHT COLUMN (HeroActions Wrapper) */}
                    <div className="md:col-span-6 lg:col-span-5">
                        <div className="rounded-3xl border border-white/70 bg-white/65 p-2 shadow-sm backdrop-blur-xl sm:p-3">
                            <ul className="flex flex-col">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-3.5 px-3.5 py-3.5 sm:py-4 ${index !== 2 ? "border-b border-[#35858E]/10" : ""
                                            }`}
                                    >
                                        <div className="h-11 w-11 shrink-0 rounded-xl bg-[#35858E]/15" />
                                        <div className="h-5 w-48 rounded-lg bg-slate-200" />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile CTAs Placeholder */}
                        <div className="mt-4 flex flex-col gap-3 md:hidden">
                            <div className="h-13 w-full rounded-xl bg-[#35858E]/30" />
                            <div className="h-13 w-full rounded-xl bg-[#35858E]/15 border border-[#35858E]/20" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function NearbyBooksSkeleton() {
    return (
        <section className="bg-background py-8 sm:py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col items-center justify-between gap-4 border-b border-[#E7ECEF] pb-4 text-center sm:flex-row sm:text-left sm:pb-5">
                    <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
                            <div className="h-7 w-40 rounded bg-slate-200 sm:h-8" />
                            <div className="h-6 w-20 rounded-full bg-[#35858E]/10" />
                        </div>
                        <div className="h-3 w-56 rounded bg-slate-200" />
                    </div>

                    <div className="h-10 w-36 rounded-xl border border-[#E7ECEF] bg-slate-200/80" />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonBookCard key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BooksGridSkeleton() {
    return (
        <section className="w-full py-4 sm:py-6">
            <div className="space-y-4">
                <div className="mb-6 flex flex-col items-center justify-center gap-3 border-b border-[#E7ECEF] pb-4 text-center sm:flex-row sm:justify-between sm:text-left sm:pb-5">
                    <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
                            <div className="h-7 w-32 rounded bg-slate-200 sm:h-8" />
                            <div className="h-6 w-24 rounded-full bg-[#35858E]/10" />
                        </div>
                        <div className="h-3 w-52 rounded bg-slate-200" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonBookCard key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PaginationSkeleton() {
    return (
        <div className="flex justify-center pt-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-[#E7ECEF] bg-white p-1.5 shadow-sm">
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
                <div className="h-9 w-9 rounded-lg bg-[#35858E]/20" />
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
            </div>
        </div>
    );
}

function HowItWorksSkeleton() {
    return (
        <section className="w-full border-y border-slate-100 bg-slate-50/50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                    <div className="mx-auto mb-3 h-7 w-32 rounded-full bg-[#35858E]/10" />
                    <div className="mx-auto h-8 w-52 rounded bg-slate-200" />
                    <div className="mx-auto mt-3 h-4 w-72 rounded bg-slate-200" />
                </div>

                <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="relative z-10 flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm"
                        >
                            <div className="mb-4 h-6 w-16 rounded-full bg-[#35858E]/10" />
                            <div className="mb-4 h-14 w-14 rounded-2xl bg-slate-200" />
                            <div className="mb-2 h-5 w-28 rounded bg-slate-200" />
                            <div className="h-3 w-full rounded bg-slate-200" />
                            <div className="mt-1 h-3 w-4/5 rounded bg-slate-200" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhyChooseUsSkeleton() {
    return (
        <section className="w-full border-t border-[#DDE5E7] bg-white py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                    <div className="mx-auto mb-3 h-7 w-32 rounded-full bg-[#35858E]/10" />
                    <div className="mx-auto h-8 w-52 rounded bg-slate-200" />
                    <div className="mx-auto mt-3 h-4 w-full max-w-xl rounded bg-slate-200" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-[#EDF1F2] bg-[#F5F7F8] p-6"
                        >
                            <div className="mb-4 h-12 w-12 rounded-xl bg-[#35858E]/10" />
                            <div className="mb-2 h-5 w-28 rounded bg-slate-200" />
                            <div className="h-3 w-full rounded bg-slate-200" />
                            <div className="mt-1 h-3 w-5/6 rounded bg-slate-200" />
                            <div className="mt-1 h-3 w-3/4 rounded bg-slate-200" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASkeleton() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#35858E]/40 bg-linear-to-br from-[#2d737b] via-[#35858E] via-65% to-[#F6CE71]/90 p-6 text-white sm:p-10 md:p-14">
                <div className="relative z-10 mx-auto max-w-2xl text-center">
                    <div className="mx-auto mb-5 inline-flex h-8 items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 text-xs font-medium sm:text-sm">
                        <div className="mr-2 h-3.5 w-3.5 rounded-full bg-[#F6CE71]/80" />
                        <div className="h-3 w-20 rounded-full bg-white/40" />
                    </div>

                    <div className="space-y-3">
                        <div className="mx-auto h-8 w-72 rounded bg-white/20 sm:h-9" />
                        <div className="mx-auto h-8 w-64 rounded bg-white/20 sm:h-9" />
                    </div>

                    <div className="mx-auto mt-5 h-4 w-80 rounded bg-white/20" />
                    <div className="mx-auto mt-2 h-4 w-72 rounded bg-white/20" />

                    <div className="mt-6 flex justify-center">
                        <div className="h-12 w-52 rounded-lg bg-[#171717]/80" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Loading() {
    return (
        <div className="w-full min-h-screen overflow-x-hidden bg-[#F5F7F8] font-sans antialiased">
            <main aria-busy="true" aria-live="polite">
                <HeaderFiltersSkeleton />
                <HeroSkeleton />
                <NearbyBooksSkeleton />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <BooksGridSkeleton />
                    <div className="pb-8 pt-2">
                        <PaginationSkeleton />
                    </div>
                </div>

                <HowItWorksSkeleton />
                <WhyChooseUsSkeleton />
                <CTASkeleton />
            </main>
        </div>
    );
}
