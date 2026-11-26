import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Lead-Speicher. Mit DATABASE_URL: Neon/Vercel Postgres über die HTTP-SQL-Schnittstelle (nur fetch, kein Paket).
// Ohne DATABASE_URL (nur Entwicklung): Datei .data/store.json. In Produktion ohne Datenbank wird nichts gespeichert.

export type LeadStatus = "neu" | "bestaetigt" | "warteliste" | "gebucht" | "angebot" | "partner" | "abgemeldet";
export const leadStatuses: LeadStatus[] = ["neu", "bestaetigt", "warteliste", "gebucht", "angebot", "partner", "abgemeldet"];
export const statusLabel: Record<LeadStatus, string> = {
  neu: "neu (Befund noch nicht gesendet)",
  bestaetigt: "Befund gesendet",
  warteliste: "Warteliste",
  gebucht: "Gespräch gebucht",
  angebot: "Angebot",
  partner: "Partner",
  abgemeldet: "abgemeldet",
};

export type Lead = {
  id: string;
  /** Token der Befundseite (/befund/<token>) */
  token: string;
  confirmToken: string;
  unsubToken: string;
  cluster: string;
  company: string;
  domain: string;
  name: string;
  role: string;
  email: string;
  status: LeadStatus;
  /** "form" = Nullmessung angefordert; "outbound" = vorab erzeugte Befundseite, kein E-Mail-Versand */
  source: "form" | "outbound";
  createdAt: string;
  /** Zeitpunkt, ab dem der Befund bereitsteht (Altbestand: Double-Opt-in-Bestätigung) */
  confirmedAt: string | null;
  /** Nur Altbestand: letzter Schritt der früheren automatischen Mail-Folge; wird nicht mehr gesetzt */
  lastEmailStep: number | null;
  /** Messmonat der Nullmessung (Basis für den Vergleich an Tag 30) */
  baselineMonth: string | null;
  findingsJson: unknown | null;
};

export type EventType = "email" | "click" | "buchung" | "status" | "abmeldung" | "bestaetigung";
export type LeadEvent = { id: string; leadId: string; type: EventType; detail: string; createdAt: string };

// Frühere Cluster-Slugs auf den heutigen abbilden (kein Datenverlust bei der Umstellung auf 6 Prüfbereiche)
const LEGACY: Record<string, string> = { pruefdienste: "dguv-v3" };
const migrate = (l: Lead): Lead => (LEGACY[l.cluster] ? { ...l, cluster: LEGACY[l.cluster] } : l);

export const newToken = () => randomBytes(24).toString("base64url");
export const newId = () => randomBytes(12).toString("hex");

// ---- Backends ---------------------------------------------------------------------------------------------------

interface Backend {
  leads(): Promise<Lead[]>;
  saveLead(l: Lead): Promise<void>;
  deleteLead(id: string): Promise<void>;
  events(): Promise<LeadEvent[]>;
  addEvent(e: LeadEvent): Promise<void>;
}

const dbUrl = process.env.DATABASE_URL;

function sqlBackend(url: string): Backend {
  const host = new URL(url).hostname;
  async function sql(query: string, params: unknown[] = []) {
    const res = await fetch(`https://${host}/sql`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Neon-Connection-String": url },
      body: JSON.stringify({ query, params }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Datenbank ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return (await res.json()) as { rows: Record<string, unknown>[] };
  }
  let ready: Promise<unknown> | null = null;
  const init = () =>
    (ready ??= (async () => {
      await sql(`CREATE TABLE IF NOT EXISTS leads (
        id text PRIMARY KEY, token text UNIQUE NOT NULL, confirm_token text, unsub_token text, cluster text NOT NULL,
        company text, domain text, name text, role text, email text, status text NOT NULL, source text NOT NULL DEFAULT 'form',
        created_at timestamptz NOT NULL, confirmed_at timestamptz, last_email_step int, baseline_month text, findings_json jsonb)`);
      await sql(`CREATE TABLE IF NOT EXISTS events (
        id text PRIMARY KEY, lead_id text NOT NULL, type text NOT NULL, detail text, created_at timestamptz NOT NULL)`);
    })());
  const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
  return {
    async leads() {
      await init();
      const { rows } = await sql("SELECT * FROM leads ORDER BY created_at DESC");
      return rows.map((r) => ({
        id: r.id as string,
        token: r.token as string,
        confirmToken: r.confirm_token as string,
        unsubToken: r.unsub_token as string,
        cluster: r.cluster as string,
        company: r.company as string,
        domain: r.domain as string,
        name: r.name as string,
        role: r.role as string,
        email: r.email as string,
        status: r.status as LeadStatus,
        source: r.source as "form" | "outbound",
        createdAt: iso(r.created_at)!,
        confirmedAt: iso(r.confirmed_at),
        lastEmailStep: (r.last_email_step as number | null) ?? null,
        baselineMonth: (r.baseline_month as string | null) ?? null,
        findingsJson: r.findings_json ?? null,
      }));
    },
    async saveLead(l) {
      await init();
      await sql(
        `INSERT INTO leads (id, token, confirm_token, unsub_token, cluster, company, domain, name, role, email, status, source, created_at, confirmed_at, last_email_step, baseline_month, findings_json)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
         ON CONFLICT (id) DO UPDATE SET status=EXCLUDED.status, confirmed_at=EXCLUDED.confirmed_at, last_email_step=EXCLUDED.last_email_step,
           baseline_month=EXCLUDED.baseline_month, findings_json=EXCLUDED.findings_json`,
        [l.id, l.token, l.confirmToken, l.unsubToken, l.cluster, l.company, l.domain, l.name, l.role, l.email, l.status, l.source,
          l.createdAt, l.confirmedAt, l.lastEmailStep, l.baselineMonth, JSON.stringify(l.findingsJson)],
      );
    },
    async deleteLead(id) {
      await init();
      await sql("DELETE FROM events WHERE lead_id = $1", [id]);
      await sql("DELETE FROM leads WHERE id = $1", [id]);
    },
    async events() {
      await init();
      const { rows } = await sql("SELECT * FROM events ORDER BY created_at DESC LIMIT 2000");
      return rows.map((r) => ({ id: r.id as string, leadId: r.lead_id as string, type: r.type as EventType, detail: (r.detail as string) ?? "", createdAt: iso(r.created_at)! }));
    },
    async addEvent(e) {
      await init();
      await sql("INSERT INTO events (id, lead_id, type, detail, created_at) VALUES ($1,$2,$3,$4,$5)", [e.id, e.leadId, e.type, e.detail, e.createdAt]);
    },
  };
}

function fileBackend(): Backend {
  const file = join(process.cwd(), ".data", "store.json");
  const read = (): { leads: Lead[]; events: LeadEvent[] } =>
    existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : { leads: [], events: [] };
  const write = (d: { leads: Lead[]; events: LeadEvent[] }) => {
    mkdirSync(join(process.cwd(), ".data"), { recursive: true });
    writeFileSync(file, JSON.stringify(d, null, 2));
  };
  return {
    async leads() {
      return read().leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async saveLead(l) {
      const d = read();
      const i = d.leads.findIndex((x) => x.id === l.id);
      if (i >= 0) d.leads[i] = l;
      else d.leads.push(l);
      write(d);
    },
    async deleteLead(id) {
      const d = read();
      write({ leads: d.leads.filter((l) => l.id !== id), events: d.events.filter((e) => e.leadId !== id) });
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

export const storeConfigured = Boolean(dbUrl) || process.env.NODE_ENV !== "production";
const backend: Backend | null = dbUrl ? sqlBackend(dbUrl) : process.env.NODE_ENV !== "production" ? fileBackend() : null;

function need(): Backend {
  if (!backend) throw new Error("Kein Lead-Speicher konfiguriert (DATABASE_URL fehlt).");
  return backend;
}

export const getLeads = async () => (await need().leads()).map(migrate);
export const saveLead = (l: Lead) => need().saveLead(l);
export const deleteLead = (id: string) => need().deleteLead(id);
export const getEvents = () => need().events();
export async function logEvent(leadId: string, type: EventType, detail = "") {
  await need().addEvent({ id: newId(), leadId, type, detail, createdAt: new Date().toISOString() });
}
export async function leadBy(field: "token" | "confirmToken" | "unsubToken" | "id", value: string): Promise<Lead | null> {
  if (!value) return null;
  return (await getLeads()).find((l) => l[field] === value) ?? null;
}
