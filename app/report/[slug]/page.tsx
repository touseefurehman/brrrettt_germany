import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReportView from "@/components/sov/ReportView";
import { reportBySlug, reportPath, reports } from "@/lib/sov";

// Datenreports, z. B. /report/ki-report-dguv-v3-2026. Daten: content/sov/ (Anleitung: content/sov/README.md)
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = reportBySlug((await params).slug);
  if (!r) return {};
  const path = reportPath(r);
  return {
    title: { absolute: r.metaTitle },
    description: r.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: r.metaTitle,
      description: r.metaDescription,
      type: "article",
      publishedTime: r.datePublished,
    },
  };
}

export default async function ReportRoute({ params }: Props) {
  const r = reportBySlug((await params).slug);
  if (!r) notFound();
  return <ReportView r={r} />;
}
