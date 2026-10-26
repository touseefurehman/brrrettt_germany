"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "./icons";
import { btnPrimary } from "./ui";
import { track } from "@/lib/analytics";
import EmailLink from "./EmailLink";
import { hasPhone, phoneLink, site } from "@/lib/site";

type Status = "idle" | "sending" | "error";

// Versand ausschließlich über Web3Forms (web3forms.com); Zustellung an die E-Mail-Adresse dieses Access Keys
const WEB3FORMS_ACCESS_KEY = "c0e91a82-de38-4bc2-b228-cdc1fcd7b8be";

/**
 * Formular „Bestandsaufnahme anfragen“ (Lastenheft L-01 bis L-06).
 * Pflichtfelder: Organisation, Ansprechpartner, E-Mail, Anzahl Standorte – „Anzahl Standorte“ ist das
 * Qualifizierungsmerkmal und darf nicht entfallen. Nach dem Versand: GA4-Event `generate_lead` mit Quellseite,
 * dann Weiterleitung auf die Bestätigungsseite /anfrage-gesendet (eigene URL für die Conversion-Messung).
 */
export default function ContactForm({ source }: { source: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    // Spam-Schutz: Honeypot gefüllt oder in unter 3 Sekunden abgeschickt → still verwerfen
    if (data.website || Date.now() - startedAt.current < 3000) {
      router.push("/anfrage-gesendet");
      return;
    }
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Bestandsaufnahme angefragt – ${(data.organisation ?? "").trim()} (${data.standorte} Standorte)`,
          from_name: "betreibermanager.de",
          botcheck: false,
          Organisation: data.organisation,
          Ansprechpartner: data.name,
          email: data.email,
          Telefon: data.phone || "–",
          "Anzahl Standorte": data.standorte,
          Nachricht: data.message || "–",
          Seite: source,
          Einwilligung: "erteilt",
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !result.success) {
        throw new Error(`Der Versand ist fehlgeschlagen. Bitte schreiben Sie an ${site.email}.`);
      }
      track("generate_lead", { source_page: source, locations: Number(data.standorte) || 0 });
      router.push(`/anfrage-gesendet?quelle=${encodeURIComponent(source)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Anfrage konnte nicht gesendet werden.");
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} aria-labelledby="form-title">
      <strong id="form-title" className="form-title">
        Bestandsaufnahme anfragen
      </strong>
      <p className="form-direct">
        Lieber direkt sprechen?{" "}
        {hasPhone && (
          <>
            <a href={phoneLink}>{site.phoneDisplay}</a> ·{" "}
          </>
        )}
        <EmailLink /> · {site.responseTime}.
      </p>
      <div className="form-row">
        <label>
          Organisation
          <input name="organisation" type="text" placeholder="Unternehmen, Kommune, Träger" autoComplete="organization" required maxLength={160} />
        </label>
        <label>
          Ansprechpartner
          <input name="name" type="text" placeholder="Vor- und Nachname" autoComplete="name" required maxLength={120} />
        </label>
      </div>
      <div className="form-row">
        <label>
          E-Mail
          <input name="email" type="email" placeholder="name@organisation.de" autoComplete="email" required maxLength={200} />
        </label>
        <label>
          Anzahl Standorte
          <input name="standorte" type="number" inputMode="numeric" min={1} max={100000} step={1} placeholder="z. B. 12" required />
        </label>
      </div>
      <label>
        Telefon <span>(optional)</span>
        <input name="phone" type="tel" placeholder="Für Rückfragen" autoComplete="tel" maxLength={60} />
      </label>
      <label>
        Worum geht es? <span>(optional)</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Gebäudearten, Anlagen, aktueller Prüfstatus …"
          maxLength={5000}
        />
      </label>
      <input type="hidden" name="source" value={source} />
      {/* Honeypot gegen Spam-Bots – für Menschen unsichtbar */}
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
        <p role={status === "error" ? "alert" : undefined}>{status === "error" ? error : `${site.responseTime}.`}</p>
        <button className={btnPrimary} disabled={status === "sending"} type="submit">
          {status === "sending" ? "Wird gesendet …" : "Bestandsaufnahme anfragen"} <ArrowUpRight />
        </button>
      </div>
    </form>
  );
}
