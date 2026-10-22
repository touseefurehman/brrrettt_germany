import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { leistungsseiteBySlug, leistungsseiten } from "@/lib/leistungsseiten";

// Leistungsseiten auf oberster Ebene (Lastenheft T-01), z. B. /dguv-v3-pruefung, /legionellenpruefung.
// /betreiberpflichten hat eine eigene Route, weil darunter die Zielgruppenseiten liegen.
type Props = { params: Promise<{ leistung: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return leistungsseiten.filter((p) => p.slug !== "betreiberpflichten").map((p) => ({ leistung: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = leistungsseiteBySlug((await params).leistung);
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
  const page = leistungsseiteBySlug((await params).leistung);
  if (!page || page.slug === "betreiberpflichten") notFound();
  const path = `/${page.slug}`;
  return <ServicePageView page={page} path={path} crumbs={[[page.name, path]]} />;
}
