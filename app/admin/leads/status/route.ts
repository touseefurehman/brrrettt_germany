import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/admin";
import { leadBy, leadStatuses, logEvent, saveLead, type LeadStatus } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return new NextResponse("Forbidden", { status: 403 });
  const fd = await req.formData();
  const status = String(fd.get("status") ?? "") as LeadStatus;
  const lead = await leadBy("id", String(fd.get("id") ?? ""));
  if (!lead || !leadStatuses.includes(status)) return new NextResponse("Ungültig", { status: 400 });
  if (lead.status !== status) {
    const from = lead.status;
    lead.status = status;
    await saveLead(lead);
    await logEvent(lead.id, status === "gebucht" ? "buchung" : "status", `${from} → ${status}`);
  }
  return NextResponse.redirect(new URL("/admin/leads", req.headers.get("origin") ?? req.url), 303);
}
