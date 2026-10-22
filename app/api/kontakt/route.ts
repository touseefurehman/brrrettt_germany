import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Versand über die Resend-HTTP-API (https://resend.com). Benötigte Umgebungsvariablen in Vercel:
//   RESEND_API_KEY  – API-Schlüssel
//   CONTACT_FROM    – verifizierte Absenderadresse, z. B. "Website <anfrage@betreibermanager.de>"
//   CONTACT_TO      – Zieladresse (Standard: site.email)
// Hinweis: Der Versanddienst muss in der Datenschutzerklärung genannt werden.

const field = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Spam-Schutz: Honeypot gefüllt oder Formular in unter 3 Sekunden abgeschickt → still verwerfen
  if (field(body.website, 200) || Number(body.elapsed) < 3000) {
    return NextResponse.json({ ok: true });
  }

  const name = field(body.name, 120);
  const email = field(body.email, 200);
  const message = field(body.message, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Bitte Name, gültige E-Mail-Adresse und Ihr Anliegen angeben." }, { status: 422 });
  }
  if (body.consent !== "yes") {
    return NextResponse.json({ error: "Bitte bestätigen Sie die Datenschutzerklärung." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) {
    console.error("Kontaktformular: RESEND_API_KEY oder CONTACT_FROM fehlt.");
    return NextResponse.json(
      { error: `Der Versand ist gerade nicht möglich. Bitte schreiben Sie an ${site.email}.` },
      { status: 503 },
    );
  }

  const text = [
    `Name: ${name}`,
    `Firma: ${field(body.company, 160) || "–"}`,
    `E-Mail: ${email}`,
    `Telefon: ${field(body.phone, 60) || "–"}`,
    `Standorte / Anlagen: ${field(body.scope, 160) || "–"}`,
    `Gewünschter Zeitraum: ${field(body.timeframe, 120) || "–"}`,
    `Seite: ${field(body.source, 200) || "–"}`,
    "",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO || site.email],
      reply_to: email,
      subject: `Anfrage über betreibermanager.de – ${name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Kontaktformular: Versand fehlgeschlagen", res.status, await res.text());
    return NextResponse.json(
      { error: `Der Versand ist fehlgeschlagen. Bitte schreiben Sie an ${site.email}.` },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
