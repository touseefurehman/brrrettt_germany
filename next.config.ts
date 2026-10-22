import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }],
      },
      {
        // Staging- und Preview-URLs (*.vercel.app) dürfen nicht mit der echten Domain konkurrieren
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.*)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
  // Geänderte URLs (Lastenheft T-10, Liste in docs/seo-konzept.md Abschnitt 5). Ausdrücklich 301 (AK-6),
  // nicht das Next-Standard-308. Bestehende Links und Rankings bleiben erhalten.
  async redirects() {
    return [
      { source: "/pruefbereiche/dguv-v3-pruefung", destination: "/dguv-v3-pruefung", statusCode: 301 },
      { source: "/pruefbereiche/dguv-v3-pruefung/kosten", destination: "/dguv-v3-pruefung-kosten", statusCode: 301 },
      { source: "/pruefbereiche/lueftung-klima", destination: "/vdi-6022", statusCode: 301 },
      { source: "/wissen/was-ist-betreiberverantwortung", destination: "/betreiberverantwortung", statusCode: 301 },
    ];
  },
  // Keine Host-Weiterleitung hier: betreibermanager.de → www.betreibermanager.de übernimmt Vercel
  // (Settings → Domains). Eine zweite Regel in die Gegenrichtung erzeugt ERR_TOO_MANY_REDIRECTS.
};

export default nextConfig;
