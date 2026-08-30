import { BookItem } from "@/interface/post related/postDetails";
import SectionHeading from "../shared/SectionHeading";
import BookCard from "../shared/BookCard";

interface RecentlyListedBooksProps {
  books: BookItem[];
}

export default function RecentlyListedBooks({ books }: RecentlyListedBooksProps) {
  console.log(books)
  if (!books) {
    return (
      <section className="py-8 lg:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="Recently Listed"
            subtitle="Latest academic books posted by students"
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <p className="text-text-muted">No recently listed books</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Recently Listed"
          subtitle="Latest academic books posted by students"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.slice(0, 8).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}