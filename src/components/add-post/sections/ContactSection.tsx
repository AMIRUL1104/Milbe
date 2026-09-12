"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Phone, MessageCircle } from "lucide-react";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";
import Switch from "../Switch";

const inputBase =
  "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
const errorText = "text-xs font-medium text-danger mt-0.5";

export default function ContactSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AddPostFormValues>();

  const borderClass = (hasError?: boolean) =>
    hasError
      ? "border-danger focus:border-danger focus-visible:outline-danger"
      : "border-border focus:border-border-focus focus-visible:outline-primary-focus";

  return (
    <section className="bg-surface border border-border-light rounded-card p-5 scroll-mt-24">  <div className="flex items-center gap-2.5 mb-4">
      <div className="w-6 h-6 rounded-full bg-primary text-white font-en font-semibold text-xs flex items-center justify-center">4</div>
      <h2 className="text-base font-semibold text-text-secondary">যোগাযোগ</h2>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="mb-3.5">
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1.5">
            ফোন নম্বর <span className="text-danger font-semibold">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"><Phone width="16" height="16" /></span>
            <input
              id="phone"
              type="text"
              placeholder="০১XXXXXXXXX"
              {...register("phone")}
              className={`${inputBase} ${borderClass(!!errors.phone)}`}
            />
          </div>
          {errors.phone && <p className={errorText}>{errors.phone.message}</p>}
        </div>

        <div className="mb-3.5">
          <label htmlFor="messenger" className="block text-sm font-medium text-text-primary mb-1.5">
            মেসেঞ্জার <span className="font-medium text-text-muted text-xs">(ঐচ্ছিক)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"><MessageCircle width="16" height="16" /></span>
            <input
              id="messenger"
              type="text"
              placeholder="ইউজারনেম বা লিংক"
              {...register("messenger")}
              className={`${inputBase} ${borderClass(!!errors.messenger)}`}
            />
          </div>
          {errors.messenger && (
            <p className={errorText}>{errors.messenger.message}</p>
          )}
        </div>
      </div>

      <div className="mb-3.5">
        <Controller
          control={control}
          name="whatsappOnly"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={field.onChange}
              label="হোয়াটসঅ্যাপেও যোগাযোগ করুন"
              helperText="একই ফোন নম্বরে হোয়াটসঅ্যাপ চালু আছে"
            />
          )}
        />
      </div>
    </section>
  );
}
