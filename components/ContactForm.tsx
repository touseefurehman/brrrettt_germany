"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { btnPrimary } from "./ui";
import { emailLink, hasPhone, phoneLink, site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const WEB3FORMS_ACCESS_KEY = "c0e91a82-de38-4bc2-b228-cdc1fcd7b8be";

/** `source` = Seite, über die die Anfrage kommt – erscheint in der E-Mail zur Lead-Auswertung */
export default function ContactForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      let res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt.current }),
      });
      // 503 = Resend noch nicht konfiguriert → Versand über Web3Forms
      if (res.status === 503) {
        res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Anfrage über betreibermanager.de – ${String(data.name ?? "").trim()}`,
            from_name: "betreibermanager.de",
            Name: data.name,
            Firma: data.company || "–",
            email: data.email,
            Telefon: data.phone || "–",
            "Standorte / Anlagen": data.scope || "–",
            "Gewünschter Zeitraum": data.timeframe || "–",
            Nachricht: data.message,
            Seite: data.source || "–",
            Einwilligung: "erteilt",
          }),
        });
        const result = (await res.json().catch(() => ({}))) as { success?: boolean };
        if (!res.ok || !result.success) {
          throw new Error(`Der Versand ist fehlgeschlagen. Bitte schreiben Sie an ${site.email}.`);
        }
      } else if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Die Anfrage konnte nicht gesendet werden.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Anfrage konnte nicht gesendet werden.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form form-success" role="status">
        <strong>Vielen Dank für Ihre Anfrage.</strong>
        <p>Wir melden uns innerhalb eines Werktags bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <p className="form-direct">
        Lieber direkt sprechen?{" "}
        {hasPhone && (
          <>
            <a href={phoneLink}>{site.phoneDisplay}</a> ·{" "}
          </>
        )}
        <a href={emailLink}>{site.email}</a> · {site.responseTime}.
      </p>
      <div className="form-row">
        <label>
          Name
          <input name="name" type="text" placeholder="Ihr Vor- und Nachname" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          Firma
          <input name="company" type="text" placeholder="Ihr Unternehmen" autoComplete="organization" maxLength={160} />
        </label>
      </div>
      <div className="form-row">
        <label>
          E-Mail
          <input name="email" type="email" placeholder="name@unternehmen.de" autoComplete="email" required maxLength={200} />
        </label>
        <label>
          Telefon <span>(optional)</span>
          <input name="phone" type="tel" placeholder="Ihre Telefonnummer" autoComplete="tel" maxLength={60} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Standorte / Anlagen
          <input name="scope" type="text" placeholder="z. B. 2 Standorte, ca. 300 Geräte" maxLength={160} />
        </label>
        <label>
          Gewünschter Zeitraum
          <input name="timeframe" type="text" placeholder="z. B. bis Ende Q1" maxLength={120} />
        </label>
      </div>
      <label>
        Worum geht es?
        <textarea
          name="message"
          rows={4}
          placeholder="Anlagen, Gebäudetyp, aktueller Prüfstatus und gewünschter Umfang …"
          required
          maxLength={5000}
        />
      </label>
      {source && <input type="hidden" name="source" value={source} />}
      {/* Honeypot gegen Spam-Bots – für Menschen unsichtbar */}
      <label className="hp-field" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> zur Kenntnis genommen und bin damit
          einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden.
        </span>
      </label>
      <div className="form-footer">
        <p role={status === "error" ? "alert" : undefined}>{status === "error" ? error : `${site.responseTime}.`}</p>
        <button className={btnPrimary} disabled={status === "sending"} type="submit">
          {status === "sending" ? "Wird gesendet …" : "Beratung anfragen"} <ArrowUpRight />
        </button>
      </div>
    </form>
  );
}
