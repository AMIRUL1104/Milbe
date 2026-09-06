import React from "react";

export default function AddBookLoading() {
  return (
    <div className="max-w-400 p-60 sm:p-6 space-y-6 bg-taupe-50">

      {/* Page Header (Title & Description Placeholder) */}
      <div className="space-y-2 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-72 bg-slate-100 rounded-md" />
      </div>

      <div className="space-y-6">

        {/* Card 1: Basic Information */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="h-5 w-36 bg-slate-200 rounded-md animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Book Title */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-20 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            {/* Author */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-24 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-28 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            {/* Book Type */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-20 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            {/* Condition */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-24 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Card 2: Cover Image Upload Placeholder */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="h-5 w-40 bg-slate-200 rounded-md animate-pulse" />
          <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center space-y-2 animate-pulse bg-slate-50/50">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="h-4 w-36 bg-slate-200 rounded" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
          </div>
        </div>

        {/* Card 3: Location & Contact Section */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="h-5 w-44 bg-slate-200 rounded-md animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* District */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-16 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            {/* Area */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-14 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
            {/* Phone Number */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-24 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-white rounded-xl border border-slate-100" />
            </div>

            {/* Backup Contact/Messenger */}
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-36 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-white rounded-xl border border-slate-100" />
            </div>
          </div>
        </div>

        {/* Card 4: Detailed Description */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="h-5 w-32 bg-slate-200 rounded-md animate-pulse" />
          <div className="space-y-2 animate-pulse">
            <div className="h-4 w-28 bg-slate-100 rounded" />
            <div className="h-28 w-full bg-slate-100 rounded-xl" />
          </div>
        </div>

        {/* Action Button Skeleton with Primary Color Theme */}
        <div className="w-full pt-2">
          <div
            className="w-full h-12 rounded-xl animate-pulse"
            style={{ backgroundColor: '#35858E', opacity: 0.25 }}
          />
        </div>

      </div>
    </div>
  );
}