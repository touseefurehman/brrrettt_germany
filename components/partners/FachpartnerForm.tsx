"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ANLIEGEN, POSITIONEN, sponsoringPakete, upcomingReports } from "@/lib/partners";
import { sendViaWeb3Forms, type Web3FormsPayload } from "@/lib/web3forms";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

/** Anfrage von Fachpartnern und Sponsoren; Prüfung über /api/fachpartner-anfrage, Versand per Web3Forms im Browser. */
export default function FachpartnerForm({
  defaultAnliegen = ANLIEGEN[0],
  withSponsoring = false,
}: {
  defaultAnliegen?: (typeof ANLIEGEN)[number];
  withSponsoring?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [report, setReport] = useState("");
  const startedAt = useRef(Date.now());

  // „Als Sponsor einsteigen“ verlinkt mit ?report=<slug>
  useEffect(() => {
    if (!withSponsoring) return;
    const slug = new URLSearchParams(window.location.search).get("report") ?? "";
    if (upcomingReports.some((r) => r.slug === slug)) setReport(slug);
  }, [withSponsoring]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/fachpartner-anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firma: fd.get("firma"),
          name: fd.get("name"),
          email: fd.get("email"),
          telefon: fd.get("telefon"),
          position: fd.get("position"),
          anliegen: fd.get("anliegen"),
          leistung: fd.get("leistung"),
          region: fd.get("region"),
          messen: fd.get("messen"),
          paket: fd.get("paket"),
          report: fd.get("report"),
          nachricht: fd.get("nachricht"),
          consent: fd.get("consent") === "yes",
          website: fd.get("website"),
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; mail?: Web3FormsPayload };
      if (!res.ok || !result.ok) throw new Error(result.message || "Die Anfrage konnte nicht gesendet werden.");
      // Versand per Web3Forms aus dem Browser (kostenloser Tarif nimmt keine Server-Anfragen an)
      if (result.mail) await sendViaWeb3Forms(result.mail, site.email);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Anfrage konnte nicht gesendet werden.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rr-form-done" role="status">
        <strong>Vielen Dank – Ihre Anfrage ist eingegangen.</strong>
        <p>Wir melden uns persönlich bei Ihnen, um ein Gespräch zu vereinbaren.</p>
      </div>
    );
  }

  return (
    <form className="contact-form rr-form" onSubmit={onSubmit} aria-labelledby="fp-form-title">
      <strong id="fp-form-title" className="form-title">
        Gespräch anfragen
      </strong>
      <div className="form-row">
        <label>
          Firma
          <input name="firma" type="text" autoComplete="organization" required maxLength={160} />
        </label>
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Position
          <select name="position" required defaultValue="">
            <option value="" disabled>
              Bitte wählen
            </option>
            {POSITIONEN.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label>
          Anliegen
          <select name="anliegen" required defaultValue={defaultAnliegen}>
            {ANLIEGEN.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>
          E-Mail
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
        <label>
          Telefon (optional)
          <input name="telefon" type="tel" autoComplete="tel" maxLength={60} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Leistung / Prüfbereich
          <input name="leistung" type="text" placeholder="z. B. Brandschutzprüfung, Elektrotechnik" required maxLength={300} />
        </label>
        <label>
          Einsatzgebiet
          <input name="region" type="text" placeholder="z. B. bundesweit oder Einsatzgebiet" required maxLength={300} />
        </label>
      </div>
      <label>
        Besuchte Messen (optional)
        <input name="messen" type="text" maxLength={300} />
      </label>
      {withSponsoring && (
        <div className="form-row">
          <label>
            Paket (optional)
            <select name="paket" defaultValue="">
              <option value="">Noch offen</option>
              {sponsoringPakete.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Report-Thema (optional)
            <select name="report" value={report} onChange={(e) => setReport(e.target.value)}>
              <option value="">Noch offen</option>
              {upcomingReports.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <label>
        Nachricht (optional)
        <textarea name="nachricht" rows={4} maxLength={2000} />
      </label>
      <label className="hp-field" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden. Hinweise in
          der <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </span>
      </label>
      <div className="form-footer">
        <p role={status === "error" ? "alert" : undefined}>{status === "error" ? error : "Unverbindlich."}</p>
        <button className="rr-btn" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Wird gesendet …" : "Gespräch anfragen"}
        </button>
      </div>
    </form>
  );
}
