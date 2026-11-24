import { formatDate } from "@/lib/rank-rent";

// Sichtbares „Stand“-Datum und Autor je Seite. Das Datum ist die letzte inhaltliche Änderung laut git
// (git log -L auf dem Datenblock der Seite), nicht das Tagesdatum. Bei Textänderungen der Seite anpassen.
export const AUTHOR_LINE = "Redaktion betreibermanager.de";

export const pageModified: Record<string, string> = {
  "/": "2026-11-24", // Quellenblock Rechtsgrundlagen ergänzt
  "/betreiberverantwortung": "2026-10-22",
  "/betreiberpflichten": "2026-10-22",
  "/betreiberpflichten/kommunen": "2026-10-22",
  "/betreiberpflichten/krankenhaeuser": "2026-10-22",
  "/betreiberpflichten/wohnungsunternehmen": "2026-10-22",
  "/externer-betreibermanager": "2026-10-22",
  "/pruefbereiche/brandschutz": "2026-10-21",
  "/pruefbereiche/aufzugsanlagen": "2026-11-12",
};

export const standText = (iso: string) => `Stand: ${formatDate(iso)} · ${AUTHOR_LINE}`;
