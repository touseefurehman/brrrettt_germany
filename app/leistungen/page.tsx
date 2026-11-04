import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { serviceSchema } from "@/components/JsonLd";
import { CoordinationNote, InquirySection } from "@/components/PageParts";
import { PageIntro } from "@/components/Subpage";
import { katalogLeistungen, katalogSlug, leistungskatalog } from "@/lib/leistungskatalog";

const path = "/leistungen";
const title = "Leistungen: Prüfung, Wartung und Betreiberpflichten im Überblick";
const description = `${katalogLeistungen.length} Prüf-, Wartungs- und Betreiberleistungen von DGUV V3 über Brandschutz, Aufzüge und RLT bis CAFM – koordiniert über qualifizierte Fachbetriebe, bundesweit für mehrere Standorte.`;
const lead =
  "Prüfungen, Wartungen und Beauftragte für alle Gewerke Ihrer Gebäude – betreibermanager.de beauftragt qualifizierte Fachbetriebe, überwacht die Fristen und führt die Nachweise an einer Stelle zusammen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { url: path, title, description },
};

export default function LeistungenPage() {
  return (
    <>
      <JsonLd data={serviceSchema("Koordination von Prüfungen und Wartungen", lead, path)} />
      <PageIntro crumbs={[["Leistungen", path]]} kicker="LEISTUNGSKATALOG" title="Leistungen für Betreiber: Prüfung, Wartung und Dokumentation">
        <p>{lead}</p>
        <p>
          Wählen Sie eine einzelne Leistung oder lassen Sie uns alle Prüfpflichten Ihrer Standorte gemeinsam
          organisieren. Wo es zu einer Leistung bereits eine ausführliche Seite gibt, ist sie verlinkt.
        </p>
      </PageIntro>

      <section className="section page-width section-tight">
        <nav className="toc" aria-label="Bereiche">
          {leistungskatalog.map((b) => (
            <a key={b.slug} href={`#${b.slug}`}>
              {b.name}
            </a>
          ))}
        </nav>

        {leistungskatalog.map((b) => (
          <div key={b.slug} id={b.slug} className="catalog-group">
            <h2>{b.name}</h2>
            <p>{b.intro}</p>
            <ul className="catalog-list">
              {b.items.map((i) => (
                <li key={i.name}>
                  {i.name}
                  <span className="catalog-links">
                    {i.href && <Link href={i.href}>Details</Link>}
                    <Link href={`${path}?leistung=${katalogSlug(i.name)}#anfrage`}>Anfragen</Link>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <CoordinationNote />
      <InquirySection title="Leistung anfragen" source={path} catalog />
    </>
  );
}
