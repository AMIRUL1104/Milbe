"use client";

import Image from "next/image";
import type { PostSummary } from "@/interface/dashboard/request";

interface PostSelectorMobileProps {
  posts: PostSummary[];
  activePostId: string | null;
  onSelectPost: (postId: string) => void;
}

export function PostSelectorMobile({
  posts,
  activePostId,
  onSelectPost,
}: PostSelectorMobileProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:px-0">
      {posts.map((post) => {
        const isActive = post.id === activePostId;
        return (
          <button
            key={post.id}
            type="button"
            onClick={() => onSelectPost(post.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 transition-all ${
              isActive
                ? "border-primary bg-primary text-text-inverse shadow-sm"
                : "border-border-light bg-surface text-text-secondary hover:border-primary/30"
            }`}
          >
            <div className="relative h-5 w-4 shrink-0 overflow-hidden rounded-xs">
              <Image
                src={post.bookCoverUrl}
                alt={post.title}
                fill
                sizes="16px"
                className="object-cover"
              />
            </div>
            <span className="max-w-[120px] truncate text-xs font-semibold">
              {post.title}
            </span>
            {post.pendingCount > 0 && (
              <span
                className={`flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-extrabold ${
                  isActive
                    ? "bg-white/25 text-text-inverse"
                    : "bg-accent text-accent-text"
                }`}
              >
                {post.pendingCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}