function PageHeaderSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-8 w-40 rounded-md bg-gray-100" />
      <div className="h-4 w-72 max-w-full rounded-md bg-gray-100" />
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-card border border-border-light bg-surface p-5 shadow-sm animate-pulse">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-gray-100" />
        <div className="h-6 w-14 rounded-full bg-gray-100" />
      </div>
      <div className="h-7 w-16 rounded-md bg-gray-100" />
      <div className="mt-2 h-4 w-3/4 rounded-md bg-gray-100" />
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="rounded-card border border-border-light bg-surface shadow-sm animate-pulse">
      <div className="border-b border-border-light px-5 py-4">
        <div className="h-5 w-32 rounded-md bg-gray-100" />
      </div>
      <ul className="divide-y divide-border-light">
        {Array.from({ length: 4 }).map((_, index) => (
          <li className="flex items-start gap-3 px-5 py-4" key={index}>
            <div className="h-9 w-9 shrink-0 rounded-xl bg-gray-100" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded-md bg-gray-100" />
              <div className="h-3 w-2/3 rounded-md bg-gray-100" />
            </div>
            <div className="h-3 w-16 shrink-0 rounded-md bg-gray-100" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickActionsSkeleton() {
  return (
    <div className="rounded-card border border-border-light bg-surface p-5 shadow-sm animate-pulse">
      <div className="mb-4 h-5 w-24 rounded-md bg-gray-100" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="flex items-center gap-3 rounded-xl border border-border-light p-3.5"
            key={index}
          >
            <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-100" />
            <div className="h-4 min-w-0 flex-1 rounded-md bg-gray-100" />
            <div className="h-4 w-4 shrink-0 rounded-md bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <section
      className="space-y-6"
      aria-busy="true"
      aria-label="Loading admin dashboard"
      role="status"
    >
      <PageHeaderSkeleton />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivitySkeleton />
        </div>
        <QuickActionsSkeleton />
      </div>
      <span className="sr-only">Loading admin dashboard information...</span>
    </section>
  );
}
