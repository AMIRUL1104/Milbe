import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

import type { PostItem } from "@/interface/post/types";
import BookCard from "@/components/shared/BookCard";
import DeleteButton from "./DeleteButton";

interface MyPostsGridProps {
  posts: PostItem[];
  onDeleted: (postId: string) => void;
}

export default function MyPostsGrid({ posts, onDeleted }: MyPostsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {posts.map((post) => (
        <div
          key={post._id}
          className="group relative flex flex-col justify-between h-full rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:shadow-md hover:border-border-hover overflow-hidden"
        >
          {/* Main Content Area */}
          <div className="flex-1">
            <BookCard book={post} />
          </div>

          {/* Action Footer Group with top padding/gap from content */}
          <div className="flex items-center gap-2.5 p-3 pt-3 mt-1.5 bg-surface">
            {/* Edit Button */}
            <Link
              href={`/add-post?edit=${post._id}`}
              aria-label={`${post.title} — এডিট করুন`}
              className="flex flex-1 items-center justify-center gap-1.5 h-9 rounded-xl border border-primary bg-primary text-text-inverse text-xs font-medium transition-all duration-200 md:bg-background md:text-text-secondary md:border-border md:hover:bg-primary md:hover:text-text-inverse md:hover:border-primary active:scale-[0.97] cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>এডিট</span>
            </Link>

            {/* Delete Button */}
            <DeleteButton
              postId={post._id}
              postTitle={post.title}
              onDeleted={onDeleted}
              trigger={
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>ডিলিট</span>
                </>
              }
              triggerClassName="flex flex-1 items-center justify-center gap-1.5 h-9 rounded-xl border border-danger bg-danger text-text-inverse text-xs font-medium transition-all duration-200 md:bg-danger/5 md:text-danger md:border-danger/20 md:hover:bg-danger md:hover:text-text-inverse md:hover:border-danger active:scale-[0.97] cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}