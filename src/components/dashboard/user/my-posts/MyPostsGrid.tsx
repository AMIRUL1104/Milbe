import type { PostItem } from "@/interface/post/types";
import BookCard from "@/components/shared/BookCard";
import DeleteButton from "./DeleteButton";


interface MyPostsGridProps {
  posts: PostItem[];
  onDeleted: (postId: string) => void;
}

export default function MyPostsGrid({ posts, onDeleted }: MyPostsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {posts.map((post) => (
        <div key={post._id} className="relative group">
          {/* add a edit button link here */}
          {/* <Link 
          href={`/books/add?edit=${post._id}`}
          className="absolute top-3 left-3 z-10 p-2 rounded-xl bg-white/90 backdrop-blur text-cyan-600 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-cyan-500 hover:text-white cursor-pointer"
          >
          <Edit className="w-4 h-4"/>
          </Link> */}

          <DeleteButton
            postId={post._id}
            postTitle={post.title}
            onDeleted={onDeleted}
          />
          {/* Reusing the shared BookCard used on the Browse Books page —
              adjust the prop name below if BookCard expects a different one. */}
          <BookCard book={post} />
        </div>
      ))}
    </div>
  );
}
