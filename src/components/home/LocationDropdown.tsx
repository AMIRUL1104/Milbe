"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Search, X, Check } from "lucide-react";
import { DISTRICT_OPTIONS, getDistrictLabelBn } from "@/lib/constant/location";
import { updateHomeSearchParams } from "./homeSearchParams";

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

    const activeLocation = searchParams.get("location") || currentLocation || "";

    const [isOpen, setIsOpen] = useState(false);

    // activeLocation চেঞ্জ হলে রেন্ডার হওয়ার সাথে সাথেইsearchTerm সিঙ্ক করার প্যাটার্ন (Effect ছাড়া)
    // URL-এ English value থাকে; input-এ বাংলা label দেখানো হয় (fallback = raw)।
    const activeLabel = activeLocation
        ? getDistrictLabelBn(activeLocation) || activeLocation
        : "";
    const [prevActiveLocation, setPrevActiveLocation] = useState(activeLocation);
    const [searchTerm, setSearchTerm] = useState(activeLabel);

    if (prevActiveLocation !== activeLocation) {
        setPrevActiveLocation(activeLocation);
        setSearchTerm(activeLabel);
    }

    const dropdownRef = useRef<HTMLDivElement>(null);

    const updateLocationParam = useCallback(
        (locationValue?: string) => {
            updateHomeSearchParams(router, { location: locationValue });
        },
        [router]
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
                    setSearchTerm(activeLabel);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeLocation, activeLabel, searchTerm]);

    // সার্চ টার্ম অনুযায়ী ফিল্টার করা জেলার লিস্ট
    const filteredDistricts = useMemo(() => {
        if (!searchTerm || (activeLabel && searchTerm === activeLabel)) {
            return DISTRICT_OPTIONS;
        }
        const q = searchTerm.toLowerCase();
        return DISTRICT_OPTIONS.filter(
            (district) =>
                district.value.toLowerCase().includes(q) ||
                district.labelBn.includes(searchTerm),
        );
    }, [searchTerm, activeLabel]);

    // জেলা সিলেক্ট করা — URL-এ English value, input-এ বাংলা label
    const handleSelect = (districtValue: string) => {
        setSearchTerm(getDistrictLabelBn(districtValue) || districtValue);
        updateLocationParam(districtValue);
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
                            const isSelected = activeLocation === district.value;
                            return (
                                <button
                                    key={district.value}
                                    type="button"
                                    onClick={() => handleSelect(district.value)}
                                    className={`w-full rounded-lg px-3 py-2 text-left text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${isSelected
                                            ? "bg-primary/10 text-primary font-bold"
                                            : "text-text-primary hover:bg-surface-hover"
                                        }`}
                                >
                                    <span>
                                        {district.labelBn}
                                        <span className="ml-1.5 text-[10px] text-text-muted">
                                            ({district.value})
                                        </span>
                                    </span>
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