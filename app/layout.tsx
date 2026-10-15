import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "betreibermanager.de | Betreiberpflichten im Griff",
  description:
    "Wir koordinieren Ihre Betreiberpflichten: Prüfungen, Fristen, qualifizierte Prüfpartner und lückenlose Dokumentation. Ein zentraler Ansprechpartner.",
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: {
    title: "betreibermanager.de | Betreiberpflichten im Griff",
    description: "Prüfungen, Fristen und Dokumentation. Ihre Betreiberpflichten aus einer Hand organisiert.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&display=swap"
        />
        <link rel="preload" as="image" href="/assets/industrial-building.jpg" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
