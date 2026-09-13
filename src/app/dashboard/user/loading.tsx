function PageHeadingSkeleton() {
    return (
        <div className="space-y-2 animate-pulse" aria-hidden="true">
            <div className="h-8 w-40 rounded-md bg-gray-100" />
            <div className="mt-1 h-4 w-72 max-w-full rounded-md bg-gray-100" />
        </div>
    );
}

function StatCardSkeleton() {
    return (
        <div className="rounded-card border border-border-light bg-surface p-5 shadow-sm animate-pulse">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light" />
                <div className="h-6 w-14 rounded-full bg-gray-100" />
            </div>
            <div className="h-7 w-12 rounded-md bg-gray-100" />
            <div className="mt-1 h-4 w-28 rounded-md bg-gray-100" />
        </div>
    );
}

function StatsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 animate-pulse sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, index) => (
                <StatCardSkeleton key={index} />
            ))}
        </div>
    );
}

function RecentActivitySkeleton() {
    return (
        <div className="rounded-card border border-border-light bg-surface shadow-sm animate-pulse" aria-hidden="true">
            <div className="border-b border-border-light px-5 py-4">
                <div className="h-5 w-32 rounded-md bg-gray-100" />
            </div>

            <ul className="divide-y divide-border-light">
                {Array.from({ length: 5 }).map((_, index) => (
                    <li className="flex items-start gap-3 px-5 py-4" key={index}>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warning-light" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="h-4 w-3/4 rounded-md bg-gray-100" />
                            <div className="h-3 w-full max-w-md rounded-md bg-gray-100" />
                        </div>
                        <div className="hidden h-3 w-16 shrink-0 rounded-md bg-gray-100 sm:block" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function QuickActionsSkeleton() {
    return (
        <div className="rounded-card border border-border-light bg-surface p-5 shadow-sm animate-pulse" aria-hidden="true">
            <div className="mb-4 h-5 w-24 rounded-md bg-gray-100" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div className="flex items-center gap-3 rounded-xl border border-border-light p-3.5" key={index}>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light" />
                        <div className="h-4 w-full max-w-[7rem] rounded-md bg-gray-100" />
                        <div className="ml-auto h-4 w-4 rounded-md bg-gray-100" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <div className="space-y-6" aria-busy="true" role="status">
            <PageHeadingSkeleton />
            <StatsGridSkeleton />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <RecentActivitySkeleton />
                </div>
                <QuickActionsSkeleton />
            </div>

            <span className="sr-only">Loading dashboard information...</span>
        </div>
    );
}
