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
            title="আপনার কাছাকাছি বই"
            subtitle="সাইন ইন করুন আপনার কাছাকাছি বই দেখতে।"
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-primary-light rounded-full">
                <LogIn className="w-6 h-6 text-primary" />
              </div>
              <p className="text-text-muted">
                আপনার কাছাকাছি বই দেখতে সাইন ইন করতে হবে।
              </p>
              <p className="text-sm text-text-muted">
                অথবা সার্চ বার থেকে এলাকা নির্বাচন করে বই দেখুন।
              </p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-text-inverse bg-primary hover:bg-primary-hover rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus"
              >
                সাইন ইন
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
            title="আপনার কাছাকাছি বই"
            subtitle="প্রোফাইল আপডেট করুন আপনার এলাকার বই দেখতে।"
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-primary-light rounded-full">
                <User className="w-6 h-6 text-primary" />
              </div>
              <p className="text-text-muted">
                আপনার এলাকার বই দেখতে প্রোফাইল আপডেট করতে হবে।
              </p>
              <p className="text-sm text-text-muted">
                অথবা সার্চ বার থেকে এলাকা নির্বাচন করে বই দেখুন।
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-text-inverse bg-primary hover:bg-primary-hover rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus"
              >
                প্রোফাইল আপডেট
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
            title="আপনার কাছাকাছি বই"
            subtitle={
              district
                ? `${district} এলাকার বই দেখানো হচ্ছে`
                : undefined
            }
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <p className="text-text-muted">আপনার এলাকায় কোনো বই পাওয়া যায়নি</p>
            <p className="text-sm text-text-muted mt-1">
              ভিন্ন এলাকা বেছে নিন বা পরে আবার দেখুন
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
          title="আপনার কাছাকাছি বই"
          subtitle={
            district ? `${district} এলাকার বই দেখানো হচ্ছে` : undefined
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
