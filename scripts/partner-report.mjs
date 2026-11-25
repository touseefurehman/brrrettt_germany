// Prüfpartner-Seiten prüfen und deliverables/reverse-aeo-partner.csv erzeugen (die .xlsx entsteht mit scripts/partner-csv-to-xlsx.py).
// Aufruf: node --experimental-strip-types scripts/partner-report.mjs [--base http://localhost:3000 --token <PREVIEW_TOKEN>] [--formtest "Text"]
// Mit --base wird das gerenderte HTML geholt (Hub öffentlich, Unterseiten über /vorschau/partner/<slug>?token=…) und JSON-LD, Banner,
// Kurzantwort und Quellen daran geprüft; ohne --base gelten nur die Datenregeln aus lib/partner-core.ts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { markerCount, PROMISES, validatePartnerPages, wordCount, visibleTexts } from "../lib/partner-core.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : ""; };
const base = arg("base"), token = arg("token"), formtest = arg("formtest") || "nicht getestet";
const siteUrl = fs.readFileSync(path.join(root, "lib/site.ts"), "utf8").match(/url: "(https:\/\/[^"]+)"/)[1];
const pages = fs.readdirSync(path.join(root, "content/partner")).filter((f) => f.endsWith(".json")).sort().map((f) => JSON.parse(fs.readFileSync(path.join(root, "content/partner", f), "utf8")));
const errors = validatePartnerPages(pages);
const known = new Set(["/", "/fachpartner", "/fuer-pruefpartner", "/externer-betreibermanager", "/dguv-v3-pruefung", "/elektropruefung-dguv-v3", "/regalpruefung", "/vdi-6022", "/legionellenpruefung", "/pruefmanagement/filialunternehmen", "/pruefmanagement/immobilienportfolios", "/pruefmanagement/industriestandorte", "/wissen/befaehigte-person-trbs-1203", ...pages.map((p) => p.url)]);

const hub = {
  url: "/fuer-pruefpartner", status: "veröffentlicht (live)", metaTitle: "Prüfpartner werden – für Prüfbetriebe | betreibermanager.de",
  metaDescription: "Prüfbetrieb für gesetzliche Prüfungen? So läuft die Zusammenarbeit mit betreibermanager.de: Registrierung, Prüfung der Qualifikation, mögliche Beauftragung.",
  h1: "Prüfpartner werden: Zusammenarbeit mit betreibermanager.de für Prüfbetriebe", aiPrompts: [], sources: [],
  links: ["/fachpartner", "/externer-betreibermanager"], types: "WebPage, BreadcrumbList, FAQPage", preview: "–",
};

async function html(url) {
  try { const r = await fetch(base + url); return r.status === 200 ? await r.text() : null; } catch { return null; }
}
const ld = (h) => [...h.matchAll(/application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
async function check(p, isHub) {
  if (!base) return { types: "nicht geprüft (kein --base)", ok: "nicht geprüft" };
  const h = await html(isHub ? p.url : `/vorschau/partner/${p.slug}?token=${token}`);
  if (!h) return { types: "–", ok: "Fehler: Seite nicht abrufbar" };
  const nodes = ld(h);
  const t = nodes.map((n) => n["@type"]).filter((x) => ["WebPage", "BreadcrumbList", "FAQPage", "Service"].includes(x));
  const faq = nodes.find((n) => n["@type"] === "FAQPage");
  const visible = (h.match(/<details/g) ?? []).length;
  const problems = [];
  if (t.join() !== "WebPage,FAQPage,BreadcrumbList" && t.sort().join() !== "BreadcrumbList,FAQPage,WebPage") problems.push(`Typen ${t.join("/")}`);
  if (t.includes("Service")) problems.push("Service-Schema vorhanden");
  if (!faq || faq.mainEntity.length !== visible) problems.push("FAQPage ≠ sichtbare FAQ");
  if (!/class="b2b-kurzantwort"/.test(h)) problems.push("Kurzantwort fehlt");
  return { types: [...new Set(t)].sort().join(", "), ok: problems.length ? `Fehler: ${problems.join("; ")}` : "ok" };
}

const rows = [];
let problems = errors.length;
for (const e of errors) console.log("  ✗", e);
const all = [{ ...hub, isHub: true }, ...pages.map((p) => ({ ...p, isHub: false }))];
for (const p of all) {
  const c = await check(p, p.isHub);
  const links = p.isHub ? hub.links : [...new Set([...p.internalLinks.map((l) => l.href), ...[...JSON.stringify(p.sections).matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1])])];
  for (const l of links) if (!known.has(l)) { problems++; console.log(`  ✗ ${p.url}: Link auf unbekannte Seite ${l}`); }
  if (c.ok.startsWith("Fehler")) { problems++; console.log(`  ✗ ${p.url}: ${c.ok}`); }
  rows.push([
    p.url, p.isHub ? p.status : p.status === "published" ? "veröffentlicht" : `Entwurf (${p.status})`, `${p.metaTitle} (${p.metaTitle.length})`, `${p.metaDescription} (${p.metaDescription.length})`, p.h1,
    p.aiPrompts.join(" | "), p.isHub ? "–" : p.sources.map((s) => `${s.label} <${s.url}>`).join(" | "), links.join(" | "), `${siteUrl}${p.url}${p.isHub || p.status === "published" ? "" : " (geplant; gesetzt bei Veröffentlichung)"}`,
    c.types, c.ok, p.isHub ? "kein Formular (erst mit den Unterseiten)" : formtest, p.isHub ? "–" : `${siteUrl}/vorschau/partner/${p.slug}`,
  ]);
}
const header = ["URL", "Status", "Title (Zeichen)", "Description (Zeichen)", "H1", "Ziel-Prompts", "Quellen", "Interne Links", "Canonical", "JSON-LD-Typen", "JSON-LD-Validierung", "Formulartest (gesendet / angekommen / Prüf-Warteschlange)", "Vorschau-Link (ohne Token)"];
const cell = (v) => `"${String(v).replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
fs.mkdirSync(path.join(root, "deliverables"), { recursive: true });
fs.writeFileSync(path.join(root, "deliverables/reverse-aeo-partner.csv"), "﻿" + [header, ...rows].map((r) => r.map(cell).join(";")).join("\r\n") + "\r\n");
console.table(pages.map((p) => ({ slug: p.slug, status: p.status, wörter: wordCount(p), faq: p.faq.length, quellen: p.sources.length, "[PRÜFEN]": markerCount(p) })));
console.log(`${all.length} Seiten, ${problems} Beanstandung(en). CSV: deliverables/reverse-aeo-partner.csv`);
process.exit(problems ? 1 : 0);
