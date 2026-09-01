import {
  BookOpen,
  Users,
  ClipboardCheck,
  Handshake,
  PlusCircle,
  Inbox,
  UserCog,
  ShieldCheck,
  FileStack,
  Library,
} from "lucide-react";
import type {
  ActivityItemData,
  QuickActionData,
  StatCardData,
} from "@/interface/dashboard/dashboard";

export const userStats: StatCardData[] = [
  {
    label: "Active Posts",
    value: "6",
    change: "+2 this week",
    trend: "up",
    icon: BookOpen,
  },
  {
    label: "Pending Requests",
    value: "3",
    change: "1 new",
    trend: "up",
    icon: Inbox,
  },
  {
    label: "Books Sold",
    value: "12",
    change: "+4 this month",
    trend: "up",
    icon: Handshake,
  },
  {
    label: "Books Donated",
    value: "5",
    trend: "neutral",
    icon: ClipboardCheck,
  },
];

export const userActivities: ActivityItemData[] = [
  {
    id: "1",
    title: "New request received",
    description: 'Rifat requested "HSC Physics 1st Paper"',
    timestamp: "2h ago",
    icon: Inbox,
  },
  {
    id: "2",
    title: "Post published",
    description: '"Admission Math Guide" is now live',
    timestamp: "5h ago",
    icon: BookOpen,
  },
  {
    id: "3",
    title: "Request accepted",
    description: 'You accepted Tania\'s request for "English Grammar"',
    timestamp: "1d ago",
    icon: Handshake,
  },
  {
    id: "4",
    title: "Post marked as Sold",
    description: '"SSC Chemistry Notes" marked as sold',
    timestamp: "3d ago",
    icon: ClipboardCheck,
  },
];

export const userQuickActions: QuickActionData[] = [
  { label: "Add New Post", href: "/dashboard/user/posts", icon: PlusCircle },
  { label: "View Requests", href: "/dashboard/user/requests", icon: Inbox },
  { label: "Edit Profile", href: "/dashboard/user/profile", icon: UserCog },
  { label: "Browse Books", href: "/", icon: BookOpen },
];

export const adminStats: StatCardData[] = [
  {
    label: "Total Users",
    value: "1,284",
    change: "+34 this week",
    trend: "up",
    icon: Users,
  },
  {
    label: "Active Posts",
    value: "312",
    change: "+18 this week",
    trend: "up",
    icon: BookOpen,
  },
  {
    label: "Pending Reviews",
    value: "9",
    trend: "neutral",
    icon: ShieldCheck,
  },
  {
    label: "Books in Knowledge Base",
    value: "874",
    change: "+21 this month",
    trend: "up",
    icon: Library,
  },
];

export const adminActivities: ActivityItemData[] = [
  {
    id: "1",
    title: "New user registered",
    description: "Farhana Akter joined Milbe",
    timestamp: "1h ago",
    icon: Users,
  },
  {
    id: "2",
    title: "Post flagged",
    description: '"University Calculus Notes" reported by a user',
    timestamp: "3h ago",
    icon: ShieldCheck,
  },
  {
    id: "3",
    title: "Book approved",
    description: '"Panjeree HSC Guide" added to knowledge base',
    timestamp: "6h ago",
    icon: Library,
  },
  {
    id: "4",
    title: "User suspended",
    description: "An account was suspended for policy violation",
    timestamp: "1d ago",
    icon: UserCog,
  },
];

export const adminQuickActions: QuickActionData[] = [
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Manage Posts", href: "/dashboard/admin/posts", icon: FileStack },
  {
    label: "Review Knowledge Base",
    href: "/dashboard/admin/knowledge-base",
    icon: Library,
  },
  { label: "Edit Profile", href: "/dashboard/admin/profile", icon: UserCog },
];
