"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";

const COOLDOWN_SECONDS = 60;

const toBengaliDigits = (n: number) =>
    String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

type ResendVerificationProps = {
    email: string;
    // ভেরিফাই হওয়ার পর Better Auth যে path-এ পাঠাবে
    callbackURL?: string;
    // এইমাত্র লিংক পাঠানো হয়ে থাকলে ৬০, নাহলে ০
    startCooldown?: number;
};

export default function ResendVerification({
    email,
    callbackURL = "/auth/verify-email",
    startCooldown = 0,
}: ResendVerificationProps) {
    const [cooldown, setCooldown] = useState(startCooldown);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleResend = async () => {
        setIsSending(true);
        try {
            const { error } = await authClient.sendVerificationEmail({ email, callbackURL });
            if (error) {
                console.error("[ResendVerification] Better Auth error:", error.code, error.message);
                toast.error(getAuthErrorMessage(error, "লিংক পাঠানো যায়নি। একটু পরে আবার চেষ্টা করুন।"));
                return;
            }
            toast.success("নতুন ভেরিফিকেশন লিংক পাঠানো হয়েছে।");
            setCooldown(COOLDOWN_SECONDS);
        } catch (err) {
            console.error("[ResendVerification] Unexpected network error:", err);
            toast.error("ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleResend}
            disabled={isSending || cooldown > 0 || !email}
            className="w-full inline-flex items-center justify-center gap-2 border border-border bg-surface hover:bg-background text-text-secondary text-sm font-semibold py-2.5 px-4 rounded-btn transition-base cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-focus"
        >
            {isSending && <Loader2 className="w-4 h-4 animate-spin" />}
            {cooldown > 0
                ? `${toBengaliDigits(cooldown)} সেকেন্ড পর আবার পাঠাতে পারবেন`
                : "আবার লিংক পাঠান"}
        </button>
    );
}