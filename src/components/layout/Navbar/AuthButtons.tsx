import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/auth/signin"
        className="text-sm font-semibold text-text-inverse hover:text-accent px-4 py-2 rounded-btn border border-text-inverse hover:border-accent transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
      >
        Login
      </Link>
      <Link
        href="/auth/signup"
        className="text-sm font-semibold text-text-inverse bg-primary hover:bg-primary-hover px-4 py-2 rounded-btn transition-base shadow-sm focus-visible:outline-2 focus-visible:outline-primary-focus"
      >
        Register
      </Link>
    </div>
  );
}