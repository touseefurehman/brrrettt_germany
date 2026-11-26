import type { Metadata } from "next";
import Link from "next/link";
import { partnerFormLive } from "@/lib/partner";
import { applyFilter, countBy, pickFilter, toQuery } from "@/lib/partner-admin";
import { deletionLog, listApplications, queueAvailable, type ApplicationEvent, type PartnerApplication } from "@/lib/partner-applications";
import { applicationStatusLabel, applicationStatuses, CATEGORIES, REGIONS, SOURCE_PAGES, type ApplicationStatus } from "@/lib/partner-options";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Prüfpartner-Bewerbungen (Admin)", robots: { index: false, follow: false } };

const fmt = (iso: string) => new Date(iso).toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

type SP = Promise<Record<string, string | string[] | undefined>>;

/** Prüf-Warteschlange der Bewerbungen von Prüfbetrieben (Basic Auth über middleware.ts). Registrierung ≠ Freigabe. */
export default async function AdminPartner({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const f = pickFilter(sp);
  let all: PartnerApplication[] = [];
  let deletions: ApplicationEvent[] = [];
  let error = "";
  try {
    if (queueAvailable) {
      all = await listApplications();
      deletions = await deletionLog();
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Fehler";
  }
  const shown = applyFilter(all, f);
  const qs = toQuery(f);
  const utmSources = [...new Set(all.map((a) => a.utmSource || "(keine)"))].sort();
  const counter = (title: string, rows: [string, number][]) => (
    <div>
      <strong>{title}</strong>
      <ul>
        {rows.map(([k, n]) => (
          <li key={k}>
            {k}: {n}
          </li>
        ))}
        {rows.length === 0 && <li>–</li>}
      </ul>
    </div>
  );

  return (
    <main className="section page-width">
      <h1>Prüfpartner-Bewerbungen</h1>
      <p>
        <Link href="/admin/leads">Leads</Link> · <a href={`/admin/partner/export${qs ? `?${qs}` : ""}`}>CSV-Export (aktueller Filter)</a>
      </p>
      <p className="muted-note">
        Eine Registrierung ist keine Freigabe: Qualifikationen sind Selbstauskunft und werden vor jeder Beauftragung geprüft. „Aktiv“ nur über
        „Freigeben“ in der Detailansicht. Formular: {partnerFormLive ? "freigeschaltet" : "aus (PARTNER_FORM_ENABLED / NEXT_PUBLIC_WEB3FORMS_PARTNER_KEY)"}.
      </p>
      {!queueAvailable && (
        <p role="alert">
          <strong>DATABASE_URL fehlt:</strong> Bewerbungen werden nicht gespeichert und gehen nur per Web3Forms ins Postfach. Freitexte
          (weitere Qualifikationen, Nachricht) liegen dann nicht vor; Statusverwaltung, Löschfristen und Export sind nicht verfügbar.
        </p>
      )}
      {error && <p role="alert">Speicher nicht erreichbar: {error}</p>}

      <h2>Übersicht</h2>
      <div className="link-cards three">
        {counter("Status", applicationStatuses.map((s): [string, number] => [applicationStatusLabel[s], all.filter((a) => a.status === s).length]))}
        {counter("Kategorie", countBy(all, (a) => a.categories))}
        {counter("Quellseite", countBy(all, (a) => [a.sourcePage]))}
      </div>

      <h2>Bewerbungen</h2>
      <form method="get" className="rr-form">
        <div className="form-row">
          <label>
            Suche
            <input name="q" type="search" defaultValue={f.q ?? ""} placeholder="Firma, Name, E-Mail, PLZ, Notiz" />
          </label>
          <label>
            Status
            <select name="status" defaultValue={f.status ?? ""}>
              <option value="">alle</option>
              {applicationStatuses.map((s) => (
                <option key={s} value={s}>{applicationStatusLabel[s]}</option>
              ))}
            </select>
          </label>
          <label>
            Kategorie
            <select name="category" defaultValue={f.category ?? ""}>
              <option value="">alle</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Region
            <select name="region" defaultValue={f.region ?? ""}>
              <option value="">alle</option>
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label>
            Kapazität ab (Prüftage/Monat)
            <input name="capMin" type="number" min={0} defaultValue={f.capMin ?? ""} />
          </label>
          <label>
            Quellseite
            <select name="source" defaultValue={f.source ?? ""}>
              <option value="">alle</option>
              {SOURCE_PAGES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            UTM-Quelle
            <select name="utm" defaultValue={f.utm ?? ""}>
              <option value="">alle</option>
              {utmSources.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </label>
          <label>
            Eingang von
            <input name="from" type="date" defaultValue={f.from ?? ""} />
          </label>
          <label>
            bis
            <input name="to" type="date" defaultValue={f.to ?? ""} />
          </label>
        </div>
        <p>
          <button className="rr-btn-secondary" type="submit">Filtern</button> <Link href="/admin/partner">zurücksetzen</Link> · {shown.length} von{" "}
          {all.length}
        </p>
      </form>

      <div className="table-wrap" tabIndex={0} role="region" aria-label="Bewerbungen, waagerecht scrollbar">
        <table className="data-table">
          <thead>
            <tr>
              {["Eingang", "Unternehmen", "Kategorien", "Regionen", "Kapazität", "Quelle / UTM", "Web3Forms", "Status", "Löschung ab"].map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((a) => (
              <tr key={a.id}>
                <td>{fmt(a.createdAt)}</td>
                <th scope="row">
                  <Link href={`/admin/partner/${a.id}`}>{a.company}</Link>
                  <br />
                  <small>{a.contactName}</small>
                </th>
                <td>{a.categories.join(", ")}</td>
                <td>
                  {a.regions.join(", ")}
                  {a.plzAreas && <><br /><small>PLZ {a.plzAreas}</small></>}
                </td>
                <td>{a.capacityDays} Tage/Monat · {a.mobileTeams} Team(s)</td>
                <td>
                  {a.sourcePage}
                  {a.utmSource && <><br /><small>{a.utmSource}{a.utmCampaign ? ` / ${a.utmCampaign}` : ""}</small></>}
                </td>
                <td>{a.web3formsStatus === "sent" ? "gesendet" : a.web3formsStatus === "error" ? <strong>Fehler</strong> : "–"}</td>
                <td>{applicationStatusLabel[a.status as ApplicationStatus] ?? a.status}</td>
                <td>{a.deleteAfter ? a.deleteAfter.slice(0, 10) : "aktiv – keine"}</td>
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

      <h2>Löschprotokoll</h2>
      <p className="muted-note">Ohne personenbezogene Daten und ohne Bewerbungs-ID.</p>
      <ul>
        {deletions.slice(0, 50).map((e) => (
          <li key={e.id}>
            {fmt(e.createdAt)}: {e.detail}
          </li>
        ))}
        {deletions.length === 0 && <li>Keine Löschungen.</li>}
      </ul>
    </main>
  );
}
