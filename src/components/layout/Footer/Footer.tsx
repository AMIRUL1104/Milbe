import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";

export default function Footer() {
  const quickLinks = [
    { label: "হোম", href: "/" },
    { label: "বই দেখুন", href: "/" },
    { label: "বই যোগ করুন", href: "/books/add" },
  ];

  const resourcesLinks = [
    { label: "আমাদের সম্পর্কে", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "গোপনীয়তা নীতি", href: "/privacy" },
    { label: "শর্তাবলী", href: "/terms" },
  ];

  return (
    <footer className="bg-primary border-t border-white-10 w-full font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          <FooterBrand />

          <FooterLinks title="দ্রুত লিংক" links={quickLinks} />

          <FooterLinks title="রিসোর্স" links={resourcesLinks} />

          <FooterContact />

        </div>
      </div>

      <div className="border-t border-white-10 bg-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-accent-muted">
          <p className="text-center sm:text-left">
            &copy; 2026 Milbe. Built for educational purposes.
          </p>
          <p className="text-center sm:text-right font-medium">
            Made with <span className="text-accent">Next.js 16</span> & <span className="text-secondary">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}