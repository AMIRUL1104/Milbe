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
    label: "সক্রিয় পোস্ট",
    value: "6",
    change: "+2 এই সপ্তাহে",
    trend: "up",
    icon: BookOpen,
  },
  {
    label: "মুলতুবি রিকোয়েস্ট",
    value: "3",
    change: "1টি নতুন",
    trend: "up",
    icon: Inbox,
  },
  {
    label: "বিক্রিত বই",
    value: "12",
    change: "+4 এই মাসে",
    trend: "up",
    icon: Handshake,
  },
  {
    label: "দান করা বই",
    value: "5",
    trend: "neutral",
    icon: ClipboardCheck,
  },
];

export const userActivities: ActivityItemData[] = [
  {
    id: "1",
    title: "নতুন রিকোয়েস্ট পেয়েছেন",
    description: 'রিফাত "HSC Physics 1st Paper" চেয়েছে',
    timestamp: "২ ঘণ্টা আগে",
    icon: Inbox,
  },
  {
    id: "2",
    title: "পোস্ট প্রকাশিত",
    description: '"Admission Math Guide" এখন লাইভে আছে',
    timestamp: "৫ ঘণ্টা আগে",
    icon: BookOpen,
  },
  {
    id: "3",
    title: "রিকোয়েস্ট গৃহীত",
    description: 'আপনি তানিয়ার "English Grammar" রিকোয়েস্ট গ্রহণ করেছেন',
    timestamp: "১ দিন আগে",
    icon: Handshake,
  },
  {
    id: "4",
    title: "পোস্ট বিক্রিত হিসেবে চিহ্নিত",
    description: '"SSC Chemistry Notes" বিক্রিত হিসেবে চিহ্নিত হয়েছে',
    timestamp: "৩ দিন আগে",
    icon: ClipboardCheck,
  },
];

export const userQuickActions: QuickActionData[] = [
  { label: "নতুন পোস্ট যোগ করুন", href: "/dashboard/user/posts", icon: PlusCircle },
  { label: "রিকোয়েস্ট দেখুন", href: "/dashboard/user/requests", icon: Inbox },
  { label: "Profile সম্পাদনা", href: "/dashboard/user/profile", icon: UserCog },
  { label: "বই ব্রাউজ করুন", href: "/", icon: BookOpen },
];

export const adminStats: StatCardData[] = [
  {
    label: "মোট ব্যবহারকারী",
    value: "1,284",
    change: "+34 এই সপ্তাহে",
    trend: "up",
    icon: Users,
  },
  {
    label: "সক্রিয় পোস্ট",
    value: "312",
    change: "+18 এই সপ্তাহে",
    trend: "up",
    icon: BookOpen,
  },
  {
    label: "মুলতুবি পর্যালোচনা",
    value: "9",
    trend: "neutral",
    icon: ShieldCheck,
  },
  {
    label: "Knowledge Base-এ বই",
    value: "874",
    change: "+21 এই মাসে",
    trend: "up",
    icon: Library,
  },
];

export const adminActivities: ActivityItemData[] = [
  {
    id: "1",
    title: "নতুন ব্যবহারকারী যোগ দিয়েছে",
    description: "ফারহানা আক্তার মিলবেতে যোগ দিয়েছেন",
    timestamp: "১ ঘণ্টা আগে",
    icon: Users,
  },
  {
    id: "2",
    title: "পোস্ট ফ্ল্যাগ করা হয়েছে",
    description: '"University Calculus Notes" একজন ব্যবহারকারী রিপোর্ট করেছেন',
    timestamp: "৩ ঘণ্টা আগে",
    icon: ShieldCheck,
  },
  {
    id: "3",
    title: "বই অনুমোদিত",
    description: '"Panjeree HSC Guide" knowledge base-এ যোগ করা হয়েছে',
    timestamp: "৬ ঘণ্টা আগে",
    icon: Library,
  },
  {
    id: "4",
    title: "ব্যবহারকারী স্থগিত",
    description: "নীতি লঙ্ঘনের জন্য একটি অ্যাকাউন্ট স্থগিত করা হয়েছে",
    timestamp: "১ দিন আগে",
    icon: UserCog,
  },
];

export const adminQuickActions: QuickActionData[] = [
  { label: "ব্যবহারকারী ব্যবস্থাপনা", href: "/dashboard/admin/users", icon: Users },
  { label: "পোস্ট ব্যবস্থাপনা", href: "/dashboard/admin/posts", icon: FileStack },
  {
    label: "Knowledge Base পর্যালোচনা",
    href: "/dashboard/admin/knowledge-base",
    icon: Library,
  },
  { label: "Profile সম্পাদনা", href: "/dashboard/admin/profile", icon: UserCog },
];
