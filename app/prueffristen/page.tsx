import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, DeadlineTable, PageIntro } from "@/components/Subpage";
import { areas, drinkingWaterDeadlines, otherDeadlines } from "@/lib/content";

const title = "Prüffristen im Überblick – Betreiberverantwortung";
const description =
  "Welche Anlage muss wann geprüft werden? Richtwerte für Elektrotechnik, Brandschutz, Aufzüge, Lüftung und Trinkwasser – mit Rechtsgrundlage je Anlagenart.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/prueffristen" },
  openGraph: { url: "/prueffristen", title, description },
};

// Bei inhaltlichen Änderungen aktualisieren – das Datum ist ein Vertrauenssignal für Leser und KI-Systeme.
const lastReviewed = "Oktober 2026";

export default function PrueffristenPage() {
  return (
    <>
      <PageIntro
        crumbs={[["Prüffristen", "/prueffristen"]]}
        kicker="ÜBERSICHT"
        title="Prüffristen im Überblick – alle Prüfbereiche der Betreiberverantwortung"
      >
        <p>
          Welche Prüfung wann fällig ist, steht in fünf verschiedenen Regelwerken. Diese Übersicht führt die Richtwerte
          für Elektrotechnik, Brandschutz, Aufzugsanlagen, Lüftung und Trinkwasser an einer Stelle zusammen – mit der
          jeweiligen Rechtsgrundlage, damit Sie jede Angabe nachvollziehen können.
        </p>
        <p>
          Die genannten Werte sind Richtwerte, keine festen Fristen. Verbindlich ist, was sich aus der
          Gefährdungsbeurteilung für Ihre Anlage ergibt: Eine Baustelle braucht kürzere Intervalle als ein Büro, eine
          Anlage mit häufigem Nutzerwechsel kürzere als eine stationäre. Umgekehrt lassen sich Intervalle verlängern, wenn
          die Fehlerquote nachweislich gering ist – das muss aber dokumentiert sein.
        </p>
        <p className="page-meta">Stand: {lastReviewed}</p>
      </PageIntro>

      <section className="section page-width section-tight">
        <nav className="toc" aria-label="Inhalt">
          {areas.map((a) => (
            <a key={a.slug} href={`#${a.slug}`}>
              {a.name}
            </a>
          ))}
          <a href="#trinkwasser">Trinkwasser</a>
          <a href="#weitere-anlagen">Weitere Anlagen</a>
        </nav>

        {areas.map((a) => (
          <div key={a.slug} id={a.slug} className="deadline-group">
            <h2>Prüffristen {a.name}</h2>
            <DeadlineTable rows={a.rows} />
            {a.slug === "druck-gas" && (
              <p className="muted-note">
                Eine pauschale Frist gibt es hier nicht. Äußere Prüfung, innere Prüfung und Festigkeitsprüfung richten
                sich nach Fluidgruppe und Druckinhaltsprodukt und werden für jede Anlage einzeln bestimmt. Die Tabelle
                nennt nur die Höchstfristen der BetrSichV – die Frist Ihrer Anlage kann kürzer sein.
              </p>
            )}
            <Link href={`/pruefbereiche/${a.slug}`} className="text-link">
              {a.name}: Prüfungen koordinieren lassen
            </Link>
          </div>
        ))}

        <div id="trinkwasser" className="deadline-group">
          <h2>Prüffristen Trinkwasser</h2>
          <DeadlineTable rows={drinkingWaterDeadlines} />
        </div>

        <div id="weitere-anlagen" className="deadline-group">
          <h2>Weitere Anlagen und Einrichtungen</h2>
          <DeadlineTable rows={otherDeadlines} />
        </div>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Was passiert, wenn eine Frist überschritten wird</h2>
        <p>
          Eine überschrittene Frist ist zunächst kein Schaden, aber eine Lücke im Nachweis. Praktisch wirkt sie an drei
          Stellen: Der Versicherungsschutz kann eingeschränkt sein. Bei einer Begehung durch Berufsgenossenschaft oder
          Aufsichtsbehörde drohen Beanstandungen bis hin zu Bußgeldern. Und im Schadensfall stellt sich die Frage nach
          einer Organisationspflichtverletzung.
        </p>
        <p>
          Entscheidend ist deshalb nicht, dass nie eine Frist abläuft – sondern dass Sie merken, wenn eine abläuft, und es
          dokumentiert nachholen.
        </p>
        <h2>Wer die Fristen führt</h2>
        <p>
          Die gesetzliche Betreiberverantwortung bleibt immer beim Betreiber. Delegierbar sind die Aufgaben dahinter:
          ermitteln, welche Pflichten gelten, Prüfungen beauftragen, Fristen überwachen, Nachweise führen, Mängel
          nachverfolgen. Genau diese Aufgaben übernehmen wir – über alle Prüfbereiche und alle Standorte hinweg.
        </p>
        <h2>Wer legt die Prüffrist fest?</h2>
        <p>
          Der Arbeitgeber bzw. Betreiber. Grundlage ist die Gefährdungsbeurteilung nach § 3 ArbSchG und § 3 BetrSichV.
          Darin werden Art, Umfang und Fristen der Prüfungen sowie die Qualifikation der prüfenden Person festgelegt.
          Höchstfristen aus der BetrSichV – etwa für Aufzugsanlagen und Druckbehälter – dürfen nicht überschritten werden.
        </p>
        <h2>Wer darf prüfen?</h2>
        <p>
          Je nach Anlage eine zur Prüfung befähigte Person nach TRBS 1203, eine sachkundige Person, ein
          bauaufsichtlich anerkannter Prüfsachverständiger oder eine zugelassene Überwachungsstelle (ZÜS). Aufzugsanlagen
          und viele Druckanlagen sind zwingend durch eine ZÜS zu prüfen.
        </p>
        <h2>Was gilt bei Betreiberverantwortung im Facility Management?</h2>
        <p>
          Die Richtlinie GEFMA 190 beschreibt, wie Betreiberpflichten systematisch erfasst, delegiert und kontrolliert
          werden. Delegierbar sind Aufgaben, nicht die Verantwortung: Wer Prüfungen beauftragt, muss Auswahl und
          Durchführung überwachen und die Nachweise vorhalten. Mehr dazu:{" "}
          <Link href="/wissen/betreiberpflichten-facility-management">Betreiberpflichten im Facility Management</Link>{" "}
          und <Link href="/wissen/betreiberpflichtenkataster-erstellen">Betreiberpflichtenkataster erstellen</Link>.
        </p>
        <h2>Prüffristen nach Branche</h2>
        <p>
          Welche dieser Fristen in Ihrem Bestand anfallen, hängt von der Nutzung ab:{" "}
          <Link href="/betreiberpflichten/wohnungsunternehmen">Wohnungsunternehmen</Link>,{" "}
          <Link href="/betreiberpflichten/kommunen">Kommunen</Link>,{" "}
          <Link href="/betreiberpflichten/krankenhaeuser">Krankenhäuser</Link>,{" "}
          <Link href="/wissen/betreiberpflichten-schulen">Schulen</Link>,{" "}
          <Link href="/wissen/betreiberpflichten-pflegeheime">Pflegeheime</Link> und{" "}
          <Link href="/wissen/betreiberpflichten-hausverwaltung">Hausverwaltungen</Link>.
        </p>
        <p className="muted-note">
          Stand: {lastReviewed}. Die Angaben ersetzen keine Rechtsberatung und keine Gefährdungsbeurteilung. Abweichende
          Fristen können sich aus Herstellerangaben, Auflagen von Behörden oder Versicherern und Landesrecht ergeben.
        </p>
      </section>

      <CtaBand title="Ihre Prüffristen zentral überwachen lassen." />
    </>
  );
}
