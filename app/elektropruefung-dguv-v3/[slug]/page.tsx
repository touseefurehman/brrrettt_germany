import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ElektroQaView, { QaLinks } from "@/components/ElektroQaView";
import {
  commercialBySlug,
  commercialPath,
  HUB_NAME,
  HUB_PATH,
  knowledgePath,
  metaDescriptionFor,
  metaTitleFor,
  MODIFIED_DATE,
  partnerFor,
  PUBLISHED_DATE,
  publishedCommercial,
  relatedKnowledge,
  similarCommercial,
} from "@/lib/elektropruefung";

// Antwortseiten der kommerziellen Fragen – nur die Phasen aus PUBLISHED_PHASES (lib/elektropruefung.ts).
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCommercial.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = commercialBySlug((await params).slug);
  if (!item) return {};
  const path = commercialPath(item);
  const title = metaTitleFor(item);
  const description = metaDescriptionFor(item);
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

export default async function ElektroAnswerPage({ params }: Props) {
  const item = commercialBySlug((await params).slug);
  if (!item) notFound();
  const path = commercialPath(item);

  return (
    <ElektroQaView
      item={item}
      path={path}
      crumbs={[
        [HUB_NAME, HUB_PATH],
        [item.question, path],
      ]}
      kicker={`ELEKTROPRÜFUNG · ${item.category.toUpperCase()}`}
      description={metaDescriptionFor(item)}
      partner={partnerFor(item.partnerSlot)}
    >
      <QaLinks
        title="Ähnliche Fragen"
        links={similarCommercial(item).map((c) => [c.question, commercialPath(c), c.category])}
      />
      <QaLinks
        title="Wissen zur Elektroprüfung"
        links={[
          ...relatedKnowledge(item).map((k): [string, string, string] => [k.question, knowledgePath(k), k.category]),
          ["Alle Fragen zur Elektroprüfung", HUB_PATH, "Übersicht"],
        ]}
      />
    </ElektroQaView>
  );
}
