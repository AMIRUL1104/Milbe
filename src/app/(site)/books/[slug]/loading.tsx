function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded bg-slate-200 ${className}`}
    />
  );
}

function BackButtonSkeleton() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-xs">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-3.5 w-24" />
      </div>
    </div>
  );
}

function BookHeroSkeleton() {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative w-full md:w-60 h-72 sm:h-80 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 flex items-center justify-center">
          <Skeleton className="absolute inset-0 rounded-none opacity-60" />
          <Skeleton className="relative w-2/3 h-4/5 rounded-md" />
          <div className="absolute top-3 left-3 z-10">
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>

        <div className="flex-1 space-y-4 text-left w-full">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>
            <Skeleton className="h-7 sm:h-8 w-full rounded-md" />
            <Skeleton className="h-7 sm:h-8 w-2/3 rounded-md" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 inline-block w-full sm:w-auto min-w-[200px]">
            <Skeleton className="h-3 w-24 mb-1.5" />
            <Skeleton className="h-8 sm:h-9 w-32" />
          </div>

          <div className="hidden sm:block pt-2 border-t border-slate-100 space-y-2">
            <Skeleton className="h-3 w-28" />
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-11/12" />
              <Skeleton className="h-3.5 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookInformationSkeleton() {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-100 pb-4">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="h-5 w-52 sm:w-60 rounded-md" />
      </div>

      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200">
        <div className="w-full text-left text-sm">
          <div className="flex bg-slate-50 border-b border-slate-200">
            <div className="flex-1 py-3 px-4">
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex-1 py-3 px-4">
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex-1 py-3 px-4">
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-center">
                <div className="flex-1 py-3.5 px-4">
                  <Skeleton className="h-3.5 w-36" />
                </div>
                <div className="flex-1 py-3.5 px-4">
                  <Skeleton className="h-3.5 w-24" />
                </div>
                <div className="flex-1 py-3.5 px-4">
                  <Skeleton className="h-3.5 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block md:hidden space-y-3">
        {[0, 1].map((card) => (
          <div
            key={card}
            className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs"
          >
            <Skeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3.5 w-20" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sm:hidden pt-2 border-t border-slate-100 space-y-2">
        <Skeleton className="h-3 w-28" />
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-11/12" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
      </div>
    </section>
  );
}

function BookMetaCardSkeleton() {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-5">
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-28 bg-slate-100" />
            <Skeleton className="h-7 w-32" />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        </div>

        <div className="border-t border-b border-slate-100 py-3 flex justify-between w-full">
          <Skeleton className="h-3 w-20 bg-slate-100" />
          <Skeleton className="h-3 w-20 bg-slate-100" />
        </div>
      </div>

      <div className="w-full pt-1">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </section>
  );
}

function SellerCardSkeleton() {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-2">
        <Skeleton className="h-3 w-24 bg-slate-100" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-24 bg-slate-100" />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-3">
        <div className="flex items-start gap-2">
          <Skeleton className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-12 bg-slate-100" />
            <Skeleton className="h-3.5 w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BookDetailsLoading() {
  return (
    <div
      className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10 text-slate-800"
      role="status"
      aria-label="বইয়ের বিবরণ লোড হচ্ছে"
      aria-busy="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <BackButtonSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <BookHeroSkeleton />
            <BookInformationSkeleton />
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
            <BookMetaCardSkeleton />
            <SellerCardSkeleton />
          </aside>
        </div>
      </div>
      <span className="sr-only">লোড হচ্ছে...</span>
    </div>
  );
}
