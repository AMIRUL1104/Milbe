import { NextResponse } from "next/server";
import { db } from "@/lib/auth";

/**
 * GET /api/health
 *
 * Lightweight liveness + DB connectivity probe.
 *
 * Dual purpose:
 *  1. Render free-tier keep-alive — configure an external monitor
 *     (UptimeRobot / cron-job.org) to hit this endpoint every 5 minutes
 *     so the backend never reaches the 15-minute idle threshold that
 *     triggers a 30–50 s spin-down for the next real visitor.
 *
 *     ► Monitor URL:  https://<your-render-backend>.onrender.com/api/health
 *     ► Interval:     every 5 minutes
 *
 *  2. MongoDB warm-up — the `db.command({ ping: 1 })` call exercises the
 *     connection pool so the first real SSR request finds a live socket
 *     rather than incurring a reconnect penalty.
 *
 * Response is strictly `no-store` so CDN / Vercel edge cache never serves
 * a stale health snapshot.
 */

export const dynamic = "force-dynamic"; // Never statically or ISR-cache this route

export async function GET() {
  const start = Date.now();

  try {
    // Lightweight server-round-trip ping — does NOT read any collection.
    await db.command({ ping: 1 });

    return NextResponse.json(
      {
        status: "ok",
        db: "connected",
        latencyMs: Date.now() - start,
        ts: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
        },
      },
    );
  } catch (error) {
    console.error("[health] DB ping failed:", error);

    return NextResponse.json(
      {
        status: "error",
        db: "unreachable",
        message: error instanceof Error ? error.message : "Unknown error",
        ts: new Date().toISOString(),
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
        },
      },
    );
  }
}
