import { arbeitsmittelArticles } from "./artikel-arbeitsmittel";
import { branchenArticles } from "./artikel-branchen";
import { elektroArticles } from "./artikel-elektro";
import { grundlagenArticles } from "./artikel-grundlagen";
import { wasserLuftArticles } from "./artikel-wasser-luft";
import type { AreaSlug } from "./content";
import type { Article } from "./pages";

// Wissensbereich /wissen – 20 Fachartikel aus dem Longtail der Anlage-A-Begriffe (Lastenheft K-04, Liste in
// docs/seo-konzept.md 3.4) plus Artikel zu Zielgruppen der Anlage B als Vertriebsunterstützung.
// Neue Artikel in artikel-*.ts anlegen; Sitemap, Übersichtsseite und Prüfbereichsseiten übernehmen sie automatisch.
export const articles: Article[] = [
  ...elektroArticles,
  ...arbeitsmittelArticles,
  ...wasserLuftArticles,
  ...grundlagenArticles,
  ...branchenArticles,
];

export const clusters: { name: Article["cluster"]; text: string }[] = [
  { name: "Elektro", text: "DGUV V3 Prüfung: Fristen, Eigenprüfung, Protokolle und Qualifikation der Prüfer." },
  { name: "Arbeitsmittel & Brandschutz", text: "UVV-Prüfungen, Feuerlöscher und Regale." },
  { name: "Trinkwasser & Lüftung", text: "Legionellenprüfung und Hygiene raumlufttechnischer Anlagen nach VDI 6022." },
  { name: "Organisation", text: "Prüffristen festlegen, Kataster, Facility Management und Objektübernahmen." },
  { name: "Grundlagen", text: "Haftung und Verantwortung bei Betreiberpflichten." },
  { name: "Branchen", text: "Prüfpflichten in Wohnungswirtschaft, Schulen, Pflege und Hausverwaltung." },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const articlesForArea = (slug: AreaSlug) => articles.filter((a) => a.areas?.includes(slug));
