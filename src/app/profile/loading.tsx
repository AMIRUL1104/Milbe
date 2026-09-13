function PageHeadingSkeleton() {
    return (
        <div className="mb-6 space-y-2 animate-pulse" aria-hidden="true">
            <div className="h-8 w-32 rounded-md bg-gray-100" />
            <div className="h-4 w-72 max-w-full rounded-md bg-gray-100" />
        </div>
    );
}

function ProfileHeaderSkeleton() {
    return (
        <div
            className="relative mb-5 overflow-hidden rounded-card border border-border-light bg-surface shadow-sm animate-pulse"
            aria-hidden="true"
        >
            <div
                className="h-28 w-full"
                style={{
                    background:
                        "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 60%, var(--color-accent) 100%)",
                }}
            />

            <div className="px-4 pb-6 sm:px-6">
                <div className="flex flex-wrap items-end gap-4 -mt-10 sm:-mt-14">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-secondary ring-4 ring-surface shadow-lg sm:h-28 sm:w-28" />

                    <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-5 w-40 max-w-full rounded-md bg-gray-100" />
                        <div className="h-3 w-52 max-w-full rounded-md bg-gray-100" />
                    </div>

                    <div className="flex w-full flex-col items-start gap-1 sm:w-auto sm:ml-auto sm:items-end">
                        <div className="h-6 w-20 rounded-full bg-gray-100" />
                        <div className="h-3 w-28 rounded-md bg-gray-100" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileInfoSkeleton() {
    return (
        <div className="rounded-card border border-border-light bg-surface p-6 shadow-sm animate-pulse" aria-hidden="true">
            <div className="mb-5 h-4 w-32 rounded-md bg-gray-100" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div className="flex items-start gap-3" key={index}>
                        <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-gray-100" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="h-3 w-24 rounded-md bg-gray-100" />
                            <div className="h-4 w-full max-w-xs rounded-md bg-gray-100" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <main
            className="min-h-screen bg-[#F5F7F8] px-4 py-8 sm:px-6 lg:px-8"
            aria-busy="true"
            aria-label="Loading profile"
            role="status"
        >
            <div className="mx-auto max-w-2xl">
                <PageHeadingSkeleton />
                <ProfileHeaderSkeleton />
                <ProfileInfoSkeleton />
                <span className="sr-only">Loading profile information...</span>
            </div>
        </main>
    );
}
