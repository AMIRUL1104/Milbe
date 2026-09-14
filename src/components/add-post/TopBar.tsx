"use client";

import { memo, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface TopBarProps {
  activeStepIndex: number;
  onStepClick?: (index: number) => void;
  draftTimestamp?: string | null;
  isEditing?: boolean;
}

const STEP_SECTIONS = [
  "step-basic",
  "step-books",
  "step-location",
  "step-contact",
];

const STEP_LABELS = ["মূল তথ্য", "বইসমূহ", "অবস্থান", "যোগাযোগ"];

function formatTimeAgo(timestamp: string | null | undefined): string | null {
  if (!timestamp) return null;

  const saved = new Date(timestamp);
  if (isNaN(saved.getTime())) return null;

  const diffMins = Math.floor((Date.now() - saved.getTime()) / 60000);

  if (diffMins < 1) return "এখনই";
  if (diffMins < 60) return `${diffMins} মিনিট আগে`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;

  return "আগে";
}

function TopBarComponent({
  activeStepIndex,
  onStepClick,
  draftTimestamp,
  isEditing = false,
}: TopBarProps) {
  const router = useRouter();
  const [saveTimeText, setSaveTimeText] = useState<string | null>(null);

  useEffect(() => {
    // 1. ক্লায়েন্ট সাইডে মাউন্ট হওয়ার পর টাইম হিসাব করা
    setSaveTimeText(formatTimeAgo(draftTimestamp));

    // 2. প্রতি ১ মিনিটে সময় আপডেট করার ইন্টারভাল (ঐচ্ছিক কিন্তু ইউজার এক্সপেরিয়েন্সের জন্য ভালো)
    const interval = setInterval(() => {
      setSaveTimeText(formatTimeAgo(draftTimestamp));
    }, 60000);

    return () => clearInterval(interval);
  }, [draftTimestamp]);

  const handleStepClick = (idx: number) => {
    if (onStepClick) {
      onStepClick(idx);
    } else {
      const target = document.getElementById(STEP_SECTIONS[idx]);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const progressPercentage = useMemo(() => {
    const totalSteps = STEP_SECTIONS.length;
    if (totalSteps === 0) return 0;
    return Math.min(
      Math.max(((activeStepIndex + 1) / totalSteps) * 100, 0),
      100
    );
  }, [activeStepIndex]);

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
          {isEditing ? "পোস্ট সম্পাদনা করুন" : "নতুন পোস্ট"}
          <small className="block font-en font-medium text-[11.5px] text-text-muted tracking-wide">
            MILBE · SELL OR DONATE BOOKS
          </small>
        </div>

        {saveTimeText && (
          <div className="hidden sm:inline-flex font-en text-xs font-medium text-secondary-hover bg-secondary-light px-3 py-1.5 rounded-full whitespace-nowrap">
            খসড়া সংরক্ষিত • {saveTimeText}
          </div>
        )}
      </div>

      <div className="h-[3px] bg-border-light relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-slow"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto flex gap-1.5 px-4 pb-2.5 overflow-x-auto">
        {STEP_SECTIONS.map((section, idx) => {
          const isActive = idx === activeStepIndex;
          const isDone = idx < activeStepIndex;

          return (
            <button
              key={section}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-base whitespace-nowrap cursor-pointer ${isActive
                  ? "border-primary bg-primary-light text-primary font-medium"
                  : isDone
                    ? "border-border bg-surface text-secondary-hover"
                    : "border-border bg-surface text-text-muted"
                }`}
              onClick={() => handleStepClick(idx)}
            >
              <span
                className={`w-[18px] h-[18px] rounded-full font-en text-[10.5px] font-semibold flex items-center justify-center transition-base ${isActive
                    ? "bg-secondary text-white"
                    : "bg-border-light text-text-muted"
                  }`}
              >
                {idx + 1}
              </span>
              {STEP_LABELS[idx]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(TopBarComponent);