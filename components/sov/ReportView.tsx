import type { ReactNode } from "react";
import Link from "next/link";
import FaqList from "../FaqList";
import JsonLd, { faqSchema } from "../JsonLd";
import { PageIntro } from "../Subpage";
import Markdown from "../rank-rent/Markdown";
import { BarChart, SmallMultiples } from "./Charts";
import CiteBox from "./CiteBox";
import { HUB_NAME, HUB_PATH } from "@/lib/elektropruefung";
import { formatDate, PARTNER_PAGE_PATH } from "@/lib/rank-rent";
import { site } from "@/lib/site";
import { dec, int, pct, REPORT_BASE, REPORT_BASE_NAME, reportPath, sourceTypeOrder, type Report } from "@/lib/sov";

const orgId = `${site.url}/#organization`;

export function reportSchemas(r: Report) {
  const url = `${site.url}${reportPath(r)}`;
  const m = r.methodology;
  return [
    {
      "@context": "https://schema.org",
      "@type": ["Article", "Report"],
      headline: r.title,
      alternativeHeadline: r.shortTitle,
      description: r.metaDescription,
      abstract: r.shortAnswer,
      url,
      mainEntityOfPage: url,
      datePublished: r.datePublished,
      dateModified: r.datePublished,
      inLanguage: "de-DE",
      image: `${url}/opengraph-image`,
      author: { "@type": "Organization", name: `Redaktion ${site.domain}`, url: `${site.url}/` },
      publisher: { "@id": orgId },
      isPartOf: { "@id": `${site.url}/#website` },
      about: ["DGUV Vorschrift 3", "Elektroprüfung", "Share of Voice", "KI-Suche"].map((name) => ({ "@type": "Thing", name })),
      articleBody: [r.shortAnswer, ...r.findings.map((f) => `${f.heading}. ${f.content}`)].join("\n\n"),
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: r.shortTitle,
      description: `${r.shortAnswer} Datengrundlage: ${int(m.prompts)} Fragen, ${int(m.runs)} KI-Antworten, ${int(m.citations)} Quellenangaben, ${int(m.uniqueDomains)} Domains (${m.engines.join(", ")}).`,
      url,
      inLanguage: "de-DE",
      isAccessibleForFree: true,
      temporalCoverage: r.temporalCoverage,
      datePublished: r.datePublished,
      creator: { "@type": "Organization", "@id": orgId, name: site.domain, url: `${site.url}/` },
      measurementTechnique: m.scoring,
      variableMeasured: "Share of Voice in KI-Antworten",
      keywords: ["DGUV V3", "Elektroprüfung", "KI-Suche", "Share of Voice", ...m.engines],
    },
    faqSchema(r.faq.map((f): [string, string] => [f.question, f.answer])),
  ];
}

function StatTiles({ r }: { r: Report }) {
  const tiles: [string, string][] = [
    [int(r.methodology.citations), "KI-Zitationen"],
    [int(r.methodology.runs), "KI-Antworten"],
    [int(r.methodology.uniqueDomains), "zitierte Domains"],
    [pct(r.keyFindings.maxSingleShare), "höchster Share of Voice"],
  ];
  return (
    <dl className="stat-tiles">
      {tiles.map(([value, label]) => (
        <div key={label} className="stat-tile">
          <dt>{label}</dt>
          <dd data-stat>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Diagramme zu den Befunden 1–4 (Reihenfolge wie `findings`) */
function charts(r: Report): ReactNode[] {
  const engines = Object.entries(r.byEngine);
  const types = sourceTypeOrder(r);
  const top10 = r.keyFindings.top10;
  const overall = Object.entries(r.keyFindings.sourceTypesOverall);
  return [
    <BarChart
      key="top10"
      id="chart-top10"
      title="Die 10 meistzitierten Domains nach Share of Voice"
      note={`Zusammen ${pct(r.keyFindings.top10ShareCombined)} aller gewichteten Zitationen.`}
      rows={top10.map((d) => ({ label: d.domain, value: d.shareOfVoice, display: pct(d.shareOfVoice) }))}
      table={{
        caption: "Top 10 Domains: Share of Voice, Anzahl Zitationen und Quellentyp",
        head: ["Domain", "Share of Voice", "Zitationen", "Quellentyp"],
        rows: top10.map((d) => [d.domain, pct(d.shareOfVoice), int(d.citations), d.type]),
      }}
    />,
    <BarChart
      key="types"
      id="chart-types"
      title="Zitationsanteil nach Quellentyp (alle KI-Systeme)"
      note="Gewichteter Anteil (Share of Voice) je Quellentyp, Summe 100 %."
      labelWidth="wide"
      scaleMax={100}
      rows={overall.map(([t, v]) => ({ label: t, value: v, display: pct(v) }))}
      table={{
        caption: "Share of Voice nach Quellentyp und Anteil an Erstnennungen",
        head: ["Quellentyp", "Share of Voice", "Anteil an Erstnennungen"],
        rows: overall.map(([t, v]) => [
          t,
          pct(v),
          r.keyFindings.firstPositionByType[t] !== undefined ? pct(r.keyFindings.firstPositionByType[t]) : "–",
        ]),
      }}
    />,
    <BarChart
      key="avg"
      id="chart-avg"
      title="Durchschnittliche Zahl der Quellen pro Antwort"
      rows={engines.map(([name, e]) => ({ label: name, value: e.avgSourcesPerAnswer, display: dec(e.avgSourcesPerAnswer) }))}
      table={{
        caption: "Antworten, Zitationen und Quellen pro Antwort je KI-System",
        head: ["KI-System", "Antworten", "Zitationen", "Quellen pro Antwort"],
        rows: engines.map(([name, e]) => [name, int(e.runs), int(e.citations), dec(e.avgSourcesPerAnswer)]),
      }}
    />,
    <SmallMultiples
      key="engines"
      id="chart-engines"
      title="Zitationsanteil nach Quellentyp je KI-System"
      note="Gemeinsame Skala 0–100 %. Ein Strich bedeutet: Quellentyp wurde von diesem System nicht zitiert."
      scaleMax={100}
      groups={engines.map(([name, e]) => ({
        name,
        rows: types
          .filter((t) => e.sourceTypes[t] !== undefined)
          .map((t) => ({ label: t, value: e.sourceTypes[t], display: pct(e.sourceTypes[t]) })),
      }))}
      table={{
        caption: "Share of Voice nach Quellentyp und KI-System",
        head: ["Quellentyp", ...engines.map(([name]) => name)],
        rows: types.map((t) => [t, ...engines.map(([, e]) => (e.sourceTypes[t] !== undefined ? pct(e.sourceTypes[t]) : "–"))]),
      }}
    />,
  ];
}

export default function ReportView({ r }: { r: Report }) {
  const path = reportPath(r);
  const url = `${site.url}${path}`;
  const m = r.methodology;
  const chartList = charts(r);

  return (
    <>
      {reportSchemas(r).map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}

      <PageIntro
        crumbs={[
          [REPORT_BASE_NAME, REPORT_BASE],
          [r.shortTitle, path],
        ]}
        kicker="REPORT · KI-SICHTBARKEIT"
        title={r.title}
      >
        <div className="report-meta">
          Messzeitraum {r.period} · Redaktion {site.domain}
        </div>
      </PageIntro>

      <section className="section page-width section-tight">
        <div className="short-answer">
          <span className="short-answer-label">Kurzantwort</span>
          <p>{r.shortAnswer}</p>
        </div>
      </section>

      <section className="section page-width section-tight" aria-label="Kennzahlen">
        <StatTiles r={r} />
      </section>

      <section className="section page-width section-tight prose report-findings">
        {r.findings.map((f, i) => (
          <div key={f.heading}>
            <h2>{f.heading}</h2>
            <Markdown source={f.content} />
            {chartList[i]}
          </div>
        ))}
        {chartList.slice(r.findings.length)}
      </section>

      <section className="section page-width section-tight prose">
        <h2>Was Prüfdienstleister daraus lernen können</h2>
        <ul>
          {r.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Methodik</h2>
        <dl className="method-list">
          <dt>KI-Systeme</dt>
          <dd>{m.engines.join(", ")}</dd>
          <dt>Datengrundlage</dt>
          <dd>
            {int(m.prompts)} Fragen, {int(m.runs)} KI-Antworten, {int(m.citations)} Quellenangaben von {int(m.uniqueDomains)}{" "}
            Domains; {int(r.keyFindings.domainsCitedOnce)} Domains wurden nur einmal genannt.
          </dd>
          <dt>Fragen</dt>
          <dd>{m.promptSource}</dd>
          <dt>Gewichtung</dt>
          <dd>{m.scoring}</dd>
          <dt>Grenzen</dt>
          <dd>{m.limitations}</dd>
        </dl>
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <FaqList faqs={r.faq.map((f): [string, string] => [f.question, f.answer])} />
      </section>

      <section className="section page-width section-tight">
        <CiteBox text={`Quelle: ${site.domain}, ${r.shortTitle}`} url={url} />
      </section>

      <section className="section page-width section-tight">
        <aside className="partner-box">
          <strong>Sie sind Prüfdienstleister? So werden Sie in KI-Antworten sichtbar</strong>
          <p>
            Auf {site.domain} vergeben wir je Prüfbereich und Objekttyp einen exklusiven Partnerplatz.{" "}
            <Link href={PARTNER_PAGE_PATH}>Mehr für Prüfpartner</Link>
          </p>
          <p>
            Alle Fragen und Antworten zur Elektroprüfung: <Link href={HUB_PATH}>{HUB_NAME}</Link>
          </p>
        </aside>
      </section>

      <section className="section page-width section-tight">
        <aside className="author-box">
          <strong>Redaktion {site.domain}</strong>
          <span>
            Veröffentlicht: <time dateTime={r.datePublished}>{formatDate(r.datePublished)}</time>
          </span>
        </aside>
      </section>
    </>
  );
}
