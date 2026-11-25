import type { Metadata } from "next";
import Link from "next/link";
import { applicationStatusLabel, applicationStatuses, listApplications, queueAvailable, type PartnerApplication } from "@/lib/partner-applications";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Prüfpartner-Bewerbungen (Admin)", robots: { index: false, follow: false } };

const fmt = (iso: string) => new Date(iso).toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

/** Prüf-Warteschlange der Bewerbungen von Prüfbetrieben (Basic Auth über middleware.ts). Registrierung ≠ Freigabe. */
export default async function AdminPartner({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const sp = await searchParams;
  let list: PartnerApplication[] = [];
  let error = "";
  try {
    if (!queueAvailable) throw new Error("DATABASE_URL fehlt – Bewerbungen gehen über den Kontaktformular-Weg an das Postfach.");
    list = await listApplications();
  } catch (e) {
    error = e instanceof Error ? e.message : "Fehler";
  }
  const shown = list.filter((a) => !sp.status || a.status === sp.status);
  return (
    <main className="section page-width">
      <h1>Prüfpartner-Bewerbungen</h1>
      <p>
        <Link href="/admin/leads">Leads</Link> · Filter:{" "}
        <Link href="/admin/partner">alle ({list.length})</Link>
        {applicationStatuses.map((s) => (
          <span key={s}>
            {" · "}
            <Link href={`/admin/partner?status=${s}`}>
              {applicationStatusLabel[s]} ({list.filter((a) => a.status === s).length})
            </Link>
          </span>
        ))}
      </p>
      <p className="muted-note">Eine Registrierung ist keine Freigabe: Qualifikationen und Nachweise werden vor jeder Beauftragung geprüft.</p>
      {error && <p role="alert">Speicher nicht erreichbar: {error}</p>}
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Bewerbungen, waagerecht scrollbar">
        <table className="data-table">
          <thead>
            <tr>
              {["Eingang", "Quelle", "Unternehmen", "Kontakt", "Gewerke", "Region", "Qualifikation / Nachweise", "Kapazität", "Status"].map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((a) => (
              <tr key={a.id}>
                <td>{fmt(a.createdAt)}</td>
                <td>{a.sourcePage}</td>
                <th scope="row">{a.company}</th>
                <td>
                  {a.contact}
                  <br />
                  <a href={`mailto:${a.email}`}>{a.email}</a>
                </td>
                <td>{a.trades.join(", ")}</td>
                <td>{a.region}</td>
                <td>
                  {a.qualifications}
                  {a.message && (
                    <>
                      <br />
                      <em>{a.message}</em>
                    </>
                  )}
                </td>
                <td>{a.capacity}</td>
                <td>
                  <form action="/admin/partner/status" method="post">
                    <input type="hidden" name="id" value={a.id} />
                    <select name="status" defaultValue={a.status}>
                      {applicationStatuses.map((s) => (
                        <option key={s} value={s}>{applicationStatusLabel[s]}</option>
                      ))}
                    </select>{" "}
                    <button type="submit">Speichern</button>
                  </form>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={9}>Keine Bewerbungen.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
