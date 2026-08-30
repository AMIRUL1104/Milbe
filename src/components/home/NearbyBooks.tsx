import { BookItem } from "@/interface/post related/postDetails";
import SectionHeading from "../shared/SectionHeading";
import BookCard from "../shared/BookCard";

interface NearbyBooksProps {
  books: BookItem[];
  userLocation?: string;
}

export default function NearbyBooks({ books, userLocation }: NearbyBooksProps) {
  if (!userLocation) {
    return (
      <section className="py-8 lg:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="Books Near You"
            subtitle="Select a location to discover books available in your area."
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <p className="text-text-muted">No location selected</p>
            <p className="text-sm text-text-muted mt-1">Use the search bar above to set your district</p>
          </div>
        </div>
      </section>
    );
  }

  if (books.length === 0) {
    return (
      <section className="py-8 lg:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="Books Near You"
            subtitle={`Showing books in ${userLocation} district`}
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <p className="text-text-muted">No books found in your area</p>
            <p className="text-sm text-text-muted mt-1">Try a different location or check back later</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Books Near You"
          subtitle={`Showing books in ${userLocation} district`}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}