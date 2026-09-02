"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Filter, Shield, X } from "lucide-react";

interface HeaderFiltersProps {
  activeType: string;
  category?: string;
  condition?: string;
  search?: string;
}

export default function HeaderFilters({
  activeType,
  category,
  condition,
  search,
}: HeaderFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryValue = category || "";
  const conditionValue = condition || "";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
    if (key !== "page") setOpen(false);
  };

  const buildHref = (type: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (condition) params.set("condition", condition);
    if (type) params.set("type", type);
    return `/?${params.toString()}`;
  };

  const tabs = [
    { type: "", label: "সব বই" },
    { type: "sell", label: "বিক্রির জন্য" },
    { type: "donate", label: "দান" },
  ];

  const Tabs = (
    <div className="flex gap-1 bg-background rounded-btn p-1 border border-border">
      {tabs.map((tab) => {
        const isActive = activeType === tab.type;
        return (
          <Link
            key={tab.type}
            href={buildHref(tab.type)}
            aria-current={isActive ? "page" : undefined}
            className={`px-4 py-2 rounded-btn text-sm font-medium transition-base focus-visible:outline-2 focus-visible:outline-primary-focus ${isActive
              ? "text-primary border-b-2 border-primary"
              : "text-text-primary hover:text-text-primary"
              }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className=" w-full bg-[#F5F7F8]/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center gap-3 bg-surface border border-border rounded-btn p-2 my-3">
          <div className="relative flex items-center">
            <BookOpen className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
            <select
              value={categoryValue}
              onChange={(e) => updateQueryParams("category", e.target.value)}
              className="bg-background border border-border text-text-secondary text-sm rounded-input pl-9 pr-8 py-2.5 appearance-none focus:outline-primary-focus cursor-pointer"
            >
              <option value="">ক্যাটাগরি</option>
              <option value="science">বিজ্ঞান</option>
              <option value="commerce">বাণিজ্য</option>
              <option value="arts">কলা</option>
              <option value="admission">ভর্তি</option>
              <option value="buisness">বিজনেস</option>
              <option value="engineering">ইঞ্জিনিয়ারিং</option>
              <option value="medical">মেডিকেল</option>
              <option value="others">অন্যান্য</option>
            </select>
          </div>

          <div className="relative flex items-center">
            <Shield className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
            <select
              value={conditionValue}
              onChange={(e) => updateQueryParams("condition", e.target.value)}
              className="bg-background border border-border text-text-secondary text-sm rounded-input pl-9 pr-8 py-2.5 appearance-none focus:outline-primary-focus cursor-pointer"
            >
              <option value="">অবস্থা</option>
              <option value="like_new">নতুনের মতো</option>
              <option value="good">ভালো</option>
              <option value="fair">গ্রহণযোগ্য</option>
            </select>
          </div>

          <div className="ml-auto">{Tabs}</div>
        </div>

        <div className="lg:hidden flex items-center justify-between gap-2 py-2">
          <div className="flex-1 min-w-0 overflow-x-auto">
            <div className="inline-flex">{Tabs}</div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-filter-panel"
            className="inline-flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-btn bg-surface border border-border text-sm font-medium text-text-secondary hover:bg-primary hover:text-text-inverse transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
          >
            <Filter className="w-4 h-4" /> ফিল্টার
          </button>
        </div>

        <div
          id="mobile-filter-panel"
          aria-hidden={!open}
          className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
          <div className="overflow-hidden">


            <div className="grid grid-cols-2 gap-2 bg-surface border border-border rounded-btn p-2 mb-2">
              <div className="relative flex items-center">
                <BookOpen className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
                <select
                  value={categoryValue}
                  onChange={(e) =>
                    updateQueryParams("category", e.target.value)
                  }
                  className="w-full bg-background border border-border text-text-secondary text-xs sm:text-sm rounded-input pl-9 pr-8 py-2.5 appearance-none focus:outline-primary-focus cursor-pointer"
                >
                  <option value="">Categories</option>
                  <option value="science">Science</option>
                  <option value="commerce">Commerce</option>
                  <option value="arts">Arts</option>
                  <option value="admission">Admission</option>
                  <option value="buisness">Buisness</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="relative flex items-center">
                <Shield className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
                <select
                  value={conditionValue}
                  onChange={(e) =>
                    updateQueryParams("condition", e.target.value)
                  }
                  className="w-full bg-background border border-border text-text-secondary text-xs sm:text-sm rounded-input pl-9 pr-8 py-2.5 appearance-none focus:outline-primary-focus cursor-pointer"
                >
                  <option value="">Condition</option>
                  <option value="like_new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
