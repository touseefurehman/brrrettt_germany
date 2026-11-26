import fs from "node:fs";
import path from "node:path";
import { type PartnerPage, validatePartnerPages } from "./partner-core";
import { previewTokenValid } from "./b2b";

// Prüfpartner-Unterseiten: content/partner/<slug>.json. Nur `published` ist öffentlich (und in der Sitemap).
// `review`/`draft`: ausschließlich unter /vorschau/partner/<slug>?token=… (PREVIEW_TOKEN).

const dir = path.join(process.cwd(), "content", "partner");
export const partnerAll: PartnerPage[] = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as PartnerPage);

const errors = validatePartnerPages(partnerAll);
export const partnerPublished = partnerAll.filter((p) => p.status === "published");
// Bewerbungsformular (partner_applications): nur sichtbar mit PARTNER_FORM_ENABLED=true UND gesetztem Web3Forms-Key
// (NEXT_PUBLIC_WEB3FORMS_PARTNER_KEY; soll derselbe Key wie beim Kontaktformular genutzt werden, denselben Wert eintragen).
// Ohne beides führen alle CTAs zum Kontaktformular. DATABASE_URL ist empfohlen; ohne sie geht die Bewerbung nur per Web3Forms ein.
export const partnerWeb3FormsKey = (process.env.NEXT_PUBLIC_WEB3FORMS_PARTNER_KEY ?? "").trim();
export const partnerFormLive = process.env.PARTNER_FORM_ENABLED === "true" && partnerWeb3FormsKey !== "";
if (errors.length > 0) throw new Error(`content/partner ist inkonsistent oder verletzt die Qualitätsschranke:\n- ${errors.join("\n- ")}`);

export const partnerBySlug = (slug: string) => partnerAll.find((p) => p.slug === slug);
export const partnerPublishedBySlug = (slug: string) => partnerPublished.find((p) => p.slug === slug);
export { previewTokenValid };
