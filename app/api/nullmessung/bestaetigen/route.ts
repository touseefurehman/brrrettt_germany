import { NextResponse } from "next/server";
import { confirmLead } from "@/lib/funnel";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lead = await confirmLead(url.searchParams.get("t") ?? "");
  const base = process.env.SITE_URL || url.origin;
  if (!lead) return NextResponse.redirect(`${base}/nullmessung/bestaetigt?ungueltig=1`, 303);
  if (lead.status === "warteliste") return NextResponse.redirect(`${base}/nullmessung/bestaetigt`, 303);
  return NextResponse.redirect(`${base}/befund/${lead.token}`, 303);
}
