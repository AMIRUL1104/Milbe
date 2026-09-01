import Link from "next/link";
import { getUserSession } from "@/services/core/session";
import { HeaderAuth } from "./HeaderAuth";
import { HeaderSearch } from "./HeaderSearch";

export default async function Header() {
  const user = await getUserSession();
  const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-60 w-full bg-primary border-b border-white-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-primary-focus rounded-md transition-base"
          aria-label="milbe Home"
        >
          <span className="text-2xl font-black tracking-tight text-text-inverse">
            milbe
          </span>
        </Link>

        <HeaderSearch />

        <div className="max-md:hidden flex items-center gap-4">
          <Link
            href="/books/add"
            className=" px-5 py-2.5 text-sm font-semibold text-primary bg-accent hover:bg-accent-hover rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus whitespace-nowrap"
          >
            Sell/Donate
          </Link>

          <HeaderAuth user={user} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
}