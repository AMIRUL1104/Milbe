// src/app/(auth)/.../signup/page.tsx  (তোমার আগের register page-এর জায়গায়)
import { BookOpen } from "lucide-react";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#F5F7F8] px-4 py-12">
      <div className="w-full max-w-115 bg-white border border-[#DDE5E7] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col items-center">
        {/* লোগো ও ব্র্যান্ড এরিয়া */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-[#35858E]/10 text-[#35858E] flex items-center justify-center shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <Link
            href="/"
            className="text-xl font-black text-gray-900 tracking-tight"
          >
            মিলবে
          </Link>
        </div>

        {/* হেডিং টেক্সট */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            মিলবেতে রেজিস্ট্রেশন করুন
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            একাউন্ট খুলে বই কেনা, বেচা বা ডোনেট করা শুরু করুন।
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-6">
              <Spinner className="w-6 h-6 animate-spin text-[#35858E]" />
            </div>
          }
        >
          <RegisterForm />
        </Suspense>

        {/* লগইন পেজের লিঙ্ক */}
        <p className="text-sm text-gray-500 text-center mt-6">
          ইতিমধ্যে একাউন্ট আছে?{" "}
          <Link
            href="/auth/signin"
            className="font-bold text-[#35858E] hover:text-[#35858E]/80 transition-colors focus-visible:outline-2 focus-visible:outline-[#35858E] rounded"
          >
            লগইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
