import plzData from "@/content/partners/plz-bundesland.json";
import regionenData from "@/content/partners/regionen.json";
import slotsData from "@/content/partners/slots.json";
import themenData from "@/content/partners/themen.json";
import { activePartner, type Partner } from "@/lib/rank-rent";
import { bundeslandForPlz, findSlot, type PlzRange, type Slot } from "@/lib/plz-routing";

// Regionale Exklusivität: ein Partner je Thema × Objektart × Bundesland. Serverseitig genutzt (Lead-Routing, /fachpartner).

export type Thema = { slug: string; name: string; href: string; pruefbereiche: string[]; text: string };
export type Region = { slug: string; name: string };

export const themen = themenData as Thema[];
export const regionen = regionenData as Region[];
export const slots = slotsData as Slot[];
const plzTable = plzData as PlzRange[];

const regionSlugs = new Set(["bundesweit", ...regionen.map((r) => r.slug)]);
const themaSlugs = new Set(themen.map((t) => t.slug));
for (const s of slots) {
  if (!themaSlugs.has(s.thema) || !regionSlugs.has(s.region)) {
    throw new Error(`content/partners/slots.json: unbekanntes Thema oder unbekannte Region (${s.thema} / ${s.region})`);
  }
  if (s.status === "vergeben" && !s.partnerSlotId) {
    throw new Error(`content/partners/slots.json: vergebener Slot ohne partnerSlotId (${s.thema} / ${s.region})`);
  }
}

export const regionName = (slug: string | null) => regionen.find((r) => r.slug === slug)?.name ?? null;
export const themaForBereich = (pruefbereich: string) => themen.find((t) => t.pruefbereiche.includes(pruefbereich))?.slug ?? null;

/** Bundesland-Slug zur PLZ (serverseitig); null, wenn die PLZ keinem Bereich zugeordnet ist */
export const bundeslandOf = (plz: string) => bundeslandForPlz(plz, plzTable);

export type Routing = { bundesland: string | null; to: string | null; partner: Partner | null; slotId: string | null };

/** Empfänger einer Anfrage: aktiver Partner für Thema × Objektart × Bundesland, sonst Fallback (to = null → bestehende Adresse) */
export function routeLead(plz: string, pruefbereich: string, objektart: string): Routing {
  const bundesland = bundeslandOf(plz);
  const thema = themaForBereich(pruefbereich);
  const slot = thema ? findSlot(slots, thema, objektart, bundesland) : null;
  const partner = slot?.partnerSlotId ? activePartner(slot.partnerSlotId) : null;
  const to = partner?.leadEmail.trim() || null;
  return to ? { bundesland, to, partner, slotId: slot?.partnerSlotId ?? null } : { bundesland, to: null, partner: null, slotId: null };
}
