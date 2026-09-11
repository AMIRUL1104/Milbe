"use client";

import { useFormContext } from "react-hook-form";
import { MapPin, Home } from "lucide-react";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";
import { DISTRICTS } from "../../../lib/constant/location";

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
    <section className="bg-surface border border-border-light rounded-card p-5 scroll-mt-24">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">4</div>
        <h2 className="text-base font-semibold text-text-secondary">অবস্থান</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="mb-3.5">
          <label htmlFor="district" className="block text-sm font-medium text-text-primary mb-1.5">
            জেলা <span className="text-danger font-semibold">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"><MapPin width="16" height="16" /></span>
            <input
              id="district"
              type="text"
              list="districtList"
              placeholder="জেলা খুঁজুন"
              autoComplete="off"
              {...register("district")}
              className={`${inputBase} ${borderClass(!!errors.district)}`}
            />
            <datalist id="districtList">
              {DISTRICTS.map((district) => (
                <option key={district} value={district} />
              ))}
            </datalist>
          </div>
          {errors.district && (
            <p className={errorText}>{errors.district.message}</p>
          )}
        </div>

        <div className="mb-3.5">
          <label htmlFor="area" className="block text-sm font-medium text-text-primary mb-1.5">
            এলাকা <span className="text-danger font-semibold">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"><Home width="16" height="16" /></span>
            <input
              id="area"
              type="text"
              placeholder="যেমন: আমবারখানা"
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
