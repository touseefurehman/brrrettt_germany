import Link from "next/link";

/** Klare Trennung: operative Zusammenarbeit (diese Seiten) ↔ bezahlte Sichtbarkeit (/fachpartner). Keine gemeinsamen CTAs oder Formulare. */
export default function SichtbarkeitBox() {
  return (
    <aside className="author-box" aria-labelledby="sichtbarkeit-titel">
      <strong id="sichtbarkeit-titel">Sie möchten als Anbieter sichtbar werden?</strong>
      <span>
        Exklusive Fachpartnerplätze (bezahlt) → <Link href="/fachpartner">Bezahlte Sichtbarkeit (Fachpartnerplatz)</Link>. Das ist ein eigenes Angebot für
        Sichtbarkeit und unabhängig von der Registrierung als Prüfpartner; die Registrierung als Prüfpartner begründet keine
        Fachpartner-Platzierung und umgekehrt.
      </span>
    </aside>
  );
}
