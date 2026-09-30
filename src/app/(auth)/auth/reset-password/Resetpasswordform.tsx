"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import PasswordField from "@/components/auth/PasswordField";
import PasswordChecklist from "@/components/auth/Passwordchecklist";
import StatusView from "@/components/auth/Statusview";

const resetSchema = z
    .object({
        password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"),
        confirmPassword: z.string().min(1, "পাসওয়ার্ডটি আবার লিখুন"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "পাসওয়ার্ড মিলছে না",
        path: ["confirmPassword"],
    });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ইমেইলের লিংক ঠিক থাকলে ?token=..., ভুল/মেয়াদোত্তীর্ণ হলে ?error=INVALID_TOKEN আসে
    const token = searchParams.get("token");
    const hasUrlError = Boolean(searchParams.get("error")) || !token;

    const [isLoading, setIsLoading] = useState(false);
    const [tokenRejected, setTokenRejected] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        mode: "onTouched",
        defaultValues: { password: "", confirmPassword: "" },
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const passwordsMatch = Boolean(password) && password === confirmPassword;

    const onSubmit = async (userData: ResetFormValues) => {
        if (!token) return;
        setIsLoading(true);

        try {
            const { error } = await authClient.resetPassword({
                newPassword: userData.password,
                token,
            });

            if (error) {
                console.error("[ResetPasswordForm] Better Auth error:", error.code, error.message);
                if (error.code === "INVALID_TOKEN") {
                    setTokenRejected(true);
                    return;
                }
                toast.error(getAuthErrorMessage(error, "পাসওয়ার্ড বদলানো যায়নি। আবার চেষ্টা করুন।"));
                return;
            }

            toast.success("পাসওয়ার্ড বদলানো হয়েছে। নতুন পাসওয়ার্ড দিয়ে লগইন করুন।");
            router.push("/auth/signin");
        } catch (err) {
            console.error("[ResetPasswordForm] Unexpected network error:", err);
            toast.error("ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।");
        } finally {
            setIsLoading(false);
        }
    };

    if (hasUrlError || tokenRejected) {
        return (
            <StatusView
                tone="danger"
                icon={<TriangleAlert className="w-7 h-7" />}
                title="রিসেট লিংকটি কাজ করছে না"
                description="লিংকটির মেয়াদ শেষ হয়ে গেছে অথবা এটি আগেই ব্যবহার করা হয়েছে। নতুন লিংক নিয়ে আবার চেষ্টা করুন।"
            >
                <Link
                    href="/auth/forgot-password"
                    className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-text-inverse font-bold py-2.5 px-4 rounded-btn transition-base shadow-md focus-visible:outline-2 focus-visible:outline-primary-focus"
                >
                    নতুন লিংক নিন
                </Link>
            </StatusView>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-2xl font-black text-text-primary tracking-tight">
                    নতুন পাসওয়ার্ড দিন
                </h1>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">
                    আপনার একাউন্টের জন্য একটি নতুন পাসওয়ার্ড সেট করুন।
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                <div className="flex flex-col gap-2.5">
                    <PasswordField
                        id="password"
                        label="নতুন পাসওয়ার্ড"
                        autoComplete="new-password"
                        autoFocus
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register("password", {
                            // পাসওয়ার্ড বদলালে "মিলছে কিনা" আবার যাচাই হবে
                            onChange: () => {
                                if (getValues("confirmPassword")) void trigger("confirmPassword");
                            },
                        })}
                    />
                    <PasswordChecklist password={password} />
                </div>

                <PasswordField
                    id="confirmPassword"
                    label="পাসওয়ার্ড নিশ্চিত করুন"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    hint={
                        passwordsMatch ? (
                            <span className="inline-flex items-center gap-1 font-medium text-primary">
                                <Check className="w-3.5 h-3.5" />
                                পাসওয়ার্ড মিলেছে
                            </span>
                        ) : undefined
                    }
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-text-inverse font-bold py-2.5 px-4 rounded-btn transition-base shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-1 focus-visible:outline-2 focus-visible:outline-primary-focus"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>অপেক্ষা করুন...</span>
                        </>
                    ) : (
                        <span>পাসওয়ার্ড বদলান</span>
                    )}
                </button>
            </form>
        </div>
    );
}