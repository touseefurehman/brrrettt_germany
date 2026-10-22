import type { MetadataRoute } from "next";
import { areas } from "@/lib/content";
import { audiences } from "@/lib/leistungen";
import { site } from "@/lib/site";
import { articles } from "@/lib/wissen";

// Impressum und Datenschutz sind noindex und deshalb nicht enthalten.
// Bei inhaltlichen Änderungen an statischen Seiten das Datum anpassen; Artikel nutzen ihr `modified`.
const lastUpdate = "2026-10-22";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [path: string, priority: number, lastModified: string][] = [
    ["/", 1, lastUpdate],
    ["/externer-betreibermanager", 0.9, lastUpdate],
    ...audiences.map((a): [string, number, string] => [`/betreiberpflichten/${a.slug}`, 0.9, lastUpdate]),
    ["/prueffristen", 0.9, lastUpdate],
    ...areas.map((a): [string, number, string] => [`/pruefbereiche/${a.slug}`, 0.7, lastUpdate]),
    ["/pruefbereiche/dguv-v3-pruefung/kosten", 0.7, lastUpdate],
    ["/wissen", 0.8, lastUpdate],
    ...articles.map((a): [string, number, string] => [`/wissen/${a.slug}`, 0.7, a.modified]),
    ["/ueber-uns", 0.5, lastUpdate],
    ["/kontakt", 0.6, lastUpdate],
  ];
  return pages.map(([path, priority, lastModified]) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
