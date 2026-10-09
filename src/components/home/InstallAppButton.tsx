"use client";

import { useState } from "react";
import { Download, X, Share2, Smartphone } from "lucide-react";
import { usePWAInstall } from "@/lib/hooks/usePWAInstall";

interface InstallAppButtonProps {
  className?: string;
}

export default function InstallAppButton({ className = "" }: InstallAppButtonProps) {
  const { isInstallable, isInstalled, isIOS, isDev, promptInstall } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (!isInstallable || isInstalled) return null;

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
    } else {
      const installed = await promptInstall();
      // Development fallback: Fake prompt trigger না করে নোটিফাই করা
      if (!installed && isDev) {
        alert("Development Mode: Native PWA install prompt is only triggered by real browsers supporting installability criteria.");
      }
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#35858E] px-6 py-3.5 text-base font-bold text-[#35858E] backdrop-blur-sm transition-all bg-[#35858E]/10 active:scale-[0.98]";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`${baseStyles} ${className}`}
        aria-label="অ্যাপটি ইনস্টল করুন"
      >
        <Download className="h-5 w-5" />
        <span>
          অ্যাপটি ডাউনলোড করুন {isDev && <span className="text-xs text-amber-600 font-normal">(Dev Test)</span>}
        </span>
      </button>

      {isIOS && showIOSModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-modal-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 id="ios-modal-title" className="text-lg font-bold text-gray-900">
                অ্যাপটি হোম স্ক্রিনে যোগ করুন
              </h2>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="মোডাল বন্ধ করুন"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#35858E]/10 mx-auto">
                <Smartphone className="h-8 w-8 text-[#35858E]" />
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-medium text-gray-900">iOS-এ অ্যাপ ইনস্টল করতে:</p>
                <ol className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#35858E]/10 text-[#35858E]">
                      <span className="text-xs font-bold">১</span>
                    </span>
                    <span>নিচের শেয়ার বাটনে চাপ দিন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#35858E]/10 text-[#35858E]">
                      <span className="text-xs font-bold">২</span>
                    </span>
                    <span>{'&ldquo;Add to Home Screen&rdquo; অপশনটি বেছে নিন'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#35858E]/10 text-[#35858E]">
                      <span className="text-xs font-bold">৩</span>
                    </span>
                    <span>{'&ldquo;Add&rdquo; বাটনে চাপ দিন'}</span>
                  </li>
                </ol>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 text-xs text-gray-500">
                <p className="flex items-center gap-1.5 justify-center">
                  <Share2 className="h-4 w-4" />
                  <span>শেয়ার বাটনটি ব্রাউজারের নিচের বারের মধ্যে থাকে</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="w-full rounded-xl bg-[#35858E] px-4 py-2.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#2d737b] active:scale-95"
              >
                বুঝলাম
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}