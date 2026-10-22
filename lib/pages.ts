import type { AreaSlug, FaqEntry } from "./content";
import type { NormKey } from "./normen";

// Inhaltsbausteine für Landingpages und Fachartikel. Fließtext unterstützt **fett** und [Linktext](/pfad).
// Jede Seite kombiniert Definition, Tabelle, Checkliste, Praxisbeispiel, FAQ und Regelwerksbezüge –
// diese Struktur wird von Suchmaschinen und KI-Systemen besonders gut ausgewertet und zitiert.
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
  /** <title> ohne Markenzusatz, max. ca. 60 Zeichen */
  title: string;
  /** Meta-Description, max. ca. 155 Zeichen */
  description: string;
  h1: string;
  kicker: string;
  /** Einleitung: der erste Absatz beantwortet die Suchanfrage direkt */
  lead: string[];
  blocks: Block[];
  faqs: FaqEntry[];
  norms: NormKey[];
  /** Weiterführende interne Links: [Titel, Pfad, Kurzbeschreibung] */
  related: [title: string, path: string, note: string][];
  cta: string;
};

/** Leistungs- und Zielgruppenseiten mit Anfrageformular */
export type ServicePage = ContentPage & {
  /** Kurzname für Navigation, Breadcrumb und Karten */
  name: string;
  serviceType: string;
  cardText: string;
  /** Bullets im Kopfbereich */
  highlights: string[];
};

export type Article = ContentPage & {
  cluster: "Grundlagen" | "Organisation" | "Branchen";
  teaser: string;
  /** Prüfbereichsseiten, auf denen der Artikel verlinkt wird */
  areas?: AreaSlug[];
  /** ISO-Datum */
  published: string;
  modified: string;
};
