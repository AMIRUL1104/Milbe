function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded bg-slate-200 ${className}`}
    />
  );
}

function SectionHeading({ titleWidth }: { titleWidth: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <Skeleton className="w-6 h-6 rounded-full shrink-0" />
      <Skeleton className={`h-4 ${titleWidth}`} />
    </div>
  );
}

function Field({ labelWidth = "w-20" }: { labelWidth?: string }) {
  return (
    <div>
      <Skeleton className={`h-3.5 ${labelWidth} mb-2`} />
      <Skeleton className="h-10.5 w-full rounded-xl" />
    </div>
  );
}

export default function AddBookLoading() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-label="পোস্ট ফর্ম লোড হচ্ছে"
      aria-busy="true"
    >
      <div className="sticky top-0 z-40 bg-surface border-b border-border-light">
        <div className="max-w-275 mx-auto flex items-center gap-3 px-4 py-3">
          <Skeleton className="w-9 h-9 rounded-btn shrink-0" />
          <Skeleton className="h-4 w-24 flex-1" />
          <Skeleton className="h-8 w-36 sm:w-44 rounded-full shrink-0" />
        </div>
        <div className="w-full max-w-275 mx-auto flex items-center gap-1 px-1 sm:px-4 py-1 sm:pb-2.5">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className="flex-1 min-w-0 flex justify-center sm:justify-start px-1 sm:px-3 py-1.5"
            >
              <Skeleton className="h-3.5 w-12 sm:w-20" />
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-275 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 px-4 py-5 lg:px-6 lg:py-8 lg:gap-7">
        <div className="flex flex-col gap-4 min-w-0">
          <section className="bg-surface border border-border-light rounded-card p-5">
            <SectionHeading titleWidth="w-20" />

            <div className="mb-3.5">
              <Skeleton className="h-3.5 w-24 mb-1.5" />
              <Skeleton className="h-3 w-52 mb-2" />
              <Skeleton className="h-42.5 w-full rounded-card" />
            </div>

            <div className="mb-3.5">
              <Skeleton className="h-3.5 w-24 mb-1.5" />
              <div className="grid grid-cols-2 gap-2 p-1.25 rounded-xl border border-border-light bg-background">
                <Skeleton className="h-10 rounded-lg" />
                <Skeleton className="h-10 rounded-lg" />
              </div>
            </div>

            <div className="mb-3.5">
              <Skeleton className="h-3.5 w-32 mb-1.5" />
              <Skeleton className="h-10.5 w-full rounded-xl" />
              <Skeleton className="h-3 w-10 ml-auto mt-1" />
            </div>

            <div className="mb-3.5">
              <Skeleton className="h-3.5 w-20 mb-1.5" />
              <Skeleton className="h-10.5 w-full rounded-xl" />
            </div>

            <div className="mt-3.5 mb-3.5">
              <Skeleton className="h-3 w-24 mb-1.5" />
              <Skeleton className="h-10.5 w-full rounded-xl" />
            </div>

            <div>
              <Skeleton className="h-3.5 w-40 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2].map((item) => (
                  <Skeleton key={item} className="h-9 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </section>

          <section className="bg-surface border border-border-light rounded-card p-5">
            <SectionHeading titleWidth="w-36" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="mb-3.5">
                <Field labelWidth="w-12" />
              </div>
              <div className="mb-3.5">
                <Field labelWidth="w-14" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="mb-3.5">
                <Field labelWidth="w-24" />
              </div>
            </div>
            <div className="mt-3.5 mb-3.5 flex items-center gap-2">
              <Skeleton className="h-5 w-9 rounded-full" />
              <Skeleton className="h-3.5 w-44" />
            </div>
            <div className="flex items-start gap-2.5">
              <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-sm" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-full max-w-90" />
                <Skeleton className="h-3 w-3/4 max-w-70" />
              </div>
            </div>
          </section>

          <section className="bg-surface border border-border-light rounded-card p-5">
            <SectionHeading titleWidth="w-16" />
            <Skeleton className="h-3 w-28 mb-1.5" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-3 w-12 ml-auto mt-1" />
          </section>

          <section className="bg-surface border border-border-light rounded-card p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <Skeleton className="w-6 h-6 rounded-full shrink-0" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-10 ml-auto" />
            </div>
            <Skeleton className="h-3 w-full max-w-110 mb-3" />
            <Skeleton className="h-11 w-full rounded-card" />
          </section>

          <div className="lg:hidden">
            <Skeleton className="h-11 w-full sm:w-52 rounded-btn" />
          </div>
        </div>

        <aside className="hidden lg:flex flex-col gap-3.5 sticky top-24 self-start">
          <div className="bg-surface border border-border-light rounded-card overflow-hidden">
            <Skeleton className="h-37.5 w-full rounded-none" />
            <div className="p-4">
              <Skeleton className="h-5 w-16 rounded-full mb-2.5" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2 mb-3.5" />
              <div className="flex gap-4 border-t border-border-light pt-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="space-y-1.5">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-accent-light border border-border-light rounded-card p-4 space-y-3">
            <Skeleton className="h-4 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-11/12" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>

          <Skeleton className="h-11 w-full rounded-btn" />
        </aside>
      </main>
      <span className="sr-only">লোড হচ্ছে...</span>
    </div>
  );
}
