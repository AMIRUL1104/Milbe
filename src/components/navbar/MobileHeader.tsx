"use client";

import Link from "next/link";
import { getUserSession } from "@/services/core/session";
import { MobileHeaderAuth } from "./MobileHeaderAuth";
import { MobileHeaderSearch } from "./MobileHeaderSearch";

interface MobileHeaderProps {
  user: Awaited<ReturnType<typeof getUserSession>>;
}

export default function MobileHeader({ user }: MobileHeaderProps) {
  const isLoggedIn = !!user;

  return (
    <header className="md:hidden sticky top-0 z-60 w-full bg-primary border-b border-white-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-primary-focus rounded-md transition-base"
            aria-label="milbe Home"
          >
            <span className="text-xl font-black tracking-tight text-text-inverse">
              milbe
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-text-inverse hover:text-accent focus-visible:outline-2 focus-visible:outline-primary-focus rounded-md transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <MobileHeaderAuth user={user} isLoggedIn={isLoggedIn} />
          </div>
        </div>

        <MobileHeaderSearch />
      </div>
    </header>
  );
}