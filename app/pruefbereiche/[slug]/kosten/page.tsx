import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import { CtaBand, PageIntro } from "@/components/Subpage";
import type { FaqEntry } from "@/lib/content";

// Bisher nur für die DGUV-V3-Prüfung – weitere Kostenseiten hier ergänzen.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "dguv-v3-pruefung" }];
}

/*
 * Quellen (jede Frist und Zahl im Text ist mit einem Kürzel belegt):
 * [V3]   DGUV Vorschrift 3, Fassung 1.1.1997, mit Durchführungsanweisungen (DA) April 1997 –
 *        https://cdn.vbg.de/media/4d4d9675222842eb908cfe7c27afad8b/dld:attachment/DGUV_Vorschrift_3_Elektrische_Anlagen_und_Betriebsmittel.pdf
 * [V4]   DGUV Vorschrift 4 inhaltsgleich, Fassung der Unfallkassen – https://www.komnet.nrw.de/_sitetools/dialog/43654
 * [B2]   § 2 Abs. 6 BetrSichV – https://www.gesetze-im-internet.de/betrsichv_2015/__2.html
 * [B3]   § 3 Abs. 6 BetrSichV – https://www.gesetze-im-internet.de/betrsichv_2015/__3.html
 * [B14]  § 14 Abs. 7 BetrSichV – https://www.gesetze-im-internet.de/betrsichv_2015/__14.html
 * [B22]  § 22 Abs. 1 Nr. 28 BetrSichV – https://www.gesetze-im-internet.de/betrsichv_2015/__22.html
 * [S209] § 209 Abs. 1 Nr. 1, Abs. 3 SGB VII – https://www.gesetze-im-internet.de/sgb_7/__209.html
 * [A25]  § 25 Abs. 1 Nr. 1, Abs. 2 ArbSchG – https://www.gesetze-im-internet.de/arbschg/__25.html
 * [P1]   Anbieterpreise, Clean Invoice, 11.02.2026 –
 *        https://www.clean-invoice.com/elektropruefung/kosten-und-kalkulation-elektropruefung
 * [P2]   Anbieterpreise (GWI mbH, Inventory One, B&K NRW-Arbeitsschutz), industrie-fachwissen.de, 29.09.2026 –
 *        https://industrie-fachwissen.de/werkstatt/dguv-v3-pruefung-ortsveraenderliche-betriebsmittel-fristen-richtwerte-kosten
 * [VDE]  DIN EN 50699 (VDE 0702) seit 01.06.2021, DIN EN 50678 (VDE 0701) seit 01.02.2021, Sekundärquelle –
 *        https://forum-verlag.com/fachwissen/elektrosicherheit-und-elektrotechnik/din-vde-0701-0702-pruefung/
 *        TODO: am Normtext bestätigen, sobald Normenzugang geklärt ist.
 */

const path = "/pruefbereiche/dguv-v3-pruefung/kosten";
const title = "DGUV V3 Prüfung Kosten: Preise je Gerät, Anlage, Anfahrt";
const description =
  "DGUV V3 Prüfung Kosten: 3–8 € je Gerät, 50–450 € je Anlage, plus Anfahrt. Preisspannen, Prüffristen, Rechenbeispiel und Hebel für Betreiber mehrerer Objekte.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { url: path, title, description },
};

// Bei inhaltlichen Änderungen aktualisieren – Preise und Fristen haben einen Stand.
const lastReviewed = "Oktober 2026";

// [P1] [P2] – Anbieterangaben, netto, keine Marktstatistik
const prices: [position: string, price: string, billing: string][] = [
  ["Ortsveränderliches Gerät inkl. Leitung", "3–8 €", "je Gerät"],
  ["davon bei rund 10 Geräten", "6–8 €", "je Gerät"],
  ["davon bei rund 100 Geräten", "3–5 €", "je Gerät"],
  ["davon ab 500 Geräten", "2–4 €", "je Gerät"],
  ["Ortsfeste Maschine oder Verbraucher", "15–90 €", "je Gerät"],
  ["Ortsfeste Anlage (Unterverteilung, Schaltschrank)", "50–450 €", "je Anlage oder nach Aufwand"],
  ["Stundensatz Elektrofachkraft", "55–80 €", "je Stunde"],
  ["Anfahrt", "30–120 €", "je Termin, bei großer Stückzahl oft enthalten"],
  ["Prüfprotokoll", "meist enthalten, sonst 10–50 €", "je Bericht"],
  ["Prüfplakette", "0,30–1,00 €", "je Stück"],
];

// Eigene Rechnung: 300 ortsveränderliche Geräte zu durchschnittlich 5 € (Mittelwert aus [P1] [P2]), ohne Anfahrt
const intervals: [interval: string, perYear: string, cost: string][] = [
  ["6 Monate (Richtwert)", "2", "3.000 €"],
  ["12 Monate (Maximum Werkstatt, Fertigung, Baustelle)", "1", "1.500 €"],
  ["24 Monate (Maximum Büro)", "0,5", "750 €"],
];

const faqs: FaqEntry[] = [
  [
    "Was kostet die DGUV V3 Prüfung pro Gerät?",
    "Für ortsveränderliche Geräte nennen Prüfdienstleister 2026 rund 3 bis 8 Euro netto je Gerät, ab mehreren hundert Geräten auch 2 bis 4 Euro. Ortsfeste Maschinen kosten etwa 15 bis 90 Euro je Gerät, ortsfeste Anlagen wie Unterverteilungen 50 bis 450 Euro. Hinzu kommt in der Regel eine Anfahrtspauschale von 30 bis 120 Euro.",
  ],
  [
    "Wie oft muss nach DGUV V3 geprüft werden?",
    "Die Durchführungsanweisungen zu § 5 DGUV Vorschrift 3 nennen für ortsfeste Anlagen vier Jahre, in Räumen besonderer Art ein Jahr. Für ortsveränderliche Geräte gilt ein Richtwert von sechs Monaten; bei einer Fehlerquote unter 2 Prozent höchstens ein Jahr in Werkstätten oder zwei Jahre in Büros. Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV.",
  ],
  [
    "Darf man die DGUV V3 Prüfung selbst durchführen?",
    "Ortsveränderliche Geräte dürfen elektrotechnisch unterwiesene Personen prüfen, wenn sie geeignete Mess- und Prüfgeräte verwenden und unter Leitung und Aufsicht einer Elektrofachkraft arbeiten. Ortsfeste Anlagen prüft die Elektrofachkraft. Eigenprüfung lohnt sich eher bei großen, räumlich konzentrierten Beständen.",
  ],
  [
    "Was passiert, wenn die DGUV V3 Prüfung fehlt?",
    "Ein Verstoß gegen § 5 DGUV Vorschrift 3 ist nach § 9 der Vorschrift eine Ordnungswidrigkeit, die nach § 209 Abs. 3 SGB VII mit bis zu 10.000 Euro geahndet werden kann. Schwerer wiegt im Schadensfall der fehlende Nachweis, dass ordnungsgemäß geprüft wurde.",
  ],
];

export default function DguvV3KostenPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageIntro
        crumbs={[
          ["Prüfbereiche", "/#pruefbereiche"],
          ["Elektrotechnik", "/pruefbereiche/dguv-v3-pruefung"],
          ["Kosten", path],
        ]}
        kicker="KOSTEN"
        title="DGUV V3 Prüfung: Kosten für Geräte, Anlagen und Anfahrt"
      >
        {/* [P1] [P2] */}
        <p>
          Die DGUV V3 Prüfung kostet nach aktuellen Anbieterangaben rund 3 bis 8 Euro netto je ortsveränderlichem Gerät,
          15 bis 90 Euro je ortsfester Maschine und 50 bis 450 Euro je ortsfester Anlage wie einer Unterverteilung; dazu
          kommen meist 30 bis 120 Euro Anfahrt je Termin. Die Jahreskosten der DGUV V3 Prüfung hängen dabei weniger vom
          Einzelpreis ab als von drei Faktoren: Gerätezahl, Prüffrist und der Frage, wie gut der Bestand vor dem Termin
          erfasst ist.
        </p>
        <p className="page-meta">Stand: {lastReviewed}</p>
      </PageIntro>

      <section className="section page-width section-tight prose">
        <h2>Was die DGUV-V3-Prüfung umfasst</h2>
        {/* [V3] § 5 Abs. 1 Nr. 1 und 2 · [V4] */}
        <p>
          Nach § 5 Abs. 1 DGUV Vorschrift 3 muss der Unternehmer dafür sorgen, dass elektrische Anlagen und Betriebsmittel
          vor der ersten Inbetriebnahme, nach Änderung oder Instandsetzung und in bestimmten Zeitabständen auf ihren
          ordnungsgemäßen Zustand geprüft werden. Die Fristen sind so zu bemessen, dass entstehende Mängel rechtzeitig
          festgestellt werden. Für Kommunen, Schulen und andere Mitglieder der Unfallkassen gilt die inhaltsgleiche DGUV
          Vorschrift 4.
        </p>
        {/* [B3] [B14] */}
        <p>
          Parallel verlangt die Betriebssicherheitsverordnung, dass der Arbeitgeber Art, Umfang und Fristen der Prüfungen in
          der Gefährdungsbeurteilung festlegt (§ 3 Abs. 6 BetrSichV) und die Ergebnisse dokumentiert (§ 14 Abs. 7
          BetrSichV).
        </p>
        {/* [V3] DA zu § 5 Abs. 1 Nr. 2 – Begriffe ortsveränderlich / ortsfest */}
        <p>
          Für die Kalkulation zählt eine Unterscheidung aus den Durchführungsanweisungen zu § 5, weil die drei Gruppen
          unterschiedlich abgerechnet werden. <strong>Ortsveränderliche Betriebsmittel</strong> werden im Betrieb bewegt
          oder lassen sich leicht umsetzen: Wasserkocher, Bürotechnik, Verlängerungsleitungen, Handwerkzeug. Sie werden
          meist je Stück abgerechnet. <strong>Ortsfeste Betriebsmittel</strong> sind fest angebracht oder ohne
          Tragevorrichtung zu schwer zum Umsetzen, etwa Maschinen in der Hausmeisterwerkstatt, Durchlauferhitzer oder
          Großküchengeräte; abgerechnet wird je Gerät oder nach Aufwand. <strong>Elektrische Anlagen</strong> umfassen
          Verteilungen, Installation und Schutzmaßnahmen und werden je Verteilung oder nach Stunden berechnet.
        </p>
        <p>
          Ablauf, Prüfumfang und Zuständigkeiten beschreibt die Seite zur{" "}
          <Link href="/pruefbereiche/dguv-v3-pruefung">DGUV V3 Prüfung</Link>.
        </p>
      </section>

      <section className="section page-width section-tight">
        <h2>Was kostet die DGUV V3 Prüfung? Preise im Überblick</h2>
        <div className="table-wrap">
          <table className="data-table">
            <caption>Preisspannen 2026, netto, Anbieterangaben</caption>
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Spanne netto</th>
                <th scope="col">Abrechnung</th>
              </tr>
            </thead>
            <tbody>
              {prices.map(([position, price, billing]) => (
                <tr key={position}>
                  <th scope="row">{position}</th>
                  <td>{price}</td>
                  <td>{billing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted-note">
          Für Elektroprüfungen gibt es keine amtliche Gebührenordnung. Die Spannen stammen aus veröffentlichten
          Preisangaben von Prüfdienstleistern; regional sind Abweichungen von rund 20 Prozent üblich. Bei kleinen
          Liegenschaften fällt die Anfahrt stärker ins Gewicht als der Gerätepreis.
        </p>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Wovon der Preis abhängt</h2>
        <p>
          <strong>Gerätedichte je Termin.</strong> Ein Verwaltungsgebäude mit 400 Arbeitsplätzen lässt sich an wenigen
          Tagen durchprüfen. Zwanzig verstreute Objekte mit jeweils 15 Geräten erzeugen zwanzig Anfahrten und viel
          Wegezeit, obwohl die Gerätezahl kleiner ist.
        </p>
        <p>
          <strong>Vorbereitung und Zugang.</strong> Fehlen Schlüssel, ist ein Raum belegt oder muss der Prüfer Geräte erst
          suchen, wird nach Zeit abgerechnet oder ein zweiter Termin fällig. Eine Geräteliste mit Standort, Geräteart und
          letztem Prüfdatum ist der wirksamste Einzelhebel.
        </p>
        {/* [V3] § 5 Abs. 1 Nr. 1 */}
        <p>
          <strong>Mängel und Nacharbeit.</strong> Instandsetzungen sind im Prüfpreis nicht enthalten. Nach einer
          Instandsetzung ist vor der Wiederinbetriebnahme erneut zu prüfen (§ 5 Abs. 1 Nr. 1 DGUV Vorschrift 3).
        </p>
        {/* [V3] DA zu § 5 Abs. 1 Nr. 2, Tabelle 1 A */}
        <p>
          <strong>Räume besonderer Art.</strong> Für Anlagen in „Betriebsstätten, Räumen und Anlagen besonderer Art“ nach
          DIN VDE 0100-700 ff. nennt Tabelle 1 A der Durchführungsanweisungen eine Prüffrist von einem Jahr statt vier
          Jahren. Wer solche Bereiche im Bestand hat, lässt die Anlagen dort viermal so oft prüfen.
        </p>

        <h2>Kostentreiber nach Gebäudeart</h2>
        <p>
          <strong>Wohnungsunternehmen.</strong> Geprüft werden vor allem Allgemeinstrom, Gemeinschaftswaschküchen,
          Hausmeisterwerkstätten und Geräte in Geschäftsstellen. Die Gerätezahl je Objekt ist gering, die Zahl der Objekte
          hoch. Den Preis bestimmen Anfahrt und Terminlogistik, deshalb lohnt die Bündelung nach Quartieren.
        </p>
        <p>
          <strong>Öffentliche Verwaltung.</strong> Schulen, Feuerwachen und Bauhöfe haben sehr unterschiedliche Bestände:
          Fachräume und Werkstätten neben Büros, dazu Geräte, die Lehrkräfte oder Vereine mitbringen. Die Zuständigkeit ist
          oft auf Schulträger, Hausmeister und Gebäudemanagement verteilt. Eine Ausschreibung in Losen nach Liegenschaften
          mit einheitlicher Geräteliste macht Angebote vergleichbar.
        </p>
        <p>
          <strong>Krankenhäuser und Pflege.</strong> Medizinisch genutzte Bereiche zählen zu den Räumen besonderer Art, mit
          entsprechend kurzer Anlagenfrist. Medizinprodukte selbst unterliegen eigenen Kontrollen nach der
          Medizinprodukte-Betreiberverordnung (MPBetreibV) und sollten nicht doppelt beauftragt werden. Prüfungen im
          laufenden Betrieb erfordern Termine außerhalb der Kernzeiten; ob dafür Zuschläge anfallen, gehört ins Angebot.
        </p>
      </section>

      <section className="section page-width section-tight">
        <h2>Wie oft geprüft wird und was das für die Jahreskosten heißt</h2>
        <div className="prose">
          {/* [V3] DA zu § 5 Abs. 1 Nr. 2, Tabellen 1 A und 1 B. DA-Text: Fehlerquote „höchstens 2 Prozent“, Tabelle: „< 2 Prozent“ */}
          <p>
            Die Durchführungsanweisungen zu § 5 DGUV Vorschrift 3 nennen für ortsfeste Anlagen und Betriebsmittel eine
            Prüffrist von vier Jahren (Tabelle 1 A). Für ortsveränderliche Betriebsmittel gilt ein Richtwert von sechs
            Monaten, auf Baustellen drei Monate (Tabelle 1 B). Liegt die Fehlerquote bei den Prüfungen unter 2 Prozent,
            kann die Frist verlängert werden: höchstens auf ein Jahr in Werkstätten, Fertigungsstätten und auf Baustellen,
            auf zwei Jahre in Büros oder unter ähnlichen Bedingungen.
          </p>
          {/* [B3] */}
          <p>
            Alle diese Fristen sind Richtwerte. Verbindlich ist die Frist, die in der Gefährdungsbeurteilung so festgelegt
            wird, dass die Arbeitsmittel bis zur nächsten Prüfung sicher verwendet werden können (§ 3 Abs. 6 BetrSichV).
            Die Richtwerte aller Prüfbereiche stehen in der{" "}
            <Link href="/prueffristen#dguv-v3-pruefung">Prüffristen-Übersicht</Link>; wie sich Fristen begründet
            festlegen und verlängern lassen, zeigt der Leitfaden{" "}
            <Link href="/wissen/dguv-v3-prueffristen-organisieren">DGUV-V3-Prüffristen richtig organisieren</Link>.
          </p>
          <p>Wie stark die Frist die Kosten bestimmt, zeigt ein Rechenbeispiel mit 300 Geräten zu durchschnittlich 5 Euro:</p>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <caption>Jahreskosten je nach Prüffrist, eigene Beispielrechnung ohne Anfahrt</caption>
            <thead>
              <tr>
                <th scope="col">Prüffrist ortsveränderliche Geräte</th>
                <th scope="col">Prüfungen pro Jahr</th>
                <th scope="col">Gerätekosten pro Jahr</th>
              </tr>
            </thead>
            <tbody>
              {intervals.map(([interval, perYear, cost]) => (
                <tr key={interval}>
                  <th scope="row">{interval}</th>
                  <td>{perYear}</td>
                  <td>{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted-note">
          Die Verlängerung setzt voraus, dass die Fehlerquote aus früheren Prüfungen belegt ist. Ohne auswertbare
          Protokolle bleibt es beim Richtwert.
        </p>
      </section>

      <section className="section page-width section-tight prose">
        <h2>Wer darf prüfen und wie wirkt sich das auf die Kosten aus</h2>
        {/* [V3] DA zu § 5 Abs. 1 Nr. 2 und Tabelle 1 B · [B2] */}
        <p>
          Die Verantwortung für die Prüfung liegt bei einer Elektrofachkraft. Ortsveränderliche Betriebsmittel dürfen auch
          elektrotechnisch unterwiesene Personen prüfen, wenn sie geeignete Mess- und Prüfgeräte verwenden und unter
          Leitung und Aufsicht einer Elektrofachkraft arbeiten. Die Betriebssicherheitsverordnung spricht von der zur
          Prüfung befähigten Person, die ihre Fachkunde durch Berufsausbildung, Berufserfahrung und zeitnahe berufliche
          Tätigkeit nachweist (§ 2 Abs. 6 BetrSichV).
        </p>
        {/* [V3] § 5 Abs. 2 · [VDE] */}
        <p>
          Geprüft wird nach den elektrotechnischen Regeln (§ 5 Abs. 2 DGUV Vorschrift 3). Für die Wiederholungsprüfung
          ortsveränderlicher Geräte ist das DIN EN 50699 (VDE 0702), für die Prüfung nach Reparatur DIN EN 50678 (VDE
          0701); beide haben die frühere DIN VDE 0701-0702 abgelöst.
        </p>
        <p>
          Daraus ergeben sich zwei Modelle. Beim externen Dienstleister fallen die Kosten aus der Preistabelle an. Bei der
          Eigenprüfung durch unterwiesene Mitarbeiter kommen Prüfgerät, Schulung, Arbeitszeit und eine verantwortliche
          Elektrofachkraft hinzu. Die Eigenprüfung rechnet sich eher bei großen, räumlich konzentrierten Beständen als bei
          vielen kleinen Objekten.
        </p>

        <h2>Was passiert, wenn die Prüfung versäumt wird</h2>
        {/* [V3] § 9 · [S209] · [B22] [A25] */}
        <p>
          Wer vorsätzlich oder fahrlässig gegen § 5 Abs. 1 bis 3 DGUV Vorschrift 3 verstößt, handelt nach § 9 der
          Vorschrift ordnungswidrig im Sinne von § 209 Abs. 1 Nr. 1 SGB VII. Dafür sieht § 209 Abs. 3 SGB VII eine
          Geldbuße bis zu 10.000 Euro vor. Zusätzlich ist es nach § 22 Abs. 1 Nr. 28 BetrSichV ordnungswidrig, ein
          Arbeitsmittel entgegen § 14 Abs. 1 Satz 1 oder Abs. 4 Satz 1 nicht oder nicht rechtzeitig prüfen zu lassen; der
          Bußgeldrahmen nach § 25 Abs. 2 ArbSchG reicht bis 5.000 Euro.
        </p>
        <p>
          Das Bußgeld ist selten der größte Posten. Nach einem Unfall oder Brand wird geprüft, ob die Prüfungen
          nachweisbar durchgeführt wurden. Fehlende Protokolle erschweren diesen Nachweis gegenüber
          Unfallversicherungsträger, Versicherer und Ermittlungsbehörden.
        </p>

        <h2>Kosten senken, ohne Pflichten zu verkürzen</h2>
        <p>
          <strong>Bestand vorab erfassen.</strong> Geräteliste je Liegenschaft mit Raum, Geräteart, Inventarnummer und
          letztem Prüfdatum. Das senkt Suchzeit und macht Angebote vergleichbar.
        </p>
        <p>
          <strong>Termine bündeln.</strong> Objekte nach Region zusammenfassen und an aufeinanderfolgenden Tagen prüfen
          lassen. Bei mehreren Standorten ein Rahmenvertrag mit festen Stückpreisen statt Einzelaufträgen.
        </p>
        <p>
          <strong>Fehlerquote auswerten.</strong> Protokolle so anfordern, dass sich die Fehlerquote je Betriebsbereich
          ablesen lässt. Nur dann lässt sich eine längere Frist begründen.
        </p>
        <p>
          <strong>Bestand bereinigen.</strong> Defekte und ausgemusterte Geräte vor dem Termin aussortieren statt sie
          prüfen zu lassen.
        </p>
        <p>
          <strong>Überschneidungen klären.</strong> Prüfen, ob Wartungsverträge für Aufzüge, Lüftung oder Medizintechnik
          elektrische Prüfungen bereits enthalten.
        </p>

        <h2>Koordination über Gewerke und Standorte</h2>
        <p>
          Die DGUV V3 Prüfung ist bei Betreibern mehrerer Objekte selten das einzige offene Thema. Elektroprüfung,{" "}
          <Link href="/pruefbereiche/brandschutz">Brandschutz</Link>,{" "}
          <Link href="/pruefbereiche/lueftung-klima">Lüftungshygiene nach VDI 6022</Link> und{" "}
          <Link href="/pruefbereiche/aufzugsanlagen">Aufzugsprüfung</Link> laufen mit unterschiedlichen Fristen,
          Dienstleistern und Zuständigen. Kosten entstehen vor allem dort, wo niemand den Gesamtbestand kennt: doppelte
          Anfahrten, verfallene Fristen, fehlende Nachweise. Wir prüfen nicht selbst, sondern ermitteln in einer{" "}
          <Link href="/kontakt">Bestandsaufnahme</Link>, welche Anlagen an welchem Standort welche Prüfpflichten auslösen,
          holen Angebote qualifizierter Prüfpartner ein und führen die Nachweise zusammen.
        </p>
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen zu den Kosten der DGUV V3 Prüfung</h2>
        <FaqList faqs={faqs} />
        <p className="muted-note">
          Dieser Beitrag ersetzt keine Rechtsberatung und keine Gefährdungsbeurteilung. Die genannten Fristen sind
          Richtwerte aus den Durchführungsanweisungen; verbindlich ist die Frist, die der Betreiber in seiner
          Gefährdungsbeurteilung festlegt. Preise sind unverbindliche Anbieterangaben, Stand {lastReviewed}.
        </p>
      </section>

      <CtaBand title="Anlagenliste schicken, belastbaren Preis erhalten." />
    </>
  );
}
