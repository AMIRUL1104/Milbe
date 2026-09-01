import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function FooterContact() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-text-inverse font-semibold text-lg tracking-wide">
        Contact
      </h3>

      <ul className="flex flex-col gap-3 text-accent-muted text-sm">
        <li className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-accent shrink-0" />
          <span>Bangladesh</span>
        </li>
        <li className="flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-accent shrink-0" />
          <a
            href="mailto:info@milbe.shop"
            className="hover:text-accent transition-base focus-visible:outline-2 focus-visible:outline-primary-focus rounded"
          >
            info@milbe.shop
          </a>
        </li>
      </ul>

      <div className="flex items-center gap-3 mt-2">

        <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white-5 hover:bg-white-10 text-accent-muted hover:text-accent transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
          aria-label="Milbe Facebook"
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </Link>

        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white-5 hover:bg-white-10 text-accent-muted hover:text-accent transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
          aria-label="Milbe LinkedIn"
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </Link>

      </div>
    </div>
  );
}