import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { leistungsseiten } from "@/lib/leistungsseiten";
import { staedteseiten } from "@/lib/staedteseiten";

// Leistungs- und Städte-Seiten auf oberster Ebene (Lastenheft T-01), z. B. /dguv-v3-pruefung, /dguv-v3-pruefung-berlin.
// /betreiberpflichten hat eine eigene Route, weil darunter die Zielgruppenseiten liegen.
type Props = { params: Promise<{ leistung: string }> };

const pages = [...leistungsseiten.filter((p) => p.slug !== "betreiberpflichten"), ...staedteseiten];
const pageBySlug = (slug: string) => pages.find((p) => p.slug === slug);
const isCity = (slug: string) => staedteseiten.some((p) => p.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({ leistung: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = pageBySlug((await params).leistung);
  if (!page) return {};
  const path = `/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { url: path, title: page.title, description: page.description },
  };
}

export default async function LeistungPage({ params }: Props) {
  const page = pageBySlug((await params).leistung);
  if (!page) notFound();
  const path = `/${page.slug}`;
  const crumbs: [string, string][] = isCity(page.slug)
    ? [
        ["DGUV V3 Prüfung", "/dguv-v3-pruefung"],
        [page.name, path],
      ]
    : [[page.name, path]];
  return <ServicePageView page={page} path={path} crumbs={crumbs} />;
}
