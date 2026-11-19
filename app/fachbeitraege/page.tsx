import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { PageIntro } from "@/components/Subpage";
import { site } from "@/lib/site";
import { ARTICLE_BASE, ARTICLE_BASE_NAME, articlePath, articles, groupArticles, hasPublishedArticles } from "@/lib/sov";

// Übersicht der Fachbeiträge. Ohne veröffentlichten Beitrag (und ohne Vorschau-Modus) gibt es 404.
const h1 = "Fachbeiträge zu Betreiberpflichten und Prüfungen";
const title = `${h1} | ${site.domain}`;
const description =
  "Fachbeiträge der Redaktion: was bei Prüfpflichten oft falsch gemacht wird und welche Pflichten auf Betreiber zukommen.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: ARTICLE_BASE },
  openGraph: { url: ARTICLE_BASE, title, description },
  ...(!hasPublishedArticles && { robots: { index: false, follow: false } }),
};

export default function FachbeitraegeOverview() {
  if (articles.length === 0) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: h1,
          description,
          url: `${site.url}${ARTICLE_BASE}`,
          inLanguage: "de-DE",
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: articles.length,
            itemListElement: articles.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}${articlePath(a)}`,
              name: a.title,
            })),
          },
        }}
      />
      <PageIntro crumbs={[[ARTICLE_BASE_NAME, ARTICLE_BASE]]} kicker="FACHBEITRÄGE" title={h1} />
      <section className="section page-width section-tight">
        {groupArticles(articles).map(([type, heading, items]) => (
          <div key={type} className="cluster">
            <h2>{heading}</h2>
            <ul className="qa-list">
              {items.map((a) => (
                <li key={a.slug}>
                  <Link href={articlePath(a)}>{a.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
