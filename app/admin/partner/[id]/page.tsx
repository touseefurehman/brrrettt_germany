import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { applicationEvents, getApplication, queueAvailable } from "@/lib/partner-applications";
import { applicationStatusLabel, transitions } from "@/lib/partner-options";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Prüfpartner-Bewerbung (Admin)", robots: { index: false, follow: false } };

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleString("de-DE", { timeZone: "Europe/Berlin" }) : "–");

export default async function AdminPartnerDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ fehler?: string }> }) {
  if (!queueAvailable) notFound();
  const id = (await params).id;
  const { fehler } = await searchParams;
  const a = await getApplication(id);
  if (!a) notFound();
  const events = await applicationEvents(id);
  const row = (label: string, value: React.ReactNode) => (
    <tr>
      <th scope="row">{label}</th>
      <td>{value || "–"}</td>
    </tr>
  );

  return (
    <main className="section page-width">
      <p>
        <Link href="/admin/partner">← Alle Bewerbungen</Link>
      </p>
      <h1>{a.company}</h1>
      <p>
        Status: <strong>{applicationStatusLabel[a.status]}</strong> · seit {fmt(a.statusChangedAt)} ·{" "}
        {a.deleteAfter ? `automatische Löschung ab ${a.deleteAfter.slice(0, 10)}` : "aktiv – keine automatische Löschung"}
      </p>
      {fehler && <p role="alert">{fehler}</p>}
      {a.web3formsStatus === "error" && (
        <p role="alert">Die Web3Forms-Benachrichtigung ist fehlgeschlagen. Die Bewerbung ist trotzdem gespeichert; ggf. Bestätigung manuell senden.</p>
      )}

      <h2>Status</h2>
      <form action="/admin/partner/action" method="post" className="rr-form">
        <input type="hidden" name="id" value={a.id} />
        <input type="hidden" name="action" value="status" />
        <label>
          Neuer Status{" "}
          <select name="status" required defaultValue="">
            <option value="" disabled>
              bitte wählen
            </option>
            {transitions[a.status].map((s) => (
              <option key={s} value={s}>{applicationStatusLabel[s]}</option>
            ))}
          </select>
        </label>{" "}
        <button type="submit">Status ändern</button>
      </form>
      {a.status === "qualifiziert" && (
        <form action="/admin/partner/action" method="post" className="rr-form">
          <input type="hidden" name="id" value={a.id} />
          <input type="hidden" name="action" value="approve" />
          <label className="consent">
            <input type="checkbox" name="confirm" value="yes" required />
            <span>Ich habe Qualifikationen und Nachweise geprüft und gebe {a.company} als aktiven Prüfpartner frei.</span>
          </label>
          <button className="rr-btn" type="submit">Freigeben</button>
        </form>
      )}
      {a.approvedAt && (
        <p>
          Freigegeben von {a.approvedBy} am {fmt(a.approvedAt)}
        </p>
      )}

      <h2>Angaben</h2>
      <div className="table-wrap">
        <table className="data-table">
          <tbody>
            {row("Eingang", fmt(a.createdAt))}
            {row("Ansprechperson", a.contactName)}
            {row("E-Mail", <a href={`mailto:${a.email}`}>{a.email}</a>)}
            {row("Telefon", a.phone)}
            {row("Kategorien", a.categories.join(", "))}
            {row("Regionen", a.regions.join(", "))}
            {row("PLZ-Bereiche", a.plzAreas)}
            {row("Qualifikationen (Selbstauskunft)", a.qualifications.length ? <ul>{a.qualifications.map((q) => <li key={q}>{q}</li>)}</ul> : "")}
            {row("Weitere Qualifikationen / Nachweise", <span style={{ whiteSpace: "pre-wrap" }}>{a.qualificationsText}</span>)}
            {row("Kapazität", `${a.capacityDays} Prüftage pro Monat · ${a.mobileTeams} mobile Team(s)`)}
            {row("Nachricht", <span style={{ whiteSpace: "pre-wrap" }}>{a.message}</span>)}
            {row("Quellseite", a.sourcePage)}
            {row("UTM", [a.utmSource, a.utmMedium, a.utmCampaign, a.utmTerm, a.utmContent].filter(Boolean).join(" / "))}
            {row("Referrer", a.referrer)}
            {row("Einwilligung", `${fmt(a.consentAt)} (Textfassung ${a.consentTextVersion})`)}
            {row("Web3Forms", a.web3formsStatus === "sent" ? "gesendet" : a.web3formsStatus === "error" ? "Fehler" : "kein Ergebnis gemeldet")}
            {row("Bewerbungs-ID", <code>{a.id}</code>)}
          </tbody>
        </table>
      </div>

      <h2>Notizen</h2>
      <form action="/admin/partner/action" method="post" className="rr-form">
        <input type="hidden" name="id" value={a.id} />
        <input type="hidden" name="action" value="notes" />
        <textarea name="notes" rows={5} maxLength={5000} defaultValue={a.notes} aria-label="Notizen" />
        <button type="submit">Notizen speichern</button>
      </form>

      <h2>Verlauf</h2>
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            {fmt(e.createdAt)} · {e.type}: {e.detail}
          </li>
        ))}
        {events.length === 0 && <li>Keine Ereignisse.</li>}
      </ul>

      <h2>Löschen</h2>
      <form action="/admin/partner/action" method="post" className="rr-form">
        <input type="hidden" name="id" value={a.id} />
        <input type="hidden" name="action" value="delete" />
        <label className="consent">
          <input type="checkbox" name="confirm" value="yes" required />
          <span>Bewerbung und Verlauf endgültig löschen (nicht rückgängig zu machen). Kopien im Postfach und im Web3Forms-Konto separat löschen.</span>
        </label>
        <button type="submit">Endgültig löschen</button>
      </form>
    </main>
  );
}
