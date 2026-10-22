import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { audienceBySlug, audiences } from "@/lib/leistungen";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = audienceBySlug((await params).slug);
  if (!page) return {};
  const path = `/betreiberpflichten/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { url: path, title: page.title, description: page.description },
  };
}

export default async function AudiencePage({ params }: Props) {
  const page = audienceBySlug((await params).slug);
  if (!page) notFound();
  const path = `/betreiberpflichten/${page.slug}`;
  return (
    <ServicePageView
      page={page}
      path={path}
      crumbs={[
        ["Branchen", "/#branchen"],
        [page.name, path],
      ]}
    />
  );
}
