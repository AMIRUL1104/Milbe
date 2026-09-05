"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface LocationWarningProps {
    title: string;
    actionLabel: string;
    actionHref?: string;
}

export default function LocationWarning({
    title,
    actionLabel,
    actionHref = "#location-selector",
}: LocationWarningProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="mb-5 flex items-center gap-3 rounded-btn border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950 shadow-xs">
            <span className="min-w-0 flex-1">
                <strong className="block sm:text-sm text-xs font-semibold">{title}</strong>
                <span className="block sm:text-sm text-xs text-amber-900">
                    তাহলে আপনার এলাকার বই আগে দেখতে পারবেন।
                </span>
            </span>

            <button
                type="button"
                onClick={() => setIsVisible(false)}
                aria-label="বন্ধ করুন"
                className="shrink-0 rounded-btn p-1 text-amber-900 hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-amber-600"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
