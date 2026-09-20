"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Search, X, Check } from "lucide-react";
import { DISTRICTS } from "@/lib/constant/location";

interface LocationDropdownProps {
    currentLocation?: string;
    variant?: "header" | "inline";
    buttonText?: string;
}

export default function LocationDropdown({
    currentLocation,
    variant = "header",
}: LocationDropdownProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL Query Param থেকে বর্তমান জেলা পড়া
    const activeLocation = searchParams.get("location") || currentLocation || "";

    const [isOpen, setIsOpen] = useState(false);

    // activeLocation চেঞ্জ হলে রেন্ডার হওয়ার সাথে সাথেইsearchTerm সিঙ্ক করার প্যাটার্ন (Effect ছাড়া)
    const [prevActiveLocation, setPrevActiveLocation] = useState(activeLocation);
    const [searchTerm, setSearchTerm] = useState(activeLocation);

    if (prevActiveLocation !== activeLocation) {
        setPrevActiveLocation(activeLocation);
        setSearchTerm(activeLocation);
    }

    const dropdownRef = useRef<HTMLDivElement>(null);

    // URL ফিল্টার আপডেট করার ফাংশন
    const updateLocationParam = useCallback(
        (locationValue?: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (locationValue) {
                params.set("location", locationValue);
            } else {
                params.delete("location");
            }
            params.set("page", "1");
            router.push(`?${params.toString()}`, { scroll: false });
        },
        [router, searchParams]
    );

    // আউটসাইড ক্লিকে ড্রপডাউন বন্ধ করার লজিক
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                if (!searchTerm) {
                    setSearchTerm(activeLocation);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeLocation, searchTerm]);

    // সার্চ টার্ম অনুযায়ী ফিল্টার করা জেলার লিস্ট
    const filteredDistricts = useMemo(() => {
        if (!searchTerm || searchTerm === activeLocation) return DISTRICTS;
        return DISTRICTS.filter((district) =>
            district.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, activeLocation]);

    // জেলা সিলেক্ট করা
    const handleSelect = (district: string) => {
        setSearchTerm(district);
        updateLocationParam(district);
        setIsOpen(false);
    };

    // সার্চ ইনপুট ক্লিয়ার করা
    const handleClear = () => {
        setSearchTerm("");
        updateLocationParam(undefined);
        setIsOpen(false);
    };

    return (
        <div
            ref={dropdownRef}
            className={`relative z-40 w-full ${variant === "inline" ? "max-w-md mx-auto" : "sm:w-72"
                }`}
        >
            {/* Autocomplete Input Box */}
            <div className="relative flex items-center">
                {/* Left Icon */}
                <div className="absolute left-3 pointer-events-none flex items-center justify-center text-primary">
                    <MapPin className="w-4 h-4" />
                </div>

                {/* Search Field */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (!isOpen) setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="জেলা সিলেক্ট বা সার্চ করুন..."
                    className="w-full pl-9 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm bg-surface border border-border/80 rounded-xl font-medium text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all shadow-xs"
                />

                {/* Right Clear or Search Icon */}
                <div className="absolute right-2.5 flex items-center">
                    {searchTerm ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 text-text-muted hover:text-danger rounded-md transition-colors"
                            title="মুছে ফেলুন"
                        >
                            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                    ) : (
                        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted pointer-events-none" />
                    )}
                </div>
            </div>

            {/* Autocomplete Suggestions Dropdown */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-100 max-h-60 overflow-y-auto rounded-xl border border-border/80 bg-surface p-1.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-100 scrollbar-thin">
                    {/* Active Filter Clear Option */}
                    {activeLocation && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-danger hover:bg-danger/10 transition-colors mb-1 border-b border-border/50 flex items-center justify-between"
                        >
                            <span>✕ লোকেশন ফিল্টার রিমুভ করুন</span>
                        </button>
                    )}

                    {/* District List */}
                    {filteredDistricts.length > 0 ? (
                        filteredDistricts.map((district) => {
                            const isSelected = activeLocation === district;
                            return (
                                <button
                                    key={district}
                                    type="button"
                                    onClick={() => handleSelect(district)}
                                    className={`w-full rounded-lg px-3 py-2 text-left text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${isSelected
                                            ? "bg-primary/10 text-primary font-bold"
                                            : "text-text-primary hover:bg-surface-hover"
                                        }`}
                                >
                                    <span>{district}</span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                                </button>
                            );
                        })
                    ) : (
                        <div className="px-3 py-4 text-center text-xs text-text-muted">
                            কোনো জেলা পাওয়া যায়নি
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}