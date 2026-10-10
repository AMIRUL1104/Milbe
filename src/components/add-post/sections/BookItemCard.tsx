"use client";

import { useFormContext } from "react-hook-form";
import { BookOpen, Building2, PenLine } from "lucide-react";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";

const inputBase =
  "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
const labelBase = "block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5";
const errorText = "text-xs font-medium text-danger mt-0.5";

interface BookItemCardProps {
  index: number;
  onRemove: () => void;
}

export default function BookItemCard({ index, onRemove }: BookItemCardProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  const bookErrors = errors.books?.[index];

  const borderClass = (hasError?: boolean) =>
    hasError
      ? "border-danger focus:border-danger focus-visible:outline-danger"
      : "border-border focus:border-border-focus focus-visible:outline-primary-focus";

  return (
    <div className="border border-border-light bg-surface-hover rounded-card p-4">
      {/* Header section */}
      <div className="flex items-center mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <span className="w-5.5 h-5.5 rounded-md bg-accent-light text-accent-text font-en text-[11.5px] font-bold flex items-center justify-center">
            {index + 1}
          </span>
          বই
        </div>
        <button
          type="button"
          className="ml-auto w-7 h-7 rounded-btn border border-border bg-surface text-text-muted flex items-center justify-center transition-base hover:border-danger-border hover:bg-danger-light hover:text-danger-text"
          onClick={onRemove}
          aria-label="বই মুছুন"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Form Fields — all three optional; price/condition are post-level */}
      <div className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelBase}>
              বইয়ের নাম <span className="font-medium text-text-muted text-xs">(ঐচ্ছিক)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                <BookOpen width="16" height="16" />
              </span>
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

          <div>
            <label className={labelBase}>
              লেখক <span className="font-medium text-text-muted text-xs">(ঐচ্ছিক)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                <PenLine width="16" height="16" />
              </span>
              <input
                type="text"
                placeholder="যেমন: আব্দুল মাতিন"
                {...register(`books.${index}.author`)}
                className={`${inputBase} ${borderClass(!!bookErrors?.author)}`}
              />
            </div>
            {bookErrors?.author && (
              <p className={errorText}>{bookErrors.author.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className={labelBase}>
            প্রকাশনী <span className="font-medium text-text-muted text-xs">(ঐচ্ছিক)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <Building2 width="16" height="16" />
            </span>
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
      </div>
    </div>
  );
}