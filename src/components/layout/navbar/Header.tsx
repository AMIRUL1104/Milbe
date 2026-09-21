"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { HeaderAuth } from "./HeaderAuth";
import { HeaderSearch } from "./HeaderSearch";
import { MenuDrawer } from "./MenuDrawer";
import { Search, Menu, ChevronDown, HelpCircle, FileText, Lock, Info } from "lucide-react";

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
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const helpDropdownRef = useRef<HTMLDivElement>(null);

  // Close Help Dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        helpDropdownRef.current &&
        !helpDropdownRef.current.contains(event.target as Node)
      ) {
        setIsHelpOpen(false);
      }
    };
    if (isHelpOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHelpOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-60 w-full bg-primary border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-6">

          {/* LEFT: Logo & Desktop Primary Navigation Links */}
          <div className="flex items-center gap-6 shrink-0">
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

            {/* Desktop Quick Nav Links */}
            <nav className="hidden lg:flex items-center gap-4 text-xs xl:text-sm font-medium text-text-inverse/90">
              <Link
                href="/how-it-works"
                className="hover:text-text-inverse transition-colors whitespace-nowrap py-1 px-2 rounded-md hover:bg-white/10"
              >
                How It Works
              </Link>
              <Link
                href="/about"
                className="hover:text-text-inverse transition-colors whitespace-nowrap py-1 px-2 rounded-md hover:bg-white/10"
              >
                About Us
              </Link>

              {/* Help & Policies Dropdown for Desktop */}
              <div className="relative" ref={helpDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsHelpOpen((prev) => !prev)}
                  className="flex items-center gap-1 hover:text-text-inverse transition-colors py-1 px-2 rounded-md hover:bg-white/10 focus:outline-none"
                >
                  <span>Help</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isHelpOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isHelpOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-btn shadow-lg py-2 z-50 text-text-primary text-xs sm:text-sm">
                    <Link
                      href="/faq"
                      onClick={() => setIsHelpOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-background transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>Help Center</span>
                    </Link>
                    <Link
                      href="/terms"
                      onClick={() => setIsHelpOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-background transition-colors"
                    >
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <span>Terms & Conditions</span>
                    </Link>
                    <Link
                      href="/privacy"
                      onClick={() => setIsHelpOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-background transition-colors"
                    >
                      <Lock className="w-4 h-4 text-primary shrink-0" />
                      <span>Privacy Policy</span>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* CENTER: Search Bar & Location Component */}
          {isSearchOpen ? (
            /* Mobile Expanded Search View */
            <div className="flex items-center gap-2 flex-1 md:hidden">
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
            /* Desktop Integrated Search & Mobile Minimal Controls */
            <div className="flex items-center gap-2 flex-1 justify-end md:justify-center">
              {/* Desktop / Tablet Search & Location Container */}
              <div className="hidden md:block flex-1 max-w-lg lg:max-w-xl">
                <Suspense fallback={<HeaderSearchFallback />}>
                  <HeaderSearch mode="desktop" />
                </Suspense>
              </div>

              {/* Mobile Default Location Display */}
              <div className="md:hidden flex-1">
                <Suspense fallback={<HeaderSearchFallback />}>
                  <HeaderSearch mode="default" />
                </Suspense>
              </div>

              {/* Mobile Search Toggle Icon */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-btn text-text-inverse hover:bg-white/10 transition-base focus-visible:outline-2 focus-visible:outline-primary-focus shrink-0"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Drawer Toggle */}
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

          {/* RIGHT: User Actions & Post Creation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            <Link
              href="/add-post"
              className="px-4 lg:px-5 py-2 text-xs lg:text-sm font-semibold text-primary bg-accent hover:bg-accent-hover rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus whitespace-nowrap"
            >
              Sell/Donate
            </Link>

            <HeaderAuth user={session?.user ?? null} isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}