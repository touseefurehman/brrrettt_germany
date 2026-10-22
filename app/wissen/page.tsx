import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { CtaBand, PageIntro } from "@/components/Subpage";
import { site } from "@/lib/site";
import { articles, clusters } from "@/lib/wissen";

const title = "Wissen Betreiberverantwortung – Fachartikel & Leitfäden";
const description =
  "Fachartikel zu Betreiberverantwortung, Betreiberpflichten, Prüffristen und Haftung – mit Tabellen, Checklisten und Praxisbeispielen für Betreiber und Verwalter.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/wissen" },
  openGraph: { url: "/wissen", title, description },
};

export default function WissenPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: `${site.url}/wissen`,
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: articles.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/wissen/${a.slug}`,
              name: a.h1,
            })),
          },
        }}
      />
      <PageIntro crumbs={[["Wissen", "/wissen"]]} kicker="WISSEN" title="Wissen zu Betreiberverantwortung und Betreiberpflichten">
        <p>
          Fachartikel für Betreiber, technische Leitungen, Wohnungsunternehmen, Kommunen und Verwaltungen: was
          Betreiberverantwortung bedeutet, wie Pflichten organisiert werden und welche Prüfungen in Ihrer Branche gelten –
          jeweils mit Rechtsgrundlagen, Tabellen, Checklisten und Praxisbeispielen.
        </p>
      </PageIntro>

      <section className="section page-width section-tight">
        {clusters.map((c) => (
          <div key={c.name} className="cluster">
            <h2>{c.name}</h2>
            <p className="muted-note">{c.text}</p>
            <div className="link-cards three">
              {articles
                .filter((a) => a.cluster === c.name)
                .map((a) => (
                  <Link key={a.slug} href={`/wissen/${a.slug}`}>
                    <strong>{a.h1}</strong>
                    <p>{a.teaser}</p>
                    <span>Artikel lesen</span>
                  </Link>
                ))}
            </div>
          </div>
        ))}
        <p className="muted-note">
          Alle Fristen auf einen Blick: <Link href="/prueffristen">Prüffristen im Überblick</Link>
        </p>
      </section>

      <CtaBand title="Betreiberpflichten organisieren lassen – statt selbst nachlesen." />
    </>
  );
}
