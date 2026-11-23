"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";

const ROLES = ["Geschäftsführung", "Marketing", "Vertrieb", "Sonstige"];

/** Kostenlose Nullmessung anfordern; Prüfung und Double-Opt-in laufen über /api/nullmessung */
export default function NullmessungForm({ cluster, clusterName }: { cluster: string; clusterName: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [waitlist, setWaitlist] = useState(false);
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/nullmessung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: fd.get("company"),
          domain: fd.get("domain"),
          cluster,
          name: `${fd.get("vorname") ?? ""} ${fd.get("nachname") ?? ""}`.trim(),
          role: fd.get("role"),
          email: fd.get("email"),
          consent: fd.get("consent") === "yes",
          website: fd.get("website"),
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const r = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; status?: string };
      if (!res.ok || !r.ok) throw new Error(r.message || "Die Anfrage konnte nicht gesendet werden.");
      setWaitlist(r.status === "warteliste");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Anfrage konnte nicht gesendet werden.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rr-form-done" role="status">
        <strong>Fast geschafft: Bitte bestätigen Sie Ihre E-Mail-Adresse.</strong>
        <p>
          Wir haben Ihnen eine Nachricht mit einem Bestätigungslink gesendet.{" "}
          {waitlist
            ? `Ihre Nullmessung folgt, sobald die Erhebung für ${clusterName} abgeschlossen ist.`
            : "Nach der Bestätigung erhalten Sie Ihren persönlichen Befund."}
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form rr-form" onSubmit={onSubmit} aria-labelledby="nm-title">
      <strong id="nm-title" className="form-title">
        Nullmessung für {clusterName} anfordern
      </strong>
      <div className="form-row">
        <label>
          Firmenname
          <input name="company" type="text" autoComplete="organization" required maxLength={160} />
        </label>
        <label>
          Website / Domain
          <input name="domain" type="text" inputMode="url" placeholder="ihre-firma.de" required maxLength={200} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Vorname
          <input name="vorname" type="text" autoComplete="given-name" required maxLength={60} />
        </label>
        <label>
          Nachname
          <input name="nachname" type="text" autoComplete="family-name" required maxLength={60} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Rolle
          <select name="role" required defaultValue="">
            <option value="" disabled>
              Bitte wählen
            </option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <label>
          Geschäftliche E-Mail
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label className="hp-field" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Erstellung der Nullmessung und für die zugehörigen E-Mails verarbeitet
          werden. Hinweise und Abmeldung: <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </span>
      </label>
      <div className="form-footer">
        <p role={status === "error" ? "alert" : undefined}>{status === "error" ? error : "Kostenlos und unverbindlich. Sie erhalten zuerst eine Bestätigungs-E-Mail."}</p>
        <button className="rr-btn" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Wird gesendet …" : "Nullmessung anfordern"}
        </button>
      </div>
    </form>
  );
}
