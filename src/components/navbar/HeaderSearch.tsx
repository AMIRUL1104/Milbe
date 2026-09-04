"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, X } from "lucide-react";
import { DISTRICTS } from "@/components/add-post/post";

type SearchMode = "default" | "search";

interface HeaderSearchProps {
  mode?: SearchMode;
}

export function HeaderSearch({ mode = "default" }: HeaderSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === "search" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mode]);

  const updateSearchParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      updateSearchParams({ search: value || undefined });
    }, 500);
    setDebounceTimer(timer);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimer) clearTimeout(debounceTimer);
    updateSearchParams({ search: searchQuery || undefined });
  };

  const handleLocationSelect = (district: string) => {
    setSelectedLocation(district);
    setIsLocationOpen(false);
    updateSearchParams({ location: district });
  };

  const handleClearLocation = () => {
    setSelectedLocation("");
    updateSearchParams({ location: undefined });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    updateSearchParams({ search: undefined });
    if (mode === "search" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  if (mode === "default") {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="flex items-center justify-between gap-2 px-3 py-2 bg-surface border border-border rounded-btn text-text-primary hover:border-primary transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-4 h-4 text-text-muted shrink-0" />
              <span className="truncate text-sm">
                {selectedLocation || "এলাকা"}
              </span>
            </div>
            {selectedLocation && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleClearLocation();
                }}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="এলাকা মুছুন"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClearLocation();
                  }
                }}
              >
                <X className="w-4 h-4" />
              </div>
            )}
          </button>

          {isLocationOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-btn shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
              {DISTRICTS.map((district) => (
                <button
                  key={district}
                  type="button"
                  onClick={() => handleLocationSelect(district)}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                    selectedLocation === district
                      ? "bg-primary-light text-primary"
                      : "text-text-primary hover:bg-surface-hover"
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1">
      <div className="relative flex-1">
        <label htmlFor="header-search" className="sr-only">
          বই খুঁজুন
        </label>
        <input
          ref={searchInputRef}
          id="header-search"
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="বই, লেখক বা ISBN খুঁজুন..."
          className="w-full px-4 py-2 pl-10 pr-10 text-sm text-text-primary bg-surface border border-border rounded-btn focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-transparent placeholder:text-text-placeholder transition-base"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="flex items-center justify-between gap-2 px-3 py-2 bg-surface border border-border rounded-btn text-text-primary hover:border-primary transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-4 h-4 text-text-muted shrink-0" />
            <span className="truncate text-sm">
              {selectedLocation || "এলাকা"}
            </span>
          </div>
        </button>

        {isLocationOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-btn shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
            {DISTRICTS.map((district) => (
              <button
                key={district}
                type="button"
                onClick={() => handleLocationSelect(district)}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  selectedLocation === district
                    ? "bg-primary-light text-primary"
                    : "text-text-primary hover:bg-surface-hover"
                }`}
              >
                {district}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
