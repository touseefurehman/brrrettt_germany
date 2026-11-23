import { NextResponse } from "next/server";
import { parseCsv, sameOrigin } from "@/lib/admin";
import { clusterBySlug } from "@/lib/clusters";
import { baselineFor } from "@/lib/funnel";
import { computeFindings, normDomain } from "@/lib/nullmessung";
import { newId, newToken, saveLead, type Lead } from "@/lib/store";

export const dynamic = "force-dynamic";

// CSV-Import (Spalten: Firma, Domain, Cluster, Kontakt). Erzeugt nur Befundseiten und Links.
// Es wird NIEMALS eine E-Mail an importierte Adressen gesendet (UWG § 7).
export async function POST(req: Request) {
  if (!sameOrigin(req)) return new NextResponse("Forbidden", { status: 403 });
  const csv = String((await req.formData()).get("csv") ?? "").slice(0, 200_000);
  const rows = parseCsv(csv);
  const body = /firma|company/i.test(rows[0]?.[0] ?? "") ? rows.slice(1) : rows;
  let created = 0;
  const skipped: string[] = [];
  for (const [company = "", domainRaw = "", clusterSlug = "", contact = ""] of body) {
    const cluster = clusterBySlug(clusterSlug);
    const domain = normDomain(domainRaw);
    const m = cluster && baselineFor(cluster.slug);
    if (!company || !domain || !cluster || !m) {
      skipped.push(company || "(leer)");
      continue;
    }
    const lead: Lead = {
      id: newId(), token: newToken(), confirmToken: newToken(), unsubToken: newToken(),
      cluster: cluster.slug, company, domain, name: contact, role: "Outbound", email: "",
      status: "bestaetigt", source: "outbound", createdAt: new Date().toISOString(), confirmedAt: null,
      lastEmailStep: null, baselineMonth: m.month, findingsJson: computeFindings(m, company, domain),
    };
    await saveLead(lead);
    created++;
  }
  const q = new URLSearchParams({ erstellt: String(created), uebersprungen: skipped.join(", ") });
  return NextResponse.redirect(new URL(`/admin/outbound?${q}`, req.headers.get("origin") ?? req.url), 303);
}
