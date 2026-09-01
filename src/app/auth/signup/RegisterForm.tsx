"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import SocialAuth from "../signin/SocialAuth";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { createUserProfile } from "@/services/features/userProfile";

const registerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (userData: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        console.error("[RegisterForm] Better Auth error:", error.message);
        toast.error(error.message || "Something went wrong during registration.");
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        await createUserProfile();
        toast.success("Registration successful! Welcome to Milbe.");
        setIsLoading(false);
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("[RegisterForm] Unexpected network error:", err);
      toast.error("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  const inputBase =
    "w-full bg-surface border rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";
  const labelBase = "text-xs font-bold text-text-secondary uppercase tracking-wider";
  const errorText = "text-xs font-medium text-danger mt-0.5";

  return (
    <div className="w-full flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className={labelBase}>
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="fullName"
              type="text"
              placeholder="Amirul Islam"
              {...register("fullName")}
              className={`${inputBase} ${errors.fullName ? "border-danger focus:border-danger focus-visible:outline-danger" : "border-border focus:border-border-focus focus-visible:outline-primary-focus"}`}
            />
          </div>
          {errors.fullName && (
            <p className={errorText}>{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelBase}>
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="email"
              type="email"
              placeholder="amirul@student.com"
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

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className={labelBase}>
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={`${inputBase} ${errors.confirmPassword ? "border-danger focus:border-danger focus-visible:outline-danger" : "border-border focus:border-border-focus focus-visible:outline-primary-focus"}`}
            />
          </div>
          {errors.confirmPassword && (
            <p className={errorText}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-sm text-text-secondary select-none">
            <input
              type="checkbox"
              {...register("terms")}
              className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary mt-0.5"
            />
            <span className="text-xs sm:text-sm leading-tight">
              I agree to the{" "}
              <span className="text-primary font-semibold hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-primary font-semibold hover:underline">Privacy Policy</span>.
            </span>
          </label>
          {errors.terms && (
            <p className={errorText}>{errors.terms.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-text-inverse font-bold py-2.5 px-4 rounded-btn transition-base shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2 focus-visible:outline-2 focus-visible:outline-primary-focus"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>Create Account</span>
          )}
        </button>
      </form>

      <div className="flex items-center my-1">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-3 text-xs font-bold text-text-muted uppercase tracking-wider">OR</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      <SocialAuth />
    </div>
  );
}