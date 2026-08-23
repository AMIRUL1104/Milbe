"use client";

import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-text-inverse hover:text-accent focus-visible:outline-2 focus-visible:outline-primary-focus rounded-md md:hidden block transition-colors"
      aria-label={isOpen ? "Close main menu" : "Open main menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
}