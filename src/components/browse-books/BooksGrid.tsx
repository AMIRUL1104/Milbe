import BookCard from "@/components/shared/BookCard";
import { BookItem } from "@/interface/post related/postDetails";
import { getPosts } from "@/services/features/posts";

interface BooksGridProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    condition?: string;
    listingType?: "sell" | "donate" | "";
    page?: string;
  }>;
}

export default async function BooksGrid({ searchParams }: BooksGridProps) {
  const resolvedParams = (await searchParams) || {};

  const apiParams = {
    search: resolvedParams.search || "",
    category: resolvedParams.category || "",
    condition: resolvedParams.condition || "",
    listingType: (resolvedParams.listingType || "") as "sell" | "donate" | "",
    page: Number(resolvedParams.page) || 1,
    limit: 8,
  };

  const postData = await getPosts<BookItem>(apiParams);

  console.log(postData);
  if (!postData.success || !postData.data) {
    return (
      <div className="text-center text-danger py-10 font-medium">
        Failed to load books. Please try again later.
      </div>
    );
  }

  const bookItems: BookItem[] = postData.data.books;

  if (!bookItems || bookItems.length === 0) {
    return (
      <div className="text-center text-text-muted py-16 text-lg bg-background rounded-card border border-dashed border-border">
        No books found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {bookItems.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}