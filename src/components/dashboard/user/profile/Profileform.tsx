"use client";

import { UseFormReturn } from "react-hook-form";
import { Mail } from "lucide-react";
import { ProfileFormValues } from "@/lib/validaions/profile-schema";

interface ProfileFormProps {
    form: UseFormReturn<ProfileFormValues>;
    email: string;
}

const DISTRICTS = [
    "ঢাকা",
    "চট্টগ্রাম",
    "সিলেট",
    "রাজশাহী",
    "খুলনা",
    "বরিশাল",
    "রংপুর",
    "ময়মনসিংহ",
    "কুমিল্লা",
    "নারায়ণগঞ্জ",
    "গাজীপুর",
    "বগুড়া",
    "যশোর",
    "দিনাজপুর",
    "কক্সবাজার",
];

const inputBase =
    "w-full rounded-input border border-border focus:border-border-focus focus:ring-2 focus:ring-primary/20 outline-none px-4 py-2.5 text-sm text-text-primary bg-surface transition-base placeholder:text-text-placeholder";

const inputError = "border-danger focus:border-danger focus:ring-danger/20";

const labelClass = "text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5 block";

const errorClass = "text-xs font-medium text-danger mt-1";

export function ProfileForm({ form, email }: ProfileFormProps) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <div className="rounded-card border border-border-light shadow-sm bg-surface p-6">
            <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">
                বিস্তারিত সম্পাদনা
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="fullName">
                        পুরো নাম
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="আপনার পুরো নাম"
                        className={`${inputBase} ${errors.fullName ? inputError : ""}`}
                        {...register("fullName")}
                    />
                    {errors.fullName && (
                        <p className={errorClass}>{errors.fullName.message}</p>
                    )}
                </div>

                <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="email">
                        Email
                        <span className="ml-1.5 text-[10px] font-semibold text-text-muted normal-case tracking-normal">
                            (লক করা)
                        </span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                            <Mail size={15} />
                        </span>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            readOnly
                            className="w-full rounded-input border border-border bg-background pl-9 pr-4 py-2.5 text-sm text-text-muted cursor-not-allowed outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass} htmlFor="phoneNumber">
                        ফোন নম্বর
                    </label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        className={`${inputBase} ${errors.phoneNumber ? inputError : ""}`}
                        {...register("phoneNumber")}
                    />
                    {errors.phoneNumber && (
                        <p className={errorClass}>{errors.phoneNumber.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClass} htmlFor="district">
                        জেলা
                    </label>
                    <select
                        id="district"
                        className={`${inputBase} ${errors.district ? inputError : ""} cursor-pointer bg-surface`}
                        {...register("district")}
                    >
                         <option value="">জেলা বেছে নিন</option>
                        {DISTRICTS.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                    {errors.district && (
                        <p className={errorClass}>{errors.district.message}</p>
                    )}
                </div>

                <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="area">
                        এলাকা
                    </label>
                    <input
                        id="area"
                        type="text"
                        placeholder="যেমন: মিরপুর ১০, গুলশান ২…"
                        className={`${inputBase} ${errors.area ? inputError : ""}`}
                        {...register("area")}
                    />
                    {errors.area && (
                        <p className={errorClass}>{errors.area.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}