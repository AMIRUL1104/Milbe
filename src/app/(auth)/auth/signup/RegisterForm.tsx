"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, Loader2, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import AuthField from "@/components/auth/AuthField";
import PasswordField from "@/components/auth/PasswordField";
import PasswordChecklist from "@/components/auth/Passwordchecklist";
import AuthDivider from "@/components/auth/Authdivider";
import SocialAuth from "../signin/SocialAuth";

const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, "পুরো নাম দিন"),
    email: z.string().min(1, "ইমেইল দিন").email("সঠিক ইমেইল ঠিকানা দিন"),
    password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"),
    confirmPassword: z.string().min(1, "পাসওয়ার্ডটি আবার লিখুন"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড মিলছে না",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch = Boolean(password) && password === confirmPassword;

  const onSubmit = async (userData: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        // ভেরিফাই হওয়ার পর Better Auth এই page-এ ফেরত পাঠাবে (auto sign-in সহ)
        callbackURL: "/auth/verify-email",
      });

      if (error) {
        console.error("[RegisterForm] Better Auth error:", error.code, error.message);
        toast.error(getAuthErrorMessage(error, "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"));
        return;
      }

      // ইমেইল আগে থেকে থাকলেও একই response আসে (enumeration protection), তাই দুই ক্ষেত্রেই একই page
      toast.success("ভেরিফিকেশন লিংক পাঠানো হয়েছে।");
      router.push(`/auth/verify-email?email=${encodeURIComponent(userData.email)}`);
    } catch (err) {
      console.error("[RegisterForm] Unexpected network error:", err);
      toast.error("ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <SocialAuth mode="signup" />

      <AuthDivider />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <AuthField
          id="fullName"
          label="পুরো নাম"
          icon={User}
          type="text"
          autoComplete="name"
          autoCapitalize="words"
          placeholder="আমিরুল ইসলাম"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <AuthField
          id="email"
          label="ইমেইল"
          icon={Mail}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="amirul@student.com"
          hint="এই ঠিকানায় ভেরিফিকেশন লিংক পাঠানো হবে।"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex flex-col gap-2.5">
          <PasswordField
            id="password"
            label="পাসওয়ার্ড"
            autoComplete="new-password"
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
            <span>সাইন আপ করুন</span>
          )}
        </button>

        <p className="text-xs text-text-muted text-center leading-relaxed">
          রেজিস্ট্রেশন করার মাধ্যমে আপনি আমাদের{" "}
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