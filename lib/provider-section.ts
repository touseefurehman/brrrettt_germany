import { clusterBySlug, publishedClusterBySlug, type Cluster } from "@/lib/clusters";
import { fmtInt, fmtPct, measurementFor, type Measurement } from "@/lib/measurement";
import { site } from "@/lib/site";

// Abschnitt „Für Anbieter: Was Sie aus diesen Zahlen lesen können“ auf KI-Report und Cluster-Seite.
// Alle Zahlen stammen wörtlich aus der Messdatei des Clusters.

export const PROVIDER_HEADING = "Für Anbieter: Was Sie aus diesen Zahlen lesen können";

export type ProviderSectionData = { cluster: Cluster; m: Measurement; formHref: string };

/** Daten für den Abschnitt; null, wenn der Cluster nicht veröffentlicht ist oder keine echte Messung vorliegt */
export function providerSectionFor(clusterSlug: string): ProviderSectionData | null {
  const cluster = publishedClusterBySlug(clusterSlug);
  const m = cluster && measurementFor(cluster.slug);
  if (!cluster || !m || m.providers.length === 0) return null;
  return { cluster, m, formHref: `/fachpartner/${cluster.slug}#nullmessung` };
}

export const providerSectionLive = (clusterSlug: string) => providerSectionFor(clusterSlug) !== null;

export function shortAnswer({ cluster, m }: ProviderSectionData): string {
  const top = m.providers[0];
  const base = `${m.engines.join(", ")} haben im Messzeitraum ${m.dateLabel} in ${fmtInt(m.answerCount)} Antworten auf ${fmtInt(m.promptCount)} Kaufentscheidungsfragen zu ${cluster.topicLabel} ${fmtInt(m.totalCitations)} Quellen von ${fmtInt(m.uniqueDomains)} Domains zitiert.`;
  if (m.granularity === "aggregate") {
    return `${base} Die Messdatei weist ${m.providers.length} Anbieter-Domains unter den meistzitierten Quellen aus; die meistzitierte ist ${top.name} mit ${fmtInt(top.citations)} Zitationen. Ein Anbieter, der dort nicht steht, wurde in den ausgewerteten Ranglisten nicht genannt.`;
  }
  return `${base} Genannt wurden ${m.providers.length} Anbieter; am häufigsten ${top.name} (${fmtInt(top.mentions)} Antworten, ${fmtPct(top.shareOfAnswers)}).`;
}

export const rankingNote = (m: Measurement) =>
  `Die Rangliste gibt wieder, was KI-Systeme am ${m.dateLabel} geantwortet haben. Sie ist keine Bewertung der Leistung.`;

/** Fragen für FAQPage (nur Aussagen, die die Messdatei trägt) */
export function providerFaqs(d: ProviderSectionData): [string, string][] {
  const { cluster, m } = d;
  const faqs: [string, string][] = [
    [
      `Welche Anbieter für ${cluster.topicLabel} nennen KI-Systeme?`,
      `In der Messung vom ${m.dateLabel} (${fmtInt(m.answerCount)} Antworten) ${m.rankingComplete ? `wurden ${m.providers.length} Anbieter genannt` : `stehen ${m.providers.length} Anbieter-Domains in der ausgewerteten Rangliste`}; am vorderen Ende ${m.providers.slice(0, 3).map((p) => p.name).join(", ")}.`,
    ],
  ];
  for (const [engine, e] of Object.entries(m.byEngine)) {
    if (e.providers.length === 0) continue;
    faqs.push([
      `Welche Anbieter für ${cluster.topicLabel} nennt ${engine}?`,
      `${engine} nannte in ${fmtInt(e.answers)} Antworten am häufigsten: ${e.providers.map((p) => p.name).join(", ")} (Messung ${m.dateLabel}).`,
    ]);
  }
  faqs.push([
    "Was sagt die Rangliste über die Leistung eines Anbieters?",
    "Nichts. Sie zeigt nur, was KI-Systeme am Messtag geantwortet haben, und ist keine Bewertung der Leistung.",
  ]);
  return faqs;
}

export function providerDataset(d: ProviderSectionData, pageUrl: string) {
  const { cluster, m } = d;
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Rangliste der in KI-Antworten genannten Anbieter: ${cluster.topicLabel}`,
    description: `Anbieter, die ${m.engines.join(", ")} am ${m.dateLabel} in ${m.answerCount} Antworten zu ${cluster.topicLabel} nannten bzw. zitierten. ${m.rankingNote ?? ""}`.trim(),
    url: pageUrl,
    inLanguage: "de-DE",
    isAccessibleForFree: true,
    temporalCoverage: m.temporalCoverage,
    creator: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.domain, url: `${site.url}/` },
    measurementTechnique: "Abfrage von KI-Systemen mit festen Kaufentscheidungsfragen; Auswertung der genannten und zitierten Quellen",
    variableMeasured: ["Nennungen", "Anteil an Antworten", "Zitationen"],
  };
}

export { clusterBySlug };
