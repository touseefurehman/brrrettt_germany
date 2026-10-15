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
  async redirects() {
    return [
      {
        // Primärdomain ist betreibermanager.de ohne www (zusätzlich in Vercel unter Settings → Domains einstellen)
        source: "/:path*",
        has: [{ type: "host", value: "www.betreibermanager.de" }],
        destination: "https://betreibermanager.de/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
