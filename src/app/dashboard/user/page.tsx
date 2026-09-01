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

import { ActivityItemData, ApiActivity, QuickActionData, StatCardData, UserDashboardResponse } from "@/interface/dashboard/dashboard";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { getUserDashboard } from "@/services/features/dashboard";

// ─── Static quick actions ─────────────────────────────────────────────────────

const userQuickActions: QuickActionData[] = [
  { label: "My Posts", href: "/dashboard/user/posts", icon: PlusCircle },
  { label: "View Requests", href: "/dashboard/user/requests", icon: Inbox },
  { label: "Browse Books", href: "/", icon: BookOpen },
  { label: "Profile", href: "/profile", icon: UserCog },
];

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapUserStats(data: UserDashboardResponse): StatCardData[] {
  return [
    {
      label: "Active Posts",
      value: data.activePosts.toLocaleString(),
      icon: BookOpen,
      trend: "up",
    },
    {
      label: "Pending Requests",
      value: data.pendingRequests.toLocaleString(),
      icon: Inbox,
      trend: "up",
    },
    {
      label: "Books Sold",
      value: data.booksSold.toLocaleString(),
      icon: Handshake,
      trend: "up",
    },
    {
      label: "Books Donated",
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
      <main className="min-h-screen w-full bg-[#F5F7F8] flex items-center justify-center">
        <p className="text-red-500 font-bold">User Dashboard not found or data error!</p>
      </main>
    );
  }

  return (
    <DashboardOverview
      title="Welcome back 👋"
      subtitle="Here's what's happening with your books today."
      stats={mapUserStats(data.data)}
      activities={mapActivities(data.data?.recentActivities)}
      actions={userQuickActions}
    />
  );
}
