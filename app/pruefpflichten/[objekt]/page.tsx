import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqList from "@/components/FaqList";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import { PageIntro } from "@/components/Subpage";
import {
  BASE_NAME,
  BASE_PATH,
  groupByBereich,
  isDraft,
  landingPath,
  landingsForObjekt,
  objekte,
  objektBySlug,
  objektPath,
} from "@/lib/rank-rent";
import { site } from "@/lib/site";

type Props = { params: Promise<{ objekt: string }> };

// Nur veröffentlichte Objekte (im Vorschau-Modus auch Entwürfe) werden vorab erzeugt; alles andere ist 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return objekte.map((o) => ({ objekt: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const o = objektBySlug((await params).objekt);
  if (!o) return {};
  const path = objektPath(o);
  return {
    title: { absolute: o.metaTitle },
    description: o.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: o.metaTitle, description: o.metaDescription },
    ...(isDraft(o) && { robots: { index: false, follow: false } }),
  };
}

export default async function ObjektHub({ params }: Props) {
  const o = objektBySlug((await params).objekt);
  if (!o) notFound();
  const path = objektPath(o);
  const pages = landingsForObjekt(o.slug);
  const groups = groupByBereich(pages);
  const faq = o.faq ?? [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: o.h1,
          description: o.metaDescription,
          url: `${site.url}${path}`,
          inLanguage: "de-DE",
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: pages.length,
            itemListElement: pages.map((l, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}${landingPath(l)}`,
              name: l.h1,
            })),
          },
        }}
      />
      {faq.length > 0 && <JsonLd data={faqSchema(faq.map((f): [string, string] => [f.question, f.answer]))} />}
      <PageIntro
        crumbs={[
          [BASE_NAME, BASE_PATH],
          [o.name, path],
        ]}
        kicker={`PRÜFPFLICHTEN · ${o.name.toUpperCase()}`}
        title={o.h1}
      >
        {isDraft(o) && <p className="rr-draft-note">ENTWURF – nur lokal sichtbar, nicht indexiert.</p>}
        <p>{o.intro}</p>
      </PageIntro>

      <section className="section page-width section-tight">
        {groups.map(([bereich, items]) => (
          <div key={bereich.slug} className="cluster">
            <h2>{bereich.name}</h2>
            <ul className="qa-list">
              {items.map((l) => (
                <li key={l.id}>
                  <Link href={landingPath(l)}>{l.h1}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {faq.length > 0 && (
        <section className="section page-width section-tight">
          <h2>Häufige Fragen</h2>
          <FaqList faqs={faq.map((f): [string, string] => [f.question, f.answer])} />
        </section>
      )}
    </>
  );
}
