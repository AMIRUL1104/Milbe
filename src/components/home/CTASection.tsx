import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function CTASection() {
  return (
    <section className="bg-primary py-16 lg:py-20 w-full text-text-inverse text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
          Ready to Share Your Books?
        </h2>
        <p className="text-accent-muted text-base sm:text-lg max-w-xl leading-relaxed">
          {` Help another student by selling or donating your unused academic books. Your small contribution can empower another's education journey.
`}
        </p>
        <Link
          href="/books/add"
          className="inline-flex items-center gap-2 text-sm font-bold text-text-primary bg-accent hover:bg-accent-hover px-6 py-3 rounded-btn transition-base shadow-md mt-2 focus-visible:outline-2 focus-visible:outline-text-inverse"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Post a Book</span>
        </Link>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-white-5 rounded-full blur-2xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-2xl -ml-20 -mb-20" />
    </section>
  );
}