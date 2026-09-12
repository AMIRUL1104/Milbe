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
    <>
      {/* Mobile view: Dropdown */}
      <div className="block md:hidden w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BookCondition)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-text-secondary text-sm focus:outline-none focus:border-primary"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop view: Pills */}
      <div className="hidden md:flex md:flex-wrap md:gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`border px-3.5 py-2 rounded-full text-sm cursor-pointer transition-base ${value === option.value
              ? "border-primary bg-primary text-white font-semibold"
              : "border-border bg-surface text-text-secondary"
              }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </>
  );
}