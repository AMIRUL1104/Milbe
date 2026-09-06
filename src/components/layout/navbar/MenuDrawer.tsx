"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Info, HelpCircle, FileText, Lock } from "lucide-react";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: "/about", label: "About Milbe", icon: Info },
  { href: "/about", label: "How It Works", icon: HelpCircle },
  { href: "/faq", label: "Help Center", icon: HelpCircle },
  { href: "/terms", label: "Terms & Conditions", icon: FileText },
  { href: "/privacy", label: "Privacy Policy", icon: Lock },
];

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        className="absolute inset-y-0 right-0 w-80 max-w-[85vw] bg-surface border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Milbe Menu"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-primary">Milbe Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-btn text-text-secondary hover:text-primary hover:bg-background transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-btn text-sm font-medium text-text-secondary hover:bg-background hover:text-primary transition-colors mb-1"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border text-xs text-text-muted text-center">
          Milbe Student Book Marketplace
        </div>
      </div>
    </div>
  );
}
