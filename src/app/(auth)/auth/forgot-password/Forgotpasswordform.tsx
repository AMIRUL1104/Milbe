"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail, MailCheck } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { toBengaliDigits } from "@/lib/utils/toBengaliDigits";
import { useCooldown } from "@/lib/hooks/useCooldown";
import AuthField from "@/components/auth/AuthField";
import StatusView from "@/components/auth/Statusview";

const forgotSchema = z.object({
    email: z.string().min(1, "ইমেইল দিন").email("সঠিক ইমেইল ঠিকানা দিন"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

const COOLDOWN_SECONDS = 60;

function BackToLogin() {
    return (
        <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            লগইনে ফিরে যান
        </Link>
    );
}

export default function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [sentTo, setSentTo] = useState<string | null>(null);
    const { seconds, start } = useCooldown();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotFormValues>({
        resolver: zodResolver(forgotSchema),
        mode: "onTouched",
        defaultValues: { email: "" },
    });

    // সফল হলে true ফেরত দেয়
    const requestReset = async (email: string) => {
        setIsLoading(true);
        try {
            const { error } = await authClient.requestPasswordReset({
                email,
                // ইমেইলের লিংকে ক্লিক করলে ইউজার এখানে আসবে (?token=... অথবা ?error=INVALID_TOKEN)
                redirectTo: "/auth/reset-password",
            });

            if (error) {
                console.error("[ForgotPasswordForm] Better Auth error:", error.code, error.message);
                toast.error(getAuthErrorMessage(error, "লিংক পাঠানো যায়নি। একটু পরে আবার চেষ্টা করুন।"));
                return false;
            }

            start(COOLDOWN_SECONDS);
            return true;
        } catch (err) {
            console.error("[ForgotPasswordForm] Unexpected network error:", err);
            toast.error("ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async ({ email }: ForgotFormValues) => {
        if (await requestReset(email)) setSentTo(email);
    };

    const handleResend = async () => {
        if (sentTo && (await requestReset(sentTo))) {
            toast.success("আবার রিসেট লিংক পাঠানো হয়েছে।");
        }
    };

    if (sentTo) {
        return (
            <StatusView
                icon={<MailCheck className="w-7 h-7" />}
                title="ইমেইল চেক করুন"
                description={
                    <>
                        যদি{" "}
                        <strong className="font-bold text-text-primary break-all">{sentTo}</strong> দিয়ে
                        মিলবেতে একাউন্ট থাকে, তাহলে পাসওয়ার্ড রিসেট করার লিংক পাঠানো হয়েছে। ইনবক্স (স্প্যাম
                        ফোল্ডারও) চেক করুন। লিংকটি ১ ঘণ্টা কাজ করবে।
                    </>
                }
            >
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading || seconds > 0}
                    className="w-full inline-flex items-center justify-center gap-2 border border-border bg-surface hover:bg-background text-text-secondary text-sm font-semibold py-2.5 px-4 rounded-btn transition-base cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-focus"
                >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {seconds > 0
                        ? `${toBengaliDigits(seconds)} সেকেন্ড পর আবার পাঠাতে পারবেন`
                        : "আবার লিংক পাঠান"}
                </button>
                <button
                    type="button"
                    onClick={() => setSentTo(null)}
                    className="text-sm font-semibold text-text-muted hover:text-text-secondary text-center cursor-pointer"
                >
                    অন্য ইমেইল দিয়ে চেষ্টা করুন
                </button>
                <div className="flex justify-center">
                    <BackToLogin />
                </div>
            </StatusView>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-2xl font-black text-text-primary tracking-tight">
                    পাসওয়ার্ড ভুলে গেছেন?
                </h1>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">
                    আপনার ইমেইল দিন। পাসওয়ার্ড রিসেট করার একটি লিংক আমরা পাঠিয়ে দেব।
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                <AuthField
                    id="email"
                    label="ইমেইল"
                    icon={Mail}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    autoFocus
                    placeholder="name@student.com"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-text-inverse font-bold py-2.5 px-4 rounded-btn transition-base shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-focus"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>অপেক্ষা করুন...</span>
                        </>
                    ) : (
                        <span>রিসেট লিংক পাঠান</span>
                    )}
                </button>
            </form>

            <div className="flex justify-center">
                <BackToLogin />
            </div>
        </div>
    );
}