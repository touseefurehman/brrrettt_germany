import type { MetadataRoute } from "next";
import { authorPath, authors } from "@/lib/autoren";
import { areas, isMovedArea } from "@/lib/content";
import { audiences } from "@/lib/leistungen";
import { leistungsseiten } from "@/lib/leistungsseiten";
import { hasAddress, site } from "@/lib/site";
import { staedteseiten } from "@/lib/staedteseiten";
import { articles } from "@/lib/wissen";

// Wird vollständig aus den Routing-Daten erzeugt – neue Leistungsseiten, Artikel und Autoren erscheinen automatisch.
// Nur kanonische URLs: verschobene Prüfbereiche (301 in next.config.ts) sind ausgefiltert.
// Datenschutz und die Bestätigungsseite sind noindex und deshalb nicht enthalten; das Impressum, sobald die Anschrift steht.
//
// lastmod = letztes inhaltliches Änderungsdatum der Seite. Bei Änderungen das Datum der betroffenen Gruppe
// anpassen; Artikel nutzen ihr `modified`.
const lastmod = {
  home: "2026-10-16",
  services: "2026-10-22",
  cities: "2026-10-22",
  audiences: "2026-10-22",
  areas: "2026-10-22",
  static: "2026-10-22",
  about: "2026-10-26",
  legal: "2026-10-26",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const newest = articles.reduce((max, a) => (a.modified > max ? a.modified : max), lastmod.static);
  const pages: [path: string, priority: number, lastModified: string][] = [
    ["/", 1, lastmod.home],
    ...leistungsseiten.map((p): [string, number, string] => [`/${p.slug}`, 0.9, lastmod.services]),
    ["/dguv-v3-pruefung-kosten", 0.9, lastmod.static],
    ...staedteseiten.map((p): [string, number, string] => [`/${p.slug}`, 0.8, lastmod.cities]),
    ["/externer-betreibermanager", 0.8, lastmod.audiences],
    ...audiences.map((a): [string, number, string] => [`/betreiberpflichten/${a.slug}`, 0.8, lastmod.audiences]),
    ["/prueffristen", 0.8, lastmod.static],
    ...areas
      .filter((a) => !isMovedArea(a.slug))
      .map((a): [string, number, string] => [`/pruefbereiche/${a.slug}`, 0.6, lastmod.areas]),
    ["/wissen", 0.7, newest],
    ...articles.map((a): [string, number, string] => [`/wissen/${a.slug}`, 0.6, a.modified]),
    ...authors.map((a): [string, number, string] => [authorPath(a), 0.5, lastmod.about]),
    ["/ueber-uns", 0.5, lastmod.about],
    ["/kontakt", 0.5, lastmod.static],
    ...(hasAddress ? [["/impressum", 0.3, lastmod.legal] as [string, number, string]] : []),
  ];
  return pages.map(([path, priority, lastModified]) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
