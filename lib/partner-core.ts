// Prüfpartner-Seiten (operative Zusammenarbeit mit Prüfbetrieben): Datenmodell und Qualitätsschranke.
// Bewusst getrennt von den kommerziellen B2B-Seiten (lib/b2b-core.ts) und vom bezahlten Fachpartner-Programm (/fachpartner).
// Ohne Alias-Importe, damit scripts/partner-report.mjs (node --experimental-strip-types) dieselben Regeln ausführen kann.

export type PartnerStatus = "draft" | "review" | "published";
export type PartnerSection = { heading: string; content: string; table?: number };
export type PartnerPage = {
  slug: string;
  /** /fuer-pruefpartner/<slug> */
  url: string;
  status: PartnerStatus;
  reviewedBy: string | null;
  lastReviewed: string;
  linksVerifiedManually?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  kurzantwort: string;
  sections: PartnerSection[];
  tables: { caption: string; head: string[]; rows: string[][] }[];
  faq: { question: string; answer: string }[];
  sources: { label: string; url: string; note?: string }[];
  internalLinks: { label: string; href: string; note: string }[];
  aiPrompts: string[];
  primaryIntent: string;
  /** Beschriftung der Schaltfläche */
  cta: string;
  /** Thema, mit dem das Kontaktformular vorbelegt wird (/kontakt?thema=…) */
  ctaTopic: string;
};

export const PARTNER_BASE = "/fuer-pruefpartner";
export const PT = { titleMax: 60, descriptionMax: 158, shortMin: 40, shortMax: 60, wordsMin: 1000, wordsMax: 1500, faqMin: 6, faqMax: 10 };
export const MARKER = /\[PRÜFEN[^\]]*\]/g;
/** Formulierungen, die Aufträge, Kunden oder Abdeckung versprechen würden */
export const PROMISES = /garantiert|garantier|Auftragsgarantie|bestehende Kunden|bundesweit abgedeckt|feste Auftragsmenge|Rahmenvertrag mit [A-ZÄÖÜ]/;
/** Externe Links nur zu geprüften Quellen */
export const ALLOWED_HOSTS = ["www.gesetze-im-internet.de", "www.baua.de", "publikationen.dguv.de", "www.dinmedia.de", "www.gefma.de", "www.vdi.de"];

const stripMd = (s: string) =>
  s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/^###\s+/gm, "").replace(/^\s*(?:[-*]|\d+[.)])\s+/gm, "");
export const visibleTexts = (p: PartnerPage) => [
  p.h1, p.kurzantwort, ...p.sections.flatMap((s) => [s.heading, stripMd(s.content)]),
  ...p.tables.flatMap((t) => [t.caption, ...t.head, ...t.rows.flat()]), ...p.faq.flatMap((f) => [f.question, f.answer]),
];
export const wordCount = (p: PartnerPage) => (visibleTexts(p).join("\n").match(/[\p{L}\p{N}][\p{L}\p{N}.,/%§()–-]*/gu) ?? []).length;
export const markerCount = (p: PartnerPage) => (JSON.stringify(p).match(MARKER) ?? []).length;

export function validatePartnerPages(pages: PartnerPage[]): string[] {
  const errors: string[] = [];
  const seen = { slug: new Set<string>(), title: new Set<string>(), desc: new Set<string>() };
  for (const p of pages) {
    const e = (m: string) => errors.push(`${p.slug}: ${m}`);
    if (seen.slug.has(p.slug)) e("Slug doppelt");
    seen.slug.add(p.slug);
    if (seen.title.has(p.metaTitle)) e("metaTitle doppelt");
    seen.title.add(p.metaTitle);
    if (seen.desc.has(p.metaDescription)) e("metaDescription doppelt");
    seen.desc.add(p.metaDescription);
    if (p.url !== `${PARTNER_BASE}/${p.slug}`) e(`url muss ${PARTNER_BASE}/${p.slug} sein`);
    if (p.metaTitle.length > PT.titleMax) e(`metaTitle ${p.metaTitle.length} Zeichen`);
    if (p.metaDescription.length > PT.descriptionMax) e(`metaDescription ${p.metaDescription.length} Zeichen`);
    const ka = p.kurzantwort.trim().split(/\s+/).length;
    if (ka < PT.shortMin || ka > PT.shortMax) e(`kurzantwort hat ${ka} Wörter (verlangt ${PT.shortMin}–${PT.shortMax})`);
    if (p.tables.length < 1) e("mindestens eine Tabelle erforderlich");
    for (const s of p.sections) if (s.table !== undefined && !p.tables[s.table]) e(`Abschnitt „${s.heading}“: Tabelle fehlt`);
    for (const t of p.tables) if (t.rows.some((r) => r.length !== t.head.length)) e(`Tabelle „${t.caption}“: Zeilenbreite`);
    for (const u of [...p.sources.map((x) => x.url), ...[...JSON.stringify(p.sections).matchAll(/\]\((https?:[^)\s]*)\)/g)].map((m) => m[1])]) {
      let host = "";
      try { host = new URL(u).hostname; } catch { /* ungültig */ }
      if (!u.startsWith("https://") || !ALLOWED_HOSTS.includes(host)) e(`externer Link ${u} nicht in der Liste geprüfter Quellen`);
    }
    if (!p.ctaTopic) e("ctaTopic fehlt");
    if (/TODO/.test(JSON.stringify(p))) e("TODO im Text");
    if (p.faq.length < PT.faqMin || p.faq.length > PT.faqMax) e(`${p.faq.length} FAQ (verlangt ${PT.faqMin}–${PT.faqMax})`);
    const w = wordCount(p);
    if (w < PT.wordsMin || w > PT.wordsMax) e(`${w} Wörter (verlangt ${PT.wordsMin}–${PT.wordsMax})`);
    // Versprechen: Fragen nach einer Garantie dürfen mit „Nein“ beantwortet werden, alles andere nicht
    const checked = [p.h1, p.kurzantwort, ...p.sections.map((x) => x.content), ...p.tables.flatMap((t) => t.rows.flat()),
      ...p.faq.filter((f) => !(/garantier|Auftragsgarantie/i.test(f.question) && /^Nein/.test(f.answer))).flatMap((f) => [f.question, f.answer])].join("\n");
    const promise = checked.match(PROMISES);
    if (promise) e(`Versprechen „${promise[0]}“`);
    if (/zertifizier|Prüfgesellschaft/i.test(visibleTexts(p).join("\n"))) e("verbotener Begriff");
    if (p.status === "published") {
      if (!p.reviewedBy) e("veröffentlicht, aber reviewedBy fehlt");
      if (!p.linksVerifiedManually) e("veröffentlicht, aber Links nicht geprüft");
      if (markerCount(p) > 0) e(`veröffentlicht, aber ${markerCount(p)} offene [PRÜFEN]-Marker`);
    }
  }
  return errors;
}
