// Prüft die Share-of-Voice-Seiten gegen die Daten in content/sov/ (Anleitung: content/sov/README.md).
// Aufruf gegen einen laufenden Server:  node scripts/check-sov.mjs http://localhost:3000
//                       oder live:      node scripts/check-sov.mjs https://www.betreibermanager.de
import { readFileSync } from "node:fs";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const report = JSON.parse(readFileSync(new URL("../content/sov/ki-report-dguv-v3-2026.json", import.meta.url)));
const articles = JSON.parse(readFileSync(new URL("../content/sov/fachbeitraege-themen.json", import.meta.url)));
const path = `/report/${report.slug}`;

let failures = 0;
const check = (ok, msg) => {
  console.log(`${ok ? "✓" : "✗"} ${msg}`);
  if (!ok) failures++;
};

const de1 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pct = (n) => `${de1.format(n)} %`;
const dec = (n) => de1.format(n);
const int = (n) => new Intl.NumberFormat("de-DE").format(n);
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;| /g, " ");
const text = (html) => decode(html.replace(/<!--.*?-->/gs, "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

async function get(p) {
  const res = await fetch(`${base}${p}`, { redirect: "manual" });
  return { status: res.status, body: await res.text() };
}

// ---- Report-Seite -----------------------------------------------------------------------------------------------
const page = await get(path);
check(page.status === 200, `${path} liefert 200 (${page.status})`);
const html = page.body;

// 1. Kurzantwort ist der erste Absatz im Hauptinhalt (nach Brotkrumen und H1)
const main = html.slice(html.indexOf("<main"));
const firstP = main.match(/<p[^>]*>(.*?)<\/p>/s);
check(firstP && text(firstP[1]) === report.shortAnswer, "Erster Absatz im <main> ist die Kurzantwort");
check(text(main.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1] ?? "") === report.title, "H1 = title");

// 2. Kennzahlen-Kacheln
const tiles = [...html.matchAll(/<dd data-stat="[^"]*">(.*?)<\/dd>/gs)].map((m) => text(m[1]));
const expectedTiles = [int(report.methodology.citations), int(report.methodology.runs), int(report.methodology.uniqueDomains), pct(report.keyFindings.maxSingleShare)];
check(JSON.stringify(tiles) === JSON.stringify(expectedTiles), `Kennzahlen ${tiles.join(" | ")} = JSON`);

// 3. Tabellen: jede Zeile exakt wie im JSON
const tables = [...html.matchAll(/<table class="data-table chart-table">(.*?)<\/table>/gs)].map((m) =>
  [...m[1].matchAll(/<tbody>(.*?)<\/tbody>/gs)][0][1]
    .split("</tr>")
    .filter((r) => r.includes("<t"))
    .map((r) => [...r.matchAll(/<t[hd][^>]*>(.*?)<\/t[hd]>/gs)].map((c) => text(c[1]))),
);
check(tables.length === 4, `4 Datentabellen im HTML (${tables.length})`);
const engines = Object.entries(report.byEngine);
const types = [...new Set([...Object.keys(report.keyFindings.sourceTypesOverall), ...engines.flatMap(([, e]) => Object.keys(e.sourceTypes))])].sort(
  (a, b) => (report.keyFindings.sourceTypesOverall[b] ?? 0) - (report.keyFindings.sourceTypesOverall[a] ?? 0),
);
const expectedTables = [
  report.keyFindings.top10.map((d) => [d.domain, pct(d.shareOfVoice), int(d.citations), d.type]),
  Object.entries(report.keyFindings.sourceTypesOverall).map(([t, v]) => [t, pct(v), report.keyFindings.firstPositionByType[t] !== undefined ? pct(report.keyFindings.firstPositionByType[t]) : "–"]),
  engines.map(([n, e]) => [n, int(e.runs), int(e.citations), dec(e.avgSourcesPerAnswer)]),
  types.map((t) => [t, ...engines.map(([, e]) => (e.sourceTypes[t] !== undefined ? pct(e.sourceTypes[t]) : "–"))]),
];
const names = ["Top 10 Domains", "Quellentypen gesamt", "Quellen pro Antwort", "Quellentypen je KI-System"];
expectedTables.forEach((exp, i) => {
  const ok = JSON.stringify(tables[i]) === JSON.stringify(exp);
  check(ok, `Tabelle „${names[i]}“ = JSON`);
  if (!ok) console.log("   ist:", JSON.stringify(tables[i]), "\n   soll:", JSON.stringify(exp));
});

// 4. Jeder Balkenwert stammt aus dem JSON
const barValues = [...html.matchAll(/<span class="bar-value">(.*?)<\/span>/gs)].map((m) => text(m[1]));
const allowed = new Set(expectedTables.flat(2));
const strays = barValues.filter((v) => !allowed.has(v));
check(barValues.length > 0 && strays.length === 0, `${barValues.length} Balkenwerte, alle aus dem JSON${strays.length ? ` – fremd: ${strays}` : ""}`);

// 5. Zahlen im Methodik-Abschnitt
const method = text(html.match(/<dl class="method-list">(.*?)<\/dl>/s)?.[1] ?? "");
for (const n of [report.methodology.prompts, report.methodology.runs, report.methodology.citations, report.methodology.uniqueDomains, report.keyFindings.domainsCitedOnce]) {
  check(method.includes(int(n)), `Methodik enthält ${int(n)}`);
}

// 6. JSON-LD
const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
const byType = (t) => ld.find((d) => (Array.isArray(d["@type"]) ? d["@type"].includes(t) : d["@type"] === t));
const art = byType("Report");
check(art && art["@type"].includes("Article") && art.headline === report.title && art.datePublished === report.datePublished && !!art.publisher && !!art.author && !!art.image, "JSON-LD Article/Report vollständig");
const ds = byType("Dataset");
check(
  ds && ds.name && ds.description?.length >= 50 && ds.temporalCoverage === "2026-11-10/2026-11-11" && ds.creator?.["@type"] === "Organization" && ds.measurementTechnique === report.methodology.scoring && ds.variableMeasured === "Share of Voice in KI-Antworten",
  "JSON-LD Dataset vollständig",
);
const faq = byType("FAQPage");
check(faq && faq.mainEntity.length === report.faq.length && faq.mainEntity.every((q, i) => q.name === report.faq[i].question && q.acceptedAnswer.text === report.faq[i].answer), "JSON-LD FAQPage = faq[]");
const bc = byType("BreadcrumbList");
check(bc && bc.itemListElement.map((i) => i.name).join(" › ") === "Startseite › Reports › KI-Report DGUV V3 2026", "JSON-LD BreadcrumbList");
check(ld.every((d) => d["@context"] === "https://schema.org"), `Alle ${ld.length} JSON-LD-Blöcke mit @context schema.org`);

// 7. Meta
check(text(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "") === report.metaTitle, "<title> = metaTitle");
check(html.includes(`<link rel="canonical" href="https://www.betreibermanager.de${path}"/>`), "canonical gesetzt");
check(/property="og:image" content="[^"]*\/report\/[^"]*opengraph-image/.test(html), "og:image des Reports gesetzt");

// ---- Übersicht, Fachbeiträge, Sitemap, Linkboxen ----------------------------------------------------------------
check((await get("/report")).status === 200, "/report liefert 200");
const published = articles.filter((a) => a.status === "published");
const ov = await get("/fachbeitraege");
check(published.length > 0 ? ov.status === 200 : ov.status === 404, `/fachbeitraege liefert ${ov.status} (${published.length} veröffentlicht)`);
for (const a of articles.filter((a) => a.status !== "published")) {
  check((await get(`/fachbeitraege/${a.slug}`)).status === 404, `Entwurf /fachbeitraege/${a.slug} liefert 404`);
}
const sitemap = (await get("/sitemap.xml")).body;
check(sitemap.includes(`${path}</loc>`) && sitemap.includes("/report</loc>"), "Sitemap enthält Report und /report");
check(articles.filter((a) => a.status !== "published").every((a) => !sitemap.includes(`/fachbeitraege/${a.slug}`)) && (published.length > 0 || !sitemap.includes("/fachbeitraege")), "Sitemap enthält keine Entwürfe");
for (const p of ["/elektropruefung-dguv-v3", "/fachpartner", "/"]) {
  check((await get(p)).body.includes(`href="${path}"`), `${p} verlinkt den Report`);
}

console.log(failures === 0 ? "\nAlle Prüfungen bestanden." : `\n${failures} Prüfung(en) fehlgeschlagen.`);
process.exit(failures === 0 ? 0 : 1);
