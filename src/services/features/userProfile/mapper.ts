import type { UserSession } from "@/interface/user/userSession";
import type { UserProfile } from "@/interface/user/userProfile";

/**
 * Builds the legacy `UserProfile`-shaped object (used by the profile UI and
 * the Express `/api/users` response contract) from the consolidated Better
 * Auth session user.
 *
 * After consolidation the single source of truth is the `user` document
 * returned by `getUserSession()`. This mapper keeps the existing profile UI
 * (fullName / avatarUrl / memberSince) pointing at the auth user's
 * name / image / createdAt fields so no profile component changes.
 */
export function toUserProfile(user: UserSession): UserProfile {
  return {
    _id: user.id,
    userId: user.id,
    fullName: user.name ?? "",
    email: user.email ?? "",
    phoneNumber: user.phoneNumber ?? "",
    district: user.district ?? "",
    area: user.area ?? "",
    avatarUrl: user.image ?? null,
    role: user.role ?? "user",
    memberSince: user.createdAt ? new Date(user.createdAt).toISOString() : new Date(0).toISOString(),
    isBlocked: user.isBlocked ?? false,
  };
}