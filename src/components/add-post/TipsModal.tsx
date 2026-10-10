"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIPS = [
  "স্পষ্ট, মানসম্মত ও প্রাকৃতিক আলোয় তোলা ছবি দিন—একাধিক বই থাকলে একটি ছবিতেই সব বই স্পষ্টভাবে ফুটিয়ে তুলুন।",
  "বইয়ের প্রকৃত অবস্থা উল্লেখ করলে ক্রেতার আস্থা ও দ্রুত বিক্রির সম্ভাবনা বাড়ে।",
  "সঠিক শিরোনাম ও ক্যাটাগরি দিলে পোস্টটি সহজেই কাঙ্ক্ষিত ক্রেতার সার্চ ফলাফলে পৌঁছে যাবে।",
  "এখানে সম্পূর্ণ পোস্টের (সবগুলো বইয়ের) মোট মূল্য যুক্ত করুন; বাস্তবসম্মত দাম দিলে ক্রেতারা বেশি আকৃষ্ট হন।",
  "প্রোফাইলে ঠিকানা ও যোগাযোগের তথ্য সংরক্ষণ করে রাখুন—এতে পরবর্তী সময়ে দ্রুত ও অনায়াসে পোস্ট করতে পারবেন।",
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