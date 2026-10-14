"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, X } from "lucide-react";
import { DISTRICT_OPTIONS, getDistrictLabelBn } from "@/lib/constant/location";
import { updateHomeSearchParams } from "@/components/home/homeSearchParams";

type SearchMode = "default" | "search" | "desktop";

interface HeaderSearchProps {
  mode?: SearchMode;
}

export function HeaderSearch({ mode = "default" }: HeaderSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  const [searchDraft, setSearchDraft] = useState({
    urlSearch: currentSearch,
    value: currentSearch,
  });
  if (searchDraft.urlSearch !== currentSearch) {
    setSearchDraft({ urlSearch: currentSearch, value: currentSearch });
  }
  const searchQuery = searchDraft.value;
  const selectedLocation = searchParams.get("location") || "";
  const [locationSearch, setLocationSearch] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appliedSearch = useRef<string | null>(null);

  const updateSearchParams = useCallback(
    (updates: Record<string, string | undefined>) =>
      updateHomeSearchParams(router, updates),
    [router],
  );

  useEffect(() => {
    const normalizedQuery = searchQuery.trim();
    if (appliedSearch.current === currentSearch.trim()) {
      appliedSearch.current = null;
    }
    if (
      normalizedQuery === currentSearch.trim() ||
      normalizedQuery === appliedSearch.current
    ) {
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      appliedSearch.current = normalizedQuery;
      updateSearchParams({ search: normalizedQuery || undefined });
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [currentSearch, searchQuery, updateSearchParams]);

  useEffect(() => () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
  }, []);

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

  const handleSearchChange = (value: string) => {
    setSearchDraft({ urlSearch: currentSearch, value });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    appliedSearch.current = searchQuery.trim();
    updateSearchParams({ search: searchQuery.trim() || undefined });
  };

  const handleLocationSelect = (district: string) => {
    setIsLocationOpen(false);
    setLocationSearch("");
    // শুধুমাত্র লোকেশন আপডেট করবে, সার্চ কুয়েরি অপরিবর্তিত রাখবে
    updateSearchParams({ location: district });
  };

  const handleClearLocation = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLocationSearch("");
    updateSearchParams({ location: undefined });
  };

  const handleClearSearch = () => {
    setSearchDraft({ urlSearch: currentSearch, value: "" });
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    appliedSearch.current = "";
    updateSearchParams({ search: undefined });
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const filteredDistricts = DISTRICT_OPTIONS.filter(
    (district) =>
      district.value.toLowerCase().includes(locationSearch.toLowerCase()) ||
      district.labelBn.includes(locationSearch),
  );

  const renderLocationDropdown = () => (
    <div className="relative shrink-0" ref={locationDropdownRef}>
      <button
        type="button"
        onClick={() => {
          setIsLocationOpen((prev) => !prev);
          if (isLocationOpen) setLocationSearch("");
        }}
        className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 bg-surface border border-border rounded-btn text-text-primary hover:border-primary transition-base focus-visible:outline-2 focus-visible:outline-primary-focus min-w-25 sm:min-w-30"
      >
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
          <span className="truncate text-xs sm:text-sm font-medium">
            {selectedLocation
              ? getDistrictLabelBn(selectedLocation) || selectedLocation
              : "Location"}
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
                  key={district.value}
                  type="button"
                  onClick={() => handleLocationSelect(district.value)}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm transition-colors ${selectedLocation === district.value
                    ? "bg-primary-light text-primary font-medium"
                    : "text-text-primary hover:bg-surface-hover"
                    }`}
                >
                  {district.labelBn}
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

  if (mode === "default") {
    return (
      <div className="flex items-center justify-end">
        {renderLocationDropdown()}
      </div>
    );
  }

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
      <div className="relative flex-1">
        <label htmlFor="header-search" className="sr-only">
          বই খুঁজুন
        </label>
        <input
          ref={searchInputRef}
          id="header-search"
          type="text"
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