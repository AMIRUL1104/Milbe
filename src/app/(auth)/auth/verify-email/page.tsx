// src/app/(auth)/.../verify-email/page.tsx  (signin/signup ফোল্ডারের পাশে, URL: /auth/verify-email)
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import VerifyEmailClient from "./Verifyemaiclient";

export const metadata = { title: "ইমেইল ভেরিফাই করুন | Milbe" };

export default function VerifyEmailPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[#F5F7F8] px-4 py-12">
            <div className="w-full max-w-110 bg-white border border-[#DDE5E7] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col items-center">
                <div className="mb-6 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-[#35858E]/10 text-[#35858E] flex items-center justify-center shadow-xs">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <Link href="/" className="text-xl font-black text-gray-900 tracking-tight">
                        মিলবে
                    </Link>
                </div>

                <Suspense
                    fallback={
                        <div className="flex justify-center py-6">
                            <Spinner className="w-6 h-6 animate-spin text-[#35858E]" />
                        </div>
                    }
                >
                    <VerifyEmailClient />
                </Suspense>
            </div>
        </main>
    );
}