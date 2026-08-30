"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, X } from "lucide-react";
import { DISTRICTS } from "@/components/add-post/post";

interface SearchAndLocationProps {
  initialSearch?: string;
  initialLocation?: string;
}

export default function SearchAndLocation({
  initialSearch = "",
  initialLocation = "",
}: SearchAndLocationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

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

  return (
    <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search books, authors, ISBN..."
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-btn text-text-primary placeholder:text-text-muted focus:outline-2 focus:outline-primary-focus transition-base"
        />
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="w-full sm:w-[200px] flex items-center justify-between gap-2 px-3 py-2.5 bg-surface border border-border rounded-btn text-text-primary hover:border-primary transition-base focus:outline-2 focus:outline-primary-focus"
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-4 h-4 text-text-muted shrink-0" />
            <span className="truncate text-sm">
              {selectedLocation || "All Locations"}
            </span>
          </div>
          {selectedLocation && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleClearLocation();
              }}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
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
    </form>
  );
}