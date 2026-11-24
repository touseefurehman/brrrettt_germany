import type { Metadata } from "next";
import { notFound } from "next/navigation";
import B2bPageView from "@/components/B2bPage";
import { b2bBySlug, previewTokenValid } from "@/lib/b2b";

// Redaktionelle Vorschau für Henryk: /vorschau/b2b/<slug>?token=<PREVIEW_TOKEN>
// Ohne gültiges Token (oder ohne gesetzte Variable PREVIEW_TOKEN) 404. Immer noindex, nie im Sitemap.
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ token?: string | string[] }> };

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vorschau (Entwurf)",
  robots: { index: false, follow: false, nocache: true },
};

export default async function B2bPreview({ params, searchParams }: Props) {
  const token = (await searchParams).token;
  if (!previewTokenValid(Array.isArray(token) ? token[0] : token)) notFound();
  const page = b2bBySlug((await params).slug);
  if (!page) notFound();
  return <B2bPageView page={page} preview />;
}
