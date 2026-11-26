import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema, faqSchema, webPageSchema } from "@/components/JsonLd";
import PruefpartnerForm from "@/components/partners/PruefpartnerForm";
import SichtbarkeitBox from "@/components/partners/SichtbarkeitBox";
import { PageIntro } from "@/components/Subpage";
import { partnerFormLive, partnerPublishedBySlug, partnerWeb3FormsKey } from "@/lib/partner";
import { PARTNER_BASE } from "@/lib/partner-core";
import { site } from "@/lib/site";

// Hub für Prüfbetriebe, die Prüfaufträge suchen (operative Zusammenarbeit). Bewusst getrennt vom bezahlten Fachpartner-Programm
// unter /fachpartner. Das Registrierungsformular erscheint erst, wenn die Unterseiten veröffentlicht sind (partnerFormLive).
const title = "Prüfpartner werden – für Prüfbetriebe | betreibermanager.de";
const description =
  "Prüfbetrieb für gesetzliche Prüfungen? So läuft die Zusammenarbeit mit betreibermanager.de: Registrierung, Prüfung der Qualifikation, mögliche Beauftragung.";
const h1 = "Prüfpartner werden: Zusammenarbeit mit betreibermanager.de für Prüfbetriebe";
const kurzantwort =
  "betreibermanager.de koordiniert gesetzliche Prüfungen für Betreiber mit mehreren Standorten und sucht dafür qualifizierte Prüfbetriebe als operative Partner, etwa für Elektro, Brandschutz, RLT-Hygiene, Trinkwasser, Türen und Tore oder Regale. Registrierung und Prüfung Ihrer Angaben sind keine Auftragszusage; Konditionen werden jeweils individuell vereinbart.";
const modified = "2026-11-25";
const contactHref = `/kontakt?thema=${encodeURIComponent("Prüfpartner – Registrierung")}`;
// Mit freigeschaltetem Formular führen die CTAs zur Registrierung auf dieser Seite, sonst zum Kontaktformular
const ctaHref = partnerFormLive ? "#registrierung" : contactHref;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PARTNER_BASE },
  openGraph: { url: PARTNER_BASE, title, description },
};

const faqs: [string, string][] = [
  ["Wer kann sich als Prüfpartner registrieren?", "Prüfbetriebe, die gesetzlich vorgeschriebene Prüfungen mit eigenem, qualifiziertem Personal durchführen. Welche Qualifikation nötig ist, hängt von der Prüfaufgabe ab. Betreiber, die Prüfungen beauftragen wollen, sind hier nicht gemeint."],
  ["Gibt es garantierte Aufträge?", "Nein. Die Registrierung und die Prüfung Ihrer Angaben sind keine Auftragszusage. Ob und in welchem Umfang eine Beauftragung in Frage kommt, ergibt sich aus Bedarf, Region und Kapazität."],
  ["Wer legt Preise und Konditionen fest?", "Preise und Konditionen werden jeweils individuell vereinbart."],
  ["Ist das dasselbe wie ein Fachpartnerplatz?", "Nein. Fachpartnerplätze sind ein bezahltes Angebot für Sichtbarkeit und unter /fachpartner beschrieben. Die Registrierung als Prüfpartner ist davon unabhängig."],
  ["Welche Nachweise werden verlangt?", "Je nach Gewerk und Prüfaufgabe, zum Beispiel Nachweise zur Qualifikation (etwa Elektrofachkraft bzw. zur Prüfung befähigte Person nach BetrSichV/TRBS 1203), zu Einsatzgebiet und Kapazität."],
  ["Wie registriere ich mich?", "Über das Kontaktformular mit dem Thema „Prüfpartner“. Nennen Sie Gewerke, Einsatzgebiet, Qualifikationen und Kapazität; die Pflichtangabe „Anzahl Standorte“ bezieht sich auf Ihre Betriebsstandorte. Die Registrierung ist keine automatische Freigabe."],
];

const trades: [string, string][] = [
  ["Elektro (DGUV V3)", "Prüfung elektrischer Anlagen und Betriebsmittel"],
  ["Brandschutz", "sicherheitstechnische Anlagen nach den Prüfverordnungen der Länder und Feuerlöscher"],
  ["RLT-Hygiene", "Hygieneinspektion raumlufttechnischer Anlagen nach VDI 6022"],
  ["Trinkwasser", "Probenahme und Untersuchung durch zugelassene Untersuchungsstellen"],
  ["Türen und Tore", "Prüfung kraftbetätigter Türen und Tore nach ASR A1.7"],
  ["Regale", "Inspektion von Lagereinrichtungen nach DIN EN 15635"],
];

const details: [string, string, string][] = [
  ["rahmenvertraege", "Rahmenverträge für Prüfdienstleister", "wiederkehrende Prüfaufträge im Rahmen einer Zusammenarbeit"],
  ["dguv-v3", "Bundesweite DGUV V3 Prüfaufträge", "für Elektroprüfbetriebe"],
  ["subunternehmer", "Subunternehmer für gesetzliche Prüfleistungen", "für Fachbetriebe aller genannten Gewerke"],
];

export default function PruefpartnerHub() {
  return (
    <>
      <JsonLd data={webPageSchema(PARTNER_BASE, h1, modified)} />
      <JsonLd data={faqSchema(faqs)} />
      <PageIntro crumbs={[["Prüfpartner werden", PARTNER_BASE]]} kicker="PRÜFPARTNER" title={h1}>
        <p className="b2b-kurzantwort">{kurzantwort}</p>
        <p>
          <Link href={ctaHref} className="rr-btn">
            Als Prüfpartner registrieren
          </Link>
        </p>
      </PageIntro>

      <section className="section page-width section-tight prose">
        <h2>Wen betreibermanager.de sucht</h2>
        <p>
          Gesucht sind qualifizierte Prüfbetriebe, die gesetzliche Prüfungen praktisch durchführen und die Ergebnisse sauber
          dokumentieren. betreibermanager.de koordiniert Prüfpflichten, Fristen, Dokumentation und externe Prüfdienstleister für
          Betreiber mit mehreren Standorten; die Prüfungen selbst führen qualifizierte Dritte aus. Wer als Betreiber Prüfungen
          koordinieren lassen möchte, findet das Angebot unter <Link href="/externer-betreibermanager">Externer Betreibermanager</Link>.
        </p>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Gewerke, die wir betrachten</h2>
        <p>
          Die Liste zeigt, für welche Gewerke Prüfbetriebe grundsätzlich in Frage kommen. Sie bedeutet nicht, dass jedes Gewerk
          aktuell beauftragt wird.
        </p>
        <ul>
          {trades.map(([t, d]) => (
            <li key={t}>
              <strong>{t}:</strong> {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="section page-width section-tight prose">
        <h2>So läuft die Zusammenarbeit</h2>
        <ol>
          <li>
            <strong>Registrieren:</strong> Sie geben Unternehmen, Gewerke, Einsatzgebiet, Qualifikationen und Kapazität an.
          </li>
          <li>
            <strong>Qualifikation prüfen:</strong> Wir prüfen Ihre Angaben und Nachweise. Die Registrierung ist keine automatische Freigabe.
          </li>
          <li>
            <strong>Mögliche Beauftragung:</strong> Wenn Bedarf, Region und Kapazität zusammenpassen, kann eine Beauftragung folgen.
            Ein Anspruch darauf besteht nicht; Konditionen werden individuell vereinbart.
          </li>
        </ol>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Die drei Wege im Detail</h2>
        <ul>
          {details.map(([slug, name, note]) => {
            const live = partnerPublishedBySlug(slug);
            return (
              <li key={slug}>
                {live ? <Link href={live.url}>{name}</Link> : name}: {note}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section page-width section-tight">
        <SichtbarkeitBox />
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <details key={q} className="faq-item" open={i === 0}>
              <summary className="faq-trigger">
                <h3>{q}</h3>
              </summary>
              <p className="faq-answer">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="registrierung" className="section page-width section-tight">
        <h2>Registrierung</h2>
        {partnerFormLive ? (
          <>
            <p>Die Registrierung ist keine automatische Freigabe und keine Auftragszusage. Wir prüfen Ihre Angaben und melden uns.</p>
            <PruefpartnerForm sourcePage={PARTNER_BASE} cta="Als Prüfpartner registrieren" accessKey={partnerWeb3FormsKey} />
          </>
        ) : (
          <>
            <p>
              Die Registrierung läuft über das Kontaktformular, vorbelegt mit dem Thema „Prüfpartner – Registrierung“. Die Registrierung ist
              keine automatische Freigabe; Konditionen werden jeweils individuell vereinbart.
            </p>
            <p>
              <Link href={contactHref} className="rr-btn">
                Als Prüfpartner registrieren
              </Link>
            </p>
          </>
        )}
      </section>

      <section className="section page-width section-tight">
        <aside className="author-box">
          <strong>Redaktion {site.domain}</strong>
          <span>Zuletzt aktualisiert: 25. November 2026</span>
        </aside>
      </section>
    </>
  );
}
