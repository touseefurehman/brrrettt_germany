import type { Metadata } from "next";
import { PageIntro } from "@/components/Subpage";
import { emailLink, fullCompanyName, phoneLink, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | betreibermanager.de",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

// Entwurf nach Art. 13 DSGVO, abgestimmt auf das, was die Seite tatsächlich tut
// (Hosting Vercel, Kontaktformular mit E-Mail-Versand, lokal eingebundene Schrift, keine Cookies, kein Analytics).
// Vor dem Launch anwaltlich prüfen lassen und bei jeder Änderung (z. B. Analytics) anpassen.
export default function DatenschutzPage() {
  return (
    <>
      <PageIntro crumbs={[["Datenschutz", "/datenschutz"]]} kicker="RECHTLICHES" title="Datenschutzerklärung" />
      <section className="section page-width section-tight prose">
        <h2>1. Verantwortlicher</h2>
        <p>
          {fullCompanyName}
          <br />
          {site.street}, {site.postalCode} {site.city}
          <br />
          Telefon: <a href={phoneLink}>{site.phoneDisplay}</a> · E-Mail: <a href={emailLink}>{site.email}</a>
        </p>

        <h2>2. Hosting und Server-Logfiles</h2>
        <p>
          Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf
          der Website verarbeitet Vercel technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit des Zugriffs,
          aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem. Die Verarbeitung erfolgt auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der sicheren und stabilen Bereitstellung der
          Website. Die Logdaten werden [Speicherdauer – bitte prüfen] gespeichert und anschließend gelöscht.
        </p>
        <p>
          Dabei können Daten in die USA übermittelt werden. Die Übermittlung stützt sich auf [EU-U.S. Data Privacy
          Framework und/oder EU-Standardvertragsklauseln – bitte prüfen]. Mit Vercel besteht ein Vertrag zur
          Auftragsverarbeitung nach Art. 28 DSGVO.
        </p>

        <h2>3. Kontaktformular und Anfragen per E-Mail</h2>
        <p>
          Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir die von Ihnen angegebenen
          Daten (Name, Firma, E-Mail-Adresse, optional Telefonnummer sowie Ihre Nachricht) zur Bearbeitung Ihrer Anfrage.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertragsabschluss gerichtet ist,
          im Übrigen Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          Für den Versand der Formularnachrichten nutzen wir [E-Mail-Versanddienst: Web3Forms bzw. Resend Inc., USA – bitte
          prüfen und Rechtsgrundlage der Übermittlung ergänzen]. Ihre Daten werden gelöscht, sobald die Anfrage
          abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>

        <h2>4. Schriftarten</h2>
        <p>
          Diese Website verwendet die Schriftart „DM Sans“. Sie wird lokal von unserem Server ausgeliefert; beim
          Seitenaufruf findet keine Verbindung zu Servern von Google statt.
        </p>

        <h2>5. Cookies und Analyse</h2>
        <p>
          Diese Website setzt keine Cookies und verwendet keine Analyse- oder Trackingdienste. Sollte sich das ändern,
          holen wir vorher Ihre Einwilligung ein und passen diese Erklärung an.
        </p>

        <h2>6. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
          Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen Verarbeitungen auf Grundlage
          von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Wenden Sie sich dazu an die oben genannten Kontaktdaten.
        </p>
        <p>
          Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem
          Bundesland Ihres Wohnsitzes oder unseres Sitzes ([zuständige Landesdatenschutzbehörde]).
        </p>

        <p className="page-meta">Stand: Oktober 2026</p>
      </section>
    </>
  );
}
