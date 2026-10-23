import type { AreaSlug, FaqEntry } from "./content";
import type { NormKey } from "./normen";

// Inhaltsbausteine für Leistungsseiten, Städte-Seiten, Landingpages und Fachartikel.
// Fließtext unterstützt **fett** und [Linktext](/pfad).
// Vorgaben aus dem Lastenheft (v1.0, 22.10.2026), die jede Seite erfüllen muss:
//   G-01/I-02  lead[0] beantwortet die Suchanfrage in zwei bis drei Sätzen, ohne Hinführung
//   I-03       Gliederung: Was ist das, wer ist verpflichtet, wie oft, wer darf prüfen, was kostet es, Folgen
//   I-04/G-02  mindestens eine Tabelle, Fakten in Tabellen oder Listen
//   I-05       drei bis fünf FAQ
//   I-08       mindestens ein Praxisbeispiel aus Wohnungswirtschaft, öffentlicher Verwaltung oder Klinik/Pflege
//   R-01/R-02  jede Frist mit Rechtsgrundlage im Text, Quellenliste mit Fundstelle und Fassung
//   R-04       wo keine pauschale Frist besteht, steht das ausdrücklich da – nichts schätzen
//   T-06       mindestens drei interne Links im Text oder unter `related`
export type Block =
  | { type: "h2"; text: string; id?: string }
  | { type: "p"; text: string }
  | { type: "definition"; term: string; text: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "checklist"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "example"; title: string; text: string[] }
  | { type: "note"; text: string };

type ContentPage = {
  slug: string;
  /** Hauptkeyword (K-01/K-03) – genau eine Seite je Hauptkeyword */
  keyword: string;
  /** höchstens fünf Nebenkeywords (K-03) */
  secondary: string[];
  /** <title>, höchstens 60 Zeichen (T-02) */
  title: string;
  /** Meta-Description, höchstens 155 Zeichen (T-02) */
  description: string;
  h1: string;
  kicker: string;
  lead: string[];
  blocks: Block[];
  faqs: FaqEntry[];
  /** Quellenliste (R-02): Regelwerk und Fundstelle; die Fassung kommt aus lib/normen.ts */
  sources: [norm: NormKey, ref: string][];
  /** Weiterführende interne Links: [Titel, Pfad, Kurzbeschreibung] */
  related: [title: string, path: string, note: string][];
  cta: string;
};

/** Leistungsseiten, Städte-Seiten und Zielgruppen-Landingpages – alle mit Formular „Bestandsaufnahme anfragen“ */
export type ServicePage = ContentPage & {
  /** Kurzname für Navigation, Breadcrumb und Karten */
  name: string;
  serviceType: string;
  cardText: string;
  highlights: string[];
};

export type Article = ContentPage & {
  cluster: "Grundlagen" | "Organisation" | "Elektro" | "Trinkwasser & Lüftung" | "Brandschutz & Lager" | "Branchen";
  teaser: string;
  /** Prüfbereichsseiten, auf denen der Artikel verlinkt wird */
  areas?: AreaSlug[];
  /** ISO-Datum */
  published: string;
  modified: string;
};
