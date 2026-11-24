// JSON-LD der B2B-Seiten. Reine Funktionen ohne Alias-Importe (siehe b2b-core.ts), damit das Prüfskript sie nutzen kann.
import type { B2bPage } from "./b2b-core";

const SERVICE_TYPE: Record<string, string> = {
  pruefmanagement: "Prüfmanagement",
  brandschutz: "Koordination von Brandschutzprüfungen",
  "rlt-hygiene": "Koordination von RLT-Hygieneprüfungen",
  tore: "Koordination von Torprüfungen",
  "dguv-v3": "Koordination von DGUV-V3-Prüfungen",
};

export const serviceTypeOf = (p: B2bPage) => SERVICE_TYPE[p.service];

/** Breadcrumb-Einträge (ohne Startseite): übergeordnete Seite, falls vorhanden, sonst /betreiberpflichten */
export function crumbsFor(p: B2bPage, all: B2bPage[]): [string, string][] {
  const parentUrl = p.url.split("/").slice(0, 3).join("/");
  const parent = p.url === parentUrl ? undefined : all.find((x) => x.url === parentUrl);
  return [...(parent ? [[parent.h1, parent.url] as [string, string]] : [["Betreiberpflichten", "/betreiberpflichten"] as [string, string]]), [p.h1, p.url]];
}

export function b2bSchemas(p: B2bPage, all: B2bPage[], siteUrl: string) {
  const orgId = `${siteUrl}/#organization`;
  const abs = (path: string) => `${siteUrl}${path}`;
  const crumbs: [string, string][] = [["Startseite", "/"], ...crumbsFor(p, all)];
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: p.h1,
      url: abs(p.url),
      description: p.metaDescription,
      dateModified: p.lastReviewed,
      inLanguage: "de-DE",
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": orgId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.h1,
      serviceType: serviceTypeOf(p),
      url: abs(p.url),
      provider: { "@id": orgId },
      areaServed: "DE",
      audience: { "@type": "BusinessAudience", name: p.zielkunde },
      description: p.kurzantwort,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ];
}

// ---- Strukturprüfung gegen die Schema.org-Eigenschaften (ohne Netzwerk, ohne schema-dts) -------------------------

type Json = Record<string, unknown>;
const ALLOWED: Record<string, string[]> = {
  WebPage: ["@context", "@type", "name", "url", "description", "dateModified", "inLanguage", "isPartOf", "publisher"],
  Service: ["@context", "@type", "name", "serviceType", "url", "provider", "areaServed", "audience", "description"],
  BreadcrumbList: ["@context", "@type", "itemListElement"],
  FAQPage: ["@context", "@type", "mainEntity"],
};
const REQUIRED: Record<string, string[]> = {
  WebPage: ["name", "url", "isPartOf"],
  Service: ["name", "serviceType", "provider", "areaServed", "audience", "description"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
};

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

/** Prüft Struktur und Übereinstimmung mit dem sichtbaren Inhalt. Liefert Fehlertexte; leer = ok. */
export function validateSchemas(p: B2bPage, all: B2bPage[], siteUrl: string): string[] {
  const errors: string[] = [];
  const nodes = b2bSchemas(p, all, siteUrl) as Json[];
  const types = nodes.map((n) => n["@type"] as string).join(",");
  if (types !== "WebPage,Service,BreadcrumbList,FAQPage") errors.push(`Typen ${types}`);
  for (const n of nodes) {
    const t = n["@type"] as string;
    for (const k of Object.keys(n)) if (!ALLOWED[t]?.includes(k)) errors.push(`${t}: Eigenschaft ${k} nicht vorgesehen`);
    for (const k of REQUIRED[t] ?? []) if (n[k] === undefined || n[k] === "") errors.push(`${t}: ${k} fehlt`);
    if (n["@context"] !== "https://schema.org") errors.push(`${t}: @context`);
    if (typeof n.url === "string" && !n.url.startsWith(siteUrl)) errors.push(`${t}: url nicht absolut`);
  }
  const [web, svc, bc, faq] = nodes as [Json, Json, Json, Json];
  if ((web.isPartOf as Json)["@id"] !== `${siteUrl}/#website`) errors.push("WebPage.isPartOf zeigt nicht auf WebSite");
  if ((svc.provider as Json)["@id"] !== `${siteUrl}/#organization`) errors.push("Service.provider zeigt nicht auf Organization @id");
  if ((svc.audience as Json)["@type"] !== "BusinessAudience") errors.push("Service.audience kein BusinessAudience");
  if (norm(web.name as string) !== norm(p.h1)) errors.push("WebPage.name ≠ sichtbare H1");
  if (norm(svc.description as string) !== norm(p.kurzantwort)) errors.push("Service.description ≠ sichtbare Kurzantwort");
  const items = (bc.itemListElement as Json[]).map((i) => i.position);
  if (items.some((pos, i) => pos !== i + 1)) errors.push("Breadcrumb-Positionen nicht fortlaufend");
  const q = faq.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
  if (q.length !== p.faq.length || q.some((x, i) => x.name !== p.faq[i].question || x.acceptedAnswer.text !== p.faq[i].answer))
    errors.push("FAQPage ≠ sichtbare FAQ");
  try {
    JSON.parse(JSON.stringify(nodes));
  } catch {
    errors.push("nicht serialisierbar");
  }
  return errors;
}
