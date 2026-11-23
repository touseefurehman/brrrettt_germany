import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqList from "@/components/FaqList";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import NullmessungForm from "@/components/partners/NullmessungForm";
import ProviderSection from "@/components/partners/ProviderSection";
import RoleSwitcher, { type RoleView } from "@/components/partners/RoleSwitcher";
import { PageIntro } from "@/components/Subpage";
import { BarChart } from "@/components/sov/Charts";
import { clusterPath, partnerStatusLabel, publishedClusterBySlug, publishedClusters } from "@/lib/clusters";
import { fmtInt, fmtPct, measurementFor } from "@/lib/measurement";
import { BOOKING_URL } from "@/lib/partner-config";
import { DISCLOSURE, NOT_PROMISED } from "@/lib/partner-copy";
import { providerFaqs, providerSectionFor } from "@/lib/provider-section";
import { FACHPARTNER_PATH, sponsoringPakete } from "@/lib/partners";
import { site } from "@/lib/site";
import { reportBySlug, reportPath } from "@/lib/sov";

// Fachpartner-Seite je Cluster: nur veröffentlichte Cluster (Entwürfe → 404). Alle Zahlen stammen aus der Messdatei des Clusters.
type Props = { params: Promise<{ cluster: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return publishedClusters.map((c) => ({ cluster: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = publishedClusterBySlug((await params).cluster);
  if (!c) return {};
  const title = `Fachpartner ${c.name}: Werden Sie in KI-Antworten genannt? | ${site.domain}`;
  const description = `Kostenlose Nullmessung: Wie oft nennen ChatGPT, Perplexity und Gemini Ihr Unternehmen im Feld ${c.name}? Ein exklusiver bundesweiter Fachpartnerplatz.`;
  return { title: { absolute: title }, description, alternates: { canonical: clusterPath(c) }, openGraph: { url: clusterPath(c), title, description } };
}

const badgeClass = { frei: "rr-btn", reserviert: "rr-btn-secondary", vergeben: "rr-btn-secondary" } as const;

export default async function ClusterPage({ params }: Props) {
  const c = publishedClusterBySlug((await params).cluster);
  if (!c) notFound();
  const m = measurementFor(c.slug);
  const report = reportBySlug(c.reportSlug);
  const section = providerSectionFor(c.slug);
  const path = clusterPath(c);
  const pageUrl = `${site.url}${path}`;

  const hasProviders = m?.providerCount != null;
  const sample = m ? `in ${fmtInt(m.answerCount)} Antworten` : "";
  const outside = m ? (m.top10ShareCombined != null ? Math.round((100 - m.top10ShareCombined) * 10) / 10 : Math.round((100 - m.topDomains.reduce((s, d) => s + d.shareOfVoice, 0)) * 10) / 10) : null;
  const top = m?.providers[0];
  const tiles: [value: string, label: string, note: string][] = m
    ? [
        hasProviders ? [fmtInt(m.providerCount), "genannte Anbieter", sample] : [fmtInt(m.uniqueDomains), "zitierte Domains", sample],
        [fmtInt(m.totalCitations), "zitierte Quellen", sample],
        [fmtPct(outside), "Anteil außerhalb der zehn meistzitierten Domains", sample],
        top ? [top.mentions != null ? fmtInt(top.mentions) : fmtInt(top.citations), `${top.mentions != null ? "Nennungen" : "Zitationen"} von ${top.name} (Spitzenreiter unter den Anbietern)`, sample] : ["–", "Spitzenreiter", sample],
      ]
    : [];

  const roles: RoleView[] = [
    {
      role: "Geschäftsführung",
      problem: "Einkäufer fragen KI-Systeme, wen sie beauftragen sollen. Sie sehen nicht, ob Ihr Unternehmen dort vorkommt.",
      measurement: m ? `Messung vom ${m.dateLabel}: ${fmtInt(m.answerCount)} Antworten, ${fmtInt(m.totalCitations)} Quellenangaben. Wer dort nicht steht, wird in dieser Stichprobe nicht genannt.` : "Die Messung für dieses Feld liegt noch nicht vor.",
      benefit: ["Zahlen statt Vermutungen zur eigenen Sichtbarkeit", "Ein exklusiver, bundesweiter Platz im Feld", "Preis im Gespräch, nicht vorher"],
    },
    {
      role: "Marketing",
      problem: "Klassische Rankings zeigen nicht, was ChatGPT, Perplexity und Gemini antworten.",
      measurement: m ? `${fmtPct(m.outsideProviderShare)} der gewichteten Zitationen stammen nicht von Anbieter-Websites, sondern von Behörden, Portalen und Fachmedien.` : "Die Messung für dieses Feld liegt noch nicht vor.",
      benefit: ["Baseline vorab als Nullmessung", "Monatliche Messung als Verlauf", "Zugang zum KI-Report des Feldes"],
    },
    {
      role: "Vertrieb",
      problem: "Anfragen entstehen heute auch aus KI-Antworten. Ob Sie dort auftauchen, wissen Sie nicht.",
      measurement: m ? `In ${fmtInt(m.promptCount)} Kaufentscheidungsfragen wurden ${hasProviders ? `${fmtInt(m.providerCount)} Anbieter` : `${fmtInt(m.uniqueDomains)} Domains als Quellen`} genannt.` : "Die Messung für dieses Feld liegt noch nicht vor.",
      benefit: ["Befund für Ihr Unternehmen mit Wettbewerbsvergleich", "20-Minuten-Gespräch zum Ergebnis", "Keine Zusage zu Anfragezahlen"],
    },
  ];

  const faqs: [string, string][] = [
    ...(section ? providerFaqs(section) : []),
    ["Was kostet der Fachpartnerplatz?", `${c.priceLabel}. Den Preis nennen wir nach der Nullmessung im 20-Minuten-Gespräch.`],
    ["Ist der Platz exklusiv?", `Ja. Pro Feld gibt es genau einen bundesweiten Partner. Aktueller Stand: ${partnerStatusLabel[c.partnerStatus]}.`],
    ["Garantieren Sie Nennungen in KI-Systemen?", "Nein. Wir garantieren weder Nennungen in KI-Systemen noch eine Anzahl an Anfragen."],
  ];

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageIntro
        crumbs={[
          ["Fachpartner", FACHPARTNER_PATH],
          [c.name, path],
        ]}
        kicker={`FÜR ANBIETER · ${c.name.toUpperCase()}`}
        title={
          m
            ? `In ${fmtInt(m.promptCount)} Kaufentscheidungsfragen wurden ${hasProviders ? `${fmtInt(m.providerCount)} Anbieter` : `${fmtInt(m.uniqueDomains)} Domains als Quellen`} genannt. Vermutlich nicht Sie.`
            : `${c.name}: Werden Sie in KI-Antworten genannt?`
        }
      >
        {m && (
          <p>
            Messung vom {m.dateLabel}: {fmtInt(m.answerCount)} Antworten von {m.engines.join(", ")}.
          </p>
        )}
        <p className="rr-partner-actions">
          <a className="rr-btn" href="#nullmessung">
            Nullmessung für {c.name} anfordern
          </a>{" "}
          {report && (
            <Link className="rr-btn-secondary" href={reportPath(report)}>
              KI-Report ansehen
            </Link>
          )}
        </p>
        <p>
          <span className={badgeClass[c.partnerStatus]} style={{ pointerEvents: "none" }}>
            {partnerStatusLabel[c.partnerStatus]}
          </span>
          {c.partnerName && c.partnerStatus === "vergeben" ? ` · Partner: ${c.partnerName}` : ""}
        </p>
      </PageIntro>

      {m && (
        <section className="section page-width section-tight prose">
          <dl className="stat-tiles">
            {tiles.map(([value, label, note]) => (
              <div key={label} className="stat-tile">
                <dt>{label}</dt>
                <dd data-stat>{value}</dd>
                <dd className="muted-note">{note}</dd>
              </div>
            ))}
          </dl>
          <h2>Was die Messung zeigt</h2>
          <BarChart
            id="chart-anbieter"
            title="Genannte Anbieter"
            note={`Messung vom ${m.dateLabel}, ${fmtInt(m.answerCount)} Antworten. ${m.providers[0]?.mentions != null ? "Anzahl der Antworten mit Nennung." : "Anzahl der Zitationen."}`}
            rows={m.providers.map((p) => ({ label: p.name, value: p.mentions ?? p.citations ?? 0, display: fmtInt(p.mentions ?? p.citations) }))}
            table={{
              caption: "Genannte Anbieter laut Messung",
              head: ["Anbieter", "Nennungen", "Zitationen"],
              rows: m.providers.map((p) => [p.name, p.mentions == null ? "nicht erhoben" : fmtInt(p.mentions), fmtInt(p.citations)]),
            }}
          />
        </section>
      )}
      {!m && (
        <section className="section page-width section-tight prose">
          <p>Die Messung für dieses Feld liegt noch nicht vor. Sie können die Nullmessung dennoch anfordern; sie folgt nach Abschluss der Erhebung.</p>
        </section>
      )}

      {section && <ProviderSection data={section} pageUrl={pageUrl} />}

      <section className="section page-width section-tight">
        <h2>Was das für Ihre Rolle bedeutet</h2>
        <RoleSwitcher views={roles} />
      </section>

      <section className="section page-width section-tight prose">
        <h2>Messeauftritt oder Fachpartnerplatz?</h2>
        <div className="link-cards three">
          <div className="rr-benefit">
            <strong>Messeauftritt</strong>
            <span>Wenige Tage Sichtbarkeit; Kosten für Stand, Personal und Reise tragen Sie selbst.</span>
          </div>
          <div className="rr-benefit">
            <strong>Fachpartnerplatz {c.name}</strong>
            <span>Ein exklusiver Platz, 12 Monate, Preis {c.priceLabel}.</span>
          </div>
          <div className="rr-benefit">
            <strong>Studien-Sponsoring</strong>
            <ul>
              {sponsoringPakete.map((p) => (
                <li key={p.slug}>
                  {p.name}: {p.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Was enthalten ist</h2>
        <ul>
          <li>Der KI-Report zum Feld {c.name}</li>
          <li>Eine monatliche Messung mit Verlauf</li>
          <li>Vorab die Nullmessung für Ihr Unternehmen</li>
        </ul>
        <h2>Was wir nicht versprechen</h2>
        <ul>
          {NOT_PROMISED.map(([t, text]) => (
            <li key={t}>
              <strong>{t}:</strong> {text}
            </li>
          ))}
        </ul>
        <h2>So läuft es ab</h2>
        <ol>
          <li>
            <strong>01 Nullmessung:</strong> Sie fordern den Befund an und bestätigen Ihre E-Mail-Adresse.
          </li>
          <li>
            <strong>02 20-Minuten-Gespräch:</strong> Wir gehen das Ergebnis gemeinsam durch.{" "}
            {BOOKING_URL && (
              <a href={BOOKING_URL} rel="noopener">
                Termin buchen
              </a>
            )}
          </li>
          <li>
            <strong>03 Entscheidung:</strong> Erst danach nennen wir den Preis.
          </li>
        </ol>
        <p className="muted-note">{DISCLOSURE}</p>
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <FaqList faqs={faqs} />
      </section>

      <section id="nullmessung" className="section page-width section-tight">
        <h2>Kostenlose Nullmessung anfordern</h2>
        <NullmessungForm cluster={c.slug} clusterName={c.name} />
      </section>
    </>
  );
}
