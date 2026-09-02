import type { NavItem } from "@/interface/dashboard/dashboard";

export const userNavItems: NavItem[] = [
  { label: "ওভারভিউ", href: "/dashboard/user", icon: "LayoutDashboard" },
  { label: "আমার পোস্ট", href: "/dashboard/user/posts", icon: "BookOpen" },
  {
    label: "রিকোয়েস্ট",
    href: "/dashboard/user/requests",
    icon: "ClipboardList",
  },
  { label: "Profile", href: "/profile", icon: "User" },
];

export const adminNavItems: NavItem[] = [
  { label: "ওভারভিউ", href: "/dashboard/admin", icon: "LayoutDashboard" },
  { label: "ইউজার ম্যানেজমেন্ট", href: "/dashboard/admin/users", icon: "Users" },
  { label: "পোস্ট ম্যানেজমেন্ট", href: "/dashboard/admin/posts", icon: "FileStack" },
  {
    label: "Knowledge Base",
    href: "/dashboard/admin/knowledge-base",
    icon: "Library",
  },
  { label: "Profile", href: "/profile", icon: "User" },
];
