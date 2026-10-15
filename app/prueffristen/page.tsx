import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, DeadlineTable, PageIntro } from "@/components/Subpage";
import { areas, otherDeadlines } from "@/lib/content";

const title = "Prüffristen für technische Anlagen – Übersicht";
const description =
  "Welche Anlage muss wann geprüft werden? Prüffristen nach BetrSichV, DGUV Vorschrift 3 und VDI 6022 – mit Rechtsgrundlage je Anlagenart.";

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
      <PageIntro crumbs={[["Prüffristen", "/prueffristen"]]} kicker="ÜBERSICHT" title="Prüffristen für technische Anlagen">
        <p>
          Die Prüffrist einer technischen Anlage legt der Betreiber in der Gefährdungsbeurteilung fest (§ 3
          Betriebssicherheitsverordnung). Für viele Anlagen geben Verordnungen Höchstfristen vor, für andere nennen
          DGUV-Regelwerk, Technische Regeln und Normen Richtwerte. Diese Übersicht fasst die gängigen Fristen mit ihrer
          Rechtsgrundlage zusammen.
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
          <a href="#weitere-anlagen">Weitere Anlagen</a>
        </nav>

        {areas.map((a) => (
          <div key={a.slug} id={a.slug} className="deadline-group">
            <h2>Prüffristen {a.name}</h2>
            <DeadlineTable rows={a.rows} />
            <Link href={`/pruefbereiche/${a.slug}`} className="text-link">
              {a.name}: Prüfungen koordinieren lassen
            </Link>
          </div>
        ))}

        <div id="weitere-anlagen" className="deadline-group">
          <h2>Weitere Anlagen und Einrichtungen</h2>
          <DeadlineTable rows={otherDeadlines} />
        </div>
      </section>

      <section className="section page-width section-tight prose">
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
          Durchführung überwachen und die Nachweise vorhalten.
        </p>
        <p className="muted-note">
          Hinweis: Die Tabelle nennt Richtwerte und Höchstfristen und ersetzt keine Einzelfallprüfung. Abweichende
          Fristen können sich aus Herstellerangaben, Auflagen von Behörden oder Versicherern und Landesrecht ergeben.
        </p>
      </section>

      <CtaBand title="Ihre Prüffristen zentral überwachen lassen." />
    </>
  );
}
