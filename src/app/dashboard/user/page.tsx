// app/dashboard/user/page.tsx

import {
  BookOpen,
  Inbox,
  Handshake,
  ClipboardCheck,
  PlusCircle,
  UserCog,
} from "lucide-react";


import DashboardOverview from "@/components/dashboard/DashboardOverview";

import { ActivityItemData, ApiActivity, QuickActionData, StatCardData, UserDashboardData } from "@/interface/dashboard/dashboard";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { getUserDashboard } from "@/services/features/dashboard";

// ─── Static quick actions ─────────────────────────────────────────────────────

const userQuickActions: QuickActionData[] = [
  { label: "আমার পোস্ট", href: "/dashboard/user/posts", icon: PlusCircle },
  { label: "রিকোয়েস্ট দেখুন", href: "/dashboard/user/requests", icon: Inbox },
  { label: "বই ব্রাউজ করুন", href: "/", icon: BookOpen },
  { label: "Profile", href: "/profile", icon: UserCog },
];

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapUserStats(data: UserDashboardData): StatCardData[] {
  return [
    {
      label: "সক্রিয় পোস্ট",
      value: data.activePosts.toLocaleString(),
      icon: BookOpen,
      trend: "up",
    },
    {
      label: "মুলতুবি রিকোয়েস্ট",
      value: data.pendingRequests.toLocaleString(),
      icon: Inbox,
      trend: "up",
    },
    {
      label: "বিক্রিত বই",
      value: data.booksSold.toLocaleString(),
      icon: Handshake,
      trend: "up",
    },
    {
      label: "দান করা বই",
      value: data.booksDonated.toLocaleString(),
      icon: ClipboardCheck,
      trend: "neutral",
    },
  ];
}

const activityIconMap: Record<ApiActivity["type"], React.ComponentType<{ className?: string }>> = {
  user_registered: BookOpen, // won't appear in user activities, safe fallback
  post_created: BookOpen,
  request_created: Inbox,
};

function mapActivities(raw: ApiActivity[]): ActivityItemData[] {
  return raw.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    timestamp: formatRelativeTime(a.createdAt),
    icon: activityIconMap[a.type] ?? BookOpen,
  }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UserDashboardPage() {
  const data = await getUserDashboard();

  if (!data.success || !data.data) {
    return (
      <div className="min-h-screen w-full bg-[#F5F7F8] flex items-center justify-center">
        <p className="text-red-500 font-bold">ড্যাশবোর্ড তথ্য পাওয়া যায়নি!</p>
      </div>
    );
  }

  return (
    <DashboardOverview
      title="স্বাগতম 👋"
      subtitle="আজ আপনার বইগুলোর খবর এখানে।"
      stats={mapUserStats(data.data)}
      activities={mapActivities(data.data?.recentActivities)}
      actions={userQuickActions}
    />
  );
}
