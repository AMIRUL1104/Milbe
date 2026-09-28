"use client";

import { Suspense, useCallback, useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useAuthState } from "@/lib/hooks/useAuthState";
import { HeaderAuth } from "./HeaderAuth";
import { HeaderSearch } from "./HeaderSearch";
import { HelpDropdown } from "./HelpDropdown";
import { MenuDrawer } from "./MenuDrawer";

export type HeaderVariant = "home" | "default";

interface HeaderProps {
  variant?: HeaderVariant;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const ICON_BUTTON_CLASS =
  "p-2 rounded-btn text-text-inverse hover:bg-white/10 transition-base focus-visible:outline-2 focus-visible:outline-primary-focus shrink-0";

function HeaderSearchFallback() {
  return <div className="h-10 w-full bg-surface/50 rounded-btn animate-pulse" />;
}

export default function Header({ variant = "default" }: HeaderProps) {
  const { user, isLoggedIn, isReady } = useAuthState();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const showSearch = variant === "home";
  const isMobileSearchOpen = showSearch && isSearchOpen;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-60 w-full bg-primary border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-6">
          {/* LEFT: Logo + desktop nav */}
          <div className="flex items-center gap-6 shrink-0">
            {!isMobileSearchOpen && (
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

            <nav className="hidden lg:flex items-center gap-4 text-xs xl:text-sm font-medium text-text-inverse/90">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-text-inverse transition-colors whitespace-nowrap py-1 px-2 rounded-md hover:bg-white/10"
                >
                  {label}
                </Link>
              ))}
              <HelpDropdown />
            </nav>
          </div>

          {/* CENTER: Search + Location (শুধু home variant) */}
          {showSearch &&
            (isSearchOpen ? (
              <div className="flex items-center gap-2 flex-1 md:hidden">
                <Suspense fallback={<HeaderSearchFallback />}>
                  <HeaderSearch mode="search" />
                </Suspense>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className={ICON_BUTTON_CLASS}
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-1 justify-end md:justify-center">
                <div className="hidden md:block flex-1 max-w-lg lg:max-w-xl">
                  <Suspense fallback={<HeaderSearchFallback />}>
                    <HeaderSearch mode="desktop" />
                  </Suspense>
                </div>

                <div className="md:hidden flex-1">
                  <Suspense fallback={<HeaderSearchFallback />}>
                    <HeaderSearch mode="default" />
                  </Suspense>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className={`md:hidden ${ICON_BUTTON_CLASS}`}
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            ))}

          {/* RIGHT: Actions + Menu */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <Link
                href="/add-post"
                className="px-4 lg:px-5 py-2 text-xs lg:text-sm font-semibold text-primary bg-accent hover:bg-accent-hover rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus whitespace-nowrap"
              >
                Sell/Donate
              </Link>
              <HeaderAuth user={user} isLoggedIn={isLoggedIn} isReady={isReady} />
            </div>

            {!isMobileSearchOpen && (
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className={`lg:hidden ${ICON_BUTTON_CLASS}`}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}