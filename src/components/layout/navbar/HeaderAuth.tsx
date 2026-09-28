"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface HeaderAuthProps {
  user: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role?: "user" | "admin" | null;
  } | null;
  isLoggedIn: boolean;
  isReady: boolean;
}

const MENU_ITEM_CLASS =
  "flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-background hover:text-primary transition-colors";

function getInitials(name?: string | null, email?: string | null) {
  if (name?.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

export function HeaderAuth({ user, isLoggedIn, isReady }: HeaderAuthProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
          router.refresh();
        },
      },
    });
  };

  // Hydration-safe: server ও client-এর প্রথম render একই
  if (!isReady) {
    return (
      <div
        className="w-10 h-10 rounded-full bg-white/10 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <Link
        href="/auth/signin"
        className="text-sm font-semibold text-text-inverse hover:text-accent px-4 py-2 rounded-btn border border-text-inverse hover:border-accent transition-base focus-visible:outline-2 focus-visible:outline-primary-focus whitespace-nowrap"
      >
        Login
      </Link>
    );
  }

  const close = () => setIsOpen(false);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-text-inverse font-bold border-2 border-border hover:border-primary focus-visible:outline-2 focus-visible:outline-primary-focus transition-base overflow-hidden"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Profile মেনু"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
        ) : (
          <span className="text-lg">{getInitials(user.name, user.email)}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-card bg-surface border border-border shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            href={`/dashboard/${user.role ?? "user"}`}
            onClick={close}
            className={MENU_ITEM_CLASS}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          {user.role === "user" && (
            <>
              <Link
                href="/dashboard/user/posts"
                onClick={close}
                className={MENU_ITEM_CLASS}
              >
                <BookOpen className="w-5 h-5" />
                আমার পোস্ট
              </Link>
              <Link
                href="/dashboard/user/requests"
                onClick={close}
                className={MENU_ITEM_CLASS}
              >
                <MessageSquare className="w-5 h-5" />
                রিকোয়েস্ট
              </Link>
            </>
          )}

          <Link href="/profile" onClick={close} className={MENU_ITEM_CLASS}>
            <Settings className="w-5 h-5" />
            Profile সেটিংস
          </Link>

          <hr className="border-border my-1" />

          <button
            type="button"
            onClick={handleSignout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-danger hover:bg-danger-light transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}