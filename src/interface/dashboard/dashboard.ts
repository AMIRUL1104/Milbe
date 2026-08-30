import type { ComponentType } from "react";
import { ApiResponse } from "@/interface/apiResponse";

export type DashboardRole = "admin" | "user";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface DashboardUser {
  name: string;
  email: string;
  avatarUrl: string | null;
  role: DashboardRole;
}

// ─── Existing UI interfaces (keep unchanged) ──────────────────────────────────

export interface StatCardData {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: ComponentType<{ className?: string }>;
}

export interface ActivityItemData {
  id: string;
  title: string;
  description: string;
  timestamp: string; // human-readable, e.g. "2h ago"
  icon: ComponentType<{ className?: string }>;
}

export interface QuickActionData {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

// ─── API response shapes (raw data from backend) ─────────────────────────────

export type ActivityType =
  | "user_registered"
  | "post_created"
  | "request_created";

export interface ApiActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  createdAt: string; // ISO date string
}

export interface AdminDashboardData {
  totalUsers: number;
  activePosts: number;
  pendingReviews: number;
  knowledgeBaseCount: number;
  recentActivities: ApiActivity[];
}

export interface UserDashboardData {
  activePosts: number;
  pendingRequests: number;
  booksSold: number;
  booksDonated: number;
  recentActivities: ApiActivity[];
}

export type AdminDashboardResponse = ApiResponse<AdminDashboardData>;

export type UserDashboardResponse = ApiResponse<UserDashboardData>;