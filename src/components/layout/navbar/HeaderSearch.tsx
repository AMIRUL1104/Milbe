"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, X } from "lucide-react";
import { DISTRICTS } from "@/lib/constant/location";

type SearchMode = "default" | "search" | "desktop";

interface HeaderSearchProps {
  mode?: SearchMode;
}

export function HeaderSearch({ mode = "default" }: HeaderSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [locationSearch, setLocationSearch] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedLocation(searchParams.get("location") || "");
  }, [searchParams]);

  useEffect(() => {
    if (mode === "search" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mode]);

  useEffect(() => {
    const openLocationSelector = () => setIsLocationOpen(true);
    window.addEventListener("open-location-selector", openLocationSelector);
    return () => window.removeEventListener("open-location-selector", openLocationSelector);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLocationOpen(false);
        setLocationSearch("");
      }
    };

    if (isLocationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLocationOpen]);

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
      params.set("page", "1");
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
    setIsLocationOpen(false);
    setLocationSearch("");
    updateSearchParams({ location: district });
  };

  const handleClearLocation = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLocationSearch("");
    updateSearchParams({ location: undefined });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    updateSearchParams({ search: undefined });
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const filteredDistricts = DISTRICTS.filter((district) =>
    district.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const renderLocationDropdown = () => (
    <div className="relative shrink-0" ref={locationDropdownRef}>
      <button
        type="button"
        onClick={() => {
          setIsLocationOpen((prev) => !prev);
          if (isLocationOpen) setLocationSearch("");
        }}
        className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 bg-surface border border-border rounded-btn text-text-primary hover:border-primary transition-base focus-visible:outline-2 focus-visible:outline-primary-focus min-w-[100px] sm:min-w-[120px]"
      >
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
          <span className="truncate text-xs sm:text-sm font-medium">
            {selectedLocation || "Location"}
          </span>
        </div>
        {selectedLocation && (
          <span
            onClick={handleClearLocation}
            className="p-0.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer shrink-0"
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
            <X className="w-3 h-3" />
          </span>
        )}
      </button>

      {isLocationOpen && (
        <div className="absolute top-full right-0 mt-1 bg-surface border border-border rounded-btn shadow-lg overflow-hidden z-50 w-52 sm:w-60">
          <div className="p-2 border-b border-border bg-background sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search location..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 text-xs bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder:text-text-placeholder"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((district) => (
                <button
                  key={district}
                  type="button"
                  onClick={() => handleLocationSelect(district)}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm transition-colors ${selectedLocation === district
                      ? "bg-primary-light text-primary font-medium"
                      : "text-text-primary hover:bg-surface-hover"
                    }`}
                >
                  {district}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-xs text-text-muted">
                No locations found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Mobile Minimal Location View
  if (mode === "default") {
    return (
      <div className="flex items-center justify-end">
        {renderLocationDropdown()}
      </div>
    );
  }

  // Integrated Desktop & Mobile Full Search View
  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
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
          className="w-full px-3.5 py-1.5 pl-9 pr-8 text-xs sm:text-sm text-text-primary bg-surface border border-border rounded-btn focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-transparent placeholder:text-text-placeholder transition-base"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {renderLocationDropdown()}
    </form>
  );
}