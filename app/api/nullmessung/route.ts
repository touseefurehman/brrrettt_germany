import { NextResponse } from "next/server";
import { CONFIRMATION, createRequest } from "@/lib/funnel";

export const dynamic = "force-dynamic";

// Rate-Limit je IP (Speicher dieser Instanz; reicht gegen einfache Wiederholungen, Formular hat zusätzlich Honeypot und Mindestzeit)
const hits = new Map<string, { n: number; reset: number }>();
function allowed(ip: string, limit = 5) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + 3_600_000 });
    return true;
  }
  return ++h.n <= limit;
}

// Speichert die Anfrage (falls Datenbank vorhanden) und gibt die Benachrichtigung zurück, die der Browser an Web3Forms sendet.
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  // Spam: Honeypot gefüllt oder zu schnell abgeschickt → still so tun, als sei alles gut gegangen
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true, silent: true });
  if (Number(body.elapsed) < 3000) return NextResponse.json({ ok: true, silent: true });
  if (!allowed(ip)) return NextResponse.json({ ok: false, message: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }, { status: 429 });
  try {
    const r = await createRequest(body);
    if (!r.ok) return NextResponse.json({ ok: false, message: r.message }, { status: r.status });
    return NextResponse.json({ ok: true, stored: r.stored, waitlist: r.waitlist, message: CONFIRMATION, mail: r.mail });
  } catch (err) {
    console.error("[nullmessung]", err);
    return NextResponse.json({ ok: false, message: "Die Anfrage konnte nicht verarbeitet werden." }, { status: 500 });
  }
}
