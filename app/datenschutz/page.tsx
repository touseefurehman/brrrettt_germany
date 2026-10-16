import type { Metadata } from "next";
import { PageIntro } from "@/components/Subpage";
import { addressLine, emailLink, fullCompanyName, hasAddress, hasPhone, phoneLink, site } from "@/lib/site";

// Datenschutz-Aufsichtsbehörden der Länder für den nicht-öffentlichen Bereich, Schlüssel = site.state
const authorities: Record<string, string> = {
  "Baden-Württemberg": "Landesbeauftragte/r für den Datenschutz und die Informationsfreiheit Baden-Württemberg",
  Bayern: "Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)",
  Berlin: "Berliner Beauftragte/r für Datenschutz und Informationsfreiheit",
  Brandenburg: "Landesbeauftragte/r für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg",
  Bremen: "Landesbeauftragte/r für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen",
  Hamburg: "Hamburgische/r Beauftragte/r für Datenschutz und Informationsfreiheit",
  Hessen: "Hessische/r Beauftragte/r für Datenschutz und Informationsfreiheit",
  "Mecklenburg-Vorpommern": "Landesbeauftragte/r für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern",
  Niedersachsen: "Landesbeauftragte/r für den Datenschutz Niedersachsen",
  "Nordrhein-Westfalen": "Landesbeauftragte/r für Datenschutz und Informationsfreiheit Nordrhein-Westfalen",
  "Rheinland-Pfalz": "Landesbeauftragte/r für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz",
  Saarland: "Unabhängiges Datenschutzzentrum Saarland",
  Sachsen: "Sächsische/r Datenschutz- und Transparenzbeauftragte/r",
  "Sachsen-Anhalt": "Landesbeauftragte/r für den Datenschutz Sachsen-Anhalt",
  "Schleswig-Holstein": "Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD)",
  Thüringen: "Thüringer Landesbeauftragte/r für den Datenschutz und die Informationsfreiheit",
};
const authority = authorities[site.state];

// Gleiche Bedingung wie in app/api/kontakt/route.ts: ohne Resend-Konfiguration versendet das Formular über Web3Forms
const usesResend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM);

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
          {hasAddress && (
            <>
              <br />
              {addressLine}
            </>
          )}
          <br />
          {hasPhone && (
            <>
              Telefon: <a href={phoneLink}>{site.phoneDisplay}</a> ·{" "}
            </>
          )}
          E-Mail: <a href={emailLink}>{site.email}</a>
        </p>

        <h2>2. Hosting und Server-Logfiles</h2>
        <p>
          Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf
          der Website verarbeitet Vercel technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit des Zugriffs,
          aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem. Die Verarbeitung erfolgt auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der sicheren und stabilen Bereitstellung der
          Website. Die Logdaten werden nur so lange gespeichert, wie es für Betrieb, Fehleranalyse und Abwehr von
          Angriffen erforderlich ist, und anschließend automatisch gelöscht. Eine Zusammenführung mit anderen
          Datenquellen findet nicht statt.
        </p>
        <p>
          Dabei können Daten in die USA übermittelt werden. Vercel Inc. ist unter dem EU-U.S. Data Privacy Framework
          zertifiziert; die Übermittlung stützt sich auf den Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO)
          und ergänzend auf EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO). Mit Vercel besteht ein Vertrag
          zur Auftragsverarbeitung nach Art. 28 DSGVO.
        </p>

        <h2>3. Kontaktformular und Anfragen per E-Mail</h2>
        <p>
          Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir die von Ihnen angegebenen
          Daten (Name, Firma, E-Mail-Adresse, optional Telefonnummer sowie Ihre Nachricht) zur Bearbeitung Ihrer Anfrage.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertragsabschluss gerichtet ist,
          im Übrigen Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          {usesResend ? (
            <>
              Für die Zustellung der Formularnachrichten nutzen wir den E-Mail-Versanddienst Resend (Resend Inc., USA).
              Die Übermittlung in die USA stützt sich auf EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO); mit
              dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.
            </>
          ) : (
            <>
              Für die Zustellung der Formularnachrichten nutzen wir den Formulardienst Web3Forms (web3forms.com). Ihre
              Angaben werden beim Absenden direkt aus Ihrem Browser an den Dienst übertragen und von dort per E-Mail an
              uns weitergeleitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in
              der zuverlässigen Zustellung Ihrer Anfrage.
            </>
          )}{" "}
          Ihre Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
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
          Bundesland Ihres Wohnsitzes oder unseres Sitzes.{" "}
          {authority ? (
            <>Für uns zuständig ist: {authority}.</>
          ) : (
            <>
              Eine Übersicht der Aufsichtsbehörden finden Sie bei der Datenschutzkonferenz unter{" "}
              <a href="https://www.datenschutzkonferenz-online.de" rel="noopener">
                datenschutzkonferenz-online.de
              </a>
              .
            </>
          )}
        </p>

        <p className="page-meta">Stand: Oktober 2026</p>
      </section>
    </>
  );
}
