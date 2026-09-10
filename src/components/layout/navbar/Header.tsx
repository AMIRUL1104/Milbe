"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { HeaderAuth } from "./HeaderAuth";
import { HeaderSearch } from "./HeaderSearch";
import { MenuDrawer } from "./MenuDrawer";
import { Search, Menu } from "lucide-react";

function HeaderSearchFallback() {
  return (
    <div className="h-10 w-full bg-surface/50 rounded-btn animate-pulse" />
  );
}

export default function Header() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (<>
    <header className="fixed top-0 left-0 right-0 z-60 w-full bg-primary border-b border-white-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {!isSearchOpen && (
          <Link
            href="/"
            className="flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-primary-focus rounded-md transition-base shrink-0"
            aria-label="milbe Home"
          >
            <span className="text-2xl font-black tracking-tight text-text-inverse">
              মিলবে
            </span>
          </Link>
        )}

        {isSearchOpen ? (
          <div className="flex items-center gap-2 flex-1">
            <Suspense fallback={<HeaderSearchFallback />}>
              <HeaderSearch mode="search" />
            </Suspense>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-btn text-text-inverse hover:bg-white/10 transition-base focus-visible:outline-2 focus-visible:outline-primary-focus shrink-0"
              aria-label="Close search"
            >
              <span className="text-lg font-bold">✕</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1 justify-end">
            <div className="hidden sm:block flex-1 max-w-xl">
              <Suspense fallback={<HeaderSearchFallback />}>
                <HeaderSearch mode="default" />
              </Suspense>
            </div>
            <div className="sm:hidden flex-1">
              <Suspense fallback={<HeaderSearchFallback />}>
                <HeaderSearch mode="default" />
              </Suspense>
            </div>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-btn text-text-inverse hover:bg-white/10 transition-base focus-visible:outline-2 focus-visible:outline-primary-focus shrink-0"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-btn text-text-inverse hover:bg-white/10 transition-base focus-visible:outline-2 focus-visible:outline-primary-focus shrink-0 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/add-post"
            className="px-5 py-2.5 text-sm font-semibold text-primary bg-accent hover:bg-accent-hover rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus whitespace-nowrap"
          >
            Sell/Donate
          </Link>

          <HeaderAuth user={session?.user ?? null} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>

    <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
  </>
  );
}
