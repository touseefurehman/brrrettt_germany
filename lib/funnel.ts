import { clusterBySlug } from "@/lib/clusters";
import { sendMail } from "@/lib/mail";
import { measurementFor, measurementHistory } from "@/lib/measurement";
import { computeFindings, isFreemail, normDomain, type Findings } from "@/lib/nullmessung";
import { COMPARISON_STEP, confirmMail, day0, day14, day3, day30, day7, notifyMail, STEPS } from "@/lib/sequence";
import { site } from "@/lib/site";
import type { Web3FormsPayload } from "@/lib/web3forms";
import { deleteLead, getLeads, leadBy, logEvent, newId, newToken, saveLead, type Lead } from "@/lib/store";

export const ROLES = ["Geschäftsführung", "Marketing", "Vertrieb", "Sonstige"] as const;
const EMAIL_RE = /^[^\s@<>()"]+@[^\s@<>()"]+\.[A-Za-z]{2,}$/;
const DAY = 86_400_000;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\r/g, "").trim().slice(0, max) : "");

/** Messung des Clusters für Befunde: letzte echte Messung, sonst null (dann Warteliste) */
export const baselineFor = (cluster: string) => measurementFor(cluster);

export type CreateResult = { ok: true; status: "neu" | "warteliste" } | { ok: false; status: number; message: string };

export const FALLBACK_MESSAGE = "Danke – Ihre Nullmessung ist angefragt. Wir melden uns per E-Mail, sobald Ihr Befund vorliegt.";

/** Voller Ablauf (Speicher, Double-Opt-in, Folge) nur mit Datenbank UND Resend; in der Entwicklung immer (Datei-Speicher, Konsole) */
export const funnelReady =
  process.env.NODE_ENV !== "production" || Boolean(process.env.DATABASE_URL && process.env.RESEND_API_KEY);

type Valid = { company: string; domain: string; name: string; role: string; email: string; cluster: NonNullable<ReturnType<typeof clusterBySlug>> };

function validate(body: Record<string, unknown>): Valid | { ok: false; status: number; message: string } {
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

/**
 * Ausweichweg ohne Datenbank/Resend: dieselbe Zustellung wie das Kontaktformular auf /fachpartner (Web3Forms, Versand im Browser).
 * Die Route liefert die fertige Nachricht zurück; der Browser sendet sie ab.
 */
export function createFallback(body: Record<string, unknown>): { ok: true; mail: Web3FormsPayload } | { ok: false; status: number; message: string } {
  const v = validate(body);
  if (!("cluster" in v)) return v;
  return {
    ok: true,
    mail: {
      subject: `Nullmessung angefragt (${v.cluster.name}) – ${v.company}`.replace(/[\r\n]+/g, " ").slice(0, 200),
      from_name: site.domain,
      replyto: v.email,
      message: [
        `Nullmessung angefragt über ${site.domain} (ohne Datenbank, Ausweichweg)`,
        "",
        `Cluster: ${v.cluster.name} (${v.cluster.slug})`,
        `Firma: ${v.company}`,
        `Domain: ${v.domain}`,
        `Name: ${v.name}`,
        `Rolle: ${v.role}`,
        `E-Mail: ${v.email}`,
        "",
        `Einwilligung zur Verarbeitung: ${new Date().toISOString()}`,
      ].join("\n"),
    },
  };
}

export async function createRequest(body: Record<string, unknown>): Promise<CreateResult> {
  const v = validate(body);
  if (!("cluster" in v)) return v;
  const { company, domain, name, role, email, cluster } = v;

  const m = baselineFor(cluster.slug);
  const lead: Lead = {
    id: newId(),
    token: newToken(),
    confirmToken: newToken(),
    unsubToken: newToken(),
    cluster: cluster.slug,
    company,
    domain,
    name,
    role,
    email,
    status: m ? "neu" : "warteliste",
    source: "form",
    createdAt: new Date().toISOString(),
    confirmedAt: null,
    lastEmailStep: null,
    baselineMonth: m?.month ?? null,
    findingsJson: m ? computeFindings(m, company, domain) : null,
  };
  await saveLead(lead);
  await sendMail(confirmMail(lead, !m));
  await logEvent(lead.id, "email", m ? "Bestätigung" : "Warteliste");
  return { ok: true, status: lead.status === "warteliste" ? "warteliste" : "neu" };
}

/** Double-Opt-in-Klick: Befund freischalten, Tag-0-Mail senden, Henryk benachrichtigen */
export async function confirmLead(confirmToken: string): Promise<Lead | null> {
  const lead = await leadBy("confirmToken", confirmToken);
  if (!lead || lead.status === "abgemeldet") return null;
  if (lead.confirmedAt) return lead;
  lead.confirmedAt = new Date().toISOString();
  await logEvent(lead.id, "bestaetigung");
  if (lead.status === "neu") {
    lead.status = "bestaetigt";
    lead.lastEmailStep = 0;
    await sendMail(day0(lead));
    await logEvent(lead.id, "email", "Tag 0");
  }
  await saveLead(lead);
  if (process.env.NOTIFY_EMAIL) await sendMail(notifyMail(lead, (lead.findingsJson as Findings | null) ?? null));
  return lead;
}

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

export type CronReport = { sent: { lead: string; step: number }[]; promoted: string[]; deleted: number };

/**
 * Tägliche Verarbeitung. `now` ist in Produktion immer die aktuelle Zeit; nur in der Entwicklung darf die Route sie überschreiben.
 * - Unbestätigte Leads (Status neu) werden nach 30 Tagen gelöscht.
 * - Warteliste (bestätigt): sobald eine echte Messung vorliegt, Befund berechnen und Tag-0-Mail senden.
 * - Tag 3/7/14 für bestätigte Leads ohne Buchung; Tag 30 nur, wenn eine neuere Messung als die Nullmessung existiert.
 */
export async function runSequences(now: Date): Promise<CronReport> {
  const report: CronReport = { sent: [], promoted: [], deleted: 0 };
  for (const lead of await getLeads()) {
    if (lead.source === "form" && lead.status === "neu" && now.getTime() - Date.parse(lead.createdAt) > 30 * DAY) {
      await deleteLead(lead.id);
      report.deleted++;
      continue;
    }
    if (lead.status === "warteliste" && lead.confirmedAt) {
      const m = baselineFor(lead.cluster);
      if (m) {
        lead.findingsJson = computeFindings(m, lead.company, lead.domain);
        lead.baselineMonth = m.month;
        lead.status = "bestaetigt";
        lead.lastEmailStep = 0;
        lead.confirmedAt = now.toISOString();
        await saveLead(lead);
        await sendMail(day0(lead));
        await logEvent(lead.id, "email", "Tag 0 (nach Warteliste)");
        report.promoted.push(lead.id);
      }
      continue;
    }
    if (lead.source !== "form" || !lead.confirmedAt) continue;
    // Nach Buchung, Angebot, Partner oder Abmeldung keine Folge mehr (Tag 30 gilt nur für laufende Folge und Wartende)
    if (!["bestaetigt"].includes(lead.status)) continue;

    const days = Math.floor((now.getTime() - Date.parse(lead.confirmedAt)) / DAY);
    const last = lead.lastEmailStep ?? 0;
    const f = lead.findingsJson as Findings | null;
    if (!f) continue;

    const next = STEPS.find((s) => s > last && days >= s);
    if (next) {
      const mail = next === 3 ? day3(lead, f) : next === 7 ? day7(lead) : day14(lead);
      await sendMail(mail);
      lead.lastEmailStep = next;
      await saveLead(lead);
      await logEvent(lead.id, "email", `Tag ${next}`);
      report.sent.push({ lead: lead.id, step: next });
      continue; // höchstens eine Mail pro Lauf
    }
    if (last < COMPARISON_STEP && last >= STEPS[STEPS.length - 1] && days >= COMPARISON_STEP) {
      const newest = measurementHistory(lead.cluster)[0];
      if (newest && lead.baselineMonth && newest.month > lead.baselineMonth) {
        await sendMail(day30(lead, f, computeFindings(newest, lead.company, lead.domain)));
        lead.lastEmailStep = COMPARISON_STEP;
        await saveLead(lead);
        await logEvent(lead.id, "email", "Tag 30");
        report.sent.push({ lead: lead.id, step: COMPARISON_STEP });
      }
    }
  }
  return report;
}
