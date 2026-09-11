"use client";

import { Controller, useFormContext } from "react-hook-form";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";

interface TypeToggleProps {
  name?: "type";
}

export default function TypeToggle({ name = "type" }: TypeToggleProps) {
  const { control, formState } = useFormContext<AddPostFormValues>();
  const error = formState.errors[name]?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <div className="grid grid-cols-2 gap-2 bg-background p-[5px] rounded-xl border border-border-light">
            <button
              type="button"
              className={`border-none py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-1.5 text-sm font-semibold transition-base ${
                field.value === "sell"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-transparent text-text-secondary"
              }`}
              onClick={() => field.onChange("sell")}
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
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              বিক্রি করবো
            </button>
            <button
              type="button"
              className={`border-none py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-1.5 text-sm font-semibold transition-base ${
                field.value === "donate"
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-transparent text-text-secondary"
              }`}
              onClick={() => field.onChange("donate")}
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
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              দান করবো
            </button>
          </div>
          {error && (
            <p className="mt-1.5 text-xs font-medium text-danger">{error}</p>
          )}
        </div>
      )}
    />
  );
}
