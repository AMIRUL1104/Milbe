import { PostItem } from "@/interface/post/types";
import { toBengaliNumber } from "@/lib/utils/toBengaliNumber";
import BookCard from "../shared/BookCard";
import LocationDropdown from "./LocationDropdown";
import LoadMoreBooks from "./LoadMoreBooks";
import { MapPin, BookOpen } from "lucide-react";

export type NearbyBooksState =
  | "loaded"
  | "empty"
  | "error"
  | "needs-login"
  | "needs-profile";

interface NearbyBooksProps {
  state: NearbyBooksState;
  books: PostItem[];
  district?: string;
  totalPages?: number;
  total?: number;
}

export default function NearbyBooks({
  state,
  books,
  district,
  totalPages = 1,
  total = 0,
}: NearbyBooksProps) {
  // State: Needs Login
  if (state === "needs-login") {
    return (
      <section className="bg-background py-8 lg:py-12 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10 text-center shadow-sm flex flex-col items-center max-w-lg mx-auto relative overflow-visible">
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-t-2xl" />

            {/* Colorful Location Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/20 to-secondary/15 flex items-center justify-center text-primary mb-4 shadow-xs">
              <MapPin className="w-7 h-7 text-primary stroke-[2.2]" />
            </div>

            <h3 className="sm:text-xl mb-4 font-bold text-text-primary tracking-tight">
              আপনার আশেপাশের বইগুলো খুঁজে পেতে জেলা নির্বাচন করুন।
            </h3>

            <LocationDropdown
              currentLocation={district}
              variant="inline"
              buttonText="এলাকা নির্বাচন করুন"
            />
          </div>
        </div>
      </section>
    );
  }

  // State: Needs Profile Location
  if (state === "needs-profile") {
    return (
      <section className="bg-background py-8 lg:py-12 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10 text-center shadow-sm flex flex-col items-center max-w-lg mx-auto relative overflow-visible">
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary rounded-t-2xl" />

            {/* Colorful Location Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/25 via-primary/15 to-secondary/20 flex items-center justify-center text-primary mb-4 shadow-xs">
              <MapPin className="w-7 h-7 text-primary stroke-[2.2]" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
              আপনার এলাকা সেট করা নেই
            </h3>

            {/* Single Meaningful & Direct Message */}
            <p className="mt-2 text-xs sm:text-sm text-text-secondary mb-6">
              তাৎক্ষণিকভাবে কাছাকাছি বই খুঁজতে জেলা বা এলাকা নির্বাচন করুন।
            </p>

            <LocationDropdown
              currentLocation={district}
              variant="inline"
              buttonText="এলাকা সিলেক্ট করুন"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-background overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        {/* Dynamic Section Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 sm:pb-5 relative z-30 overflow-visible">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-text-primary">
                আপনার কাছাকাছি বই
              </h2>
              {total > 0 && (
                <span className="inline-flex items-center rounded-full bg-primary-light border border-primary/20 px-3 py-0.5 text-[11px] sm:text-xs font-bold text-primary">
                  {toBengaliNumber(total)}টি বই
                </span>
              )}
            </div>

            {/* Direct Status Message */}
            <p className="text-xs sm:text-sm text-text-secondary font-medium">
              {district ? (
                <>
                  <span className="font-semibold text-primary">{district}</span> এলাকায় সহজলভ্য বইগুলো দেখানো হচ্ছে
                </>
              ) : (
                "কাছাকাছি সহজলভ্য বইগুলো দেখতে আপনার এলাকা সিলেক্ট করুন"
              )}
            </p>
          </div>

          {/* Inline Location Search Component */}
          <LocationDropdown currentLocation={district} />
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-xs relative overflow-visible">
            <div className="w-14 h-14 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary mb-4">
              <BookOpen className="w-7 h-7 text-primary stroke-[2]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              {district ? `${district} এলাকায় কোনো বই পাওয়া যায়নি` : "কোনো বই পাওয়া যায়নি"}
            </h3>

            {/* Single Meaningful Empty State Message */}
            <p className="mt-2 text-xs sm:text-sm text-text-secondary mb-6">
              অন্য কোনো জেলা সিলেক্ট করে কাছাকাছি বইগুলো খুঁজে নিন।
            </p>

            <LocationDropdown
              currentLocation={district}
              variant="inline"
              buttonText="অন্য এলাকা নির্বাচন করুন"
            />
          </div>
        )}

        {/* Books Grid */}
        {books.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* Load More Pagination */}
        {totalPages > 1 && (
          <LoadMoreBooks
            district={district}
            initialPage={1}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
}