"use client";

import { useFormContext } from "react-hook-form";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";

export default function ReviewSection() {
  const { watch, handleSubmit } = useFormContext<AddPostFormValues>();
  const title = watch("title");
  const type = watch("type");
  const category = watch("category");
  const image = watch("image");
  const district = watch("district");
  const area = watch("area");
  const books = watch("books");
  const description = watch("description");

  const bookCount = books?.length ?? 0;
  const isDonate = type === "donate";

  return (
    <section id="step-4" className="scroll-mt-24">
      <div className="bg-surface border border-border-light rounded-card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">4</div>
          <h2 className="text-base font-semibold text-text-secondary">প্রকাশ</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">পোস্টের শিরোনাম</div>
              <p className="text-sm text-text-primary">{title || "অন্যান্য তথ্য যোগ করা হয়নি"}</p>
            </div>
            <div>
              <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">ক্যাটাগরি</div>
              <p className="text-sm text-text-primary">{category || "—"}</p>
            </div>
            <div>
              <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">ধরন</div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                isDonate
                  ? "bg-secondary-light text-secondary-hover"
                  : "bg-primary-light text-primary"
              }`}>
                {isDonate ? "দান" : "বিক্রি"}
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">অবস্থান</div>
              <p className="text-sm text-text-primary">
                {[area, district].filter(Boolean).join(", ") || "—"}
              </p>
            </div>
            <div>
              <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">মোট বই</div>
              <p className="text-sm text-text-primary font-en">{bookCount}</p>
            </div>
          </div>

          <div className="space-y-3">
            {image && (
              <div>
                <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">ছবি</div>
                <img src={image} alt="Preview" className="w-full max-h-40 object-cover rounded-card border border-border-light" />
              </div>
            )}
            {description && (
              <div>
                <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">অতিরিক্ত বিবরণ</div>
                <p className="text-sm text-text-secondary line-clamp-4">{description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border-light">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-accent-text font-bold py-3 px-6 rounded-btn hover:bg-accent-hover transition-base shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            পোস্ট প্রকাশ করুন
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
