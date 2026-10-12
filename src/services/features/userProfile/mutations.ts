"use server";

import type {
  UpdateProfilePayload,
  UpdateUserProfileResult,
} from "@/interface/user/userProfile";
import { serverMutation } from "@/services/core/server";

export async function updateUserProfile(
  data: UpdateProfilePayload,
): Promise<UpdateUserProfileResult> {
  return (await serverMutation<
    UpdateProfilePayload,
    UpdateUserProfileResult
  >("/api/users/me/profile", data, "PATCH", { unwrap: true })) as UpdateUserProfileResult;
}