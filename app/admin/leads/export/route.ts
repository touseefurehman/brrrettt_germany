import { csvCell } from "@/lib/admin";
import { getLeads } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const cluster = sp.get("cluster");
  const status = sp.get("status");
  const leads = (await getLeads()).filter((l) => (!cluster || l.cluster === cluster) && (!status || l.status === status));
  const head = ["id", "erstellt", "cluster", "firma", "domain", "name", "rolle", "email", "status", "quelle", "bestaetigt", "mail_schritt", "messmonat"];
  const rows = leads.map((l) => [l.id, l.createdAt, l.cluster, l.company, l.domain, l.name, l.role, l.email, l.status, l.source, l.confirmedAt ?? "", l.lastEmailStep ?? "", l.baselineMonth ?? ""]);
  const body = [head, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
  return new Response("﻿" + body, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="leads.csv"' },
  });
}
