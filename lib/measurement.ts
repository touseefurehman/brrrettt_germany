import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { clusters, publishedClusters, type Cluster } from "@/lib/clusters";

// Messdateien: content/measurements/<cluster>-<YYYY-MM>.json (erzeugt von tools/report-engine). Serverseitig.
// Öffentliche Seiten nutzen ausschließlich die Datei aus clusters.json (latestMeasurementFile).
// Mock-Dateien ("mock": true, Endung .mock.json) werden nie geladen; verweist ein veröffentlichter Cluster auf eine, bricht der Build ab.

export type ProviderRow = {
  name: string;
  domain: string | null;
  mentions: number | null;
  shareOfAnswers: number | null;
  citations: number | null;
  shareOfVoice?: number;
};
export type DomainRow = { domain: string; citations: number; shareOfVoice: number; type?: string };

export type Measurement = {
  cluster: string;
  month: string;
  mock: boolean;
  source: "measurement" | "report-aggregate";
  /** "answers": Einzelantworten vorhanden; "aggregate": nur Aggregatwerte aus dem Report */
  granularity: "answers" | "aggregate";
  dateLabel: string;
  temporalCoverage: string;
  engines: string[];
  promptCount: number;
  answerCount: number;
  totalCitations: number;
  uniqueDomains: number;
  /** null = unbekannt (Aggregatdatei) */
  providerCount: number | null;
  rankingComplete: boolean;
  rankingNote?: string;
  top10ShareCombined?: number;
  maxSingleShare?: number;
  outsideProviderShare: number | null;
  topDomains: DomainRow[];
  providers: ProviderRow[];
  byEngine: Record<string, { answers: number; providers: ProviderRow[] }>;
  scores: {
    sovScore: number | null;
    citedAnswers: number | null;
    partnerMentions: number | null;
    anbietercheckSov: number | null;
    anbietercheckAnswers: number | null;
  };
  answers: {
    promptId: string;
    engine: string;
    intent: string;
    mentions: string[];
    citations: { url: string; domain: string; position: number }[];
  }[];
};

const dir = join(process.cwd(), "content", "measurements");
const read = (file: string): Measurement => JSON.parse(readFileSync(join(dir, file), "utf8")) as Measurement;

function load(c: Cluster): Measurement | null {
  if (!c.latestMeasurementFile) return null;
  const file = c.latestMeasurementFile;
  if (file.includes(".mock.")) throw new Error(`content/clusters.json: ${c.slug} verweist auf eine Mock-Datei (${file})`);
  if (!existsSync(join(dir, file))) throw new Error(`content/clusters.json: ${c.slug}: Messdatei ${file} fehlt`);
  const m = read(file);
  if (m.mock) throw new Error(`content/clusters.json: ${c.slug}: ${file} ist als Mock markiert und darf nicht verwendet werden`);
  if (m.cluster !== c.slug) throw new Error(`content/measurements/${file}: gehört zu ${m.cluster}, nicht zu ${c.slug}`);
  return m;
}

const cache = new Map<string, Measurement | null>();
for (const c of clusters) cache.set(c.slug, load(c));
for (const c of publishedClusters) {
  if (c.latestMeasurementFile && !cache.get(c.slug)) throw new Error(`${c.slug}: Messdatei nicht lesbar`);
}

/** Letzte echte Messung des Clusters (nie Mock), sonst null */
export const measurementFor = (slug: string): Measurement | null => cache.get(slug) ?? null;

/** Alle echten Messungen des Clusters, neueste zuerst */
export function measurementHistory(slug: string): Measurement[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.startsWith(`${slug}-`) && f.endsWith(".json") && !f.includes(".mock."))
    .map(read)
    .filter((m) => !m.mock && m.cluster === slug)
    .sort((a, b) => b.month.localeCompare(a.month));
}

// ---- Zahlenformat (de-DE) ---------------------------------------------------------------------------------------

const de1 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const fmtPct = (n: number | null | undefined) => (n == null ? "–" : `${de1.format(n)} %`);
export const fmtInt = (n: number | null | undefined) => (n == null ? "–" : new Intl.NumberFormat("de-DE").format(n));
