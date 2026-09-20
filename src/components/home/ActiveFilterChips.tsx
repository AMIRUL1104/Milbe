"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FILTER_KEYS } from "@/lib/constants/filters";

interface ActiveFilterChipsProps {
    search?: string;
    category?: string;
    condition?: string;
    type?: "sell" | "donate" | "";
}

const FILTER_LABELS: Record<string, string> = {
    sell: "for sale",
    donate: "donate",
    like_new: "like new",
    good: "good",
    fair: "fair",
};

export default function ActiveFilterChips({
    search,
    category,
    condition,
    type,
}: ActiveFilterChipsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
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
        startTransition(() => router.push(`?${params.toString()}`, { scroll: false }));
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        // Single source of truth — keeps this in sync with FilterBottomSheet's reset.
        FILTER_KEYS.forEach((key) => params.delete(key));
        params.set("page", "1");
        startTransition(() => router.push(`?${params.toString()}`, { scroll: false }));
    };

    return (
        <div className="mb-6 flex flex-wrap items-center gap-1 ">
            {filters.map((filter) => (
                <button
                    key={filter.key}
                    type="button"
                    onClick={() => removeFilter(filter.key)}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-1.5 py-1 text-xs text-text-primary hover:border-primary focus-visible:outline-2 focus-visible:outline-primary-focus"
                    aria-label={`${filter.label} ফিল্টার সরান`}
                >
                    {filter.label}
                    <X className="h-3.5 w-3.5" />
                </button>
            ))}
            <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 ml-auto text-xs font-semibold text-primary hover:scale-95 duration-300 focus-visible:outline-2 focus-visible:outline-primary-focus border rounded-2xl px-1.5"
            >
                Clear All <X className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
