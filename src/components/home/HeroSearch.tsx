"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { updateHomeSearchParams } from "./homeSearchParams";

const SEARCH_PARAM = "search";

export default function HeroSearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const appliedSearch = useRef<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const currentSearch = searchParams.get(SEARCH_PARAM) ?? "";
    const [searchDraft, setSearchDraft] = useState({
        urlSearch: currentSearch,
        value: currentSearch,
    });
    if (searchDraft.urlSearch !== currentSearch) {
        setSearchDraft({ urlSearch: currentSearch, value: currentSearch });
    }
    const query = searchDraft.value;

    const applySearch = useCallback((value: string) => {
        startTransition(() => {
            updateHomeSearchParams(router, {
                [SEARCH_PARAM]: value.trim() || undefined,
            });
        });
    }, [router, startTransition]);

    useEffect(() => {
        const normalizedQuery = query.trim();
        if (appliedSearch.current === currentSearch.trim()) {
            appliedSearch.current = null;
        }
        if (
            normalizedQuery === currentSearch.trim() ||
            normalizedQuery === appliedSearch.current
        ) {
            return;
        }

        debounceTimer.current = setTimeout(() => {
            appliedSearch.current = normalizedQuery;
            applySearch(query);
        }, 500);
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [applySearch, currentSearch, query]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        appliedSearch.current = query.trim();
        applySearch(query);
    };

    const handleClear = () => {
        setSearchDraft({ urlSearch: currentSearch, value: "" });
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        inputRef.current?.focus();
        appliedSearch.current = "";
        applySearch("");
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className="flex w-full items-center rounded-2xl border border-gray-200 bg-white/80 p-1.5 shadow-sm backdrop-blur-md transition-all focus-within:border-[#35858E] focus-within:ring-2 focus-within:ring-[#35858E]/20"
        >
            <div className="flex flex-1 items-center gap-2.5 px-3">
                <Search className="h-5 w-5 shrink-0 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    name={SEARCH_PARAM}
                    value={query}
                    onChange={(e) =>
                        setSearchDraft({
                            urlSearch: currentSearch,
                            value: e.target.value,
                        })
                    }
                    inputMode="search"
                    enterKeyHint="search"
                    autoComplete="off"
                    aria-label="বই খুঁজুন"
                    placeholder="বইয়ের নাম, লেখক বা ক্যাটাগরি দিয়ে খুঁজুন..."
                    className="w-full bg-transparent text-sm text-gray-800 outline-none! placeholder:text-gray-400"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        aria-label="মুছে ফেলুন"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#35858E] px-5 py-2.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#2d737b] active:scale-95 disabled:opacity-70"
            >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>খুঁজুন</span>
            </button>
        </form>
    );
}