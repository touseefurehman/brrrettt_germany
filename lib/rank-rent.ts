import objekteData from "@/content/rank-rent/objekte.json";
import pruefbereicheData from "@/content/rank-rent/pruefbereiche.json";
import landingData from "@/content/rank-rent/landingpages.json";
import partnerData from "@/content/rank-rent/partners.json";
import { primarySources } from "@/lib/elektropruefung";

// Rank & Rent: Objekttyp × Prüfbereich = Landingpage mit genau einem mietbaren Partnerplatz.
// Daten: content/rank-rent/*.json (Anleitung: content/rank-rent/README.md). Nur `status: "published"` bekommt eine
// Route, erscheint in Hubs und Sitemap. Entwürfe sind nur lokal sichtbar (siehe `previewEnabled`).

export const BASE_PATH = "/pruefpflichten";
export const BASE_NAME = "Prüfpflichten";
export const PARTNER_PAGE_PATH = "/fuer-pruefpartner";

export type Status = "draft" | "published";
export type FaqItem = { question: string; answer: string };

export type Objekt = {
  slug: string;
  name: string;
  h1: string;
  intro: string;
  audience: string;
  metaTitle: string;
  metaDescription: string;
  faq?: FaqItem[];
  status: Status;
};

export type FormFieldType = "select" | "multiselect" | "number" | "text" | "boolean" | "date";
export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  options?: string[];
  required?: boolean;
};

export type Pruefbereich = {
  slug: string;
  name: string;
  legalBasis: string[];
  defaultIntervals: string;
  formFields: FormField[];
};

export type Landingpage = {
  id: number;
  objekt: string;
  pruefbereich: string;
  slug: string;
  h1: string;
  shortAnswer: string;
  heroText: string;
  sections: { heading: string; content: string }[];
  faq: FaqItem[];
  legalBasis: string;
  costRange?: { text: string; note?: string };
  metaTitle: string;
  metaDescription: string;
  partnerSlotId: string;
  status: Status;
  priorityScore: number;
  trackingPrompts: string[];
  /** ISO-Datum der Erstveröffentlichung / letzten inhaltlichen Änderung (Autorenbox, Article-Schema, Sitemap) */
  published: string;
  updated: string;
};

export type Partner = {
  name: string;
  logo?: string;
  certifications?: string[];
  region?: string;
  quote?: string;
  ctaText?: string;
  ctaUrl?: string;
  leadEmail: string;
  active: boolean;
};

// ---- Vorschau von Entwürfen -------------------------------------------------------------------------------------

/**
 * Entwürfe sind nur in `next dev` oder mit RANK_RENT_PREVIEW=1 sichtbar – und nie auf Vercel Production,
 * selbst wenn die Variable dort versehentlich gesetzt ist.
 */
export const previewEnabled =
  process.env.NODE_ENV === "development" ||
  (process.env.RANK_RENT_PREVIEW === "1" && process.env.VERCEL_ENV !== "production");

const visible = (status: Status) => status === "published" || previewEnabled;

// ---- Daten und Konsistenzprüfung --------------------------------------------------------------------------------

const objekteAll = objekteData as Objekt[];
export const pruefbereiche = pruefbereicheData as Pruefbereich[];
const landingAll = landingData as Landingpage[];
const partners = partnerData as Record<string, Partner>;

const TITLE_MAX = 65;

function validate() {
  const errors: string[] = [];
  const objektSlugs = new Set<string>();
  for (const o of objekteAll) {
    if (objektSlugs.has(o.slug)) errors.push(`Objekt-Slug doppelt: ${o.slug}`);
    objektSlugs.add(o.slug);
    if (o.status === "published" && o.metaTitle.length > TITLE_MAX) errors.push(`metaTitle zu lang (Objekt ${o.slug})`);
  }
  const bereichSlugs = new Set(pruefbereiche.map((p) => p.slug));
  const ids = new Set<number>();
  const urls = new Set<string>();
  const slots = new Set<string>();
  for (const l of landingAll) {
    const label = `Landingpage ${l.id} (${l.objekt}/${l.slug})`;
    if (ids.has(l.id)) errors.push(`${label}: id doppelt`);
    ids.add(l.id);
    if (!objektSlugs.has(l.objekt)) errors.push(`${label}: unbekanntes Objekt`);
    if (!bereichSlugs.has(l.pruefbereich)) errors.push(`${label}: unbekannter Prüfbereich`);
    const url = `${l.objekt}/${l.slug}`;
    if (urls.has(url)) errors.push(`${label}: URL doppelt`);
    urls.add(url);
    if (slots.has(l.partnerSlotId)) errors.push(`${label}: partnerSlotId doppelt`);
    slots.add(l.partnerSlotId);
    if (l.status === "published") {
      if (l.metaTitle.length > TITLE_MAX) errors.push(`${label}: metaTitle über ${TITLE_MAX} Zeichen`);
      if (l.faq.length < 4 || l.faq.length > 6) errors.push(`${label}: FAQ muss 4–6 Fragen haben`);
      const o = objekteAll.find((x) => x.slug === l.objekt);
      if (o && o.status !== "published") errors.push(`${label}: Objekt "${l.objekt}" ist nicht veröffentlicht`);
    }
  }
  for (const key of Object.keys(partners)) {
    if (!slots.has(key)) errors.push(`partners.json: Slot "${key}" gehört zu keiner Landingpage`);
  }
  if (errors.length > 0) throw new Error(`content/rank-rent ist inkonsistent:\n- ${errors.join("\n- ")}`);
}
validate();

export const objekte = objekteAll.filter((o) => visible(o.status));
export const landingpages = landingAll.filter(
  (l) => visible(l.status) && objekte.some((o) => o.slug === l.objekt),
);

/** Nur wirklich veröffentlichte Daten (Sitemap, Footer-Link) – unabhängig vom Vorschau-Modus */
export const publishedObjekte = objekteAll.filter((o) => o.status === "published");
export const publishedLandingpages = landingAll.filter(
  (l) => l.status === "published" && publishedObjekte.some((o) => o.slug === l.objekt),
);
export const hasPublishedObjects = publishedObjekte.length > 0;

export const objektBySlug = (slug: string) => objekte.find((o) => o.slug === slug);
export const bereichBySlug = (slug: string) => pruefbereiche.find((p) => p.slug === slug);
export const landingFor = (objekt: string, slug: string) =>
  landingpages.find((l) => l.objekt === objekt && l.slug === slug);
export const landingsForObjekt = (objekt: string) => landingpages.filter((l) => l.objekt === objekt);

export const objektPath = (o: { slug: string }) => `${BASE_PATH}/${o.slug}`;
export const landingPath = (l: { objekt: string; slug: string }) => `${BASE_PATH}/${l.objekt}/${l.slug}`;

/** Hubs und Landingpages im Vorschau-Modus bekommen noindex; veröffentlichte nie. */
export const isDraft = (item: { status: Status }) => item.status !== "published";

// ---- Partner ----------------------------------------------------------------------------------------------------

const isHttpUrl = (u: string) => /^https?:\/\//i.test(u);

/** Partnerdaten (ohne Prüfung auf `active`), z. B. für das Lead-Routing */
export function rawPartner(slotId: string): Partner | null {
  const p = partners[slotId];
  return p && typeof p.name === "string" && p.name.trim() ? p : null;
}

/**
 * Aktiver Partner zum Slot oder null. Nur mit `active: true` (und Name) erscheinen Firmenname und Logo
 * irgendwo auf der Seite; die CTA-URL wird nur übernommen, wenn sie mit http(s) beginnt.
 */
export function activePartner(slotId: string): Partner | null {
  const p = rawPartner(slotId);
  if (!p || p.active !== true) return null;
  return { ...p, ctaUrl: p.ctaUrl && isHttpUrl(p.ctaUrl) ? p.ctaUrl : undefined };
}

/** Wohin eine Anfrage geht: gemieteter Slot → Partner-E-Mail, sonst Fallback aus der Umgebung */
export function leadRecipient(slotId: string): { to: string | null; partner: Partner | null } {
  const partner = activePartner(slotId);
  if (partner && partner.leadEmail.trim()) return { to: partner.leadEmail.trim(), partner };
  return { to: process.env.LEAD_FALLBACK_EMAIL?.trim() || null, partner: null };
}

// ---- Verwandte Seiten -------------------------------------------------------------------------------------------

export function relatedLandings(l: Landingpage): { sameArea: Landingpage[]; sameObject: Landingpage[] } {
  const others = landingpages.filter((x) => x.id !== l.id);
  return {
    sameArea: others.filter((x) => x.pruefbereich === l.pruefbereich && x.objekt !== l.objekt),
    sameObject: others.filter((x) => x.objekt === l.objekt && x.pruefbereich !== l.pruefbereich),
  };
}

/** Landingpages eines Objekts nach Prüfbereich gruppiert (Reihenfolge der Prüfbereiche in pruefbereiche.json) */
export function groupByBereich(items: Landingpage[]): [Pruefbereich, Landingpage[]][] {
  return pruefbereiche
    .map((p): [Pruefbereich, Landingpage[]] => [p, items.filter((l) => l.pruefbereich === p.slug)])
    .filter(([, list]) => list.length > 0);
}

// ---- Meta -------------------------------------------------------------------------------------------------------

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// ---- Rechtsgrundlagen mit Primärquellen -------------------------------------------------------------------------
// Erweitert die Linkliste der Elektroprüfung (lib/elektropruefung.ts, bleibt unverändert). Wo es keine frei
// zugängliche Primärquelle gibt (DIN, VDI), führt der Link zum Herausgeber, nicht zum Volltext.

export const legalSources: [term: string, url: string][] = [
  ...primarySources,
  ["TrinkwV", "https://www.gesetze-im-internet.de/trinkwv_2023/"],
  ["ASR A2.2", "https://www.baua.de/DE/Angebote/Regelwerk/ASR/ASR-A2-2"],
  ["ASR A1.7", "https://www.baua.de/DE/Angebote/Regelwerk/ASR/ASR-A1-7"],
  ["DIN 14675", "https://www.dinmedia.de"],
  ["VDI 6022", "https://www.vdi.de/richtlinien"],
  ["DIN EN 15635", "https://www.dinmedia.de"],
  ["DGUV V52", "https://publikationen.dguv.de"],
  ["DGUV Vorschrift 52", "https://publikationen.dguv.de"],
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sourcePattern = new RegExp(
  `(?<![\\p{L}\\d])(${[...legalSources]
    .sort((a, b) => b[0].length - a[0].length)
    .map(([term]) => escapeRe(term))
    .join("|")})(?![\\p{L}\\d])`,
  "gu",
);
const sourceUrl = new Map(legalSources);

/** Zerlegt einen Rechtsgrundlagen-Text in Text und verlinkte Regelwerke */
export function legalBasisParts(text: string): { text: string; url?: string }[] {
  const parts: { text: string; url?: string }[] = [];
  let last = 0;
  for (const m of text.matchAll(sourcePattern)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ text: m[0], url: sourceUrl.get(m[0]) });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

// ---- Markdown (kleine, sichere Teilmenge) -----------------------------------------------------------------------
// Absätze, ### Zwischenüberschriften, Listen (- / 1.), Tabellen (| a | b |), **fett**, [Text](url).
// Kein HTML: der Text wird als React-Knoten gerendert, nicht als roher String.

export type Inline = { kind: "text"; text: string } | { kind: "bold"; text: string } | { kind: "link"; text: string; href: string };
export type MdBlock =
  | { type: "p"; inline: Inline[] }
  | { type: "h3"; inline: Inline[] }
  | { type: "ul" | "ol"; items: Inline[][] }
  | { type: "table"; head: Inline[][]; rows: Inline[][][] };

const safeHref = (href: string) => (/^(https?:\/\/|\/(?!\/)|mailto:)/i.test(href) ? href : null);

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push({ kind: "text", text: text.slice(last, m.index) });
    if (m[1] !== undefined) out.push({ kind: "bold", text: m[1] });
    else {
      const href = safeHref(m[3]);
      out.push(href ? { kind: "link", text: m[2], href } : { kind: "text", text: m[2] });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ kind: "text", text: text.slice(last) });
  return out;
}

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

export function parseMarkdown(md: string): MdBlock[] {
  const blocks: MdBlock[] = [];
  for (const chunk of md.split(/\n\s*\n/)) {
    const lines = chunk.split("\n").filter((l) => l.trim() !== "");
    if (lines.length === 0) continue;
    if (lines.every((l) => l.trim().startsWith("|"))) {
      const rows = lines.map(splitRow);
      const isSeparator = (r: string[]) => r.every((c) => /^:?-{2,}:?$/.test(c));
      const body = rows.filter((r, i) => !(i === 1 && isSeparator(r)));
      const [head, ...rest] = body;
      blocks.push({ type: "table", head: head.map(parseInline), rows: rest.map((r) => r.map(parseInline)) });
    } else if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
      blocks.push({ type: "ul", items: lines.map((l) => parseInline(l.replace(/^\s*[-*]\s+/, ""))) });
    } else if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) {
      blocks.push({ type: "ol", items: lines.map((l) => parseInline(l.replace(/^\s*\d+[.)]\s+/, ""))) });
    } else if (lines.length === 1 && lines[0].startsWith("### ")) {
      blocks.push({ type: "h3", inline: parseInline(lines[0].slice(4)) });
    } else {
      blocks.push({ type: "p", inline: parseInline(lines.join(" ")) });
    }
  }
  return blocks;
}

/** Klartext ohne Markdown-Zeichen (für JSON-LD articleBody) */
export function markdownToText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^\s*\|?\s*:?-{2,}[-:| ]*$/gm, "")
    .replace(/^\s*(?:[-*]|\d+[.)])\s+/gm, "")
    .replace(/^###\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}
