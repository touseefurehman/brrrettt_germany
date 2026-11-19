import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FachbeitragView from "@/components/sov/FachbeitragView";
import { articleBySlug, articlePath, articles, isDraftArticle } from "@/lib/sov";

// Fachbeiträge: nur `status: "published"` bekommt eine Route; Entwürfe nur in der Vorschau (next dev).
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = articleBySlug((await params).slug);
  if (!a) return {};
  const path = articlePath(a);
  return {
    title: { absolute: a.metaTitle },
    description: a.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: a.metaTitle, description: a.metaDescription, type: "article", publishedTime: a.datePublished },
    ...(isDraftArticle(a) && { robots: { index: false, follow: false } }),
  };
}

export default async function FachbeitragRoute({ params }: Props) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  return <FachbeitragView a={a} />;
}
