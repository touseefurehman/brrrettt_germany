import fs from "node:fs";
import { timingSafeEqual } from "node:crypto";
import path from "node:path";
import { type B2bPage, validatePages } from "./b2b-core";

// B2B-Landingpages: content/b2b/<slug>.json (Anleitung: content/b2b/README.md).
// Nur `status: "published"` bekommt eine öffentliche Route, erscheint in Sitemap und llms.txt.
// Entwürfe und Seiten im Status „review“ sind ausschließlich über /vorschau/b2b/<slug> mit PREVIEW_TOKEN sichtbar.
// Die Qualitätsschranke (validatePages) läuft beim Laden der Daten: Verstöße brechen den Build ab.

const dir = path.join(process.cwd(), "content", "b2b");

export const b2bAll: B2bPage[] = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as B2bPage);

const errors = validatePages(b2bAll);
if (errors.length > 0) throw new Error(`content/b2b ist inkonsistent oder verletzt die Qualitätsschranke:\n- ${errors.join("\n- ")}`);

export const b2bPublished = b2bAll.filter((p) => p.status === "published");
export const b2bBySlug = (slug: string) => b2bAll.find((p) => p.slug === slug);

/** Öffentlich erreichbare Seite zu den URL-Segmenten – nur veröffentlichte, nie Entwürfe */
export const b2bPublishedFor = (objekt: string, pruefbereich?: string) =>
  b2bPublished.find((p) => p.url === `/pruefmanagement/${objekt}${pruefbereich ? `/${pruefbereich}` : ""}`);

/** Vergleich des Vorschau-Tokens in konstanter Zeit; ohne gesetzte Variable ist die Vorschau gesperrt */
export function previewTokenValid(given: string | undefined): boolean {
  const expected = process.env.PREVIEW_TOKEN;
  if (!expected || expected.length < 16 || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Links bestehender Seiten auf veröffentlichte B2B-Seiten (internalLinksFromExisting). Auf Entwürfe wird nie verlinkt. */
export function b2bLinksFrom(path: string): [title: string, path: string, note: string][] {
  return b2bPublished.flatMap((p) =>
    p.internalLinksFromExisting.filter((l) => l.from === path).map((l): [string, string, string] => [l.label, p.url, l.note]),
  );
}
