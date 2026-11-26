import { NextResponse } from "next/server";
import { recordWeb3FormsResult } from "@/lib/partner-applications";

export const dynamic = "force-dynamic";

// Schritt 3 der Bewerbung: Ergebnis des Web3Forms-Versands (sent / error). Nur einmal je Bewerbung setzbar; die ID ist eine zufällige UUID.
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const body = (await req.json().catch(() => null)) as { web3formsStatus?: unknown } | null;
  if (!/^[0-9a-f-]{36}$/.test(id) || !body) return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  try {
    const r = await recordWeb3FormsResult(id, body.web3formsStatus);
    if (!r.ok) return NextResponse.json({ ok: false, message: r.message }, { status: r.status });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[partner-application:patch]", err);
    return NextResponse.json({ ok: false, message: "Speichern fehlgeschlagen." }, { status: 500 });
  }
}
