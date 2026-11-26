import { NextResponse } from "next/server";
import { runLeadCleanup } from "@/lib/funnel";
import { purgeExpired } from "@/lib/partner-applications";
import { storeConfigured } from "@/lib/store";

export const dynamic = "force-dynamic";

// Tägliche Bereinigung (Vercel Cron, vercel.json). Kein E-Mail-Versand. Geschützt mit CRON_SECRET (Authorization: Bearer …).
// - Nullmessung: unbearbeitete Anfragen löschen, Warteliste mit neuer Messung auf „Befund bereit“ setzen
// - Prüfpartner-Bewerbungen: nach Ablauf der Speicherfrist (PARTNER_RETENTION_DAYS ab letztem Statuswechsel) löschen
// Nur in der Entwicklung (NODE_ENV=development) simuliert ?days=<n> die Zeit (n Tage nach jetzt).
export async function GET(req: Request) {
  const dev = process.env.NODE_ENV === "development";
  const secret = process.env.CRON_SECRET;
  if (!dev && (!secret || req.headers.get("authorization") !== `Bearer ${secret}`)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const days = dev ? Number(new URL(req.url).searchParams.get("days") ?? 0) : 0;
  const now = new Date(Date.now() + (Number.isFinite(days) ? days : 0) * 86_400_000);
  const leads = storeConfigured ? await runLeadCleanup(now) : { promoted: [], deleted: 0 };
  const partnerDeleted = await purgeExpired(now);
  return NextResponse.json({ ok: true, now: now.toISOString(), leads, partnerApplications: { deleted: partnerDeleted } });
}
