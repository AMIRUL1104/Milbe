import { useMemo } from "react";
import type { PostSummary, ReceivedRequest } from "@/interface/dashboard/request";
import { BookCard } from "./BookCard";

interface BookCardViewProps {
  posts: PostSummary[];
  requests: ReceivedRequest[];
  onPostSelect: (postId: string) => void;
}

export function BookCardView({
  posts,
  requests,
  onPostSelect,
}: BookCardViewProps) {
  const requestsPerPost = useMemo(() => {
    const counts = new Map<string, number>();
    requests.forEach((request) => {
      const current = counts.get(request.postId) ?? 0;
      counts.set(request.postId, current + 1);
    });
    return counts;
  }, [requests]);

  const totalRequestsCount = requests.length;
  const pendingRequestsCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Summary Cards Header */}
      <div className="grid grid-cols-2 gap-3.5 rounded-2xl border border-border-light bg-surface/80 p-4 shadow-xs backdrop-blur-md sm:p-5">
        <div className="flex flex-col justify-between rounded-xl bg-background p-3.5 shadow-2xs sm:p-4 border border-border-light/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted sm:text-sm">
            মোট প্রাপ্ত রিকোয়েস্ট
          </p>
          <p className="mt-2 text-2xl font-extrabold text-text-primary sm:text-3xl">
            {totalRequestsCount}
          </p>
        </div>
        <div className="flex flex-col justify-between rounded-xl bg-accent-light/60 p-3.5 shadow-2xs sm:p-4 border border-accent/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-text sm:text-sm">
            অপেক্ষমাণ রিকোয়েস্ট
          </p>
          <p className="mt-2 text-2xl font-extrabold text-accent-text sm:text-3xl">
            {pendingRequestsCount}
          </p>
        </div>
      </div>

      {/* Book Cards Grid - Mobile optimized 2 columns */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {posts.map((post) => (
          <BookCard
            key={post.id}
            post={post}
            totalRequests={requestsPerPost.get(post.id) ?? 0}
            pendingRequests={post.pendingCount}
            onSelect={onPostSelect}
          />
        ))}
      </div>
    </div>
  );
}