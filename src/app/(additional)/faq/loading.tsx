import React from "react";

export default function FAQLoading() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-pulse">

            {/* 1. Hero Section Skeleton */}
            <div className="text-center mb-12 space-y-4">
                <div className="h-10 md:h-12 bg-slate-200 rounded-xl w-3/4 max-w-md mx-auto" />
                <div className="h-5 bg-slate-200 rounded-md w-full max-w-lg mx-auto" />
                <div className="h-5 bg-slate-200 rounded-md w-4/5 max-w-md mx-auto" />
            </div>

            {/* 2. Search Bar Skeleton */}
            <div className="max-w-2xl mx-auto mb-10">
                <div className="h-14 bg-slate-100 border-2 border-slate-200 rounded-2xl w-full" />
            </div>

            {/* 3. FAQ Categories Skeleton */}
            <div className="flex gap-2.5 mb-14 overflow-x-auto pb-2 sm:justify-center sm:flex-wrap sm:overflow-visible sm:pb-0">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div
                        key={index}
                        className="shrink-0 h-9 w-20 sm:w-24 bg-slate-200 rounded-full"
                    />
                ))}
            </div>

            {/* 4. FAQ Accordion Items Skeleton */}
            <div className="max-w-3xl mx-auto space-y-4 min-h-[22rem]">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4 min-w-0 w-full">
                            {/* Icon Box */}
                            <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0" />
                            {/* Question Text */}
                            <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                        </div>
                        {/* Arrow Icon Placeholder */}
                        <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0 ml-4" />
                    </div>
                ))}
            </div>

            {/* 5. Still Need Help Banner Skeleton */}
            <div className="mt-24 bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Banner Text */}
                    <div className="text-center md:text-left space-y-3 w-full md:w-auto">
                        <div className="h-8 bg-slate-800 rounded-lg w-48 mx-auto md:mx-0" />
                        <div className="h-4 bg-slate-800 rounded-md w-64 max-w-sm mx-auto md:mx-0" />
                        <div className="h-4 bg-slate-800 rounded-md w-48 max-w-xs mx-auto md:mx-0" />
                    </div>

                    {/* Banner Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                        <div className="h-12 w-full sm:w-36 bg-slate-800 rounded-xl" />
                        <div className="h-12 w-full sm:w-36 bg-slate-800 rounded-xl" />
                    </div>

                </div>
            </div>

        </div>
    );
}