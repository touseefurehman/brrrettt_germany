import { csvCell } from "@/lib/admin";
import { applyFilter, pickFilter } from "@/lib/partner-admin";
import { listApplications } from "@/lib/partner-applications";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const list = applyFilter(await listApplications(), pickFilter(new URL(req.url).searchParams));
  const head = [
    "id", "eingang", "status", "status_seit", "unternehmen", "ansprechperson", "email", "telefon", "kategorien", "regionen", "plz_bereiche",
    "qualifikationen", "qualifikationen_freitext", "prueftage_monat", "mobile_teams", "nachricht", "quellseite", "utm_source", "utm_medium",
    "utm_campaign", "utm_term", "utm_content", "referrer", "einwilligung", "einwilligung_fassung", "freigegeben_von", "freigegeben_am",
    "notizen", "loeschung_ab", "web3forms",
  ];
  const rows = list.map((a) => [
    a.id, a.createdAt, a.status, a.statusChangedAt, a.company, a.contactName, a.email, a.phone, a.categories.join("; "), a.regions.join("; "),
    a.plzAreas, a.qualifications.join("; "), a.qualificationsText, a.capacityDays, a.mobileTeams, a.message, a.sourcePage, a.utmSource,
    a.utmMedium, a.utmCampaign, a.utmTerm, a.utmContent, a.referrer, a.consentAt, a.consentTextVersion, a.approvedBy ?? "", a.approvedAt ?? "",
    a.notes, a.deleteAfter ?? "", a.web3formsStatus ?? "",
  ]);
  const body = [head, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
  return new Response("﻿" + body, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="pruefpartner-bewerbungen.csv"', "Cache-Control": "no-store" },
  });
}
