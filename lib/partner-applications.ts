import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { hasDatabase, sql } from "@/lib/db";
import { allow, EMAIL_RE, oneLine, str, type Json } from "@/lib/leads";
import { partnerFormLive } from "@/lib/partner";
import {
  CATEGORIES,
  CONSENT_VERSION,
  QUALIFICATIONS,
  REGIONS,
  SOURCE_PAGES,
  transitions,
  type ApplicationStatus,
  type Category,
} from "@/lib/partner-options";
import { isFreemail } from "@/lib/nullmessung";
import { baseUrl } from "@/lib/site";
import type { Web3FormsPayload } from "@/lib/web3forms";

// Bewerbungen von Prüfbetrieben (operative Zusammenarbeit) – getrennt von Anfragen zum bezahlten Fachpartner-Programm.
// Speicher: DATABASE_URL → Tabellen `partner_applications` und `partner_application_events` (Neon Postgres über lib/db.ts). In der Entwicklung ohne DATABASE_URL: Datei .data/partner_applications.json.
// In Produktion ohne DATABASE_URL: kein Speicher, die Bewerbung geht nur per Web3Forms ins Postfach (Hinweis in /admin/partner).
// Versand: ausschließlich Web3Forms aus dem Browser (NEXT_PUBLIC_WEB3FORMS_PARTNER_KEY). Freitexte gehen nicht in die E-Mail.
// Speicherdauer: PARTNER_RETENTION_DAYS (Standard 365) ab dem letzten Statuswechsel; „aktiv“ wird nicht gelöscht.

export type Web3FormsStatus = "sent" | "error";

export type PartnerApplication = {
  id: string;
  createdAt: string;
  updatedAt: string;
  statusChangedAt: string;
  status: ApplicationStatus;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  categories: string[];
  regions: string[];
  plzAreas: string;
  /** Selbstauskunft: angehakte Qualifikationen als „Kategorie: Qualifikation“ */
  qualifications: string[];
  qualificationsText: string;
  capacityDays: number;
  mobileTeams: number;
  message: string;
  sourcePage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  referrer: string;
  consentAt: string;
  consentTextVersion: string;
  approvedBy: string | null;
  approvedAt: string | null;
  notes: string;
  deleteAfter: string | null;
  web3formsStatus: Web3FormsStatus | null;
};

export type EventType = "eingang" | "status" | "freigabe" | "notiz" | "web3forms" | "loeschung";
/** Ereignis. Löschungen werden ohne Bewerbungs-ID und ohne personenbezogene Daten protokolliert (applicationId = null). */
export type ApplicationEvent = { id: string; applicationId: string | null; createdAt: string; type: EventType; detail: string };

const DAY = 86_400_000;
export const retentionDays = () => {
  const n = Number(process.env.PARTNER_RETENTION_DAYS);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 365;
};
/** Löschdatum: Speicherfrist ab letztem Statuswechsel; aktive Partner werden während der Partnerschaft nicht gelöscht */
export const deleteAfterFor = (status: ApplicationStatus, statusChangedAt: string) =>
  status === "aktiv" ? null : new Date(Date.parse(statusChangedAt) + retentionDays() * DAY).toISOString();

// ---- Speicher ---------------------------------------------------------------------------------------------------

interface Backend {
  all(): Promise<PartnerApplication[]>;
  save(a: PartnerApplication): Promise<void>;
  remove(id: string): Promise<void>;
  events(): Promise<ApplicationEvent[]>;
  addEvent(e: ApplicationEvent): Promise<void>;
}

const COLS = [
  "id", "created_at", "updated_at", "status_changed_at", "status", "company", "contact_name", "email", "phone", "categories", "regions",
  "plz_areas", "qualifications", "capacity_days", "mobile_teams", "message", "source_page", "utm_source", "utm_medium", "utm_campaign",
  "utm_term", "utm_content", "referrer", "consent_at", "consent_text_version", "approved_by", "approved_at", "notes", "delete_after",
  "web3forms_status",
] as const;

function sqlBackend(): Backend {
  const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
  const s = (v: unknown) => (v == null ? "" : String(v));
  return {
    async all() {
      const { rows } = await sql("SELECT * FROM partner_applications ORDER BY created_at DESC");
      return rows.map((r) => {
        const q = (r.qualifications ?? {}) as { items?: string[]; text?: string };
        return {
          id: s(r.id), createdAt: iso(r.created_at)!, updatedAt: iso(r.updated_at)!, statusChangedAt: iso(r.status_changed_at)!,
          status: r.status as ApplicationStatus, company: s(r.company), contactName: s(r.contact_name), email: s(r.email), phone: s(r.phone),
          categories: (r.categories as string[]) ?? [], regions: (r.regions as string[]) ?? [], plzAreas: s(r.plz_areas),
          qualifications: q.items ?? [], qualificationsText: q.text ?? "", capacityDays: Number(r.capacity_days), mobileTeams: Number(r.mobile_teams),
          message: s(r.message), sourcePage: s(r.source_page), utmSource: s(r.utm_source), utmMedium: s(r.utm_medium),
          utmCampaign: s(r.utm_campaign), utmTerm: s(r.utm_term), utmContent: s(r.utm_content), referrer: s(r.referrer),
          consentAt: iso(r.consent_at)!, consentTextVersion: s(r.consent_text_version), approvedBy: (r.approved_by as string) ?? null,
          approvedAt: iso(r.approved_at), notes: s(r.notes), deleteAfter: iso(r.delete_after),
          web3formsStatus: (r.web3forms_status as Web3FormsStatus) ?? null,
        };
      });
    },
    async save(a) {
      const values = [
        a.id, a.createdAt, a.updatedAt, a.statusChangedAt, a.status, a.company, a.contactName, a.email, a.phone, JSON.stringify(a.categories),
        JSON.stringify(a.regions), a.plzAreas, JSON.stringify({ items: a.qualifications, text: a.qualificationsText }), a.capacityDays,
        a.mobileTeams, a.message, a.sourcePage, a.utmSource, a.utmMedium, a.utmCampaign, a.utmTerm, a.utmContent, a.referrer, a.consentAt,
        a.consentTextVersion, a.approvedBy, a.approvedAt, a.notes, a.deleteAfter, a.web3formsStatus,
      ];
      const mutable = ["updated_at", "status_changed_at", "status", "approved_by", "approved_at", "notes", "delete_after", "web3forms_status"];
      await sql(
        `INSERT INTO partner_applications (${COLS.join(", ")}) VALUES (${COLS.map((_, i) => `$${i + 1}`).join(",")})
         ON CONFLICT (id) DO UPDATE SET ${mutable.map((c) => `${c}=EXCLUDED.${c}`).join(", ")}`,
        values,
      );
    },
    async remove(id) {
      await sql("DELETE FROM partner_application_events WHERE application_id = $1", [id]);
      await sql("DELETE FROM partner_applications WHERE id = $1", [id]);
    },
    async events() {
      const { rows } = await sql("SELECT * FROM partner_application_events ORDER BY created_at DESC LIMIT 5000");
      return rows.map((r) => ({
        id: s(r.id), applicationId: (r.application_id as string) ?? null, createdAt: iso(r.created_at)!, type: r.type as EventType, detail: s(r.detail),
      }));
    },
    async addEvent(e) {
      await sql("INSERT INTO partner_application_events (id, application_id, created_at, type, detail) VALUES ($1,$2,$3,$4,$5)", [
        e.id, e.applicationId, e.createdAt, e.type, e.detail,
      ]);
    },
  };
}

function fileBackend(): Backend {
  const file = join(process.cwd(), ".data", "partner_applications.json");
  type Data = { applications: PartnerApplication[]; events: ApplicationEvent[] };
  const read = (): Data => {
    if (!existsSync(file)) return { applications: [], events: [] };
    const d = JSON.parse(readFileSync(file, "utf8"));
    return Array.isArray(d) ? { applications: [], events: [] } : (d as Data); // Format des früheren Formulars ignorieren
  };
  const write = (d: Data) => {
    mkdirSync(join(process.cwd(), ".data"), { recursive: true });
    writeFileSync(file, JSON.stringify(d, null, 2));
  };
  return {
    async all() {
      return read().applications.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async save(a) {
      const d = read();
      const i = d.applications.findIndex((x) => x.id === a.id);
      if (i >= 0) d.applications[i] = a;
      else d.applications.push(a);
      write(d);
    },
    async remove(id) {
      const d = read();
      write({ applications: d.applications.filter((a) => a.id !== id), events: d.events.filter((e) => e.applicationId !== id) });
    },
    async events() {
      return read().events.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async addEvent(e) {
      const d = read();
      d.events.push(e);
      write(d);
    },
  };
}

const backend: Backend | null = hasDatabase ? sqlBackend() : process.env.NODE_ENV !== "production" ? fileBackend() : null;
/** true, wenn Bewerbungen gespeichert werden (Datenbank oder Entwicklungs-Datei) */
export const queueAvailable = backend !== null;

function need(): Backend {
  if (!backend) throw new Error("Kein Speicher konfiguriert (DATABASE_URL fehlt).");
  return backend;
}

async function log(applicationId: string | null, type: EventType, detail = "") {
  await need().addEvent({ id: randomUUID(), applicationId, createdAt: new Date().toISOString(), type, detail });
}

export const listApplications = () => need().all();
export const getApplication = async (id: string) => (id ? ((await need().all()).find((a) => a.id === id) ?? null) : null);
export const applicationEvents = async (id: string) => (await need().events()).filter((e) => e.applicationId === id);
export const deletionLog = async () => (await need().events()).filter((e) => e.type === "loeschung");

// ---- Admin-Aktionen ---------------------------------------------------------------------------------------------

type ActionResult = { ok: true } | { ok: false; message: string };

function withStatus(a: PartnerApplication, status: ApplicationStatus): PartnerApplication {
  const now = new Date().toISOString();
  return { ...a, status, statusChangedAt: now, updatedAt: now, deleteAfter: deleteAfterFor(status, now) };
}

export async function setApplicationStatus(id: string, status: ApplicationStatus, actor: string): Promise<ActionResult> {
  const a = await getApplication(id);
  if (!a) return { ok: false, message: "Bewerbung nicht gefunden." };
  if (!transitions[a.status].includes(status)) return { ok: false, message: `Wechsel ${a.status} → ${status} ist nicht erlaubt.` };
  await need().save(withStatus(a, status));
  await log(id, "status", `${a.status} → ${status} (${actor})`);
  return { ok: true };
}

/** Manuelle Freigabe: nur aus „qualifiziert“; setzt approved_by/approved_at */
export async function approveApplication(id: string, actor: string): Promise<ActionResult> {
  const a = await getApplication(id);
  if (!a) return { ok: false, message: "Bewerbung nicht gefunden." };
  if (a.status !== "qualifiziert") return { ok: false, message: "Freigeben ist nur aus dem Status „Qualifiziert“ möglich." };
  const next = withStatus(a, "aktiv");
  await need().save({ ...next, approvedBy: actor, approvedAt: next.statusChangedAt });
  await log(id, "freigabe", `qualifiziert → aktiv (freigegeben von ${actor})`);
  return { ok: true };
}

export async function setApplicationNotes(id: string, notes: string, actor: string): Promise<ActionResult> {
  const a = await getApplication(id);
  if (!a) return { ok: false, message: "Bewerbung nicht gefunden." };
  await need().save({ ...a, notes: notes.slice(0, 5000), updatedAt: new Date().toISOString() });
  await log(id, "notiz", `Notiz geändert (${actor})`);
  return { ok: true };
}

/** Endgültig löschen. Protokoll ohne ID und ohne personenbezogene Daten. */
export async function deleteApplication(id: string, reason: "manuell" | "Speicherfrist", actor?: string): Promise<ActionResult> {
  const a = await getApplication(id);
  if (!a) return { ok: false, message: "Bewerbung nicht gefunden." };
  await need().remove(id);
  await log(null, "loeschung", `Bewerbung gelöscht (${reason}${actor ? `, ${actor}` : ""}; Status: ${a.status}; Eingang: ${a.createdAt.slice(0, 7)})`);
  return { ok: true };
}

/** Tägliche Bereinigung: löscht Bewerbungen, deren Löschdatum erreicht ist. `now` nur in der Entwicklung verschiebbar. */
export async function purgeExpired(now: Date = new Date()): Promise<number> {
  if (!backend) return 0;
  let n = 0;
  for (const a of await need().all()) {
    if (a.status !== "aktiv" && a.deleteAfter && Date.parse(a.deleteAfter) <= now.getTime()) {
      await deleteApplication(a.id, "Speicherfrist");
      n++;
    }
  }
  return n;
}

// ---- Annahme (öffentlich) ---------------------------------------------------------------------------------------

export type CreateResult =
  | { ok: true; silent?: boolean; id?: string; stored?: boolean; mail?: Web3FormsPayload }
  | { ok: false; status: number; message: string };
const fail = (status: number, message: string): CreateResult => ({ ok: false, status, message });

const list = (v: unknown, allowed: readonly string[]) =>
  [...new Set((Array.isArray(v) ? v : []).map((x) => str(x, 120)).filter((x) => allowed.includes(x)))];
const int = (v: unknown) => (typeof v === "number" ? v : typeof v === "string" && /^\d+$/.test(v.trim()) ? Number(v) : NaN);
/** Referrer nur als Ursprung + Pfad (keine Query-Parameter, damit keine personenbezogenen Daten mitkommen) */
function cleanReferrer(v: unknown): string {
  try {
    const u = new URL(str(v, 500));
    return u.protocol.startsWith("http") ? `${u.origin}${u.pathname}`.slice(0, 300) : "";
  } catch {
    return "";
  }
}

export async function handlePartnerApplication(body: Json, ip: string): Promise<CreateResult> {
  // Feature-Flag PARTNER_FORM_ENABLED=true und Web3Forms-Key; ohne beides nimmt der Endpunkt nichts an
  if (!partnerFormLive) return fail(404, "Das Formular ist noch nicht freigeschaltet.");
  if (body.botcheck === true || str(body.botcheck, 10) || Number(body.elapsed) < 3000) return { ok: true, silent: true };
  if (!(await allow("pruefpartner", ip, 5))) return fail(429, "Zu viele Anfragen. Bitte versuchen Sie es später erneut.");

  const sourcePage = SOURCE_PAGES.find((s) => s === str(body.sourcePage, 100));
  const company = str(body.company, 160);
  const contactName = str(body.contactName, 120);
  const email = str(body.email, 200).toLowerCase();
  const phone = str(body.phone, 40);
  const categories = list(body.categories, CATEGORIES) as Category[];
  const regions = list(body.regions, REGIONS);
  const plzAreas = str(body.plzAreas, 300);
  const allQuals = categories.flatMap((c) => QUALIFICATIONS[c].map((q) => `${c}: ${q}`));
  const qualifications = list(body.qualifications, allQuals);
  const qualificationsText = str(body.qualificationsText, 1500);
  const capacityDays = int(body.capacityDays);
  const mobileTeams = int(body.mobileTeams);
  const message = str(body.message, 2000);

  if (!sourcePage) return fail(400, "Ungültige Quellseite.");
  if (!company) return fail(400, "Bitte geben Sie Ihr Unternehmen an.");
  if (!contactName) return fail(400, "Bitte geben Sie eine Ansprechperson an.");
  if (!EMAIL_RE.test(email)) return fail(400, "Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse an.");
  if (isFreemail(email)) return fail(400, "Bitte verwenden Sie eine geschäftliche E-Mail-Adresse (keine Freemail-Adresse).");
  if (phone && !/^[+\d][\d\s/()-]{4,}$/.test(phone)) return fail(400, "Bitte prüfen Sie die Telefonnummer.");
  if (categories.length === 0) return fail(400, "Bitte wählen Sie mindestens eine Kategorie.");
  if (regions.length === 0) return fail(400, "Bitte wählen Sie mindestens eine Region (Bundesland oder bundesweit).");
  if (!Number.isInteger(capacityDays) || capacityDays < 1 || capacityDays > 1000) return fail(400, "Bitte geben Sie Ihre Kapazität in Prüftagen pro Monat an.");
  if (!Number.isInteger(mobileTeams) || mobileTeams < 1 || mobileTeams > 500) return fail(400, "Bitte geben Sie die Anzahl Ihrer mobilen Teams an.");
  if (body.consent !== true) return fail(400, "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.");

  const now = new Date().toISOString();
  const a: PartnerApplication = {
    id: randomUUID(), createdAt: now, updatedAt: now, statusChangedAt: now, status: "neu", company, contactName, email, phone,
    categories, regions, plzAreas, qualifications, qualificationsText, capacityDays, mobileTeams, message, sourcePage,
    utmSource: str(body.utm_source, 100), utmMedium: str(body.utm_medium, 100), utmCampaign: str(body.utm_campaign, 150),
    utmTerm: str(body.utm_term, 150), utmContent: str(body.utm_content, 150), referrer: cleanReferrer(body.referrer),
    consentAt: now, consentTextVersion: CONSENT_VERSION, approvedBy: null, approvedAt: null, notes: "",
    deleteAfter: deleteAfterFor("neu", now), web3formsStatus: null,
  };

  if (process.env.LEAD_DRY_RUN === "1") console.log(`[pruefpartner:dry-run]\n${JSON.stringify(partnerMail(a, Boolean(backend)), null, 2)}`);
  if (backend) {
    await need().save(a);
    await log(a.id, "eingang", `Eingang über ${sourcePage}`);
  }
  return { ok: true, id: a.id, stored: Boolean(backend), mail: partnerMail(a, Boolean(backend)) };
}

/**
 * Benachrichtigung über Web3Forms. Enthält bewusst KEINE Freitexte (Qualifikationen, Nachricht) – die stehen nur im Admin-Bereich.
 * Das Feld `email` ist Pflicht für den Web3Forms-Autoresponder (Bestätigung an den Bewerber).
 */
export function partnerMail(a: PartnerApplication, stored: boolean): Web3FormsPayload {
  const utm = [["source", a.utmSource], ["medium", a.utmMedium], ["campaign", a.utmCampaign], ["term", a.utmTerm], ["content", a.utmContent]]
    .filter(([, v]) => v)
    .map(([k, v]) => `utm_${k}=${v}`)
    .join("; ");
  return {
    subject: oneLine(`Neue Prüfpartner-Bewerbung: ${a.company} – ${a.categories.join(", ")}`).slice(0, 200),
    from_name: "betreibermanager.de Prüfpartner",
    replyto: a.email,
    email: a.email,
    name: a.contactName,
    Unternehmen: a.company,
    Kategorien: a.categories.join(", "),
    Regionen: a.regions.join(", ") + (a.plzAreas ? ` · PLZ-Bereiche: ${a.plzAreas}` : ""),
    Kapazität: `${a.capacityDays} Prüftage pro Monat, ${a.mobileTeams} mobile Team(s)`,
    Quellseite: a.sourcePage,
    UTM: utm || "–",
    "Bewerbungs-ID": a.id,
    "Admin-Bereich": stored ? `${baseUrl()}/admin/partner/${a.id}` : "nicht gespeichert (DATABASE_URL fehlt) – Freitexte liegen nicht vor",
  };
}

/** Ergebnis des Web3Forms-Versands (einmalig je Bewerbung, danach unveränderlich) */
export async function recordWeb3FormsResult(id: string, result: unknown): Promise<CreateResult> {
  if (!partnerFormLive) return fail(404, "Das Formular ist noch nicht freigeschaltet.");
  if (result !== "sent" && result !== "error") return fail(400, "Ungültiges Ergebnis.");
  if (!backend) return { ok: true };
  const a = await getApplication(id);
  if (!a) return fail(404, "Bewerbung nicht gefunden.");
  if (a.web3formsStatus) return { ok: true };
  await need().save({ ...a, web3formsStatus: result, updatedAt: new Date().toISOString() });
  await log(id, "web3forms", result === "sent" ? "Web3Forms: gesendet" : "Web3Forms: Fehler beim Versand");
  return { ok: true };
}
