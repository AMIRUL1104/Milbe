"use client";

import { PostItem } from "@/interface/post/types";
import { BookOpen } from "lucide-react";

interface BookInformationProps {
  post: PostItem;
}

export default function BookInformation({ post }: BookInformationProps) {
  const books = post.books ?? [];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Title Header + post-level price/condition strip */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-100 pb-4">
        <BookOpen className="w-5 h-5 text-[#35858E]" />
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          বইয়ের তালিকা ও বিবরণ
        </h2>

      </div>

      {books.length === 0 && (
        /* Empty list is valid — no empty table, just a hint. */
        <div className="border border-dashed border-slate-200 rounded-xl px-4 py-8 text-center text-sm text-slate-500">
          এই পোস্টে কোনো বইয়ের তালিকা দেওয়া হয়নি — বিবরণ দেওয়া থাকলে পড়ুন।
        </div>
      )}

      {/* 1. Desktop View Table (hidden on mobile) */}
      {books.length > 0 && (
        <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">বইয়ের নাম</th>
                <th className="py-3 px-4">লেখক</th>
                <th className="py-3 px-4">প্রকাশনী</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {books.map((book, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {book.bookName || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {book.author || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {book.publisherName || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. Mobile View Cards (visible only on small screens) */}
      {books.length > 0 && (
        <div className="block md:hidden space-y-3">
          {books.map((book, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs"
            >
              <h3 className="font-bold text-slate-900 text-sm leading-snug">
                {book.bookName || "—"}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                <div>
                  <span className="text-slate-400 block font-medium">লেখক:</span>
                  <span className="font-semibold text-slate-800">
                    {book.author || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">প্রকাশনী:</span>
                  <span className="font-semibold text-slate-800">
                    {book.publisherName || "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* General Description Section */}
      {post.description && (
        <div className="sm:hidden pt-2 border-t border-slate-100 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            অতিরিক্ত বিবরণ
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
            {post.description}
          </p>
        </div>
      )}
    </div>
  );
}
