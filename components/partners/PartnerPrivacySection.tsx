import { Fragment } from "react";

/** Datenschutzhinweis zur Registrierung als Prüfpartner. Speicherdauer kommt aus PARTNER_RETENTION_DAYS (Entscheidung von Henryk). */
export default function PartnerPrivacySection({ heading = "3b. Registrierung als Prüfpartner", highlight = false }: { heading?: string; highlight?: boolean }) {
  const days = Number(process.env.PARTNER_RETENTION_DAYS);
  const retention = days > 0 ? `${Math.floor(days)} Tage nach Eingang` : "[PRÜFEN: Speicherdauer]";
  const marker = (text: string) =>
    highlight && text.startsWith("[PRÜFEN") ? (
      <mark style={{ background: "#fde047", color: "#1c1917", padding: "0 3px", borderRadius: 3 }}>{text}</mark>
    ) : (
      <Fragment>{text}</Fragment>
    );
  return (
    <>
      <h2>{heading}</h2>
      <p>
        Wenn Sie sich als Prüfbetrieb für eine Zusammenarbeit registrieren, verarbeiten wir die Angaben im Formular (Unternehmen,
        Ansprechperson, geschäftliche E-Mail-Adresse, Gewerke, Einsatzgebiet, Qualifikationen bzw. Nachweise, Kapazität, optional
        Nachricht sowie die Seite, von der aus Sie das Formular abgesendet haben), um Ihre Eignung zu prüfen und Sie zu kontaktieren.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung einer Zusammenarbeit), im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Die
        Registrierung ist keine automatische Freigabe.
      </p>
      <p>
        Die Angaben landen in einer internen Prüf-Warteschlange (Datenbankanbieter Neon bzw. Vercel Postgres als Auftragsverarbeiter)
        oder werden über den Formulardienst Web3Forms per E-Mail an uns weitergeleitet (siehe Abschnitt 3). Speicherdauer:{" "}
        {marker(retention)}. Danach werden die Angaben gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>
    </>
  );
}
