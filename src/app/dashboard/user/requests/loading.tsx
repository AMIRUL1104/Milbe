"use client";

function PageHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-gray-100 rounded-md mb-2" />
      <div className="h-4 w-96 bg-gray-100 rounded-md" />
    </div>
  );
}

function TabsSkeleton() {
  return (
    <div className="bg-surface rounded-card border border-border-light shadow-sm p-4 space-y-3 animate-pulse">
      <div className="flex gap-3">
        <div className="h-10 flex-1 bg-gray-100 rounded-input" />
        <div className="h-10 w-36 bg-gray-100 rounded-input" />
        <div className="h-10 w-36 bg-gray-100 rounded-input" />
      </div>
      <div className="h-3 w-40 bg-gray-100 rounded" />
    </div>
  );
}

export default function RequestsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSkeleton />
      <TabsSkeleton />
    </div>
  );
}
