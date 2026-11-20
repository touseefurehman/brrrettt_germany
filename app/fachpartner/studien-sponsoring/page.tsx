import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import FachpartnerForm from "@/components/partners/FachpartnerForm";
import { PageIntro } from "@/components/Subpage";
import { FACHPARTNER_PATH, SPONSORING_PATH, sponsoringPakete, upcomingReports } from "@/lib/partners";
import { site } from "@/lib/site";
import { latestReport, reportPath } from "@/lib/sov";

const title = "Studien-Sponsoring Facility Management | betreibermanager.de";
const description =
  "Studienpartner Betreiberpflichten: Sponsoring unserer KI-Reports zu Prüfungen und Betreiberpflichten. Unabhängige Methodik, klar gekennzeichnete Anzeigen, Preis auf Anfrage.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: SPONSORING_PATH },
  openGraph: { url: SPONSORING_PATH, title, description },
};

const faqs: [string, string][] = [
  [
    "Beeinflusst das Sponsoring die Ergebnisse?",
    "Nein. Methodik und Messung bleiben unabhängig. Sponsoren haben keinen Einfluss auf Fragen, Auswertung oder Ergebnisse.",
  ],
  [
    "Wie werden Sponsoren-Inhalte gekennzeichnet?",
    "Als „Anzeige“ bzw. „Gesponsertes Statement“, getrennt von den Messergebnissen und der Redaktion.",
  ],
  [
    "Kann auch ein Anbieter aus der bewerteten Kategorie sponsern?",
    "Als Hauptsponsor („Presented by“) nicht: Sponsoren aus der im Report bewerteten Kategorie können den Report nicht als Hauptsponsor präsentieren.",
  ],
  [
    "Wie läuft ein Sponsoring ab?",
    "Sie senden uns eine Anfrage, wir klären im Gespräch Paket und Report-Thema. Die Messung und die Veröffentlichung des Reports liegen bei der Redaktion.",
  ],
  [
    "Wie lange läuft ein Sponsoring und was kostet es?",
    "Laufzeit und Umfang werden je Paket individuell abgestimmt. Die Preise nennen wir auf Anfrage.",
  ],
  [
    "Garantieren Sie Platzierungen in Google oder KI-Systemen?",
    "Nein. Wir garantieren keine Platzierungen in Google oder in KI-Systemen. Ein Sponsoring ist keine Garantie für Sichtbarkeit oder Anfragen.",
  ],
];

export default function StudienSponsoring() {
  const r = latestReport;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Studien-Sponsoring bei betreibermanager.de",
          serviceType: "Sponsoring von KI-Reports zu Betreiberpflichten",
          url: `${site.url}${SPONSORING_PATH}`,
          description,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "Country", name: "Deutschland" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Sponsoring-Pakete",
            itemListElement: sponsoringPakete.map((p) => ({
              "@type": "Offer",
              name: p.name,
              description: `${p.summary} Preis ${p.price}.`,
              seller: { "@id": `${site.url}/#organization` },
            })),
          },
          isPartOf: { "@id": `${site.url}/#website` },
        }}
      />
      <JsonLd data={faqSchema(faqs)} />
      <PageIntro
        crumbs={[
          ["Fachpartner", FACHPARTNER_PATH],
          ["Studien-Sponsoring", SPONSORING_PATH],
        ]}
        kicker="STUDIEN-SPONSORING"
        title="Studien-Sponsoring: Reports zu Betreiberpflichten unterstützen"
      >
        <p>
          Unsere KI-Reports messen, welche Quellen ChatGPT, Perplexity und Gemini bei Einkaufsfragen nennen. Als Studienpartner
          Betreiberpflichten unterstützen Sie einen Report und werden dafür klar gekennzeichnet genannt. Ein Beispiel:{" "}
          <Link href={reportPath(r)}>{r.shortTitle}</Link>.
        </p>
        <p className="rr-partner-actions">
          <a className="rr-btn" href="#anfrage">
            Sponsoring anfragen
          </a>
        </p>
      </PageIntro>

      <section className="section page-width section-tight">
        <h2>Pakete</h2>
        <div className="link-cards three">
          {sponsoringPakete.map((p) => (
            <div key={p.slug} className="rr-benefit">
              <strong>{p.name}</strong>
              <span>{p.summary}</span>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <span>
                <b>Preis:</b> {p.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section page-width section-tight">
        <h2>Kommende Reports</h2>
        <div className="link-cards three">
          {upcomingReports.map((u) => (
            <div key={u.slug} className="rr-benefit">
              <strong>{u.title}</strong>
              <span>
                Messe-Bezug: {u.messe} · Status: {u.status}
              </span>
              <a className="rr-btn-secondary" href={`${SPONSORING_PATH}?report=${u.slug}#anfrage`}>
                Als Sponsor einsteigen
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Neutralität und Kennzeichnung</h2>
        <ul>
          <li>Die Methodik bleibt unabhängig: Sponsoren nehmen keinen Einfluss auf Fragen, Messung und Ergebnisse.</li>
          <li>Sponsoren-Inhalte werden als „Anzeige“ bzw. „Gesponsertes Statement“ gekennzeichnet.</li>
          <li>Sponsoren-Inhalte erscheinen getrennt von den Messergebnissen.</li>
          <li>
            Sponsoren aus der im Report bewerteten Kategorie können den Report nicht als Hauptsponsor präsentieren.
          </li>
          <li>Wir garantieren keine Platzierungen in Google oder in KI-Systemen.</li>
        </ul>
        <aside className="partner-box">
          <span className="partner-label">Anzeige</span>
          <p>So sieht die Kennzeichnung aus: abgesetzt von den Messergebnissen und eindeutig als Anzeige markiert.</p>
        </aside>
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <FaqList faqs={faqs} />
      </section>

      <section id="anfrage" className="section page-width section-tight">
        <h2>Sponsoring anfragen</h2>
        <p>
          Sagen Sie uns, welches Paket und welcher Report Sie interessiert. Wir melden uns für ein Gespräch.{" "}
          <Link href={FACHPARTNER_PATH}>Mehr zur Fachpartnerschaft</Link>
        </p>
        <FachpartnerForm defaultAnliegen="Studien-Sponsoring" withSponsoring />
      </section>
    </>
  );
}
