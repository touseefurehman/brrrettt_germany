import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PartnerApplyForm from "@/components/rank-rent/PartnerApplyForm";
import { PageIntro } from "@/components/Subpage";
import { PARTNER_PAGE_PATH, pruefbereiche } from "@/lib/rank-rent";
import { site } from "@/lib/site";

const title = "Exklusiver Prüfpartner werden | betreibermanager.de";
const description =
  "Exklusiver Prüfpartner auf betreibermanager.de: ein Partner je Prüfbereich und Objekttyp, qualifizierte Anfragen in Echtzeit, feste Monatsgebühr.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PARTNER_PAGE_PATH },
  openGraph: { url: PARTNER_PAGE_PATH, title, description },
};

const benefits: [string, string][] = [
  [
    "Exklusivität je Bereich",
    "Pro Prüfbereich und Objekttyp gibt es genau einen Partner. Ihre Seite wird nicht mit Wettbewerbern geteilt.",
  ],
  [
    "Qualifizierte Anfragen in Echtzeit",
    "Anfragen von Betreibern mit Angaben zu Objekt, Umfang und Wunschtermin gehen sofort per E-Mail an Sie.",
  ],
  ["Feste Monatsgebühr", "Keine Provision und keine Gebühr pro Anfrage. Sie wissen vorab, was die Platzierung kostet."],
];

const requirements = [
  "Nachweisbare Qualifikation für den Prüfbereich, z. B. befähigte Person nach TRBS 1203, VdS-Anerkennung, DAkkS-Akkreditierung oder ZÜS-Zulassung",
  "Schnelle Reaktionszeiten: Rückmeldung an den Anfragenden in der Regel innerhalb eines Werktags",
  "Bereitschaft, die Platzierung als „Anzeige“ kennzeichnen zu lassen",
];

export default function ForPartners() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: `${site.url}${PARTNER_PAGE_PATH}`,
          inLanguage: "de-DE",
          isPartOf: { "@id": `${site.url}/#website` },
        }}
      />
      <PageIntro
        crumbs={[["Für Prüfpartner", PARTNER_PAGE_PATH]]}
        kicker="FÜR PRÜFBETRIEBE"
        title="Exklusiver Prüfpartner auf betreibermanager.de werden"
      >
        <p>
          Betreiber suchen auf unseren Seiten nach Prüfpflichten für ihr Objekt, zum Beispiel DGUV V3 oder Brandschutz für
          Schulen. Pro Seite vergeben wir einen exklusiven Partnerplatz an einen qualifizierten Prüfbetrieb.
        </p>
      </PageIntro>

      <section className="section page-width section-tight">
        <h2>Ihre Vorteile</h2>
        <div className="link-cards three">
          {benefits.map(([t, text]) => (
            <div key={t} className="rr-benefit">
              <strong>{t}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Voraussetzungen</h2>
        <ul>
          {requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section id="anfrage" className="section page-width section-tight">
        <h2>Verfügbarkeit anfragen</h2>
        <p>
          Nennen Sie uns Prüfbereich und Einsatzgebiet. Wir melden uns mit der Verfügbarkeit und den Konditionen.
        </p>
        <PartnerApplyForm bereiche={pruefbereiche.map((b) => ({ slug: b.slug, name: b.name }))} />
      </section>
    </>
  );
}
