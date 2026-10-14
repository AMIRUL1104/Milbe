"use client";

import { memo, useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { STEP_SECTIONS, STEP_LABELS } from "@/lib/constant/post";
import TipsModal from "./TipsModal";
import BackButton from "../ui/BackButton";

interface TopBarProps {
  activeStepIndex: number;
  onStepClick?: (index: number) => void;
  draftTimestamp?: string | null;
  isEditing?: boolean;
}

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
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  // Lazily compute the draft-saved label at mount, then keep it in sync with
  // the prop via the render-time adjustment pattern (no setState-in-effect).
  const [saveTimeText, setSaveTimeText] = useState<string | null>(() =>
    formatTimeAgo(draftTimestamp)
  );
  const [lastDraftTimestamp, setLastDraftTimestamp] = useState(draftTimestamp);
  if (draftTimestamp !== lastDraftTimestamp) {
    setLastDraftTimestamp(draftTimestamp);
    setSaveTimeText(formatTimeAgo(draftTimestamp));
  }

  useEffect(() => {
    // 1. ক্লায়েন্ট সাইডে মাউন্ট হওয়ার পর টাইম হিসাব করা
    // Initial value is computed during render (above); the interval below
    // only refreshes the relative time.
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



  return (
    <div className="sticky top-0 z-40 bg-surface border-b border-border-light">
      <div className="max-w-[1100px] mx-auto flex items-center gap-3 px-4 py-3">
        <BackButton />

        <div className="flex-1 font-semibold text-xs text-text-primary">
          {isEditing ? "পোস্ট সম্পাদনা করুন" : "নতুন পোস্ট"}

        </div>

        {saveTimeText && (
          <div className="hidden sm:inline-flex font-en text-xs font-medium text-secondary-hover bg-secondary-light px-3 py-1.5 rounded-full whitespace-nowrap">
            ড্রাফট সংরক্ষিত • {saveTimeText}
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsTipsOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-semibold text-accent-text hover:bg-accent-light hover:border-[rgba(246,206,113,0.6)] transition-base cursor-pointer whitespace-nowrap"
        >
          <Lightbulb size={14} />
          ভালো পোস্ট দেওয়ার টিপস
        </button>
      </div>

      <TipsModal isOpen={isTipsOpen} onClose={() => setIsTipsOpen(false)} />



      <div className="w-full max-w-[1100px] mx-auto flex items-center gap-1 px-1 sm:px-4 py-1 sm:pb-2.5 overflow-x-hidden">
        {STEP_SECTIONS.map((section, idx) => {
          const isActive = idx === activeStepIndex;
          const isDone = idx < activeStepIndex;

          return (
            <button
              key={section}
              type="button"
              className={`flex-1 min-w-0 flex items-center justify-center sm:justify-start gap-1 px-1 sm:px-3 py-1.5 rounded-full border transition-base cursor-pointer ${isActive
                ? "border-primary bg-primary-light text-primary font-medium"
                : isDone
                  ? "border-border bg-surface text-secondary-hover"
                  : "border-border bg-surface text-text-muted"
                }`}
              onClick={() => handleStepClick(idx)}
            >
              <span className="text-[10px] sm:text-xs truncate">
                {STEP_LABELS[idx]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(TopBarComponent);