import { Fragment } from "react";
import { retentionDays } from "@/lib/partner-applications";
import { site } from "@/lib/site";

// Rechtliche Prüfung durch Henryk/Anwalt empfohlen
// Datenschutzabschnitt „Bewerbung als Prüfpartner“. Erscheint in /datenschutz nur bei freigeschaltetem Formular (partnerFormLive),
// sonst ausschließlich in der Redaktionsvorschau (highlight). Kein sichtbarer Platzhalter auf der Live-Seite, solange das Formular aus ist.

/** Kontakt für Löschanfragen: die geschäftliche Kontaktadresse der Website (Impressum, Kontakt) */
export const DELETION_CONTACT = site.email;

export default function PartnerPrivacySection({ heading = "3b. Bewerbung als Prüfpartner", highlight = false }: { heading?: string; highlight?: boolean }) {
  const days = retentionDays();
  const months = days === 365 ? "12 Monate" : `${days} Tage`;
  const monthsDat = days === 365 ? "12 Monaten" : `${days} Tagen`;
  const mark = (text: string) =>
    highlight && text.startsWith("[PRÜFEN") ? (
      <mark style={{ background: "#fde047", color: "#1c1917", padding: "0 3px", borderRadius: 3 }}>{text}</mark>
    ) : (
      <Fragment>{text}</Fragment>
    );
  return (
    <>
      <h2 id="pruefpartner">{heading}</h2>
      <p>
        Wenn Sie sich als Prüfbetrieb für eine Zusammenarbeit registrieren, verarbeiten wir die Angaben im Formular: Unternehmen,
        Ansprechperson, geschäftliche E-Mail-Adresse, optional Telefonnummer, Kategorien, Einsatzgebiet (Bundesländer, optional
        PLZ-Bereiche), Qualifikationen als Selbstauskunft und optional weitere Angaben dazu, Kapazität (Prüftage pro Monat, Anzahl mobiler
        Teams) und optional eine Nachricht. Außerdem speichern wir die Seite, von der aus Sie das Formular abgesendet haben, die
        Kampagnenparameter (UTM) und die verweisende Website (ohne Parameter), sofern vorhanden, sowie Zeitpunkt und Fassung Ihrer
        Einwilligung. Die Herkunftsangaben merkt sich Ihr Browser nur für die Dauer der Sitzung im Sitzungsspeicher (sessionStorage).
      </p>
      <p>
        <strong>Zweck:</strong> Prüfung Ihrer Angaben und Anbahnung einer operativen Zusammenarbeit als Prüfpartner. Die Registrierung ist
        keine automatische Freigabe und keine Auftragszusage. <strong>Rechtsgrundlage</strong> ist Art. 6 Abs. 1 lit. b DSGVO
        (vorvertragliche Maßnahmen auf Ihre Anfrage); für freiwillige Angaben (Telefonnummer, weitere Qualifikationsangaben, Nachricht)
        Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie jederzeit mit Wirkung für die Zukunft widerrufen können.
      </p>
      <p>
        <strong>Empfänger:</strong> unser Hosting-Anbieter Vercel (siehe Abschnitt 2), unser Datenbankanbieter (Neon bzw. Vercel Postgres)
        als Auftragsverarbeiter sowie der Formulardienst Web3Forms (siehe Abschnitt 3), der uns eine Benachrichtigung per E-Mail zustellt.
        Eine automatische E-Mail an Sie versenden wir nicht; den Eingang Ihrer Registrierung bestätigen wir nur auf der Seite nach dem
        Absenden. Die Benachrichtigung enthält Unternehmen, Ansprechperson, E-Mail-Adresse,
        Kategorien, Einsatzgebiet, Kapazität, Quellseite und Kampagnenparameter, jedoch nicht Ihre freien Angaben zu Qualifikationen und
        Ihre Nachricht. Zur Spam-Abwehr enthält das Formular ein für Menschen unsichtbares Prüffeld. {mark("[PRÜFEN: Spam-Prüfung durch Web3Forms – Wortlaut mit der Datenschutzerklärung von Web3Forms abgleichen]")}
      </p>
      <p>
        <strong>Speicherdauer:</strong> {months} nach dem letzten Statuswechsel Ihrer Bewerbung; danach wird sie automatisch gelöscht.
        Während einer aktiven Partnerschaft speichern wir die Angaben für deren Dauer; endet sie, beginnt die Frist von {monthsDat} erneut.
        Kopien der Benachrichtigungs-E-Mails in unserem Postfach und im Web3Forms-Konto löschen wir nach derselben Frist.
      </p>
      <p>
        <strong>Ihre Rechte:</strong> Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch und
        Widerruf Ihrer Einwilligung (siehe Abschnitt 6). Für Löschanfragen zu Ihrer Bewerbung wenden Sie sich an <a href={`mailto:${DELETION_CONTACT}`}>{DELETION_CONTACT}</a>.
      </p>
    </>
  );
}
