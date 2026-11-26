import type { PartnerApplication } from "@/lib/partner-applications";

// Filter für /admin/partner und den CSV-Export (gleiche Parameter)

export type PartnerFilter = {
  status?: string;
  category?: string;
  region?: string;
  /** Mindestkapazität in Prüftagen pro Monat */
  capMin?: string;
  source?: string;
  utm?: string;
  from?: string;
  to?: string;
  q?: string;
};
export const FILTER_KEYS: (keyof PartnerFilter)[] = ["status", "category", "region", "capMin", "source", "utm", "from", "to", "q"];

export function pickFilter(sp: Record<string, string | string[] | undefined> | URLSearchParams): PartnerFilter {
  const get = (k: string) => {
    const v = sp instanceof URLSearchParams ? sp.get(k) : sp[k];
    return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
  };
  return Object.fromEntries(FILTER_KEYS.map((k) => [k, get(k)]).filter(([, v]) => v)) as PartnerFilter;
}

export function applyFilter(list: PartnerApplication[], f: PartnerFilter): PartnerApplication[] {
  const q = f.q?.toLowerCase();
  const cap = Number(f.capMin);
  return list.filter(
    (a) =>
      (!f.status || a.status === f.status) &&
      (!f.category || a.categories.includes(f.category)) &&
      (!f.region || a.regions.includes(f.region)) &&
      (!f.capMin || !Number.isFinite(cap) || a.capacityDays >= cap) &&
      (!f.source || a.sourcePage === f.source) &&
      (!f.utm || (f.utm === "(keine)" ? !a.utmSource : a.utmSource === f.utm)) &&
      (!f.from || a.createdAt.slice(0, 10) >= f.from) &&
      (!f.to || a.createdAt.slice(0, 10) <= f.to) &&
      (!q || [a.company, a.contactName, a.email, a.plzAreas, a.notes].some((v) => v.toLowerCase().includes(q))),
  );
}

export const countBy = (list: PartnerApplication[], key: (a: PartnerApplication) => string[]) => {
  const m = new Map<string, number>();
  for (const a of list) for (const k of key(a)) m.set(k, (m.get(k) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

export const toQuery = (f: PartnerFilter) => new URLSearchParams(Object.entries(f).filter(([, v]) => v) as [string, string][]).toString();
