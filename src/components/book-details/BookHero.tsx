"use client";

import Image from "next/image";
import { PostItem } from "@/interface/post/types";

interface BookHeroProps {
  post: PostItem;
}

export default function BookHero({ post }: BookHeroProps) {
  const imageUrl = post.image;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

        {/* 1. Image Container (Cropping fixed with object-contain & blur backdrop) */}
        <div className="relative w-full md:w-60 h-72 sm:h-80 shrink-0 rounded-xl overflow-hidden bg-slate-900/5 border border-slate-200/80 flex items-center justify-center">
          {/* Blurred Background to fill empty spaces naturally */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-lg opacity-30 scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Main Book Cover Image - No Cropping */}
          <div className="relative w-full h-full p-2 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={post.title || "বইয়ের ছবি"}
              fill
              sizes="(max-width: 768px) 100vw, 240px"
              priority
              className="object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Type Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold shadow-xs tracking-wide uppercase ${post.type === "donate"
                ? "bg-[#F6CE71] text-slate-900"
                : "bg-[#35858E] text-white"
                }`}
            >
              {post.type === "donate" ? "ডোনেট" : "বিক্রয়"}
            </span>
          </div>
        </div>

        {/* 2. Existing Content UI Modernization */}
        <div className="flex-1 space-y-4 text-left w-full">

          {/* Category & Title */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
              <span>ক্যাটাগরি:</span>
              <span className="text-slate-900 font-bold uppercase">
                {post.category || "সাধারণ"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-snug">
              {post.title}
            </h1>
          </div>

          {/* Price Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 inline-block w-full sm:w-auto min-w-[200px]">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              নির্ধারিত মূল্য
            </p>
            <div className="text-2xl sm:text-3xl font-black text-[#35858E]">
              {post.type === "donate" ? (
                <span>ফ্রি / বিনামূল্যে</span>
              ) : (
                <span>৳{post.books.reduce((acc, b) => acc + (b.price ?? 0), 0)}</span>
              )}
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}