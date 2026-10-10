"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";

import BookItemCard from "./BookItemCard";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";

const emptyBook = {
  bookId: "",
  publisherId: "",
  bookName: "",
  author: "",
  publisherName: "",
  availableStatus: "available" as const,
};

interface BookListSectionProps {
  isEditing?: boolean;
}

export default function BookListSection({
  isEditing = false,
}: BookListSectionProps) {
  const { control, watch, setValue, getFieldState, formState } =
    useFormContext<AddPostFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "books",
  });

  const category = watch("category");
  const books = watch("books");
  const titleTouched = useRef(false);

  const titleFieldState = getFieldState("title", formState);
  useEffect(() => {
    if (titleFieldState.isDirty) {
      titleTouched.current = true;
    }
  }, [titleFieldState.isDirty]);

  useEffect(() => {
    // In edit mode the title already belongs to an existing post — the
    // auto-generated title should never overwrite it.
    if (isEditing) return;
    if (titleTouched.current) return;

    const firstBookName = books?.[0]?.bookName?.trim();
    if (!category && !firstBookName) return;

    const generated = firstBookName
      ? `${category ? `${category} ` : ""}${firstBookName}${books.length > 1 ? ` + ${books.length - 1} more` : ""}`
      : `${category} Books`;

    setValue("title", generated, { shouldDirty: false });
  }, [category, books, setValue, isEditing]);

  return (
    <section id="step-books" className="bg-surface border border-border-light rounded-card p-5 scroll-mt-24">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">4</div>
        <h2 className="text-base font-semibold text-text-secondary">বইয়ের তালিকা</h2>
        <span className="ml-auto text-xs text-text-muted">
          {fields.length === 0 ? " " : `${fields.length} বই`}
        </span>
      </div>

      <p className="text-xs text-text-muted mb-3">
        ঐচ্ছিক — তবে বইগুলোর তথ্য আলাদাভাবে যোগ করলে — ক্রেতাদের সার্চ-এর ফলাফলে আপনার পোস্ট সহজে দেখাতে এটি সাহায্য করবে।
      </p>

      {/* {fields.length === 0 && (
        <div className="border border-dashed border-border rounded-card px-4 py-6 text-center text-sm text-text-muted mb-3">
          এখনো কোনো বই যোগ করা হয়নি — নিচের বাটনে ক্লিক করে বই যোগ করুন।
        </div>
      )} */}

      <div className="flex flex-col gap-3.5">
        {fields.map((field, index) => (
          <BookItemCard
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      <button
        type="button"
        className="w-full mt-3 flex items-center justify-center gap-1.5 border-2 border-dashed border-border bg-transparent rounded-card py-3 text-sm font-semibold text-primary cursor-pointer transition-base hover:bg-primary-light hover:border-primary max-sm:bg-primary-light max-sm:border-primary"
        id="addBookBtn"
        onClick={() => append({ ...emptyBook })}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        {fields.length === 0 ? "বই যোগ করুন" : "আরেকটি বই যোগ করুন"}
      </button>
    </section>
  );
}
