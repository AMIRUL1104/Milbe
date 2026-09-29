// src/app/(auth)/.../signin/page.tsx  (তোমার আগের login page-এর জায়গায়)
import { BookOpen } from "lucide-react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#F5F7F8] px-4 py-12">
      <div className="w-full max-w-110 bg-white border border-[#DDE5E7] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col items-center">
        {/* লোগো এবং আইকন এরিয়া */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-[#35858E]/10 text-[#35858E] flex items-center justify-center shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <Link href="/" className="text-xl font-black text-gray-900 tracking-tight">
            Milbe
          </Link>
        </div>

        {/* হেডার টেক্সট */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">লগইন করুন</h1>
          <p className="text-sm text-gray-500 mt-1">
            বই পোস্ট করতে, রিকোয়েস্ট ট্র্যাক করতে এবং আপনার ড্যাশবোর্ড দেখতে এখনই লগইন করুন।
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-6">
              <Spinner className="w-6 h-6 animate-spin text-[#35858E]" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        {/* সাইন আপ পেজের লিঙ্ক */}
        <p className="text-sm text-gray-500 text-center mt-6">
          একাউন্ট নেই?{" "}
          <Link
            href="/auth/signup"
            className="font-bold text-[#35858E] hover:text-[#35858E]/80 transition-colors focus-visible:outline-2 focus-visible:outline-[#35858E] rounded"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}