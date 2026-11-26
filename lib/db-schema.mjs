// Datenbankschema (Neon Postgres). Einzige Quelle für Tabellen und Indizes: genutzt von lib/db.ts (beim ersten Zugriff)
// und von scripts/db-migrate.mjs (npm run db:migrate). Alle Anweisungen sind idempotent.

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS leads (
    id text PRIMARY KEY, token text UNIQUE NOT NULL, confirm_token text, unsub_token text, cluster text NOT NULL,
    company text, domain text, name text, role text, email text, status text NOT NULL, source text NOT NULL DEFAULT 'form',
    created_at timestamptz NOT NULL, confirmed_at timestamptz, last_email_step int, baseline_month text, findings_json jsonb)`,
  `CREATE TABLE IF NOT EXISTS events (
    id text PRIMARY KEY, lead_id text NOT NULL, type text NOT NULL, detail text, created_at timestamptz NOT NULL)`,
  // Tabelle des früheren, nie freigeschalteten Formulars (Spalte „trades“) beiseitelegen statt zu überschreiben
  `DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'partner_applications' AND column_name = 'trades') THEN
      ALTER TABLE partner_applications RENAME TO partner_applications_alt;
    END IF; END $$`,
  `CREATE TABLE IF NOT EXISTS partner_applications (
    id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL, status_changed_at timestamptz NOT NULL,
    status text NOT NULL DEFAULT 'neu', company text NOT NULL, contact_name text NOT NULL, email text NOT NULL, phone text,
    categories jsonb NOT NULL, regions jsonb NOT NULL, plz_areas text, qualifications jsonb NOT NULL,
    capacity_days int NOT NULL, mobile_teams int NOT NULL, message text, source_page text NOT NULL,
    utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text, referrer text,
    consent_at timestamptz NOT NULL, consent_text_version text NOT NULL, approved_by text, approved_at timestamptz, notes text,
    delete_after timestamptz, web3forms_status text)`,
  `CREATE TABLE IF NOT EXISTS partner_application_events (
    id text PRIMARY KEY, application_id text, created_at timestamptz NOT NULL, type text NOT NULL, detail text)`,
  `CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)`,
  `CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at)`,
  `CREATE INDEX IF NOT EXISTS events_lead_id_idx ON events (lead_id)`,
  `CREATE INDEX IF NOT EXISTS events_created_at_idx ON events (created_at)`,
  `CREATE INDEX IF NOT EXISTS partner_applications_status_idx ON partner_applications (status)`,
  `CREATE INDEX IF NOT EXISTS partner_applications_created_at_idx ON partner_applications (created_at)`,
  `CREATE INDEX IF NOT EXISTS partner_applications_delete_after_idx ON partner_applications (delete_after)`,
  `CREATE INDEX IF NOT EXISTS partner_application_events_application_id_idx ON partner_application_events (application_id)`,
  `CREATE INDEX IF NOT EXISTS partner_application_events_created_at_idx ON partner_application_events (created_at)`,
];

export const TABLES = ["leads", "events", "partner_applications", "partner_application_events"];
