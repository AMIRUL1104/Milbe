"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface TopBarProps {
  activeStepIndex: number;
  onStepClick?: (index: number) => void;
}

const STEP_SECTIONS = [
  "step-basic",
  "step-books",
  "step-location",
  "step-contact",
];

const STEP_LABELS = ["মূল তথ্য", "বইসমূহ", "অবস্থান", "যোগাযোগ"];

export default function TopBar({ activeStepIndex, onStepClick }: TopBarProps) {
  const router = useRouter();

  const handleStepClick = (idx: number) => {
    if (onStepClick) {
      onStepClick(idx);
    } else {
      // Fallback if no handler provided
      const target = document.getElementById(STEP_SECTIONS[idx]);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-surface border-b border-border-light">
      <div className="max-w-[1100px] mx-auto flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-btn border border-border bg-surface text-text-secondary hover:bg-surface-hover hover:border-primary transition-base cursor-pointer"
          onClick={() => router.back()}
          aria-label="ফিরে যান"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div className="flex-1 font-semibold text-[15.5px] text-text-primary">
          নতুন পোস্ট
          <small className="block font-en font-medium text-[11.5px] text-text-muted tracking-wide">
            MILBE · SELL OR DONATE BOOKS
          </small>
        </div>
        <div className="hidden sm:inline-flex font-en text-xs font-medium text-secondary-hover bg-secondary-light px-3 py-1.5 rounded-full whitespace-nowrap">
          খসড়া সংরক্ষিত
        </div>
      </div>

      <div className="h-[3px] bg-border-light relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-slow"
          style={{ width: `${((activeStepIndex + 1) / STEP_SECTIONS.length) * 100}%` }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto flex gap-1.5 px-4 pb-2.5 overflow-x-auto">
        {STEP_SECTIONS.map((section, idx) => (
          <button
            key={section}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-base whitespace-nowrap cursor-pointer ${idx === activeStepIndex
              ? "border-primary bg-primary-light text-primary"
              : idx < activeStepIndex
                ? "border-border bg-surface text-secondary-hover"
                : "border-border bg-surface text-text-muted"
              }`}
            onClick={() => handleStepClick(idx)}
          >
            <span
              className={`w-[18px] h-[18px] rounded-full font-en text-[10.5px] font-semibold flex items-center justify-center transition-base ${idx === activeStepIndex
                ? "bg-secondary text-white"
                : "bg-border-light text-text-muted"
                }`}
            >
              {idx + 1}
            </span>
            {STEP_LABELS[idx]}
          </button>
        ))}
      </div>
    </div>
  );
}
