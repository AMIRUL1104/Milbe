import type { UserProfile } from "@/interface/user/userProfile";
import { ApiResponse, PaginatedMeta } from "@/interface/apiResponse";

export type { UserProfile };

export type ManagedUser = UserProfile;

export type UserRole = "admin" | "user";

export type RoleFilter = "all" | UserRole;
export type StatusFilter = "all" | "active" | "suspended";

export interface GetUsersResponse
  extends Omit<ApiResponse<ManagedUser[]>, "meta"> {
  meta?: PaginatedMeta;
}