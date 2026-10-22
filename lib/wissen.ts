import { branchenArticles } from "./artikel-branchen";
import { grundlagenArticles } from "./artikel-grundlagen";
import type { AreaSlug } from "./content";
import type { Article } from "./pages";

// Wissensbereich /wissen – Ziel: 20 bis 30 Fachartikel. Neue Artikel in artikel-*.ts anlegen;
// Sitemap, Übersichtsseite und Prüfbereichsseiten übernehmen sie automatisch.
export const articles: Article[] = [...grundlagenArticles, ...branchenArticles];

export const clusters: { name: Article["cluster"]; text: string }[] = [
  { name: "Grundlagen", text: "Was Betreiberverantwortung bedeutet und wer wofür haftet." },
  { name: "Organisation", text: "Kataster, Fristen, Delegation und Übernahmen in der Praxis." },
  { name: "Branchen", text: "Betreiberpflichten für Wohnungswirtschaft, Schulen, Pflege und Verwaltung." },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const articlesForArea = (slug: AreaSlug) => articles.filter((a) => a.areas?.includes(slug));
