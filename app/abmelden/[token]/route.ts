import { NextResponse } from "next/server";
import { unsubscribe } from "@/lib/funnel";

export const dynamic = "force-dynamic";

// Abmeldelink aus jeder E-Mail: stoppt sofort alle weiteren Nachrichten.
export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const ok = await unsubscribe((await params).token);
  const base = process.env.SITE_URL || new URL(req.url).origin;
  return NextResponse.redirect(`${base}/abmelden${ok ? "" : "?ungueltig=1"}`, 303);
}
