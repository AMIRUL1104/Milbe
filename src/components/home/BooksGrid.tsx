import { BookItem } from "@/interface/post related/postDetails";
import BookCard from "@/components/shared/BookCard";
import SectionHeading from "../shared/SectionHeading";

interface BooksGridProps {
  books: BookItem[];
}

export default function BooksGrid({ books }: BooksGridProps) {
  if (!books || books.length === 0) {
    return (
      <div className="text-center text-text-muted py-16 bg-background rounded-card border border-dashed border-border">
        আপনার সার্চের সাথে মিলে যাওয়া কোনো বই পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <>

      <SectionHeading
        title="সব বই"
        subtitle=""
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">

        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </>
  )
    ;
}
