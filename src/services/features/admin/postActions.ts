"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { serverMutation } from "@/services/core/server";
import { db } from "@/lib/auth";
import { getUserSession } from "@/services/core/session";
import { sendPostDeletedMail } from "@/lib/email";

export type AdminPostActionResult = { ok: boolean; error?: string };

const MAX_REASON_LENGTH = 500;

/**
 * Admin-only post deletion (Manage Posts page). Flow:
 * 1. server-side admin check (client UI state is never trusted),
 * 2. snapshot the post (title/image/seller) BEFORE the soft delete,
 * 3. DELETE via the Express API with the admin session token
 *    (the API's ownership-or-admin check passes for admins),
 * 4. email the owner with the admin-provided reason — background send, so an
 *    SMTP failure can never fail the delete; self-deletes send no email.
 */
export async function deletePostAsAdmin(
  postId: string,
  reason: string,
): Promise<AdminPostActionResult> {
  try {
    const session = await getUserSession();
    if (!session) {
      return { ok: false, error: "You are not signed in." };
    }
    if (session.role !== "admin") {
      return { ok: false, error: "You are not allowed to do this." };
    }

    const trimmedReason = (reason ?? "").trim();
    if (!trimmedReason) {
      return { ok: false, error: "Please provide a reason for deletion." };
    }
    if (trimmedReason.length > MAX_REASON_LENGTH) {
      return {
        ok: false,
        error: `Reason must be ${MAX_REASON_LENGTH} characters or fewer.`,
      };
    }
    if (!ObjectId.isValid(postId)) {
      return { ok: false, error: "Invalid post." };
    }

    // Snapshot BEFORE the soft delete: afterwards the admin list no longer
    // returns the doc, and the notification email needs title/image/seller.
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(postId),
      isDeleted: { $ne: true },
    });
    if (!post) {
      return { ok: false, error: "Post not found." };
    }

    await serverMutation<Record<string, never>, null>(
      `/api/posts/${postId}`,
      {},
      "DELETE",
    );

    // Notify the owner — unless the admin just deleted their own post.
    const sellerId = typeof post.sellerId === "string" ? post.sellerId : "";
    const sellerEmail =
      typeof post.sellerEmail === "string" ? post.sellerEmail : "";
    if (sellerId && sellerEmail && sellerId !== session.id) {
      sendPostDeletedMail({
        to: sellerEmail,
        sellerName:
          typeof post.sellerName === "string" && post.sellerName
            ? post.sellerName
            : "ব্যবহারকারী",
        postTitle:
          typeof post.title === "string" && post.title
            ? post.title
            : "শিরোনামহীন পোস্ট",
        imageUrl:
          typeof post.image === "string" && post.image ? post.image : null,
        deletedAt: new Date(),
        reason: trimmedReason,
        repostUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/add-post`,
      });
    }

    revalidatePath("/dashboard/admin/posts");
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    return {
      ok: false,
      error: message.includes("not found")
        ? "Post not found."
        : "Failed to delete post. Please try again.",
    };
  }
}