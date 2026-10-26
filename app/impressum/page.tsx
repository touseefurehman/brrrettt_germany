import type { Metadata } from "next";
import { PageIntro } from "@/components/Subpage";
import EmailLink from "@/components/EmailLink";
import { fullCompanyName, hasAddress, hasPhone, isSet, phoneLink, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum | betreibermanager.de",
  alternates: { canonical: "/impressum" },
  // Indexierbar, sobald die Anschrift steht – das Impressum belegt für Suchmaschinen und KI, wer hinter der Seite steht
  robots: { index: hasAddress, follow: true },
};

// Vor dem Launch anwaltlich prüfen lassen. Angaben nach § 5 DDG.
// Nicht eingetragene Felder aus lib/site.ts werden ausgelassen statt als „[…]“ ausgegeben.
export default function ImpressumPage() {
  return (
    <>
      <PageIntro crumbs={[["Impressum", "/impressum"]]} kicker="RECHTLICHES" title="Impressum" />
      <section className="section page-width section-tight prose">
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {fullCompanyName}
          {hasAddress && (
            <>
              <br />
              {site.street}
              <br />
              {site.postalCode} {site.city}
            </>
          )}
        </p>

        {isSet(site.representative) && (
          <>
            <h2>Vertreten durch</h2>
            <p>{site.representative}</p>
          </>
        )}

        <h2>Kontakt</h2>
        <p>
          {hasPhone && (
            <>
              Telefon: <a href={phoneLink}>{site.phoneDisplay}</a>
              <br />
            </>
          )}
          E-Mail: <EmailLink />
        </p>

        {isSet(site.registerCourt) && isSet(site.registerNumber) && (
          <>
            <h2>Registereintrag</h2>
            <p>
              Registergericht: {site.registerCourt}
              <br />
              Registernummer: {site.registerNumber}
            </p>
          </>
        )}

        {isSet(site.vatId) && (
          <>
            <h2>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: {site.vatId}</p>
          </>
        )}

        {isSet(site.editorialResponsible) && (
          <>
            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>{site.editorialResponsible}</p>
          </>
        )}

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </section>
    </>
  );
}
