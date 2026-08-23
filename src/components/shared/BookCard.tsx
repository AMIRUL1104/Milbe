import Link from "next/link";
import { MapPin, BookOpen, Tag } from "lucide-react";

import { BookItem } from "@/interface/post related/postDetails";

interface BookCardProps {
  book: BookItem;
}

export default function BookCard({ book }: BookCardProps) {
  const primaryBook = book.books?.[0];
  const totalBooks = book.books?.length || 0;

  const totalPrice = book.books?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;

  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden shadow-xs hover:shadow-md transition-base flex flex-col group">
      <div className="relative aspect-[3/4] w-full bg-background overflow-hidden">
        <img
          src={book.image || "/placeholder-book.jpg"}
          alt={primaryBook?.bookName || "Book Post"}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />
        <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs text-text-inverse uppercase ${
          book.type === "donate" ? "bg-secondary" : "bg-primary"
        }`}>
          {book.type}
        </span>
      </div>

      <div className="p-3.5 flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-primary font-bold uppercase tracking-wider">
          <BookOpen className="w-3 h-3" />
          <span>
            {primaryBook?.publisherName}
            {totalBooks > 1 && ` (+${totalBooks - 1} more)`}
          </span>
        </div>

        <h3 className="font-bold text-text-primary text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
          {primaryBook?.bookName || "No Title Available"}
        </h3>

        <div className="flex flex-col gap-1 text-xs text-text-muted mt-auto">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
            <span className="line-clamp-1">{`${book.area}, ${book.district}`}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-text-muted shrink-0" />
            <span className="truncate">
              Cond: <span className="text-text-secondary font-medium capitalize">{primaryBook?.condition?.replace("_", " ")}</span>
            </span>
          </div>
        </div>

        <div className="border-t border-border pt-2.5 mt-1 flex items-center justify-between gap-2">
          <div className="text-sm sm:text-base font-black text-text-primary">
            {book.type === "donate" ? (
              <span className="text-secondary font-bold">Free</span>
            ) : (
              <span>৳{totalPrice}</span>
            )}
          </div>
          <Link
            href={`/books/${book._id}`}
            className="text-[11px] font-bold text-text-inverse bg-primary hover:bg-primary-hover px-3 py-1.5 rounded-btn transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}