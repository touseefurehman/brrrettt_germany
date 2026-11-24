import type { Metadata } from "next";
import { notFound } from "next/navigation";
import B2bPageView from "@/components/B2bPage";
import { b2bPublished, b2bPublishedFor } from "@/lib/b2b";

// /pruefmanagement/<objekt>/<pruefbereich>: nur veröffentlichte B2B-Seiten. Entwürfe: 404.
type Props = { params: Promise<{ objekt: string; pruefbereich: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return b2bPublished.filter((p) => p.url.split("/").length === 4).map((p) => ({ objekt: p.objekt, pruefbereich: p.url.split("/")[3] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { objekt, pruefbereich } = await params;
  const page = b2bPublishedFor(objekt, pruefbereich);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: page.url },
    openGraph: { url: page.url, title: page.metaTitle, description: page.metaDescription, type: "article" },
  };
}

export default async function B2bBereichRoute({ params }: Props) {
  const { objekt, pruefbereich } = await params;
  const page = b2bPublishedFor(objekt, pruefbereich);
  if (!page) notFound();
  return <B2bPageView page={page} />;
}
