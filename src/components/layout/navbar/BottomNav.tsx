"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { User } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  isFab?: boolean;
}

const baseNavItems: NavItem[] = [
  {
    href: "/",
    label: "হোম",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/dashboard/user/requests",
    label: "রিকোয়েস্ট",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: "/add-post",
    label: "বই যোগ",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
    isFab: true,
  },
  {
    href: "/dashboard/user/posts",
    label: "আমার বই",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

const getAuthNavItems = (isLoggedIn: boolean): NavItem[] => {
  if (isLoggedIn) {
    return [
      {
        href: "/profile",
        label: "প্রোফাইল",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
    ];
  }

  return [
    {
      href: "/auth/signin",
      label: "লগইন",
      icon: <User className="w-6 h-6" />,
    },
  ];
};

export function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const authNavItems = getAuthNavItems(isLoggedIn);
  const allNavItems = [...baseNavItems, ...authNavItems];
  const fabItem = allNavItems.find((item) => item.isFab);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50" aria-label="Bottom navigation">
      <div className="relative mx-auto max-w-screen-xl bg-primary border-t border-white-10 shadow-lg rounded-t-[24px]">

        {/* FAB Button - Centered absolutely */}
        {fabItem && (
          <Link
            href={fabItem.href}
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-primary shadow-lg hover:bg-accent-hover hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary-focus transition-all duration-200"
            aria-label={fabItem.label}
          >
            {fabItem.icon}
          </Link>
        )}

        {/* 5-Column Grid Layout */}
        <div className="grid grid-cols-5 items-center h-16 px-2 relative">
          {allNavItems.map((item, index) => {
            const active = isActive(item.href);

            // 3rd Column (Index 2): FAB-এর জায়গায় খালি Slot রাখা
            if (index === 2) {
              return (
                <React.Fragment key="fab-placeholder">
                  <div className="w-full h-full pointer-events-none" aria-hidden="true" />

                  {/* আসল Item Render করা (যদি Item-টি FAB না হয়ে থাকে) */}
                  {!item.isFab && (
                    <Link
                      href={item.href}
                      className={`flex flex-col items-center justify-center gap-1 w-full h-full text-xs font-medium transition-colors ${active ? "text-accent" : "text-text-inverse/70 hover:text-text-inverse"
                        }`}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className={active ? "text-accent" : "text-text-inverse/70"}>{item.icon}</span>
                      <span className="truncate max-w-[64px] text-center">{item.label}</span>
                    </Link>
                  )}
                </React.Fragment>
              );
            }

            // FAB Item হলে Grid Column-এ Render না করে Skip করা (কারণ এটি Absolute)
            if (item.isFab) return null;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-full h-full text-xs font-medium transition-colors ${active ? "text-accent" : "text-text-inverse/70 hover:text-text-inverse"
                  }`}
                aria-current={active ? "page" : undefined}
              >
                <span className={active ? "text-accent" : "text-text-inverse/70"}>{item.icon}</span>
                <span className="truncate max-w-[64px] text-center">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}