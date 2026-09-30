"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { toBengaliDigits } from "@/lib/utils/toBengaliDigits";
import { useCooldown } from "@/lib/hooks/useCooldown";

const COOLDOWN_SECONDS = 60;

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
    const { seconds, start } = useCooldown(startCooldown);
    const [isSending, setIsSending] = useState(false);

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
            start(COOLDOWN_SECONDS);
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
            disabled={isSending || seconds > 0 || !email}
            className="w-full inline-flex items-center justify-center gap-2 border border-border bg-surface hover:bg-background text-text-secondary text-sm font-semibold py-2.5 px-4 rounded-btn transition-base cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-focus"
        >
            {isSending && <Loader2 className="w-4 h-4 animate-spin" />}
            {seconds > 0
                ? `${toBengaliDigits(seconds)} সেকেন্ড পর আবার পাঠাতে পারবেন`
                : "আবার লিংক পাঠান"}
        </button>
    );
}