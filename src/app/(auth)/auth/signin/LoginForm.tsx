"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MailWarning, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { getSafeRedirect } from "@/lib/safe-redirect";
import AuthField from "@/components/auth/AuthField";
import PasswordField from "@/components/auth/PasswordField";
import AuthDivider from "@/components/auth/Authdivider";
import ResendVerification from "@/components/auth/Resendverification";
import SocialAuth from "./SocialAuth";

const loginSchema = z.object({
  email: z.string().min(1, "ইমেইল দিন").email("সঠিক ইমেইল ঠিকানা দিন"),
  password: z.string().min(1, "পাসওয়ার্ড দিন"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (userData: LoginFormValues) => {
    setIsLoading(true);
    setUnverifiedEmail(null);

    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: userData.rememberMe,
      });

      if (error) {
        console.error("[LoginForm] Better Auth error:", error.code, error.message);

        // ইমেইল ভেরিফাই না করা থাকলে Better Auth 403 দেয়
        if (error.status === 403 || error.code === "EMAIL_NOT_VERIFIED") {
          setUnverifiedEmail(userData.email);
          return;
        }

        toast.error(getAuthErrorMessage(error, "লগইনে সমস্যা হয়েছে। আবার চেষ্টা করুন।"));
        return;
      }

      if (data?.user) {
        toast.success("মিলবেতে স্বাগতম।");
        router.push(getSafeRedirect(searchParams.get("redirect")));
        router.refresh();
      }
    } catch (err) {
      console.error("[LoginForm] Unexpected network error:", err);
      toast.error("ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <SocialAuth mode="login" />

      <AuthDivider />

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
          placeholder="name@student.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordField
          id="password"
          label="পাসওয়ার্ড"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between text-xs sm:text-sm mt-1">
          <label className="flex items-center gap-2 cursor-pointer text-text-secondary select-none">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary"
            />
            <span>মনে রাখুন</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>

        {unverifiedEmail && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-[#FCDE70] bg-[#FCDE70]/15 p-3.5"
          >
            <div className="flex items-start gap-2.5">
              <MailWarning className="w-5 h-5 text-text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-bold text-text-primary">
                  আপনার ইমেইল এখনো ভেরিফাই করা হয়নি।
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  ইনবক্স (স্প্যাম ফোল্ডারও) চেক করে ভেরিফিকেশন লিংকে ক্লিক করুন, অথবা নতুন লিংক
                  পাঠান।
                </p>
              </div>
            </div>
            <ResendVerification key={unverifiedEmail} email={unverifiedEmail} startCooldown={60} />
          </div>
        )}

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
            <span>লগইন</span>
          )}
        </button>

        <p className="text-xs text-text-muted text-center leading-relaxed">
          লগইন করার মাধ্যমে আপনি আমাদের{" "}
          <Link href="/terms" className="font-semibold text-primary hover:underline">
            শর্তাবলী
          </Link>{" "}
          ও{" "}
          <Link href="/privacy" className="font-semibold text-primary hover:underline">
            প্রাইভেসি পলিসিতে
          </Link>{" "}
          সম্মতি প্রকাশ করছেন।
        </p>
      </form>
    </div>
  );
}