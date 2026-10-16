import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// KI-Crawler ausdrücklich zulassen – Voraussetzung für Zitate in AI Overviews, ChatGPT, Perplexity und Claude.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      // Eine Gruppe je Bot, damit „Allow: /“ unmittelbar unter jedem User-Agent steht – unabhängig vom Parser
      ...["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
