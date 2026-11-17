"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { sendViaWeb3Forms, type Web3FormsPayload } from "@/lib/web3forms";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

/** Verfügbarkeitsanfrage für Prüfbetriebe; Prüfung über /api/partner-anfrage, Versand per Web3Forms. */
export default function PartnerApplyForm({ bereiche }: { bereiche: { slug: string; name: string }[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/partner-anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firma: fd.get("firma"),
          ansprechpartner: fd.get("ansprechpartner"),
          pruefbereich: fd.get("pruefbereich"),
          einsatzgebiet: fd.get("einsatzgebiet"),
          email: fd.get("email"),
          telefon: fd.get("telefon"),
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
        <p>Wir melden uns mit der Verfügbarkeit für Ihren Prüfbereich und Ihr Einsatzgebiet.</p>
      </div>
    );
  }

  return (
    <form className="contact-form rr-form" onSubmit={onSubmit} aria-labelledby="rr-partner-title">
      <strong id="rr-partner-title" className="form-title">
        Verfügbarkeit anfragen
      </strong>
      <div className="form-row">
        <label>
          Firma
          <input name="firma" type="text" autoComplete="organization" required maxLength={160} />
        </label>
        <label>
          Ansprechpartner
          <input name="ansprechpartner" type="text" autoComplete="name" required maxLength={120} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Prüfbereich
          <select name="pruefbereich" required defaultValue="">
            <option value="" disabled>
              Bitte wählen
            </option>
            {bereiche.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Einsatzgebiet
          <input name="einsatzgebiet" type="text" placeholder="z. B. PLZ-Gebiete oder Bundesländer" required maxLength={300} />
        </label>
      </div>
      <div className="form-row">
        <label>
          E-Mail
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
        <label>
          Telefon
          <input name="telefon" type="tel" autoComplete="tel" required maxLength={60} />
        </label>
      </div>
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
          {status === "sending" ? "Wird gesendet …" : "Verfügbarkeit anfragen"}
        </button>
      </div>
    </form>
  );
}
