"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Tag } from "lucide-react";
import { AddPostFormValues } from "@/lib/validaions/add-post-schema";
import { BOOK_CATEGORIES } from "./post";

const inputBase =
  "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
const errorText = "text-xs font-medium text-danger mt-0.5";

export default function BasicInfoSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-text-secondary">Basic Info</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={labelBase}>
          Post Title
        </label>
        <p className="text-xs text-text-muted -mt-0.5">
          Auto-generated from your books — edit anytime.
        </p>
        <input
          id="title"
          type="text"
          placeholder="e.g. HSC Science Books"
          {...register("title")}
          className={`${inputBase} pl-4 ${
            errors.title
              ? "border-danger focus:border-danger focus-visible:outline-danger"
              : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
          }`}
        />
        {errors.title && <p className={errorText}>{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className={labelBase}>
            Category
          </label>
          <div className="relative">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <select
              id="category"
              {...register("category")}
              defaultValue=""
              className={`${inputBase} appearance-none cursor-pointer ${
                errors.category
                  ? "border-danger focus:border-danger focus-visible:outline-danger"
                  : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
              }`}
            >
              <option value="" disabled>
                Select category
              </option>
              {BOOK_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className={errorText}>{errors.category.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelBase}>Listing Type</label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <div className="flex items-center gap-4 h-10.5">
                <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                  <input
                    type="radio"
                    value="sell"
                    checked={field.value === "sell"}
                    onChange={() => field.onChange("sell")}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  Sell
                </label>
                <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                  <input
                    type="radio"
                    value="donate"
                    checked={field.value === "donate"}
                    onChange={() => field.onChange("donate")}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  Donate
                </label>
              </div>
            )}
          />
          {errors.type && <p className={errorText}>{errors.type.message}</p>}
        </div>
      </div>
    </section>
  );
}