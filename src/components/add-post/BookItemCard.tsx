"use client";

import { useFormContext } from "react-hook-form";
import { Trash2, BookOpen, Building2, ShieldCheck, Tag } from "lucide-react";
import { AddPostFormValues } from "@/lib/validaions/add-post-schema";
import { BOOK_CONDITIONS } from "./post";

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
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  const postType = watch("type");
  const bookErrors = errors.books?.[index];

  const borderClass = (hasError?: boolean) =>
    hasError
      ? "border-danger focus:border-danger focus-visible:outline-danger"
      : "border-border focus:border-border-focus focus-visible:outline-primary-focus";

  return (
    <div className="rounded-card border border-border p-4 space-y-4 bg-surface">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-text-secondary">Book {index + 1}</p>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove book ${index + 1}`}
            className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-light rounded-md transition-base cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelBase}>Book Name</label>
          <div className="relative">
            <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="e.g. Higher Math 1st Paper"
              {...register(`books.${index}.bookName`)}
              className={`${inputBase} ${borderClass(!!bookErrors?.bookName)}`}
            />
          </div>
          {bookErrors?.bookName && (
            <p className={errorText}>{bookErrors.bookName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelBase}>Publisher Name</label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="e.g. Panjeree"
              {...register(`books.${index}.publisherName`)}
              className={`${inputBase} ${borderClass(!!bookErrors?.publisherName)}`}
            />
          </div>
          {bookErrors?.publisherName && (
            <p className={errorText}>{bookErrors.publisherName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelBase}>Condition</label>
          <div className="relative">
            <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <select
              {...register(`books.${index}.condition`)}
              defaultValue=""
              className={`${inputBase} appearance-none cursor-pointer ${borderClass(!!bookErrors?.condition)}`}
            >
              <option value="" disabled>
                Select condition
              </option>
              {BOOK_CONDITIONS.map((condition) => (
                <option key={condition.value} value={condition.value}>
                  {condition.label}
                </option>
              ))}
            </select>
          </div>
          {bookErrors?.condition && (
            <p className={errorText}>{bookErrors.condition.message}</p>
          )}
        </div>

        {postType === "sell" && (
          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>Price (BDT)</label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="number"
                min={0}
                placeholder="0"
                {...register(`books.${index}.price`, { valueAsNumber: true })}
                className={`${inputBase} ${borderClass(!!bookErrors?.price)}`}
              />
            </div>
            {bookErrors?.price && (
              <p className={errorText}>{bookErrors.price.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}