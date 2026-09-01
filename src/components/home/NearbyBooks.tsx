import { BookItem } from "@/interface/post related/postDetails";
import SectionHeading from "../shared/SectionHeading";
import BookCard from "../shared/BookCard";
import Link from "next/link";
import { User, LogIn } from "lucide-react";

export type NearbyBooksState =
  | "loaded"
  | "empty"
  | "needs-login"
  | "needs-profile";

interface NearbyBooksProps {
  state: NearbyBooksState;
  books: BookItem[];
  district?: string;
}

export default function NearbyBooks({ state, books, district }: NearbyBooksProps) {
  if (state === "needs-login") {
    return (
      <section className="py-8 lg:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="Books Near You"
            subtitle="Sign in to see books available near you."
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-primary-light rounded-full">
                <LogIn className="w-6 h-6 text-primary" />
              </div>
              <p className="text-text-muted">
                You need to be logged in to see personalized book recommendations
                near you.
              </p>
              <p className="text-sm text-text-muted">
                You can also select a district from the search bar above to
                browse books instantly.
              </p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-text-inverse bg-primary hover:bg-primary-hover rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state === "needs-profile") {
    return (
      <section className="py-8 lg:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="Books Near You"
            subtitle="Update your profile to see books in your area."
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-primary-light rounded-full">
                <User className="w-6 h-6 text-primary" />
              </div>
              <p className="text-text-muted">
                You need to set your district in your profile to see books
                available near you.
              </p>
              <p className="text-sm text-text-muted">
                You can also select a district from the search bar above to
                browse books instantly.
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-text-inverse bg-primary hover:bg-primary-hover rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus"
              >
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state === "empty") {
    return (
      <section className="py-8 lg:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="Books Near You"
            subtitle={
              district
                ? `Showing books in ${district} district`
                : undefined
            }
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <p className="text-text-muted">No books found in your area</p>
            <p className="text-sm text-text-muted mt-1">
              Try a different location or check back later
            </p>
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
          subtitle={
            district ? `Showing books in ${district} district` : undefined
          }
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
