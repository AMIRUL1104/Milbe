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
  publisherName: "",
  image: null,
  condition: "good" as const,
  price: null,
  availableStatus: "available" as const,
};

export default function BookListSection() {
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
    if (titleTouched.current) return;

    const firstBookName = books?.[0]?.bookName?.trim();
    if (!category && !firstBookName) return;

    const generated = firstBookName
      ? `${category ? `${category} ` : ""}${firstBookName}${books.length > 1 ? ` + ${books.length - 1} more` : ""}`
      : `${category} Books`;

    setValue("title", generated, { shouldDirty: false });
  }, [category, books, setValue]);

  return (
    <section id="step-books" className="bg-surface border border-border-light rounded-card p-5 scroll-mt-24">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">2</div>
        <h2 className="text-base font-semibold text-text-secondary">বইসমূহ</h2>
        <span className="ml-auto text-xs text-text-muted font-en">{fields.length} বই</span>
      </div>

      <div className="flex flex-col gap-3.5">
        {fields.map((field, index) => (
          <BookItemCard
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
          />
        ))}
      </div>

      <button
        type="button"
        className="w-full mt-3 flex items-center justify-center gap-1.5 border-2 border-dashed border-border bg-transparent rounded-card py-3 text-sm font-semibold text-primary cursor-pointer transition-base hover:bg-primary-light hover:border-primary"
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
        আরেকটি বই যোগ করুন
      </button>
    </section>
  );
}
