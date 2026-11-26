"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { readAttribution, UTM_KEYS, type Attribution } from "@/lib/attribution";
import { CATEGORIES, CONFIRMATION, CONSENT_TEXT, PRIVACY_ANCHOR, QUALIFICATIONS, REGIONS, type Category } from "@/lib/partner-options";
import { submitWeb3Forms, type Web3FormsPayload } from "@/lib/web3forms";
import { site } from "@/lib/site";

/**
 * Gemeinsames Registrierungsformular für Prüfbetriebe (Hub und Unterseiten). Getrennt vom Formular des bezahlten Fachpartner-Programms.
 * Ablauf im Browser: 1. POST /api/partner-application (prüfen, speichern) → 2. Web3Forms (Benachrichtigung, Autoresponder an `email`)
 * → 3. PATCH /api/partner-application/<id> mit dem Versandergebnis. Quellseite und UTM gehen als versteckte Felder mit, nie in der URL.
 */
export default function PruefpartnerForm({ sourcePage, cta, accessKey }: { sourcePage: string; cta: string; accessKey: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [attribution, setAttribution] = useState<Attribution>({});
  const startedAt = useRef(Date.now());
  useEffect(() => setAttribution(readAttribution()), []);

  const toggle = (c: Category, on: boolean) => setCategories((prev) => (on ? [...prev, c] : prev.filter((x) => x !== c)));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.getAll("categories").length === 0) return fail("Bitte wählen Sie mindestens eine Kategorie.");
    if (fd.getAll("regions").length === 0) return fail("Bitte wählen Sie mindestens eine Region.");
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/partner-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourcePage: fd.get("sourcePage"),
          company: fd.get("company"),
          contactName: fd.get("contactName"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          categories: fd.getAll("categories"),
          regions: fd.getAll("regions"),
          plzAreas: fd.get("plzAreas"),
          qualifications: fd.getAll("qualifications"),
          qualificationsText: fd.get("qualificationsText"),
          capacityDays: fd.get("capacityDays"),
          mobileTeams: fd.get("mobileTeams"),
          message: fd.get("message"),
          consent: fd.get("consent") === "yes",
          botcheck: fd.get("botcheck") === "on",
          elapsed: Date.now() - startedAt.current,
          ...Object.fromEntries(UTM_KEYS.map((k) => [k, fd.get(k) ?? ""])),
          referrer: fd.get("referrer") ?? "",
        }),
      });
      const r = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; id?: string; stored?: boolean; mail?: Web3FormsPayload };
      if (!res.ok || !r.ok) throw new Error(r.message || "Die Registrierung konnte nicht gesendet werden.");
      if (r.id && r.mail) {
        const sent = await submitWeb3Forms(r.mail, accessKey);
        if (r.stored) {
          // Gespeichert ist gespeichert: Ein Versandfehler erscheint im Admin-Bereich, nicht beim Bewerber
          await fetch(`/api/partner-application/${r.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ web3formsStatus: sent ? "sent" : "error" }),
          }).catch(() => undefined);
        } else if (!sent) {
          throw new Error(`Der Versand ist fehlgeschlagen. Bitte schreiben Sie an ${site.email}.`);
        }
      }
      form.reset();
      setStatus("done");
    } catch (err) {
      fail(err instanceof Error ? err.message : "Die Registrierung konnte nicht gesendet werden.");
    }
  }

  function fail(message: string) {
    setError(message);
    setStatus("error");
  }

  if (status === "done") {
    return (
      <div className="rr-form-done" role="status" data-testid="partner-confirmation">
        <strong>{CONFIRMATION}</strong>
      </div>
    );
  }

  const qualificationOptions = categories.flatMap((c) => QUALIFICATIONS[c].map((q) => ({ c, q })));

  return (
    <form className="contact-form rr-form" onSubmit={onSubmit} aria-labelledby="pp-form-title">
      <strong id="pp-form-title" className="form-title">
        Registrierung als Prüfpartner
      </strong>
      <input type="hidden" name="sourcePage" value={sourcePage} />
      {UTM_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} value={attribution[k] ?? ""} />
      ))}
      <input type="hidden" name="referrer" value={attribution.referrer ?? ""} />
      <div className="form-row">
        <label>
          Unternehmen
          <input name="company" type="text" autoComplete="organization" required maxLength={160} />
        </label>
        <label>
          Ansprechperson
          <input name="contactName" type="text" autoComplete="name" required maxLength={120} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Geschäftliche E-Mail-Adresse <span>(keine Freemail-Adressen)</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
        <label>
          Telefon <span>(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
      </div>

      <fieldset>
        <legend>Kategorien (mindestens eine)</legend>
        {CATEGORIES.map((c) => (
          <label key={c} className="consent">
            <input type="checkbox" name="categories" value={c} onChange={(e) => toggle(c, e.target.checked)} />
            <span>{c}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Einsatzgebiet (mindestens eine Region)</legend>
        {REGIONS.map((r) => (
          <label key={r} className="consent">
            <input type="checkbox" name="regions" value={r} />
            <span>{r}</span>
          </label>
        ))}
        <label>
          PLZ-Bereiche <span>(optional, z. B. 20–25, 30)</span>
          <input name="plzAreas" type="text" maxLength={300} />
        </label>
      </fieldset>

      <fieldset>
        <legend>Qualifikationen (Selbstauskunft)</legend>
        {qualificationOptions.length === 0 ? (
          <p className="muted-note">Wählen Sie zuerst eine Kategorie, dann erscheinen passende Qualifikationen.</p>
        ) : (
          qualificationOptions.map(({ c, q }) => (
            <label key={`${c}: ${q}`} className="consent">
              <input type="checkbox" name="qualifications" value={`${c}: ${q}`} />
              <span>
                {q} <small>({c})</small>
              </span>
            </label>
          ))
        )}
        <label>
          Weitere Qualifikationen und Nachweise <span>(optional)</span>
          <textarea name="qualificationsText" rows={3} maxLength={1500} />
        </label>
      </fieldset>

      <div className="form-row">
        <label>
          Kapazität: Prüftage pro Monat
          <input name="capacityDays" type="number" inputMode="numeric" min={1} max={1000} step={1} required />
        </label>
        <label>
          Anzahl mobiler Teams
          <input name="mobileTeams" type="number" inputMode="numeric" min={1} max={500} step={1} required />
        </label>
      </div>
      <label>
        Nachricht <span>(optional)</span>
        <textarea name="message" rows={3} maxLength={2000} />
      </label>
      {/* Honeypot (Web3Forms botcheck): für Menschen unsichtbar */}
      <label className="hp-field" aria-hidden="true">
        Nicht ausfüllen
        <input name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          {CONSENT_TEXT} Hinweise: <Link href={PRIVACY_ANCHOR}>Datenschutzerklärung, Abschnitt „Bewerbung als Prüfpartner“</Link>.
        </span>
      </label>
      <div className="form-footer">
        <p role={status === "error" ? "alert" : undefined}>
          {status === "error" ? error : "Die Registrierung ist keine automatische Freigabe und keine Auftragszusage."}
        </p>
        <button className="rr-btn" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Wird gesendet …" : cta}
        </button>
      </div>
    </form>
  );
}
