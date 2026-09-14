import { authClient } from "@/lib/auth-client";
import type { UserSession } from "@/interface/user/userSession";
import type { UpdateProfilePayload, UserProfile } from "@/interface/user/userProfile";
import { toUserProfile } from "./mapper";

/**
 * Updates the current user's profile through Better Auth's `/update-user`
 * endpoint. `name` and `image` are core Better Auth fields; `phoneNumber`,
 * `district` and `area` are additional fields declared `input: true` in
 * `src/lib/auth.ts` — the server updates all of them on the single `user`
 * document and refreshes the session cookie. The response is mapped back
 * into the legacy `UserProfile` shape the profile UI expects.
 */
export async function updateUserProfile(
  data: UpdateProfilePayload,
): Promise<UserProfile> {
  const res = await authClient.updateUser({
    name: data.fullName,
    image: data.avatarUrl ?? undefined,
    phoneNumber: data.phoneNumber,
    district: data.district,
    area: data.area,
  });

  if (res.error) {
    throw new Error(res.error.message || "Profile update failed.");
  }

  // `/update-user` returns `{ status: true }` only, so re-fetch the session
  // to read the freshly updated user.
  const sessionRes = await authClient.getSession();
  const user = sessionRes.data?.user;
  if (!user) {
    throw new Error("Could not reload the session after updating your profile.");
  }

  return toUserProfile(user as UserSession);
}