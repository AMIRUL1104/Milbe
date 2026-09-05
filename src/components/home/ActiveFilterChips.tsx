"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ActiveFilterChipsProps {
    search?: string;
    category?: string;
    condition?: string;
    type?: "sell" | "donate" | "";
}

const FILTER_LABELS: Record<string, string> = {
    sell: "বিক্রির জন্য",
    donate: "দান",
    like_new: "নতুনের মতো",
    good: "ভালো",
    fair: "গ্রহণযোগ্য",
};

export default function ActiveFilterChips({
    search,
    category,
    condition,
    type,
}: ActiveFilterChipsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const filters = [
        search?.trim() ? { key: "search", label: search.trim() } : null,
        category?.trim() ? { key: "category", label: category.trim() } : null,
        condition?.trim()
            ? { key: "condition", label: FILTER_LABELS[condition] || condition }
            : null,
        type ? { key: "type", label: FILTER_LABELS[type] || type } : null,
    ].filter((filter): filter is { key: string; label: string } => Boolean(filter));

    if (filters.length === 0) return null;

    const removeFilter = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        params.set("page", "1");
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        ["search", "category", "condition", "type"].forEach((key) => params.delete(key));
        params.set("page", "1");
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="mb-6 flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
                <button
                    key={filter.key}
                    type="button"
                    onClick={() => removeFilter(filter.key)}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-primary hover:border-primary focus-visible:outline-2 focus-visible:outline-primary-focus"
                    aria-label={`${filter.label} ফিল্টার সরান`}
                >
                    {filter.label}
                    <X className="h-3.5 w-3.5" />
                </button>
            ))}
            <button
                type="button"
                onClick={clearFilters}
                className="ml-auto text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary-focus"
            >
                সব Filter পরিষ্কার করুন
            </button>
        </div>
    );
}
