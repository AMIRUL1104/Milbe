"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Tag } from "lucide-react";
import { BOOK_CATEGORIES } from "../../../lib/constant/post";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";
import TypeToggle from "../TypeToggle";
import ImageUpload from "./ImageUpload";

const inputBase =
  "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
const errorText = "text-xs font-medium text-danger mt-0.5";

interface ImageUploadProps {
  onUploadingChange: (isUploading: boolean) => void;
}

export default function BasicInfoSection({ onUploadingChange }: ImageUploadProps) {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<AddPostFormValues>();

  const title = watch("title");
  const titleCount = title?.length ?? 0;

  return (
    <section id="step-basic" className="bg-surface border border-border-light rounded-card p-5 scroll-mt-24">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">1</div>
        <h2 className="text-base font-semibold text-text-secondary">মূল তথ্য</h2>
      </div>

      <div className="mb-3.5">
        <label className="block text-sm font-medium text-text-primary mb-1.5">পোস্টের ধরন</label>
        <TypeToggle />
      </div>

      <div className="mb-3.5">
        <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1.5">
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
        <div className="text-right font-en text-[11px] text-text-muted mt-1">
          <span id="titleCount">{titleCount}</span>/80
        </div>
        {errors.title && <p className={errorText}>{errors.title.message}</p>}
      </div>

      <div className="mb-3.5">
        <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-1.5">
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
            <option value="" disabled>ক্যাটাগরি বেছে নিন</option>
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

      <ImageUpload onUploadingChange={onUploadingChange} />
    </section>
  );
}
