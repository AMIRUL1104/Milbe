"use client";

import { useFormContext } from "react-hook-form";
import { Trash2, BookOpen, Building2, ShieldCheck } from "lucide-react";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";
import { BOOK_CONDITIONS } from "../../../lib/constant/post";
import ConditionPills from "../ConditionPills";

const inputBase =
  "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
const errorText = "text-xs font-medium text-danger mt-0.5";

interface BookItemCardProps {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}

export default function BookItemCard({
  index,
  onRemove,
  canRemove,
}: BookItemCardProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  const postType = watch("type");
  const bookErrors = errors.books?.[index];

  const borderClass = (hasError?: boolean) =>
    hasError
      ? "border-danger focus:border-danger focus-visible:outline-danger"
      : "border-border focus:border-border-focus focus-visible:outline-primary-focus";

  const conditionOptions = BOOK_CONDITIONS.map((c) => ({
    label: c.label,
    value: c.value,
  }));

  return (
    <div className="border border-border-light bg-surface-hover rounded-card p-4">
      <div className="flex items-center mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <span className="w-5.5 h-5.5 rounded-md bg-accent-light text-accent-text font-en text-[11.5px] font-bold flex items-center justify-center">
            {index + 1}
          </span>
          বই #{index + 1}
        </div>
        <button
          type="button"
          className="ml-auto w-7 h-7 rounded-btn border border-border bg-surface text-text-muted flex items-center justify-center transition-base hover:border-danger-border hover:bg-danger-light hover:text-danger-text disabled:opacity-35 disabled:cursor-not-allowed"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`বই মুছুন`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="mb-3.5 last:mb-0">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">বইয়ের নাম <span className="text-danger font-semibold">*</span></label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"><BookOpen width="16" height="16" /></span>
            <input
              type="text"
              placeholder="যেমন: হায়ার ম্যাথ ১ম পত্র"
              {...register(`books.${index}.bookName`)}
              className={`${inputBase} ${borderClass(!!bookErrors?.bookName)}`}
            />
          </div>
          {bookErrors?.bookName && (
            <p className={errorText}>{bookErrors.bookName.message}</p>
          )}
        </div>

        <div className="mb-3.5 last:mb-0">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">প্রকাশনীর নাম</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"><Building2 width="16" height="16" /></span>
            <input
              type="text"
              placeholder="যেমন: পাঞ্জেরী"
              {...register(`books.${index}.publisherName`)}
              className={`${inputBase} ${borderClass(!!bookErrors?.publisherName)}`}
            />
          </div>
          {bookErrors?.publisherName && (
            <p className={errorText}>{bookErrors.publisherName.message}</p>
          )}
        </div>

        <div className="mb-3.5 last:mb-0">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">বইয়ের অবস্থা <span className="text-danger font-semibold">*</span></label>
          <ConditionPills
            value={watch(`books.${index}.condition`)}
            onChange={(val) => setValue(`books.${index}.condition`, val)}
            options={conditionOptions}
          />
          {bookErrors?.condition && (
            <p className={errorText}>{bookErrors.condition.message}</p>
          )}
        </div>

        {postType === "sell" && (
          <div className="mb-3.5 last:mb-0">
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">মূল্য (৳) <span className="text-danger font-semibold">*</span></label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-en font-semibold text-text-secondary text-sm pointer-events-none">৳</span>
              <input
                type="number"
                min={0}
                className="pl-8"
                placeholder="0"
                {...register(`books.${index}.price`, { valueAsNumber: true })}
              />
            </div>
            {bookErrors?.price && (
              <p className={errorText}>{bookErrors.price.message}</p>
            )}
          </div>
        )}
      </div>

      {postType === "donate" && (
        <div className="flex items-center gap-1.5 bg-success-light text-success-text rounded-btn px-3 py-2.5 text-sm font-semibold">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          দান হিসেবে দেওয়া হবে — সম্পূর্ণ ফ্রি
        </div>
      )}
    </div>
  );
}
