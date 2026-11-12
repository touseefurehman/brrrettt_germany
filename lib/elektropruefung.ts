import commercialData from "@/content/elektropruefung/elektropruefung-commercial.json";
import partnerData from "@/content/elektropruefung/elektropruefung-partners.json";
import wissenData from "@/content/elektropruefung/elektropruefung-wissen.json";
import seoTitleData from "@/content/elektropruefung/elektropruefung-seo-titles.json";
import expansionData from "@/content/elektropruefung/elektropruefung-expansions.json";
import { site } from "@/lib/site";

// Elektroprüfung DGUV V3: Antwortseiten (kommerzielle Fragen) und Wissensseiten (informationelle Fragen).
// Die Texte kommen unverändert aus content/elektropruefung/*.json – hier nichts umformulieren.

/**
 * Veröffentlichte Phasen der kommerziellen Fragen. Nur diese Fragen bekommen eine Seite und erscheinen im Hub
 * und in der Sitemap. Nächste Stufe: [1, 2], dann [1, 2, 3] … – keine weitere Codeänderung nötig.
 */
export const PUBLISHED_PHASES: number[] = [1];

/** Erst- und Änderungsdatum aller Seiten (Autorenbox, Article-Schema, Sitemap). Bei Textänderungen anpassen. */
export const PUBLISHED_DATE = "2026-11-10";
export const MODIFIED_DATE = "2026-11-10";

/** Änderungsdatum der Seiten mit Zusatzabschnitten aus elektropruefung-expansions.json */
export const EXPANSION_DATE = "2026-11-12";

export const HUB_PATH = "/elektropruefung-dguv-v3";
export const HUB_NAME = "Elektroprüfung DGUV V3";
export const HUB_TITLE = "Elektroprüfung nach DGUV V3 – Anbieter, Kosten, Pflichten";
/** Meta-Titel des Hubs (max. 65 Zeichen inkl. Marke); die H1 bleibt HUB_TITLE */
export const HUB_META_TITLE = "Elektroprüfung DGUV V3: Anbieter & Kosten";

/** "national" oder "city:<Stadt>", z. B. "city:Berlin" */
export type PartnerSlot = "national" | `city:${string}`;

export type CommercialItem = {
  id: number;
  slug: string;
  question: string;
  category: string;
  intent: string;
  funnel: string;
  audience: string;
  city: string | null;
  phase: 1 | 2 | 3 | 4;
  shortAnswer: string;
  expertText: string;
  legalBasis: string;
  partnerSlot: PartnerSlot | null;
  metaTitle: string;
  metaDescription: string;
};

export type KnowledgeItem = {
  id: number;
  slug: string;
  question: string;
  category: string;
  shortAnswer: string;
  expertText: string;
  legalBasis: string;
};

export type Partner = { name: string; text: string; url: string };

const commercialAll = commercialData as CommercialItem[];
export const knowledgeItems = wissenData as KnowledgeItem[];
const partners = partnerData as Record<string, Partner>;

/** Alle kommerziellen Fragen der veröffentlichten Phasen */
export const publishedCommercial = commercialAll.filter((c) => PUBLISHED_PHASES.includes(c.phase));

// ---- Meta-Titel und -Beschreibung -------------------------------------------------------------------------------
// Suchmaschinen kürzen Titel ab ca. 65 Zeichen und Beschreibungen ab ca. 155 Zeichen. Die Fragen sind dafür meist zu
// lang, deshalb gibt es je Seite einen kurzen SEO-Titel in elektropruefung-seo-titles.json (H1 bleibt die Frage).
// Neue Seiten ohne Eintrag fallen auf die Frage zurück – bei Fragen über 65 Zeichen dort einen Eintrag ergänzen.

const TITLE_MAX = 65;
const DESCRIPTION_MAX = 155;
const BRAND_SUFFIX = ` | ${site.domain}`;
const seoTitles = seoTitleData as Record<string, string>;

/** Meta-Titel: kurzer SEO-Titel (oder die Frage) mit Marke, wenn beides zusammen in 65 Zeichen passt. */
export function metaTitleFor(item: { slug: string; question: string }): string {
  const base = seoTitles[item.slug] ?? item.question;
  return base.length + BRAND_SUFFIX.length <= TITLE_MAX ? `${base}${BRAND_SUFFIX}` : base;
}

/** Meta-Beschreibung: Kurzantwort, bei Bedarf am Satz- oder Wortende gekürzt (nie mitten im Wort). */
export function metaDescriptionFor(item: { shortAnswer: string }): string {
  const text = item.shortAnswer.trim();
  if (text.length <= DESCRIPTION_MAX) return text;
  const cut = text.slice(0, DESCRIPTION_MAX);
  const sentenceEnd = cut.lastIndexOf(". ");
  if (sentenceEnd >= 80) return cut.slice(0, sentenceEnd + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:–-]\s*$/, "")} …`;
}

export const commercialPath = (c: CommercialItem) => `${HUB_PATH}/${c.slug}`;
export const knowledgePath = (k: KnowledgeItem) => `/wissen/elektropruefung/${k.slug}`;

export const commercialBySlug = (slug: string) => publishedCommercial.find((c) => c.slug === slug);
export const knowledgeBySlug = (slug: string) => knowledgeItems.find((k) => k.slug === slug);

/** Kategorien in der Reihenfolge ihres ersten Auftretens in den Daten */
export function groupByCategory<T extends { category: string }>(items: T[]): [category: string, items: T[]][] {
  const groups = new Map<string, T[]>();
  for (const item of items) groups.set(item.category, [...(groups.get(item.category) ?? []), item]);
  return [...groups];
}

/** Partner zum Slot – nur wenn ein Name eingetragen ist, sonst null (dann wird keine Anzeige ausgegeben). */
export function partnerFor(slot: PartnerSlot | null): Partner | null {
  if (!slot) return null;
  const p = partners[slot];
  return p && p.name.trim() ? p : null;
}

// ---- Verwandte Seiten -------------------------------------------------------------------------------------------
// Ohne redaktionelle Zuordnung in den Daten: Ähnlichkeit über gemeinsame Begriffe aus Frage und Rechtsgrundlagen.
// Deterministisch, damit der Build bei gleichen Daten immer dieselben Links erzeugt.

const stopwords = new Set(
  "der die das den dem des ein eine einen einem einer eines und oder für fuer mit von vom zum zur im in am an auf aus bei ist sind wird werden wer was wie wo welche welcher welches welchen muss müssen kann können darf soll sollte gibt es ich wir man mein meine unser unsere nach über ohne bis als auch nicht noch nur sich sie er zu so ja nein dguv v3 vorschrift prüfung prüfungen elektroprüfung elektroprüfungen".split(
    " ",
  ),
);

const terms = (text: string) =>
  new Set(
    text
      .toLowerCase()
      .split(/[^a-zäöüß0-9]+/)
      .filter((w) => w.length > 2 && !stopwords.has(w)),
  );

const termCache = new WeakMap<object, Set<string>>();
const termsOf = (item: { question: string; legalBasis: string }) => {
  let t = termCache.get(item);
  if (!t) termCache.set(item, (t = terms(`${item.question} ${item.legalBasis}`)));
  return t;
};

const similarity = (a: Set<string>, b: Set<string>) => {
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return shared / (a.size + b.size - shared || 1);
};

function mostSimilar<T extends { id: number; question: string; legalBasis: string }>(
  to: { question: string; legalBasis: string },
  candidates: T[],
  count: number,
): T[] {
  const base = termsOf(to);
  return candidates
    .map((c) => ({ c, score: similarity(base, termsOf(c)) }))
    .sort((x, y) => y.score - x.score || x.c.id - y.c.id)
    .slice(0, count)
    .map(({ c }) => c);
}

/** 3–5 veröffentlichte Fragen derselben Kategorie; bei zu wenigen wird aus anderen Kategorien aufgefüllt. */
export function similarCommercial(item: CommercialItem, count = 5): CommercialItem[] {
  const others = publishedCommercial.filter((c) => c.id !== item.id);
  const sameCategory = mostSimilar(item, others.filter((c) => c.category === item.category), count);
  if (sameCategory.length >= 3) return sameCategory;
  const fill = mostSimilar(item, others.filter((c) => c.category !== item.category), 3 - sameCategory.length);
  return [...sameCategory, ...fill];
}

export const relatedKnowledge = (item: { question: string; legalBasis: string }, count = 2) =>
  mostSimilar(item, knowledgeItems, count);

export const relatedCommercial = (item: { question: string; legalBasis: string }, count = 3) =>
  mostSimilar(item, publishedCommercial, count);

export const otherKnowledgeInCategory = (item: KnowledgeItem, count = 3) =>
  mostSimilar(item, knowledgeItems.filter((k) => k.id !== item.id && k.category === item.category), count);

// ---- Rechtsgrundlagen -------------------------------------------------------------------------------------------

/** Primärquellen für Erwähnungen in `legalBasis`. Alle anderen Begriffe bleiben Text. */
export const primarySources: [term: string, url: string][] = [
  ["DGUV Vorschrift 3", "https://publikationen.dguv.de"],
  // Kurzform derselben Vorschrift, wie sie in den Rechtsgrundlagen meist geschrieben ist
  ["DGUV V3", "https://publikationen.dguv.de"],
  ["TRBS 1203", "https://www.baua.de/DE/Angebote/Regelwerk/TRBS/TRBS-1203.html"],
  ["BetrSichV", "https://www.gesetze-im-internet.de/betrsichv_2015/"],
  ["ArbSchG", "https://www.gesetze-im-internet.de/arbschg/"],
  ["SGB VII", "https://www.gesetze-im-internet.de/sgb_7/"],
  ["BGB", "https://www.gesetze-im-internet.de/bgb/"],
  ["VgV", "https://www.gesetze-im-internet.de/vgv_2016/"],
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Längere Begriffe zuerst; Grenzen verhindern Treffer in Wortteilen (z. B. „DGUV V3“ nicht in „DGUV V30“)
const sourcePattern = new RegExp(
  `(?<![\\p{L}\\d])(${[...primarySources]
    .sort((a, b) => b[0].length - a[0].length)
    .map(([t]) => escapeRe(t))
    .join("|")})(?![\\p{L}\\d])`,
  "gu",
);

/** Zerlegt die Rechtsgrundlagen in Text- und Link-Teile */
export function legalBasisParts(text: string): ({ text: string; url?: undefined } | { text: string; url: string })[] {
  const urls = new Map(primarySources);
  return text
    .split(sourcePattern)
    .filter((part) => part !== "")
    .map((part) => (urls.has(part) ? { text: part, url: urls.get(part)! } : { text: part }));
}

// ---- Zusatzabschnitte -------------------------------------------------------------------------------------------
// elektropruefung-expansions.json ergänzt einzelne Seiten um Abschnitte unterhalb der Einordnung der Redaktion.
// Schlüssel sind Slug-Präfixe: Manche Seiten-Slugs sind länger als der Schlüssel, deshalb Treffer per startsWith
// (bei mehreren Treffern gewinnt der längste Schlüssel). Inhalt ist einfaches Markdown: Absätze, „- “-Listen,
// „1. “-Listen, Tabellen mit Kopfzeile und **fett**.

export type ExpansionBlock =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type ExpansionSection = { heading: string; content: string };

const expansions = expansionData as Record<string, { question: string; type: string; sections: ExpansionSection[] }>;
const expansionKeys = Object.keys(expansions).sort((a, b) => b.length - a.length);

/** Zusatzabschnitte zur Seite, leer wenn es keine gibt */
export function expansionFor(slug: string): ExpansionSection[] {
  const key = expansionKeys.find((k) => slug.startsWith(k));
  return key ? expansions[key].sections : [];
}

/** Änderungsdatum der Seite: später, wenn sie Zusatzabschnitte hat */
export const modifiedFor = (slug: string) => (expansionFor(slug).length > 0 ? EXPANSION_DATE : MODIFIED_DATE);

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function parseExpansion(content: string): ExpansionBlock[] {
  const blocks: ExpansionBlock[] = [];
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    const last = blocks[blocks.length - 1];
    if (!line) {
      blocks.push({ type: "p", text: "" }); // Trenner, wird unten entfernt
    } else if (line.startsWith("|")) {
      if (/^\|[\s|:-]+\|$/.test(line)) continue; // Trennzeile |---|---|
      if (last?.type === "table") last.rows.push(cells(line));
      else blocks.push({ type: "table", head: cells(line), rows: [] });
    } else if (/^[-*] /.test(line)) {
      const text = line.slice(2).trim();
      if (last?.type === "ul") last.items.push(text);
      else blocks.push({ type: "ul", items: [text] });
    } else if (/^\d+\. /.test(line)) {
      const text = line.replace(/^\d+\.\s+/, "");
      if (last?.type === "ol") last.items.push(text);
      else blocks.push({ type: "ol", items: [text] });
    } else if (last?.type === "p" && last.text) {
      last.text += ` ${line}`;
    } else {
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks.filter((b) => b.type !== "p" || b.text);
}

/** Klartext eines Abschnitts für das Schema (ohne Markdown-Zeichen) */
export function expansionText(content: string): string {
  const strip = (s: string) => s.replace(/\*\*/g, "");
  const end = (s: string) => (/[.!?:]$/.test(s) ? s : `${s}.`);
  return parseExpansion(content)
    .map((b) => {
      if (b.type === "p") return strip(b.text);
      if (b.type === "table") return b.rows.map((r) => end(r.map((c, i) => `${b.head[i]}: ${strip(c)}`).join(", "))).join(" ");
      return b.items.map((item) => end(strip(item))).join(" ");
    })
    .join(" ");
}
