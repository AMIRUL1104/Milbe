"use client";

import { AddPostFormValues } from "@/lib/validaions/add-post-schema";
import { useFormContext } from "react-hook-form";

const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
const errorText = "text-xs font-medium text-danger mt-0.5";

export default function DescriptionSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-text-secondary">Description</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className={labelBase}>
          Additional details (optional)
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Mention edition year, highlighted pages, missing pages, etc."
          {...register("description")}
          className={`w-full bg-surface border rounded-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base resize-none ${
            errors.description
              ? "border-danger focus:border-danger focus-visible:outline-danger"
              : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
          }`}
        />
        {errors.description && (
          <p className={errorText}>{errors.description.message}</p>
        )}
      </div>
    </section>
  );
}