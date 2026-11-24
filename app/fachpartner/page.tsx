import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import FachpartnerForm from "@/components/partners/FachpartnerForm";
import { PageIntro } from "@/components/Subpage";
import { BOOKING_URL, partnerContact } from "@/lib/partner-config";
import { fachseiten, fachseitenGesamt, zielgruppen } from "@/lib/partner-medienkit";
import { clusterPath, clusters, partnerStatusLabel } from "@/lib/clusters";
import { FACHPARTNER_PATH, messen, SPONSORING_PATH, upcomingReports } from "@/lib/partners";
import { site } from "@/lib/site";
import { int, latestReport, pct, REPORT_BASE, reportPath } from "@/lib/sov";

const title = "Exklusiver Fachpartner werden | betreibermanager.de";
const description =
  "Exklusiver Fachpartner auf betreibermanager.de: ein bundesweiter Partner je Prüfbereich, 12 Monate Sichtbarkeit auf dem Portal für Betreiberpflichten, Anfragen direkt an Sie.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: FACHPARTNER_PATH },
  openGraph: { url: FACHPARTNER_PATH, title, description },
};

const roles: [string, string[]][] = [
  [
    "CEO / Geschäftsführung",
    ["Planbares 12-Monats-Modell statt Einzelkampagnen", "Exklusivität: ein bundesweiter Partner je Prüfbereich", "Preis auf Anfrage, im Gespräch nach der Nullmessung"],
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
      "Sichtbarkeit in dem Prüfbereich, in dem Einkäufer KI-Systeme fragen",
      "Anfragen gehen direkt an Sie",
    ],
  ],
];

const reasons: [string, string][] = [
  ["Exklusivität statt Preiskampf", "Pro Prüfbereich gibt es einen bundesweiten Partner. Ihre Seite wird nicht mit Wettbewerbern geteilt."],
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
  "Ein bundesweiter Partner pro Prüfbereich",
  "Laufzeit: 12 Monate",
  "Ihre Partnerbox, gekennzeichnet als „Anzeige“, getrennt von den redaktionellen Inhalten",
  "Anfragen gehen direkt an Sie",
  "Quartalsweise Auswertung",
  "Preise: auf Anfrage",
];

const faqs: [string, string][] = [
  [
    "Was bedeutet Exklusivität?",
    "Pro Prüfbereich gibt es einen bundesweiten Fachpartner. Solange Ihre Partnerschaft läuft, erscheint kein Wettbewerber in diesem Platz.",
  ],
  [
    "Garantieren Sie Platzierungen in ChatGPT & Co.?",
    "Nein. Wir garantieren keine Platzierungen in Google oder in KI-Systemen und keine Anzahl an Anfragen. Partner erhalten Exklusivität, Sichtbarkeit auf betreibermanager.de und Anfragen von Betreibern über das Portal.",
  ],
  [
    "Wie wird Werbung gekennzeichnet?",
    "Partnerinhalte erscheinen als „Anzeige“ und getrennt von den redaktionellen Inhalten. Report-Ergebnisse und Methodik bleiben unabhängig.",
  ],
  ["Was kostet die Partnerschaft?", "Auf Anfrage. Wir nennen ihn nach der kostenlosen Nullmessung im 20-Minuten-Gespräch."],
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
            description: "Ein bundesweiter Partner je Prüfbereich. Preis auf Anfrage.",
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
          sind Sie auf unserem Portal in Ihrem Prüfbereich exklusiv präsent.
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
        <h2>Die sechs Prüfbereiche</h2>
        <p className="muted-note">Je Prüfbereich ein eigener KI-Report und genau ein bundesweiter Fachpartnerplatz. Preis: auf Anfrage.</p>
        <div className="link-cards three">
          {clusters.map((c) => {
            const href = c.status === "published" ? clusterPath(c) : c.existingPage;
            const body = (
              <>
                <strong>{c.name}</strong>
                <span>
                  {c.status === "published" ? "Report live" : "Report in Erhebung"} · {partnerStatusLabel[c.partnerStatus]}
                </span>
                {href && <span>{c.status === "published" ? "Nullmessung anfordern" : "Mehr zum Prüfbereich"}</span>}
              </>
            );
            return href ? (
              <Link key={c.slug} href={href}>
                {body}
              </Link>
            ) : (
              <div key={c.slug} className="rr-benefit">
                {body}
              </div>
            );
          })}
        </div>
      </section>

      <section className="section page-width section-tight prose">
        <h2>So funktioniert die Exklusivität</h2>
        <ul>
          <li>Ein Partner pro Prüfbereich, bundesweit.</li>
          <li>Der Platz wird für 12 Monate vergeben; vorab erhalten Sie eine kostenlose Nullmessung für Ihr Unternehmen.</li>
          <li>Der Preis wird nach der Nullmessung im 20-Minuten-Gespräch genannt.</li>
        </ul>
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
            <strong>Exklusivität</strong>
            <span>Ein bundesweiter Partner je Prüfbereich, {clusters.length} Prüfbereiche.</span>
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
          Nennen Sie uns Leistung, Prüfbereich und Einsatzgebiet. Wir melden uns mit der Verfügbarkeit und den Konditionen.
        </p>
        <FachpartnerForm />
      </section>
    </>
  );
}
