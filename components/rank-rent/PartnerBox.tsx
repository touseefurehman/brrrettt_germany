import Link from "next/link";
import { activePartner, PARTNER_PAGE_PATH } from "@/lib/rank-rent";

/**
 * Partnerplatz einer Landingpage.
 * Modus B (Slot gemietet, `active: true`): Partner mit „Anzeige“-Kennzeichnung (§ 5a UWG), Links sponsored.
 * Modus A (nicht gemietet): neutraler Hinweis ohne Firmennamen oder Logos und ohne Behauptung eines Partnernetzes.
 */
export default function PartnerBox({
  slotId,
  bereichName,
  objektName,
}: {
  slotId: string;
  bereichName: string;
  objektName: string;
}) {
  const partner = activePartner(slotId);

  if (partner) {
    return (
      <aside className="partner-box rr-partner" aria-label="Anzeige" data-partner-mode="B">
        <span className="partner-label">Anzeige</span>
        <div className="rr-partner-head">
          {partner.logo && /^(\/|https?:\/\/)/.test(partner.logo) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={partner.logo} alt={`Logo ${partner.name}`} className="rr-partner-logo" loading="lazy" height={48} />
          )}
          <strong>{partner.name}</strong>
        </div>
        {partner.region && <p>Einsatzgebiet: {partner.region}</p>}
        {partner.certifications && partner.certifications.length > 0 && (
          <ul className="rr-partner-certs">
            {partner.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        {partner.quote && <blockquote className="rr-partner-quote">{partner.quote}</blockquote>}
        <div className="rr-partner-actions">
          <a href="#anfrage" className="rr-btn">
            Angebot über betreibermanager.de anfragen
          </a>
          {partner.ctaUrl && (
            <a href={partner.ctaUrl} rel="sponsored noopener" target="_blank" className="rr-btn-secondary">
              {partner.ctaText || "Zur Website des Partners"}
            </a>
          )}
        </div>
      </aside>
    );
  }

  return (
    <aside className="partner-box rr-partner" aria-label="Hinweis zur Anfrage" data-partner-mode="A">
      <strong>
        Geprüfte Fachbetriebe für {bereichName} in {objektName}
      </strong>
      <p>
        Beschreiben Sie Ihr Objekt im Anfrageformular. Wir leiten Ihre Anfrage an einen geeigneten Prüfbetrieb weiter.
      </p>
      <div className="rr-partner-actions">
        <a href="#anfrage" className="rr-btn">
          Zum Anfrageformular
        </a>
      </div>
      <p className="rr-partner-note">
        Sie sind Prüfbetrieb? Dieser Exklusiv-Platz ist verfügbar → <Link href={PARTNER_PAGE_PATH}>Fachpartner werden</Link>
      </p>
    </aside>
  );
}
