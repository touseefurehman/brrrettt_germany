import type { Metadata } from "next";
import { notFound } from "next/navigation";
import B2bPageView from "@/components/B2bPage";
import { b2bPublished, b2bPublishedFor } from "@/lib/b2b";

// /pruefmanagement/<objekt>: nur veröffentlichte B2B-Seiten. Entwürfe: 404 (Vorschau unter /vorschau/b2b/<slug>).
type Props = { params: Promise<{ objekt: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return b2bPublished.filter((p) => p.url.split("/").length === 3).map((p) => ({ objekt: p.objekt }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = b2bPublishedFor((await params).objekt);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: page.url },
    openGraph: { url: page.url, title: page.metaTitle, description: page.metaDescription, type: "article" },
  };
}

export default async function B2bObjektRoute({ params }: Props) {
  const page = b2bPublishedFor((await params).objekt);
  if (!page) notFound();
  return <B2bPageView page={page} />;
}
