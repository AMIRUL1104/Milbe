import React from "react";

export default function AboutUsLoading() {
  return (
    <div className="bg-background text-text-primary min-h-screen animate-pulse">
      
      {/* 1. Hero Section Skeleton */}
      <section className="relative overflow-hidden pt-12 pb-16 md:py-24 border-b border-border-light bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Content Skeleton */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Skeleton */}
              <div className="h-7 w-64 bg-slate-200 rounded-full" />

              {/* Title Skeleton */}
              <div className="h-10 sm:h-12 bg-slate-200 rounded-xl w-3/4 max-w-md" />

              {/* Description Skeletons */}
              <div className="space-y-4">
                <div className="h-5 bg-slate-200 rounded-md w-full" />
                <div className="h-5 bg-slate-200 rounded-md w-11/12" />
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 h-20 w-full" />
                <div className="h-4 bg-slate-200 rounded-md w-4/5" />
              </div>

              {/* Buttons Skeleton */}
              <div className="pt-2 flex flex-wrap gap-4">
                <div className="h-12 w-32 bg-slate-200 rounded-xl" />
                <div className="h-12 w-36 bg-slate-200 rounded-xl" />
              </div>
            </div>

            {/* Visual Card Skeleton */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-slate-100 p-8 rounded-3xl border border-slate-200 h-80 flex flex-col justify-between items-center">
                <div className="w-20 h-20 bg-slate-200 rounded-2xl" />
                <div className="space-y-2 w-full flex flex-col items-center">
                  <div className="h-6 bg-slate-200 rounded-md w-1/2" />
                  <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                </div>
                <div className="w-full grid grid-cols-2 gap-3 pt-2">
                  <div className="h-12 bg-slate-200 rounded-xl" />
                  <div className="h-12 bg-slate-200 rounded-xl" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Mission & Vision Skeleton */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 h-64">
            <div className="w-12 h-12 rounded-xl bg-slate-200" />
            <div className="h-7 bg-slate-200 rounded-md w-1/3" />
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-slate-100 rounded-md w-full" />
              <div className="h-4 bg-slate-100 rounded-md w-5/6" />
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 h-64">
            <div className="w-12 h-12 rounded-xl bg-slate-200" />
            <div className="h-7 bg-slate-200 rounded-md w-1/3" />
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-slate-100 rounded-md w-full" />
              <div className="h-4 bg-slate-100 rounded-md w-4/5" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. How Milbe Works Skeleton */}
      <section className="bg-white py-12 sm:py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="h-8 bg-slate-200 rounded-lg w-1/2 mx-auto" />
            <div className="h-4 bg-slate-200 rounded-md w-1/3 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-52 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-200" />
                  <div className="h-6 w-8 bg-slate-200 rounded" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-4 bg-slate-100 rounded-md w-full" />
                  <div className="h-4 bg-slate-100 rounded-md w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Use Milbe Skeleton */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-8 bg-slate-200 rounded-lg w-1/2 mx-auto" />
          <div className="h-4 bg-slate-200 rounded-md w-1/3 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
              <div className="space-y-2 w-full">
                <div className="h-5 bg-slate-200 rounded-md w-1/2" />
                <div className="h-4 bg-slate-100 rounded-md w-full" />
                <div className="h-4 bg-slate-100 rounded-md w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Platform Statistics Skeleton */}
      <section className="bg-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="h-4 w-36 bg-slate-300 rounded mx-auto" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2 text-center flex flex-col items-center">
                <div className="h-8 w-24 bg-slate-300 rounded" />
                <div className="h-4 w-20 bg-slate-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Core Values Skeleton */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-8 bg-slate-200 rounded-lg w-1/2 mx-auto" />
          <div className="h-4 bg-slate-200 rounded-md w-1/3 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-200" />
              <div className="h-5 bg-slate-200 rounded-md w-1/2" />
              <div className="h-4 bg-slate-100 rounded-md w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action (CTA) Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="bg-slate-200 rounded-3xl p-8 sm:p-12 md:p-16 text-center space-y-6 h-80 flex flex-col justify-center items-center">
          <div className="h-8 bg-slate-300 rounded-lg w-3/4 max-w-xl" />
          <div className="h-4 bg-slate-300 rounded-md w-2/3 max-w-md" />
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-slate-300 rounded-xl" />
            <div className="h-12 w-36 bg-slate-300 rounded-xl" />
          </div>
        </div>
      </section>

    </div>
  );
}