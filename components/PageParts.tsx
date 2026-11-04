import Link from "next/link";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import { ShieldCheck } from "./icons";

/** Abschluss jeder Seite (Lastenheft I-06): Koordination über Gewerke und Standorte, Aufforderung zur Bestandsaufnahme. */
export function CoordinationNote({ href = "#anfrage" }: { href?: string }) {
  return (
    <section className="section page-width section-tight prose">
      <h2>Koordination über Gewerke und Standorte</h2>
      <p>
        Keine Prüfpflicht steht im Bestand für sich allein. Elektroprüfung, Brandschutz, Lüftungshygiene,
        Trinkwasser, Aufzüge und Regale laufen mit unterschiedlichen Fristen, Prüfern und Zuständigen – bei
        Organisationen mit mehreren Standorten entstehen Lücken genau an diesen Schnittstellen. betreibermanager.de
        erfasst die prüfpflichtigen Anlagen aller Standorte, legt Fristen in einem gemeinsamen Plan fest, beauftragt
        qualifizierte Prüfbetriebe und führt die Nachweise an einer Stelle zusammen. Der Einstieg ist eine{" "}
        <Link href={href}>Bestandsaufnahme</Link> für einen oder mehrere Standorte.
      </p>
    </section>
  );
}

/** Hinweise nach R-03 (Richtwerte) und R-05 (keine Rechtsberatung) – auf jeder Seite mit Fristangaben. */
export function LegalNotice() {
  return (
    <p className="muted-note legal-note">
      Alle genannten Prüffristen sind Richtwerte. Verbindlich ist die Frist, die der Arbeitgeber bzw. Betreiber in der
      Gefährdungsbeurteilung nach § 3 BetrSichV festlegt, soweit Rechtsvorschriften keine festen Fristen vorgeben. Dieser
      Text ersetzt weder eine Rechtsberatung noch eine Gefährdungsbeurteilung.
    </p>
  );
}

/** Formular „Bestandsaufnahme anfragen“ (L-01) mit Anbieterangaben */
export function InquirySection({ title, source, catalog }: { title: string; source: string; catalog?: boolean }) {
  return (
    <section id="anfrage" className="section page-width contact-grid">
      <div>
        <div className="section-label">BESTANDSAUFNAHME</div>
        <h2>{title}</h2>
        <p>
          Nennen Sie uns Organisation, Anzahl der Standorte und – wenn vorhanden – den aktuellen Prüfstatus. Wir schlagen
          Ihnen Umfang und Ablauf einer Bestandsaufnahme vor. <Link href="/externer-betreibermanager">So arbeiten wir</Link>
        </p>
        <ContactDetails />
        <div className="contact-assurance">
          <ShieldCheck size={22} />
          <div>
            Vertraulich. Persönlich. Unverbindlich.
            <small>Das Erstgespräch ist kostenfrei.</small>
          </div>
        </div>
      </div>
      <ContactForm source={source} catalog={catalog} />
    </section>
  );
}
