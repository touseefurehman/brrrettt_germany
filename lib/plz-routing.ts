// Reine Funktionen für das regionale Lead-Routing (ohne Importe, damit sie ohne Build mit `npm test` geprüft werden können).
// Daten: content/partners/plz-bundesland.json (PLZ-Bereiche), content/partners/slots.json (Partnerplätze).

export type PlzRange = { von: number; bis: number; bundesland: string };
export type Slot = {
  thema: string;
  objektart?: string;
  /** Bundesland-Slug (content/partners/regionen.json) oder "bundesweit" */
  region: string;
  status: "frei" | "vergeben";
  partnerSlotId?: string;
};

export const BUNDESWEIT = "bundesweit";

/** Bundesland-Slug zu einer fünfstelligen PLZ. Gewinnt der engste passende Bereich; ohne Treffer null (→ Fallback). */
export function bundeslandForPlz(plz: string, table: PlzRange[]): string | null {
  if (!/^\d{5}$/.test(plz)) return null;
  const n = Number(plz);
  let best: PlzRange | null = null;
  for (const r of table) {
    if (n < r.von || n > r.bis) continue;
    if (!best || r.bis - r.von < best.bis - best.von) best = r;
  }
  return best ? best.bundesland : null;
}

/**
 * Vergebener Slot für Thema × Objektart × Bundesland. Reihenfolge: Bundesland mit passender Objektart, Bundesland für
 * alle Objektarten, dann bundesweit (gleiche Reihenfolge). Freie Slots und Slots ohne partnerSlotId zählen nicht.
 */
export function findSlot(slots: Slot[], thema: string, objektart: string, bundesland: string | null): Slot | null {
  const regions = bundesland ? [bundesland, BUNDESWEIT] : [];
  for (const region of regions) {
    const hits = slots.filter(
      (s) => s.status === "vergeben" && s.partnerSlotId && s.thema === thema && s.region === region,
    );
    const exact = hits.find((s) => s.objektart === objektart);
    if (exact) return exact;
    const general = hits.find((s) => !s.objektart);
    if (general) return general;
  }
  return null;
}
