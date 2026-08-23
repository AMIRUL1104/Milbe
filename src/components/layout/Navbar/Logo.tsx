// src/components/layout/navbar/Logo.tsx
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-primary-focus rounded-md transition-base"
      aria-label="BookBridge Home"
    >
      <span className="text-2xl font-black tracking-tight text-text-inverse">
        Book<span className="text-accent">Bridge</span>
      </span>
    </Link>
  );
}