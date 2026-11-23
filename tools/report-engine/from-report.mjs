#!/usr/bin/env node
// Leitet aus dem veröffentlichten KI-Report (Aggregatwerte) eine Messdatei ab: node tools/report-engine/from-report.mjs
// Es werden nur Werte übernommen, die wörtlich im Report stehen. Einzelantworten und Nennungen (mentions) liegen
// dort nicht vor und bleiben leer/null; Scores, die Einzelantworten brauchen, sind deshalb null.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const r = JSON.parse(readFileSync(join(root, "content/sov/ki-report-dguv-v3-2026.json"), "utf8"));
const PROVIDER = "Prüfdienstleister & Fachbetriebe";
const k = r.keyFindings;
// Rangfolge: Zitationen absteigend, bei Gleichstand höherer Share of Voice
const byCitations = (list) => [...list].sort((a, b) => b.citations - a.citations || b.shareOfVoice - a.shareOfVoice);
const m = {
  cluster: "pruefdienste",
  month: "2026-11",
  mock: false,
  source: "report-aggregate",
  granularity: "aggregate",
  reportSlug: r.slug,
  dateLabel: "10. und 11. November 2026",
  temporalCoverage: "2026-11-10/2026-11-11",
  engines: r.methodology.engines,
  promptCount: r.methodology.prompts,
  answerCount: r.methodology.runs,
  totalCitations: r.methodology.citations,
  uniqueDomains: r.methodology.uniqueDomains,
  providerCount: null,
  rankingComplete: false,
  rankingNote:
    "Die Messdatei enthält bisher nur die Anbieter-Domains der Top-10-Liste des Reports. Die vollständige Liste aller genannten Anbieter folgt mit der Einzelauswertung der Antworten.",
  top10ShareCombined: k.top10ShareCombined,
  maxSingleShare: k.maxSingleShare,
  outsideProviderShare: Math.round((100 - k.sourceTypesOverall[PROVIDER]) * 10) / 10,
  topDomains: k.top10.map(({ domain, citations, shareOfVoice, type }) => ({ domain, citations, shareOfVoice, type })),
  providers: byCitations(k.top10.filter((d) => d.type === PROVIDER))
    .map((d) => ({ name: d.domain, domain: d.domain, mentions: null, shareOfAnswers: null, citations: d.citations, shareOfVoice: d.shareOfVoice })),
  byEngine: Object.fromEntries(
    Object.entries(r.byEngine).map(([e, v]) => [
      e,
      {
        answers: v.runs,
        providers: byCitations(v.top5.filter((d) => d.type === PROVIDER))
          .map((d) => ({ name: d.domain, domain: d.domain, citations: d.citations, shareOfVoice: d.shareOfVoice })),
      },
    ]),
  ),
  scores: { sovScore: null, citedAnswers: null, partnerMentions: null, anbietercheckSov: null, anbietercheckAnswers: null },
  answers: [],
};
writeFileSync(join(root, "content/measurements/pruefdienste-2026-11.json"), JSON.stringify(m, null, 2) + "\n");
console.log("content/measurements/pruefdienste-2026-11.json geschrieben,", m.providers.length, "Anbieter-Domains");
