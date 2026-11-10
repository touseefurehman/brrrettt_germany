import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ElektroQaView, { QaLinks } from "@/components/ElektroQaView";
import {
  commercialPath,
  HUB_NAME,
  HUB_PATH,
  knowledgeBySlug,
  knowledgeItems,
  knowledgePath,
  MODIFIED_DATE,
  otherKnowledgeInCategory,
  PUBLISHED_DATE,
  relatedCommercial,
} from "@/lib/elektropruefung";
import { site } from "@/lib/site";

// Wissensseiten Elektroprüfung (informationelle Fragen) – alle veröffentlicht, ohne Partnerbox.
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return knowledgeItems.map((k) => ({ slug: k.slug }));
}

const metaFor = (k: { question: string; shortAnswer: string }) => ({
  title: `${k.question} | ${site.domain}`,
  description: k.shortAnswer.slice(0, 155),
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = knowledgeBySlug((await params).slug);
  if (!item) return {};
  const path = knowledgePath(item);
  const { title, description } = metaFor(item);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title,
      description,
      type: "article",
      publishedTime: PUBLISHED_DATE,
      modifiedTime: MODIFIED_DATE,
    },
  };
}

export default async function ElektroKnowledgePage({ params }: Props) {
  const item = knowledgeBySlug((await params).slug);
  if (!item) notFound();
  const path = knowledgePath(item);

  return (
    <ElektroQaView
      item={item}
      path={path}
      crumbs={[
        [HUB_NAME, HUB_PATH],
        [item.question, path],
      ]}
      kicker={`WISSEN · ${item.category.toUpperCase()}`}
      description={metaFor(item).description}
    >
      <QaLinks
        title="Weitere Fragen zum Thema"
        links={otherKnowledgeInCategory(item).map((k) => [k.question, knowledgePath(k), k.category])}
      />
      <QaLinks
        title="Anbieter und Kosten"
        links={[
          ...relatedCommercial(item).map((c): [string, string, string] => [c.question, commercialPath(c), c.category]),
          ["Elektroprüfung nach DGUV V3 – alle Fragen", HUB_PATH, "Übersicht"],
        ]}
      />
    </ElektroQaView>
  );
}
