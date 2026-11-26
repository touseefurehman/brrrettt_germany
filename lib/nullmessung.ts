import { normDomain } from "../tools/report-engine/aggregate.mjs";
import type { Measurement } from "@/lib/measurement";

// Nullmessung: gleicht ein Unternehmen mit der letzten echten Messung ab. Keine neue KI-Abfrage, nur Auswertung der Messdatei.

export { normDomain };

const FREEMAIL = new Set([
  "gmail.com", "googlemail.com", "gmx.de", "gmx.net", "gmx.at", "gmx.ch", "web.de", "t-online.de", "outlook.com", "outlook.de",
  "hotmail.com", "hotmail.de", "live.com", "live.de", "yahoo.com", "yahoo.de", "icloud.com", "me.com", "mail.de", "freenet.de",
  "posteo.de", "protonmail.com", "proton.me", "aol.com", "online.de", "arcor.de", "mailbox.org", "web.com", "msn.com",
  "mac.com", "aol.de", "1und1.de", "email.de", "mail.com", "yandex.com", "zoho.com", "gmx.com", "tutanota.com", "tuta.io",
]);
export const isFreemail = (email: string) => FREEMAIL.has(email.split("@")[1]?.toLowerCase() ?? "");

const LEGAL = /\b(gmbh|mbh|ag|kg|kgaa|ohg|gbr|ug|se|ek|e\s?k|e\s?v|co|und|inc|ltd|haftungsbeschraenkt|partg)\b/g;

/** Firmenname vergleichbar machen: Kleinbuchstaben, Umlaute aufgelöst, Rechtsformen und Satzzeichen entfernt */
export function normName(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/&/g, " und ")
    .replace(/[.,;:()"'’/\\-]+/g, " ")
    .replace(LEGAL, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Gleicher Name nach Normalisierung, oder einer enthält den anderen (mind. 5 Zeichen), oder gleiche Wortmenge */
export function nameMatches(a: string, b: string): boolean {
  const x = normName(a);
  const y = normName(b);
  if (!x || !y) return false;
  if (x === y) return true;
  if (x.length >= 5 && y.length >= 5 && (x.includes(y) || y.includes(x))) return true;
  const tx = new Set(x.split(" "));
  const ty = y.split(" ");
  return ty.length > 0 && ty.every((t) => tx.has(t)) && tx.size === ty.length;
}

/** Domain gleich oder Subdomain der anderen */
export const domainMatches = (a: string, b: string) => !!a && !!b && (a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`));

export type Findings = {
  month: string;
  dateLabel: string;
  granularity: "answers" | "aggregate";
  answerCount: number;
  promptCount: number;
  engines: string[];
  company: string;
  domain: string;
  named: boolean;
  /** Nennungen in Antworten; null = nicht erhoben (Aggregatdatei) */
  mentions: number | null;
  mentionShare: number | null;
  citations: number;
  citedPages: string[];
  bestPosition: number | null;
  enginesWithoutMention: string[];
  topProviderMentions: number | null;
  competitors: { name: string; mentions: number | null; citations: number | null }[];
  topSources: { domain: string; citations: number; shareOfVoice: number }[];
  outsideProviderShare: number | null;
};

export function computeFindings(m: Measurement, company: string, domainInput: string): Findings {
  const domain = normDomain(domainInput);
  const isSelf = (p: { name: string; domain: string | null }) => (p.domain ? domainMatches(p.domain, domain) : false) || nameMatches(p.name, company);
  const self = m.providers.find(isSelf);

  let mentions: number | null = null;
  let citations = self?.citations ?? 0;
  let citedPages: string[] = [];
  let bestPosition: number | null = null;
  let enginesWithoutMention: string[] = [];

  if (m.granularity === "answers") {
    const names = new Set<string>(m.answers.flatMap((a) => a.mentions).filter((n) => nameMatches(n, company)));
    if (self) names.add(self.name);
    const named = m.answers.filter((a) => a.mentions.some((n) => names.has(n)));
    mentions = named.length;
    const own = m.answers.flatMap((a) => a.citations.filter((c) => domainMatches(c.domain, domain)));
    citations = own.length;
    citedPages = [...new Set(own.map((c) => c.url))].slice(0, 10);
    const positions = [...named.map(() => 0), ...own.map((c) => c.position)].filter((p) => p > 0);
    bestPosition = positions.length ? Math.min(...positions) : null;
    enginesWithoutMention = m.engines.filter((e) => !named.some((a) => a.engine === e));
  } else if (self) {
    citations = self.citations ?? 0;
  }
  const named = (mentions ?? 0) > 0 || citations > 0 || !!self;

  const others = m.providers.filter((p) => !isSelf(p));
  const ranked = [...others].sort((a, b) => (b.mentions ?? -1) - (a.mentions ?? -1) || (b.citations ?? 0) - (a.citations ?? 0));
  return {
    month: m.month,
    dateLabel: m.dateLabel,
    granularity: m.granularity,
    answerCount: m.answerCount,
    promptCount: m.promptCount,
    engines: m.engines,
    company,
    domain,
    named,
    mentions,
    mentionShare: mentions != null && m.answerCount ? Math.round((mentions / m.answerCount) * 1000) / 10 : null,
    citations,
    citedPages,
    bestPosition,
    enginesWithoutMention,
    topProviderMentions: m.providers.reduce<number | null>((max, p) => (p.mentions != null && (max == null || p.mentions > max) ? p.mentions : max), null),
    competitors: ranked.slice(0, 5).map((p) => ({ name: p.name, mentions: p.mentions, citations: p.citations })),
    topSources: m.topDomains.slice(0, 5).map((d) => ({ domain: d.domain, citations: d.citations, shareOfVoice: d.shareOfVoice })),
    outsideProviderShare: m.outsideProviderShare,
  };
}
