"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Tag } from "lucide-react";
import {
  BOOK_CATEGORIES,
  BOOK_CONDITIONS,
  CONDITION_LABELS_BN,
} from "../../../lib/constant/post";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";
import TypeToggle from "../TypeToggle";
import ConditionPills from "../ConditionPills";
import ImageUpload from "./ImageUpload";

const inputBase =
  "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
const errorText = "text-xs font-medium text-danger mt-0.5";

interface ImageUploadProps {
  onUploadingChange: (isUploading: boolean) => void;
}

export default function BasicInfoSection({
  onUploadingChange,
}: ImageUploadProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<AddPostFormValues>();

  const title = watch("title");
  const titleCount = title?.length ?? 0;
  const postType = watch("type");

  // Donate posts never carry a price: keep totalPrice null in form state so
  // validation and the payload always agree with the DB contract.
  useEffect(() => {
    if (postType === "donate") {
      setValue("totalPrice", null);
    }
  }, [postType, setValue]);

  const conditionOptions = BOOK_CONDITIONS.map((c) => ({
    label: CONDITION_LABELS_BN[c.value],
    value: c.value,
  }));

  const borderClass = (hasError?: boolean) =>
    hasError
      ? "border-danger focus:border-danger focus-visible:outline-danger"
      : "border-border focus:border-border-focus focus-visible:outline-primary-focus";

  return (
    <section
      id="step-basic"
      className="bg-surface border border-border-light rounded-card p-5 scroll-mt-24"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">
          1
        </div>
        <h2 className="text-base font-semibold text-text-secondary">
          মূল তথ্য
        </h2>
      </div>

      {/* photo upload */}
      <ImageUpload onUploadingChange={onUploadingChange} />

      {/* type toggle */}
      <div className="mb-3.5">
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          পোস্টের ধরন
        </label>
        <TypeToggle />
      </div>

      {/* post title */}
      <div className="mb-3.5">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          পোস্টের শিরোনাম <span className="text-danger font-semibold">*</span>
        </label>
        <input
          id="title"
          type="text"
          maxLength={80}
          placeholder="যেমন: এইচএসসি সায়েন্স গ্রুপের বই"
          {...register("title")}
          className={`${inputBase} pl-4 ${errors.title
              ? "border-danger focus:border-danger focus-visible:outline-danger"
              : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
            }`}
        />

        <div className="flex flex-row justify-between font-en text-[11px] text-text-muted mt-1">
          {errors.title && <p className={errorText}>{errors.title.message}</p>}
          <p>
            <span id="titleCount">{titleCount}</span>/80
          </p>
        </div>
      </div>

      {/* post catewgory */}
      <div className="mb-3.5">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          ক্যাটাগরি <span className="text-danger font-semibold">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            <Tag width="16" height="16" />
          </span>
          <select
            id="category"
            {...register("category")}
            defaultValue=""
            className={`${inputBase} appearance-none cursor-pointer ${errors.category
                ? "border-danger focus:border-danger focus-visible:outline-danger"
                : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
              }`}
          >
            <option value="" disabled>
              ক্যাটাগরি বেছে নিন
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

      {/* Post-level total price — Sell only; donate stores null. */}
      {postType === "sell" ? (
        <div className="mt-3.5 mb-3.5">
          <label
            htmlFor="totalPrice"
            className="block text-xs font-bold text-text-secondary uppercase tracking-wider"
          >
            মোট দাম <span className="text-danger font-semibold">*</span>
          </label>
          <div className="relative mt-1.5">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-en font-semibold text-text-secondary text-sm pointer-events-none">
              ৳
            </span>
            <input
              id="totalPrice"
              type="number"
              min={0}
              placeholder="যেমন: 450"
              {...register("totalPrice", { valueAsNumber: true })}
              className={`${inputBase} pl-8 ${borderClass(!!errors.totalPrice)}`}
            />
          </div>
          {errors.totalPrice && (
            <p className={errorText}>{errors.totalPrice.message}</p>
          )}
        </div>
      ) : (
        <div className="mt-3.5 mb-3.5 flex items-center gap-1.5 bg-success-light text-success-text rounded-btn px-3 py-2.5 text-sm font-semibold">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          দান হিসেবে দেওয়া হবে — সম্পূর্ণ ফ্রি, কোনো মূল্য লাগবে না
        </div>
      )}

      {/* Post-level overall condition — default "ভালো" (good). */}
      <div className="mb-1">
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          সামগ্রিক বইয়ের অবস্থা{" "}
          <span className="text-danger font-semibold">*</span>
        </label>
        <ConditionPills
          value={watch("overallCondition") ?? "good"}
          onChange={(val) => setValue("overallCondition", val)}
          options={conditionOptions}
        />
        {errors.overallCondition && (
          <p className={errorText}>{errors.overallCondition.message}</p>
        )}
      </div>
    </section>
  );
}
