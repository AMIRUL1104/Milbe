import React from "react";

export default function TermsLoading() {
    return (
        <div className="bg-white min-h-screen font-sans animate-pulse">
            {/* Hero Section Skeleton */}
            <header className="border-b border-slate-100 bg-slate-50/50 py-10 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    {/* Subtitle / Tag Skeleton */}
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-slate-200 rounded-md" />
                        <div className="h-4 w-24 bg-slate-200 rounded-md" />
                    </div>

                    {/* Title Skeleton */}
                    <div className="h-8 sm:h-10 md:h-12 bg-slate-200 rounded-xl w-3/4 max-w-xl" />

                    {/* Description Skeleton */}
                    <div className="space-y-2 max-w-3xl pt-1">
                        <div className="h-4 bg-slate-200 rounded-md w-full" />
                        <div className="h-4 bg-slate-200 rounded-md w-5/6" />
                    </div>

                    {/* Date Badge Skeleton */}
                    <div className="pt-2">
                        <div className="h-7 w-48 bg-slate-200 rounded-lg" />
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 items-start">

                    {/* Sidebar / Navigation Skeleton */}
                    <aside className="lg:col-span-1 border border-slate-200/80 rounded-2xl p-4 bg-white shadow-sm space-y-3">
                        <div className="h-3 w-20 bg-slate-200 rounded mb-4" />
                        {/* Nav Items Skeletons */}
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="h-9 w-full bg-slate-100 rounded-xl" />
                        ))}
                    </aside>

                    {/* Content Cards Skeleton */}
                    <div className="col-span-1 lg:col-span-3 space-y-6 sm:space-y-8">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 md:p-8 space-y-4"
                            >
                                {/* Card Title Skeleton */}
                                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-200 rounded-lg shrink-0" />
                                    <div className="h-6 bg-slate-200 rounded-md w-1/3" />
                                </div>

                                {/* Card Text Content Skeleton */}
                                <div className="space-y-2.5 pt-1">
                                    <div className="h-4 bg-slate-100 rounded-md w-full" />
                                    <div className="h-4 bg-slate-100 rounded-md w-11/12" />
                                    <div className="h-4 bg-slate-100 rounded-md w-4/5" />
                                </div>
                            </div>
                        ))}

                        {/* Bottom Highlight Card Skeleton */}
                        <div className="bg-slate-200 rounded-2xl p-6 sm:p-8 h-32 w-full" />
                    </div>

                </div>
            </div>
        </div>
    );
}