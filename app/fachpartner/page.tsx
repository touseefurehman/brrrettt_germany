import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import FachpartnerForm from "@/components/partners/FachpartnerForm";
import { PageIntro } from "@/components/Subpage";
import { BOOKING_URL, partnerContact } from "@/lib/partner-config";
import { fachseiten, fachseitenGesamt, slotUebersicht, zielgruppen } from "@/lib/partner-medienkit";
import { regionen } from "@/lib/partner-regions";
import { FACHPARTNER_PATH, messen, SPONSORING_PATH, upcomingReports } from "@/lib/partners";
import { site } from "@/lib/site";
import { int, latestReport, pct, REPORT_BASE, reportPath } from "@/lib/sov";

const title = "Exklusiver Fachpartner werden | betreibermanager.de";
const description =
  "Exklusiver Fachpartner auf betreibermanager.de: ein Partner je Gebiet oder Vertikale, 12 Monate Sichtbarkeit auf dem Portal für Betreiberpflichten, Anfragen direkt an Sie.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: FACHPARTNER_PATH },
  openGraph: { url: FACHPARTNER_PATH, title, description },
};

const roles: [string, string[]][] = [
  [
    "CEO / Geschäftsführung",
    ["Planbares 12-Monats-Modell statt Einzelkampagnen", "Exklusivität je Gebiet oder Vertikale", "Preis auf Anfrage, abgestimmt auf Ihr Gebiet"],
  ],
  [
    "Marketing",
    [
      "Share of Voice, auch in der KI-Suche",
      "Eigene KI-Reports und Co-Branding",
      "Ganzjährige Wirkung über die Messetage hinaus",
    ],
  ],
  [
    "Vertrieb",
    [
      "Strukturierte Anfragen mit Standort, Umfang und Ansprechpartner",
      "Regionale Tourendichte durch Anfragen aus Ihrem Gebiet",
      "Anfragen gehen direkt an Sie",
    ],
  ],
];

const reasons: [string, string][] = [
  ["Exklusivität statt Preiskampf", "Pro Gebiet oder Vertikale gibt es einen Partner. Ihre Seite wird nicht mit Wettbewerbern geteilt."],
  [
    "365 Tage statt wenige Messetage",
    "Ihre Messepräsenz endet mit dem Messestand. Die Partnerschaft hält Ihre Sichtbarkeit über zwölf Monate aufrecht.",
  ],
  [
    "Vorqualifizierte Anfragen",
    "Betreiber nennen Objekt, Umfang und Ansprechpartner, bevor die Anfrage bei Ihnen ankommt.",
  ],
  [
    "Eigene Daten und KI-Reports",
    "Wir messen selbst, welche Quellen KI-Systeme nennen, und veröffentlichen die Ergebnisse als Reports.",
  ],
  [
    "Folgegeschäft statt Einmalauftrag",
    "Prüfungen wiederholen sich in festen Fristen. Wer beim ersten Auftrag überzeugt, ist beim nächsten Termin im Vorteil.",
  ],
  [
    "Vorarbeit übernehmen wir",
    "Inhalte, Aufbau und Pflege der Seiten liegen bei uns. Sie liefern die Fachkompetenz, wir die Reichweite auf dem Portal.",
  ],
];

const steps = [
  "Ein Partner pro Gebiet oder Vertikale",
  "Laufzeit: 12 Monate",
  "Ihre Partnerbox, gekennzeichnet als „Anzeige“, getrennt von den redaktionellen Inhalten",
  "Anfragen gehen direkt an Sie",
  "Quartalsweise Auswertung",
  "Preise: auf Anfrage",
];

const faqs: [string, string][] = [
  [
    "Was bedeutet Exklusivität?",
    "Pro Gebiet oder Vertikale gibt es einen Fachpartner. Solange Ihre Partnerschaft läuft, erscheint kein Wettbewerber in diesem Platz.",
  ],
  [
    "Garantieren Sie Platzierungen in ChatGPT & Co.?",
    "Nein. Wir garantieren keine Platzierungen in Google oder in KI-Systemen und keine Anzahl an Anfragen. Partner erhalten Exklusivität, Sichtbarkeit auf betreibermanager.de und Anfragen von Betreibern über das Portal.",
  ],
  [
    "Wie wird Werbung gekennzeichnet?",
    "Partnerinhalte erscheinen als „Anzeige“ und getrennt von den redaktionellen Inhalten. Report-Ergebnisse und Methodik bleiben unabhängig.",
  ],
  ["Was kostet die Partnerschaft?", "Auf Anfrage. Der Preis richtet sich nach Gebiet bzw. Vertikale. Wir nennen ihn im Gespräch."],
  [
    "Wie kommen die Anfragen bei uns an?",
    "Direkt per E-Mail an Sie, mit Angaben zu Standort, Umfang und Ansprechpartner. Eine Auswertung erhalten Sie quartalsweise.",
  ],
  [
    "Was ist Share of Voice?",
    "Der Anteil, den eine Quelle an allen genannten Quellen in KI-Antworten hat, gewichtet nach der Position der Nennung. Wie wir messen, steht in unserem KI-Report.",
  ],
];

export default function Fachpartner() {
  const r = latestReport;
  const tiles: [string, string][] = [
    [int(r.methodology.citations), "KI-Zitationen"],
    [int(r.methodology.runs), "KI-Antworten"],
    [int(r.methodology.uniqueDomains), "zitierte Domains"],
    [pct(r.keyFindings.maxSingleShare), "höchster Share of Voice"],
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Exklusive Fachpartnerschaft auf betreibermanager.de",
          serviceType: "Fachpartnerschaft für Prüfdienstleister und Fachbetriebe",
          url: `${site.url}${FACHPARTNER_PATH}`,
          description,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "Country", name: "Deutschland" },
          audience: { "@type": "BusinessAudience", name: "Fachbetriebe, Prüfdienstleister und Messeaussteller" },
          offers: {
            "@type": "Offer",
            name: "Exklusive Fachpartnerschaft, 12 Monate",
            description: "Ein Partner je Gebiet oder Vertikale. Preis auf Anfrage.",
            seller: { "@id": `${site.url}/#organization` },
          },
          isPartOf: { "@id": `${site.url}/#website` },
        }}
      />
      <JsonLd data={faqSchema(faqs)} />
      <PageIntro
        crumbs={[["Fachpartner", FACHPARTNER_PATH]]}
        kicker="FÜR FACHPARTNER"
        title="Exklusiver Fachpartner auf betreibermanager.de"
      >
        <p>Ihre Messe dauert wenige Tage – Ihre Sichtbarkeit 365.</p>
        <p>
          Für Geschäftsführung, Marketing und Vertrieb von Fachbetrieben und Messeausstellern: Als Fachpartner Betreiberpflichten
          sind Sie auf unserem Portal je Gebiet oder Vertikale exklusiv präsent.
        </p>
        <p className="rr-partner-actions">
          <a className="rr-btn" href="#anfrage">
            Gespräch anfragen
          </a>{" "}
          {BOOKING_URL && (
            <>
              <a className="rr-btn" href={BOOKING_URL} rel="noopener">
                Gespräch buchen
              </a>{" "}
            </>
          )}
          <Link className="rr-btn-secondary" href={reportPath(r)}>
            KI-Report ansehen
          </Link>
        </p>
      </PageIntro>

      <section className="section page-width section-tight">
        <h2>Was Sie als Fachpartner erwartet</h2>
        <div className="link-cards three">
          {roles.map(([role, points]) => (
            <div key={role} className="rr-benefit">
              <strong>{role}</strong>
              <ul>
                {points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section page-width section-tight">
        <h2>Warum Fachpartner</h2>
        <div className="link-cards three">
          {reasons.map(([t, text]) => (
            <div key={t} className="rr-benefit">
              <strong>{t}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Share of Voice: Sichtbarkeit in KI-Antworten</h2>
        <p>
          KI-Systeme wie ChatGPT, Perplexity und Gemini nennen bei Einkaufsfragen Quellen. {r.methodology.scoring} Unser Report
          zeigt, wie sich diese Sichtbarkeit zum Thema Elektroprüfung verteilt – ein Beispiel für KI-Sichtbarkeit im B2B.
        </p>
        <dl className="stat-tiles">
          {tiles.map(([value, label]) => (
            <div key={label} className="stat-tile">
              <dt>{label}</dt>
              <dd data-stat>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="muted-note">
          Quelle: {r.shortTitle}, Messung {r.period}, {r.methodology.prompts} Fragen an {r.methodology.engines.join(", ")}. Die
          Messung ist eine Momentaufnahme.{" "}
          <Link href={reportPath(r)}>Zum Report</Link>
        </p>
      </section>

      <section className="section page-width section-tight">
        <h2>Kernthemen für Partnerschaften</h2>
        <p className="muted-note">Preise für alle Themen: auf Anfrage.</p>
        <div className="link-cards three">
          {slotUebersicht.map(({ thema, frei, gesamt }) => (
            <Link key={thema.slug} href={thema.href}>
              <strong>{thema.name}</strong>
              <span>{thema.text}</span>
              <span>
                Bundesländer frei: {frei} von {gesamt} · Preis auf Anfrage
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section page-width section-tight prose">
        <h2>So funktioniert die Exklusivität</h2>
        <ul>
          <li>Ein Partner pro Thema × Objektart × Bundesland.</li>
          <li>Anfragen von Betreibern werden anhand der Postleitzahl des Objekts dem Bundesland zugeordnet und an den Partner dieses Gebiets weitergeleitet.</li>
          <li>Bundesweite Exklusivität für ein Thema ist auf Anfrage möglich.</li>
          <li>Gibt es in einem Gebiet noch keinen Partner, bearbeiten wir die Anfrage selbst.</li>
        </ul>
        <p className="muted-note">Gebietsraster: {regionen.map((x) => x.name).join(", ")}.</p>
      </section>

      <section className="section page-width section-tight">
        <h2>Medienkit: Zielgruppen und Themen-Tiefe</h2>
        <div className="link-cards three">
          <div className="rr-benefit">
            <strong>Zielgruppen</strong>
            <ul>
              {zielgruppen.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
          </div>
          <div className="rr-benefit">
            <strong>Themen-Tiefe: {fachseitenGesamt} veröffentlichte Fachseiten</strong>
            <ul>
              {fachseiten.map(([label, n]) => (
                <li key={label}>
                  {label}: {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="rr-benefit">
            <strong>Regionale Exklusivität</strong>
            <span>
              Ein Partner je Thema, Objektart und Bundesland ({regionen.length} Bundesländer, {slotUebersicht.length} Themen).
              Bundesweit auf Anfrage.
            </span>
          </div>
        </div>
        {partnerContact && (
          <p className="muted-note">
            Ansprechpartner: {partnerContact.name}
            {partnerContact.role && `, ${partnerContact.role}`}
            {partnerContact.email && (
              <>
                {" · "}
                <a href={`mailto:${partnerContact.email}`}>{partnerContact.email}</a>
              </>
            )}
          </p>
        )}
      </section>

      <section className="section page-width section-tight">
        <h2>Leitmessen und Themen</h2>
        <p className="muted-note">
          Aussteller dieser Leitmessen erreichen Betreiber ganzjährig über die passenden Seiten von {site.domain}.
        </p>
        <div className="table-wrap">
          <table className="data-table">
            <caption>Themenfelder, Leitmessen und passende Seiten</caption>
            <thead>
              <tr>
                <th scope="col">Thema</th>
                <th scope="col">Leitmessen</th>
                <th scope="col">Passende Seiten</th>
              </tr>
            </thead>
            <tbody>
              {messen.map((m) => (
                <tr key={m.themen}>
                  <th scope="row">{m.themen}</th>
                  <td>{m.messen.join(", ")}</td>
                  <td>
                    {m.links.map((l, i) => (
                      <span key={l.href}>
                        {i > 0 && " · "}
                        <Link href={l.href}>{l.label}</Link>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section page-width section-tight prose">
        <h2>So funktioniert die Partnerschaft</h2>
        <ul>
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <aside className="partner-box">
          <span className="partner-label">Anzeige</span>
          <p>So kennzeichnen wir Partnerinhalte: als „Anzeige“, getrennt von Redaktion und Messergebnissen.</p>
        </aside>
        <p className="muted-note">
          Wir garantieren keine Platzierungen in Google oder KI-Systemen und keine Anzahl an Anfragen.
        </p>
      </section>

      <section className="section page-width section-tight">
        <div className="link-cards three">
          <Link href={SPONSORING_PATH}>
            <strong>Studien-Sponsoring</strong>
            <span>Reports unterstützen: {upcomingReports.length} Reports in Vorbereitung</span>
          </Link>
          <Link href={REPORT_BASE}>
            <strong>Alle Reports</strong>
            <span>Unsere Datenauswertungen zu Betreiberpflichten</span>
          </Link>
        </div>
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <FaqList faqs={faqs} />
      </section>

      <section id="anfrage" className="section page-width section-tight">
        <h2>Gespräch anfragen</h2>
        <p>
          Nennen Sie uns Leistung, Vertikale und Region. Wir melden uns mit der Verfügbarkeit und den Konditionen.
        </p>
        <FachpartnerForm />
      </section>
    </>
  );
}
