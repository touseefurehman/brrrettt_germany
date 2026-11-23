import type { Metadata } from "next";
import Link from "next/link";
import { clusters } from "@/lib/clusters";
import { fmtInt, fmtPct, measurementHistory } from "@/lib/measurement";
import { providerSectionLive } from "@/lib/provider-section";
import { getLeads, storeConfigured, type Lead } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Scores (Admin)", robots: { index: false, follow: false } };

const NOT_MEASURED = "noch nicht gemessen";
const NOT_COLLECTED = "nicht erhoben";

/** Nur gemessene oder protokollierte Werte; Lücken werden benannt, nie geschätzt */
function value(m: boolean, v: number | null | undefined, fmt: (n: number | null) => string) {
  if (!m) return NOT_MEASURED;
  return v == null ? NOT_COLLECTED : fmt(v);
}

export default async function Scores() {
  let leads: Lead[] = [];
  let leadError = "";
  try {
    if (!storeConfigured) throw new Error("DATABASE_URL fehlt");
    leads = await getLeads();
  } catch (e) {
    leadError = e instanceof Error ? e.message : "Fehler";
  }
  const month = new Date().toISOString().slice(0, 7);

  return (
    <main className="section page-width">
      <h1>Scores je Cluster</h1>
      <p><Link href="/admin/leads">Leads</Link> · <Link href="/admin/outbound">Outbound-Liste</Link></p>
      <p className="muted-note">
        Nur gemessene oder protokollierte Werte. „{NOT_COLLECTED}“ heißt: Die Messdatei enthält die dafür nötigen Einzelantworten nicht.
        {leadError && ` Lead-Speicher nicht erreichbar (${leadError}); Anfragen und Funnel fehlen.`}
      </p>
      <div className="table-wrap">
        <table className="data-table">
          <caption>Score 1 (Produkt: SoV betreibermanager.de) und Score 2 (Akquise: Partnerschaft)</caption>
          <thead>
            <tr>
              <th rowSpan={2} scope="col">Cluster</th>
              <th colSpan={7} scope="colgroup">Score 1 · SoV betreibermanager.de</th>
              <th colSpan={4} scope="colgroup">Score 2 · Akquise</th>
            </tr>
            <tr>
              {["Messdatum", "SoV aktuell", "Vormonat", "Änderung", "Antworten mit Zitat", "Partner-Nennungen", "Messmonat"].map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
              {["SoV auf Anbietercheck-Fragen", "Anbieter-Abschnitt live", `Nullmessung-Anfragen ${month}`, "Funnel: Anfrage → bestätigt → gebucht → Angebot → Partner"].map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clusters.map((c) => {
              const [cur, prev] = measurementHistory(c.slug);
              const m = !!cur;
              const delta = cur?.scores.sovScore != null && prev?.scores.sovScore != null ? cur.scores.sovScore - prev.scores.sovScore : null;
              const own = leads.filter((l) => l.cluster === c.slug && l.source === "form");
              const f = [
                own.length,
                own.filter((l) => l.confirmedAt).length,
                own.filter((l) => ["gebucht", "angebot", "partner"].includes(l.status)).length,
                own.filter((l) => ["angebot", "partner"].includes(l.status)).length,
                own.filter((l) => l.status === "partner").length,
              ];
              return (
                <tr key={c.slug}>
                  <th scope="row">{c.name}</th>
                  <td>{cur ? cur.dateLabel : NOT_MEASURED}</td>
                  <td>{value(m, cur?.scores.sovScore, fmtPct)}</td>
                  <td>{!m ? NOT_MEASURED : prev ? value(true, prev.scores.sovScore, fmtPct) : "kein Vormonat"}</td>
                  <td>{!m ? NOT_MEASURED : delta == null ? "–" : `${delta > 0 ? "+" : ""}${delta.toFixed(1).replace(".", ",")} Pkt.`}</td>
                  <td>{value(m, cur?.scores.citedAnswers, fmtInt)}</td>
                  <td>{!m ? NOT_MEASURED : c.partnerName ? value(true, cur.scores.partnerMentions, fmtInt) : "kein Partner live"}</td>
                  <td>{cur?.month ?? NOT_MEASURED}</td>
                  <td>{value(m, cur?.scores.anbietercheckSov, fmtPct)}</td>
                  <td>{providerSectionLive(c.slug) ? "ja" : "nein"}</td>
                  <td>{leadError ? "–" : c.status === "published" ? fmtInt(own.filter((l) => l.createdAt.startsWith(month)).length) : "–"}</td>
                  <td>{leadError || c.status !== "published" ? "–" : f.join(" → ")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
