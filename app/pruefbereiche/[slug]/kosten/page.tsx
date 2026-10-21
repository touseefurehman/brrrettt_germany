import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/Subpage";

// Bisher nur für die DGUV-V3-Prüfung – weitere Kostenseiten hier ergänzen.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "dguv-v3-pruefung" }];
}

const path = "/pruefbereiche/dguv-v3-pruefung/kosten";
const title = "Was kostet die DGUV-V3-Prüfung? Preise 2026";
const description =
  "DGUV-V3-Prüfung Kosten: 3–8 € je Gerät, 50–200 € je ortsfester Anlage. Richtwerte 2026, Rechenbeispiel und was den Preis wirklich bewegt.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { url: path, title, description },
};

const prices: [position: string, price: string][] = [
  ["Ortsveränderliche Betriebsmittel, allgemein", "3–8 € je Gerät"],
  ["davon bei rund 10 Geräten", "6–8 € je Gerät"],
  ["davon bei rund 100 Geräten", "3–5 € je Gerät"],
  ["davon ab 500 Geräten", "2–4 € je Gerät"],
  ["Ortsfeste Anlage", "50–200 € je Anlage"],
  ["Stundensatz", "55–80 € netto"],
  ["E-Check Gewerbeeinheit", "200–600 € pauschal"],
  ["Thermografie", "200–500 € je Einsatz"],
  ["Anfahrt", "30–80 €, bei großer Stückzahl oft enthalten"],
];

export default function DguvV3KostenPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          ["Prüfbereiche", "/#pruefbereiche"],
          ["Elektrotechnik", "/pruefbereiche/dguv-v3-pruefung"],
          ["Kosten", path],
        ]}
        kicker="KOSTEN"
        title="Was kostet die DGUV-V3-Prüfung?"
      >
        <p>
          Die Prüfung wird fast immer pro Gerät abgerechnet, nicht pauschal. Der Preis hängt an drei Dingen: der
          Stückzahl, der Art der Anlage und daran, ob die Geräte an einem Ort stehen oder über mehrere Standorte verteilt
          sind.
        </p>
      </PageIntro>

      <section className="section page-width section-tight">
        <h2>Richtwerte 2026</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Richtwert 2026</th>
              </tr>
            </thead>
            <tbody>
              {prices.map(([position, price]) => (
                <tr key={position}>
                  <th scope="row">{position}</th>
                  <td>{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted-note">Marktrichtwerte, regional etwa ± 20 % verschieden.</p>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Ein typischer Standort</h2>
        <p>
          80 ortsveränderliche Geräte zu je 5 € ergeben 400 €. Dazu eine ortsfeste Anlage mit 180 € und 45 € Anfahrt.
          Macht rund 625 € für den Standort. Die Prüfberichte sind dabei üblicherweise enthalten.
        </p>
        <h2>Was den Preis wirklich bewegt</h2>
        <p>
          Der Preis je Gerät fällt mit der Stückzahl deutlich – zwischen 10 und 500 Geräten halbiert er sich. Wer mehrere
          Standorte hat, zahlt deshalb pro Gerät weniger, wenn die Prüfungen gebündelt beauftragt werden statt einzeln je
          Haus.
        </p>
        <p>
          Der zweite Hebel ist die Frist selbst. Wer Intervalle an der Gefährdungsbeurteilung ausrichtet statt pauschal
          halbjährlich zu prüfen, prüft seltener – im Büro bei nachweislich geringer Fehlerquote alle zwei Jahre statt alle
          sechs Monate. Das ist zulässig, wenn es dokumentiert ist. Die Richtwerte je Anlagenart finden Sie in der{" "}
          <Link href="/prueffristen#dguv-v3-pruefung">Prüffristen-Übersicht</Link>.
        </p>
        <h2>Was wir dabei machen</h2>
        <p>
          Wir prüfen nicht selbst. Wir ermitteln, welche Geräte und Anlagen bei Ihnen überhaupt prüfpflichtig sind, holen
          Angebote qualifizierter Prüfpartner ein, stimmen die Termine mit Ihrem Betrieb ab und führen die Nachweise
          zusammen. Bei mehreren Standorten ist das meist der größere Kostenhebel als der Preis je Gerät.{" "}
          <Link href="/pruefbereiche/dguv-v3-pruefung">Mehr zur DGUV-V3-Prüfung</Link>
        </p>
        <p className="muted-note">
          Alle Angaben sind Marktrichtwerte und regional unterschiedlich. Ein belastbarer Preis ergibt sich erst aus der
          Anlagenliste.
        </p>
      </section>

      <CtaBand title="Anlagenliste schicken, belastbaren Preis erhalten." />
    </>
  );
}
