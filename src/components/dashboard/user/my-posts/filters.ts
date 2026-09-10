import type { PostItem } from "@/interface/post/types";
import type { MyPostsFilter, MyPostsSort } from "@/interface/post/responses";

export function filterPosts(
  posts: PostItem[],
  search: string,
  filter: MyPostsFilter,
): PostItem[] {
  const query = search.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.books.some((book) => book.bookName.toLowerCase().includes(query));

    const matchesFilter =
      filter === "all" ||
      post.type === filter ||
      post.status.toLowerCase() === filter;

    return matchesSearch && matchesFilter;
  });
}

export function sortPosts(posts: PostItem[], sort: MyPostsSort): PostItem[] {
  const sorted = [...posts];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
      );
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}
