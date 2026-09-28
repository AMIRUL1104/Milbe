"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import SocialAuth from "./SocialAuth";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const loginSchema = z.object({
  email: z.string().min(1, "ইমেইল দিন").email("সঠিক ইমেইল ঠিকানা দিন"),
  password: z.string().min(1, "পাসওয়ার্ড দিন"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (userData: LoginFormValues) => {
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: userData.rememberMe,
      });

      if (error) {
        console.error("[LoginForm] Better Auth error:", error.message);
        toast.error(error.message || "সাইন ইনে সমস্যা হয়েছে।");
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        toast.success("মিলবেতে স্বাগতম।");
        setIsLoading(false);
        router.push(searchParams.get("redirect") || "/");
        router.refresh();
      }
    } catch (err) {
      console.error("[LoginForm] Unexpected network error:", err);
      toast.error("ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const inputBase =
    "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
  const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
  const errorText = "text-xs font-medium text-danger mt-0.5";

  return (
    <div className="w-full flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelBase}>
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="email"
              type="email"
              placeholder="name@student.com"
              {...register("email")}
              className={`${inputBase} ${errors.email ? "border-danger focus:border-danger focus-visible:outline-danger" : "border-border focus:border-border-focus focus-visible:outline-primary-focus"}`}
            />
          </div>
          {errors.email && (
            <p className={errorText}>{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={labelBase}>
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={`${inputBase} pr-10 ${errors.password ? "border-danger focus:border-danger focus-visible:outline-danger" : "border-border focus:border-border-focus focus-visible:outline-primary-focus"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-secondary rounded-md cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className={errorText}>{errors.password.message}</p>
          )}
        </div>

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
            href="/forgot-password"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-text-inverse font-bold py-2.5 px-4 rounded-btn transition-base shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2 focus-visible:outline-2 focus-visible:outline-primary-focus"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>সাইন ইন</span>
          )}
        </button>
      </form>

      <div className="flex items-center my-1">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-3 text-xs font-bold text-text-muted uppercase tracking-wider">অথবা</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      <SocialAuth />
    </div>
  );
}