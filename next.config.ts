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
  // Keine Host-Weiterleitung hier: betreibermanager.de → www.betreibermanager.de übernimmt Vercel
  // (Settings → Domains). Eine zweite Regel in die Gegenrichtung erzeugt ERR_TOO_MANY_REDIRECTS.
};

export default nextConfig;
