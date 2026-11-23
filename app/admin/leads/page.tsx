import type { Metadata } from "next";
import Link from "next/link";
import { clusters, clusterBySlug } from "@/lib/clusters";
import { getLeads, leadStatuses, statusLabel, storeConfigured, type Lead } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Leads (Admin)", robots: { index: false, follow: false } };

type SP = { cluster?: string; status?: string };

const funnel = (list: Lead[]) => {
  const form = list.filter((l) => l.source === "form");
  const n = (f: (l: Lead) => boolean) => form.filter(f).length;
  return [
    form.length,
    n((l) => !!l.confirmedAt),
    n((l) => ["gebucht", "angebot", "partner"].includes(l.status)),
    n((l) => ["angebot", "partner"].includes(l.status)),
    n((l) => l.status === "partner"),
  ];
};

export default async function AdminLeads({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  let all: Lead[] = [];
  let error = "";
  try {
    if (!storeConfigured) throw new Error("DATABASE_URL fehlt");
    all = await getLeads();
  } catch (e) {
    error = e instanceof Error ? e.message : "Fehler";
  }
  const list = all.filter((l) => (!sp.cluster || l.cluster === sp.cluster) && (!sp.status || l.status === sp.status));
  const qs = new URLSearchParams(Object.entries(sp).filter(([, v]) => v) as [string, string][]).toString();

  return (
    <main className="section page-width">
      <h1>Leads</h1>
      <p>
        <Link href="/admin/scores">Scores</Link> · <Link href="/admin/outbound">Outbound-Liste</Link> ·{" "}
        <a href={`/admin/leads/export${qs ? `?${qs}` : ""}`}>CSV-Export</a>
      </p>
      {error && <p role="alert">Lead-Speicher nicht erreichbar: {error}</p>}

      <h2>Funnel je Cluster</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Cluster</th>
              {["Anfragen", "bestätigt", "Gespräch gebucht", "Angebot", "Partner"].map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clusters.map((c) => (
              <tr key={c.slug}>
                <th scope="row">{c.name}</th>
                {funnel(all.filter((l) => l.cluster === c.slug)).map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Alle Anfragen</h2>
      <form method="get" className="rr-form">
        <label>
          Cluster{" "}
          <select name="cluster" defaultValue={sp.cluster ?? ""}>
            <option value="">alle</option>
            {clusters.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>{" "}
        <label>
          Status{" "}
          <select name="status" defaultValue={sp.status ?? ""}>
            <option value="">alle</option>
            {leadStatuses.map((s) => (
              <option key={s} value={s}>{statusLabel[s]}</option>
            ))}
          </select>
        </label>{" "}
        <button className="rr-btn-secondary" type="submit">Filtern</button>
      </form>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {["Datum", "Cluster", "Firma", "Kontakt", "Rolle", "Status", "Mail-Schritt", "Befund"].map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((l) => (
              <tr key={l.id}>
                <td>{l.createdAt.slice(0, 10)}</td>
                <td>{clusterBySlug(l.cluster)?.name ?? l.cluster}</td>
                <td>{l.company}<br />{l.domain}</td>
                <td>{l.name}<br />{l.email || "–"}</td>
                <td>{l.role}</td>
                <td>
                  <form method="post" action="/admin/leads/status">
                    <input type="hidden" name="id" value={l.id} />
                    <select name="status" defaultValue={l.status} aria-label={`Status ${l.company}`}>
                      {leadStatuses.map((s) => (
                        <option key={s} value={s}>{statusLabel[s]}</option>
                      ))}
                    </select>{" "}
                    <button type="submit">Speichern</button>
                  </form>
                </td>
                <td>{l.lastEmailStep == null ? "–" : `Tag ${l.lastEmailStep}`}</td>
                <td>{l.findingsJson ? <a href={`/befund/${l.token}`}>öffnen</a> : "–"}</td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={8}>Keine Einträge.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
