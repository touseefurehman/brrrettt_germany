// Autorenprofile für den Wissensbereich (GEO-Audit, Aufgabe 4). Ein namentlicher Autor mit
// Qualifikationsnachweis ist bei Themen wie TRBS 1203 oder Organisationsverschulden das stärkste Vertrauenssignal.
// Angaben liefert der Auftraggeber. Solange `name` ein Platzhalter ist, gibt es keine Profilseite und die
// Artikel zeigen weiter „Redaktion betreibermanager.de“. Schreibt nur eine Person, genügt ein Eintrag.
import { isSet } from "./site";

export type Author = {
  /** URL unter /autoren/<slug>, z. B. "max-mustermann" */
  slug: string;
  name: string;
  /** Funktion, z. B. "Geschäftsführer, Elektroingenieur" */
  role: string;
  /** Fachliche Qualifikation, z. B. "Elektrotechnikermeister", "befähigte Person nach TRBS 1203" */
  qualifications: string[];
  /** z. B. "18" */
  yearsOfExperience: string;
  expertise: string[];
  /** Kurzer Werdegang in zwei bis vier Sätzen */
  bio: string;
  /** Pfad unter /public, z. B. "/assets/autoren/max-mustermann.webp" – leer lassen, solange kein Foto vorliegt */
  photo?: string;
  /** LinkedIn, XING o. Ä. */
  sameAs?: string[];
};

const allAuthors: Author[] = [
  {
    slug: "redaktion",
    name: "[Name des Autors]",
    role: "[Funktion]",
    qualifications: [],
    yearsOfExperience: "[Berufsjahre]",
    expertise: ["Betreiberpflichten", "Prüforganisation", "DGUV Vorschrift 3", "BetrSichV"],
    bio: "[Werdegang]",
  },
];

export const authors = allAuthors.filter((a) => isSet(a.name));

export const authorBySlug = (slug: string) => authors.find((a) => a.slug === slug);

/** Autor eines Artikels; ohne eigene Zuordnung der erste eingetragene Autor. */
export const authorFor = (slug?: string) => (slug && authorBySlug(slug)) || authors[0];

export const authorPath = (a: Author) => `/autoren/${a.slug}`;
