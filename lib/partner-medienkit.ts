import sitemap from "@/app/sitemap";
import { slots, regionen, themen } from "@/lib/partner-regions";
import { site } from "@/lib/site";
import { ARTICLE_BASE, REPORT_BASE } from "@/lib/sov";

// Medienkit /fachpartner: keine Besucher- oder Anfragezahlen. Gezählt werden nur veröffentlichte Fachseiten aus den Content-Dateien.

export const zielgruppen = ["Facility Manager", "Betreiber", "Kommunen", "Kliniken", "Wohnungswirtschaft", "Industrie"];

// Quelle ist die Sitemap selbst (app/sitemap.ts, erzeugt aus den Content-Dateien): Die Zählung enthält genau die veröffentlichten
// URLs, nichts ist hartkodiert. Nicht gezählt werden Startseite, Kontakt, Impressum, Über uns, Autorenseiten, Fachpartner-Seiten
// sowie die Übersichtsseiten /wissen, /fachbeitraege und /report. Der Hub der Elektroprüfung zählt zu den Antwortseiten.
const paths = sitemap().map((e) => e.url.slice(site.url.length) || "/");

const ELEKTRO = "/elektropruefung-dguv-v3";
const groups: [label: string, test: (p: string) => boolean][] = [
  ["Antwortseiten Elektroprüfung DGUV V3 (inkl. Hub)", (p) => p === ELEKTRO || p.startsWith(`${ELEKTRO}/`)],
  ["Wissensartikel Elektroprüfung", (p) => p.startsWith("/wissen/elektropruefung/")],
  ["Wissensartikel", (p) => p.startsWith("/wissen/")],
  ["Fachbeiträge", (p) => p.startsWith(`${ARTICLE_BASE}/`)],
  ["Reports", (p) => p.startsWith(`${REPORT_BASE}/`)],
];
const excluded = (p: string) =>
  p === "/" || p === "/wissen" || p === ARTICLE_BASE || p === REPORT_BASE ||
  ["/ueber-uns", "/kontakt", "/impressum"].includes(p) ||
  p.startsWith("/autoren") || p.startsWith("/fachpartner");

const counts = new Map<string, number>();
let sonstige = 0;
for (const p of paths) {
  if (excluded(p)) continue;
  const g = groups.find(([, test]) => test(p));
  if (g) counts.set(g[0], (counts.get(g[0]) ?? 0) + 1);
  else sonstige++;
}

export const fachseiten: [label: string, count: number][] = [
  ...groups.map(([label]): [string, number] => [label, counts.get(label) ?? 0]),
  ["Leistungs- und Prüfseiten", sonstige] as [string, number],
].filter(([, n]) => n > 0);
export const fachseitenGesamt = fachseiten.reduce((sum, [, n]) => sum + n, 0);
/** Alle URLs der Sitemap (zur Gegenprobe) */
export const sitemapUrls = paths.length;

/** Freie Bundesland-Slots je Thema (Slots „bundesweit“ zählen nicht mit) */
export const slotUebersicht = themen.map((t) => {
  const own = slots.filter((s) => s.thema === t.slug && s.region !== "bundesweit");
  return { thema: t, frei: own.filter((s) => s.status === "frei").length, gesamt: regionen.length };
});
