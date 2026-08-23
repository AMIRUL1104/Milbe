import type { PostSummary } from "@/interface/dashboard/request";
import { PostListItem } from "./PostListItem";

interface PostListPanelProps {
  posts: PostSummary[];
  activePostId: string | null;
  onSelectPost: (postId: string) => void;
}

export function PostListPanel({
  posts,
  activePostId,
  onSelectPost,
}: PostListPanelProps) {
  return (
    <div className="rounded-card border border-border-light bg-surface p-4 shadow-sm">
      <h3 className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-text-muted">
        Your Posts
      </h3>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            isActive={post.id === activePostId}
            onSelect={onSelectPost}
          />
        ))}
      </div>
    </div>
  );
}