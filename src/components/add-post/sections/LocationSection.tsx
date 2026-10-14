"use client";

import { useFormContext } from "react-hook-form";
import { Home } from "lucide-react";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";
import { DISTRICT_OPTIONS } from "../../../lib/constant/location";
import ContactSection from "./ContactSection";
import SearchableDropdown from "@/components/shared/SearchableDropdown";

const inputBase =
  "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
const errorText = "text-xs font-medium text-danger mt-0.5";

interface LocationSectionProps {
  /** Create mode only — the save-to-profile checkbox is hidden in edit. */
  showSaveToProfile?: boolean;
}

export default function LocationSection({
  showSaveToProfile = true,
}: LocationSectionProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  const borderClass = (hasError?: boolean) =>
    hasError
      ? "border-danger focus:border-danger focus-visible:outline-danger"
      : "border-border focus:border-border-focus focus-visible:outline-primary-focus";

  const currentDistrict = watch("district") ?? "";
  const districtOptions: { value: string; label: string; hint: string }[] =
    DISTRICT_OPTIONS.map((d) => ({
      value: d.value,
      label: d.labelBn,
      hint: d.value,
    }));
  // Legacy/unknown stored values stay visible & editable instead of blank.
  if (currentDistrict && !districtOptions.some((o) => o.value === currentDistrict)) {
    districtOptions.push({
      value: currentDistrict,
      label: currentDistrict,
      hint: "পুরনো",
    });
  }

  return (
    <section id="step-location" className="bg-surface border border-border-light rounded-card p-5 scroll-mt-24">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">2</div>
        <h2 className="text-base font-semibold text-text-secondary">অবস্থান ও যোগাযোগ</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="mb-3.5">
          <label htmlFor="district" className="block text-sm font-medium text-text-primary mb-1.5">
            জেলা <span className="text-danger font-semibold">*</span>
          </label>
          <SearchableDropdown
            id="district"
            options={districtOptions}
            value={watch("district") ?? ""}
            onChange={(val) =>
              setValue("district", val, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            placeholder="জেলা খুঁজুন"
            allowClear={false}
            error={!!errors.district}
          />
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

      {/* Phone / messenger / WhatsApp + save-to-profile: same step. */}
      <ContactSection showSaveToProfile={showSaveToProfile} />
    </section>
  );
}
