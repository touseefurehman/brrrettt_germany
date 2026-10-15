import type { Metadata } from "next";
import { CtaBand, PageIntro } from "@/components/Subpage";
import { Check } from "@/components/icons";
import { site } from "@/lib/site";

const title = "Über uns – Ihr Partner für Betreiberpflichten";
const description =
  "Wer hinter betreibermanager.de steht: Qualifikationen, Arbeitsweise und das Prüfpartnernetzwerk, mit dem wir Ihre Betreiberpflichten organisieren.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ueber-uns" },
  openGraph: { url: "/ueber-uns", title, description },
};

export default function UeberUnsPage() {
  return (
    <>
      <PageIntro crumbs={[["Über uns", "/ueber-uns"]]} kicker="ÜBER UNS" title="Wer Ihre Betreiberpflichten koordiniert">
        <p>
          betreibermanager.de ist ein Angebot der {site.companyName} {site.legalForm} mit Sitz in {site.city}. Wir
          ermitteln Prüfpflichten, koordinieren qualifizierte Prüfpartner und führen die Nachweise zusammen – für
          Betreiber, technische Leiter und Facility Manager.
        </p>
      </PageIntro>

      <section className="section page-width prose-grid">
        <div className="person-card">
          {/* TODO: Porträtfoto ergänzen – /public/assets/ansprechpartner.webp, Alt-Text: "[Name], Ansprechpartner für Betreiberpflichten bei betreibermanager.de" */}
          <div className="person-photo" aria-hidden="true"></div>
          <h2>{site.contactPerson}</h2>
          <p>{site.contactPersonRole}</p>
          <p className="muted-note">[Kurzer Werdegang: Ausbildung, Berufserfahrung, Schwerpunkte]</p>
        </div>
        <div className="prose">
          <h2>Arbeitsweise</h2>
          <p>
            Wir arbeiten nach der Systematik der GEFMA 190: Pflichten werden je Anlage und Standort ermittelt, Aufgaben
            klar zugeordnet und jede Prüfung mit Nachweis abgeschlossen. Die gesetzliche Betreiberverantwortung bleibt
            beim Betreiber – wir übernehmen Ermittlung, Organisation, Koordination und Dokumentation.
          </p>
          <h2>Unser Prüfpartnernetzwerk</h2>
          <p>Die Prüfungen selbst führen qualifizierte Prüfpartner durch. Wir wählen sie nach festen Kriterien aus:</p>
          <ul className="check-list">
            <li>
              <Check size={15} /> Befähigung nach TRBS 1203 bzw. Zulassung als ZÜS, wo vorgeschrieben
            </li>
            <li>
              <Check size={15} /> Nachgewiesene Sachkunde im jeweiligen Prüfbereich
            </li>
            <li>
              <Check size={15} /> Nachvollziehbare Prüfprotokolle mit Mängelbewertung
            </li>
          </ul>
          <h2>Mitgliedschaften</h2>
          <p>[z. B. GEFMA-Mitgliedschaft – falls vorhanden, sonst Abschnitt entfernen]</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
