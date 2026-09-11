"use client";

import { BookCondition } from "@/lib/constant/post";

interface ConditionPillsProps {
  value: BookCondition;
  onChange: (value: BookCondition) => void;
  options: { label: string; value: BookCondition }[];
}

export default function ConditionPills({
  value,
  onChange,
  options,
}: ConditionPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`border px-3.5 py-2 rounded-full text-sm cursor-pointer transition-base ${
            value === option.value
              ? "border-primary bg-primary text-white font-semibold"
              : "border-border bg-surface text-text-secondary"
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
