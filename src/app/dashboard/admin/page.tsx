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
  { label: "ব্যবহারকারী ব্যবস্থাপনা", href: "/dashboard/admin/users", icon: Users },
  { label: "পোস্ট ব্যবস্থাপনা", href: "/dashboard/admin/posts", icon: FileStack },
  {
    label: "Knowledge Base পর্যালোচনা",
    href: "/dashboard/admin/knowledge-base",
    icon: Library,
  },
  { label: "Profile", href: "/profile", icon: UserCog },
];

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapAdminStats(data: AdminDashboardResponse): StatCardData[] {
  return [
    {
      label: "মোট ব্যবহারকারী",
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      trend: "up",
    },
    {
      label: "সক্রিয় পোস্ট",
      value: data.activePosts.toLocaleString(),
      icon: BookOpen,
      trend: "up",
    },
    {
      label: "মুলতুবি পর্যালোচনা",
      value: data.pendingReviews.toLocaleString(),
      icon: ShieldCheck,
      trend: "neutral",
    },
    {
      label: "Knowledge Base-এ বই",
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
        <p className="text-red-500 font-bold">Admin ড্যাশবোর্ড তথ্য পাওয়া যায়নি!</p>
      </main>
    );
  }

  return (
    <DashboardOverview
      title="Admin Overview"
      subtitle="প্ল্যাটফর্মের কার্যকলাপ পর্যবেক্ষণ করুন।"
      stats={mapAdminStats(data.data)}
      activities={mapActivities(data.data?.recentActivities)}
      actions={adminQuickActions}
    />
  );
}
