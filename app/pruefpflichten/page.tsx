import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { PageIntro } from "@/components/Subpage";
import { BASE_NAME, BASE_PATH, landingsForObjekt, objekte, objektPath } from "@/lib/rank-rent";
import { site } from "@/lib/site";

// Übersicht aller veröffentlichten Objekttypen. Ohne veröffentlichtes Objekt (und ohne Vorschau-Modus) gibt es 404.
const title = `Prüfpflichten nach Objekttyp | ${site.domain}`;
const description = "Prüfpflichten nach Objekttyp: Welche Anlagen in Schulen, Krankenhäusern, Logistik und weiteren Objekten geprüft werden müssen.";
const allDraft = objekte.every((o) => o.status !== "published");

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: BASE_PATH },
  openGraph: { url: BASE_PATH, title, description },
  ...(allDraft && { robots: { index: false, follow: false } }),
};

export default function PruefpflichtenOverview() {
  if (objekte.length === 0) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Prüfpflichten nach Objekttyp",
          description,
          url: `${site.url}${BASE_PATH}`,
          inLanguage: "de-DE",
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: objekte.length,
            itemListElement: objekte.map((o, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}${objektPath(o)}`,
              name: o.name,
            })),
          },
        }}
      />
      <PageIntro crumbs={[[BASE_NAME, BASE_PATH]]} kicker="PRÜFPFLICHTEN" title="Prüfpflichten nach Objekttyp">
        <p>Wählen Sie Ihren Objekttyp und sehen Sie, welche Prüfungen Betreiber durchführen lassen müssen.</p>
      </PageIntro>
      <section className="section page-width section-tight">
        <div className="link-cards three">
          {objekte.map((o) => (
            <Link key={o.slug} href={objektPath(o)}>
              <strong>{o.name}</strong>
              <span>{landingsForObjekt(o.slug).length} Prüfbereiche</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
