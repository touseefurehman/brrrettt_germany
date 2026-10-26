import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/Subpage";
import { Check } from "@/components/icons";
import { authors } from "@/lib/autoren";
import { company, fullCompanyName, isSet, site } from "@/lib/site";

const title = "Über uns – Ihr Partner für Betreiberpflichten";
const description =
  "Wer hinter betreibermanager.de steht: Qualifikationen, Arbeitsweise und das Prüfpartnernetzwerk, mit dem wir Ihre Betreiberpflichten organisieren.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ueber-uns" },
  openGraph: { url: "/ueber-uns", title, description },
};

// Belegbare Angaben kommen aus `company` in lib/site.ts. Was dort nicht eingetragen ist, erscheint nicht –
// eine leere Stelle schadet weniger als eine unbelegte Behauptung.
export default function UeberUnsPage() {
  const facts: [label: string, value: string][] = [
    ["Gegründet", company.foundingYear],
    ["Sitz", site.city],
    ["Team", company.teamSize],
  ].filter((f): f is [string, string] => isSet(f[1]));
  const figures = [...facts, ...company.figures.map(([value, label]): [string, string] => [label, value])];

  return (
    <>
      <PageIntro crumbs={[["Über uns", "/ueber-uns"]]} kicker="ÜBER UNS" title="Wer Ihre Betreiberpflichten koordiniert">
        <p>
          {isSet(site.companyName) && (
            <>
              betreibermanager.de ist ein Angebot der {fullCompanyName}
              {isSet(site.city) && <> mit Sitz in {site.city}</>}
              {isSet(company.foundingYear) && <>, gegründet {company.foundingYear}</>}.{" "}
            </>
          )}
          Wir ermitteln Prüfpflichten, koordinieren qualifizierte Prüfpartner und führen die Nachweise zusammen – für
          Betreiber, technische Leiter und Facility Manager.
        </p>
      </PageIntro>

      {figures.length > 0 && (
        <section className="section page-width section-tight">
          <dl className="fact-list">
            {figures.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="section page-width prose-grid">
        {/* Karte erscheint, sobald contactPerson in lib/site.ts eingetragen ist.
            TODO: Porträtfoto ergänzen – /public/assets/ansprechpartner.webp,
            Alt-Text: "<Name>, Ansprechpartner für Betreiberpflichten bei betreibermanager.de" */}
        {isSet(site.contactPerson) && (
          <div className="person-card">
            <div className="person-photo" aria-hidden="true"></div>
            <h2>{site.contactPerson}</h2>
            {isSet(site.contactPersonRole) && <p>{site.contactPersonRole}</p>}
          </div>
        )}
        <div className="prose">
          {company.people.length > 0 && (
            <>
              <h2>Die handelnden Personen</h2>
              {company.people.map((p) => {
                const author = authors.find((a) => a.name === p.name);
                return (
                  <div key={p.name}>
                    <h3>{author ? <Link href={`/autoren/${author.slug}`}>{p.name}</Link> : p.name}</h3>
                    <p>
                      <strong>{p.role}.</strong> {p.background}
                    </p>
                  </div>
                );
              })}
            </>
          )}
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
          {company.cases.length > 0 && (
            <>
              <h2>Fallbeispiele</h2>
              {company.cases.map((c) => (
                <div key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </>
          )}
          {company.memberships.length > 0 && (
            <>
              <h2>Mitgliedschaften</h2>
              <ul className="check-list">
                {company.memberships.map((m) => (
                  <li key={m}>
                    <Check size={15} /> {m}
                  </li>
                ))}
              </ul>
            </>
          )}
          {company.certifications.length > 0 && (
            <>
              <h2>Zertifizierungen</h2>
              <ul className="check-list">
                {company.certifications.map((c) => (
                  <li key={c}>
                    <Check size={15} /> {c}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
