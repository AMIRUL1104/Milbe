"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation";

interface UserMenuProps {
  role: "user" | "admin" | null;
}
export default function UserMenu({ role }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
          router.refresh();
        },
      },
    });
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-text-inverse font-bold border-2 border-border hover:border-primary focus-visible:outline-2 focus-visible:outline-primary-focus transition-base"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User Profile Menu"
      >
        A
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-card bg-surface border border-border shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            href={`/dashboard/${role}`}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm text-text-secondary hover:bg-background hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm text-text-secondary hover:bg-background hover:text-primary transition-colors"
          >
            Profile
          </Link>
          <hr className="border-border my-1" />
          <button
            onClick={handleSignout}
            className="block w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-danger-light transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}