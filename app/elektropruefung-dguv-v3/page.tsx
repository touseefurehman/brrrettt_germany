import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { CtaBand, PageIntro } from "@/components/Subpage";
import {
  commercialPath,
  groupByCategory,
  HUB_NAME,
  HUB_PATH,
  HUB_TITLE,
  knowledgeItems,
  knowledgePath,
  publishedCommercial,
} from "@/lib/elektropruefung";
import { site } from "@/lib/site";

// Hub der Elektroprüfung-DGUV-V3-Fragen. Welche Antwortseiten erscheinen, steuert PUBLISHED_PHASES in
// lib/elektropruefung.ts; die Wissensseiten sind immer vollständig verlinkt.

const title = `${HUB_TITLE} | ${site.domain}`;
const description =
  "Expertenantworten zur Elektroprüfung nach DGUV V3: Anbieter auswählen, Kosten einschätzen, Pflichten kennen – mit Rechtsgrundlagen für Einkauf und FM-Leitung.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: HUB_PATH },
  openGraph: { url: HUB_PATH, title, description },
};

export default function ElektropruefungHub() {
  const commercialGroups = groupByCategory(publishedCommercial);
  const knowledgeGroups = groupByCategory(knowledgeItems);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: HUB_TITLE,
          description,
          url: `${site.url}${HUB_PATH}`,
          inLanguage: "de-DE",
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: publishedCommercial.length,
            itemListElement: publishedCommercial.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}${commercialPath(c)}`,
              name: c.question,
            })),
          },
        }}
      />
      <PageIntro crumbs={[[HUB_NAME, HUB_PATH]]} kicker="ELEKTROPRÜFUNG · DGUV V3" title={HUB_TITLE}>
        <p>
          Die Elektroprüfung nach DGUV Vorschrift 3 ist die vorgeschriebene Prüfung elektrischer Anlagen und Betriebsmittel
          durch eine Elektrofachkraft – vor der ersten Inbetriebnahme, nach Änderungen und in regelmäßigen Abständen. Diese
          Seite bündelt Expertenantworten der Redaktion für Einkauf und FM-Leitung: wie Sie geeignete Prüfdienstleister
          finden, womit Sie bei den Kosten rechnen müssen und welche Pflichten dahinterstehen.
        </p>
        <p>
          Fristen, Prüfer und Kosten im Überblick: <Link href="/dguv-v3-pruefung">DGUV V3 Prüfung</Link> ·{" "}
          <Link href="/dguv-v3-pruefung-kosten">DGUV V3 Prüfung Kosten</Link>
        </p>
      </PageIntro>

      <section className="section page-width section-tight">
        {commercialGroups.map(([category, items]) => (
          <div key={category} className="cluster">
            <h2>{category}</h2>
            <ul className="qa-list">
              {items.map((c) => (
                <li key={c.slug}>
                  <Link href={commercialPath(c)}>{c.question}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="section page-width section-tight">
        <h2>Wissen zur Elektroprüfung</h2>
        <p className="muted-note">
          Hintergrund zu Pflichten, Fristen, Prüfern, Normen und Dokumentation – unabhängig von der Anbieterwahl.
        </p>
        <div className="qa-columns">
          {knowledgeGroups.map(([category, items]) => (
            <div key={category} className="qa-group">
              <h3>{category}</h3>
              <ul className="qa-list">
                {items.map((k) => (
                  <li key={k.slug}>
                    <Link href={knowledgePath(k)}>{k.question}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Elektroprüfung für alle Standorte organisieren lassen." />
    </>
  );
}
