"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function TermsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white">
            <div className="max-w-md w-full text-center space-y-6 bg-slate-50 border border-slate-200/80 p-8 rounded-2xl shadow-sm">
                <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900">
                        সাময়িক সমস্যা দেখা দিয়েছে!
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        পেইজটি লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন অথবা হোমপেজে ফিরে যান।
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        onClick={() => reset()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#35858E] hover:bg-[#2c6e76] text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>আবার চেষ্টা করুন</span>
                    </button>

                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl transition-all"
                    >
                        <Home className="w-4 h-4" />
                        <span>হোমপেজে যান</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}