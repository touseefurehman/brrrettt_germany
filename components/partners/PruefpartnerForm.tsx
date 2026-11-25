"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { sendViaWeb3Forms, type Web3FormsPayload } from "@/lib/web3forms";
import { site } from "@/lib/site";

const TRADES = ["Elektro (DGUV V3)", "Brandschutz", "RLT-Hygiene", "Trinkwasser", "Türen und Tore", "Regale"];
const CONFIRMATION = "Danke für Ihre Registrierung. Die Registrierung ist keine automatische Freigabe – wir prüfen Ihre Angaben und melden uns.";

/**
 * Gemeinsames Registrierungsformular für Prüfbetriebe (Hub und Unterseiten). Getrennt vom Formular des bezahlten Fachpartner-Programms.
 * `sourcePage` steht als verstecktes Feld in der Bewerbung; `previewToken` nur in der Vorschau (Formular ist vor der Veröffentlichung gesperrt).
 */
export default function PruefpartnerForm({ sourcePage, cta, previewToken }: { sourcePage: string; cta: string; previewToken?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/pruefpartner-bewerbung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourcePage: fd.get("sourcePage"),
          company: fd.get("company"),
          contact: fd.get("contact"),
          email: fd.get("email"),
          trades: fd.getAll("trades"),
          region: fd.get("region"),
          qualifications: fd.get("qualifications"),
          capacity: fd.get("capacity"),
          message: fd.get("message"),
          consent: fd.get("consent") === "yes",
          website: fd.get("website"),
          elapsed: Date.now() - startedAt.current,
          ...(previewToken && { previewToken }),
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; mail?: Web3FormsPayload };
      if (!res.ok || !result.ok) throw new Error(result.message || "Die Registrierung konnte nicht gesendet werden.");
      if (result.mail) await sendViaWeb3Forms(result.mail, site.email);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Registrierung konnte nicht gesendet werden.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rr-form-done" role="status" data-testid="partner-confirmation">
        <strong>{CONFIRMATION}</strong>
      </div>
    );
  }

  return (
    <form className="contact-form rr-form" onSubmit={onSubmit} aria-labelledby="pp-form-title">
      <strong id="pp-form-title" className="form-title">
        Registrierung als Prüfpartner
      </strong>
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <div className="form-row">
        <label>
          Unternehmen
          <input name="company" type="text" autoComplete="organization" required maxLength={160} />
        </label>
        <label>
          Ansprechperson
          <input name="contact" type="text" autoComplete="name" required maxLength={120} />
        </label>
      </div>
      <label>
        Geschäftliche E-Mail-Adresse <span>(keine Freemail-Adressen)</span>
        <input name="email" type="email" autoComplete="email" required maxLength={200} />
      </label>
      <fieldset>
        <legend>Gewerk(e)</legend>
        {TRADES.map((t) => (
          <label key={t} className="consent">
            <input type="checkbox" name="trades" value={t} />
            <span>{t}</span>
          </label>
        ))}
      </fieldset>
      <label>
        Einsatzgebiet <span>(Region oder PLZ-Bereiche)</span>
        <input name="region" type="text" required maxLength={300} />
      </label>
      <label>
        Qualifikationen und Nachweise
        <textarea name="qualifications" rows={4} required maxLength={1500} placeholder="je nach Prüfaufgabe, z. B. Elektrofachkraft bzw. zur Prüfung befähigte Person" />
      </label>
      <label>
        Kapazität <span>(z. B. Prüftage pro Monat)</span>
        <input name="capacity" type="text" required maxLength={200} />
      </label>
      <label>
        Nachricht <span>(optional)</span>
        <textarea name="message" rows={3} maxLength={2000} />
      </label>
      <label className="hp-field" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Prüfung meiner Registrierung verarbeitet werden. Hinweise in der{" "}
          <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </span>
      </label>
      <div className="form-footer">
        <p role={status === "error" ? "alert" : undefined}>
          {status === "error" ? error : "Die Registrierung ist keine automatische Freigabe."}
        </p>
        <button className="rr-btn" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Wird gesendet …" : cta}
        </button>
      </div>
    </form>
  );
}
