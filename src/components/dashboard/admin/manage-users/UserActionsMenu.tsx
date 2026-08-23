"use client";

import { useEffect, useRef, useState } from "react";
import {
  Ban,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import type { UserProfile } from "@/interface/user/userProfile";

interface UserActionsMenuProps {
  user: UserProfile;
}

export function UserActionsMenu({ user }: UserActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-background hover:text-text-secondary"
        aria-label={`Actions for ${user.fullName}`}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-48 rounded-xl border border-border-light bg-surface py-1.5 shadow-lg">
          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-text-secondary transition-colors hover:bg-background"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4 text-text-muted" />
            View Profile
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-text-secondary transition-colors hover:bg-background"
            onClick={() => setIsOpen(false)}
          >
            <ShieldCheck className="h-4 w-4 text-text-muted" />
            Change Role
            <ChevronRight className="ml-auto h-3.5 w-3.5 text-text-muted" />
          </button>

          <div className="my-1.5 border-t border-border-light" />

          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-warning-text transition-colors hover:bg-warning-light"
            onClick={() => setIsOpen(false)}
          >
            <Ban className="h-4 w-4" />
            Suspend User
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-success-text transition-colors hover:bg-success-light"
            onClick={() => setIsOpen(false)}
          >
            <CheckCircle2 className="h-4 w-4" />
            Activate User
          </button>

          <div className="my-1.5 border-t border-border-light" />

          <button
            type="button"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-danger-text transition-colors hover:bg-danger-light"
            onClick={() => setIsOpen(false)}
          >
            <Trash2 className="h-4 w-4" />
            Delete User
          </button>
        </div>
      )}
    </div>
  );
}