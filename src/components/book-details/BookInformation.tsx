import { MapPin, Calendar, BookOpen, Layers } from "lucide-react";
import { PostDetailData } from "@/app/books/[id]/page";

interface BookInfoProps {
  post: PostDetailData;
}

export default function BookInformation({ post }: BookInfoProps) {
  const formatCondition = (cond: string) => cond.replace("_", " ").toUpperCase();

  return (
    <div className="bg-surface border border-border rounded-card p-5 sm:p-6 shadow-xs flex flex-col gap-5">

      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-2.5 py-1 rounded-md flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Bundle ({post.books.length} Books)</span>
        </span>
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-text-inverse ${
          post.type === "donate" ? "bg-secondary" : "bg-primary"
        }`}>
          For {post.type}
        </span>
      </div>

      <h1 className="text-2xl font-black text-text-primary tracking-tight">
        {post.title || "Academic Books "}
      </h1>

      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-text-muted border-b border-border pb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-text-muted" />
          <span>{post.area}, {post.district}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-text-muted" />
          <span>Posted on {new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-bold text-text-primary text-sm uppercase tracking-wider text-text-muted">Note from Seller</h3>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{post.description}</p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <h3 className="font-bold text-text-primary text-sm uppercase tracking-wider text-text-muted flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Included Books List</span>
        </h3>

        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background text-xs font-bold text-text-muted uppercase border-b border-border">
                <th className="p-3">Book Name</th>
                <th className="p-3">Publisher</th>
                <th className="p-3">Condition</th>
                <th className="p-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs sm:text-sm text-text-secondary">
              {post.books.map((book, i) => (
                <tr key={i} className="hover:bg-background/50 transition-colors">
                  <td className="p-3 font-bold text-text-primary">{book.bookName}</td>
                  <td className="p-3 text-text-muted">{book.publisherName}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-background text-text-secondary">
                      {formatCondition(book.condition)}
                    </span>
                  </td>
                  <td className="p-3 text-right font-black text-text-primary">
                    {post.type === "donate" ? "Free" : `৳${book.price}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}