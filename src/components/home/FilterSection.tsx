"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Shield } from "lucide-react";

export default function FilterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [condition, setCondition] = useState(searchParams.get("condition") || "");

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full bg-surface border border-border p-2 sm:p-4 shadow-xs flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full lg:w-auto">

        <div className="relative flex items-center">
          <BookOpen className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              updateQueryParams("category", e.target.value);
            }}
            className="w-full bg-background border border-border text-text-secondary text-xs sm:text-sm rounded-input pl-9 pr-8 py-2.5 appearance-none focus:outline-primary-focus cursor-pointer bg-surface"
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
            value={condition}
            onChange={(e) => {
              setCondition(e.target.value);
              updateQueryParams("condition", e.target.value);
            }}
            className="w-full bg-background border border-border text-text-secondary text-xs sm:text-sm rounded-input pl-9 pr-8 py-2.5 appearance-none focus:outline-primary-focus cursor-pointer bg-surface"
          >
            <option value="">Condition</option>
            <option value="like_new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
        </div>

      </div>
    </div>
  );
}
