import type { MetadataRoute } from "next";
import { areas, isMovedArea } from "@/lib/content";
import { audiences } from "@/lib/leistungen";
import { leistungsseiten } from "@/lib/leistungsseiten";
import { site } from "@/lib/site";
import { staedteseiten } from "@/lib/staedteseiten";
import { articles } from "@/lib/wissen";

// Impressum, Datenschutz und die Bestätigungsseite sind noindex und deshalb nicht enthalten.
// Bei inhaltlichen Änderungen an statischen Seiten das Datum anpassen; Artikel nutzen ihr `modified`.
const lastUpdate = "2026-10-22";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [path: string, priority: number, lastModified: string][] = [
    ["/", 1, lastUpdate],
    ...leistungsseiten.map((p): [string, number, string] => [`/${p.slug}`, 0.9, lastUpdate]),
    ["/dguv-v3-pruefung-kosten", 0.9, lastUpdate],
    ...staedteseiten.map((p): [string, number, string] => [`/${p.slug}`, 0.8, lastUpdate]),
    ["/externer-betreibermanager", 0.8, lastUpdate],
    ...audiences.map((a): [string, number, string] => [`/betreiberpflichten/${a.slug}`, 0.8, lastUpdate]),
    ["/prueffristen", 0.8, lastUpdate],
    ...areas
      .filter((a) => !isMovedArea(a.slug))
      .map((a): [string, number, string] => [`/pruefbereiche/${a.slug}`, 0.6, lastUpdate]),
    ["/wissen", 0.7, lastUpdate],
    ...articles.map((a): [string, number, string] => [`/wissen/${a.slug}`, 0.6, a.modified]),
    ["/ueber-uns", 0.5, lastUpdate],
    ["/kontakt", 0.5, lastUpdate],
  ];
  return pages.map(([path, priority, lastModified]) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
