import Link from "next/link";

interface LinkItem {
  label: string;
  href: string;
}

interface FooterLinksProps {
  title: string;
  links: LinkItem[];
}

export default function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-text-inverse font-semibold text-lg tracking-wide">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.href}
              className="text-accent-muted text-sm hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-primary-focus rounded transition-base"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}