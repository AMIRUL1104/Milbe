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
                <strong className="block text-sm font-semibold">{title}</strong>
                <span className="block text-sm text-amber-900">
                    তাহলে আপনার এলাকার বই আগে দেখতে পারবেন।
                </span>
            </span>
            <button
                type="button"
                onClick={() => {
                    if (actionHref) {
                        window.location.href = actionHref;
                        return;
                    }
                    window.dispatchEvent(new CustomEvent("open-location-selector"));
                }}
                className="shrink-0 rounded-btn border border-amber-400 px-3 py-2 text-sm font-semibold text-amber-950 hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-amber-600"
            >
                {actionLabel}
            </button>
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
