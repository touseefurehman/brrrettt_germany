import { NextResponse } from "next/server";
import type { Json } from "@/lib/leads";
import { handlePartnerApplication } from "@/lib/partner-applications";

export const dynamic = "force-dynamic";

// Schritt 1 der Bewerbung: prüfen und speichern. Antwort: ID und die Web3Forms-Nachricht, die der Browser danach selbst sendet.
export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") ?? 0) > 20_000) return NextResponse.json({ ok: false, message: "Anfrage zu groß." }, { status: 413 });
  const body = (await req.json().catch(() => null)) as Json | null;
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  try {
    const r = await handlePartnerApplication(body, ip);
    if (!r.ok) return NextResponse.json({ ok: false, message: r.message }, { status: r.status });
    return NextResponse.json({ ok: true, ...(r.id && { id: r.id, stored: r.stored, mail: r.mail }) });
  } catch (err) {
    console.error("[partner-application]", err);
    return NextResponse.json({ ok: false, message: "Die Registrierung konnte nicht gespeichert werden." }, { status: 500 });
  }
}
