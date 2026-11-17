"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import type { FormField } from "@/lib/rank-rent";

type Status = "idle" | "sending" | "done" | "error";

/** Themenspezifisches Anfrageformular: Basisfelder + `fields` aus pruefbereiche.json. Versand über /api/leads. */
export default function LeadForm({
  objekt,
  seite,
  fields,
  topic,
  partnerName,
}: {
  objekt: string;
  seite: string;
  fields: FormField[];
  /** z. B. „DGUV V3 Prüfung für Schulen“ – für Titel und Tracking */
  topic: string;
  /** Name des gemieteten Partners; ohne Angabe wird neutral formuliert */
  partnerName?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const extra: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === "multiselect") extra[f.name] = fd.getAll(f.name);
      else if (f.type === "boolean") extra[f.name] = fd.get(f.name) === "on";
      else extra[f.name] = fd.get(f.name) ?? "";
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objekt,
          seite,
          firma: fd.get("firma"),
          name: fd.get("name"),
          email: fd.get("email"),
          telefon: fd.get("telefon"),
          plz: fd.get("plz"),
          nachricht: fd.get("nachricht"),
          consent: fd.get("consent") === "yes",
          website: fd.get("website"),
          elapsed: Date.now() - startedAt.current,
          extra,
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !result.ok) throw new Error(result.message || "Die Anfrage konnte nicht gesendet werden.");
      track("generate_lead", { source_page: `${objekt}/${seite}`, topic });
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
        <p>Wir leiten Ihre Angaben an einen Prüfbetrieb weiter. Sie erhalten eine Rückmeldung per E-Mail oder Telefon.</p>
      </div>
    );
  }

  return (
    <form className="contact-form rr-form" onSubmit={onSubmit} aria-labelledby="rr-form-title">
      <strong id="rr-form-title" className="form-title">
        Angebot anfragen: {topic}
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
          E-Mail
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
        <label>
          Telefon
          <input name="telefon" type="tel" autoComplete="tel" required maxLength={60} />
        </label>
      </div>
      <div className="form-row">
        <label>
          PLZ des Objekts
          <input name="plz" type="text" inputMode="numeric" pattern="\d{5}" maxLength={5} autoComplete="postal-code" required />
        </label>
        <span />
      </div>
      {fields.map((f) => (
        <ExtraField key={f.name} field={f} />
      ))}
      <label>
        Nachricht <span>(optional)</span>
        <textarea name="nachricht" rows={4} maxLength={5000} />
      </label>
      {/* Honeypot gegen Spam-Bots – für Menschen unsichtbar */}
      <label className="hp-field" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet und an{" "}
          {partnerName ? `${partnerName} als Partnerunternehmen` : "ein Partnerunternehmen (Prüfbetrieb)"} weitergeleitet
          werden, das mir ein Angebot unterbreitet. Hinweise in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </span>
      </label>
      <div className="form-footer">
        <p role={status === "error" ? "alert" : undefined}>
          {status === "error" ? error : "Unverbindlich und kostenlos."}
        </p>
        <button className="rr-btn" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Wird gesendet …" : "Anfrage absenden"}
        </button>
      </div>
    </form>
  );
}

function ExtraField({ field }: { field: FormField }) {
  const req = field.required ?? false;
  const label = (
    <>
      {field.label} {!req && <span>(optional)</span>}
    </>
  );
  switch (field.type) {
    case "select":
      return (
        <label>
          {label}
          <select name={field.name} required={req} defaultValue="">
            <option value="" disabled>
              Bitte wählen
            </option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      );
    case "multiselect":
      return (
        <fieldset className="rr-checks">
          <legend>{label}</legend>
          {field.options?.map((o) => (
            <label key={o} className="rr-check">
              <input type="checkbox" name={field.name} value={o} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
      );
    case "boolean":
      return (
        <label className="rr-check">
          <input type="checkbox" name={field.name} />
          <span>{field.label}</span>
        </label>
      );
    case "number":
      return (
        <label>
          {label}
          <input name={field.name} type="number" inputMode="numeric" min={0} step={1} required={req} />
        </label>
      );
    case "date":
      return (
        <label>
          {label}
          <input name={field.name} type="date" required={req} />
        </label>
      );
    default:
      return (
        <label>
          {label}
          <input name={field.name} type="text" required={req} maxLength={500} />
        </label>
      );
  }
}
