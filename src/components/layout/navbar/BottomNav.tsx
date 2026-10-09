"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthState } from "@/lib/hooks/useAuthState";
import {
  Home,
  HelpCircle,
  Info,
  User as UserIcon,
  Plus,
  FileText,
  GitPullRequest,
  Users,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  isFab?: boolean;
}

export function BottomNav() {
  const pathname = usePathname();
  const { isLoggedIn, isReady, user } = useAuthState();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // রোল এবং লগইন স্টেট অনুযায়ী ঠিক ৫টি আইটেম জেনারেট করার ফানকশন
  const getNavItems = (): NavItem[] => {
    // Admin View (5 items)
    if (isLoggedIn && user?.role === "admin") {
      return [
        { href: "/", label: "Home", icon: <Home className="w-6 h-6" /> },
        { href: "/dashboard/admin/users", label: "Users", icon: <Users className="w-6 h-6" /> },
        {
          href: "/dashboard/admin/posts",
          label: "Posts",
          icon: <BookOpen className="w-7 h-7" />,
          isFab: true,
        },
        { href: "/dashboard/admin/requests", label: "Requests", icon: <GitPullRequest className="w-6 h-6" /> },
        { href: "/dashboard/admin", label: "Dashboard", icon: <LayoutDashboard className="w-6 h-6" /> },
      ];
    }

    // Regular User View (5 items)
    if (isLoggedIn) {
      return [
        { href: "/", label: "হোম", icon: <Home className="w-6 h-6" /> },
        { href: "/dashboard/user/posts", label: "আমার পোস্ট", icon: <FileText className="w-6 h-6" /> },
        {
          href: "/add-post",
          label: "বই যোগ",
          icon: <Plus className="w-7 h-7 stroke-[2.5]" />,
          isFab: true,
        },
        { href: "/dashboard/user/requests", label: "রিকোয়েস্ট", icon: <GitPullRequest className="w-6 h-6" /> },
        { href: "/profile", label: "প্রোফাইল", icon: <UserIcon className="w-6 h-6" /> },
      ];
    }

    // Guest / Not Logged In View (5 items)
    return [
      { href: "/", label: "হোম", icon: <Home className="w-6 h-6" /> },
      { href: "/how-it-works", label: "কীভাবে?", icon: <HelpCircle className="w-6 h-6" /> },
      {
        href: "/add-post",
        label: "বই যোগ",
        icon: <Plus className="w-7 h-7 stroke-[2.5]" />,
        isFab: true,
      },
      { href: "/about", label: "মিলবে কি?", icon: <Info className="w-6 h-6" /> },
      { href: "/auth/signin", label: "লগইন", icon: <UserIcon className="w-6 h-6" /> },
    ];
  };

  const navItems = isReady ? getNavItems() : [];
  const fabItem = navItems.find((item) => item.isFab);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50" aria-label="Bottom navigation">
      <div className="relative mx-auto max-w-screen-xl bg-primary border-t border-white/10 shadow-lg rounded-t-[24px]">

        {/* Center Floating FAB Button */}
        {fabItem && (
          <Link
            href={fabItem.href}
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-primary shadow-lg hover:bg-accent-hover hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary-focus transition-all duration-200"
            aria-label={fabItem.label}
          >
            {fabItem.icon}
          </Link>
        )}

        {/* 5-Column Grid */}
        <div className="grid grid-cols-5 items-center h-16 px-2 relative">
          {!isReady ? (
            // Skeleton Loader (5 Columns)
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center justify-center gap-1 w-full h-full">
                <span className="w-6 h-6 rounded-full bg-white/10 animate-pulse" />
                <span className="h-3 w-10 rounded bg-white/10 animate-pulse" />
              </div>
            ))
          ) : (
            navItems.map((item, index) => {
              const active = isActive(item.href);

              // 3rd Item (Index 2 - Middle Column): FAB placeholder (খালি স্থান যেন FAB ঠিকমতো বসে)
              if (index === 2) {
                return <div key="fab-slot" className="w-full h-full pointer-events-none" aria-hidden="true" />;
              }

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
            })
          )}
        </div>
      </div>
    </nav>
  );
}