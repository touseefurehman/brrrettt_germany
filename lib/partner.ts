import fs from "node:fs";
import path from "node:path";
import { type PartnerPage, validatePartnerPages } from "./partner-core";
import { previewTokenValid } from "./b2b";

// Prüfpartner-Unterseiten: content/partner/<slug>.json. Nur `published` ist öffentlich (und in der Sitemap).
// `review`/`draft`: ausschließlich unter /vorschau/partner/<slug>?token=… (PREVIEW_TOKEN). Das Formular geht nur zusammen mit
// Das Formular ist ausgeschaltet (PARTNER_FORM_ENABLED); mit eingeschaltetem Flag verlangt der Build PARTNER_RETENTION_DAYS und PARTNER_NOTIFY_EMAIL.

const dir = path.join(process.cwd(), "content", "partner");
export const partnerAll: PartnerPage[] = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as PartnerPage);

const errors = validatePartnerPages(partnerAll);
export const partnerPublished = partnerAll.filter((p) => p.status === "published");
// Das Bewerbungsformular (partner_applications) ist hinter dem Feature-Flag PARTNER_FORM_ENABLED=true vorbereitet und standardmäßig aus.
// Erst wenn es eingeschaltet wird, müssen Ziel und Speicherdauer feststehen. Bis dahin führen alle CTAs zum Kontaktformular.
export const partnerFormLive = process.env.PARTNER_FORM_ENABLED === "true";
if (partnerFormLive) {
  if (!process.env.PARTNER_RETENTION_DAYS) errors.push("Veröffentlichung nur mit PARTNER_RETENTION_DAYS (Speicherdauer der Bewerbungen, von Henryk festzulegen)");
  if (!process.env.PARTNER_NOTIFY_EMAIL) errors.push("Veröffentlichung nur mit PARTNER_NOTIFY_EMAIL (Ziel der Bewerbungen, von Henryk festzulegen)");
}
if (errors.length > 0) throw new Error(`content/partner ist inkonsistent oder verletzt die Qualitätsschranke:\n- ${errors.join("\n- ")}`);

export const partnerBySlug = (slug: string) => partnerAll.find((p) => p.slug === slug);
export const partnerPublishedBySlug = (slug: string) => partnerPublished.find((p) => p.slug === slug);
export { previewTokenValid };
