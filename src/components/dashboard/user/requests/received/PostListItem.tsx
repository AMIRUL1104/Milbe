import Image from "next/image";
import type { PostSummary } from "@/interface/dashboard/request";

interface PostListItemProps {
  post: PostSummary;
  isActive: boolean;
  onSelect: (postId: string) => void;
}

export function PostListItem({ post, isActive, onSelect }: PostListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(post.id)}
      className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-base ${isActive
          ? "border-primary bg-primary-light shadow-sm"
          : "border-border-light bg-surface hover:border-primary/40 hover:bg-background"
        }`}
    >
      <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-md bg-background">
        <Image
          src={post.bookCoverUrl}
          alt={post.title}
          fill
          sizes="36px"
          className="object-cover"
        />
      </div>

      <span
        className={`line-clamp-2 flex-1 text-sm font-semibold ${isActive ? "text-primary" : "text-text-secondary"
          }`}
      >
        {post.title}
      </span>

      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${post.pendingCount > 0
            ? "bg-accent text-accent-text"
            : "bg-background text-text-muted"
          }`}
      >
        {post.pendingCount}
      </span>
    </button>
  );
}