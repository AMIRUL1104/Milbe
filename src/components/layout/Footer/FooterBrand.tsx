import Link from "next/link";

export default function FooterBrand() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Link
        href="/"
        className="inline-block text-2xl font-black tracking-tight text-text-inverse focus-visible:outline-2 focus-visible:outline-primary-focus rounded-md"
        aria-label="Milbe Home"
      >
        Milbe
      </Link>
      <p className="text-accent-muted text-sm leading-relaxed">
        Milbe helps students buy, sell, and donate academic books across Bangladesh through a simple and reliable platform.
      </p>
    </div>
  );
}