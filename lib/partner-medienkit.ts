import wissenElektro from "@/content/elektropruefung/elektropruefung-wissen.json";
import { leistungsseiten } from "@/lib/leistungsseiten";
import { slots, regionen, themen } from "@/lib/partner-regions";
import { reports, publishedArticles } from "@/lib/sov";
import { articles as wissenArtikel } from "@/lib/wissen";

// Medienkit /fachpartner: keine Besucher- oder Anfragezahlen. Gezählt werden nur veröffentlichte Fachseiten aus den Content-Dateien.

export const zielgruppen = ["Facility Manager", "Betreiber", "Kommunen", "Kliniken", "Wohnungswirtschaft", "Industrie"];

export const fachseiten: [label: string, count: number][] = [
  ["Leistungs- und Prüfseiten", leistungsseiten.length],
  ["Wissensartikel", wissenArtikel.length],
  ["FAQ-Seiten Elektroprüfung", (wissenElektro as unknown[]).length],
  ["Fachbeiträge", publishedArticles.length],
  ["Reports mit eigenen Daten", reports.length],
];
export const fachseitenGesamt = fachseiten.reduce((sum, [, n]) => sum + n, 0);

/** Freie Bundesland-Slots je Thema (Slots „bundesweit“ zählen nicht mit) */
export const slotUebersicht = themen.map((t) => {
  const own = slots.filter((s) => s.thema === t.slug && s.region !== "bundesweit");
  return { thema: t, frei: own.filter((s) => s.status === "frei").length, gesamt: regionen.length };
});
