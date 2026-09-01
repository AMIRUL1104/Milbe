import Link from "next/link";

interface BooksTabsProps {
  activeType: string;
  category?: string;
  condition?: string;
  search?: string;
}

export default function BooksTabs({
  activeType,
  category,
  condition,
  search,
}: BooksTabsProps) {
  const buildHref = (type: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (condition) params.set("condition", condition);
    if (type) params.set("type", type);
    return `/?${params.toString()}`;
  };

  const tabs = [
    { type: "", label: "All Books" },
    { type: "sell", label: "For Sale" },
    { type: "donate", label: "Donate" },
  ];

  return (
    <div className="flex gap-1 bg-surface p-1 rounded-btn border border-border mb-6 max-w-7xl mx-auto">
      {tabs.map((tab) => {
        const isActive = activeType === tab.type;
        return (
          <Link
            key={tab.type}
            href={buildHref(tab.type)}
            className={`px-4 py-2 rounded-btn text-sm font-medium transition-base focus-visible:outline-2 focus-visible:outline-primary-focus ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
