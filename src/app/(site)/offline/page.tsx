import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
                <WifiOff className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">ইন্টারনেট সংযোগ নেই!</h1>
            <p className="text-gray-600 max-w-sm mb-6">
                আপনি বর্তমানে অফলাইনে আছেন। পেজটি দেখার জন্য ইন্টারনেট সংযোগ চালু করে আবার চেষ্টা করুন।
            </p>
            <Link
                href="/"
                className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}