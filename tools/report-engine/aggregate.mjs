// Aggregation einer Messung: gleiche Methode wie der KI-Report.
// Gewicht je Zitat = 1 / Wurzel(Position); Share of Voice = Gewicht einer Domain / Summe aller Gewichte.
// Reine Funktionen ohne Seiteneffekte (werden von measure.mjs benutzt).

export const PRODUCT_DOMAIN = "betreibermanager.de";
const r1 = (n) => Math.round(n * 10) / 10;
export const weight = (position) => 1 / Math.sqrt(position);

export function normDomain(input) {
  return String(input ?? "")
    .trim()
    .toLowerCase()
    .replace(/^[a-z]+:\/\//, "")
    .replace(/^www\./, "")
    .split(/[/?#]/)[0];
}

/** Anteil (in %) der gewichteten Zitationen, die auf `domain` entfallen; null, wenn es keine Zitationen gibt */
export function sovOf(answers, domain) {
  let total = 0;
  let own = 0;
  for (const a of answers) {
    for (const c of a.citations) {
      const w = weight(c.position);
      total += w;
      if (c.domain === domain) own += w;
    }
  }
  return total === 0 ? null : r1((own / total) * 100);
}

/**
 * @param {{cluster:string, month:string, dateLabel:string, temporalCoverage:string, engines:string[], promptCount:number,
 *   answers:{promptId:string, engine:string, intent:string, mentions:string[], citations:{url:string, domain:string, position:number}[]}[],
 *   brands:{name:string, domain?:string}[], partnerName:string|null, mock:boolean}} i
 */
export function buildMeasurement(i) {
  const { answers, brands } = i;
  const answerCount = answers.length;
  const weights = new Map();
  const counts = new Map();
  let total = 0;
  let totalCitations = 0;
  for (const a of answers) {
    for (const c of a.citations) {
      const w = weight(c.position);
      total += w;
      totalCitations++;
      weights.set(c.domain, (weights.get(c.domain) ?? 0) + w);
      counts.set(c.domain, (counts.get(c.domain) ?? 0) + 1);
    }
  }
  const topDomains = [...weights.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([domain, w]) => ({ domain, citations: counts.get(domain), shareOfVoice: r1((w / total) * 100) }));

  const brandDomains = new Set(brands.map((b) => normDomain(b.domain)).filter(Boolean));
  const mentionCount = (name, list = answers) => list.filter((a) => a.mentions.includes(name)).length;
  const providers = brands
    .map((b) => {
      const d = normDomain(b.domain);
      const mentions = mentionCount(b.name);
      return {
        name: b.name,
        domain: d || null,
        mentions,
        shareOfAnswers: answerCount ? r1((mentions / answerCount) * 100) : 0,
        citations: d ? counts.get(d) ?? 0 : 0,
      };
    })
    .filter((p) => p.mentions > 0 || p.citations > 0)
    .sort((a, b) => b.mentions - a.mentions || b.citations - a.citations || a.name.localeCompare(b.name, "de"));

  const byEngine = {};
  for (const engine of i.engines) {
    const list = answers.filter((a) => a.engine === engine);
    byEngine[engine] = {
      answers: list.length,
      providers: brands
        .map((b) => ({ name: b.name, mentions: mentionCount(b.name, list) }))
        .filter((p) => p.mentions > 0)
        .sort((a, b) => b.mentions - a.mentions)
        .slice(0, 5)
        .map((p) => ({ ...p, shareOfAnswers: r1((p.mentions / list.length) * 100) })),
    };
  }

  let brandWeight = 0;
  for (const [d, w] of weights) if (brandDomains.has(d)) brandWeight += w;

  const partner = i.partnerName;
  const anbieter = answers.filter((a) => a.intent === "anbietercheck");
  return {
    cluster: i.cluster,
    month: i.month,
    mock: i.mock,
    source: "measurement",
    granularity: "answers",
    dateLabel: i.dateLabel,
    temporalCoverage: i.temporalCoverage,
    engines: i.engines,
    promptCount: i.promptCount,
    answerCount,
    totalCitations,
    uniqueDomains: weights.size,
    providerCount: providers.length,
    rankingComplete: true,
    outsideProviderShare: total ? r1(100 - (brandWeight / total) * 100) : null,
    topDomains,
    providers,
    byEngine,
    scores: {
      sovScore: sovOf(answers, PRODUCT_DOMAIN),
      citedAnswers: answers.filter((a) => a.citations.some((c) => c.domain === PRODUCT_DOMAIN)).length,
      partnerMentions: partner ? mentionCount(partner) : null,
      anbietercheckSov: anbieter.length ? sovOf(anbieter, PRODUCT_DOMAIN) : null,
      anbietercheckAnswers: anbieter.length,
    },
    answers,
  };
}
