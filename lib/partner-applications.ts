import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { allow, EMAIL_RE, oneLine, str, type Json, type Result } from "@/lib/leads";
import { partnerFormLive } from "@/lib/partner";
import { site } from "@/lib/site";
import type { Web3FormsPayload } from "@/lib/web3forms";

// Bewerbungen von Prüfbetrieben (operative Zusammenarbeit) – getrennt von Anfragen zum bezahlten Fachpartner-Programm.
// Speicher: mit DATABASE_URL Tabelle `partner_applications` (Neon/Vercel Postgres über HTTP-SQL, wie lib/store.ts) = Prüf-Warteschlange
// für /admin/partner. Ohne DATABASE_URL in Produktion: Weitergabe über den Kontaktformular-Weg (Web3Forms im Browser), kein Speicher.
// In der Entwicklung ersatzweise Datei .data/partner_applications.json.
// Offene Entscheidungen von Henryk: PARTNER_NOTIFY_EMAIL (Ziel), PARTNER_RETENTION_DAYS (Speicherdauer).

export type ApplicationStatus = "neu" | "geprueft" | "abgelehnt" | "freigegeben";
export const applicationStatuses: ApplicationStatus[] = ["neu", "geprueft", "abgelehnt", "freigegeben"];
export const applicationStatusLabel: Record<ApplicationStatus, string> = { neu: "neu", geprueft: "geprüft", abgelehnt: "abgelehnt", freigegeben: "freigegeben" };

export type PartnerApplication = {
  id: string;
  createdAt: string;
  sourcePage: string;
  company: string;
  contact: string;
  email: string;
  trades: string[];
  region: string;
  qualifications: string;
  capacity: string;
  message: string;
  consentAt: string;
  status: ApplicationStatus;
};

export const TRADES = ["Elektro (DGUV V3)", "Brandschutz", "RLT-Hygiene", "Trinkwasser", "Türen und Tore", "Regale"] as const;
export const SOURCE_PAGES = ["/fuer-pruefpartner", "/fuer-pruefpartner/rahmenvertraege", "/fuer-pruefpartner/dguv-v3", "/fuer-pruefpartner/subunternehmer"];
export const CONFIRMATION = "Danke für Ihre Registrierung. Die Registrierung ist keine automatische Freigabe – wir prüfen Ihre Angaben und melden uns.";

const FREEMAIL = new Set([
  "gmail.com", "googlemail.com", "gmx.de", "gmx.net", "gmx.at", "gmx.ch", "web.de", "t-online.de", "freenet.de", "yahoo.com", "yahoo.de",
  "outlook.com", "outlook.de", "hotmail.com", "hotmail.de", "live.com", "live.de", "msn.com", "icloud.com", "me.com", "mac.com", "aol.com",
  "aol.de", "posteo.de", "mailbox.org", "mail.de", "protonmail.com", "proton.me", "1und1.de", "online.de", "arcor.de", "email.de", "mail.com",
  "yandex.com", "zoho.com", "gmx.com", "tutanota.com", "tuta.io",
]);
export const isFreemail = (email: string) => FREEMAIL.has(email.split("@").pop()?.toLowerCase() ?? "");

// ---- Speicher ---------------------------------------------------------------------------------------------------

const dbUrl = process.env.DATABASE_URL;
const retentionDays = () => {
  const n = Number(process.env.PARTNER_RETENTION_DAYS);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
};
export const queueAvailable = Boolean(dbUrl) || process.env.NODE_ENV !== "production";

async function sql(query: string, params: unknown[] = []) {
  const host = new URL(dbUrl!).hostname;
  const res = await fetch(`https://${host}/sql`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Neon-Connection-String": dbUrl! },
    body: JSON.stringify({ query, params }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Datenbank ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()) as { rows: Record<string, unknown>[] };
}
let ready: Promise<unknown> | null = null;
const init = () =>
  (ready ??= sql(`CREATE TABLE IF NOT EXISTS partner_applications (
    id text PRIMARY KEY, created_at timestamptz NOT NULL, source_page text NOT NULL, company text NOT NULL, contact text NOT NULL,
    email text NOT NULL, trades text NOT NULL, region text NOT NULL, qualifications text, capacity text, message text,
    consent_at timestamptz NOT NULL, status text NOT NULL DEFAULT 'neu')`));

const file = join(process.cwd(), ".data", "partner_applications.json");
const readFile = (): PartnerApplication[] => (existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : []);
const writeFile = (d: PartnerApplication[]) => {
  mkdirSync(join(process.cwd(), ".data"), { recursive: true });
  writeFileSync(file, JSON.stringify(d, null, 2));
};

/** Löscht Bewerbungen nach Ablauf der Speicherdauer (nur wenn PARTNER_RETENTION_DAYS gesetzt ist) */
export async function purgeExpired() {
  const days = retentionDays();
  if (!days) return;
  const limit = new Date(Date.now() - days * 86_400_000).toISOString();
  if (dbUrl) {
    await init();
    await sql("DELETE FROM partner_applications WHERE created_at < $1", [limit]);
  } else if (process.env.NODE_ENV !== "production") writeFile(readFile().filter((a) => a.createdAt >= limit));
}

export async function saveApplication(a: PartnerApplication) {
  if (dbUrl) {
    await init();
    await sql(
      `INSERT INTO partner_applications (id, created_at, source_page, company, contact, email, trades, region, qualifications, capacity, message, consent_at, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [a.id, a.createdAt, a.sourcePage, a.company, a.contact, a.email, a.trades.join(", "), a.region, a.qualifications, a.capacity, a.message, a.consentAt, a.status],
    );
  } else writeFile([a, ...readFile()]);
  await purgeExpired();
}

export async function listApplications(): Promise<PartnerApplication[]> {
  await purgeExpired();
  if (dbUrl) {
    await init();
    const { rows } = await sql("SELECT * FROM partner_applications ORDER BY created_at DESC");
    const iso = (v: unknown) => new Date(v as string).toISOString();
    return rows.map((r) => ({
      id: r.id as string, createdAt: iso(r.created_at), sourcePage: r.source_page as string, company: r.company as string, contact: r.contact as string,
      email: r.email as string, trades: String(r.trades ?? "").split(", ").filter(Boolean), region: r.region as string,
      qualifications: (r.qualifications as string) ?? "", capacity: (r.capacity as string) ?? "", message: (r.message as string) ?? "",
      consentAt: iso(r.consent_at), status: r.status as ApplicationStatus,
    }));
  }
  if (process.env.NODE_ENV === "production") throw new Error("Kein Speicher konfiguriert (DATABASE_URL fehlt).");
  return readFile();
}

export async function setApplicationStatus(id: string, status: ApplicationStatus) {
  if (dbUrl) {
    await init();
    await sql("UPDATE partner_applications SET status = $1 WHERE id = $2", [status, id]);
  } else writeFile(readFile().map((a) => (a.id === id ? { ...a, status } : a)));
}

// ---- Annahme ----------------------------------------------------------------------------------------------------

const fail = (status: number, message: string): Result => ({ ok: false, status, message });

export async function handlePartnerApplication(body: Json, ip: string): Promise<Result> {
  // Feature-Flag PARTNER_FORM_ENABLED=true; ohne Flag nimmt der Endpunkt nichts an
  if (!partnerFormLive) return fail(404, "Das Formular ist noch nicht freigeschaltet.");
  if (str(body.website, 200) || Number(body.elapsed) < 3000) return { ok: true, silent: true };
  if (!(await allow("pruefpartner", ip, 5))) return fail(429, "Zu viele Anfragen. Bitte versuchen Sie es später erneut.");

  const sourcePage = SOURCE_PAGES.find((s) => s === str(body.sourcePage, 100));
  const company = str(body.company, 160);
  const contact = str(body.contact, 120);
  const email = str(body.email, 200);
  const trades = (Array.isArray(body.trades) ? body.trades : []).map((t) => str(t, 60)).filter((t): t is (typeof TRADES)[number] => (TRADES as readonly string[]).includes(t));
  const region = str(body.region, 300);
  const qualifications = str(body.qualifications, 1500);
  const capacity = str(body.capacity, 200);
  const message = str(body.message, 2000);
  if (!sourcePage) return fail(400, "Ungültige Quellseite.");
  if (!company) return fail(400, "Bitte geben Sie Ihr Unternehmen an.");
  if (!contact) return fail(400, "Bitte geben Sie eine Ansprechperson an.");
  if (!EMAIL_RE.test(email)) return fail(400, "Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse an.");
  if (isFreemail(email)) return fail(400, "Bitte verwenden Sie eine geschäftliche E-Mail-Adresse (keine Freemail-Adresse).");
  if (trades.length === 0) return fail(400, "Bitte wählen Sie mindestens ein Gewerk.");
  if (!region) return fail(400, "Bitte geben Sie Ihr Einsatzgebiet an (Region oder PLZ-Bereiche).");
  if (!qualifications) return fail(400, "Bitte beschreiben Sie Ihre Qualifikationen bzw. Nachweise.");
  if (!capacity) return fail(400, "Bitte geben Sie Ihre Kapazität an (z. B. Prüftage pro Monat).");
  if (body.consent !== true) return fail(400, "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.");

  const now = new Date().toISOString();
  const application: PartnerApplication = { id: randomUUID(), createdAt: now, sourcePage, company, contact, email, trades, region, qualifications, capacity, message, consentAt: now, status: "neu" };

  if (queueAvailable) {
    await saveApplication(application);
    return { ok: true };
  }
  // Ohne Datenbank (Produktion): Weitergabe über den Kontaktformular-Weg, Versand per Web3Forms im Browser
  const payload: Web3FormsPayload = {
    subject: oneLine(`Prüfpartner-Registrierung – ${company}`).slice(0, 200),
    from_name: site.domain,
    replyto: email,
    ...(process.env.PARTNER_NOTIFY_EMAIL && process.env.WEB3FORMS_PRO === "1" && { ccemail: process.env.PARTNER_NOTIFY_EMAIL }),
    message: [
      `Registrierung als Prüfpartner über ${sourcePage} (${site.domain})`, "", `Unternehmen: ${company}`, `Ansprechperson: ${contact}`, `E-Mail: ${email}`,
      `Gewerke: ${trades.join(", ")}`, `Einsatzgebiet: ${region}`, `Kapazität: ${capacity}`, `Qualifikationen/Nachweise: ${qualifications}`,
      ...(message ? ["", "Nachricht:", message] : []), "", `Einwilligung: ${now}`, "Status: neu (keine automatische Freigabe)",
    ].join("\n"),
  };
  if (process.env.LEAD_DRY_RUN === "1") {
    console.log(`[pruefpartner:dry-run] Web3Forms\n${JSON.stringify(payload, null, 2)}`);
    return { ok: true, dry: true };
  }
  return { ok: true, mail: payload };
}
