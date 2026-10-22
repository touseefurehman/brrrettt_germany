import type { Article } from "./pages";

// Fachartikel Cluster Trinkwasser & Lüftung – Longtail zu „legionellenprüfung“ und „vdi 6022“ (Anlage A Nr. 3, 4).
// TrinkwV 2023 am Volltext geprüft: §§ 31, 40, 41, 44, 51, 52, 53, 64, 68, 72, Anlage 3 Teil II.
// Preise mit Quelle und Stichmonat (R-07).

const published = "2026-10-22";

export const wasserLuftArticles: Article[] = [
  {
    slug: "legionellenpruefung-vermieter",
    keyword: "legionellenprüfung vermieter",
    secondary: ["legionellenprüfung pflicht vermieter", "legionellen mehrfamilienhaus", "trinkwasserverordnung vermieter", "legionellenprüfung weg"],
    cluster: "Trinkwasser & Lüftung",
    title: "Legionellenprüfung für Vermieter: Pflicht und Ablauf",
    description:
      "Legionellenprüfung für Vermieter: wann sie nach § 31 TrinkwV Pflicht ist, alle drei Jahre, Ablauf, Dokumentation und was bei einem Befund gilt.",
    h1: "Legionellenprüfung für Vermieter: wann sie Pflicht ist und wie sie abläuft",
    kicker: "TRINKWASSER",
    teaser: "Die drei Voraussetzungen der Prüfpflicht, der Drei-Jahres-Rhythmus und was Vermieter dokumentieren müssen.",
    published,
    modified: published,
    lead: [
      "Vermieter müssen das Trinkwasser nach § 31 TrinkwV mindestens alle drei Jahre auf Legionellen untersuchen lassen, wenn im Gebäude eine Großanlage zur Trinkwassererwärmung und Duschen oder andere vernebelnde Entnahmestellen vorhanden sind und es sich nicht um ein Ein- oder Zweifamilienhaus handelt. Die Vermietung gilt dabei als gewerbliche Tätigkeit.",
    ],
    blocks: [
      { type: "h2", text: "Wann die Pflicht besteht", id: "pflicht" },
      {
        type: "table",
        caption: "Voraussetzungen nach § 31 Abs. 1 TrinkwV – alle müssen erfüllt sein",
        head: ["Voraussetzung", "Erfüllt, wenn …"],
        rows: [
          ["Großanlage zur Trinkwassererwärmung", "Speicher- oder zentraler Durchfluss-Trinkwassererwärmer mit mehr als 400 Litern oder mehr als 3 Liter Inhalt in mindestens einer Leitung zwischen Erwärmer und Entnahmestelle (ohne Zirkulationsleitung)"],
          ["Vernebelung", "Duschen oder andere Einrichtungen, in denen Trinkwasser vernebelt wird"],
          ["Kein Ein- oder Zweifamilienhaus", "Mehrfamilienhaus, Wohnanlage, gemischt genutztes Gebäude"],
          ["Gewerbliche oder öffentliche Abgabe", "Vermietung (gewerblich) bzw. Schulen, Kliniken, Pflege (öffentlich)"],
        ],
      },
      {
        type: "p",
        text: "Wohnungen mit dezentralen Durchlauferhitzern in jeder Wohnung fallen in der Regel nicht unter die Pflicht, weil keine Großanlage vorliegt. Gemischt versorgte Gebäude sollten je Anlage betrachtet werden. Die Pflicht trifft den **Betreiber der Wasserversorgungsanlage** – beim vermieteten Mehrfamilienhaus den Eigentümer, bei Wohnungseigentum die Gemeinschaft der Wohnungseigentümer, vertreten durch den Verwalter.",
      },
      { type: "h2", text: "Wie oft untersucht wird", id: "intervall" },
      {
        type: "p",
        text: "Bei gewerblicher, nicht öffentlicher Abgabe – also bei Vermietung – mindestens alle drei Jahre (§ 31 Abs. 2 Nr. 2 Buchst. a TrinkwV). Betreibt der Vermieter zugleich eine öffentliche Einrichtung im Gebäude, etwa eine Kita, gilt für diese Anlage die jährliche Untersuchung. Eine Übersicht aller Intervalle steht auf der Seite [Legionellenprüfung](/legionellenpruefung).",
      },
      { type: "h2", text: "Ablauf der Untersuchung", id: "ablauf" },
      {
        type: "steps",
        items: [
          "**Pflicht je Gebäude klären:** Speichergröße, Leitungsinhalt, Duschen, Gebäudeart.",
          "**Probennahmestellen prüfen:** Der Betreiber muss geeignete Probennahmestellen an repräsentativen Stellen bereitstellen (§ 41 TrinkwV), meist am Austritt des Trinkwassererwärmers, am Zirkulationseintritt und an entfernten Strängen.",
          "**Zugelassene Untersuchungsstelle beauftragen** (§ 40 TrinkwV); sie nimmt die Proben als systemische Untersuchung.",
          "**Mieter informieren**, dass Zugang zu Entnahmestellen in einzelnen Wohnungen nötig sein kann.",
          "**Ergebnis dokumentieren:** Der Betreiber hält jedes Untersuchungsergebnis in einer Niederschrift fest (§ 44 Abs. 1 TrinkwV). Legionellenbefunde unterhalb des Maßnahmenwerts müssen dem Gesundheitsamt nicht übersandt werden (§ 44 Abs. 2 TrinkwV).",
        ],
      },
      { type: "h2", text: "Wenn Legionellen gefunden werden", id: "befund" },
      {
        type: "p",
        text: "Erreicht ein Befund den technischen Maßnahmenwert von 100 KBE je 100 ml (Anlage 3 Teil II TrinkwV), zeigt die Untersuchungsstelle das dem Gesundheitsamt an (§ 53). Der Vermieter muss unverzüglich die Ursachen klären, eine schriftliche Risikoabschätzung erstellen und die erforderlichen Maßnahmen umsetzen (§ 51). Die Mieter sind unverzüglich zu informieren, sobald das Ergebnis der Risikoabschätzung und etwaige Nutzungseinschränkungen vorliegen (§ 52 Abs. 3). Details: [Legionellen: Maßnahmenwert und Pflichten](/wissen/legionellen-massnahmenwert).",
      },
      { type: "h2", text: "Was die Untersuchung kostet", id: "kosten" },
      {
        type: "p",
        text: "Veröffentlichte Angaben nennen 30 bis 60 Euro je Wohneinheit zuzüglich Anfahrt, bei kleineren Mehrfamilienhäusern im Mittel 200 bis 300 Euro je Untersuchung (immowelt.de, aktualisiert 24.07.2026). Ob die Kosten auf die Mieter umgelegt werden können, ist eine mietrechtliche Frage, die Sie mit Ihrer Rechtsberatung klären sollten. Mehr: [Legionellenprüfung Kosten](/wissen/legionellenpruefung-kosten).",
      },
      {
        type: "checklist",
        items: [
          "Liste aller Gebäude mit zentraler Warmwasserbereitung, Speichergröße und Duschen",
          "Probennahmeventile vorhanden und zugänglich",
          "Termin der letzten Untersuchung je Anlage, nächster Termin spätestens drei Jahre danach",
          "Niederschriften der Ergebnisse je Anlage abgelegt",
          "Ablauf für den Fall eines Befunds schriftlich festgelegt",
        ],
      },
      {
        type: "example",
        title: "Bestandshalter mit 140 Mehrfamilienhäusern",
        text: [
          "In 96 Häusern wird Warmwasser zentral bereitet. Die Prüfung je Gebäude ergibt: 81 sind Großanlagen mit Duschen, 15 bleiben unter den Schwellen. Für 12 Anlagen fehlen Probennahmeventile.",
          "Die Ventile werden nachgerüstet, die 81 Anlagen auf einen Drei-Jahres-Plan verteilt – je Jahr rund 27 Untersuchungen, gebündelt nach Quartieren. Die Niederschriften laufen zentral zusammen; der Ablauf für einen Befund liegt als Arbeitsanweisung vor.",
        ],
      },
      { type: "h2", text: "Folgen einer versäumten Untersuchung", id: "folgen" },
      {
        type: "p",
        text: "Wer eine Untersuchung nach § 31 Abs. 1 TrinkwV nicht oder nicht rechtzeitig durchführt, handelt ordnungswidrig (§ 72 Abs. 1 Nr. 10 TrinkwV). Schwerer wiegt das Haftungsrisiko bei einer Legionellose-Erkrankung eines Mieters. Wie Wohnungsunternehmen diese Pflicht über den Bestand organisieren: [Betreiberpflichten Wohnungsunternehmen](/betreiberpflichten/wohnungsunternehmen).",
      },
      { type: "h2", text: "Häufige Fehler von Vermietern", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Untersuchungspflicht nur nach Speichergröße beurteilt – der Leitungsinhalt von mehr als 3 Litern wird übersehen",
          "Gebäude ohne Duschen fälschlich als pflichtig eingestuft oder Gebäude mit Duschen übersehen",
          "Untersuchung beauftragt, aber keine Probennahmeventile vorhanden – der Termin platzt",
          "Niederschrift liegt nur beim Labor, nicht beim Vermieter",
          "Kein vorbereiteter Ablauf für einen Befund – im Ernstfall vergehen Tage bis zur ersten Maßnahme",
        ],
      },
      { type: "h2", text: "Viele Gebäude, ein Plan", id: "bestand" },
      {
        type: "p",
        text: "Wohnungsunternehmen und Genossenschaften mit größeren Beständen sollten die Untersuchungspflicht einmal für alle Gebäude systematisch klären und das Ergebnis je Wirtschaftseinheit festhalten: zentrale oder dezentrale Warmwasserbereitung, Speichergröße, Leitungsinhalt, Duschen, Probennahmestellen. Auf dieser Grundlage lassen sich die Untersuchungen gleichmäßig auf drei Jahre verteilen, sodass jedes Jahr etwa ein Drittel der pflichtigen Anlagen untersucht wird. Das glättet Kosten und Aufwand, und die Untersuchungsstelle kann Probennahmen nach Quartieren bündeln.",
      },
      {
        type: "table",
        caption: "Beispiel einer Erfassung je Gebäude",
        head: ["Gebäude", "Warmwasser", "Großanlage", "Duschen", "Pflicht", "Nächste Untersuchung"],
        rows: [
          ["Musterstraße 1–5", "zentral, Speicher 750 l", "ja", "ja", "ja", "Q2/2027"],
          ["Lindenweg 12", "zentral, Speicher 300 l, Leitungsinhalt über 3 l", "ja", "ja", "ja", "Q4/2026"],
          ["Am Park 3", "dezentrale Durchlauferhitzer", "nein", "ja", "nein", "–"],
        ],
      },
      { type: "h2", text: "Mieter einbeziehen", id: "mieter" },
      {
        type: "p",
        text: "Für die Probennahme kann der Zugang zu einzelnen Wohnungen nötig sein, etwa an der entferntesten Entnahmestelle eines Strangs. Kündigen Sie Termine rechtzeitig an und benennen Sie eine Ansprechperson. Bei einem Befund über dem Maßnahmenwert verlangt § 52 Abs. 3 TrinkwV, dass die betroffenen Verbraucher unverzüglich über das Ergebnis der Risikoabschätzung und etwaige Nutzungseinschränkungen informiert werden. Eine vorbereitete Mieterinformation spart im Ernstfall Zeit und schafft Vertrauen.",
      },
      { type: "h2", text: "Betrieb zwischen den Untersuchungen", id: "betrieb" },
      {
        type: "p",
        text: "Die Untersuchung alle drei Jahre zeigt nur einen Zeitpunkt. Ob Legionellen sich vermehren, entscheidet der Betrieb der Anlage in den Jahren dazwischen: ausreichende Temperaturen im Warmwasser- und Zirkulationssystem, kein Stagnationswasser in wenig genutzten Leitungen, gewartete Trinkwassererwärmer. Die Trinkwasserverordnung verlangt, dass die Anlage nach den allgemein anerkannten Regeln der Technik betrieben wird; die Untersuchung prüft, ob das gelingt. Leerstehende Wohnungen sind ein typisches Risiko, weil dort über Wochen kein Wasser fließt. Regelmäßiges Spülen leerstehender Einheiten und eine Kontrolle der Temperaturen durch Haustechnik oder Wartungsfirma senken das Befundrisiko deutlich – und damit die Folgekosten, die ein Befund nach § 51 TrinkwV auslöst.",
      },
      {
        type: "p",
        text: "Für Hausverwaltungen, die Objekte verschiedener Eigentümer betreuen, gilt dasselbe Vorgehen je Objekt. Die Pflicht trifft den jeweiligen Eigentümer bzw. die Gemeinschaft der Wohnungseigentümer; die Verwaltung organisiert die Untersuchung, legt die Niederschriften ab und informiert die Eigentümer über Termine, Kosten und Ergebnisse. Ein Ablaufplan für den Befundfall sollte mit den Eigentümern vorab abgestimmt sein.",
      },
    ],
    faqs: [
      [
        "Muss jeder Vermieter eine Legionellenprüfung machen?",
        "Nein. Pflicht ist sie nur bei einer Großanlage zur Trinkwassererwärmung mit Duschen oder anderen vernebelnden Entnahmestellen außerhalb von Ein- und Zweifamilienhäusern (§ 31 Abs. 1 TrinkwV).",
      ],
      [
        "Wie oft muss ein Vermieter auf Legionellen prüfen lassen?",
        "Mindestens alle drei Jahre, weil Vermietung als gewerbliche, nicht öffentliche Tätigkeit gilt (§ 31 Abs. 2 Nr. 2 Buchst. a TrinkwV).",
      ],
      [
        "Muss der Vermieter das Ergebnis dem Gesundheitsamt schicken?",
        "Ergebnisse der Legionellenuntersuchung nach § 31 müssen nicht übersandt werden (§ 44 Abs. 2 TrinkwV). Wird der Maßnahmenwert erreicht, zeigt die Untersuchungsstelle das dem Gesundheitsamt an; der Vermieter hat eigene Handlungspflichten nach § 51.",
      ],
      [
        "Wer ist bei einer Eigentümergemeinschaft verantwortlich?",
        "Die Gemeinschaft der Wohnungseigentümer als Betreiberin der gemeinschaftlichen Anlage; der Verwalter organisiert die Untersuchung.",
      ],
      [
        "Sind Wohnungen mit Durchlauferhitzern von der Legionellenprüfung befreit?",
        "In der Regel ja, wenn das Warmwasser dezentral in jeder Wohnung erzeugt wird und damit keine Großanlage zur Trinkwassererwärmung vorliegt. Maßgeblich sind Speichergröße und Leitungsinhalt nach § 31 Abs. 1 TrinkwV.",
      ],
    ],
    sources: [
      ["TrinkwV", "§ 31 Abs. 1 und 2, §§ 40, 41, 44, 51, 52 Abs. 3, 53, 72 Abs. 1 Nr. 10, Anlage 3 Teil II"],
      ["UBA Legionellen", "Risikoabschätzung"],
    ],
    related: [
      ["Legionellenprüfung", "/legionellenpruefung", "Pflicht und Intervalle"],
      ["Legionellenprüfung Kosten", "/wissen/legionellenpruefung-kosten", "Preise mit Quellen"],
      ["Legionellen: Maßnahmenwert", "/wissen/legionellen-massnahmenwert", "Was bei Befund gilt"],
      ["Betreiberpflichten Hausverwaltung", "/wissen/betreiberpflichten-hausverwaltung", "WEG"],
    ],
    cta: "Legionellenprüfungen für den gesamten Bestand planen.",
  },
  {
    slug: "legionellenpruefung-kosten",
    keyword: "legionellenprüfung kosten",
    secondary: ["legionellenprüfung preis", "trinkwasseruntersuchung kosten", "legionellen probennahme kosten", "probennahmeventil nachrüsten"],
    cluster: "Trinkwasser & Lüftung",
    title: "Legionellenprüfung Kosten: Preise je Wohneinheit und Haus",
    description:
      "Legionellenprüfung Kosten: Preise je Wohneinheit und Gebäude, Probennahmestellen, Anfahrt, Nachrüstung von Ventilen und Kosten bei einem Befund.",
    h1: "Legionellenprüfung: Kosten je Wohneinheit, Gebäude und Befund",
    kicker: "TRINKWASSER",
    teaser: "Veröffentlichte Preisspannen mit Quelle, wovon der Preis abhängt und welche Kosten bei einem Befund hinzukommen.",
    published,
    modified: published,
    lead: [
      "Eine Legionellenprüfung kostet nach veröffentlichten Angaben (immowelt.de, aktualisiert 24.07.2026) rund 30 bis 60 Euro je Wohneinheit zuzüglich Anfahrt; bei kleineren Mehrfamilienhäusern liegt eine Untersuchung im Mittel bei 200 bis 300 Euro, bei größeren Liegenschaften bei 800 Euro und mehr. Den Preis bestimmt vor allem die Zahl der Probennahmestellen.",
    ],
    blocks: [
      { type: "h2", text: "Preisspannen", id: "preise" },
      {
        type: "table",
        caption: "Veröffentlichte Preisangaben – keine Gebührenordnung",
        head: ["Bezug", "Spanne", "Quelle, Stand"],
        rows: [
          ["je Wohneinheit, zuzüglich Anfahrt", "30–60 €", "immowelt.de, 24.07.2026"],
          ["je Untersuchung, kleineres Mehrfamilienhaus", "im Mittel 200–300 €", "immowelt.de, 24.07.2026"],
          ["je Untersuchung, größere Liegenschaft", "ab 800 €", "immowelt.de, 24.07.2026"],
        ],
      },
      {
        type: "note",
        text: "Für Trinkwasseruntersuchungen gibt es keine amtliche Gebührenordnung. Die Werte sind veröffentlichte Orientierungswerte; die Preise der Untersuchungsstellen unterscheiden sich regional deutlich.",
      },
      { type: "h2", text: "Wovon der Preis abhängt", id: "faktoren" },
      {
        type: "table",
        head: ["Faktor", "Warum"],
        rows: [
          ["Zahl der Probennahmestellen", "Die systemische Untersuchung erfolgt an mehreren repräsentativen Stellen (§ 41 TrinkwV); jede Probe wird entnommen und analysiert."],
          ["Zahl der Steigstränge", "Mehr Stränge bedeuten mehr repräsentative Entnahmestellen."],
          ["Anfahrt", "Bei vielen kleinen Objekten fällt sie je Gebäude an."],
          ["Zugänglichkeit", "Probennahme in Wohnungen erfordert Termine mit Mietern."],
          ["Fehlende Probennahmeventile", "Nachrüstung durch einen Installateur vor der ersten Untersuchung."],
        ],
      },
      { type: "h2", text: "Kosten, die vor und nach der Untersuchung entstehen", id: "zusatzkosten" },
      {
        type: "p",
        text: "Vor der ersten Untersuchung fehlen häufig geeignete Probennahmestellen, die der Betreiber bereitstellen muss (§ 41 TrinkwV). Ihre Nachrüstung ist eine einmalige Installateurleistung. Wird der technische Maßnahmenwert von 100 KBE je 100 ml erreicht, kommen weitere Kosten hinzu: Ortsbesichtigung und Ursachenklärung, schriftliche Risikoabschätzung, technische Maßnahmen und Nachuntersuchungen (§ 51 TrinkwV). Diese Folgekosten übersteigen die Routineuntersuchung meist deutlich – Prävention durch Betrieb nach den anerkannten Regeln der Technik ist der größte Kostenhebel.",
      },
      { type: "h2", text: "Wie oft die Kosten anfallen", id: "intervall" },
      {
        type: "p",
        text: "Bei Vermietung mindestens alle drei Jahre, bei öffentlicher Tätigkeit (Schulen, Kitas, Kliniken, Pflege) mindestens jährlich (§ 31 Abs. 2 TrinkwV). Für öffentliche Einrichtungen kann das Gesundheitsamt nach drei beanstandungsfreien Jahren bis zu drei Jahre festlegen – nicht für Kliniken und Pflegeeinrichtungen (§ 31 Abs. 3). Ob eine Anlage überhaupt untersuchungspflichtig ist: [Legionellenprüfung für Vermieter](/wissen/legionellenpruefung-vermieter).",
      },
      { type: "h2", text: "Rechenbeispiel für einen Wohnungsbestand", id: "rechenbeispiel" },
      {
        type: "table",
        caption: "Eigene Beispielrechnung mit dem Mittelwert 250 € je Untersuchung eines kleineren Mehrfamilienhauses (immowelt.de, 07/2026)",
        head: ["Bestand", "Pflichtige Anlagen", "Untersuchungen pro Jahr bei 3-Jahres-Rhythmus", "Kosten pro Jahr"],
        rows: [
          ["30 Mehrfamilienhäuser", "24", "8", "rund 2.000 €"],
          ["120 Mehrfamilienhäuser", "96", "32", "rund 8.000 €"],
        ],
      },
      {
        type: "p",
        text: "Das Beispiel zeigt die Größenordnung; Rabatte für Rahmenverträge, Anfahrten und Nachrüstungen verändern das Ergebnis. Wer die Untersuchungen gleichmäßig auf drei Jahre verteilt, glättet zudem die Kosten.",
      },
      {
        type: "checklist",
        items: [
          "Untersuchungspflicht je Gebäude prüfen – nicht jede zentrale Warmwasserbereitung ist eine Großanlage",
          "Probennahmeventile vor der Ausschreibung erfassen und nachrüsten",
          "Rahmenvertrag mit einer Untersuchungsstelle für den gesamten Bestand",
          "Untersuchungen nach Quartieren bündeln",
          "Umlagefähigkeit auf Mieter mit der Rechtsberatung klären",
        ],
      },
      {
        type: "example",
        title: "Kommune mit 31 Schulen, Kitas und Sporthallen",
        text: [
          "Für öffentliche Einrichtungen gilt die jährliche Untersuchung. Bisher beauftragte jede Einrichtung selbst; Probennahmen in Sporthallen fielen in die Vereinsnutzung und wurden verschoben.",
          "Die Kommune schreibt die Untersuchungen als Rahmenvertrag aus, legt alle Probennahmen in die Ferien und beantragt für Einrichtungen mit drei beanstandungsfreien Jahren beim Gesundheitsamt die Verlängerung nach § 31 Abs. 3 TrinkwV. Das senkt die Zahl der Untersuchungen ab dem vierten Jahr spürbar.",
        ],
      },
      { type: "h2", text: "Angebote vergleichbar machen", id: "angebote" },
      {
        type: "p",
        text: "Angebote von Untersuchungsstellen unterscheiden sich weniger im Preis je Probe als im Leistungsumfang. Manche Angebote enthalten Anfahrt, Probennahme, Laboranalyse und Befundbericht, andere rechnen jede Position einzeln ab. Für einen Vergleich sollten Sie eine Liste der Anlagen mit Zahl der Probennahmestellen vorgeben und einen Preis je Anlage inklusive aller Positionen anfragen. Wichtig ist außerdem, dass die Untersuchungsstelle nach § 40 TrinkwV zugelassen ist und die Niederschrift in einer Form liefert, die Sie ohne Umwege ablegen können.",
      },
      {
        type: "table",
        caption: "Positionen, die ein vollständiges Angebot ausweisen sollte",
        head: ["Position", "Hinweis"],
        rows: [
          ["Anfahrt", "je Termin oder je Gebäude – bei vielen Gebäuden entscheidend"],
          ["Probennahme", "je Probennahmestelle"],
          ["Laboranalyse Legionella spec.", "je Probe"],
          ["Befundbericht und Niederschrift", "je Anlage, Format und Lieferzeit festlegen"],
          ["Anzeige bei Befund", "Pflicht der Untersuchungsstelle nach § 53 TrinkwV – sollte enthalten sein"],
          ["Nachuntersuchung", "Preis für den Fall eines Befunds vorab vereinbaren"],
        ],
      },
      { type: "h2", text: "Kosten eines Befunds vorab einplanen", id: "befund" },
      {
        type: "p",
        text: "Ein Befund über dem Maßnahmenwert löst Kosten aus, die sich vorab nur grob planen lassen: Ortsbesichtigung, Risikoabschätzung durch Fachleute, Spülungen, technische Änderungen an der Installation, gegebenenfalls endständige Filter und Nachuntersuchungen. Wer einen Bestand mit vielen Anlagen betreut, sollte dafür eine Reserve im Instandhaltungsbudget vorsehen und Rahmenvereinbarungen mit einem Sachverständigen und einem Installateur treffen. Das verkürzt die Reaktionszeit, die § 51 TrinkwV mit dem Wort „unverzüglich“ vorgibt.",
      },
      { type: "h2", text: "Kosten in öffentlichen Einrichtungen", id: "oeffentlich" },
      {
        type: "p",
        text: "Schulen, Kitas, Sporthallen, Krankenhäuser und Pflegeeinrichtungen untersuchen bei öffentlicher Tätigkeit jährlich. Die laufenden Kosten sind dort also etwa dreimal so hoch wie bei vermieteten Wohngebäuden mit gleicher Anlagengröße. Für Schulen, Kitas und Sporthallen kann das Gesundheitsamt nach drei beanstandungsfreien Jahren bis zu drei Jahre festlegen (§ 31 Abs. 3 TrinkwV); für Krankenhäuser und Pflegeeinrichtungen ist das ausgeschlossen. Ein sauber dokumentierter, beanstandungsfreier Betrieb ist damit für Kommunen ein direkter Kostenhebel.",
      },
      { type: "h2", text: "Einmalige Kosten bei der ersten Untersuchung", id: "erstuntersuchung" },
      {
        type: "p",
        text: "Bei Gebäuden, die noch nie untersucht wurden, fallen vor der ersten Probennahme häufig einmalige Kosten an. Der Betreiber muss geeignete Probennahmestellen an repräsentativen Stellen bereitstellen (§ 41 TrinkwV). Fehlen sie, baut ein Installateur Probennahmeventile ein – am Austritt des Trinkwassererwärmers, am Eintritt der Zirkulation und an den Strängen. Zusätzlich lohnt eine Bestandsaufnahme der Installation: Wo stehen Speicher, wie verlaufen Stränge, gibt es abgesperrte Leitungen? Diese Unterlagen braucht später auch der Sachverständige, falls ein Befund eine Risikoabschätzung erfordert. Wer sie bereits hat, spart im Ernstfall Zeit und Geld.",
      },
      {
        type: "p",
        text: "Für die Budgetplanung empfiehlt sich deshalb eine Trennung: einmalige Kosten für Erfassung und Nachrüstung im ersten Jahr, danach planbare laufende Kosten für die Untersuchungen im Drei-Jahres- bzw. Jahresrhythmus und eine Reserve für Befunde. Bei Wohnungsunternehmen mit vielen Gebäuden lässt sich die Nachrüstung oft mit ohnehin geplanten Instandhaltungsarbeiten an der Trinkwasserinstallation verbinden.",
      },
      {
        type: "p",
        text: "Ein letzter Hinweis zur Einordnung: Die Untersuchung selbst ist der kleinste Kostenblock. Teuer werden fehlende Probennahmestellen, verschobene Termine wegen fehlender Zugänge und vor allem Befunde, die bei einem Betrieb nach den Regeln der Technik vermeidbar gewesen wären. Wer die Untersuchungen in einen gemeinsamen Plan mit Wartung und Instandhaltung der Trinkwasserinstallation einbindet, senkt die Gesamtkosten am wirksamsten. Für Kommunen und Wohnungsunternehmen mit vielen Gebäuden ist ein solcher Plan zugleich die Grundlage für belastbare Haushalts- und Wirtschaftspläne. Er zeigt außerdem früh, in welchen Jahren besonders viele Untersuchungen anfallen, sodass sich Spitzen durch Vorziehen einzelner Termine ausgleichen lassen.",
      },
    ],
    faqs: [
      [
        "Was kostet eine Legionellenprüfung im Mehrfamilienhaus?",
        "Veröffentlichte Angaben nennen 30 bis 60 Euro je Wohneinheit zuzüglich Anfahrt bzw. im Mittel 200 bis 300 Euro je Untersuchung eines kleineren Mehrfamilienhauses (immowelt.de, 07/2026).",
      ],
      [
        "Welche Kosten kommen bei einem positiven Befund hinzu?",
        "Ursachenklärung mit Ortsbesichtigung, schriftliche Risikoabschätzung, technische Maßnahmen und Nachuntersuchungen nach § 51 TrinkwV. Diese Kosten liegen meist deutlich über denen der Routineuntersuchung.",
      ],
      [
        "Kann man die Kosten der Legionellenprüfung senken?",
        "Ja: Pflicht je Gebäude klären, Untersuchungen bündeln, Rahmenverträge schließen und bei öffentlichen Einrichtungen nach drei beanstandungsfreien Jahren die Verlängerung nach § 31 Abs. 3 TrinkwV beantragen.",
      ],
      [
        "Muss die Untersuchungsstelle zugelassen sein?",
        "Ja. Die Untersuchung auf Legionellen nach § 31 TrinkwV erfolgt durch eine zugelassene Untersuchungsstelle (§ 40 TrinkwV). Lassen Sie sich die Zulassung vor der Beauftragung bestätigen.",
      ],
      [
        "Sind die Kosten in öffentlichen Gebäuden höher?",
        "Bei öffentlicher Tätigkeit wird jährlich untersucht statt alle drei Jahre. Die laufenden Kosten sind dadurch bei gleicher Anlagengröße etwa dreimal so hoch, sofern das Gesundheitsamt keine Verlängerung nach § 31 Abs. 3 TrinkwV festlegt.",
      ],
    ],
    sources: [
      ["TrinkwV", "§ 31 Abs. 2 und 3, § 41, § 51, Anlage 3 Teil II"],
      ["UBA Legionellen", "Risikoabschätzung"],
    ],
    related: [
      ["Legionellenprüfung", "/legionellenpruefung", "Pflicht und Intervalle"],
      ["Legionellenprüfung für Vermieter", "/wissen/legionellenpruefung-vermieter", "Wann die Pflicht besteht"],
      ["Legionellen: Maßnahmenwert", "/wissen/legionellen-massnahmenwert", "Pflichten bei Befund"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Schulen und Sporthallen"],
    ],
    cta: "Legionellenuntersuchungen bestandsweit ausschreiben lassen.",
  },
  {
    slug: "legionellen-massnahmenwert",
    keyword: "legionellen maßnahmenwert",
    secondary: ["legionellen grenzwert", "technischer maßnahmenwert legionellen", "100 kbe legionellen", "legionellen befund was tun", "gefährdungsanalyse legionellen"],
    cluster: "Trinkwasser & Lüftung",
    title: "Legionellen-Maßnahmenwert 100 KBE: Pflichten bei Befund",
    description:
      "Technischer Maßnahmenwert für Legionellen: 100 KBE/100 ml nach TrinkwV. Was er bedeutet, wer informiert wird, Risikoabschätzung und Maßnahmen.",
    h1: "Legionellen-Maßnahmenwert: was bei 100 KBE je 100 ml zu tun ist",
    kicker: "TRINKWASSER",
    teaser: "Was der technische Maßnahmenwert ist, wer wen informiert und welche Schritte § 51 TrinkwV verlangt.",
    published,
    modified: published,
    lead: [
      "Der technische Maßnahmenwert für Legionellen beträgt 100 koloniebildende Einheiten je 100 Milliliter Trinkwasser (Anlage 3 Teil II TrinkwV). Er ist kein Grenzwert im Sinne einer akuten Gesundheitsgefahr, sondern ein Auslöser: Wird er erreicht, muss der Betreiber nach § 51 TrinkwV unverzüglich die Ursachen klären, eine schriftliche Risikoabschätzung erstellen und Maßnahmen umsetzen.",
    ],
    blocks: [
      { type: "h2", text: "Maßnahmenwert oder Grenzwert?", id: "begriff" },
      {
        type: "definition",
        term: "Technischer Maßnahmenwert",
        text: "Ein Wert, bei dessen Erreichen davon auszugehen ist, dass die Trinkwasserinstallation nicht nach den allgemein anerkannten Regeln der Technik betrieben wird oder eine technische Ursache vorliegt. Für Legionella spec. liegt er bei 100 KBE/100 ml. Umgangssprachlich wird er oft als „Legionellen-Grenzwert“ bezeichnet.",
      },
      {
        type: "p",
        text: "Die Trinkwasserverordnung führt Legionellen nicht bei den Grenzwerten, sondern als speziellen Indikatorparameter für Trinkwasserinstallationen. Das ist mehr als eine Begriffsfrage: Der Maßnahmenwert verlangt technische Ursachenforschung und Abhilfe; über Nutzungseinschränkungen wie ein Duschverbot entscheidet die Risikoabschätzung bzw. das Gesundheitsamt.",
      },
      { type: "h2", text: "Wer wen informiert", id: "information" },
      {
        type: "table",
        head: ["Wer", "Pflicht", "Fundstelle"],
        rows: [
          ["Zugelassene Untersuchungsstelle", "Anzeige an das Gesundheitsamt mit allen Ergebnissen der systemischen Untersuchung", "§ 53 TrinkwV"],
          ["Betreiber", "Anzeige an das Gesundheitsamt, sofern die Anzeige der Untersuchungsstelle nicht nachgewiesen ist", "§ 51 Abs. 1 Nr. 1 TrinkwV"],
          ["Betreiber", "Information der betroffenen Verbraucher über das Ergebnis der Risikoabschätzung und Nutzungseinschränkungen", "§ 52 Abs. 3 TrinkwV"],
          ["Gesundheitsamt", "Anordnungen zur Gefahrenabwehr und besondere Maßnahmen", "§§ 64, 68 TrinkwV"],
        ],
      },
      { type: "h2", text: "Die Pflichten des Betreibers nach § 51 TrinkwV", id: "pflichten" },
      {
        type: "steps",
        items: [
          "**Unverzüglich anzeigen**, soweit nicht bereits durch die Untersuchungsstelle geschehen (Abs. 1 Nr. 1).",
          "**Ursachen klären** – mit Ortsbesichtigung und Prüfung, ob die Installation den allgemein anerkannten Regeln der Technik entspricht (Abs. 1 Nr. 2).",
          "**Schriftliche Risikoabschätzung erstellen** unter Beachtung der Empfehlung des Umweltbundesamts (Abs. 1 Nr. 3). Sie enthält mindestens Anlagenbeschreibung, Beobachtungen der Ortsbesichtigung, festgestellte Abweichungen von den Regeln der Technik, sonstige Erkenntnisse und alle Legionellenbefunde mit Probennahmestellen, Datum und Uhrzeit (Abs. 2).",
          "**Maßnahmen durchführen**, die zum Schutz der Verbraucher nach den Regeln der Technik erforderlich sind (Abs. 1 Nr. 4).",
          "**Verbraucher informieren**, sobald Ergebnis der Risikoabschätzung und Empfehlungen vorliegen (§ 52 Abs. 3).",
        ],
      },
      { type: "h2", text: "Typische Ursachen und Maßnahmen", id: "ursachen" },
      {
        type: "table",
        head: ["Typische Ursache", "Mögliche Maßnahme"],
        rows: [
          ["Zu niedrige Temperaturen im Warmwasser- oder Zirkulationssystem", "Einstellung von Trinkwassererwärmer und Zirkulation nach den Regeln der Technik, hydraulischer Abgleich"],
          ["Stagnation in wenig genutzten Leitungen", "Regelmäßiges Spülen, Rückbau toter Leitungen"],
          ["Überdimensionierte Speicher", "Anpassung oder Austausch"],
          ["Fehlende oder defekte Komponenten", "Instandsetzung, Austausch von Duschköpfen und Armaturen"],
          ["Kurzfristige Gefahrenabwehr", "nach Risikoabschätzung bzw. Anordnung, z. B. endständige Filter oder Nutzungseinschränkungen"],
        ],
      },
      {
        type: "note",
        text: "Welche Maßnahme im Einzelfall richtig ist, ergibt sich aus der Risikoabschätzung durch Fachleute. Temperaturwerte und technische Detailanforderungen stehen in den technischen Regeln für Trinkwasserinstallationen und werden hier nicht wiedergegeben.",
      },
      {
        type: "example",
        title: "Pflegeeinrichtung mit Befund in einem Wohnbereich",
        text: [
          "Bei der jährlichen Untersuchung liegen zwei von acht Proben über dem Maßnahmenwert, beide im selben Strang. Die Untersuchungsstelle zeigt den Befund an; die Einrichtung informiert parallel das Gesundheitsamt.",
          "Die Ortsbesichtigung findet einen abgesperrten, nicht zurückgebauten Leitungsabschnitt mit Stagnation. Bis zur Sanierung werden in den betroffenen Duschen endständige Filter eingesetzt; Bewohner und Angehörige werden nach Vorliegen der Risikoabschätzung informiert. Nach Rückbau und Spülung folgt eine Nachuntersuchung.",
        ],
      },
      { type: "h2", text: "Was ein Versäumnis bedeutet", id: "folgen" },
      {
        type: "p",
        text: "Wer die Untersuchungen zur Ursachenklärung nach § 51 Abs. 1 Nr. 2 TrinkwV nicht oder nicht rechtzeitig durchführt, handelt ordnungswidrig (§ 72 Abs. 1 Nr. 10 TrinkwV); dasselbe gilt für weitere Pflichten aus § 51. Kommt der Betreiber seinen Pflichten nicht nach, fordert das Gesundheitsamt ihn unter Fristsetzung auf und kann Maßnahmen anordnen. Wie die Routineuntersuchung organisiert wird: [Legionellenprüfung](/legionellenpruefung). Was sie kostet: [Legionellenprüfung Kosten](/wissen/legionellenpruefung-kosten).",
      },
      { type: "h2", text: "Den Ernstfall vorbereiten", id: "vorbereitung" },
      {
        type: "p",
        text: "Die Pflichten aus § 51 TrinkwV gelten „unverzüglich“. Wer erst nach dem Befund klärt, wer zuständig ist, welcher Sachverständige die Risikoabschätzung erstellt und wie die Mieter oder Bewohner informiert werden, verliert Tage. Ein schriftlicher Ablaufplan für den Befundfall gehört deshalb zu jeder untersuchungspflichtigen Anlage – bei Organisationen mit vielen Gebäuden als Standardablauf für alle.",
      },
      {
        type: "table",
        caption: "Inhalt eines Ablaufplans für den Befundfall",
        head: ["Punkt", "Festlegung"],
        rows: [
          ["Meldekette", "Wer erhält den Befund von der Untersuchungsstelle, wer informiert Leitung und Gesundheitsamt?"],
          ["Sachverständige", "Rahmenvereinbarung für Ortsbesichtigung und Risikoabschätzung"],
          ["Sofortmaßnahmen", "Wer entscheidet über Spülung, Filter oder Nutzungseinschränkungen?"],
          ["Information", "Vorlage für Mieter-, Bewohner- oder Elterninformation nach § 52 Abs. 3"],
          ["Nachuntersuchung", "Beauftragung und Termin nach Abschluss der Maßnahmen"],
          ["Dokumentation", "Ablage aller Befunde, der Risikoabschätzung und der Maßnahmen"],
        ],
      },
      { type: "h2", text: "Unterschiede nach Gebäudeart", id: "gebaeudeart" },
      {
        type: "p",
        text: "In vermieteten Wohngebäuden geht es vor allem um Ursachenklärung, Information der Mieter und technische Abhilfe. In Krankenhäusern und Pflegeeinrichtungen leben Menschen mit höherem Erkrankungsrisiko; dort sind die Abstimmung mit Hygienefachpersonal und Gesundheitsamt und schnelle Schutzmaßnahmen besonders wichtig, und die Untersuchung bleibt jährlich (§ 31 Abs. 3 Satz 2 TrinkwV). In Schulen und Sporthallen sind Duschen oft wenig genutzt; Stagnation ist dort eine häufige Ursache, und regelmäßiges Spülen in Ferienzeiten gehört zur Vorbeugung.",
      },
      {
        type: "checklist",
        items: [
          "Befund sofort an Leitung und Technik weitergeben",
          "Prüfen, ob die Untersuchungsstelle das Gesundheitsamt bereits informiert hat",
          "Sachverständigen für Ortsbesichtigung und Risikoabschätzung beauftragen",
          "Sofortmaßnahmen nach fachlicher Einschätzung umsetzen",
          "Verbraucher nach Vorliegen der Risikoabschätzung informieren",
          "Nachuntersuchung beauftragen und alle Schritte dokumentieren",
        ],
      },
      { type: "h2", text: "Nach der Sanierung", id: "nachher" },
      {
        type: "p",
        text: "Mit der technischen Maßnahme ist der Fall nicht abgeschlossen. Nachuntersuchungen zeigen, ob die Ursache beseitigt ist; erst wenn die Werte wieder unter dem Maßnahmenwert liegen und die Ursache nachvollziehbar behoben wurde, kehrt die Anlage in den regulären Untersuchungsrhythmus zurück. Die Risikoabschätzung, alle Befunde, die durchgeführten Maßnahmen und die Kommunikation mit Gesundheitsamt und Verbrauchern sollten vollständig abgelegt werden. Diese Unterlagen werden wieder gebraucht, wenn das Gesundheitsamt nachfragt, wenn ein Rechtsstreit entsteht oder wenn die Anlage erneut auffällig wird.",
      },
      {
        type: "p",
        text: "Für Organisationen mit vielen Gebäuden lohnt außerdem ein Blick über den Einzelfall hinaus. Häufen sich Befunde in Gebäuden mit gleicher Bauart, gleichem Baujahr oder gleichem Wartungsdienstleister, deutet das auf eine gemeinsame Ursache hin – etwa eine typische Fehlplanung der Zirkulation oder eine ungeeignete Betriebsweise. Eine zentrale Auswertung aller Legionellenbefunde macht solche Muster sichtbar und erlaubt, präventiv in Gebäuden zu handeln, die noch keinen Befund hatten.",
      },
      {
        type: "p",
        text: "Wichtig für die Kommunikation: Ein Befund über dem Maßnahmenwert bedeutet nicht, dass Bewohner bereits erkrankt sind. Er zeigt, dass die Anlage nicht so betrieben wird, wie sie sollte. Eine sachliche, zeitnahe Information nach Vorliegen der Risikoabschätzung schafft mehr Vertrauen als Schweigen oder vorschnelle Aussagen. Bereiten Sie dafür eine Vorlage vor, die Befund, nächste Schritte, Ansprechpartner und gegebenenfalls Verhaltenshinweise enthält, und stimmen Sie sie im Ernstfall mit dem Gesundheitsamt ab. Bei Pflegeeinrichtungen gehören auch Angehörige und Betreuer zu den Adressaten.",
      },
    ],
    faqs: [
      [
        "Wie hoch ist der Grenzwert für Legionellen?",
        "Die Trinkwasserverordnung nennt keinen Grenzwert, sondern einen technischen Maßnahmenwert von 100 KBE je 100 ml (Anlage 3 Teil II). Wird er erreicht, löst das Handlungspflichten nach § 51 TrinkwV aus.",
      ],
      [
        "Was muss ein Vermieter bei einem Legionellenbefund tun?",
        "Unverzüglich das Gesundheitsamt informieren, soweit nicht durch die Untersuchungsstelle geschehen, Ursachen klären, eine schriftliche Risikoabschätzung erstellen, Maßnahmen umsetzen und die Mieter über das Ergebnis informieren (§§ 51, 52 Abs. 3 TrinkwV).",
      ],
      [
        "Muss bei einem Befund das Duschen verboten werden?",
        "Nicht automatisch. Ob Nutzungseinschränkungen nötig sind, ergibt sich aus der Risikoabschätzung oder einer Anordnung des Gesundheitsamts.",
      ],
      [
        "Wer erstellt die Risikoabschätzung?",
        "Der Betreiber ist verantwortlich; er beauftragt dafür in der Regel fachkundige Sachverständige. Grundlage ist die Empfehlung des Umweltbundesamts, auf die § 51 TrinkwV verweist.",
      ],
      [
        "Wann gilt ein Legionellenbefund als erledigt?",
        "Wenn die Ursache geklärt und behoben ist und Nachuntersuchungen zeigen, dass der technische Maßnahmenwert nicht mehr erreicht wird. Der Ablauf und alle Ergebnisse sind zu dokumentieren.",
      ],
    ],
    sources: [
      ["TrinkwV", "Anlage 3 Teil II; § 51 Abs. 1 und 2; § 52 Abs. 3; § 53; §§ 64, 68; § 72 Abs. 1 Nr. 10"],
      ["UBA Legionellen", "Empfehlung zur Gefährdungsanalyse, auf die § 51 Abs. 1 Nr. 3 verweist"],
    ],
    related: [
      ["Legionellenprüfung", "/legionellenpruefung", "Pflicht und Intervalle"],
      ["Legionellenprüfung für Vermieter", "/wissen/legionellenpruefung-vermieter", "Ablauf"],
      ["Betreiberverantwortung Krankenhäuser und Pflege", "/betreiberpflichten/krankenhaeuser", "Jährliche Untersuchung"],
    ],
    cta: "Legionellenbefunde strukturiert abarbeiten lassen.",
  },
  {
    slug: "vdi-6022-hygieneinspektion",
    keyword: "vdi 6022 hygieneinspektion",
    secondary: ["hygieneinspektion rlt anlage", "hygieneinspektion lüftungsanlage ablauf", "vdi 6022 inspektionsbericht", "hygienekontrolle vdi 6022"],
    cluster: "Trinkwasser & Lüftung",
    title: "VDI 6022 Hygieneinspektion: Ablauf, Intervall, Bericht",
    description:
      "Hygieneinspektion nach VDI 6022: Intervall von zwei bzw. drei Jahren, Unterschied zur Hygienekontrolle, Ablauf, Probennahmen und Bericht.",
    h1: "Hygieneinspektion nach VDI 6022: Ablauf, Intervall und Inspektionsbericht",
    kicker: "LÜFTUNG",
    teaser: "Was bei der Inspektion geschieht, wie sie sich von der Hygienekontrolle unterscheidet und was im Bericht stehen sollte.",
    areas: ["lueftung-klima"],
    published,
    modified: published,
    lead: [
      "Die Hygieneinspektion nach VDI 6022 Blatt 1 ist die umfassende hygienische Bewertung einer raumlufttechnischen Anlage durch besonders qualifiziertes Personal. Nach den Richtwerten der Richtlinie findet sie alle drei Jahre statt, bei Anlagen mit Luftbefeuchtung alle zwei Jahre. Dazwischen liegen kürzere Hygienekontrollen.",
    ],
    blocks: [
      { type: "h2", text: "Hygieneinspektion und Hygienekontrolle", id: "unterschied" },
      {
        type: "table",
        head: ["", "Hygienekontrolle", "Hygieneinspektion"],
        rows: [
          ["Zweck", "laufende Überwachung einzelner Komponenten", "umfassende Bewertung der gesamten Anlage"],
          ["Intervall", "kurz, nach Checklisten der VDI 6022 je Komponente", "3 Jahre ohne, 2 Jahre mit Befeuchtung (Richtwert)"],
          ["Personal", "Schulung Kategorie B nach VDI 6022 Blatt 4", "Schulung Kategorie A nach VDI 6022 Blatt 4"],
          ["Ergebnis", "Checkliste, Maßnahmen bei Auffälligkeiten", "Inspektionsbericht mit Bewertung und Maßnahmenempfehlungen"],
        ],
      },
      {
        type: "p",
        text: "Rechtlich verankert ist die Pflicht in § 4 Abs. 3 ArbStättV: Der Arbeitgeber hat raumlufttechnische Anlagen instand zu halten und in regelmäßigen Abständen auf ihre Funktionsfähigkeit prüfen zu lassen. VDI 6022 konkretisiert als allgemein anerkannte Regel der Technik, wie das hygienisch geschieht. Übersicht und Organisation: [VDI 6022](/vdi-6022).",
      },
      { type: "h2", text: "Wer verpflichtet ist", id: "pflicht" },
      {
        type: "p",
        text: "Der Betreiber der Anlage: in Arbeitsstätten der Arbeitgeber, in vermieteten Gebäuden in der Regel der Vermieter für die zentrale Gebäudetechnik. In Krankenhäusern sind Haustechnik und Krankenhaushygiene gemeinsam zuständig, weil zusätzliche Anforderungen an raumlufttechnische Anlagen im Gesundheitswesen gelten.",
      },
      { type: "h2", text: "Ablauf einer Hygieneinspektion", id: "ablauf" },
      {
        type: "steps",
        items: [
          "**Unterlagen sichten:** Anlagenbeschreibung, Wartungs- und Hygienekontrollprotokolle, frühere Inspektionsberichte.",
          "**Begehung:** Außenluftansaugung, Filter, Wärmetauscher, Befeuchter, Kanäle, Luftauslässe – Sichtprüfung auf Verschmutzung, Feuchte, Korrosion, Biofilm.",
          "**Messungen:** physikalische Parameter wie Temperatur und Luftfeuchte.",
          "**Probennahmen:** mikrobiologische Proben, insbesondere bei Befeuchtern und feuchtebelasteten Bauteilen; Auswertung im Labor.",
          "**Bewertung und Bericht:** hygienischer Zustand, Abweichungen von der Richtlinie, Maßnahmen mit Priorität.",
        ],
      },
      {
        type: "checklist",
        items: [
          "Anlagenbezeichnung, Standort und Bauart (mit oder ohne Befeuchtung)",
          "Name und Qualifikation des Inspekteurs (Kategorie A)",
          "Datum, Umfang und Ergebnisse der Begehung, Messungen und Laborbefunde",
          "Bewertung des hygienischen Zustands",
          "Maßnahmen mit Priorität und Termin für die nächste Inspektion",
        ],
      },
      { type: "h2", text: "Wie oft inspiziert wird", id: "intervall" },
      {
        type: "p",
        text: "Die Richtwerte der VDI 6022 Blatt 1 – drei bzw. zwei Jahre – gelten für den bestimmungsgemäßen Betrieb. Zusätzliche Inspektionen sind angezeigt nach Umbauten, bei Auffälligkeiten aus den Hygienekontrollen und bei Beschwerden der Nutzer. Unabhängig davon verlangt das GEG für Klimaanlagen über 12 kW Nennleistung für den Kältebedarf eine energetische Inspektion, erstmals im zehnten Jahr nach Inbetriebnahme und dann spätestens alle zehn Jahre (§§ 74, 76 GEG).",
      },
      { type: "h2", text: "Was die Inspektion kostet", id: "kosten" },
      {
        type: "p",
        text: "Eine Gebührenordnung gibt es nicht. Der Aufwand hängt von Zahl und Größe der Anlagen, der Befeuchtung, der Zugänglichkeit der Komponenten und der Zahl der Laborproben ab. Eine Anlagenliste mit Bauart, Luftmenge und Baujahr macht Angebote vergleichbar; bei mehreren Liegenschaften lohnt eine gebündelte Ausschreibung.",
      },
      {
        type: "example",
        title: "Kreisverwaltung mit Rathaus, Schulen und Hallenbad",
        text: [
          "Im Bestand sind 27 RLT-Anlagen, davon vier mit Befeuchtung im Hallenbad und im Rechenzentrum. Inspektionsberichte lagen nur für das Hallenbad vor; für die Schulanlagen gab es Wartungsprotokolle ohne hygienische Bewertung.",
          "Neu: Inspektion aller Anlagen innerhalb eines Jahres, danach Zwei- bzw. Drei-Jahres-Turnus nach Bauart; Hygienekontrollen werden in die Wartungsverträge aufgenommen, die Wartungsfirmen weisen Kategorie-B-Schulungen nach. Maßnahmen aus den Berichten werden zentral verfolgt.",
        ],
      },
      { type: "h2", text: "Folgen einer fehlenden Inspektion", id: "folgen" },
      {
        type: "p",
        text: "Die Richtlinie selbst ist nicht bußgeldbewehrt; eine nicht instand gehaltene RLT-Anlage verstößt aber gegen § 4 Abs. 3 ArbStättV. Bei Gesundheitsbeschwerden, hygienischen Auffälligkeiten in Kliniken oder Streit mit Mietern fehlt ohne Inspektionsbericht der Nachweis, dass die Anlage dem Stand der Technik entsprach. Wer inspizieren darf: [VDI 6022 Kategorien](/wissen/vdi-6022-kategorien).",
      },
      { type: "h2", text: "Inspektionen vorbereiten", id: "vorbereitung" },
      {
        type: "checklist",
        items: [
          "Anlagenliste mit Bauart, Luftmenge, Befeuchtung, Baujahr und Standort",
          "Protokolle der Hygienekontrollen seit der letzten Inspektion",
          "Wartungsprotokolle und Filterwechselnachweise",
          "Letzter Inspektionsbericht mit offenen Maßnahmen",
          "Zugang zu Technikzentralen, Revisionsöffnungen und Außenluftansaugungen",
        ],
      },
      {
        type: "p",
        text: "Fehlende Revisionsöffnungen oder nicht zugängliche Kanalabschnitte sind ein häufiger Befund. Sie verhindern nicht nur die Inspektion, sondern auch die Reinigung. Wer solche Mängel aus dem letzten Bericht kennt, sollte sie vor der nächsten Inspektion beheben lassen.",
      },
      { type: "h2", text: "Maßnahmen aus dem Bericht verfolgen", id: "massnahmen" },
      {
        type: "p",
        text: "Ein Inspektionsbericht enthält in der Regel Maßnahmen mit unterschiedlicher Dringlichkeit – vom Filtertausch über die Reinigung von Bauteilen bis zur Sanierung eines Befeuchters. Der Nutzen der Inspektion entsteht erst, wenn diese Maßnahmen umgesetzt werden. Übertragen Sie jede Maßnahme mit Verantwortlichem und Frist in eine zentrale Liste und lassen Sie die Erledigung bestätigen. Bei der nächsten Inspektion sollte der Inspekteur sehen können, was aus dem letzten Bericht geworden ist.",
      },
      {
        type: "table",
        caption: "Beispiel einer Maßnahmenliste aus einem Inspektionsbericht",
        head: ["Maßnahme", "Priorität", "Verantwortlich", "Frist"],
        rows: [
          ["Befeuchterwanne reinigen und desinfizieren", "hoch", "Wartungsfirma", "2 Wochen"],
          ["Revisionsöffnung im Zuluftkanal nachrüsten", "mittel", "Haustechnik", "3 Monate"],
          ["Außenluftansaugung von Laub befreien, Gitter instand setzen", "mittel", "Hausmeister", "1 Monat"],
          ["Hygienekontrollen monatlich statt vierteljährlich", "hoch", "Wartungsfirma", "ab sofort"],
        ],
      },
      { type: "h2", text: "Mehrere Liegenschaften koordinieren", id: "liegenschaften" },
      {
        type: "p",
        text: "In Kommunen und Klinikverbünden stehen RLT-Anlagen in Schulen, Verwaltungsgebäuden, Bädern, Rechenzentren und Bettenhäusern, gewartet von unterschiedlichen Firmen. Eine gemeinsame Anlagenliste mit Inspektionsintervall je Anlage, ein Rahmenvertrag für die Hygieneinspektionen und eine zentrale Maßnahmenliste machen den Zustand aller Anlagen vergleichbar. So wird auch sichtbar, welche Anlagen dauerhaft Probleme haben und ob eine Sanierung wirtschaftlicher ist als wiederholte Instandsetzung.",
      },
      { type: "h2", text: "Häufige Befunde", id: "befunde" },
      {
        type: "checklist",
        items: [
          "Verschmutzte oder durchfeuchtete Filter, Filterwechsel überfällig",
          "Ablagerungen und Biofilm in Befeuchtern und Tropfenabscheidern",
          "Stehendes Wasser in Kondensatwannen durch verstopfte Abläufe",
          "Verschmutzte Außenluftansaugung, etwa durch Laub oder Vogelkot",
          "Fehlende Revisionsöffnungen, Kanalabschnitte nicht reinigbar",
          "Hygienekontrollen nicht dokumentiert oder nicht durch geschultes Personal",
        ],
      },
      {
        type: "p",
        text: "Viele dieser Befunde entstehen zwischen den Inspektionen und ließen sich durch konsequente Hygienekontrollen vermeiden. Deshalb ist die Inspektion zugleich eine Kontrolle der Kontrollen: Zeigt sie Mängel, die bei regelmäßigen Hygienekontrollen hätten auffallen müssen, sollte der Betreiber Häufigkeit, Umfang und Qualifikation der Kontrollen überprüfen. In Wartungsverträgen gehört die Durchführung der Hygienekontrollen nach VDI 6022 deshalb ausdrücklich zum Leistungsumfang, mit Protokollpflicht und Nachweis der Schulung.",
      },
      { type: "h2", text: "Inspektion und Mieter- oder Nutzerbeschwerden", id: "beschwerden" },
      {
        type: "p",
        text: "Beschwerden über Geruch, trockene Luft, Zugluft oder gehäufte Atemwegsbeschwerden sind ein Anlass, nicht bis zur nächsten regulären Inspektion zu warten. Eine anlassbezogene Inspektion klärt, ob die RLT-Anlage die Ursache ist, und liefert eine dokumentierte Grundlage für das Gespräch mit Beschäftigten, Mietern oder Eltern. Gerade in Schulen und Kitas, in denen Lüftungsanlagen in den letzten Jahren nachgerüstet wurden, ist die Hygiene dieser Anlagen ein sensibles Thema. Ein aktueller Inspektionsbericht ohne wesentliche Befunde ist dann das beste Argument; ein veralteter Bericht oder gar keiner schwächt die Position des Betreibers erheblich. Halten Sie deshalb für jede Anlage fest, wann die letzte Inspektion stattfand, welche Befunde es gab und welche Maßnahmen umgesetzt sind – dann lässt sich jede Anfrage schnell und belegt beantworten. Bei mehreren Liegenschaften gehört diese Übersicht in eine zentrale Liste, die Technik, Hygiene und Leitung gleichermaßen einsehen können.",
      },
    ],
    faqs: [
      [
        "Wie oft ist eine Hygieneinspektion nach VDI 6022 nötig?",
        "Nach den Richtwerten der VDI 6022 Blatt 1 alle drei Jahre bei Anlagen ohne und alle zwei Jahre bei Anlagen mit Luftbefeuchtung, zusätzlich anlassbezogen.",
      ],
      [
        "Was ist der Unterschied zwischen Hygienekontrolle und Hygieneinspektion?",
        "Die Hygienekontrolle überwacht einzelne Komponenten in kurzen Abständen nach Checklisten, die Hygieneinspektion bewertet die gesamte Anlage umfassend mit Messungen und Laborproben.",
      ],
      [
        "Wer darf eine Hygieneinspektion durchführen?",
        "Personal mit Schulung nach VDI 6022 Blatt 4 in der Kategorie A.",
      ],
      [
        "Ist die Hygieneinspektion gesetzlich vorgeschrieben?",
        "Die Pflicht zur Instandhaltung und Prüfung ergibt sich aus § 4 Abs. 3 ArbStättV. Die VDI 6022 beschreibt als anerkannte Regel der Technik, wie diese Pflicht hygienisch erfüllt wird.",
      ],
      [
        "Was passiert mit den Maßnahmen aus dem Inspektionsbericht?",
        "Sie sollten mit Verantwortlichem und Frist in eine zentrale Liste übernommen und bis zur Erledigung verfolgt werden. Der nächste Inspekteur prüft, ob frühere Maßnahmen umgesetzt wurden.",
      ],
    ],
    sources: [
      ["VDI 6022", "Hygienekontrollen, Hygieneinspektionen, Intervalle"],
      ["VDI 6022-4", "Schulungskategorien A und B"],
      ["ArbStättV", "§ 4 Abs. 3"],
      ["GEG", "§ 74 Abs. 1, § 76 Abs. 1 und 2"],
    ],
    related: [
      ["VDI 6022", "/vdi-6022", "Pflicht und Organisation"],
      ["VDI 6022 Kategorien", "/wissen/vdi-6022-kategorien", "Qualifikation der Prüfer"],
      ["Betreiberverantwortung Krankenhäuser", "/betreiberpflichten/krankenhaeuser", "RLT im Gesundheitswesen"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Schulen und Bäder"],
    ],
    cta: "Hygieneinspektionen für alle Anlagen planen lassen.",
  },
  {
    slug: "vdi-6022-kategorien",
    keyword: "vdi 6022 kategorie a",
    secondary: ["vdi 6022 kategorie b", "vdi 6022 schulung", "vdi 6022 blatt 4", "ausweis lufthygiene"],
    cluster: "Trinkwasser & Lüftung",
    title: "VDI 6022 Kategorie A, B, C: wer was prüfen darf",
    description:
      "VDI 6022 Blatt 4: Schulungskategorien A, B und C für RLT-Hygiene – wer Inspektionen und Hygienekontrollen übernimmt und wie Sie Nachweise prüfen.",
    h1: "VDI 6022 Kategorie A, B und C: Qualifikation für die Hygiene von RLT-Anlagen",
    kicker: "LÜFTUNG",
    teaser: "Was die Schulungskategorien bedeuten und wie Betreiber die Qualifikation von Dienstleistern prüfen.",
    areas: ["lueftung-klima"],
    published,
    modified: published,
    lead: [
      "VDI 6022 Blatt 4 regelt die Qualifizierung von Personal für die Hygiene raumlufttechnischer Anlagen in drei Kategorien: Kategorie A für Personal, das Anlagen plant, errichtet und Hygieneinspektionen durchführt; Kategorie B für Personal, das Hygienekontrollen und Wartungsarbeiten übernimmt; Kategorie C für die Unterweisung von Personal, das an oder in der Nähe der Anlagen arbeitet.",
    ],
    blocks: [
      { type: "h2", text: "Die drei Kategorien", id: "kategorien" },
      {
        type: "table",
        caption: "Schulungskategorien nach VDI 6022 Blatt 4 (sinngemäß)",
        head: ["Kategorie", "Zielgruppe", "Darf typischerweise"],
        rows: [
          ["A", "Planer, Errichter, Sachverständige, Inspekteure", "Hygieneinspektionen durchführen, Anlagen hygienegerecht planen und abnehmen"],
          ["B", "Wartungs- und Instandhaltungspersonal", "Hygienekontrollen und Wartungsarbeiten nach den Checklisten der VDI 6022"],
          ["C", "sonstiges Personal mit Bezug zur Anlage", "hygienegerechtes Verhalten, Erkennen von Auffälligkeiten"],
        ],
      },
      {
        type: "p",
        text: "Für die Kategorien A und B beschreibt VDI 6022 Blatt 4.1 ein Nachweisverfahren mit Prüfung und dem VDI-Ausweis „Lufthygiene“. Inhalte und Eingangsvoraussetzungen der Schulungen stehen in der kostenpflichtigen Richtlinie und werden hier nur sinngemäß wiedergegeben.",
      },
      { type: "h2", text: "Warum die Kategorie für Betreiber zählt", id: "betreiber" },
      {
        type: "p",
        text: "Der Betreiber muss raumlufttechnische Anlagen instand halten und prüfen lassen (§ 4 Abs. 3 ArbStättV) und darf dafür nur geeignete Personen und Firmen beauftragen. Die Kategorie ist der praktische Nachweis dieser Eignung: Eine Hygieneinspektion durch Personal ohne Kategorie-A-Schulung ist im Zweifel keine Inspektion im Sinne der VDI 6022. Was die Inspektion umfasst: [VDI 6022 Hygieneinspektion](/wissen/vdi-6022-hygieneinspektion).",
      },
      { type: "h2", text: "So prüfen Sie Nachweise von Dienstleistern", id: "nachweise" },
      {
        type: "checklist",
        items: [
          "Namentlicher Nachweis der Schulung je eingesetzter Person, nicht nur der Firma",
          "Kategorie passend zur Aufgabe: A für Inspektionen, B für Hygienekontrollen und Wartung",
          "Datum der Schulung und gegebenenfalls Auffrischung nach den Vorgaben des Schulungsträgers",
          "Name und Kategorie des Inspekteurs im Inspektionsbericht",
          "Vertragsklausel, dass nur entsprechend geschultes Personal eingesetzt wird",
        ],
      },
      { type: "h2", text: "Kategorie C im eigenen Haus", id: "kategorie-c" },
      {
        type: "p",
        text: "Für Hausmeister, Haustechnik und Reinigungspersonal, die in Technikzentralen arbeiten oder Auffälligkeiten melden sollen, ist die Unterweisung nach Kategorie C sinnvoll. Sie ersetzt keine Hygienekontrolle, verbessert aber die Meldekette: Feuchte Stellen, verschmutzte Filter oder Gerüche werden früher erkannt.",
      },
      {
        type: "table",
        caption: "Beispielhafte Zuordnung in einer Organisation mit mehreren Standorten",
        head: ["Aufgabe", "Wer", "Kategorie"],
        rows: [
          ["Hygieneinspektion alle 2 bzw. 3 Jahre", "externer Sachverständiger", "A"],
          ["Hygienekontrollen nach Checkliste", "Wartungsfirma oder eigene Haustechnik", "B"],
          ["Meldung von Auffälligkeiten", "Hausmeister, Technikzentrale", "C"],
          ["Steuerung, Fristen, Berichte", "Betreiber bzw. Betreibermanagement", "–"],
        ],
      },
      {
        type: "example",
        title: "Krankenhaus mit eigener Haustechnik",
        text: [
          "Die Haustechnik führt Wartung und Filterwechsel an 35 RLT-Anlagen selbst durch. Hygienekontrollen wurden dokumentiert, aber keiner der Techniker hatte eine Schulung nach VDI 6022.",
          "Vier Techniker werden nach Kategorie B geschult; Hygieneinspektionen vergibt die Klinik an einen externen Sachverständigen mit Kategorie A. Hygiene und Technik erhalten Inspektionsberichte und Maßnahmenlisten gemeinsam.",
        ],
      },
      { type: "h2", text: "Kosten und Folgen", id: "folgen" },
      {
        type: "p",
        text: "Schulungen werden von Verbänden und Schulungsträgern angeboten; die Kosten hängen von Kategorie und Anbieter ab. Fehlende Qualifikation macht Inspektionsberichte im Streitfall angreifbar und kann die Auswahlpflicht des Betreibers verletzen. Für die Organisation über mehrere Liegenschaften: [VDI 6022](/vdi-6022). Qualifikationsanforderungen in anderen Gewerken: [Befähigte Person nach TRBS 1203](/wissen/befaehigte-person-trbs-1203).",
      },
      { type: "h2", text: "Kategorien in Wartungs- und Inspektionsverträgen", id: "vertraege" },
      {
        type: "p",
        text: "Die Schulungskategorie gehört in den Vertrag, nicht nur ins Angebot. Legen Sie fest, dass Hygieneinspektionen ausschließlich von Personal mit Kategorie A und Hygienekontrollen ausschließlich von Personal mit Kategorie B durchgeführt werden, dass die eingesetzten Personen namentlich benannt und ihre Nachweise auf Anforderung vorgelegt werden. Bei Personalwechsel beim Dienstleister muss der Nachweis für die neue Person nachgereicht werden. Für öffentliche Auftraggeber eignet sich die Kategorie als Eignungskriterium in der Ausschreibung.",
      },
      {
        type: "table",
        caption: "Beispielhafte Vertragsklauseln",
        head: ["Leistung", "Anforderung", "Nachweis"],
        rows: [
          ["Hygieneinspektion", "Durchführung nur durch Personal mit Schulung VDI 6022 Kategorie A", "Schulungsnachweis vor Leistungsbeginn"],
          ["Hygienekontrolle", "Durchführung nur durch Personal mit Schulung VDI 6022 Kategorie B", "Schulungsnachweis vor Leistungsbeginn"],
          ["Bericht", "Name und Kategorie der durchführenden Person im Bericht", "je Bericht"],
          ["Personalwechsel", "Nachweis für neue Person innerhalb einer vereinbarten Frist", "auf Anforderung"],
        ],
      },
      { type: "h2", text: "Eigene Haustechnik qualifizieren", id: "haustechnik" },
      {
        type: "p",
        text: "Organisationen mit eigener Haustechnik – Krankenhäuser, größere Verwaltungen, Wohnungsunternehmen mit Regiebetrieb – können Hygienekontrollen selbst übernehmen, wenn die Beschäftigten nach Kategorie B geschult sind. Das spart Kosten und verbessert die Reaktionszeit bei Auffälligkeiten, weil die Haustechnik ohnehin regelmäßig an den Anlagen arbeitet. Die Hygieneinspektion bleibt Aufgabe von Personal mit Kategorie A; sie wird häufig extern vergeben, weil ein unabhängiger Blick auf die Anlage gewollt ist.",
      },
      {
        type: "steps",
        items: [
          "Beschäftigte bestimmen, die regelmäßig an RLT-Anlagen arbeiten.",
          "Schulung nach Kategorie B bei einem Schulungsträger buchen.",
          "Checklisten der VDI 6022 für die eigenen Anlagen einführen.",
          "Kontrollprotokolle zentral ablegen und dem Inspekteur vorlegen.",
          "Schulungsnachweise in der Personalakte und im Kataster dokumentieren.",
        ],
      },
      { type: "h2", text: "Häufige Fehler", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Wartungsvertrag ohne Anforderung an die Schulung des Personals",
          "Hygieneinspektion durch Wartungspersonal mit Kategorie B",
          "Schulung einmal absolviert, Nachweis aber nicht auffindbar",
          "Inspektionsbericht ohne Namen des Inspekteurs",
        ],
      },
      { type: "h2", text: "Kategorien und Organisationsverantwortung", id: "organisation" },
      {
        type: "p",
        text: "Die Schulungskategorien beschreiben, was eine Person fachlich leisten kann. Sie sagen nichts darüber, wer im Betrieb dafür sorgt, dass Kontrollen und Inspektionen stattfinden. Diese Organisationsverantwortung liegt beim Betreiber. In der Praxis ist das häufig die schwächste Stelle: Die Wartungsfirma ist geschult, aber niemand überwacht, ob die Inspektion nach zwei oder drei Jahren tatsächlich beauftragt wird und ob Maßnahmen aus dem Bericht umgesetzt werden. Bei Organisationen mit vielen Liegenschaften empfiehlt sich deshalb eine zentrale Stelle, die alle RLT-Anlagen mit Inspektionsintervall, Dienstleister und Qualifikationsnachweis führt.",
      },
      {
        type: "p",
        text: "Für die Auswahl von Dienstleistern hilft eine einfache Prüfung vor jeder Beauftragung: Liegen für alle eingesetzten Personen Nachweise der passenden Kategorie vor? Sind die Nachweise aktuell nach den Vorgaben des Schulungsträgers? Wird der Name der durchführenden Person im Bericht genannt? Wer diese drei Fragen dokumentiert beantworten kann, hat seine Auswahlpflicht nachweisbar erfüllt – unabhängig davon, ob der Dienstleister später Fehler macht.",
      },
      { type: "h2", text: "Was Betreiber selbst wissen sollten", id: "betreiberwissen" },
      {
        type: "p",
        text: "Betreiber müssen keine Lüftungsexperten sein, sollten aber die Grundzüge kennen: welche Anlagen mit Befeuchtung arbeiten und deshalb alle zwei Jahre inspiziert werden, welche Hygienekontrollen die Wartungsfirma durchführt, wo die Berichte liegen und welche Maßnahmen offen sind. Eine Unterweisung nach Kategorie C oder ein kurzer Überblick durch den Inspekteur nach der Inspektion vermittelt dieses Wissen. Für technische Leitungen in Kliniken, Kommunen und Wohnungsunternehmen ist das die Voraussetzung, Dienstleister wirksam zu steuern und ihre Berichte zu bewerten. Wer die Grundbegriffe kennt, erkennt auch, wann ein Bericht oberflächlich bleibt – etwa wenn Laborbefunde fehlen, keine Maßnahmen benannt werden oder der Inspekteur keine Kategorie angibt. Solche Berichte sollten Sie nachbessern lassen, bevor Sie die Rechnung freigeben. Fordern Sie außerdem bei jedem Personalwechsel des Dienstleisters den Nachweis für die neue Person an und legen Sie ihn zu den Vertragsunterlagen. So bleibt die Kette der Nachweise lückenlos, auch wenn der Dienstleister über Jahre wechselnde Mitarbeiter einsetzt. Der Aufwand dafür ist gering, der Nutzen im Streitfall groß.",
      },
    ],
    faqs: [
      [
        "Was bedeutet VDI 6022 Kategorie A?",
        "Kategorie A ist die Schulung für Personal, das raumlufttechnische Anlagen plant, errichtet, abnimmt und Hygieneinspektionen durchführt.",
      ],
      [
        "Wer braucht eine Schulung nach Kategorie B?",
        "Personal, das Hygienekontrollen und Wartungsarbeiten an RLT-Anlagen nach den Checklisten der VDI 6022 durchführt, etwa Wartungsfirmen oder eigene Haustechnik.",
      ],
      [
        "Ist eine VDI-6022-Schulung Pflicht?",
        "Ein Gesetz schreibt sie nicht vor. Sie ist aber der übliche Nachweis, dass das eingesetzte Personal für Hygieneinspektionen und -kontrollen nach dem Stand der Technik geeignet ist.",
      ],
      [
        "Darf die Wartungsfirma auch die Hygieneinspektion durchführen?",
        "Wenn ihr Personal nach Kategorie A geschult ist, ist das möglich. Viele Betreiber vergeben die Inspektion trotzdem an einen unabhängigen Sachverständigen, damit Wartung und Bewertung getrennt sind.",
      ],
      [
        "Wie weise ich die Qualifikation nach Kategorie C nach?",
        "Durch eine dokumentierte Unterweisung bzw. Schulung der betreffenden Beschäftigten, etwa von Hausmeistern oder Reinigungspersonal, mit Datum und Inhalt.",
      ],
    ],
    sources: [
      ["VDI 6022-4", "Schulungskategorien A, B, C; Blatt 4.1 Nachweisverfahren"],
      ["VDI 6022", "Hygienekontrollen und Hygieneinspektionen"],
      ["ArbStättV", "§ 4 Abs. 3"],
    ],
    related: [
      ["VDI 6022", "/vdi-6022", "Pflicht und Organisation"],
      ["VDI 6022 Hygieneinspektion", "/wissen/vdi-6022-hygieneinspektion", "Ablauf und Bericht"],
      ["Betreiberverantwortung Krankenhäuser", "/betreiberpflichten/krankenhaeuser", "Haustechnik und Hygiene"],
    ],
    cta: "Qualifizierte Hygieneinspekteure für alle Anlagen beauftragen.",
  },
];
