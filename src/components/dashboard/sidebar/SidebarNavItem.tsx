import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  FileStack,
  LayoutDashboard,
  Library,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { NavItem } from "@/interface/dashboard/dashboard";

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onNavigate?: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileStack,
  Library,
  User,
  Users,
};

export default function SidebarNavItem({
  item,
  isActive,
  isCollapsed,
  onNavigate,
}: SidebarNavItemProps) {
  const Icon = iconMap[item.icon] ?? LayoutDashboard;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={isCollapsed ? item.label : undefined}
      className={`
        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
        transition-base ease-in-out
        ${
          isActive
            ? "bg-primary text-text-inverse shadow-sm"
            : "text-text-secondary hover:bg-primary-light hover:text-primary"
        }
        ${isCollapsed ? "justify-center" : ""}
      `}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-accent" />
      )}
      <Icon className="w-4.5 h-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
    </Link>
  );
}