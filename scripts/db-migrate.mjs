// Legt Tabellen und Indizes in Neon an (idempotent). Aufruf: npm run db:migrate   (Prüfung ohne Änderung: npm run db:check)
// Liest .env.local (vercel env pull), falls vorhanden. Für Migrationen die ungepoolte Verbindung (DATABASE_URL_UNPOOLED).
// Gibt nie die Verbindungszeichenkette aus.
import { existsSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import { SCHEMA, TABLES } from "../lib/db-schema.mjs";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) {
  console.error("DATABASE_URL fehlt (vercel env pull .env.local).");
  process.exit(1);
}
const host = new URL(url).hostname;
console.log(`Datenbank-Host endet auf .neon.tech: ${host.endsWith(".neon.tech") ? "ja" : "NEIN"}`);
const sql = neon(url);
const checkOnly = process.argv.includes("--check");

try {
  if (!checkOnly) {
    for (const statement of SCHEMA) await sql.query(statement);
    console.log(`${SCHEMA.length} Anweisungen ausgeführt.`);
  }
  const rows = await sql.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name");
  const found = rows.map((r) => r.table_name);
  console.log(`Tabellen in public: ${found.join(", ") || "(keine)"}`);
  const missing = TABLES.filter((t) => !found.includes(t));
  if (missing.length) {
    console.error(`Fehlend: ${missing.join(", ")}`);
    process.exit(1);
  }
  console.log("Prüfung OK: alle 4 Tabellen vorhanden.");
} catch (err) {
  console.error("Fehler:", (err instanceof Error ? err.message : String(err)).replace(/postgres(ql)?:\/\/\S+/gi, "[verbindung]"));
  process.exit(1);
}
