"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIPS = [
  "স্পষ্ট ও প্রাকৃতিক আলোয় তোলা ছবি বেশি সাড়া পায়।",
  "বইয়ের প্রকৃত অবস্থা উল্লেখ করলে ক্রেতার আস্থা বাড়ে।",
  "একাধিক বই একসাথে পোস্ট করলে দ্রুত বিক্রি হয়।",
  "শিরোনাম ও ক্যাটাগরি স্পষ্ট দিলে সার্চে বেশি মানুষ পাবেন।",
  "মোট দাম বাস্তবসম্মত রাখুন — এটি পুরো পোস্টের সব বইয়ের জন্য প্রযোজ্য।",
  "ফোন নম্বর বিবরণে না লিখে যোগাযোগের ফিল্ডে দিন; চাইলে প্রোফাইলেও সংরক্ষণ করুন।",
];

/**
 * Accessible, mobile-friendly tips dialog opened from the Add Post header.
 * Inline dialog pattern (same approach as the admin delete modal) — no new
 * dependencies.
 */
export default function TipsModal({ isOpen, onClose }: TipsModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus the close button on open; restore body scroll on close.
  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // ESC to close.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tips-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md max-h-[85vh] overflow-y-auto bg-surface border border-border-light rounded-2xl shadow-xl">
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-accent-light text-accent-text flex items-center justify-center">
              <LightbulbIcon />
            </span>
            <h2
              id="tips-modal-title"
              className="text-base font-semibold text-text-primary"
            >
              ভালো পোস্ট দেওয়ার টিপস
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="w-8 h-8 rounded-full border border-border bg-surface text-text-muted flex items-center justify-center hover:bg-surface-hover hover:text-text-primary transition-base cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <ul className="px-5 pb-5 pt-1 space-y-2.5">
          {TIPS.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LightbulbIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}