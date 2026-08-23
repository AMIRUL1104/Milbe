"use client";

import { useFormContext } from "react-hook-form";
import { MapPin, Home } from "lucide-react";
import { AddPostFormValues } from "@/lib/validaions/add-post-schema";
import { DISTRICTS } from "./post";

const inputBase =
  "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
const errorText = "text-xs font-medium text-danger mt-0.5";

export default function LocationSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  const borderClass = (hasError?: boolean) =>
    hasError
      ? "border-danger focus:border-danger focus-visible:outline-danger"
      : "border-border focus:border-border-focus focus-visible:outline-primary-focus";

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-text-secondary">Location</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="district" className={labelBase}>
            District
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="district"
              type="text"
              list="district-options"
              placeholder="Search district"
              autoComplete="off"
              {...register("district")}
              className={`${inputBase} ${borderClass(!!errors.district)}`}
            />
            <datalist id="district-options">
              {DISTRICTS.map((district) => (
                <option key={district} value={district} />
              ))}
            </datalist>
          </div>
          {errors.district && (
            <p className={errorText}>{errors.district.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="area" className={labelBase}>
            Area
          </label>
          <div className="relative">
            <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="area"
              type="text"
              placeholder="e.g. Ambarkhana"
              {...register("area")}
              className={`${inputBase} ${borderClass(!!errors.area)}`}
            />
          </div>
          {errors.area && <p className={errorText}>{errors.area.message}</p>}
        </div>
      </div>
    </section>
  );
}