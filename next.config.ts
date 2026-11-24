import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Messdateien werden zur Laufzeit gelesen (Befund, Cron, Admin) und müssen im Deployment liegen
  outputFileTracingIncludes: { "/**/*": ["./content/measurements/**/*"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }],
      },
      {
        // Persönliche Befunde und Abmeldung: nie indexieren
        source: "/:path(befund|abmelden|nullmessung)/:rest*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
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
      { source: "/fachpartner/pruefdienste", destination: "/fachpartner/dguv-v3", statusCode: 301 },
      { source: "/fuer-pruefpartner", destination: "/fachpartner", statusCode: 301 },
      { source: "/wissen/was-ist-betreiberverantwortung", destination: "/betreiberverantwortung", statusCode: 301 },
      { source: "/wissen/dguv-v3-prueffristen-organisieren", destination: "/wissen/dguv-v3-pruefung-wie-oft", statusCode: 301 },
    ];
  },
  // Keine Host-Weiterleitung hier: betreibermanager.de → www.betreibermanager.de übernimmt Vercel
  // (Settings → Domains). Eine zweite Regel in die Gegenrichtung erzeugt ERR_TOO_MANY_REDIRECTS.
};

export default nextConfig;
