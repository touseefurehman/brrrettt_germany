import type { Metadata } from "next";
import { PageIntro } from "@/components/Subpage";
import { emailLink, fullCompanyName, phoneLink, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum | betreibermanager.de",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

// Vor dem Launch anwaltlich prüfen lassen. Angaben nach § 5 DDG.
export default function ImpressumPage() {
  return (
    <>
      <PageIntro crumbs={[["Impressum", "/impressum"]]} kicker="RECHTLICHES" title="Impressum" />
      <section className="section page-width section-tight prose">
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {fullCompanyName}
          <br />
          {site.street}
          <br />
          {site.postalCode} {site.city}
        </p>

        <h2>Vertreten durch</h2>
        <p>{site.representative}</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={phoneLink}>{site.phoneDisplay}</a>
          <br />
          E-Mail: <a href={emailLink}>{site.email}</a>
        </p>

        <h2>Registereintrag</h2>
        <p>
          Registergericht: {site.registerCourt}
          <br />
          Registernummer: {site.registerNumber}
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: {site.vatId}</p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </section>
    </>
  );
}
