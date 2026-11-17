import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingView from "@/components/rank-rent/LandingView";
import { bereichBySlug, isDraft, landingFor, landingPath, landingpages, objektBySlug } from "@/lib/rank-rent";

// URL: /pruefpflichten/[objekt]/[pruefbereich] – das Segment ist der `slug` der Landingpage (z. B. dguv-v3-pruefung).
type Props = { params: Promise<{ objekt: string; pruefbereich: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return landingpages.map((l) => ({ objekt: l.objekt, pruefbereich: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { objekt, pruefbereich } = await params;
  const page = landingFor(objekt, pruefbereich);
  if (!page) return {};
  const path = landingPath(page);
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: page.metaTitle, description: page.metaDescription, type: "article" },
    ...(isDraft(page) && { robots: { index: false, follow: false } }),
  };
}

export default async function LandingRoute({ params }: Props) {
  const { objekt, pruefbereich } = await params;
  const page = landingFor(objekt, pruefbereich);
  const o = page && objektBySlug(page.objekt);
  const bereich = page && bereichBySlug(page.pruefbereich);
  if (!page || !o || !bereich) notFound();
  return <LandingView page={page} objekt={o} bereich={bereich} />;
}
