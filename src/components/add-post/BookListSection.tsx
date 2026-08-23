"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";

import BookItemCard from "./BookItemCard";
import { AddPostFormValues } from "@/lib/validaions/add-post-schema";

const emptyBook = {
  bookId: "",
  publisherId: "",
  bookName: "",
  publisherName: "",
  image: null,
  condition: "good" as const,
  price: null,
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
      ? `${category ? `${category} ` : ""}${firstBookName}${
          books.length > 1 ? ` + ${books.length - 1} more` : ""
        }`
      : `${category} Books`;

    setValue("title", generated, { shouldDirty: false });
  }, [category, books, setValue]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-text-secondary">Books</h2>
        <button
          type="button"
          onClick={() => append({ ...emptyBook })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary-light hover:bg-primary/20 rounded-btn px-3 py-1.5 transition-base cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <BookItemCard
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
          />
        ))}
      </div>
    </section>
  );
}