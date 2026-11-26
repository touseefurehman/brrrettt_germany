import { neon } from "@neondatabase/serverless";
import { SCHEMA } from "./db-schema.mjs";

// Einzige Stelle, an der die Verbindung gelesen wird: Neon Postgres (über den Vercel Marketplace verbunden).
// Abfragen über die gepoolte Verbindung (DATABASE_URL bzw. POSTGRES_URL); Migrationen in scripts/db-migrate.mjs (DATABASE_URL_UNPOOLED).
// Die Verbindungszeichenkette nie ausgeben oder loggen.
const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";

/** true, wenn eine Datenbank konfiguriert ist */
export const hasDatabase = url !== "";

let client: ReturnType<typeof neon> | null = null;
let ready: Promise<void> | null = null;

/** Schema beim ersten Zugriff sicherstellen (idempotent; dieselben Anweisungen wie npm run db:migrate) */
const ensureSchema = (run: (q: string) => Promise<unknown>) =>
  (ready ??= (async () => {
    for (const statement of SCHEMA) await run(statement);
  })().catch((err) => {
    ready = null;
    throw err;
  }));

/** Parametrisierte Abfrage ($1, $2 …). Fehlermeldungen enthalten nie die Verbindungsdaten. */
export async function sql(query: string, params: unknown[] = []): Promise<{ rows: Record<string, unknown>[] }> {
  if (!url) throw new Error("Keine Datenbank konfiguriert (DATABASE_URL fehlt).");
  client ??= neon(url);
  const c = client;
  const run = async (q: string, p: unknown[] = []) => {
    try {
      return (await c.query(q, p)) as Record<string, unknown>[];
    } catch (err) {
      throw new Error(`Datenbankfehler: ${err instanceof Error ? err.message.replace(/postgres(ql)?:\/\/\S+/gi, "[verbindung]") : "unbekannt"}`);
    }
  };
  await ensureSchema(run);
  return { rows: await run(query, params) };
}
