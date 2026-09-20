"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { FILTER_KEYS } from "@/lib/constants/filters";

export default function ResetFilterButton() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        // ActiveFilterChips-er moto exact FILTER_KEYS loop dynamic clean
        FILTER_KEYS.forEach((key) => params.delete(key));
        params.set("page", "1");

        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <button
            type="button"
            onClick={handleClearFilters}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-primary hover:bg-primary-hover text-text-inverse font-medium text-sm transition-base active:scale-95 disabled:opacity-50 cursor-pointer"
        >
            <RotateCcw className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`} />
            <span>{isPending ? "রিসেট হচ্ছে..." : "সব ফিল্টার পরিষ্কার করুন"}</span>
        </button>
    );
}