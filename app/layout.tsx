import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "./site.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd, { organizationSchema, websiteSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

// next/font lädt die Schrift zur Build-Zeit und liefert sie selbst aus – kein Aufruf an Google beim Besucher.
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Betreiberpflichten organisieren | betreibermanager.de",
  description:
    "Prüfpflichten ermitteln, Prüfungen koordinieren, Nachweise sichern. Ein Ansprechpartner für Elektro, Brandschutz, Aufzug und Lüftung.",
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "betreibermanager.de",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={dmSans.variable}>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
