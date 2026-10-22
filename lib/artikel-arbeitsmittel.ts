import type { Article } from "./pages";

// Fachartikel Cluster Arbeitsmittel & Brandschutz – Longtail zu „uvv prüfung“, „feuerlöscher prüfung“ und
// „regalprüfung“ (Anlage A Nr. 2, 5, 7). DGUV V70 §§ 35, 36, 57 und DGUV V68 §§ 7, 37 am BGN-Vorschriftenportal geprüft,
// BetrSichV/ArbStättV am Volltext (gesetze-im-internet.de, Stand 12/2025 bzw. 03/2024).
// Preisangaben mit Quelle und Stichmonat (R-07).

const published = "2026-10-22";

export const arbeitsmittelArticles: Article[] = [
  {
    slug: "uvv-pruefung-fahrzeuge",
    keyword: "uvv prüfung fahrzeuge",
    secondary: ["uvv prüfung pkw", "uvv prüfung firmenwagen", "dguv vorschrift 70 prüfung", "uvv fuhrpark", "fahrerunterweisung"],
    cluster: "Arbeitsmittel & Brandschutz",
    title: "UVV-Prüfung Fahrzeuge: jährlich nach DGUV Vorschrift 70",
    description:
      "UVV-Prüfung für Firmenfahrzeuge nach § 57 DGUV Vorschrift 70: jährliche Sachkundigenprüfung, Abgrenzung zur HU, Fahrerpflichten und Dokumentation.",
    h1: "UVV-Prüfung für Fahrzeuge: Pflichten für Fuhrparks nach DGUV Vorschrift 70",
    kicker: "ARBEITSMITTEL",
    teaser: "Jährliche Sachkundigenprüfung, Unterschied zur Hauptuntersuchung und die Pflichten rund um die Fahrer.",
    published,
    modified: published,
    lead: [
      "Fahrzeuge, die im Betrieb eingesetzt werden, sind nach § 57 Abs. 1 DGUV Vorschrift 70 bei Bedarf, mindestens jedoch einmal jährlich durch einen Sachkundigen auf ihren betriebssicheren Zustand zu prüfen. Das Ergebnis ist schriftlich festzuhalten und mindestens bis zur nächsten Prüfung aufzubewahren (§ 57 Abs. 2). Die Hauptuntersuchung nach StVZO deckt nur den verkehrssicheren Teil ab.",
    ],
    blocks: [
      { type: "h2", text: "Was die UVV-Prüfung bei Fahrzeugen umfasst", id: "umfang" },
      {
        type: "definition",
        term: "Betriebssicherer Zustand",
        text: "Verkehrssicherer und arbeitssicherer Zustand des Fahrzeugs zusammen. Arbeitssicher betrifft alles, was bei der Arbeit mit dem Fahrzeug Gefahren verursachen kann: Aufbauten, Ladungssicherung, Hubladebühnen, Aufstiege, Warnkleidung, Verbandkasten, Beleuchtung von Arbeitsbereichen.",
      },
      {
        type: "p",
        text: "Nach den Durchführungsanweisungen zu § 57 DGUV Vorschrift 70 gilt der verkehrssichere Teil als geprüft, wenn ein mängelfreies Ergebnis einer Sachverständigenprüfung nach StVZO vorliegt. Der arbeitssichere Teil muss trotzdem durch einen Sachkundigen geprüft werden. Grundsätze für die Prüfung beschreibt der DGUV Grundsatz 314-003.",
      },
      { type: "h2", text: "Wer verpflichtet ist", id: "pflicht" },
      {
        type: "p",
        text: "Der Unternehmer, dessen Versicherte das Fahrzeug im Betrieb führen oder damit arbeiten – unabhängig davon, ob es gekauft, geleast oder gemietet ist. Das betrifft Dienstwagen von Wohnungsunternehmen, Fahrzeuge von Bauhöfen und Hausmeisterdiensten ebenso wie Transporter von Pflegediensten. Bei Leasingfahrzeugen bleibt die Prüfpflicht beim Unternehmen, das die Fahrzeuge einsetzt.",
      },
      { type: "h2", text: "Fristen und Pflichten im Überblick", id: "fristen" },
      {
        type: "table",
        head: ["Pflicht", "Wer", "Frist", "Fundstelle"],
        rows: [
          ["Prüfung auf betriebssicheren Zustand", "Sachkundiger", "bei Bedarf, mindestens einmal jährlich", "§ 57 Abs. 1 DGUV Vorschrift 70"],
          ["Dokumentation des Ergebnisses", "Unternehmer", "aufbewahren mindestens bis zur nächsten Prüfung", "§ 57 Abs. 2 DGUV Vorschrift 70"],
          ["Kontrolle der Betätigungs- und Sicherheitseinrichtungen", "Fahrzeugführer", "vor Beginn jeder Arbeitsschicht", "§ 36 Abs. 1 DGUV Vorschrift 70"],
          ["Bestimmung und Eignung der Fahrer", "Unternehmer", "vor dem selbstständigen Führen", "§ 35 Abs. 1 DGUV Vorschrift 70"],
          ["Unterweisung der Beschäftigten", "Unternehmer", "mindestens einmal jährlich", "§ 4 Abs. 1 DGUV Vorschrift 1"],
          ["Hauptuntersuchung", "Prüforganisation", "nach StVZO, je nach Fahrzeugart", "§ 29 StVZO"],
        ],
      },
      {
        type: "p",
        text: "„Mindestens einmal jährlich“ ist eine Höchstfrist. Bei starkem Einsatz, Schichtbetrieb oder Aufbauten wie Hubladebühnen kann die Gefährdungsbeurteilung kürzere Abstände verlangen (§ 3 Abs. 6 BetrSichV). Bedarf für eine zusätzliche Prüfung besteht außerdem nach Unfällen oder Umbauten.",
      },
      { type: "h2", text: "Wer die Prüfung durchführen darf", id: "pruefer" },
      {
        type: "p",
        text: "Ein Sachkundiger, also eine Person, die aufgrund ihrer Ausbildung und Erfahrung ausreichende Kenntnisse über Fahrzeuge hat und deren betriebssicheren Zustand beurteilen kann – im Sinne der BetrSichV eine zur Prüfung befähigte Person (§ 2 Abs. 6 BetrSichV, TRBS 1203). In der Praxis sind das Kfz-Meister oder geschulte Werkstattmitarbeiter. Viele Werkstätten bieten die Prüfung zusammen mit der Inspektion an. Mehr zu den Begriffen: [Befähigte Person nach TRBS 1203](/wissen/befaehigte-person-trbs-1203).",
      },
      { type: "h2", text: "Pflichten rund um die Fahrer", id: "fahrer" },
      {
        type: "checklist",
        items: [
          "Fahrer mindestens 18 Jahre alt, körperlich und geistig geeignet, im Führen unterwiesen, Befähigung nachgewiesen (§ 35 Abs. 1 DGUV Vorschrift 70)",
          "Fahrer vom Unternehmer ausdrücklich zum Führen bestimmt – die Durchführungsanweisungen empfehlen die Schriftform",
          "Regelmäßige Kontrolle der Fahrerlaubnis; wer als Halter das Fahren ohne Fahrerlaubnis anordnet oder zulässt, macht sich nach § 21 StVG strafbar",
          "Jährliche Unterweisung zu Ladungssicherung, Verhalten bei Pannen und Unfällen (§ 4 DGUV Vorschrift 1)",
          "Kontrolle vor Schichtbeginn und Meldung von Mängeln durch den Fahrer (§ 36 DGUV Vorschrift 70)",
        ],
      },
      { type: "h2", text: "Was die UVV-Prüfung kostet", id: "kosten" },
      {
        type: "p",
        text: "Für die UVV-Prüfung gibt es keine amtliche Gebührenordnung. Werkstätten berechnen sie meist als Pauschale je Fahrzeug, häufig im Paket mit Inspektion oder Hauptuntersuchung. Bei verteilten Standorten ist entscheidend, ob die Fahrzeuge zur Werkstatt kommen oder ein mobiler Prüfer vor Ort prüft. Belastbare Preise ergeben sich aus Angeboten für den konkreten Fuhrpark.",
      },
      {
        type: "example",
        title: "Wohnungsunternehmen mit 34 Fahrzeugen an vier Standorten",
        text: [
          "Hausmeisterdienst, Regiebetrieb und Kundenbetreuung nutzen Pkw, Transporter und zwei Pritschenwagen mit Ladekran. Die Hauptuntersuchungen liefen über das Leasing, eine UVV-Prüfung fand nicht statt; Fahrerlaubnisse wurden bei Einstellung einmal kontrolliert.",
          "Neu: jährliche UVV-Prüfung aller Fahrzeuge, terminiert zusammen mit der Inspektion; halbjährliche Führerscheinkontrolle; schriftliche Bestimmung der Fahrer; jährliche Unterweisung. Die Ladekrane werden zusätzlich als Krane nach DGUV Vorschrift 52 geprüft – das deckt die Fahrzeugprüfung nicht ab.",
        ],
      },
      { type: "h2", text: "Folgen einer fehlenden Prüfung", id: "folgen" },
      {
        type: "p",
        text: "Verstöße gegen Unfallverhütungsvorschriften können nach § 209 Abs. 1 Nr. 1 SGB VII mit einer Geldbuße bis zu 10.000 Euro geahndet werden, soweit die Vorschrift darauf verweist. Nach einem Arbeitsunfall mit einem Dienstfahrzeug prüft die Berufsgenossenschaft, ob Prüfung, Fahrerauswahl und Unterweisung nachgewiesen sind. Die übrigen UVV-Prüfungen – Stapler, Krane, Tore – stehen auf der Seite [UVV-Prüfung](/uvv-pruefung).",
      },
      { type: "h2", text: "Was der Sachkundige prüft", id: "pruefumfang" },
      {
        type: "table",
        caption: "Typische Prüfpunkte des arbeitssicheren Zustands (Auswahl)",
        head: ["Bereich", "Beispiele"],
        rows: [
          ["Ladungssicherung", "Zurrpunkte, Zurrmittel, Trennwände, Ladungssicherungsnetze"],
          ["Aufbauten", "Kofferaufbau, Pritsche, Regalsysteme im Transporter, Dachträger"],
          ["Hubladebühne und Ladekran", "Funktion, Sicherungen, Kennzeichnung – Ladekrane zusätzlich als Kran prüfen"],
          ["Aufstiege und Haltegriffe", "Zustand, Befestigung, Trittsicherheit"],
          ["Sicherheitsausrüstung", "Warnweste, Warndreieck, Verbandkasten, Feuerlöscher falls vorhanden"],
          ["Sondereinrichtungen", "Rundumkennleuchten, Anhängekupplung, Seilwinde"],
        ],
      },
      {
        type: "p",
        text: "Die Prüfpunkte hängen vom Fahrzeug und seinem Einsatz ab. Ein Dienstwagen für Kundentermine hat kaum arbeitsspezifische Ausrüstung; ein Transporter des Hausmeisterdienstes mit Regaleinbau, Dachleiter und Werkzeug dagegen viel. Der DGUV Grundsatz 314-003 gibt Sachkundigen dafür eine Struktur vor.",
      },
      { type: "h2", text: "Fuhrpark über mehrere Standorte organisieren", id: "standorte" },
      {
        type: "steps",
        items: [
          "Fahrzeugliste mit Kennzeichen, Standort, Nutzergruppe und Aufbauten anlegen.",
          "Hauptuntersuchung, UVV-Prüfung und Inspektion je Fahrzeug in einen gemeinsamen Termin legen.",
          "Fahrer je Fahrzeug bestimmen und die Bestimmung dokumentieren.",
          "Führerscheinkontrolle mit festem Rhythmus und Nachweis organisieren.",
          "Prüfnachweise zentral ablegen, nicht im Handschuhfach.",
        ],
      },
      {
        type: "p",
        text: "In Kommunen mit Bauhof, Feuerwehr und Verwaltung oder bei Wohnungsunternehmen mit mehreren Servicestützpunkten verteilt sich der Fuhrpark auf viele Verantwortliche. Eine zentrale Liste mit allen Fälligkeiten verhindert, dass ein Fahrzeug wegen eines Standortwechsels aus dem Prüfzyklus fällt.",
      },
      { type: "h2", text: "Häufige Lücken im Fuhrpark", id: "luecken" },
      {
        type: "checklist",
        items: [
          "UVV-Prüfung wird mit der Hauptuntersuchung verwechselt und fällt deshalb aus",
          "Leasingfahrzeuge gelten als „Sache des Leasinggebers“",
          "Poolfahrzeuge ohne bestimmte Fahrer – jeder fährt, niemand ist beauftragt",
          "Führerscheinkontrolle nur bei der Einstellung",
          "Prüfnachweise liegen im Fahrzeug und gehen bei Unfall oder Diebstahl verloren",
        ],
      },
      {
        type: "p",
        text: "Poolfahrzeuge verdienen besondere Aufmerksamkeit. Wenn viele Beschäftigte ein Fahrzeug abwechselnd nutzen, muss trotzdem jede Person zum Führen bestimmt und unterwiesen sein, und die Kontrolle vor Schichtbeginn nach § 36 DGUV Vorschrift 70 muss jede Person kennen. Ein Fahrtenbuch oder eine Buchungssoftware mit hinterlegter Fahrerliste macht nachvollziehbar, wer das Fahrzeug wann geführt hat. So lässt sich bei einem Mangel feststellen, ob er gemeldet wurde, und bei einem Unfall belegen, dass nur beauftragte und unterwiesene Personen gefahren sind.",
      },
      {
        type: "p",
        text: "Für Kommunen gilt dasselbe: Fahrzeuge von Bauhof, Ordnungsamt, Feuerwehr und Schulhausmeistern unterliegen der Prüfpflicht, die Unfallkasse wendet die Vorschrift entsprechend an. Eine Liste aller Fahrzeuge der Verwaltung gehört deshalb in das zentrale Fristenwesen.",
      },
    ],
    faqs: [
      [
        "Ist die UVV-Prüfung für Firmenfahrzeuge Pflicht?",
        "Ja. Nach § 57 DGUV Vorschrift 70 sind Fahrzeuge bei Bedarf, mindestens jedoch einmal jährlich durch einen Sachkundigen auf ihren betriebssicheren Zustand zu prüfen.",
      ],
      [
        "Ersetzt die Hauptuntersuchung die UVV-Prüfung?",
        "Nein. Ein mängelfreies Ergebnis der Hauptuntersuchung deckt den verkehrssicheren Zustand ab. Der arbeitssichere Zustand muss zusätzlich durch einen Sachkundigen geprüft werden.",
      ],
      [
        "Wer darf die UVV-Prüfung bei Fahrzeugen durchführen?",
        "Ein Sachkundiger mit ausreichenden Kenntnissen über Fahrzeuge, in der Praxis meist ein Kfz-Meister oder geschulter Werkstattmitarbeiter. Im Sinne der BetrSichV ist das eine zur Prüfung befähigte Person.",
      ],
      [
        "Muss der Führerschein von Mitarbeitern kontrolliert werden?",
        "Wer als Halter das Fahren ohne Fahrerlaubnis anordnet oder zulässt, macht sich nach § 21 StVG strafbar. Eine regelmäßige, dokumentierte Kontrolle ist deshalb üblich; die Häufigkeit legt das Unternehmen fest.",
      ],
      [
        "Was gehört zur UVV-Prüfung bei einem Transporter mit Regaleinbau?",
        "Neben Fahrzeug und Ausrüstung prüft der Sachkundige den Regaleinbau, die Ladungssicherung, Aufstiege und gegebenenfalls Dachträger und Leitern, also alles, was den arbeitssicheren Zustand betrifft.",
      ],
    ],
    sources: [
      ["DGUV V70", "§ 35 Abs. 1, § 36 Abs. 1 und 2, § 57 Abs. 1 und 2 mit Durchführungsanweisungen"],
      ["DGUV G 314-003", "Prüfgrundsätze"],
      ["DGUV V1", "§ 4 Abs. 1 (Unterweisung)"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["SGB VII", "§ 209 Abs. 1 Nr. 1, Abs. 3"],
    ],
    related: [
      ["UVV-Prüfung", "/uvv-pruefung", "Alle UVV-Prüfungen"],
      ["UVV-Prüfung Stapler", "/wissen/uvv-pruefung-stapler", "Flurförderzeuge"],
      ["Befähigte Person nach TRBS 1203", "/wissen/befaehigte-person-trbs-1203", "Sachkundige"],
      ["Betreiberpflichten Wohnungsunternehmen", "/betreiberpflichten/wohnungsunternehmen", "Regiebetriebe"],
    ],
    cta: "UVV-Prüfungen für den gesamten Fuhrpark planen.",
  },
  {
    slug: "uvv-pruefung-stapler",
    keyword: "uvv prüfung stapler",
    secondary: ["uvv prüfung gabelstapler", "flurförderzeuge prüfung", "dguv vorschrift 68", "staplerschein beauftragung", "stapler prüfung jährlich"],
    cluster: "Arbeitsmittel & Brandschutz",
    title: "UVV-Prüfung Stapler: jährlich nach DGUV Vorschrift 68",
    description:
      "UVV-Prüfung für Gabelstapler nach § 37 DGUV Vorschrift 68: jährliche Sachkundigenprüfung mit Anbaugeräten, schriftliche Fahrerbeauftragung.",
    h1: "UVV-Prüfung für Stapler: Prüfung, Fahrerbeauftragung und Dokumentation",
    kicker: "ARBEITSMITTEL",
    teaser: "Jährliche Prüfung nach § 37 DGUV Vorschrift 68 – und warum die schriftliche Beauftragung der Fahrer genauso wichtig ist.",
    published,
    modified: published,
    lead: [
      "Gabelstapler und andere Flurförderzeuge sind nach § 37 Abs. 1 DGUV Vorschrift 68 in Abständen von längstens einem Jahr durch einen Sachkundigen zu prüfen – einschließlich ihrer Anbaugeräte. Fahrer von Flurförderzeugen mit Fahrersitz oder Fahrerstand müssen mindestens 18 Jahre alt, ausgebildet und vom Unternehmer schriftlich beauftragt sein (§ 7 Abs. 1).",
    ],
    blocks: [
      { type: "h2", text: "Was geprüft wird", id: "umfang" },
      {
        type: "definition",
        term: "Flurförderzeuge",
        text: "Fördermittel, die ihrer Bauart nach dem Befördern, Ziehen, Schieben, Heben, Stapeln oder Einlagern von Lasten dienen und auf Flur, also nicht auf Schienen, fahren – etwa Gabelstapler, Schubmaststapler, Kommissionierer und Hubwagen mit Fahrantrieb.",
      },
      {
        type: "p",
        text: "Die Prüfung umfasst das Fahrzeug, die Anbaugeräte – auch solche, die nicht fest mit dem Stapler verbunden sind – und, in Schmalganglagern, die zugehörigen Sicherheitseinrichtungen. Geprüft werden unter anderem Bremsen, Lenkung, Hubgerüst, Ketten, Gabeln, Hydraulik, Fahrerschutzdach und Rückhaltesysteme.",
      },
      { type: "h2", text: "Wer verpflichtet ist", id: "pflicht" },
      {
        type: "p",
        text: "Der Unternehmer, der den Stapler einsetzt – auch bei Miet- oder Leasinggeräten. Betroffen sind nicht nur Logistiker: Bauhöfe, Wertstoffhöfe, Werkstätten von Wohnungsunternehmen, Klinikversorgung und Großküchen arbeiten ebenfalls mit Flurförderzeugen.",
      },
      { type: "h2", text: "Fristen und Pflichten", id: "fristen" },
      {
        type: "table",
        head: ["Pflicht", "Wer", "Frist", "Fundstelle"],
        rows: [
          ["Prüfung von Stapler und Anbaugeräten", "Sachkundiger", "längstens 1 Jahr", "§ 37 Abs. 1 DGUV Vorschrift 68"],
          ["Funktionsprüfung von Schmalgang-Sicherheitseinrichtungen", "Fahrer bzw. Betrieb", "täglich, sofern Ausfall nicht automatisch angezeigt wird", "§ 37 Abs. 2 DGUV Vorschrift 68"],
          ["Schriftliche Beauftragung des Fahrers", "Unternehmer", "vor dem selbstständigen Steuern", "§ 7 Abs. 1 DGUV Vorschrift 68"],
          ["Kontrolle auf offensichtliche Mängel", "Fahrer", "vor jeder Verwendung", "§ 4 Abs. 5 BetrSichV"],
          ["Unterweisung", "Unternehmer", "mindestens einmal jährlich", "§ 4 Abs. 1 DGUV Vorschrift 1"],
        ],
      },
      { type: "h2", text: "Wer prüfen und wer fahren darf", id: "personen" },
      {
        type: "p",
        text: "Die Prüfung führt ein Sachkundiger für Flurförderzeuge durch, im Sinne der BetrSichV eine zur Prüfung befähigte Person (§ 2 Abs. 6 BetrSichV, TRBS 1203). Für die Fahrer gilt § 7 DGUV Vorschrift 68: Das selbstständige Steuern von Staplern mit Fahrersitz oder Fahrerstand darf nur Personen übertragen werden, die mindestens 18 Jahre alt, geeignet und ausgebildet sind und ihre Befähigung nachgewiesen haben; der Auftrag muss schriftlich erteilt werden. Für Mitgänger-Flurförderzeuge genügen Eignung und Unterweisung (§ 7 Abs. 2).",
      },
      {
        type: "checklist",
        items: [
          "Ausbildungsnachweis mit Theorie- und Praxisprüfung (der sogenannte Staplerschein)",
          "Gerätespezifische Einweisung und betriebsbezogene Unterweisung vor der Beauftragung",
          "Schriftlicher Fahrauftrag, gültig nur für den jeweiligen Betrieb",
          "Arbeitsmedizinische Beurteilung der Eignung, wie in den Durchführungsanweisungen empfohlen",
          "Rücknahme der Beauftragung erwägen, wenn über längere Zeit keine Fahrpraxis besteht",
        ],
      },
      { type: "h2", text: "Was die Prüfung kostet", id: "kosten" },
      {
        type: "p",
        text: "Eine Gebührenordnung gibt es nicht. Prüfdienste und Händler berechnen meist eine Pauschale je Gerät zuzüglich Anfahrt; Mängelbehebung und Ersatzteile kommen hinzu. Bei Staplern an mehreren Standorten lohnt ein gemeinsamer Prüftermin je Standort, idealerweise gekoppelt an die Wartung.",
      },
      {
        type: "example",
        title: "Klinikverbund mit Zentrallager und Wirtschaftsbetrieben",
        text: [
          "Im Zentrallager, in der Wäscherei und in zwei Küchen sind elf Flurförderzeuge im Einsatz, davon drei Mitgängergeräte. Die Prüfplaketten waren aktuell, aber für vier Fahrer der Küche lag kein schriftlicher Fahrauftrag vor; zwei hatten keinen Ausbildungsnachweis.",
          "Die Fahrer werden nachgeschult und schriftlich beauftragt, Aufträge und Prüfnachweise liegen zentral beim Betreibermanagement. Die jährliche Prüfung aller Geräte erfolgt in einer Woche im ersten Quartal.",
        ],
      },
      { type: "h2", text: "Folgen bei Versäumnissen", id: "folgen" },
      {
        type: "p",
        text: "Staplerunfälle gehören zu den schweren Arbeitsunfällen im Lager. Fehlen Prüfnachweis oder schriftlicher Fahrauftrag, ist das ein Verstoß gegen die Unfallverhütungsvorschrift, der nach § 209 SGB VII bußgeldbewehrt sein kann. Im Schadensfall wird außerdem gefragt, ob die Regale im Fahrbereich geprüft waren: [Regalprüfung](/regalpruefung). Alle übrigen Arbeitsmittel: [UVV-Prüfung](/uvv-pruefung).",
      },
      { type: "h2", text: "Was bei der Staplerprüfung kontrolliert wird", id: "pruefpunkte" },
      {
        type: "table",
        caption: "Typische Prüfpunkte (Auswahl)",
        head: ["Baugruppe", "Prüfung auf"],
        rows: [
          ["Gabelzinken und Gabelträger", "Verschleiß, Risse, Verformung, Arretierung"],
          ["Hubgerüst und Ketten", "Verschleiß, Längung, Schmierung, Befestigung"],
          ["Hydraulik", "Dichtheit, Schläuche, Funktion der Senkbremse"],
          ["Bremsen und Lenkung", "Wirkung, Spiel, Feststellbremse"],
          ["Fahrerschutzdach und Rückhaltesystem", "Zustand, Befestigung, Sicherheitsgurt oder Bügel"],
          ["Elektrik und Antrieb", "Batterie, Ladeeinrichtung, Not-Aus, Warneinrichtungen"],
          ["Anbaugeräte", "Klammern, Schieber, Drehgeräte, Arbeitsbühnen – gesondert"],
        ],
      },
      {
        type: "p",
        text: "Nach bestandener Prüfung erhält der Stapler in der Praxis eine Prüfplakette mit dem nächsten Termin; das Prüfergebnis wird schriftlich dokumentiert. Mängel, die die Betriebssicherheit gefährden, führen zur Stilllegung bis zur Instandsetzung.",
      },
      { type: "h2", text: "Häufige Lücken in der Praxis", id: "luecken" },
      {
        type: "checklist",
        items: [
          "Anbaugeräte nicht mitgeprüft, weil sie getrennt vom Stapler gelagert werden",
          "Gemietete Kurzzeitgeräte ohne Prüfnachweis im Einsatz",
          "Fahrauftrag nur mündlich oder für einen anderen Betrieb erteilt",
          "Mitarbeitende fahren gelegentlich, ohne ausgebildet zu sein – etwa bei Engpässen in der Küche oder Wäscherei",
          "Keine regelmäßige Fahrpraxis, aber unveränderter Fahrauftrag",
        ],
      },
      { type: "h2", text: "Stapler an mehreren Standorten", id: "standorte" },
      {
        type: "p",
        text: "Bei Kommunen und sozialen Trägern stehen Stapler oft einzeln in Bauhöfen, Wertstoffhöfen, Lagern und Küchen. Jeder Standort beauftragt seinen Händler, und die Fahrerbeauftragungen liegen in verschiedenen Personalakten. Eine zentrale Liste mit Gerät, Standort, Prüfdatum, Anbaugeräten und beauftragten Fahrern schafft Überblick. Die jährliche Prüfung aller Geräte lässt sich dann je Region bündeln, und Fahrauftrag und Unterweisung werden im selben Rhythmus erneuert.",
      },
      {
        type: "table",
        caption: "Beispiel einer zentralen Staplerliste",
        head: ["Gerät", "Standort", "Letzte Prüfung", "Anbaugeräte", "Beauftragte Fahrer"],
        rows: [
          ["Frontstapler 2,5 t", "Bauhof Nord", "03/2026", "Schaufel, Kehrbesen", "4"],
          ["Elektro-Hubwagen mit Fahrerstand", "Zentralküche", "05/2026", "–", "3"],
          ["Schubmaststapler", "Zentrallager", "01/2026", "Seitenschieber", "6"],
        ],
      },
      { type: "h2", text: "Ausbildung und Beauftragung der Fahrer im Detail", id: "ausbildung" },
      {
        type: "p",
        text: "Die Durchführungsanweisungen zu § 7 DGUV Vorschrift 68 beschreiben, was die Befähigung ausmacht: eine Ausbildung nach dem einschlägigen DGUV-Grundsatz mit bestandener theoretischer und praktischer Prüfung. Vor der schriftlichen Beauftragung kommen eine Einweisung in das konkrete Gerät und eine Unterweisung zu den betrieblichen Gegebenheiten hinzu – etwa Fahrwege, Gefahrstellen, Tore und Rampen. Die Beauftragung gilt nur für den jeweiligen Betrieb; wer von einem anderen Arbeitgeber einen Staplerschein mitbringt, wird neu eingewiesen und beauftragt. Fehlt über längere Zeit regelmäßige Fahrpraxis, empfehlen die Durchführungsanweisungen, die Beauftragung zurückzunehmen.",
      },
      {
        type: "table",
        head: ["Schritt", "Inhalt", "Nachweis"],
        rows: [
          ["Ausbildung", "Theorie und Praxis mit Prüfung", "Ausbildungsnachweis"],
          ["Eignung", "körperlich und geistig geeignet", "arbeitsmedizinische Beurteilung empfohlen"],
          ["Einweisung", "konkretes Gerät", "Unterschrift"],
          ["Unterweisung", "betriebliche Gegebenheiten", "Unterweisungsnachweis, jährlich wiederholen"],
          ["Beauftragung", "schriftlich, für den Betrieb", "Fahrauftrag"],
        ],
      },
      {
        type: "p",
        text: "Für die Dokumentation reicht eine einfache Struktur: je Gerät die Prüfnachweise der letzten Jahre, je Fahrer Ausbildungsnachweis, Einweisung, Unterweisungen und Fahrauftrag. Wer diese Unterlagen zentral führt, kann bei einer Begehung der Berufsgenossenschaft oder nach einem Unfall innerhalb kurzer Zeit belegen, dass Gerät und Fahrer den Anforderungen entsprachen. Bei Kliniken, Kommunen und sozialen Trägern mit vielen Einrichtungen ist das der eigentliche Engpass – nicht die Prüfung selbst.",
      },
      {
        type: "p",
        text: "Ein Hinweis zu Mietgeräten: Wer für Inventuren, Umzüge oder Saisonspitzen kurzfristig Stapler mietet, sollte sich den aktuellen Prüfnachweis vom Vermieter vorlegen lassen und ihn zu den eigenen Unterlagen nehmen. Die Fahrer müssen auch für das Mietgerät eingewiesen und beauftragt sein – der vorhandene Fahrauftrag für das eigene Gerät deckt einen anderen Gerätetyp nicht automatisch ab. Gerade bei Umzügen von Verwaltungen und Archiven, bei denen Fremdpersonal und eigene Beschäftigte gemeinsam arbeiten, sollte vorab feststehen, wer welches Gerät fahren darf.",
      },
    ],
    faqs: [
      [
        "Wie oft muss ein Gabelstapler geprüft werden?",
        "In Abständen von längstens einem Jahr durch einen Sachkundigen, einschließlich der Anbaugeräte (§ 37 Abs. 1 DGUV Vorschrift 68). Die Gefährdungsbeurteilung kann kürzere Abstände verlangen.",
      ],
      [
        "Braucht ein Staplerfahrer eine schriftliche Beauftragung?",
        "Ja, für Flurförderzeuge mit Fahrersitz oder Fahrerstand. Der Auftrag muss nach § 7 Abs. 1 DGUV Vorschrift 68 schriftlich erteilt werden; der Fahrer muss mindestens 18 Jahre alt, geeignet und ausgebildet sein.",
      ],
      [
        "Gilt die UVV-Prüfung auch für Hubwagen?",
        "Für Hubwagen mit Fahrantrieb ja, sie sind Flurförderzeuge. Für die Fahrer von Mitgänger-Flurförderzeugen genügen Eignung und Unterweisung.",
      ],
      [
        "Wer prüft gemietete Stapler?",
        "Die Prüfpflicht liegt beim Unternehmen, das den Stapler einsetzt. Ob der Vermieter die Prüfung übernimmt, sollte im Mietvertrag geregelt und durch einen Prüfnachweis belegt sein.",
      ],
      [
        "Gilt ein Staplerschein auch beim neuen Arbeitgeber?",
        "Der Ausbildungsnachweis bleibt gültig, die Beauftragung nicht: Sie gilt nur für den jeweiligen Betrieb. Der neue Arbeitgeber weist in das Gerät ein, unterweist zu den betrieblichen Gegebenheiten und beauftragt schriftlich.",
      ],
    ],
    sources: [
      ["DGUV V68", "§ 7 Abs. 1 und 2, § 37 Abs. 1 und 2 mit Durchführungsanweisungen"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6, § 4 Abs. 5"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["DGUV V1", "§ 4 Abs. 1"],
      ["SGB VII", "§ 209"],
    ],
    related: [
      ["UVV-Prüfung", "/uvv-pruefung", "Alle UVV-Prüfungen"],
      ["Regalprüfung", "/regalpruefung", "Lagereinrichtungen"],
      ["UVV-Prüfung Fahrzeuge", "/wissen/uvv-pruefung-fahrzeuge", "Fuhrpark"],
      ["Betreiberverantwortung Krankenhäuser", "/betreiberpflichten/krankenhaeuser", "Klinikversorgung"],
    ],
    cta: "Stapler, Fahrer und Regale in einem Plan führen.",
  },
  {
    slug: "feuerloescher-pruefung-wie-oft",
    keyword: "feuerlöscher prüfung wie oft",
    secondary: ["feuerlöscher prüfintervall", "feuerlöscher alle 2 jahre", "feuerlöscher wartungsintervall", "feuerlöscher prüfplakette abgelaufen"],
    cluster: "Arbeitsmittel & Brandschutz",
    title: "Feuerlöscher-Prüfung: Wie oft? Fristen nach ASR A2.2",
    description:
      "Wie oft müssen Feuerlöscher geprüft werden? Mindestens alle zwei Jahre nach ASR A2.2 und DIN 14406-4, kürzere Intervalle, Prüfung nach Gebrauch.",
    h1: "Feuerlöscher-Prüfung: Wie oft Feuerlöscher geprüft werden müssen",
    kicker: "BRANDSCHUTZ",
    teaser: "Die Zwei-Jahres-Frist, wann sie kürzer wird und was zwischen den Prüfungen zu tun ist.",
    areas: ["brandschutz"],
    published,
    modified: published,
    lead: [
      "Feuerlöscher in Arbeitsstätten müssen regelmäßig, mindestens alle zwei Jahre, durch einen Sachkundigen instand gehalten und auf ihre Funktionsfähigkeit geprüft werden. Grundlage sind § 4 Abs. 3 ArbStättV, die ASR A2.2 und DIN 14406-4. Bei erhöhter Beanspruchung, nach Gebrauch oder Beschädigung ist früher zu prüfen.",
    ],
    blocks: [
      { type: "h2", text: "Die Fristen im Überblick", id: "fristen" },
      {
        type: "table",
        head: ["Anlass", "Frist", "Durch", "Fundstelle"],
        rows: [
          ["Regelmäßige Instandhaltung", "mindestens alle 2 Jahre", "Sachkundiger", "ASR A2.2; DIN 14406-4; § 4 Abs. 3 ArbStättV"],
          ["Erhöhte Beanspruchung (Außenbereich, Fahrzeuge, Staub, Feuchtigkeit)", "kürzer – nach Gefährdungsbeurteilung", "Sachkundiger", "ASR A2.2; § 3 BetrSichV"],
          ["Nach Gebrauch, auch teilweiser Entleerung", "unverzüglich", "Sachkundiger", "DIN 14406-4"],
          ["Nach Beschädigung oder bei Mängeln", "unverzüglich", "Sachkundiger", "§ 4 Abs. 1 ArbStättV"],
          ["Druckgeräte-Prüfungen bei Dauerdrucklöschern", "nach Einstufung des Druckgeräts – keine einheitliche Frist", "zur Prüfung befähigte Person", "BetrSichV Anhang 2 Abschnitt 4"],
        ],
      },
      {
        type: "p",
        text: "Die zwei Jahre sind eine Höchstfrist, kein Richtwert. Kürzere Herstellerfristen gehen vor. Für Druckgeräte-Prüfungen an Dauerdrucklöschern hängt die Frist von der Einstufung des Geräts ab; sie ist für das konkrete Modell festzustellen und nicht pauschal anzugeben.",
      },
      { type: "h2", text: "Was zwischen den Prüfungen zu tun ist", id: "zwischen" },
      {
        type: "checklist",
        items: [
          "Regelmäßige Sichtkontrolle durch eigenes Personal: Gerät vorhanden, Plombe intakt, keine äußeren Schäden, Zugang frei",
          "Prüfplakette mit gültigem Termin an jedem Gerät",
          "Kennzeichnung des Standorts nach ASR A1.3 sichtbar",
          "Nach jeder Benutzung Gerät aus dem Verkehr ziehen und instand setzen lassen",
          "Neue oder umgesetzte Geräte im Bestandsverzeichnis nachtragen",
        ],
      },
      { type: "h2", text: "Wer verpflichtet ist und wer prüfen darf", id: "wer" },
      {
        type: "p",
        text: "Der Arbeitgeber hat Feuerlöscheinrichtungen instand zu halten und in regelmäßigen Abständen auf ihre Funktionsfähigkeit prüfen zu lassen (§ 4 Abs. 3 ArbStättV). Die Instandhaltung führt ein Sachkundiger nach DIN 14406-4 durch. Sichtkontrollen dürfen eigene Beschäftigte übernehmen. In Wohngebäuden besteht keine allgemeine Vorhaltepflicht; wo Feuerlöscher aufgrund von Bauordnungsrecht oder Baugenehmigung vorhanden sind, etwa in Tiefgaragen, sind sie ebenfalls instand zu halten.",
      },
      { type: "h2", text: "Eine Frist für alle Standorte", id: "standorte" },
      {
        type: "p",
        text: "Bei vielen Standorten ist die größte Gefahr nicht die Frist selbst, sondern ihre Streuung: Werden Geräte zu unterschiedlichen Zeitpunkten angeschafft und geprüft, gibt es jeden Monat irgendwo einen fälligen Feuerlöscher. Ein fester Prüfmonat je Standort – idealerweise zusammen mit Sicherheitsbeleuchtung und Feststellanlagen – macht die Frist beherrschbar.",
      },
      {
        type: "table",
        caption: "Beispiel: Prüfplan nach Standortgruppen",
        head: ["Standortgruppe", "Prüfmonat", "Weitere Brandschutzprüfungen im selben Termin"],
        rows: [
          ["Verwaltung und Kundencenter", "März (ungerade Jahre)", "Sicherheitsbeleuchtung, Feststellanlagen"],
          ["Schulen und Kitas", "Sommerferien (gerade Jahre)", "Sicherheitsbeleuchtung, Rauchabzug"],
          ["Werkstätten, Bauhof, Tiefgaragen", "jährlich im Oktober", "Tore, Elektrogeräte"],
        ],
      },
      {
        type: "example",
        title: "Wohnungsgenossenschaft mit 18 Tiefgaragen",
        text: [
          "In den Tiefgaragen hängen laut Baugenehmigung 96 Feuerlöscher. Prüfplaketten zeigten Termine über drei Jahre verteilt; in vier Garagen waren Geräte nach Vandalismus entleert und nicht ersetzt.",
          "Die Genossenschaft legt alle Garagen auf einen jährlichen Prüftermin im Oktober, weil Feuchtigkeit und Vandalismus eine kürzere Frist als zwei Jahre rechtfertigen. Der Hausmeisterdienst kontrolliert monatlich auf Vollständigkeit.",
        ],
      },
      { type: "h2", text: "Was eine abgelaufene Prüfplakette bedeutet", id: "folgen" },
      {
        type: "p",
        text: "Ein Feuerlöscher mit abgelaufener Prüfung ist nicht automatisch unbrauchbar, aber seine Funktion ist nicht nachgewiesen. Bei Begehungen durch Berufsgenossenschaft oder Brandschau wird er beanstandet; im Brandfall prüft der Versicherer, ob vereinbarte Sicherheitsvorschriften eingehalten wurden. Was die Prüfung kostet: [Feuerlöscher-Prüfung Kosten](/wissen/feuerloescher-pruefung-kosten). Organisation über alle Standorte: [Feuerlöscher-Prüfung](/feuerloescher-pruefung).",
      },
      { type: "h2", text: "Wie viele Feuerlöscher überhaupt nötig sind", id: "ausstattung" },
      {
        type: "p",
        text: "Die Frage nach dem Prüfintervall hängt mit der Frage nach der Ausstattung zusammen. Die ASR A2.2 bemisst die Zahl der Feuerlöscher nach Grundfläche und Brandgefährdung in Löschmitteleinheiten; daraus ergibt sich, wie viele Geräte je Bereich vorzuhalten sind. In Sonderbauten und Garagen kommen Vorgaben aus Baugenehmigung und Landesrecht hinzu. Wer die Ausstattung kennt, kann den Prüfaufwand planen – wer sie nicht kennt, prüft häufig zu viele oder zu wenige Geräte.",
      },
      {
        type: "definition",
        term: "Löschmitteleinheit (LE)",
        text: "Rechengröße der ASR A2.2, mit der das Löschvermögen unterschiedlicher Feuerlöscher vergleichbar gemacht wird. Die erforderliche Zahl der Löschmitteleinheiten hängt von Grundfläche und Brandgefährdung ab.",
      },
      { type: "h2", text: "Häufige Fehler", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Prüftermine nach Anschaffungsdatum statt nach Standort – jeden Monat ist irgendwo ein Gerät fällig",
          "Geräte nach Umzügen oder Umbauten nicht nachgetragen",
          "Entleerte Geräte zurück an die Wand gehängt",
          "Gerät hinter Möbeln verstellt, Kennzeichnung fehlt",
          "Kürzere Herstellerfristen nicht berücksichtigt",
        ],
      },
      { type: "h2", text: "Feuerlöscher in Fahrzeugen und Außenbereichen", id: "aussen" },
      {
        type: "p",
        text: "Feuerlöscher in Fahrzeugen, auf Baustellen, in Tiefgaragen oder Außenbereichen sind Vibration, Feuchtigkeit, Temperaturschwankungen und Verschmutzung ausgesetzt. Die ASR A2.2 nennt zwei Jahre als regelmäßiges Höchstintervall; bei solchen Belastungen legt die Gefährdungsbeurteilung kürzere Abstände fest. Für Fahrzeuge von Bauhöfen, Hausmeisterdiensten und Feuerwehren ist eine jährliche Instandhaltung verbreitet und lässt sich mit der UVV-Prüfung des Fahrzeugs koppeln.",
      },
      {
        type: "table",
        head: ["Einsatzort", "Belastung", "Übliche Festlegung"],
        rows: [
          ["Büro, Verwaltung", "gering", "2 Jahre"],
          ["Werkstatt, Küche", "Staub, Fett, Wärme", "1 bis 2 Jahre"],
          ["Tiefgarage", "Feuchtigkeit, Vandalismus", "1 Jahr"],
          ["Fahrzeug", "Vibration, Temperatur", "1 Jahr"],
        ],
      },
      { type: "h2", text: "Zuständigkeit bei Mietobjekten", id: "miete" },
      {
        type: "p",
        text: "In gemieteten Büros und Praxen stellt sich oft die Frage, wer die Feuerlöscher prüfen lässt. Die Pflicht aus § 4 Abs. 3 ArbStättV trifft den Arbeitgeber – also in der Regel den Mieter für die Geräte in seinen Räumen. Feuerlöscher in Fluren, Treppenhäusern oder Tiefgaragen, die der Vermieter aufgrund der Baugenehmigung vorhält, liegen dagegen meist beim Vermieter. Weil beide Seiten oft davon ausgehen, dass die andere zuständig ist, sollte die Aufteilung im Mietvertrag oder in einer Schnittstellenliste festgehalten werden. Bei Wohnungsunternehmen, die zugleich Geschäftsstellen und Werkstätten betreiben, betrifft das beide Rollen: als Vermieter für die Gebäude und als Arbeitgeber für die eigenen Räume.",
      },
      {
        type: "p",
        text: "Für Organisationen mit vielen Standorten lohnt sich außerdem ein Abgleich von Gerätebestand und Ausstattungsbedarf: Nach Umbauten, Nutzungsänderungen oder Zusammenlegungen von Abteilungen stimmen Anzahl und Verteilung der Feuerlöscher häufig nicht mehr. Der Prüftermin ist ein guter Anlass, den Bestand mit der Brandschutzordnung abzugleichen.",
      },
      { type: "h2", text: "Dokumentation der Prüfungen", id: "dokumentation" },
      {
        type: "p",
        text: "Neben der Prüfplakette am Gerät gehört ein Prüfbericht je Standort in die zentrale Ablage: welche Geräte geprüft wurden, wo sie hängen, welche Mängel festgestellt und welche Geräte ausgetauscht wurden. Die Plakette zeigt dem Nutzer vor Ort, ob das Gerät geprüft ist; der Bericht zeigt dem Betreiber, ob alle Geräte geprüft sind. Erst beides zusammen ergibt einen Nachweis, der bei Begehungen durch Berufsgenossenschaft, Brandschau oder Versicherer trägt. Bei mehreren Standorten sollte der Bericht in einem einheitlichen Format geliefert werden, damit sich der Gesamtbestand und fällige Termine auf einen Blick erkennen lassen.",
      },
      {
        type: "p",
        text: "Bei der Planung hilft eine einfache Regel: Für jeden Standort gibt es genau einen Prüfmonat für alle tragbaren Feuerlöscher, unabhängig davon, wann einzelne Geräte gekauft oder zuletzt instand gesetzt wurden. Geräte, die zwischendurch ersetzt werden, erhalten beim nächsten regulären Termin den gemeinsamen Rhythmus. So entsteht pro Standort ein einziger Termin, den Hausmeister, Prüfdienst und Leitung gleichermaßen kennen. Für Organisationen mit vielen Standorten ist das die wirksamste Maßnahme gegen übersehene Fristen – deutlich wirksamer als jede einzelne Erinnerung.",
      },
    ],
    faqs: [
      [
        "Wie oft müssen Feuerlöscher geprüft werden?",
        "Mindestens alle zwei Jahre durch einen Sachkundigen (ASR A2.2, DIN 14406-4, § 4 Abs. 3 ArbStättV). Bei erhöhter Beanspruchung und nach Gebrauch früher.",
      ],
      [
        "Dürfen Feuerlöscher jährlich statt alle zwei Jahre geprüft werden?",
        "Ja. Zwei Jahre sind die Höchstfrist. Eine jährliche Prüfung ist bei Außenbereichen, Fahrzeugen, Tiefgaragen oder staubiger Umgebung oft angezeigt.",
      ],
      [
        "Was passiert, wenn die Prüfplakette abgelaufen ist?",
        "Die Funktionsfähigkeit ist nicht mehr nachgewiesen. Das Gerät sollte zeitnah instand gehalten werden; bei Begehungen wird es beanstandet.",
      ],
      [
        "Muss ein Feuerlöscher nach dem Benutzen geprüft werden?",
        "Ja, auch nach teilweiser Entleerung ist er unverzüglich durch einen Sachkundigen instand zu setzen.",
      ],
      [
        "Wie oft muss ein Feuerlöscher im Firmenfahrzeug geprüft werden?",
        "Die ASR A2.2 nennt zwei Jahre als Höchstintervall. Wegen Vibration und Temperaturschwankungen legen viele Betriebe für Fahrzeuge in der Gefährdungsbeurteilung eine jährliche Instandhaltung fest.",
      ],
    ],
    sources: [
      ["ArbStättV", "§ 4 Abs. 1 und 3"],
      ["ASR A2.2", "Instandhaltung von Feuerlöschern"],
      ["DIN 14406-4", "Instandhaltung tragbarer Feuerlöscher"],
      ["BetrSichV", "§ 3 Abs. 6; Anhang 2 Abschnitt 4"],
    ],
    related: [
      ["Feuerlöscher-Prüfung", "/feuerloescher-pruefung", "Pflicht und Organisation"],
      ["Feuerlöscher-Prüfung Kosten", "/wissen/feuerloescher-pruefung-kosten", "Preise mit Quellen"],
      ["Brandschutzprüfung", "/pruefbereiche/brandschutz", "BMA, Sicherheitsbeleuchtung"],
      ["Prüfpflichten im Wohnungsbestand", "/wissen/pruefpflichten-wohnungsbestand", "Tiefgaragen"],
    ],
    cta: "Feuerlöscher aller Standorte auf einen Termin bringen.",
  },
  {
    slug: "feuerloescher-pruefung-kosten",
    keyword: "feuerlöscher prüfung kosten",
    secondary: ["feuerlöscher wartung kosten", "feuerlöscher wartung preis", "feuerlöscher prüfen lassen kosten", "kosten feuerlöscher austausch"],
    cluster: "Arbeitsmittel & Brandschutz",
    title: "Feuerlöscher-Prüfung Kosten: Preise je Gerät und Anfahrt",
    description:
      "Feuerlöscher-Prüfung Kosten: Preisspannen je Gerät, Anfahrt, Löschmitteltausch und Druckprüfung – mit Quellen, Rechenbeispiel und Spartipps.",
    h1: "Feuerlöscher-Prüfung: Kosten je Gerät, Anfahrt und Folgekosten",
    kicker: "BRANDSCHUTZ",
    teaser: "Veröffentlichte Preisspannen mit Quelle und Datum, ein Rechenbeispiel und die größten Kostenhebel.",
    areas: ["brandschutz"],
    published,
    modified: published,
    lead: [
      "Die Prüfung eines Feuerlöschers kostet nach veröffentlichten Angaben (Stand Juli 2026) im Sammelauftrag rund 15 bis 25 Euro je Gerät, dazu eine Anfahrtspauschale von etwa 40 bis 90 Euro je Termin. Ältere Ratgeberangaben nennen 20 bis 75 Euro je Gerät. Hinzu kommen bei Bedarf Löschmitteltausch, Ersatzteile und Druckgeräte-Prüfungen.",
    ],
    blocks: [
      { type: "h2", text: "Preisspannen im Überblick", id: "preise" },
      {
        type: "table",
        caption: "Veröffentlichte Preisangaben, netto bzw. laut Quelle – keine Gebührenordnung",
        head: ["Position", "Spanne", "Quelle, Stand"],
        rows: [
          ["Wartung nach DIN 14406-4 je Gerät, Sammelauftrag ab etwa 10 Geräten", "15–25 €", "industrie-fachwissen.de, 24.07.2026"],
          ["Anfahrtspauschale je Termin", "40–90 €", "industrie-fachwissen.de, 24.07.2026"],
          ["Löschmitteltausch je Gerät", "35–60 €", "industrie-fachwissen.de, 24.07.2026"],
          ["Festigkeitsprüfung je Gerät", "25–50 €", "industrie-fachwissen.de, 24.07.2026"],
          ["Wartung je Gerät, Durchschnitt allgemein", "20–75 €", "hausjournal.net, 13.10.2024"],
        ],
      },
      {
        type: "note",
        text: "Für die Instandhaltung von Feuerlöschern gibt es keine amtliche Gebührenordnung. Die Werte sind veröffentlichte Orientierungswerte, keine Angebote; regional und je Gerätetyp sind deutliche Abweichungen üblich.",
      },
      { type: "h2", text: "Wovon der Preis abhängt", id: "faktoren" },
      {
        type: "table",
        head: ["Faktor", "Wirkung"],
        rows: [
          ["Zahl der Geräte je Termin", "Die Anfahrt verteilt sich auf mehr Geräte; der Preis je Gerät sinkt deutlich."],
          ["Gerätetyp", "Aufladelöscher und Dauerdrucklöscher unterscheiden sich in Aufwand und Folgeprüfungen."],
          ["Zustand und Alter", "Löschmitteltausch, Ersatzteile und Druckgeräte-Prüfungen kommen bei älteren Geräten häufiger hinzu."],
          ["Vorbereitung", "Liegt eine Standortliste vor, muss der Sachkundige keine Geräte suchen."],
          ["Bündelung", "Gemeinsamer Termin mit anderen Brandschutzprüfungen spart Anfahrten."],
        ],
      },
      { type: "h2", text: "Rechenbeispiel: 12 Standorte, 180 Geräte", id: "rechenbeispiel" },
      {
        type: "table",
        caption: "Eigene Beispielrechnung auf Basis der Mittelwerte aus industrie-fachwissen.de (Stand 07/2026), ohne Ersatzteile",
        head: ["Variante", "Termine", "Anfahrt", "Wartung", "Summe je Prüfrunde"],
        rows: [
          ["Jeder Standort einzeln, verteilt über das Jahr", "12", "12 × 65 € = 780 €", "180 × 20 € = 3.600 €", "4.380 €"],
          ["Gebündelt in 3 regionale Touren", "3", "3 × 65 € = 195 €", "180 × 20 € = 3.600 €", "3.795 €"],
        ],
      },
      {
        type: "p",
        text: "Der Unterschied entsteht allein durch die Anfahrten. In der Praxis kommen Preisnachlässe für größere Stückzahlen hinzu, die sich aus Angeboten ergeben, nicht aus Listen.",
      },
      { type: "h2", text: "Wie oft die Kosten anfallen", id: "frist" },
      {
        type: "p",
        text: "Feuerlöscher sind mindestens alle zwei Jahre durch einen Sachkundigen instand zu halten (ASR A2.2, DIN 14406-4, § 4 Abs. 3 ArbStättV); bei erhöhter Beanspruchung früher. Details: [Feuerlöscher-Prüfung: wie oft](/wissen/feuerloescher-pruefung-wie-oft). Eine jährliche Prüfung verdoppelt die laufenden Kosten, ist in Außenbereichen oder Tiefgaragen aber oft angezeigt.",
      },
      { type: "h2", text: "Wann sich ein Austausch lohnt", id: "austausch" },
      {
        type: "p",
        text: "Bei älteren Geräten können Löschmitteltausch und Druckgeräte-Prüfung zusammen so viel kosten wie ein neues Gerät. Eine Faustregel aus der Fachpresse: Liegen die Kosten der Instandsetzung über der Hälfte des Neupreises und ist das Gerät älter als zwölf Jahre, ist der Austausch meist wirtschaftlicher (industrie-fachwissen.de, 07/2026). Das ist eine wirtschaftliche Empfehlung, keine Vorschrift.",
      },
      {
        type: "checklist",
        items: [
          "Standortliste mit Gerätetyp, Löschmittel und Baujahr vor der Ausschreibung erstellen",
          "Festpreis je Gerät inklusive Anfahrt anfragen, Ersatzteile separat ausweisen lassen",
          "Termine je Region bündeln und mit Sicherheitsbeleuchtung und Feststellanlagen koppeln",
          "Geräte mit hohem Alter und wiederholtem Löschmitteltausch auf Austausch prüfen",
          "Vertraglich regeln, dass der Prüfbericht je Gerät mit Standort geliefert wird",
        ],
      },
      {
        type: "example",
        title: "Landkreis mit 40 Liegenschaften",
        text: [
          "Bisher beauftragte jede Schule und jede Verwaltungsstelle ihren eigenen Wartungsdienst; Preise und Termine waren nicht vergleichbar.",
          "Der Landkreis schreibt die Feuerlöscher-Instandhaltung in zwei Losen nach Region aus, mit einheitlicher Geräteliste und Festpreis je Gerät inklusive Anfahrt. Die Termine liegen in den Ferien zusammen mit der Prüfung der Sicherheitsbeleuchtung.",
        ],
      },
      { type: "h2", text: "Was im Preis enthalten sein sollte", id: "leistungsumfang" },
      {
        type: "checklist",
        items: [
          "Instandhaltung nach DIN 14406-4 mit Sicht-, Funktions- und Bauteilprüfung",
          "Neue Prüfplakette mit Datum und nächstem Termin",
          "Prüfbericht je Gerät mit Standort",
          "Kleinteile wie Plomben und Sicherungsstifte",
          "Anfahrt – ausdrücklich ein- oder ausgeschlossen",
        ],
      },
      {
        type: "p",
        text: "Nicht im Grundpreis enthalten sind meist Löschmittel, größere Ersatzteile, Druckgeräte-Prüfungen und die Entsorgung ausgesonderter Geräte. Lassen Sie diese Positionen in Angeboten getrennt ausweisen, sonst sind die Preise nicht vergleichbar.",
      },
      { type: "h2", text: "Kosten über die Lebensdauer betrachten", id: "lebensdauer" },
      {
        type: "p",
        text: "Der Wartungspreis je Termin ist nur ein Teil der Kosten. Über die Nutzungsdauer kommen Löschmitteltausch, Druckgeräte-Prüfungen und Anfahrten hinzu. Eine Fachpublikation rechnet für einen 6-Liter-Schaumlöscher im Sammelauftrag über 20 Jahre mit Gesamtkosten von rund 518 Euro je Gerät einschließlich Anschaffung (industrie-fachwissen.de, 07/2026). Die Rechnung zeigt, dass Anschaffung und Wartung je Termin klein sind gegenüber der Summe aller Folgeleistungen.",
      },
      {
        type: "table",
        caption: "Lebenszyklus eines Feuerlöschers laut industrie-fachwissen.de (Stand 07/2026), 6-l-Schaumlöscher, Sammelauftrag",
        head: ["Position", "Häufigkeit in 20 Jahren", "Summe"],
        rows: [
          ["Anschaffung inkl. Wandhalter", "einmalig", "ca. 88 €"],
          ["Wartung nach DIN 14406-4", "10 ×", "ca. 200 €"],
          ["Löschmitteltausch", "2 bis 3 ×", "ca. 110 €"],
          ["Festigkeitsprüfung", "2 ×", "ca. 70 €"],
          ["Anteilige Anfahrt", "10 ×", "ca. 50 €"],
          ["Gesamt je Gerät", "", "ca. 518 €"],
        ],
      },
      { type: "h2", text: "Kosten bei Kommunen und öffentlichen Trägern", id: "oeffentlich" },
      {
        type: "p",
        text: "Öffentliche Auftraggeber vergeben Wartungsleistungen nach Vergaberecht. Eine Ausschreibung nach Losen – etwa je Region oder Gebäudeart – mit einheitlicher Geräteliste und Festpreis je Gerät inklusive Anfahrt macht Angebote vergleichbar und verhindert Nachträge. Ein Rahmenvertrag über mehrere Jahre sichert Preise und Termine; die Geräteliste muss dafür vor der Ausschreibung vollständig sein.",
      },
      { type: "h2", text: "Typische Kostenfallen", id: "kostenfallen" },
      {
        type: "p",
        text: "Die häufigste Kostenfalle ist nicht der Preis je Gerät, sondern ein unvollständiger Bestand. Fehlen Geräte in der Liste, werden sie entweder nicht geprüft oder als Zusatzposition abgerechnet. Die zweite Falle sind automatische Austauschempfehlungen: Manche Dienstleister empfehlen bei jeder Prüfung neue Geräte. Ob ein Austausch wirtschaftlich ist, ergibt sich aus Alter, Zustand und den anstehenden Folgeleistungen – nicht aus einer pauschalen Empfehlung. Die dritte Falle sind verstreute Termine: Werden Standorte zu unterschiedlichen Zeitpunkten geprüft, fällt die Anfahrt mehrfach an, obwohl ein Prüfer die Standorte an einem Tag erreichen könnte.",
      },
      { type: "h2", text: "Eigene Sichtkontrollen senken Folgekosten", id: "sichtkontrollen" },
      {
        type: "p",
        text: "Die Instandhaltung durch den Sachkundigen ist nicht ersetzbar, aber eigene Sichtkontrollen zwischen den Terminen senken Folgekosten. Wer regelmäßig prüft, ob Geräte vorhanden, verplombt und unbeschädigt sind, entdeckt entleerte oder entwendete Geräte früh und vermeidet, dass beim nächsten Termin viele Geräte auf einmal ersetzt werden müssen. Bei Tiefgaragen und öffentlich zugänglichen Bereichen ist das besonders wirksam, weil dort Vandalismus häufiger vorkommt. Die Kontrollen übernehmen Hausmeister oder Haustechnik mit einer kurzen Checkliste; das Ergebnis wird mit Datum festgehalten.",
      },
      {
        type: "p",
        text: "Für die Haushaltsplanung von Kommunen und sozialen Trägern lässt sich aus den Preisspannen ein Jahresbudget ableiten: Anzahl der Geräte geteilt durch zwei, multipliziert mit dem Preis je Gerät, zuzüglich Anfahrten je Standort und einem Zuschlag für Löschmitteltausch und Ersatz. Wer die Zahl der Geräte und Standorte genau kennt, kann das Budget belastbar planen. Wer sie nicht kennt, sollte vor der Ausschreibung eine Bestandsaufnahme durchführen – sie zahlt sich bei der ersten Vergabe in vergleichbaren Angeboten aus.",
      },
    ],
    faqs: [
      [
        "Was kostet die Prüfung eines Feuerlöschers?",
        "Veröffentlichte Angaben nennen im Sammelauftrag etwa 15 bis 25 Euro je Gerät zuzüglich 40 bis 90 Euro Anfahrt je Termin (industrie-fachwissen.de, 07/2026), ältere Ratgeber 20 bis 75 Euro je Gerät (hausjournal.net, 10/2024).",
      ],
      [
        "Wie lassen sich die Kosten der Feuerlöscher-Prüfung senken?",
        "Vor allem durch Bündelung: wenige Termine mit vielen Geräten, regionale Touren und eine vollständige Standortliste. Die Anfahrt ist bei kleinen Standorten der größte Kostenanteil.",
      ],
      [
        "Wann ist ein neuer Feuerlöscher günstiger als die Wartung?",
        "Wenn Löschmitteltausch, Ersatzteile und Druckprüfung zusammen einen großen Teil des Neupreises erreichen, besonders bei älteren Geräten. Die Entscheidung ist wirtschaftlich, nicht rechtlich vorgegeben.",
      ],
      [
        "Ist die Anfahrt im Preis für die Feuerlöscherwartung enthalten?",
        "Das hängt vom Anbieter ab. Veröffentlichte Angaben nennen Anfahrtspauschalen von 40 bis 90 Euro je Termin (industrie-fachwissen.de, 07/2026). Lassen Sie die Anfahrt im Angebot ausdrücklich ausweisen.",
      ],
      [
        "Warum unterscheiden sich Angebote für Feuerlöscher so stark?",
        "Weil Anfahrt, Ersatzteile, Löschmittel und Druckprüfungen unterschiedlich enthalten oder ausgeschlossen sind. Vergleichbar werden Angebote erst mit einheitlicher Geräteliste und getrennt ausgewiesenen Positionen.",
      ],
    ],
    sources: [
      ["ArbStättV", "§ 4 Abs. 3"],
      ["ASR A2.2", "Instandhaltung von Feuerlöschern"],
      ["DIN 14406-4", "Instandhaltung tragbarer Feuerlöscher"],
      ["BetrSichV", "Anhang 2 Abschnitt 4 (Druckgeräte)"],
    ],
    related: [
      ["Feuerlöscher-Prüfung", "/feuerloescher-pruefung", "Pflicht und Organisation"],
      ["Feuerlöscher-Prüfung: wie oft", "/wissen/feuerloescher-pruefung-wie-oft", "Fristen"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Ausschreibung nach Losen"],
    ],
    cta: "Feuerlöscher-Instandhaltung standortübergreifend ausschreiben lassen.",
  },
  {
    slug: "regalpruefung-wie-oft",
    keyword: "regalprüfung wie oft",
    secondary: ["regalinspektion intervall", "regalprüfung jährlich", "sichtkontrolle regal", "regalinspektion din en 15635"],
    cluster: "Arbeitsmittel & Brandschutz",
    title: "Regalprüfung: Wie oft? Inspektion nach DIN EN 15635",
    description:
      "Wie oft müssen Regale geprüft werden? Experteninspektion mindestens alle 12 Monate nach DIN EN 15635, Sichtkontrollen, Prüfung nach Anfahrschäden.",
    h1: "Regalprüfung: Wie oft Regale geprüft und kontrolliert werden müssen",
    kicker: "LAGER",
    teaser: "Zwölf Monate als Obergrenze, regelmäßige Sichtkontrollen und die Prüfung nach Anfahrschäden.",
    published,
    modified: published,
    lead: [
      "Regale sind nach DIN EN 15635 mindestens alle zwölf Monate durch eine fachkundige Person zu inspizieren; arbeitsschutzrechtlich ist das die wiederkehrende Prüfung durch eine zur Prüfung befähigte Person nach § 14 Abs. 2 BetrSichV. Dazwischen finden regelmäßige Sichtkontrollen statt, deren Abstand der Betreiber festlegt, sowie Prüfungen nach Umbauten und außergewöhnlichen Ereignissen wie Anfahrschäden.",
    ],
    blocks: [
      { type: "h2", text: "Die drei Ebenen der Regalkontrolle", id: "ebenen" },
      {
        type: "table",
        head: ["Ebene", "Durch", "Frist", "Fundstelle"],
        rows: [
          ["Experteninspektion", "fachkundige Person / befähigte Person", "mindestens alle 12 Monate", "DIN EN 15635; § 14 Abs. 2 BetrSichV"],
          ["Regelmäßige Sichtkontrolle", "unterwiesene Beschäftigte", "keine feste Frist – nach Gefährdungsbeurteilung, in der Praxis meist wöchentlich", "DIN EN 15635; § 4 Abs. 5 BetrSichV"],
          ["Kontrolle vor Verwendung", "Benutzer", "vor jeder Verwendung auf offensichtliche Mängel", "§ 4 Abs. 5 Satz 3 BetrSichV"],
          ["Prüfung nach Umbau", "befähigte Person", "vor der nächsten Verwendung", "§ 14 Abs. 3 Satz 1 BetrSichV"],
          ["Prüfung nach außergewöhnlichem Ereignis", "befähigte Person", "unverzüglich", "§ 14 Abs. 3 Satz 2 BetrSichV"],
        ],
      },
      {
        type: "p",
        text: "Die zwölf Monate sind eine Obergrenze. Für die Sichtkontrollen schreibt kein Gesetz eine Frist vor; der Betreiber bestimmt den Abstand nach Nutzungsintensität und Schadensrisiko und dokumentiert die Begründung (§ 3 Abs. 6 BetrSichV).",
      },
      { type: "h2", text: "Wann kürzere Abstände nötig sind", id: "kuerzer" },
      {
        type: "checklist",
        items: [
          "Intensiver Staplerverkehr in schmalen Gängen",
          "Hohe Umschlagsrate, häufiges Ein- und Auslagern",
          "Wiederholte Anfahrschäden bei früheren Inspektionen",
          "Schwerlast- oder hohe Palettenregale",
          "Wechselndes oder wenig erfahrenes Personal",
        ],
      },
      {
        type: "definition",
        term: "Außergewöhnliches Ereignis",
        text: "Ein Ereignis, das schädigende Auswirkungen auf die Sicherheit des Arbeitsmittels haben kann – bei Regalen typischerweise ein Anfahrschaden, eine Überladung oder ein Umbau durch Dritte. Danach ist das Regal nach § 14 Abs. 3 BetrSichV durch eine befähigte Person zu prüfen, bevor es wieder voll genutzt wird.",
      },
      { type: "h2", text: "Wer prüft und wer kontrolliert", id: "wer" },
      {
        type: "p",
        text: "Die Experteninspektion führt eine fachkundige bzw. zur Prüfung befähigte Person durch (§ 2 Abs. 6 BetrSichV, TRBS 1203), in der Praxis ein geschulter Regalinspekteur. Die Sichtkontrollen übernehmen unterwiesene Beschäftigte. DIN EN 15635 sieht dafür eine verantwortliche Person für die Sicherheit der Lagereinrichtung vor, die Kontrollen organisiert, Schäden bewertet und Maßnahmen veranlasst.",
      },
      { type: "h2", text: "Ablauf einer Sichtkontrolle", id: "sichtkontrolle" },
      {
        type: "steps",
        items: [
          "Ständer und Traversen auf Verformungen, Risse und fehlende Teile prüfen.",
          "Traversensicherungen und Bodenverankerungen kontrollieren.",
          "Anfahrschutz auf Schäden prüfen.",
          "Belastungsschilder vorhanden und lesbar?",
          "Überladung und falsch eingelagerte Paletten feststellen.",
          "Ergebnis mit Datum, Bereich und Befund in der Checkliste festhalten; Schäden sofort der verantwortlichen Person melden.",
        ],
      },
      {
        type: "table",
        caption: "Schadensbewertung nach dem Ampelsystem (DIN EN 15635, sinngemäß)",
        head: ["Stufe", "Maßnahme"],
        rows: [
          ["Grün", "beobachten, bei nächster Inspektion erneut bewerten"],
          ["Gelb", "nicht neu beladen, Instandsetzung zeitnah veranlassen"],
          ["Rot", "sofort entladen und sperren, Instandsetzung vor Wiederinbetriebnahme"],
        ],
      },
      {
        type: "example",
        title: "Bauhof einer Kommune",
        text: [
          "Im Bauhof lagern Streusalz, Ersatzteile und Verkehrszeichen in 64 Regalfeldern, bedient mit zwei Staplern. Eine Experteninspektion fand zuletzt vor drei Jahren statt; Sichtkontrollen gab es nicht.",
          "Neu: jährliche Experteninspektion im Frühjahr nach dem Winterdienst, wöchentliche Sichtkontrolle durch den Lagerverantwortlichen mit Checkliste, sofortige Meldung jedes Anfahrschadens. Nach dem ersten Winter wird geprüft, ob der Schadensverlauf ein kürzeres Intervall erfordert.",
        ],
      },
      { type: "h2", text: "Was es kostet und was ein Versäumnis bedeutet", id: "folgen" },
      {
        type: "p",
        text: "Eine Gebührenordnung gibt es nicht; abgerechnet wird nach Regalmetern, Feldern oder Zeitaufwand zuzüglich Anfahrt. Ein Regaleinsturz kann Beschäftigte schwer verletzen; fehlen Prüfnachweise, stellt sich die Frage nach einer Organisationspflichtverletzung. Organisation über mehrere Standorte: [Regalprüfung](/regalpruefung). Stapler im selben Lager: [UVV-Prüfung Stapler](/wissen/uvv-pruefung-stapler).",
      },
      { type: "h2", text: "Sichtkontrollen organisieren", id: "organisation" },
      {
        type: "p",
        text: "Die Sichtkontrolle ist die Prüfebene, die im Alltag am häufigsten ausfällt. Sie gelingt, wenn drei Dinge feststehen: wer kontrolliert, in welchem Abstand und nach welcher Checkliste. Der Lagerverantwortliche benennt die Kontrollierenden, legt die Bereiche fest und sorgt dafür, dass jeder Befund mit Datum dokumentiert wird. Bei mehreren Lagerstandorten sollten Checkliste und Bewertungsschema überall gleich sein, damit Befunde vergleichbar sind.",
      },
      {
        type: "table",
        caption: "Beispiel einer Kontrollplanung",
        head: ["Lager", "Nutzung", "Sichtkontrolle", "Experteninspektion"],
        rows: [
          ["Zentrallager mit Staplerbetrieb", "hoch", "wöchentlich", "jährlich im Januar"],
          ["Archiv Verwaltung", "gering, manuell", "monatlich", "jährlich im Januar"],
          ["Ersatzteillager Hausmeisterdienst", "mittel", "zweiwöchentlich", "jährlich im Januar"],
        ],
      },
      { type: "h2", text: "Häufige Mängel", id: "maengel" },
      {
        type: "checklist",
        items: [
          "Verbogene Ständer im unteren Bereich durch Anfahren",
          "Fehlende Traversensicherungen nach Umbauten",
          "Belastungsschilder fehlen oder passen nicht mehr zur Konfiguration",
          "Überladene Fächer, Paletten mit Überstand",
          "Fehlende Bodenverankerung oder lose Dübel",
        ],
      },
      { type: "h2", text: "Archive, Werkstätten und Kellerlager", id: "nebenlager" },
      {
        type: "p",
        text: "Nicht nur Logistiklager sind betroffen. Aktenregale in Verwaltungen, Schwerlastregale in Hausmeisterwerkstätten und Kellerlager von Schulen und Kliniken sind ebenfalls Arbeitsmittel. Hier ist die Beanspruchung meist geringer, die Regale sind aber oft alt, mehrfach umgebaut und ohne Belastungsangaben. Eine erste Experteninspektion zeigt, welche Regale weiter genutzt werden können und welche Belastungsgrenzen gelten. Danach lässt sich der Abstand der Sichtkontrollen begründet länger wählen als im Staplerlager.",
      },
      { type: "h2", text: "Wenn das Intervall nicht passt", id: "anpassung" },
      {
        type: "p",
        text: "Die Experteninspektion liefert Hinweise, ob die gewählten Abstände passen. Finden Inspekteure wiederholt gelbe oder rote Schäden, die bei den Sichtkontrollen nicht gemeldet wurden, sind entweder die Kontrollen zu selten oder die Kontrollierenden nicht ausreichend unterwiesen. Umgekehrt kann ein Lager mit geringer Nutzung und über Jahre schadensfreien Inspektionen die Sichtkontrollen seltener ansetzen – die Begründung gehört in die Gefährdungsbeurteilung. Die zwölf Monate für die Experteninspektion bleiben als Obergrenze bestehen. Für Organisationen mit vielen Standorten lohnt ein Vergleich der Inspektionsergebnisse: Lager mit auffällig vielen Schäden haben oft ein organisatorisches Problem, etwa enge Fahrwege oder fehlenden Anfahrschutz, das sich mit einer einmaligen Maßnahme beheben lässt.",
      },
      { type: "h2", text: "Dokumentation", id: "dokumentation" },
      {
        type: "p",
        text: "Das Ergebnis der Experteninspektion ist wie jede Prüfung nach § 14 BetrSichV aufzuzeichnen: Art und Umfang der Prüfung, Ergebnis und Name der prüfenden Person (§ 14 Abs. 7 BetrSichV). Die Sichtkontrollen werden mit Datum, Bereich und Befund dokumentiert. Für Schäden empfiehlt sich eine eigene Liste mit Gefährdungsstufe, Maßnahme, Verantwortlichem und Erledigungsdatum. Bei mehreren Lagern sollten Inspektionsberichte, Kontrolllisten und Schadenslisten in einem einheitlichen Format geführt werden – dann lässt sich auch erkennen, ob ein Standort auffällig häufig Schäden hat und dort Fahrwege, Anfahrschutz oder Schulungen verbessert werden sollten.",
      },
      {
        type: "p",
        text: "Für die Experteninspektion selbst lohnt sich eine gute Vorbereitung: Regalpläne oder eine Liste mit Regaltyp, Anzahl der Felder, Ebenen und zulässigen Lasten, Zugang zu allen Lagerbereichen und eine Ansprechperson vor Ort. Die Inspektion geht dann schneller, die Angebote werden vergleichbar, und der Inspekteur kann Abweichungen zwischen Plan und tatsächlicher Konfiguration gezielt erkennen. Gerade nach Umbauten durch eigene Mitarbeiter sind solche Abweichungen häufig – etwa versetzte Traversen ohne angepasstes Belastungsschild. Halten Sie solche Umbauten deshalb künftig fest und lassen Sie sie vor der nächsten Nutzung durch eine befähigte Person prüfen, wie es § 14 Abs. 3 BetrSichV für prüfpflichtige Änderungen verlangt. Das gilt auch, wenn nur einzelne Ebenen in der Höhe versetzt werden.",
      },
    ],
    faqs: [
      [
        "Wie oft müssen Regale geprüft werden?",
        "Mindestens alle zwölf Monate durch eine fachkundige Person nach DIN EN 15635. Dazwischen finden regelmäßige Sichtkontrollen statt, deren Abstand der Betreiber festlegt, in der Praxis meist wöchentlich.",
      ],
      [
        "Was ist nach einem Anfahrschaden zu tun?",
        "Den Bereich sichern, den Schaden der verantwortlichen Person melden und das Regal durch eine befähigte Person prüfen lassen, bevor es wieder voll genutzt wird (§ 14 Abs. 3 BetrSichV).",
      ],
      [
        "Gibt es eine gesetzliche Frist für Sichtkontrollen?",
        "Nein. Der Betreiber legt den Abstand in der Gefährdungsbeurteilung fest. Wöchentliche Kontrollen sind in der Praxis üblich.",
      ],
      [
        "Müssen auch Aktenregale im Büro geprüft werden?",
        "Regale sind Arbeitsmittel. Wie oft geprüft wird, hängt von Beanspruchung und Bauart ab und ist in der Gefährdungsbeurteilung festzulegen. Für Stahlregalsysteme gilt DIN EN 15635 mit der jährlichen Experteninspektion als Maßstab.",
      ],
      [
        "Wer ist im Lager für die Regalsicherheit verantwortlich?",
        "Der Arbeitgeber. DIN EN 15635 sieht vor, dass er eine verantwortliche Person für die Sicherheit der Lagereinrichtung benennt, die Kontrollen organisiert und Maßnahmen veranlasst.",
      ],
    ],
    sources: [
      ["DIN EN 15635", "Experteninspektion, Sichtkontrollen, Schadensbewertung"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6, § 4 Abs. 5, § 14 Abs. 2 und 3"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["DGUV I 208-061", "Lagereinrichtungen und -geräte"],
    ],
    related: [
      ["Regalprüfung", "/regalpruefung", "Pflicht und Organisation"],
      ["UVV-Prüfung Stapler", "/wissen/uvv-pruefung-stapler", "Flurförderzeuge"],
      ["Prüffristen festlegen", "/wissen/prueffristen-festlegen", "Gefährdungsbeurteilung"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Bauhöfe"],
    ],
    cta: "Regalinspektionen an allen Standorten organisieren.",
  },
  {
    slug: "prueffristen-festlegen",
    keyword: "prüffristen festlegen",
    secondary: ["prüffristen gefährdungsbeurteilung", "prüffrist arbeitsmittel", "trbs 1201", "§ 3 abs. 6 betrsichv"],
    cluster: "Organisation",
    title: "Prüffristen festlegen nach § 3 BetrSichV – Leitfaden",
    description:
      "Prüffristen festlegen: Was § 3 Abs. 6 BetrSichV verlangt, welche Höchstfristen gelten, Kriterien, Dokumentation und wann die Frist neu festzulegen ist.",
    h1: "Prüffristen festlegen: So bestimmen Sie Prüffristen in der Gefährdungsbeurteilung",
    kicker: "ORGANISATION",
    teaser: "Was § 3 Abs. 6 BetrSichV verlangt, wo Höchstfristen gelten und wie Sie die Frist begründen.",
    published,
    modified: published,
    lead: [
      "Prüffristen für Arbeitsmittel legt der Arbeitgeber in der Gefährdungsbeurteilung fest. Nach § 3 Abs. 6 BetrSichV sind sie so zu bemessen, dass die Arbeitsmittel bis zur nächsten festgelegten Prüfung sicher verwendet werden können. Wo die Verordnung selbst Höchstfristen vorgibt – etwa für Aufzüge und Druckanlagen in Anhang 2 –, dürfen diese nicht überschritten werden.",
    ],
    blocks: [
      { type: "h2", text: "Was die Betriebssicherheitsverordnung verlangt", id: "recht" },
      {
        type: "p",
        text: "§ 3 Abs. 6 BetrSichV verpflichtet den Arbeitgeber, Art und Umfang erforderlicher Prüfungen sowie die Fristen wiederkehrender Prüfungen nach §§ 14 und 16 zu ermitteln und festzulegen, soweit die Verordnung nicht selbst Vorgaben enthält; das gilt ausdrücklich auch für Aufzugsanlagen. Ergibt eine Prüfung, dass ein Arbeitsmittel nicht bis zur nächsten Prüfung sicher betrieben werden kann, ist die Frist neu festzulegen (§ 14 Abs. 2 BetrSichV). Grundlage ist die Gefährdungsbeurteilung nach § 5 ArbSchG, deren Ergebnis zu dokumentieren ist (§ 6 ArbSchG).",
      },
      {
        type: "definition",
        term: "Prüffrist",
        text: "Der festgelegte Zeitraum zwischen zwei wiederkehrenden Prüfungen eines Arbeitsmittels. Sie ist Ergebnis der Gefährdungsbeurteilung, nicht eine pauschale Zahl aus einer Tabelle.",
      },
      { type: "h2", text: "Woher Richtwerte und Höchstfristen kommen", id: "quellen" },
      {
        type: "table",
        head: ["Quelle", "Art", "Beispiel", "Verbindlichkeit"],
        rows: [
          ["BetrSichV Anhang 2", "Höchstfrist", "Aufzüge: Hauptprüfung spätestens alle 2 Jahre", "darf nicht überschritten werden"],
          ["Unfallverhütungsvorschriften", "Mindestabstand", "Fahrzeuge, Stapler: mindestens jährlich", "verbindlich"],
          ["Durchführungsanweisungen DGUV V3", "Richtwert", "ortsveränderliche Geräte: 6 Monate", "Ausgangspunkt, begründet anpassbar"],
          ["Normen", "Stand der Technik", "Regale: Experteninspektion mindestens alle 12 Monate (DIN EN 15635)", "Vermutung ordnungsgemäßen Handelns"],
          ["Herstellerangaben", "Vorgabe", "Wartungs- und Prüfintervalle in der Betriebsanleitung", "zu berücksichtigen"],
          ["Keine Vorgabe", "–", "Leitern und Tritte", "Frist vollständig selbst festlegen"],
        ],
      },
      { type: "h2", text: "Kriterien für die Festlegung", id: "kriterien" },
      {
        type: "checklist",
        items: [
          "Art des Arbeitsmittels und Schwere möglicher Schäden",
          "Beanspruchung: Nutzungsdauer je Tag, Schichtbetrieb, mechanische Belastung",
          "Umgebung: Feuchtigkeit, Staub, Temperatur, Außeneinsatz",
          "Nutzerkreis: unterwiesenes Personal oder wechselnde Nutzer",
          "Erfahrungen: Mängelquote früherer Prüfungen, Unfälle, Beinaheunfälle",
          "Herstellerangaben und Höchstfristen aus Rechtsvorschriften",
        ],
      },
      { type: "h2", text: "In fünf Schritten zur begründeten Frist", id: "schritte" },
      {
        type: "steps",
        items: [
          "**Arbeitsmittel erfassen** und nach Art und Einsatzbereich gruppieren.",
          "**Vorgaben ermitteln:** Höchstfristen, Unfallverhütungsvorschriften, Richtwerte, Herstellerangaben.",
          "**Frist je Gruppe festlegen** und die Abweichung vom Richtwert begründen.",
          "**Prüfer festlegen:** befähigte Person, Sachkundiger, ZÜS oder Prüfsachverständiger.",
          "**Überprüfen:** nach jeder Prüfung Mängelquote auswerten, bei Bedarf Frist neu festlegen.",
        ],
      },
      {
        type: "table",
        caption: "Beispiel einer dokumentierten Festlegung",
        head: ["Arbeitsmittel", "Frist", "Begründung", "Prüfer"],
        rows: [
          ["Bürogeräte Verwaltung", "24 Monate", "Fehlerquote zwei Zyklen unter 2 %, geringe Beanspruchung (DGUV V3, Tabelle 1B)", "Elektrofachkraft"],
          ["Werkzeuge Regiebetrieb", "6 Monate", "hohe mechanische Beanspruchung, Fehlerquote 3,6 %", "Elektrofachkraft"],
          ["Leitern Hausmeisterdienst", "12 Monate", "keine Vorgabe; tägliche Nutzung, Außeneinsatz", "befähigte Person"],
          ["Lagerregale Bauhof", "12 Monate plus wöchentliche Sichtkontrolle", "Staplerverkehr; Obergrenze nach DIN EN 15635", "befähigte Person"],
        ],
      },
      {
        type: "example",
        title: "Pflegeheimträger mit sechs Häusern",
        text: [
          "Jedes Haus hatte eigene Fristen übernommen – teils aus Herstellerunterlagen, teils aus Angeboten von Dienstleistern. Für Leitern und Rollatoren-Werkstatt gab es keine Festlegung, für Pflegebetten unterschiedliche Intervalle je Haus.",
          "Der Träger legt die Fristen einmal zentral fest, dokumentiert die Begründung je Gruppe und übernimmt sie in alle Häuser. Abweichungen sind nur mit Begründung im Haus-Kataster zulässig.",
        ],
      },
      { type: "h2", text: "Was eine fehlende Festlegung bedeutet", id: "folgen" },
      {
        type: "p",
        text: "Ohne festgelegte Frist kann der Arbeitgeber nicht belegen, dass er seine Pflicht aus § 3 Abs. 6 BetrSichV erfüllt hat. Wer eine Gefährdungsbeurteilung nicht oder nicht richtig durchführt, handelt nach § 22 Abs. 1 Nr. 1 BetrSichV ordnungswidrig. Die Festlegungen gehören deshalb in das [Betreiberpflichtenkataster](/wissen/betreiberpflichtenkataster-erstellen). Richtwerte je Prüfbereich: [Prüffristen im Überblick](/prueffristen). Für Elektrogeräte: [DGUV V3 Prüfung: wie oft](/wissen/dguv-v3-pruefung-wie-oft).",
      },
      { type: "h2", text: "Fristen für überwachungsbedürftige Anlagen", id: "ueberwachungsbeduerftig" },
      {
        type: "p",
        text: "Für Aufzüge, Druckanlagen und andere überwachungsbedürftige Anlagen ist der Spielraum kleiner. Anhang 2 BetrSichV gibt Höchstfristen vor, die Prüfung erfolgt häufig durch eine zugelassene Überwachungsstelle. Der Betreiber legt die Fristen auch hier in der Gefährdungsbeurteilung fest – er darf sie kürzer, aber nicht länger als die Höchstfrist bestimmen. Für Aufzüge gilt das nach § 3 Abs. 6 BetrSichV ausdrücklich.",
      },
      { type: "h2", text: "Häufige Fehler", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Frist aus dem Angebot des Prüfdienstes übernommen, ohne eigene Begründung",
          "Eine Frist für alle Standorte, obwohl Nutzung und Umgebung sehr verschieden sind",
          "Keine Frist für Arbeitsmittel ohne Vorgabe – Leitern, Tritte, Handwerkzeug",
          "Festlegung nie überprüft, obwohl Prüfprotokolle wiederholt Mängel zeigen",
          "Festlegung nicht dokumentiert – im Ernstfall nicht nachweisbar",
        ],
      },
      { type: "h2", text: "Zentral festlegen, lokal anwenden", id: "standorte" },
      {
        type: "p",
        text: "Organisationen mit vielen Standorten profitieren davon, Fristen zentral für Gerätegruppen festzulegen und lokal nur begründete Abweichungen zuzulassen. Das spart Aufwand in der Gefährdungsbeurteilung, macht Prüfungen ausschreibbar und Ergebnisse vergleichbar. Die zentrale Festlegung wird regelmäßig anhand der Prüfergebnisse aller Standorte überprüft – eine Fehlerquote lässt sich über viele Standorte belastbarer ermitteln als an einem einzelnen.",
      },
      {
        type: "table",
        caption: "Beispiel: zentrale Festlegung mit lokaler Abweichung",
        head: ["Gerätegruppe", "Zentrale Frist", "Zulässige lokale Abweichung"],
        rows: [
          ["Bürogeräte", "24 Monate", "12 Monate bei höherer Fehlerquote am Standort"],
          ["Werkzeuge Hausmeisterdienst", "6 Monate", "keine längere Frist"],
          ["Leitern", "12 Monate", "6 Monate bei Außeneinsatz"],
          ["Feuerlöscher", "24 Monate", "12 Monate in Tiefgaragen und Fahrzeugen"],
        ],
      },
      { type: "h2", text: "Wer an der Festlegung beteiligt ist", id: "beteiligte" },
      {
        type: "table",
        head: ["Rolle", "Beitrag"],
        rows: [
          ["Arbeitgeber bzw. Leitung", "trägt die Verantwortung, gibt die Festlegung frei"],
          ["Fachkraft für Arbeitssicherheit", "berät zur Gefährdungsbeurteilung und zu den Kriterien"],
          ["Befähigte Personen, Prüfdienste", "liefern Mängelquoten und fachliche Einschätzung"],
          ["Technische Leitung, Hausmeister", "kennen Nutzung, Umgebung und Schadenshistorie"],
          ["Betreibermanagement", "führt Fristen, Nachweise und Überprüfung zusammen"],
        ],
      },
      {
        type: "p",
        text: "Die Fachkraft für Arbeitssicherheit unterstützt den Arbeitgeber bei der Gefährdungsbeurteilung, die Entscheidung bleibt beim Arbeitgeber. In der Praxis bewährt sich ein jährlicher Termin, an dem die Prüfergebnisse des Vorjahres ausgewertet und die Fristen bestätigt oder angepasst werden. Die Ergebnisse dieses Termins sind zugleich die Dokumentation nach § 6 ArbSchG.",
      },
      { type: "h2", text: "Prüffristen und Kontrollen unterscheiden", id: "kontrollen" },
      {
        type: "p",
        text: "Neben den wiederkehrenden Prüfungen durch befähigte Personen verlangt die BetrSichV Kontrollen: Arbeitsmittel sind vor jeder Verwendung auf offensichtliche Mängel zu kontrollieren, Schutz- und Sicherheitseinrichtungen regelmäßig auf ihre Funktionsfähigkeit (§ 4 Abs. 5 BetrSichV). Diese Kontrollen ersetzen keine Prüfung, schließen aber die Lücke zwischen zwei Prüfterminen. Eine gute Gefährdungsbeurteilung legt deshalb beides fest: die Prüffrist und Art und Häufigkeit der Kontrollen. Je engmaschiger und besser dokumentiert die Kontrollen sind, desto eher lässt sich eine längere Prüffrist begründen.",
      },
      {
        type: "p",
        text: "Für die Praxis bewährt sich eine Fristentabelle als Anlage zur Gefährdungsbeurteilung: je Gerätegruppe Frist, Begründung, Rechtsgrundlage, Prüferqualifikation und Datum der letzten Überprüfung. Diese Tabelle ist kurz genug, um jährlich vollständig durchgesehen zu werden, und zugleich der Nachweis, dass die Fristen nicht zufällig entstanden sind. In Organisationen mit vielen Standorten wird sie zentral gepflegt und den Standorten als verbindliche Vorgabe zur Verfügung gestellt. Änderungen an der Tabelle werden mit Datum und Grund vermerkt, damit auch später nachvollziehbar bleibt, warum eine Frist verkürzt oder verlängert wurde. Bei einem Wechsel in der Leitung oder beim Dienstleister bleibt das Wissen so erhalten.",
      },
    ],
    faqs: [
      [
        "Wer legt Prüffristen fest?",
        "Der Arbeitgeber in der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV. Er kann sich dabei fachkundig beraten lassen, die Verantwortung bleibt bei ihm.",
      ],
      [
        "Darf eine Prüffrist länger sein als der Richtwert?",
        "Ja, wenn die Gefährdungsbeurteilung das begründet – etwa durch eine belegte niedrige Mängelquote. Höchstfristen aus Rechtsvorschriften dürfen nicht überschritten werden.",
      ],
      [
        "Muss die Festlegung der Prüffrist dokumentiert werden?",
        "Ja. Das Ergebnis der Gefährdungsbeurteilung ist nach § 6 ArbSchG zu dokumentieren; dazu gehören die festgelegten Prüffristen und ihre Begründung.",
      ],
      [
        "Was gilt, wenn keine Vorschrift eine Frist nennt?",
        "Dann legt der Arbeitgeber die Frist vollständig selbst fest, so dass das Arbeitsmittel bis zur nächsten Prüfung sicher verwendet werden kann.",
      ],
      [
        "Wie oft sollten festgelegte Prüffristen überprüft werden?",
        "Spätestens wenn eine Prüfung ergibt, dass das Arbeitsmittel nicht bis zur nächsten Prüfung sicher verwendet werden kann (§ 14 Abs. 2 BetrSichV), sowie nach Änderungen an Nutzung oder Umgebung. Bewährt hat sich zusätzlich eine jährliche Auswertung der Prüfergebnisse.",
      ],
    ],
    sources: [
      ["BetrSichV", "§ 3 Abs. 6, § 14 Abs. 2, § 22 Abs. 1 Nr. 1, Anhang 2"],
      ["ArbSchG", "§§ 5, 6"],
      ["TRBS 1201", "Prüfungen und Kontrollen von Arbeitsmitteln"],
      ["DGUV V3", "Durchführungsanweisungen zu § 5, Tabelle 1B"],
      ["DIN EN 15635", "Experteninspektion"],
    ],
    related: [
      ["Prüffristen im Überblick", "/prueffristen", "Richtwerte je Prüfbereich"],
      ["Betreiberpflichten", "/betreiberpflichten", "Übersicht"],
      ["Betreiberpflichtenkataster erstellen", "/wissen/betreiberpflichtenkataster-erstellen", "Fristen dokumentieren"],
      ["UVV-Prüfung", "/uvv-pruefung", "Mindestfristen der Unfallverhütungsvorschriften"],
    ],
    cta: "Prüffristen für alle Standorte festlegen und überwachen lassen.",
  },
];
