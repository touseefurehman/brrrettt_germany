import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/Subpage";
import { clusterBySlug } from "@/lib/clusters";
import { fmtInt, fmtPct } from "@/lib/measurement";
import type { Findings } from "@/lib/nullmessung";
import { BOOKING_URL } from "@/lib/partner-config";
import { MEANING, NOT_PROMISED } from "@/lib/partner-copy";
import { site } from "@/lib/site";
import { leadBy } from "@/lib/store";

// Persönlicher Befund. Nicht indexierbar, nicht in der Sitemap, nur über den zufälligen Token erreichbar (kein Name in der URL).
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Ihr Befund | betreibermanager.de" },
  robots: { index: false, follow: false, nocache: true },
};

export default async function Befund({ params }: { params: Promise<{ token: string }> }) {
  const token = (await params).token;
  // Ohne Datenbank oder bei Datenbankfehler: 404 statt 500
  const lead = await leadBy("token", token).catch(() => null);
  const f = lead?.findingsJson as Findings | null | undefined;
  // Befund nur, wenn er berechnet ist (Warteliste hat noch keinen). Der Link wird von Henryk persönlich aus /admin/leads versendet.
  if (!lead || !f || lead.status === "warteliste") notFound();
  const cluster = clusterBySlug(lead.cluster);
  const agg = f.granularity === "aggregate";
  const book = BOOKING_URL || `mailto:${site.email}?subject=Gespr%C3%A4ch%20zum%20Befund`;

  return (
    <>
      <PageIntro crumbs={[["Befund", "#"]]} kicker={`NULLMESSUNG · ${cluster?.name ?? lead.cluster}`.toUpperCase()} title={`Befund für ${f.company}`}>
        <p>
          Messung vom {f.dateLabel} · {fmtInt(f.answerCount)} Antworten auf {fmtInt(f.promptCount)} Fragen von {f.engines.join(", ")}.
        </p>
      </PageIntro>

      <section className="section page-width section-tight prose">
        <h2>{f.named ? "Ihr Unternehmen kommt in der Messung vor" : "Ihr Unternehmen wurde in der Messung nicht genannt"}</h2>
        <dl className="stat-tiles">
          <div className="stat-tile">
            <dt>Antworten mit Nennung</dt>
            <dd data-stat>{f.mentions == null ? "nicht erhoben" : `${fmtInt(f.mentions)} (${fmtPct(f.mentionShare)})`}</dd>
          </div>
          <div className="stat-tile">
            <dt>Zitationen Ihrer Domain</dt>
            <dd data-stat>{fmtInt(f.citations)}</dd>
          </div>
          <div className="stat-tile">
            <dt>Meistgenannter Anbieter</dt>
            <dd data-stat>{f.topProviderMentions == null ? "nicht erhoben" : `${fmtInt(f.topProviderMentions)} Antworten`}</dd>
          </div>
        </dl>
        {agg && (
          <p className="muted-note">
            Methode: Abgleich Ihrer Domain und Ihres Firmennamens mit der Rangliste der Messung {f.dateLabel}. Diese Messung liegt bisher nur
            als Auswertung der meistzitierten Quellen vor, nicht als Einzelantworten; „nicht genannt“ bedeutet hier: nicht in dieser
            Rangliste.
          </p>
        )}
        {!agg && f.enginesWithoutMention.length > 0 && (
          <p>Keine Nennung bei: {f.enginesWithoutMention.join(", ")}.</p>
        )}
        {f.citedPages.length > 0 && (
          <>
            <h3>Zitierte Seiten Ihrer Domain</h3>
            <ul>
              {f.citedPages.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="section page-width section-tight prose">
        <h2>Wen KI-Systeme stattdessen nennen</h2>
        <ol>
          {f.competitors.map((c) => (
            <li key={c.name}>
              {c.name}
              {c.mentions != null && ` · ${fmtInt(c.mentions)} Nennungen`}
              {c.citations != null && ` · ${fmtInt(c.citations)} Zitationen`}
            </li>
          ))}
        </ol>
        <h2>Die fünf meistzitierten Quellen</h2>
        <ol>
          {f.topSources.map((s) => (
            <li key={s.domain}>
              {s.domain} · {fmtInt(s.citations)} Zitationen · {fmtPct(s.shareOfVoice)} Share of Voice
            </li>
          ))}
        </ol>
        {f.outsideProviderShare != null && (
          <p>
            {fmtPct(f.outsideProviderShare)} der gewichteten Zitationen stammen nicht von Anbieter-Websites, sondern von Behörden,
            Verbänden, Portalen und Fachmedien.
          </p>
        )}
      </section>

      <section className="section page-width section-tight prose">
        <h2>Was dieser Befund bedeutet – und was nicht</h2>
        <p>{MEANING}</p>
        <ul>
          {NOT_PROMISED.map(([t, text]) => (
            <li key={t}>
              <strong>{t}:</strong> {text}
            </li>
          ))}
        </ul>
        <p className="rr-partner-actions">
          <a className="rr-btn" href={book} rel="noopener">
            20 Minuten Gespräch über das Ergebnis buchen
          </a>
        </p>
        <p className="muted-note">
          Unstimmigkeiten oder Korrekturen: <Link href="/kontakt">Kontakt</Link>.
        </p>
      </section>
    </>
  );
}
