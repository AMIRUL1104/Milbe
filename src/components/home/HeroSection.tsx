"use client";

import SearchAndLocation from "./SearchAndLocation";

export default function HeroSection() {
  return (
    <section className="relative bg-background py-6 lg:py-8 overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <span className="inline-flex self-center lg:self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-light text-primary">
              milbe
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight leading-tight">
              {"Bangladesh's Student Book Hub"}
            </h1>
          </div>
          <div className="w-full lg:w-auto lg:max-w-[500px]">
            <SearchAndLocation />
          </div>
        </div>
      </div>
    </section>
  );
}