"use client";

import { useFormContext } from "react-hook-form";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";

const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
const errorText = "text-xs font-medium text-danger mt-0.5";

export default function DescriptionSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  const description = watch("description");
  const descCount = description?.length ?? 0;

  return (
    <section id="step-description" className="bg-surface border border-border-light rounded-card p-5 scroll-mt-24">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">3</div>
        <h2 className="text-base font-semibold text-text-secondary">বিবরণ</h2>
      </div>

      <div className="mb-3.5">
        <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1.5">
          অতিরিক্ত বিবরণ <span className="font-medium text-text-muted text-xs">(ঐচ্ছিক)</span>
        </label>
        <textarea
          id="description"
          maxLength={500}
          rows={4}
          placeholder="বইয়ের তালিকা, সংস্করণ/এডিশন, পাতার অবস্থা, মিসিং পাতা বা অন্যান্য প্রাসঙ্গিক তথ্য লিখুন। ফোন নম্বর এখানে লিখবেন না — যোগাযোগের জন্য উপরের ফোন ফিল্ড ব্যবহার করুন।"
          {...register("description")}
          className={`w-full bg-surface border rounded-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base resize-none ${errors.description
            ? "border-danger focus:border-danger focus-visible:outline-danger"
            : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
            }`}
        />
        <p className="text-xs text-text-muted mt-1">
          আলাদা যোগাযোগ ফিল্ড থাকায় বিবরণে ফোন নম্বর দেওয়ার দরকার নেই।
        </p>
        <div className="text-right font-en text-[11px] text-text-muted mt-1">
          <span id="descCount">{descCount}</span>/500
        </div>
        {errors.description && (
          <p className={errorText}>{errors.description.message}</p>
        )}
      </div>
    </section>
  );
}
