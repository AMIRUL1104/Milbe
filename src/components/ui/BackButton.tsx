'use client'; // Next.js-এ ক্লায়েন্ট কম্পোনেন্ট ঘোষণা করার জন্য
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
    return (
        <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#35858E] bg-white hover:bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 transition-all duration-200 shadow-xs group cursor-pointer"
            aria-label="ফিরে যান"
        >
            <ArrowLeft size={18} strokeWidth={2} />
        </button>
    );
}