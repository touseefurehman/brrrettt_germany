import { NextResponse } from "next/server";
import { runSequences } from "@/lib/funnel";

export const dynamic = "force-dynamic";

// Vercel Cron (vercel.json, täglich). Geschützt mit CRON_SECRET (Authorization: Bearer …).
// Nur in der Entwicklung (NODE_ENV=development) simuliert ?days=<n> die Zeit (n Tage nach jetzt).
export async function GET(req: Request) {
  const dev = process.env.NODE_ENV === "development";
  const secret = process.env.CRON_SECRET;
  if (!dev && (!secret || req.headers.get("authorization") !== `Bearer ${secret}`)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const days = dev ? Number(new URL(req.url).searchParams.get("days") ?? 0) : 0;
  const now = new Date(Date.now() + (Number.isFinite(days) ? days : 0) * 86_400_000);
  return NextResponse.json({ ok: true, now: now.toISOString(), ...(await runSequences(now)) });
}
