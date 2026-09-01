import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BookMarked, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Knowledge Base | Dashboard",
    description: "View curated academic resources and verified books on Milbe.",
};

export default function KnowledgeBasePlaceholderPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center select-none animate-fade-in">

            {/* 1. Centered Empty State Card */}
            <div className="max-w-md w-full bg-white border border-slate-100 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">

                {/* Brand Icon Wrapper */}
                <div className="w-16 h-16 bg-[#35858E]/10 text-[#35858E] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#35858E]/20">
                    <BookMarked className="w-8 h-8" />
                </div>

                {/* Heading */}
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    Knowledge Base
                </h1>

                {/* Message */}
                <p className="text-base font-bold text-slate-800 mb-2">
                    No books have been added to the Knowledge Base yet.
                </p>

                {/* Subtitle */}
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                    The Knowledge Base will be available once books are reviewed and added by the administrator.
                </p>

                {/* 2. Action Trigger (Fallback Routing) */}
                <Link
                    href="/dashboard/admin"
                    className="inline-flex items-center justify-center gap-2 w-full h-11 bg-[#35858E] hover:bg-[#2b6d75] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm shadow-[#35858e30] focus:outline-none focus:ring-2 focus:ring-[#35858E] focus:ring-offset-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Dashboard</span>
                </Link>

            </div>

        </div>
    );
}