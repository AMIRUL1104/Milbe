"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, GripHorizontal } from "lucide-react";

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "All",
  "Science",
  "Commerce",
  "Arts",
  "Admission",
  "Buisness",
  "Engineering",
  "Medical",
  "Others",
] as const;

const CONDITIONS = [
  { label: "All", value: "" },
  { label: "Like New", value: "like_new" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
] as const;

export function FilterBottomSheet({ isOpen, onClose }: FilterBottomSheetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sheetRef = useRef<HTMLDivElement>(null);

  const category = searchParams.get("category") || "";
  const condition = searchParams.get("condition") || "";

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const activeCount = [category, condition].filter(Boolean).length;

  const handleReset = () => {
    updateParams({ category: undefined, condition: undefined });
  };

  const handleApply = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={sheetRef}
        className="absolute inset-x-0 bottom-0 bg-surface border-t border-border rounded-t-3xl shadow-2xl flex flex-col h-[85vh] translate-y-0 transition-transform duration-300 ease-out" role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <GripHorizontal className="w-5 h-5 text-text-muted" />
            <h2 className="text-lg font-bold text-primary">ফিল্টার করুন</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-btn text-text-secondary hover:text-primary hover:bg-background transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              📚 Category
            </label>
            <select
              value={category}
              onChange={(e) => updateParams({ category: e.target.value || undefined })}
              className="w-full bg-background border border-border text-text-primary text-sm rounded-input px-3 py-2.5 appearance-none focus:outline-primary-focus cursor-pointer"
            >
              <option value="">All Categories</option>
              {CATEGORIES.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              🛡 Condition
            </label>
            <select
              value={condition}
              onChange={(e) => updateParams({ condition: e.target.value || undefined })}
              className="w-full bg-background border border-border text-text-primary text-sm rounded-input px-3 py-2.5 appearance-none focus:outline-primary-focus cursor-pointer"
            >
              {CONDITIONS.map((cond) => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              💰 Price Range
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                disabled
                className="flex-1 bg-background border border-border text-text-primary text-sm rounded-input px-3 py-2.5 placeholder:text-text-muted disabled:opacity-50"
              />
              <span className="text-text-muted text-sm">—</span>
              <input
                type="number"
                placeholder="Max"
                disabled
                className="flex-1 bg-background border border-border text-text-primary text-sm rounded-input px-3 py-2.5 placeholder:text-text-muted disabled:opacity-50"
              />
            </div>
            <p className="text-xs text-text-muted mt-1.5">Coming soon</p>
          </div>
        </div>

        <div className="shrink-0 border-t border-border px-5 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 px-4 py-3 rounded-btn border border-border text-sm font-semibold text-text-secondary hover:bg-background transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
          >
            Reset Filters
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 px-4 py-3 rounded-btn bg-accent text-primary text-sm font-semibold hover:bg-accent-hover transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
          >
            Apply Filters {activeCount > 0 && `(${activeCount})`}
          </button>
        </div>

      </div>
    </div>
  );


}

