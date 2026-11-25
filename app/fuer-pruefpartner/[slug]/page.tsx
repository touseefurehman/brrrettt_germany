import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PartnerPageView from "@/components/PartnerPageView";
import { partnerPublished, partnerPublishedBySlug } from "@/lib/partner";

// /fuer-pruefpartner/<slug>: nur veröffentlichte Prüfpartner-Seiten. Entwürfe: 404 (Vorschau unter /vorschau/partner/<slug>).
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => partnerPublished.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = partnerPublishedBySlug((await params).slug);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: page.url },
    openGraph: { url: page.url, title: page.metaTitle, description: page.metaDescription, type: "article" },
  };
}

export default async function PartnerRoute({ params }: Props) {
  const page = partnerPublishedBySlug((await params).slug);
  if (!page) notFound();
  return <PartnerPageView page={page} />;
}
