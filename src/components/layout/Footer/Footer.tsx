import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

// ==========================================
// Custom SVG Icons for Social Platforms
// (Lucide React-এ এগুলো না থাকায় Pure SVG ব্যবহার করা হয়েছে)
// ==========================================

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.85 1.19-5.69 3.65-7.1 1.28-.75 2.8-1.12 4.28-1.01v4.03c-.88-.08-1.78.14-2.53.62-.98.61-1.59 1.71-1.57 2.85.01 1.15.63 2.23 1.6 2.83.97.6 2.22.68 3.26.21.98-.43 1.67-1.39 1.77-2.45.12-1.28.05-2.58.07-3.87V.02z" />
    </svg>
  );
}

// ==========================================
// Types & Data Structures
// ==========================================

interface LinkItem {
  label: string;
  href: string;
}

const quickLinks: LinkItem[] = [
  { label: "হোম", href: "/" },
  { label: "বইসমূহ", href: "/books" },
  { label: "কীভাবে কাজ করে", href: "/how-it-works" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
];

const additionalRoutes: LinkItem[] = [
  { label: "যোগাযোগ", href: "/contact" },
  { label: "প্রশ্নোত্তর (FAQ)", href: "/faq" },
  { label: "প্রাইভেসি পলিসি", href: "/privacy" },
  { label: "শর্তাবলী (Terms)", href: "/terms" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
  { label: "TikTok", href: "#", icon: TiktokIcon },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-text-inverse border-t border-white/10 pt-12 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ROW 1: Brand & Subtitle */}
        <div className="flex flex-col items-start gap-2 border-b border-white/10 pb-8">
          <Link href="/" className="text-2xl sm:text-3xl font-extrabold text-text-inverse tracking-tight">
            Milbe<span className="text-accent">.</span>
          </Link>
          <p className="text-sm text-accent-muted max-w-md leading-relaxed">
            বাংলাদেশের শিক্ষার্থীদের জন্য একাডেমিক বই কেনাবেচা ও আদান-প্রদানের নির্ভরযোগ্য প্ল্যাটফর্ম।
          </p>
        </div>

        {/* ROW 2 & ROW 3: Grid Layout for Mobile (2 items per row) & Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">

          {/* Column 1: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-text-inverse font-semibold text-base tracking-wider">
              দ্রুত লিংক
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-accent-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Additional Routes */}
          <div className="flex flex-col gap-3">
            <h3 className="text-text-inverse font-semibold text-base tracking-wider">
              গুরুত্বপূর্ণ পেইজ
            </h3>
            <ul className="flex flex-col gap-2">
              {additionalRoutes.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-accent-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-text-inverse font-semibold text-base tracking-wider">
              সোশ্যাল মিডিয়া
            </h3>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <li key={idx}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent-muted hover:text-accent transition-colors duration-200 group"
                    >
                      <Icon className="w-4 h-4 text-accent transition-colors group-hover:scale-110 duration-200" />
                      <span>{social.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-text-inverse font-semibold text-base tracking-wider">
              যোগাযোগ
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-accent-muted">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>amirulislam9.f@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+880 18461-53741</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>সিলেট, বাংলাদেশ</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Portfolio Link */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-accent-muted text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Milbe. All rights reserved.
          </p>
          <p>
            Developed & Maintained by{" "}
            <a
              href="https://amirul-islam.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:underline underline-offset-4 transition-all"
            >
              Amirul Islam
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}