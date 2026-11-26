import { clusterBySlug } from "@/lib/clusters";
import { measurementFor } from "@/lib/measurement";
import { computeFindings, isFreemail, normDomain } from "@/lib/nullmessung";
import { baseUrl, site } from "@/lib/site";
import type { Web3FormsPayload } from "@/lib/web3forms";
import { deleteLead, getLeads, leadBy, logEvent, newId, newToken, saveLead, storeConfigured, type Lead } from "@/lib/store";

// Nullmessung: Die Anfrage wird gespeichert (DATABASE_URL; in der Entwicklung Datei-Speicher) und per Web3Forms an Henryk gemeldet.
// Kein Double-Opt-in, keine automatische E-Mail-Folge. Den Befund (/befund/<token>) sendet Henryk persönlich aus /admin/leads.

export const ROLES = ["Geschäftsführung", "Marketing", "Vertrieb", "Sonstige"] as const;
const EMAIL_RE = /^[^\s@<>()"]+@[^\s@<>()"]+\.[A-Za-z]{2,}$/;
const DAY = 86_400_000;
/** Unbearbeitete Anfragen (Status „neu“) werden so viele Tage nach Bereitstellung des Befunds gelöscht */
export const UNPROCESSED_RETENTION_DAYS = 30;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\r/g, "").trim().slice(0, max) : "");

/** Messung des Clusters für Befunde: letzte echte Messung, sonst null (dann Warteliste) */
export const baselineFor = (cluster: string) => measurementFor(cluster);

export const CONFIRMATION = "Danke – Ihre Nullmessung ist angefragt. Wir prüfen Ihre Angaben und senden Ihnen den Befund persönlich per E-Mail.";

type Valid = { company: string; domain: string; name: string; role: string; email: string; cluster: NonNullable<ReturnType<typeof clusterBySlug>> };
type Fail = { ok: false; status: number; message: string };
export type CreateResult = { ok: true; stored: boolean; waitlist: boolean; mail: Web3FormsPayload } | Fail;

function validate(body: Record<string, unknown>): Valid | Fail {
  const company = str(body.company, 160);
  const domain = normDomain(str(body.domain, 200));
  const name = str(body.name, 120);
  const role = str(body.role, 40);
  const email = str(body.email, 200).toLowerCase();
  const cluster = clusterBySlug(str(body.cluster, 60));
  if (!cluster) return { ok: false, status: 400, message: "Dieser Prüfbereich ist noch nicht verfügbar." };
  if (!company) return { ok: false, status: 400, message: "Bitte geben Sie den Firmennamen an." };
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain)) return { ok: false, status: 400, message: "Bitte geben Sie eine gültige Website bzw. Domain an." };
  if (name.split(/\s+/).filter(Boolean).length < 2) return { ok: false, status: 400, message: "Bitte geben Sie Vor- und Nachnamen an." };
  if (!(ROLES as readonly string[]).includes(role)) return { ok: false, status: 400, message: "Bitte wählen Sie Ihre Rolle." };
  if (!EMAIL_RE.test(email)) return { ok: false, status: 400, message: "Bitte geben Sie eine gültige E-Mail-Adresse an." };
  if (isFreemail(email)) return { ok: false, status: 400, message: "Bitte nutzen Sie Ihre geschäftliche E-Mail-Adresse." };
  if (body.consent !== true) return { ok: false, status: 400, message: "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu." };
  return { company, domain, name, role, email, cluster };
}

/** Benachrichtigung an Henryk (Web3Forms, Versand im Browser). Der Befund-Link steht nur im Admin-Bereich, nicht in der E-Mail. */
function notification(v: Valid, stored: boolean, waitlist: boolean): Web3FormsPayload {
  return {
    subject: `Nullmessung angefragt (${v.cluster.name}) – ${v.company}`.replace(/[\r\n]+/g, " ").slice(0, 200),
    from_name: site.domain,
    replyto: v.email,
    message: [
      `Nullmessung angefragt über ${site.domain}`,
      "",
      `Cluster: ${v.cluster.name} (${v.cluster.slug})`,
      `Firma: ${v.company}`,
      `Domain: ${v.domain}`,
      `Name: ${v.name}`,
      `Rolle: ${v.role}`,
      `E-Mail: ${v.email}`,
      "",
      stored
        ? waitlist
          ? `Warteliste (noch keine Messung für diesen Prüfbereich) – der Befund erscheint nach der nächsten Messung in ${baseUrl()}/admin/leads`
          : `Befund liegt vor – Befund-Link kopieren und persönlich senden: ${baseUrl()}/admin/leads`
        : "Ohne Datenbank: nicht gespeichert, kein Befund erzeugt.",
      `Einwilligung zur Verarbeitung: ${new Date().toISOString()}`,
    ].join("\n"),
  };
}

export async function createRequest(body: Record<string, unknown>): Promise<CreateResult> {
  const v = validate(body);
  if (!("cluster" in v)) return v;
  const m = baselineFor(v.cluster.slug);
  if (!storeConfigured) return { ok: true, stored: false, waitlist: !m, mail: notification(v, false, !m) };

  const now = new Date().toISOString();
  const lead: Lead = {
    id: newId(),
    token: newToken(),
    confirmToken: newToken(),
    unsubToken: newToken(),
    cluster: v.cluster.slug,
    company: v.company,
    domain: v.domain,
    name: v.name,
    role: v.role,
    email: v.email,
    status: m ? "neu" : "warteliste",
    source: "form",
    createdAt: now,
    // Seit der Umstellung ohne Double-Opt-in: Zeitpunkt, ab dem der Befund bereitsteht
    confirmedAt: m ? now : null,
    lastEmailStep: null,
    baselineMonth: m?.month ?? null,
    findingsJson: m ? computeFindings(m, v.company, v.domain) : null,
  };
  await saveLead(lead);
  await logEvent(lead.id, "status", m ? "angefragt (Befund bereit)" : "angefragt (Warteliste)");
  return { ok: true, stored: true, waitlist: !m, mail: notification(v, true, !m) };
}

/** Abmeldelinks aus früher versandten E-Mails bleiben gültig */
export async function unsubscribe(unsubToken: string): Promise<boolean> {
  const lead = await leadBy("unsubToken", unsubToken);
  if (!lead) return false;
  if (lead.status !== "abgemeldet") {
    lead.status = "abgemeldet";
    await saveLead(lead);
    await logEvent(lead.id, "abmeldung");
  }
  return true;
}

export type CleanupReport = { promoted: string[]; deleted: number };

/**
 * Tägliche Bereinigung (kein E-Mail-Versand).
 * - Anfragen im Status „neu“ (Befund nie versendet) werden 30 Tage nach Bereitstellung des Befunds gelöscht.
 * - Warteliste: Sobald eine echte Messung vorliegt, wird der Befund berechnet; Henryk sieht ihn in /admin/leads.
 */
export async function runLeadCleanup(now: Date): Promise<CleanupReport> {
  const report: CleanupReport = { promoted: [], deleted: 0 };
  for (const lead of await getLeads()) {
    if (lead.source !== "form") continue;
    const since = Date.parse(lead.confirmedAt ?? lead.createdAt);
    if (lead.status === "neu" && now.getTime() - since > UNPROCESSED_RETENTION_DAYS * DAY) {
      await deleteLead(lead.id);
      report.deleted++;
      continue;
    }
    if (lead.status === "warteliste") {
      const m = baselineFor(lead.cluster);
      if (!m) continue;
      lead.findingsJson = computeFindings(m, lead.company, lead.domain);
      lead.baselineMonth = m.month;
      lead.status = "neu";
      lead.confirmedAt = now.toISOString();
      await saveLead(lead);
      await logEvent(lead.id, "status", "warteliste → neu (Befund bereit)");
      report.promoted.push(lead.id);
    }
  }
  return report;
}
