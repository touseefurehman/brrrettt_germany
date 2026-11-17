import { NextResponse } from "next/server";
import type { Json, Result } from "@/lib/leads";

/** Gemeinsame Hülle der API-Routen: JSON lesen, Größe begrenzen, IP bestimmen, Ergebnis in Antwort übersetzen */
export async function leadResponse(req: Request, handler: (body: Json, ip: string) => Promise<Result>) {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > 20_000) return NextResponse.json({ ok: false, message: "Anfrage zu groß." }, { status: 413 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const result = await handler(body as Json, ip);
  if (result.ok) return NextResponse.json({ ok: true });
  return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
}
