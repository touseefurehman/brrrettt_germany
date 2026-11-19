import reportData from "@/content/sov/ki-report-dguv-v3-2026.json";
import articleData from "@/content/sov/fachbeitraege-themen.json";
import { leistungsseiten } from "@/lib/leistungsseiten";
import { HUB_NAME, HUB_PATH } from "@/lib/elektropruefung";
import { previewEnabled, type FaqItem, type Status } from "@/lib/rank-rent";

// Share-of-Voice-Inhalte: Datenreports (/report) und Fachbeiträge (/fachbeitraege).
// Daten: content/sov/*.json (Anleitung: content/sov/README.md). Texte kommen unverändert aus dem JSON.

export const REPORT_BASE = "/report";
export const REPORT_BASE_NAME = "Reports";
export const ARTICLE_BASE = "/fachbeitraege";
export const ARTICLE_BASE_NAME = "Fachbeiträge";

// ---- Reports ----------------------------------------------------------------------------------------------------

export type DomainShare = { domain: string; citations: number; shareOfVoice: number; type: string };
export type ShareMap = Record<string, number>;

export type Report = {
  slug: string;
  title: string;
  /** Kurzer Name für Brotkrumen und Listen */
  shortTitle: string;
  period: string;
  /** ISO-Intervall der Messung (Dataset.temporalCoverage) */
  temporalCoverage: string;
  metaTitle: string;
  metaDescription: string;
  datePublished: string;
  shortAnswer: string;
  methodology: {
    engines: string[];
    prompts: number;
    runs: number;
    citations: number;
    uniqueDomains: number;
    scoring: string;
    promptSource: string;
    limitations: string;
  };
  keyFindings: {
    top10: DomainShare[];
    top10ShareCombined: number;
    maxSingleShare: number;
    domainsCitedOnce: number;
    sourceTypesOverall: ShareMap;
    firstPositionByType: ShareMap;
  };
  byEngine: Record<string, { runs: number; citations: number; avgSourcesPerAnswer: number; top5: DomainShare[]; sourceTypes: ShareMap }>;
  byCategory: Record<string, { prompts: number; citations: number; top3: DomainShare[]; sourceTypes: ShareMap }>;
  findings: { heading: string; content: string }[];
  takeaways: string[];
  faq: FaqItem[];
};

export const reports: Report[] = [
  {
    ...(reportData as Omit<Report, "shortTitle" | "temporalCoverage">),
    shortTitle: "KI-Report DGUV V3 2026",
    temporalCoverage: "2026-11-10/2026-11-11",
  },
];

export const reportPath = (r: { slug: string }) => `${REPORT_BASE}/${r.slug}`;
export const reportBySlug = (slug: string) => reports.find((r) => r.slug === slug);
/** Neuester Report (Linkboxen auf Hub, Partnerseite, Footer) */
export const latestReport = [...reports].sort((a, b) => b.datePublished.localeCompare(a.datePublished))[0];

/** Alle Quellentypen in fester Reihenfolge (nach Gesamtanteil), damit Diagramme und Tabellen gleich sortiert sind */
export function sourceTypeOrder(r: Report): string[] {
  const all = new Set<string>(Object.keys(r.keyFindings.sourceTypesOverall));
  for (const e of Object.values(r.byEngine)) Object.keys(e.sourceTypes).forEach((t) => all.add(t));
  const overall = r.keyFindings.sourceTypesOverall;
  return [...all].sort((a, b) => (overall[b] ?? 0) - (overall[a] ?? 0));
}

// ---- Zahlenformat -----------------------------------------------------------------------------------------------

const de1 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const de0 = new Intl.NumberFormat("de-DE");
/** 4.2 → "4,2 %" (immer eine Nachkommastelle, wie im Datensatz) */
export const pct = (n: number) => `${de1.format(n)} %`;
/** 2.7 → "2,7" */
export const dec = (n: number) => de1.format(n);
/** 811 → "811" */
export const int = (n: number) => de0.format(n);

// ---- Fachbeiträge -----------------------------------------------------------------------------------------------

export type ArticleType = "kontraer" | "zukunft";

export type Article = {
  slug: string;
  type: ArticleType;
  status: Status;
  title: string;
  /** Redaktioneller Ansatz (intern, wird nicht angezeigt) */
  angle: string;
  legalBasis: string[];
  relatedPages: string[];
  // Pflicht, sobald veröffentlicht:
  shortAnswer?: string;
  sections?: { heading: string; content: string }[];
  faq?: FaqItem[];
  metaTitle?: string;
  metaDescription?: string;
  datePublished?: string;
  dateModified?: string;
};

/** Veröffentlichter (oder in der Vorschau angezeigter) Beitrag mit vollständigen Pflichtfeldern */
export type ReadyArticle = Article & Required<Pick<Article, "shortAnswer" | "sections" | "metaTitle" | "metaDescription" | "datePublished">>;

export const articleTypeHeadings: Record<ArticleType, string> = {
  kontraer: "Klartext: Was oft falsch gemacht wird",
  zukunft: "Ausblick: Was auf Betreiber zukommt",
};

const articlesAll = articleData as Article[];
const TITLE_MAX = 65;

const isReady = (a: Article): a is ReadyArticle =>
  !!a.shortAnswer && !!a.sections?.length && !!a.metaTitle && !!a.metaDescription && !!a.datePublished;

function validate() {
  const errors: string[] = [];
  const slugs = new Set<string>();
  for (const a of articlesAll) {
    if (slugs.has(a.slug)) errors.push(`Slug doppelt: ${a.slug}`);
    slugs.add(a.slug);
    if (!(a.type in articleTypeHeadings)) errors.push(`${a.slug}: unbekannter type "${a.type}"`);
    if (a.status === "published") {
      if (!isReady(a)) errors.push(`${a.slug}: veröffentlicht, aber shortAnswer/sections/metaTitle/metaDescription/datePublished fehlen`);
      else if (a.metaTitle.length > TITLE_MAX) errors.push(`${a.slug}: metaTitle über ${TITLE_MAX} Zeichen`);
    }
  }
  if (errors.length > 0) throw new Error(`content/sov/fachbeitraege-themen.json ist inkonsistent:\n- ${errors.join("\n- ")}`);
}
validate();

/** Nur wirklich veröffentlichte Beiträge (Sitemap, Links) – unabhängig vom Vorschau-Modus */
export const publishedArticles = articlesAll.filter((a): a is ReadyArticle => a.status === "published" && isReady(a));
export const hasPublishedArticles = publishedArticles.length > 0;

/**
 * Routbare Beiträge: veröffentlichte, plus im Vorschau-Modus (nur `next dev`, nie Vercel Production) auch Entwürfe.
 * Entwürfe ohne Text bekommen in der Vorschau Platzhalter, damit das Template sichtbar ist.
 */
export const articles: ReadyArticle[] = articlesAll
  .filter((a) => a.status === "published" || previewEnabled)
  .map((a) =>
    isReady(a)
      ? a
      : {
          ...a,
          shortAnswer: a.shortAnswer ?? "[Kurzantwort fehlt – Entwurf]",
          sections: a.sections?.length ? a.sections : [{ heading: "[Text fehlt – Entwurf]", content: a.angle }],
          metaTitle: a.metaTitle ?? a.title,
          metaDescription: a.metaDescription ?? a.angle,
          datePublished: a.datePublished ?? new Date().toISOString().slice(0, 10),
        },
  );

export const articlePath = (a: { slug: string }) => `${ARTICLE_BASE}/${a.slug}`;
export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const isDraftArticle = (a: Article) => a.status !== "published";

export function groupArticles(items: ReadyArticle[]): [ArticleType, string, ReadyArticle[]][] {
  return (Object.keys(articleTypeHeadings) as ArticleType[])
    .map((t): [ArticleType, string, ReadyArticle[]] => [t, articleTypeHeadings[t], items.filter((a) => a.type === t)])
    .filter(([, , list]) => list.length > 0);
}

// ---- Seitennamen für interne Links ------------------------------------------------------------------------------

const knownPages = new Map<string, string>([
  [HUB_PATH, HUB_NAME],
  ["/dguv-v3-pruefung-kosten", "DGUV V3 Prüfung Kosten"],
  ["/externer-betreibermanager", "Externer Betreibermanager"],
  ["/fuer-pruefpartner", "Für Prüfpartner"],
  ...leistungsseiten.map((p): [string, string] => [`/${p.slug}`, p.name]),
]);

/** Linktext für einen internen Pfad (Fallback: der Pfad selbst) */
export const pageLabel = (path: string) => knownPages.get(path) ?? path;
