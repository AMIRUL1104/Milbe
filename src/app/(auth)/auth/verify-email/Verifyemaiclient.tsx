"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleCheck, Loader2, Mail, MailCheck, TriangleAlert } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import AuthField from "@/components/auth/AuthField";
import ResendVerification from "@/components/auth/Resendverification";

const REDIRECT_DELAY_MS = 2500;

type StatusViewProps = {
  icon: ReactNode;
  tone?: "primary" | "danger";
  title: string;
  description: ReactNode;
  children?: ReactNode;
};

function StatusView({ icon, tone = "primary", title, description, children }: StatusViewProps) {
  return (
    <div className="w-full flex flex-col items-center gap-5 text-center" aria-live="polite">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tone === "danger" ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"
          }`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-black text-text-primary tracking-tight">{title}</h1>
        <p className="text-sm text-text-muted leading-relaxed">{description}</p>
      </div>
      {children && <div className="w-full flex flex-col gap-3 text-left">{children}</div>}
    </div>
  );
}

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = authClient.useSession();

  const emailFromUrl = searchParams.get("email") ?? "";
  // লিংক ভুল/মেয়াদোত্তীর্ণ হলে Better Auth ?error=invalid_token দিয়ে ফেরত পাঠায়
  const hasError = Boolean(searchParams.get("error"));
  // ভেরিফাই সফল হলে autoSignIn হয়ে session তৈরি হয়, আর emailVerified true থাকে
  const isVerified = Boolean(session?.user.emailVerified);

  const [typedEmail, setTypedEmail] = useState("");
  const email = emailFromUrl || typedEmail.trim();

  useEffect(() => {
    if (!isVerified) return;
    const timer = setTimeout(() => {
      router.replace("/");
      router.refresh();
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isVerified, router]);

  if (isPending) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isVerified) {
    return (
      <StatusView
        icon={<CircleCheck className="w-7 h-7" />}
        title="ইমেইল ভেরিফাই হয়েছে"
        description="আপনার একাউন্ট এখন চালু। কিছুক্ষণের মধ্যে হোমপেজে নিয়ে যাওয়া হচ্ছে।"
      >
        <Link
          href="/"
          className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-text-inverse font-bold py-2.5 px-4 rounded-btn transition-base shadow-md focus-visible:outline-2 focus-visible:outline-primary-focus"
        >
          হোমপেজে যান
        </Link>
      </StatusView>
    );
  }

  // URL-এ ইমেইল না থাকলে (যেমন লিংক মেয়াদোত্তীর্ণ হয়ে এলে) ইউজার নিজে লিখবে
  const emailInput = !emailFromUrl && (
    <AuthField
      id="verify-email"
      label="ইমেইল"
      icon={Mail}
      type="email"
      inputMode="email"
      autoComplete="email"
      autoCapitalize="none"
      spellCheck={false}
      placeholder="name@student.com"
      value={typedEmail}
      onChange={(e) => setTypedEmail(e.target.value)}
    />
  );

  if (hasError) {
    return (
      <StatusView
        tone="danger"
        icon={<TriangleAlert className="w-7 h-7" />}
        title="ভেরিফিকেশন লিংকটি কাজ করছে না"
        description="লিংকটির মেয়াদ শেষ হয়ে গেছে অথবা এটি আগেই ব্যবহার করা হয়েছে। নতুন লিংক পাঠিয়ে আবার চেষ্টা করুন।"
      >
        {emailInput}
        <ResendVerification email={email} />
      </StatusView>
    );
  }

  return (
    <StatusView
      icon={<MailCheck className="w-7 h-7" />}
      title="ইমেইল ভেরিফাই করুন"
      description={
        emailFromUrl ? (
          <>
            <strong className="font-bold text-text-primary break-all">{emailFromUrl}</strong>{" "}
            ঠিকানায় একটি ভেরিফিকেশন লিংক পাঠানো হয়েছে। ইনবক্স (স্প্যাম ফোল্ডারও) চেক করে লিংকে
            ক্লিক করুন।
          </>
        ) : (
          "আপনার ইমেইলে একটি ভেরিফিকেশন লিংক পাঠানো হয়েছে। ইনবক্স (স্প্যাম ফোল্ডারও) চেক করে লিংকে ক্লিক করুন।"
        )
      }
    >
      {emailInput}
      <ResendVerification email={email} startCooldown={emailFromUrl ? 60 : 0} />
      <p className="text-sm text-text-muted text-center">
        ভুল ইমেইল দিয়েছেন?{" "}
        <Link href="/auth/signup" className="font-bold text-primary hover:text-primary-hover">
          আবার রেজিস্ট্রেশন করুন
        </Link>
      </p>
    </StatusView>
  );
}