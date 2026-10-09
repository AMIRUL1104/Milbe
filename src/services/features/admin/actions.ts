"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth, db } from "@/lib/auth";
import { getUserSession } from "@/services/core/session";

export type AdminActionResult = { ok: boolean; error?: string };

async function requireAdminSession() {
  const session = await getUserSession();
  if (!session) {
    return { error: "আপনি সাইন ইন করেননি।" };
  }
  if (session.role !== "admin") {
    return { error: "এই কাজের অনুমতি আপনার নেই।" };
  }
  return { session };
}

function toErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object") {
    const body = (error as { body?: { message?: string } }).body;
    if (body?.message) return body.message;
    const message = (error as { message?: string }).message;
    if (message) return message;
  }
  return fallback;
}

// Permanent suspend (`banUser`): sessions revoked immediately, new logins
// blocked. No `banExpiresIn` → permanent, matching the legacy `isBlocked` UX.
export async function suspendUser(userId: string): Promise<AdminActionResult> {
  try {
    const authz = await requireAdminSession();
    if ("error" in authz) return { ok: false, error: authz.error };
    if (userId === authz.session.id) {
      return { ok: false, error: "নিজের উপর সাসপেন্ড অ্যাকশন নেওয়া যাবে না।" };
    }

    await auth.api.banUser({
      body: { userId, banReason: "Suspended by admin" },
      headers: await headers(),
    });

    revalidatePath("/dashboard/admin/users");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: toErrorMessage(error, "সাসপেন্ড করা যায়নি।") };
  }
}

// Reactivates a suspended user (`unbanUser` clears ban fields).
export async function activateUser(userId: string): Promise<AdminActionResult> {
  try {
    const authz = await requireAdminSession();
    if ("error" in authz) return { ok: false, error: authz.error };
    if (userId === authz.session.id) {
      return { ok: false, error: "নিজের উপর এই অ্যাকশন নেওয়া যাবে না।" };
    }

    await auth.api.unbanUser({
      body: { userId },
      headers: await headers(),
    });

    revalidatePath("/dashboard/admin/users");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: toErrorMessage(error, "অ্যাক্টিভেট করা যায়নি।") };
  }
}

// Switches a user between the two roles this platform defines.
export async function changeUserRole(
  userId: string,
  role: "user" | "admin",
): Promise<AdminActionResult> {
  try {
    const authz = await requireAdminSession();
    if ("error" in authz) return { ok: false, error: authz.error };
    if (role !== "user" && role !== "admin") {
      return { ok: false, error: "অবৈধ রোল।" };
    }
    // Self-demote would lock the acting admin out of the panel.
    if (userId === authz.session.id) {
      return { ok: false, error: "নিজের রোল পরিবর্তন করা যাবে না।" };
    }

    await auth.api.setRole({
      body: { userId, role },
      headers: await headers(),
    });

    revalidatePath("/dashboard/admin/users");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: toErrorMessage(error, "রোল পরিবর্তন করা যায়নি।") };
  }
}

// Permanent removal: auth record first (user + sessions via the admin
// plugin), then the cascade — all posts, all sent/received book requests and
// remaining credential rows. Auth removal runs before the cascade so a
// plugin failure can never destroy a living user's data.
export async function deleteManagedUser(
  userId: string,
): Promise<AdminActionResult> {
  try {
    const authz = await requireAdminSession();
    if ("error" in authz) return { ok: false, error: authz.error };
    if (userId === authz.session.id) {
      return { ok: false, error: "নিজের অ্যাকাউন্ট ডিলিট করা যাবে না।" };
    }
    if (!ObjectId.isValid(userId)) {
      return { ok: false, error: "অবৈধ ইউজার।" };
    }

    await auth.api.removeUser({
      body: { userId },
      headers: await headers(),
    });

    const posts = await db
      .collection("posts")
      .find({ sellerId: userId }, { projection: { _id: 1 } })
      .toArray();
    const postIds = posts.map((post) => String(post._id));

    const deletedRequests = await db.collection("bookRequests").deleteMany({
      $or: [
        { requesterId: userId },
        { sellerId: userId },
        ...(postIds.length > 0 ? [{ postId: { $in: postIds } }] : []),
      ],
    });
    const deletedPosts = await db
      .collection("posts")
      .deleteMany({ sellerId: userId });
    // Orphaned credential rows (the plugin removes user + sessions itself).
    await db.collection("account").deleteMany({ userId });

    console.log(
      `[admin-delete] user=${userId} posts=${deletedPosts.deletedCount} requests=${deletedRequests.deletedCount}`,
    );

    revalidatePath("/dashboard/admin/users");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: toErrorMessage(error, "ডিলিট করা যায়নি।") };
  }
}
