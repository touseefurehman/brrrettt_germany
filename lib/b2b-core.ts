// B2B-Landingpages (Leistung × Objektart × Zielkunde): Datenmodell, Wortzählung und Qualitätsschranke.
// Bewusst ohne Alias-Importe und ohne Node-APIs, damit auch scripts/b2b-report.mjs (node --experimental-strip-types)
// dieselben Regeln ausführen kann wie der Build.

export type B2bService = "pruefmanagement" | "brandschutz" | "rlt-hygiene" | "tore" | "dguv-v3";
export type B2bStatus = "draft" | "review" | "published";

export type B2bSection = {
  /** Feste Reihenfolge, siehe SECTION_ORDER */
  id: string;
  heading: string;
  /** Markdown-Teilmenge (lib/rank-rent.ts parseMarkdown) */
  content: string;
  /** Index in `tables`: die Tabelle erscheint unter dem Abschnittstext */
  table?: number;
};

export type B2bTable = { caption: string; head: string[]; rows: string[][] };
export type B2bFaq = { question: string; answer: string };
export type B2bSource = { label: string; url: string; note?: string };
export type B2bLink = { label: string; href: string; note: string };

export type B2bPage = {
  slug: string;
  /** /pruefmanagement/<objekt> oder /pruefmanagement/<objekt>/<pruefbereich> */
  url: string;
  service: B2bService;
  objekt: string;
  zielkunde: string;
  status: B2bStatus;
  /** Name und Funktion der fachlich prüfenden Person; null = nicht freigegeben */
  reviewedBy: string | null;
  lastReviewed: string;
  /** Datum, an dem die Quellenlinks von Hand im Browser geprüft wurden (Gate des Prüfskripts) */
  linksVerifiedManually?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  kurzantwort: string;
  sections: B2bSection[];
  tables: B2bTable[];
  faq: B2bFaq[];
  sources: B2bSource[];
  internalLinks: B2bLink[];
  /** Vorbereitet, noch nicht gesetzt: Links bestehender Seiten auf diese Seite, einzuschalten bei Veröffentlichung */
  internalLinksFromExisting: { from: string; label: string; note: string }[];
  aiPrompts: string[];
  primaryIntent: string;
  /** Vorbelegung des Kontaktformulars (?thema=) */
  ctaTopic: string;
  cannibalization: {
    relatedUrls: string[];
    differentiation: string;
    decision: string;
  };
};

export const BASE = "/pruefmanagement";
export const SECTION_ORDER = [
  "zielgruppe",
  "betreiberpflichten",
  "pruefkategorien",
  "regelwerke",
  "fristen",
  "standorte",
  "koordination",
  "kosten",
] as const;

export const THRESHOLDS = {
  titleMax: 60,
  descriptionMax: 158,
  faqMin: 8,
  faqMax: 12,
  sourcesMin: 3,
  linksMin: 4,
  publishedWordsMin: 1000,
  wordsMin: 1200,
  wordsMax: 1800,
};

export const MARKER = /\[PRÜFEN[^\]]*\]/g;

const stripMd = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^\s*\|?\s*:?-{2,}[-:| ]*$/gm, " ")
    .replace(/^###\s+/gm, "")
    .replace(/^\s*(?:[-*]|\d+[.)])\s+/gm, "")
    .replace(/\|/g, " ");

const countWords = (s: string) => (s.match(/[\p{L}\p{N}][\p{L}\p{N}.,/%§()–-]*/gu) ?? []).length;

/** Sichtbarer Text der Seite als Liste von Teilen (Überschrift, Kurzantwort, Abschnitte, Tabellen, FAQ) */
export function visibleTexts(p: B2bPage): string[] {
  return [
    p.h1,
    p.kurzantwort,
    ...p.sections.flatMap((s) => [s.heading, stripMd(s.content)]),
    ...p.tables.flatMap((t) => [t.caption, ...t.head, ...t.rows.flat()]),
    ...p.faq.flatMap((f) => [f.question, f.answer]),
  ];
}

export const wordCount = (p: B2bPage) => countWords(visibleTexts(p).join("\n"));
export const openMarkers = (p: B2bPage): string[] => JSON.stringify(p).match(MARKER) ?? [];
export const markerCount = (p: B2bPage) => (JSON.stringify(p).match(MARKER) ?? []).length;

export const previewPath = (p: { slug: string }) => `/vorschau/b2b/${p.slug}`;

/** Fehlerliste; leer = in Ordnung. Wird beim Laden der Daten ausgeführt: Fehler brechen den Build ab. */
export function validatePages(pages: B2bPage[]): string[] {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const urls = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const services: B2bService[] = ["pruefmanagement", "brandschutz", "rlt-hygiene", "tore", "dguv-v3"];
  const states: B2bStatus[] = ["draft", "review", "published"];
  for (const p of pages) {
    const e = (msg: string) => errors.push(`${p.slug}: ${msg}`);
    if (slugs.has(p.slug)) e("Slug doppelt");
    slugs.add(p.slug);
    if (urls.has(p.url)) e("URL doppelt");
    urls.add(p.url);
    if (titles.has(p.metaTitle)) e("metaTitle doppelt");
    titles.add(p.metaTitle);
    if (descriptions.has(p.metaDescription)) e("metaDescription doppelt");
    descriptions.add(p.metaDescription);
    if (!services.includes(p.service)) e(`unbekannter service "${p.service}"`);
    if (!states.includes(p.status)) e(`unbekannter status "${p.status}"`);
    if (!new RegExp(`^${BASE}/[a-z0-9-]+(/[a-z0-9-]+)?$`).test(p.url)) e(`URL ${p.url} passt nicht zum Schema ${BASE}/<objekt>[/<pruefbereich>]`);
    if (p.url.split("/")[2] !== p.objekt) e(`URL und objekt "${p.objekt}" passen nicht zusammen`);
    if (p.slug !== p.url.slice(BASE.length + 1).replace(/\//g, "-")) e("slug muss der URL-Pfad mit „-“ statt „/“ sein");
    if (p.metaTitle.length > THRESHOLDS.titleMax) e(`metaTitle ${p.metaTitle.length} Zeichen (max. ${THRESHOLDS.titleMax})`);
    if (p.metaDescription.length > THRESHOLDS.descriptionMax) e(`metaDescription ${p.metaDescription.length} Zeichen (max. ${THRESHOLDS.descriptionMax})`);
    const ids = p.sections.map((s) => s.id).join(",");
    if (ids !== SECTION_ORDER.join(",")) e(`Abschnitte müssen in der Reihenfolge ${SECTION_ORDER.join(", ")} stehen`);
    for (const s of p.sections) {
      if (s.table !== undefined && !p.tables[s.table]) e(`Abschnitt ${s.id}: Tabelle ${s.table} fehlt`);
    }
    for (const t of p.tables) {
      if (t.rows.some((r) => r.length !== t.head.length)) e(`Tabelle „${t.caption}“: Zeilenbreite passt nicht zur Kopfzeile`);
    }
    for (const s of p.sources) {
      if (!/^https:\/\//.test(s.url)) e(`Quelle „${s.label}“: URL muss mit https:// beginnen`);
    }
    if (p.status === "published") {
      if (!p.reviewedBy) e("veröffentlicht, aber reviewedBy fehlt");
      const markers = openMarkers(p);
      if (markers.length > 0) e(`veröffentlicht, aber ${markers.length} offene [PRÜFEN]-Marker`);
      const words = wordCount(p);
      if (words < THRESHOLDS.publishedWordsMin) e(`veröffentlicht, aber nur ${words} Wörter (mind. ${THRESHOLDS.publishedWordsMin})`);
      if (p.faq.length < THRESHOLDS.faqMin) e(`veröffentlicht, aber nur ${p.faq.length} FAQ (mind. ${THRESHOLDS.faqMin})`);
      for (const m of JSON.stringify(p.sections).matchAll(/\]\((\/pruefmanagement\/[^)\s]*)\)/g)) {
        const target = pages.find((x) => x.url === m[1]);
        if (!target || target.status !== "published") e(`verlinkt im Text auf nicht veröffentlichte Seite ${m[1]}`);
      }
      if (p.sources.length < THRESHOLDS.sourcesMin) e(`veröffentlicht, aber nur ${p.sources.length} Quellen (mind. ${THRESHOLDS.sourcesMin})`);
    }
  }
  return errors;
}
