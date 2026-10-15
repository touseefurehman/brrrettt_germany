import type { MetadataRoute } from "next";
import { areas } from "@/lib/content";
import { site } from "@/lib/site";

// Impressum und Datenschutz sind noindex und deshalb nicht enthalten.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/prueffristen", ...areas.map((a) => `/pruefbereiche/${a.slug}`), "/ueber-uns", "/kontakt"];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/prueffristen" ? 0.9 : 0.7,
  }));
}
