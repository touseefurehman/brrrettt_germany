import { createHash, randomUUID } from "node:crypto";
import { bereichBySlug, leadRecipient, landingFor, landingPath, objektBySlug, pruefbereiche } from "@/lib/rank-rent";
import type { FormField } from "@/lib/rank-rent";
import { site } from "@/lib/site";

// Serverseitige Lead-Verarbeitung für Rank & Rent: Validierung, Spam-Schutz, E-Mail (Resend per REST),
// Speicherung (Upstash Redis per REST). Keine zusätzlichen Pakete – nur fetch.
//
// Umgebungsvariablen: RESEND_API_KEY, LEAD_FROM_EMAIL, LEAD_FALLBACK_EMAIL, LEAD_ADMIN_EMAIL,
// KV_REST_API_URL + KV_REST_API_TOKEN (oder UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
// LEAD_DRY_RUN=1 schreibt die E-Mail in die Server-Konsole, statt sie zu senden (nur für lokale Tests).

export type Json = Record<string, unknown>;

// ---- Hilfen -----------------------------------------------------------------------------------------------------

const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\r/g, "").trim().slice(0, max) : "");
/** Einzeiliger Text für Betreff und Header – kein Zeilenumbruch, damit keine Header eingeschleust werden */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();
const EMAIL_RE = /^[^\s@<>()"]+@[^\s@<>()"]+\.[A-Za-z]{2,}$/;
const MIN_FILL_MS = 3000;

export type Result = { ok: true; dry?: boolean; silent?: boolean } | { ok: false; status: number; message: string };
const fail = (status: number, message: string): Result => ({ ok: false, status, message });

// ---- Rate-Limit -------------------------------------------------------------------------------------------------

const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const hasKv = Boolean(kvUrl && kvToken);

async function kv(commands: (string | number)[][]): Promise<{ result?: unknown }[] | null> {
  if (!hasKv) return null;
  try {
    const res = await fetch(`${kvUrl}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${kvToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`KV ${res.status}`);
    return (await res.json()) as { result?: unknown }[];
  } catch (err) {
    console.error("[rank-rent] KV-Zugriff fehlgeschlagen:", err instanceof Error ? err.message : err);
    return null;
  }
}

const memoryHits = new Map<string, { count: number; reset: number }>();
const WINDOW_SEC = 3600;

/** true, wenn die Anfrage durchgelassen wird. Erst Redis (über Instanzen hinweg), sonst Speicher dieser Instanz. */
async function allow(bucket: string, ip: string, limit: number): Promise<boolean> {
  const key = `rankrent:rl:${bucket}:${createHash("sha256").update(ip).digest("hex").slice(0, 24)}`;
  const res = await kv([["INCR", key], ["EXPIRE", key, WINDOW_SEC, "NX"]]);
  if (res && typeof res[0]?.result === "number") return res[0].result <= limit;
  const now = Date.now();
  const hit = memoryHits.get(key);
  if (!hit || hit.reset < now) {
    memoryHits.set(key, { count: 1, reset: now + WINDOW_SEC * 1000 });
    return true;
  }
  hit.count++;
  return hit.count <= limit;
}

// ---- E-Mail (Resend) --------------------------------------------------------------------------------------------

export type Mail = { from: string; to: string[]; bcc?: string[]; reply_to?: string; subject: string; text: string };

async function sendMail(mail: Mail): Promise<{ ok: boolean; dry?: boolean }> {
  if (process.env.LEAD_DRY_RUN === "1") {
    console.log(`[rank-rent:dry-run] E-Mail\n${JSON.stringify(mail, null, 2)}`);
    return { ok: true, dry: true };
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[rank-rent] RESEND_API_KEY fehlt – E-Mail nicht gesendet");
    return { ok: false };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(mail),
    });
    if (!res.ok) console.error("[rank-rent] Resend-Fehler", res.status, await res.text().catch(() => ""));
    return { ok: res.ok };
  } catch (err) {
    console.error("[rank-rent] Resend nicht erreichbar:", err instanceof Error ? err.message : err);
    return { ok: false };
  }
}

const fromAddress = () => process.env.LEAD_FROM_EMAIL?.trim() || `${site.domain} <leads@${site.domain}>`;
const adminAddress = () => process.env.LEAD_ADMIN_EMAIL?.trim() || null;

// ---- Speicher ---------------------------------------------------------------------------------------------------

async function store(list: "leads" | "partner-requests", record: Json) {
  const res = await kv([["LPUSH", `rankrent:${list}`, JSON.stringify(record)]]);
  if (!res) {
    // Ohne Speicher bleibt die (BCC-)E-Mail das Archiv – im Log vermerken, damit es nicht unbemerkt bleibt
    console.warn(`[rank-rent] ${list}: kein Lead-Speicher konfiguriert (KV_REST_API_URL/-TOKEN), nur E-Mail`);
  }
}

// ---- Prüfung der themenspezifischen Felder ----------------------------------------------------------------------

function checkField(field: FormField, raw: unknown): { value?: string; error?: string } {
  const empty = raw === undefined || raw === null || raw === "" || (Array.isArray(raw) && raw.length === 0);
  if (empty) return field.required ? { error: `Bitte „${field.label}“ ausfüllen.` } : {};
  switch (field.type) {
    case "select": {
      const v = str(raw, 200);
      return field.options?.includes(v) ? { value: v } : { error: `Ungültige Auswahl bei „${field.label}“.` };
    }
    case "multiselect": {
      const arr = Array.isArray(raw) ? raw.map((x) => str(x, 200)) : [];
      return arr.length > 0 && arr.every((x) => field.options?.includes(x))
        ? { value: arr.join(", ") }
        : { error: `Ungültige Auswahl bei „${field.label}“.` };
    }
    case "number": {
      const n = Number(str(raw, 20).replace(",", "."));
      return Number.isFinite(n) && n >= 0 && n <= 10_000_000
        ? { value: String(n) }
        : { error: `Bitte eine gültige Zahl bei „${field.label}“ angeben.` };
    }
    case "date": {
      const v = str(raw, 10);
      return /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))
        ? { value: v }
        : { error: `Bitte ein gültiges Datum bei „${field.label}“ angeben.` };
    }
    case "boolean":
      return { value: raw === true || raw === "true" ? "Ja" : "Nein" };
    default:
      return { value: str(raw, 500) };
  }
}

// ---- Anfrage an einen Prüfbetrieb -------------------------------------------------------------------------------

export async function handleLead(body: Json, ip: string): Promise<Result> {
  // Spam: Honeypot gefüllt oder zu schnell abgeschickt → so tun, als sei alles gut gegangen
  if (str(body.website, 200) || Number(body.elapsed) < MIN_FILL_MS) return { ok: true, silent: true };
  if (!(await allow("lead", ip, 5))) return fail(429, "Zu viele Anfragen. Bitte versuchen Sie es später erneut.");

  const objekt = objektBySlug(str(body.objekt, 80));
  const landing = objekt && landingFor(objekt.slug, str(body.seite, 120));
  const bereich = landing && bereichBySlug(landing.pruefbereich);
  if (!objekt || !landing || !bereich) return fail(400, "Die Seite zur Anfrage wurde nicht gefunden.");

  const firma = str(body.firma, 160);
  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const telefon = str(body.telefon, 60);
  const plz = str(body.plz, 5);
  const nachricht = str(body.nachricht, 5000);
  if (!firma) return fail(400, "Bitte geben Sie Ihre Firma an.");
  if (!name) return fail(400, "Bitte geben Sie Ihren Namen an.");
  if (!EMAIL_RE.test(email)) return fail(400, "Bitte geben Sie eine gültige E-Mail-Adresse an.");
  if (!telefon) return fail(400, "Bitte geben Sie Ihre Telefonnummer an.");
  if (!/^\d{5}$/.test(plz)) return fail(400, "Bitte geben Sie eine fünfstellige Postleitzahl an.");
  if (body.consent !== true) return fail(400, "Bitte stimmen Sie der Weiterleitung Ihrer Anfrage zu.");

  const extra: [label: string, value: string][] = [];
  const extraRaw = (body.extra && typeof body.extra === "object" ? body.extra : {}) as Json;
  for (const field of bereich.formFields) {
    const r = checkField(field, extraRaw[field.name]);
    if (r.error) return fail(400, r.error);
    if (r.value !== undefined) extra.push([field.label, r.value]);
  }

  const { to, partner } = leadRecipient(landing.partnerSlotId);
  if (!to) {
    console.error("[rank-rent] Kein Empfänger: weder aktiver Partner noch LEAD_FALLBACK_EMAIL");
    return fail(500, "Die Anfrage kann derzeit nicht zugestellt werden. Bitte schreiben Sie uns direkt per E-Mail.");
  }

  const consentAt = new Date().toISOString();
  const url = `${site.url}${landingPath(landing)}`;
  const admin = adminAddress();
  const lines = [
    `Neue Anfrage über ${site.domain}`,
    "",
    `Seite: ${url}`,
    `Prüfbereich: ${bereich.name}`,
    `Objekt: ${objekt.name}`,
    `Partner-Slot: ${landing.partnerSlotId} (${partner ? `gemietet: ${partner.name}` : "nicht gemietet – Fallback"})`,
    "",
    `Firma: ${firma}`,
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${telefon}`,
    `PLZ: ${plz}`,
    ...extra.map(([l, v]) => `${l}: ${v}`),
    `Nachricht: ${nachricht || "–"}`,
    "",
    `Einwilligung zur Weiterleitung an einen Prüfbetrieb: ${consentAt}`,
  ];
  const mail: Mail = {
    from: fromAddress(),
    to: [to],
    ...(admin && admin.toLowerCase() !== to.toLowerCase() && { bcc: [admin] }),
    reply_to: email,
    subject: oneLine(`Anfrage ${bereich.name} – ${objekt.name} – ${firma}${partner ? "" : " [Fallback]"}`).slice(0, 200),
    text: lines.join("\n"),
  };

  const sent = await sendMail(mail);
  await store("leads", {
    id: randomUUID(),
    createdAt: consentAt,
    consentAt,
    page: landingPath(landing),
    partnerSlotId: landing.partnerSlotId,
    routedTo: partner ? "partner" : "fallback",
    recipient: to,
    emailStatus: sent.ok ? (sent.dry ? "dry-run" : "sent") : "failed",
    fields: { firma, name, email, telefon, plz, nachricht, ...Object.fromEntries(extra) },
  });
  if (!sent.ok) return fail(502, "Die Anfrage konnte nicht zugestellt werden. Bitte versuchen Sie es später erneut.");
  return { ok: true, dry: sent.dry };
}

// ---- Anfrage von Prüfbetrieben (Verfügbarkeit) ------------------------------------------------------------------

export async function handlePartnerRequest(body: Json, ip: string): Promise<Result> {
  if (str(body.website, 200) || Number(body.elapsed) < MIN_FILL_MS) return { ok: true, silent: true };
  if (!(await allow("partner", ip, 5))) return fail(429, "Zu viele Anfragen. Bitte versuchen Sie es später erneut.");

  const firma = str(body.firma, 160);
  const ansprechpartner = str(body.ansprechpartner, 120);
  const bereich = pruefbereiche.find((p) => p.slug === str(body.pruefbereich, 80));
  const einsatzgebiet = str(body.einsatzgebiet, 300);
  const email = str(body.email, 200);
  const telefon = str(body.telefon, 60);
  if (!firma) return fail(400, "Bitte geben Sie Ihre Firma an.");
  if (!ansprechpartner) return fail(400, "Bitte geben Sie einen Ansprechpartner an.");
  if (!bereich) return fail(400, "Bitte wählen Sie einen Prüfbereich.");
  if (!einsatzgebiet) return fail(400, "Bitte geben Sie Ihr Einsatzgebiet an.");
  if (!EMAIL_RE.test(email)) return fail(400, "Bitte geben Sie eine gültige E-Mail-Adresse an.");
  if (!telefon) return fail(400, "Bitte geben Sie Ihre Telefonnummer an.");
  if (body.consent !== true) return fail(400, "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.");

  const admin = adminAddress();
  if (!admin) {
    console.error("[rank-rent] LEAD_ADMIN_EMAIL fehlt – Partneranfrage nicht zustellbar");
    return fail(500, "Die Anfrage kann derzeit nicht zugestellt werden. Bitte schreiben Sie uns direkt per E-Mail.");
  }
  const consentAt = new Date().toISOString();
  const mail: Mail = {
    from: fromAddress(),
    to: [admin],
    reply_to: email,
    subject: oneLine(`Partneranfrage ${bereich.name} – ${firma}`).slice(0, 200),
    text: [
      `Verfügbarkeitsanfrage Exklusiv-Prüfpartner (${site.domain})`,
      "",
      `Firma: ${firma}`,
      `Ansprechpartner: ${ansprechpartner}`,
      `Prüfbereich: ${bereich.name}`,
      `Einsatzgebiet: ${einsatzgebiet}`,
      `E-Mail: ${email}`,
      `Telefon: ${telefon}`,
      "",
      `Einwilligung: ${consentAt}`,
    ].join("\n"),
  };
  const sent = await sendMail(mail);
  await store("partner-requests", {
    id: randomUUID(),
    createdAt: consentAt,
    consentAt,
    emailStatus: sent.ok ? (sent.dry ? "dry-run" : "sent") : "failed",
    fields: { firma, ansprechpartner, pruefbereich: bereich.slug, einsatzgebiet, email, telefon },
  });
  if (!sent.ok) return fail(502, "Die Anfrage konnte nicht zugestellt werden. Bitte versuchen Sie es später erneut.");
  return { ok: true, dry: sent.dry };
}
