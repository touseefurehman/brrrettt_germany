import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PartnerPageView from "@/components/PartnerPageView";
import { partnerBySlug, previewTokenValid } from "@/lib/partner";

// Redaktionelle Vorschau: /vorschau/partner/<slug>?token=<PREVIEW_TOKEN>. Ohne gültiges Token 404, immer noindex.
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ token?: string | string[] }> };

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Vorschau (Entwurf)", robots: { index: false, follow: false, nocache: true } };

export default async function PartnerPreview({ params, searchParams }: Props) {
  const t = (await searchParams).token;
  const token = Array.isArray(t) ? t[0] : t;
  if (!previewTokenValid(token)) notFound();
  const page = partnerBySlug((await params).slug);
  if (!page) notFound();
  return <PartnerPageView page={page} preview previewToken={token} />;
}
