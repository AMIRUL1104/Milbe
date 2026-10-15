"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const currentUrl = typeof window !== "undefined" ? window.location.href : "";

        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(currentUrl);
                setCopied(true);
                toast.success("লিংক কপি করা হয়েছে!");
                setTimeout(() => setCopied(false), 2000);
            }
        } catch {
            toast.error("লিংক কপি করতে সমস্যা হয়েছে!");
        }
    };

    return (
        <button
            onClick={handleShare}
            title="লিংক কপি করুন"
            aria-label="Share page"
            className="max-sm:bg-slate-50 p-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#35858E] max-sm:text-[#35858E] rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center active:scale-95"
        >
            {copied ? (
                <Check className="w-5 h-5 text-emerald-600" />
            ) : (
                <Share2 className="w-5 h-5" />
            )}
        </button>
    );
}