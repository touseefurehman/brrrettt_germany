import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { fmtInt, fmtPct } from "@/lib/measurement";
import { PROVIDER_HEADING, providerDataset, rankingNote, shortAnswer, type ProviderSectionData } from "@/lib/provider-section";
import { site } from "@/lib/site";

/** „Für Anbieter: Was Sie aus diesen Zahlen lesen können“ – vollständige Rangliste aus der Messdatei (kein Top-10-Ausschnitt) */
export default function ProviderSection({ data, pageUrl }: { data: ProviderSectionData; pageUrl: string }) {
  const { cluster, m, formHref } = data;
  const na = <span title="In dieser Messdatei nicht erhoben">nicht erhoben</span>;
  return (
    <section className="section page-width section-tight prose" id="fuer-anbieter">
      <JsonLd data={providerDataset(data, pageUrl)} />
      <h2>{PROVIDER_HEADING}</h2>
      <div className="short-answer">
        <span className="short-answer-label">Kurzantwort</span>
        <p>{shortAnswer(data)}</p>
      </div>

      <h3>Welche Anbieter für {cluster.topicLabel} nennen KI-Systeme?</h3>
      <p className="muted-note">
        Messung vom {m.dateLabel} · Stichprobe: {fmtInt(m.answerCount)} Antworten auf {fmtInt(m.promptCount)} Fragen ({m.engines.join(", ")}).
        {m.rankingComplete ? ` Vollständige Liste: ${fmtInt(m.providers.length)} Anbieter.` : ""}
      </p>
      <div className="table-wrap">
        <table className="data-table">
          <caption>Rangliste der genannten Anbieter, Messung {m.dateLabel}</caption>
          <thead>
            <tr>
              <th scope="col">Rang</th>
              <th scope="col">Anbieter</th>
              <th scope="col">Nennungen</th>
              <th scope="col">Anteil an Antworten</th>
              <th scope="col">Zitationen</th>
            </tr>
          </thead>
          <tbody>
            {m.providers.map((p, i) => (
              <tr key={p.name}>
                <td>{i + 1}</td>
                <th scope="row">{p.name}</th>
                <td>{p.mentions == null ? na : fmtInt(p.mentions)}</td>
                <td>{p.shareOfAnswers == null ? na : fmtPct(p.shareOfAnswers)}</td>
                <td>{fmtInt(p.citations)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!m.rankingComplete && m.rankingNote && <p className="muted-note">{m.rankingNote}</p>}

      {Object.entries(m.byEngine)
        .filter(([, e]) => e.providers.length > 0)
        .map(([engine, e]) => (
          <div key={engine}>
            <h3>Welche Anbieter für {cluster.topicLabel} nennt {engine}?</h3>
            <p className="muted-note">{fmtInt(e.answers)} Antworten von {engine}, Messung {m.dateLabel}.</p>
            <ol>
              {e.providers.map((p) => (
                <li key={p.name}>
                  {p.name} · {fmtInt(p.citations ?? p.mentions)} {p.citations != null ? "Zitationen" : "Nennungen"}
                </li>
              ))}
            </ol>
          </div>
        ))}

      <p>
        <strong>
          Ihr Unternehmen fehlt? <Link href={formHref}>Kostenlose Nullmessung anfordern</Link>
        </strong>
      </p>
      <p className="muted-note">
        {rankingNote(m)} Korrekturen melden Sie bitte über das <Link href="/kontakt">Kontaktformular</Link>. Quelle: {site.domain}.
      </p>
    </section>
  );
}
