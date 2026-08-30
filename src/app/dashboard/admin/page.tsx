// app/dashboard/admin/page.tsx

import {
  Users,
  BookOpen,
  ShieldCheck,
  Library,
  FileStack,
  UserCog,
  Inbox,
} from "lucide-react";
import type {
  ActivityItemData,
  AdminDashboardResponse,
  ApiActivity,
  QuickActionData,
  StatCardData,
} from "@/interface/dashboard/dashboard";

import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { getAdminDashboard } from "@/services/features/dashboard";
import { formatRelativeTime } from "@/lib/formatRelativeTime";


// ─── Static quick actions ─────────────────────────────────────────────────────

const adminQuickActions: QuickActionData[] = [
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Manage Posts", href: "/dashboard/admin/posts", icon: FileStack },
  {
    label: "Review Knowledge Base",
    href: "/dashboard/admin/knowledge-base",
    icon: Library,
  },
  { label: "Profile", href: "/profile", icon: UserCog },
];

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapAdminStats(data: AdminDashboardResponse): StatCardData[] {
  return [
    {
      label: "Total Users",
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      trend: "up",
    },
    {
      label: "Active Posts",
      value: data.activePosts.toLocaleString(),
      icon: BookOpen,
      trend: "up",
    },
    {
      label: "Pending Reviews",
      value: data.pendingReviews.toLocaleString(),
      icon: ShieldCheck,
      trend: "neutral",
    },
    {
      label: "Books in Knowledge Base",
      value: data.knowledgeBaseCount.toLocaleString(),
      icon: Library,
      trend: "neutral",
    },
  ];
}

const activityIconMap: Record<ApiActivity["type"], React.ComponentType<{ className?: string }>> = {
  user_registered: Users,
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

export default async function AdminDashboardPage() {
  const data = await getAdminDashboard();

  if (!data.success || !data.data) {
    return (
      <main className="min-h-screen w-full bg-[#F5F7F8] flex items-center justify-center">
        <p className="text-red-500 font-bold">Admin Dashboard not found or data error!</p>
      </main>
    );
  }

  return (
    <DashboardOverview
      title="Admin Overview"
      subtitle="Monitor platform activity and manage the community."
      stats={mapAdminStats(data.data)}
      activities={mapActivities(data.data?.recentActivities)}
      actions={adminQuickActions}
    />
  );
}
