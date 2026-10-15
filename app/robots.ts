import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// KI-Crawler ausdrücklich zulassen – Voraussetzung für Zitate in AI Overviews, ChatGPT, Perplexity und Claude.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
