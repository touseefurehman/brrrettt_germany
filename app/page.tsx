import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Betreiberpflichten organisieren | betreibermanager.de",
    description:
      "Prüfpflichten ermitteln, Prüfungen koordinieren, Nachweise sichern. Ein Ansprechpartner für Elektro, Brandschutz, Aufzug und Lüftung.",
  },
};

export default function Home() {
  return <LandingPage />;
}
