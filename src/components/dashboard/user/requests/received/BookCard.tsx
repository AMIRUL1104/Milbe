import Image from "next/image";

interface BookCardProps {
  post: {
    id: string;
    title: string;
    bookCoverUrl: string;
  };
  totalRequests: number;
  pendingRequests: number;
  onSelect: (postId: string) => void;
}

export function BookCard({
  post,
  totalRequests,
  pendingRequests,
  onSelect,
}: BookCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(post.id)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-light bg-surface p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl active:scale-[0.98]"
    >
      {/* Book Cover Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-background shadow-inner mb-3">
        <Image
          src={post.bookCoverUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Pending Badge on Cover */}
        {pendingRequests > 0 && (
          <div className="absolute top-2.5 right-2.5 flex h-7 min-w-[28px] items-center justify-center rounded-full bg-accent px-2 text-xs font-bold text-accent-text shadow-md backdrop-blur-md animate-pulse">
            {pendingRequests}টি নতুন
          </div>
        )}
      </div>

      {/* Book Title */}
      <h3 className="line-clamp-2 w-full text-base font-semibold leading-snug text-text-primary transition-colors group-hover:text-primary sm:text-lg">
        {post.title}
      </h3>

      {/* Request Count Details */}
      <div className="mt-3 flex items-center justify-between border-t border-border-light/60 pt-3 w-full text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary"></span>
          <span>মোট রিকোয়েস্ট</span>
        </div>
        <span className="font-bold text-text-primary text-sm">
          {totalRequests}
        </span>
      </div>
    </button>
  );
}