// B2B-Landingpages prüfen und deliverables/b2b-landingpages.csv erzeugen.
// Aufruf: npm run b2b:report   (Node ≥ 22.18: TypeScript wird direkt ausgeführt)
// Prüft dieselben Regeln wie die Qualitätsschranke im Build (lib/b2b-core.ts) plus Abnahmekriterien des Briefings:
// Wortzahl, FAQ, Quellen, interne Links (Ziel existiert), Titel-/Description-Länge, JSON-LD, verbotene Begriffe, unbelegte Zahlen.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { THRESHOLDS, markerCount, openMarkers, previewPath, validatePages, visibleTexts, wordCount } from "../lib/b2b-core.ts";
import { validateSchemas } from "../lib/b2b-schema.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const readJson = (p) => JSON.parse(read(p));
const siteUrl = read("lib/site.ts").match(/url: "(https:\/\/[^"]+)"/)[1];

const pages = fs
  .readdirSync(path.join(root, "content/b2b"))
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => readJson(`content/b2b/${f}`));

// ---- Bekannte Routen (für die Prüfung der internen Links) -------------------------------------------------------
const known = new Set(["/", "/prueffristen", "/leistungen", "/kontakt", "/externer-betreibermanager", "/betreiberpflichten", "/dguv-v3-pruefung-kosten", "/elektropruefung-dguv-v3", "/wissen"]);
const slugs = (file, re) => [...read(file).matchAll(re)].map((m) => m[1]);
slugs("lib/leistungsseiten.ts", /^\s{4}slug: "([^"]+)"/gm).forEach((s) => known.add(`/${s}`));
slugs("lib/staedteseiten.ts", /^\s{4}slug: "([^"]+)"/gm).forEach((s) => known.add(`/${s}`));
slugs("lib/leistungen.ts", /^\s{4}slug: "([^"]+)"/gm).forEach((s) => known.add(`/betreiberpflichten/${s}`));
slugs("lib/content.ts", /^\s{4}slug: "([^"]+)"/gm).forEach((s) => known.add(`/pruefbereiche/${s}`));
for (const f of fs.readdirSync(path.join(root, "lib")).filter((f) => f.startsWith("artikel-")))
  slugs(`lib/${f}`, /^\s*slug: "([^"]+)"/gm).forEach((s) => known.add(`/wissen/${s}`));
readJson("content/elektropruefung/elektropruefung-commercial.json").forEach((c) => known.add(`/elektropruefung-dguv-v3/${c.slug}`));
readJson("content/elektropruefung/elektropruefung-wissen.json").forEach((k) => known.add(`/wissen/elektropruefung/${k.slug}`));
pages.forEach((p) => known.add(p.url));

// ---- Prüfungen --------------------------------------------------------------------------------------------------
const FORBIDDEN = /zertifizier|Prüfgesellschaft|wir prüfen|garantiert|garantier/i;
// Normbezeichnungen und erlaubte Referenzwerte (Abschnitt 5 des Briefings); alles andere mit Ziffern wird zur Durchsicht gemeldet.
const KNOWN_IDS = [
  /DGUV (?:Vorschrift|V) ?\d+/g, /§§? ?\d+(?:(?:, ?| und )\d+)*/g, /Abs\. ?\d+/g, /ASR A\d\.\d/g, /VDI \d{4}/g, /DIN (?:EN |VDE |V )?[\d-]+/g, /TRBS \d+/g, /GEFMA \d+/g,
  /Tabelle \d[AB]/g, /Blatt \d/g, /Anhang \d/g, /\b100 (?:KBE|ml)/g, /18\.12\.2025/g, /\bunter 2 %/g, /\b2 %/g, /\b(?:1|2|3|4|6|12) (?:Jahr(?:e[n]?)?|Monat(?:e[n]?)?)\b/g,
  /\b(?:zwei|drei|vier|sechs)\b/g, /\b24\/7\b/g, /\b3PL\b/g, /\b2026-\d\d-\d\d\b/g, /\b[AB]\d\b/g, /KBE\/100 ml/g, /\b0100-710\b/g, /\b710\b/g,
];
const numberFindings = (p) => {
  let t = visibleTexts(p).join("\n").replace(/\[PRÜFEN[^\]]*\]/g, "");
  for (const re of KNOWN_IDS) t = t.replace(re, " ");
  return [...new Set(t.match(/\d[\d.,]*/g) ?? [])];
};
const contentLinks = (p) => [...JSON.stringify(p).matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1].split("#")[0].split("?")[0]);

// Freigegebene Seiten (schriftlich von Henryk). Nur diese dürfen live gehen, und nur wenn das Gate bestanden ist.
const APPROVED = ["gewerbeimmobilien", "immobilienportfolios", "industriestandorte"];
const REVIEWED_BY = "Redaktion betreibermanager.de";
// Linkprüfung der Quellen: `--check-links` (braucht Netzzugang zu gesetze-im-internet.de, baua.de, dguv.de, vdi.de, dinmedia.de, gefma.de)
const checkLinks = process.argv.includes("--check-links");
const linkStatus = new Map();
if (checkLinks) {
  for (const u of new Set(pages.flatMap((p) => p.sources.map((x) => x.url)))) {
    try {
      const r = await fetch(u, { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "user-agent": "Mozilla/5.0" } });
      linkStatus.set(u, r.status);
    } catch {
      linkStatus.set(u, 0);
    }
  }
}
/** Gründe, warum eine freigegebene Seite nicht live gehen darf (leer = Gate bestanden) */
const gateReasons = (p) => {
  const r = [];
  if (!APPROVED.includes(p.slug)) return ["nicht freigegeben"];
  const m = markerCount(p);
  if (m) r.push(`${m} offene [PRÜFEN]-Marker`);
  if (p.cannibalization.decision === "bestehende Seite erweitern") r.push("Kannibalisierung: bestehende Seite erweitern");
  if (!checkLinks) r.push("Quellenlinks nicht per HTTP geprüft (--check-links)");
  else for (const x of p.sources) if (linkStatus.get(x.url) !== 200) r.push(`Quelle ${x.url}: HTTP ${linkStatus.get(x.url)}`);
  return r;
};

const buildErrors = validatePages(pages);
const rows = [];
let problems = 0;
const warn = (p, msg) => {
  problems++;
  console.log(`  ✗ ${p.slug}: ${msg}`);
};

for (const p of pages) {
  const words = wordCount(p);
  const schemaErrors = validateSchemas(p, pages, siteUrl);
  const links = [...new Set([...p.internalLinks.map((l) => l.href), ...contentLinks(p)])];
  const existing = [...new Set(p.internalLinks.map((l) => l.href).concat(contentLinks(p)))].filter((h) => !h.startsWith("/pruefmanagement/"));
  const related = p.internalLinks.filter((l) => l.href.startsWith("/pruefmanagement/"));

  if (words < THRESHOLDS.wordsMin || words > THRESHOLDS.wordsMax) warn(p, `Wortzahl ${words} außerhalb ${THRESHOLDS.wordsMin}–${THRESHOLDS.wordsMax}`);
  if (p.faq.length < THRESHOLDS.faqMin || p.faq.length > THRESHOLDS.faqMax) warn(p, `FAQ: ${p.faq.length}`);
  if (p.sources.length < THRESHOLDS.sourcesMin) warn(p, `Quellen: ${p.sources.length}`);
  if (existing.length < THRESHOLDS.linksMin) warn(p, `nur ${existing.length} Links auf bestehende Seiten`);
  if (related.length === 0) warn(p, "kein Link auf verwandte neue Seite");
  for (const h of links) if (!known.has(h)) warn(p, `Link auf unbekannte Seite ${h}`);
  for (const h of p.cannibalization.relatedUrls) if (!known.has(h)) warn(p, `cannibalization.relatedUrls: unbekannte Seite ${h}`);
  for (const l of p.internalLinksFromExisting) if (!known.has(l.from)) warn(p, `internalLinksFromExisting: unbekannte Seite ${l.from}`);
  if (p.aiPrompts.length < 5 || p.aiPrompts.length > 8) warn(p, `aiPrompts: ${p.aiPrompts.length} (5–8 verlangt)`);
  if (schemaErrors.length) warn(p, `JSON-LD: ${schemaErrors.join("; ")}`);
  const bad = visibleTexts(p).concat(p.internalLinks.map((l) => `${l.label} ${l.note}`)).join("\n").match(FORBIDDEN);
  if (bad) warn(p, `verbotener Begriff „${bad[0]}“`);
  const nums = numberFindings(p);
  if (nums.length) console.log(`  ℹ ${p.slug}: Zahlen zur Durchsicht: ${nums.join(" ")}`);

  rows.push([
    p.h1, p.url, p.zielkunde, p.primaryIntent, p.aiPrompts.join(" | "), p.metaTitle, p.metaDescription, words, p.faq.length,
    links.join(" | "), p.sources.map((s) => `${s.label} <${s.url}>`).join(" | "),
    `${markerCount(p)}${markerCount(p) ? ": " + openMarkers(p).join(" ") : ""}`,
    schemaErrors.length ? `Fehler: ${schemaErrors.join("; ")}` : "ok",
    `${p.cannibalization.decision} (${p.cannibalization.relatedUrls.join(", ")})`,
    p.status === "published" ? "published" : APPROVED.includes(p.slug) ? `blockiert durch Gate: ${gateReasons(p).join("; ")}` : "draft (nicht freigegeben)",
    p.status === "published" ? `${siteUrl}${p.url}` : "–", p.status === "published" ? p.lastReviewed : "–", `${siteUrl}${previewPath(p)}`,
  ]);
}
for (const e of buildErrors) {
  problems++;
  console.log(`  ✗ ${e}`);
}

const header = ["Seitentitel", "URL", "Zielkunde", "Kommerzielle Hauptintention", "Verwandte KI-Prompts", "Meta-Title", "Meta-Description", "Wortzahl", "Anzahl FAQ", "Interne Links", "Regulatorische Quellen", "Offene [PRÜFEN]-Marker", "JSON-LD-Validierung", "Kannibalisierungs-Entscheidung", "Status", "Live-URL", "Veröffentlicht am", "Vorschau-Link (ohne Token)"];
const cell = (v) => `"${String(v).replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
const csv = "﻿" + [header, ...rows].map((r) => r.map(cell).join(";")).join("\r\n") + "\r\n";
fs.mkdirSync(path.join(root, "deliverables"), { recursive: true });
fs.writeFileSync(path.join(root, "deliverables/b2b-landingpages.csv"), csv);

console.log(`\n${pages.length} Seiten geprüft, ${problems} Beanstandung(en). CSV: deliverables/b2b-landingpages.csv`);
console.table(pages.map((p) => ({ slug: p.slug, status: p.status, wörter: wordCount(p), faq: p.faq.length, quellen: p.sources.length, "[PRÜFEN]": markerCount(p), entscheidung: p.cannibalization.decision })));
process.exit(problems ? 1 : 0);
