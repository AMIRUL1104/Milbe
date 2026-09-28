import { ShieldAlert, LogOut, Home } from "lucide-react";
import Link from "next/link";

export default async function UnauthorizedPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#F5F7F8] px-4">
      <div className="w-full max-w-md bg-white border border-[#DDE5E7] rounded-2xl p-8 shadow-xs text-center flex flex-col items-center">
        {/* আইকন এরিয়া */}
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* টেক্সট কন্টেন্ট */}
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          You do not have permission to view this page. We are securely logging
          you out...
        </p>

        {/* অ্যাকশন বাটনস */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/auth/signin"
            className="w-full flex items-center justify-center gap-2 bg-[#35858E] hover:bg-[#35858E]/90 text-white font-bold py-3 px-4 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Go to Sign In</span>
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-white border border-[#DDE5E7] hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
