import regionenData from "@/content/partners/regionen.json";

// Auswahlwerte der Prüfpartner-Bewerbung. Ohne Server-Abhängigkeiten, damit Formular (Client) und Server dieselben Listen nutzen.

export const CATEGORIES = [
  "Elektro (DGUV V3)",
  "Brandschutz",
  "RLT-Hygiene",
  "Trinkwasser/Legionellen",
  "Türen und Tore",
  "Regale",
  "Sonstige",
] as const;
export type Category = (typeof CATEGORIES)[number];

/** Selbstauskunft je Kategorie (Checkboxen). Nachweise werden vor jeder Beauftragung gesondert geprüft. */
export const QUALIFICATIONS: Record<Category, string[]> = {
  "Elektro (DGUV V3)": [
    "Elektrofachkraft (DIN VDE 1000-10)",
    "Zur Prüfung befähigte Person (TRBS 1203)",
    "Kalibrierte Prüfgeräte nach DIN VDE 0701-0702 bzw. DIN VDE 0100-600",
  ],
  Brandschutz: [
    "Sachkundige Person für Feuerlöscher (DIN 14406-4)",
    "Fachkraft für Brandmeldeanlagen (DIN 14675)",
    "Prüfsachverständige/r nach Landesprüfverordnung",
  ],
  "RLT-Hygiene": ["Hygieneschulung VDI 6022 Kategorie A", "Hygieneschulung VDI 6022 Kategorie B"],
  "Trinkwasser/Legionellen": [
    "Probenehmer/in nach DIN EN ISO 19458",
    "Zusammenarbeit mit akkreditierter Untersuchungsstelle (DIN EN ISO/IEC 17025)",
    "Hygieneschulung VDI/DVGW 6023",
  ],
  "Türen und Tore": ["Sachkundige Person für kraftbetätigte Türen und Tore (ASR A1.7)", "Sachkunde Feststellanlagen (DIN 14677)"],
  Regale: ["Befähigte Person für Regalinspektionen (DIN EN 15635)"],
  Sonstige: [],
};

export const REGIONS: string[] = ["Bundesweit", ...(regionenData as { name: string }[]).map((r) => r.name)];

export const SOURCE_PAGES = ["/fuer-pruefpartner", "/fuer-pruefpartner/rahmenvertraege", "/fuer-pruefpartner/dguv-v3", "/fuer-pruefpartner/subunternehmer"];

export type ApplicationStatus = "neu" | "in_pruefung" | "qualifiziert" | "abgelehnt" | "aktiv";
export const applicationStatuses: ApplicationStatus[] = ["neu", "in_pruefung", "qualifiziert", "abgelehnt", "aktiv"];
export const applicationStatusLabel: Record<ApplicationStatus, string> = {
  neu: "Neu",
  in_pruefung: "In Prüfung",
  qualifiziert: "Qualifiziert",
  abgelehnt: "Abgelehnt",
  aktiv: "Aktiv",
};
/** Erlaubte Statuswechsel per Auswahl. „aktiv“ nur über die Schaltfläche „Freigeben“ (aus „qualifiziert“). */
export const transitions: Record<ApplicationStatus, ApplicationStatus[]> = {
  neu: ["in_pruefung", "abgelehnt"],
  in_pruefung: ["qualifiziert", "abgelehnt"],
  qualifiziert: ["in_pruefung", "abgelehnt"],
  abgelehnt: ["in_pruefung"],
  aktiv: ["qualifiziert", "abgelehnt"],
};

export const CONFIRMATION =
  "Danke für Ihre Registrierung. Die Registrierung ist keine automatische Freigabe und keine Auftragszusage. Wir prüfen Ihre Angaben und melden uns.";

/** Text der Einwilligung; bei jeder Änderung CONSENT_VERSION erhöhen (wird mit der Bewerbung gespeichert) */
export const CONSENT_VERSION = "2026-11-26";
export const CONSENT_TEXT =
  "Ich bin damit einverstanden, dass meine Angaben zur Prüfung und Anbahnung einer Zusammenarbeit als Prüfpartner verarbeitet werden.";

/** Anker des Datenschutzabschnitts, auf den das Formular verlinkt */
export const PRIVACY_ANCHOR = "/datenschutz#pruefpartner";
