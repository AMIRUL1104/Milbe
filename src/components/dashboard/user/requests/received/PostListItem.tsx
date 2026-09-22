"use client";

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
      className={`group flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all ${
        isActive
          ? "border-primary bg-primary-light/60 shadow-sm ring-1 ring-primary/20"
          : "border-border-light bg-surface hover:border-primary/40 hover:bg-background"
      }`}
    >
      <div className="relative h-11 w-8 shrink-0 overflow-hidden rounded-md bg-background shadow-2xs">
        <Image
          src={post.bookCoverUrl}
          alt={post.title}
          fill
          sizes="32px"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <span
        className={`line-clamp-2 flex-1 text-xs font-bold transition-colors ${
          isActive ? "text-primary" : "text-text-primary group-hover:text-primary"
        }`}
      >
        {post.title}
      </span>

      <span
        className={`flex h-5.5 min-w-[22px] shrink-0 items-center justify-center rounded-full px-1 text-[11px] font-bold transition-all ${
          post.pendingCount > 0
            ? "bg-accent text-accent-text shadow-2xs"
            : "bg-background text-text-muted"
        }`}
      >
        {post.pendingCount}
      </span>
    </button>
  );
}