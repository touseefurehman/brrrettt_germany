import type { Article } from "./pages";

// Fachartikel Grundlagen und Organisation. Neue Artikel in lib/wissen.ts registrieren.
// `modified` bei jeder inhaltlichen Änderung aktualisieren – das Datum erscheint auf der Seite und im JSON-LD.

const published = "2026-10-22";

export const grundlagenArticles: Article[] = [
  {
    slug: "betreiberpflichtenkataster-erstellen",
    keyword: "betreiberpflichtenkataster",
    secondary: ["pflichtenkataster"],
    cluster: "Organisation",
    title: "Betreiberpflichtenkataster erstellen – Anleitung & Aufbau",
    description:
      "Betreiberpflichtenkataster erstellen: Aufbau, Spalten, Rechtsquellen und Pflege in sieben Schritten – mit Beispieltabelle und Checkliste für Betreiber.",
    h1: "Betreiberpflichtenkataster erstellen: Aufbau, Inhalte und Pflege",
    kicker: "ORGANISATION",
    teaser: "In sieben Schritten zum vollständigen Kataster – mit Spaltenaufbau, Beispieltabelle und Pflegeprozess.",
    published,
    modified: published,
    lead: [
      "Ein Betreiberpflichtenkataster ist die vollständige Liste aller Pflichten, die sich aus dem Betrieb Ihrer Gebäude und Anlagen ergeben – je Anlage mit Rechtsgrundlage, Prüfart, Frist, Qualifikation des Prüfers, Zuständigkeit und Nachweisstatus. Es ist das zentrale Werkzeug, um Betreiberverantwortung nachweisbar zu organisieren.",
      "Ohne Kataster weiß niemand sicher, ob alle Pflichten erfasst sind. Mit Kataster lässt sich jede Frage einer Behörde, Berufsgenossenschaft oder Versicherung in Minuten beantworten.",
    ],
    blocks: [
      { type: "h2", text: "Was ist ein Betreiberpflichtenkataster?", id: "definition" },
      {
        type: "definition",
        term: "Betreiberpflichtenkataster",
        text: "Ein strukturiertes Verzeichnis aller rechtlichen, normativen und vertraglichen Pflichten, die für ein Gebäude oder eine Anlage gelten. Es verknüpft jede Pflicht mit Rechtsquelle, Intervall, Verantwortlichem und Nachweis. Synonyme sind Rechtskataster, Pflichtenkataster oder Pflichtenmatrix.",
      },
      {
        type: "p",
        text: "Die Richtlinie GEFMA 190 beschreibt das Kataster als Grundlage jeder Betreiberorganisation: Erst wenn Pflichten bekannt sind, lassen sie sich delegieren und kontrollieren. Ein Kataster ist kein einmaliges Dokument, sondern wird bei jeder Änderung an Anlagen, Nutzung oder Recht fortgeschrieben.",
      },
      { type: "h2", text: "Aufbau: Diese Spalten gehören in jedes Kataster", id: "aufbau" },
      {
        type: "table",
        caption: "Mindestinhalt je Zeile",
        head: ["Spalte", "Inhalt", "Beispiel"],
        rows: [
          ["Standort / Gebäude", "Liegenschaft, Gebäudeteil, Raum", "Verwaltung Nord, Haus B, UG"],
          ["Anlage", "Anlagenart, Bezeichnung, Inventarnummer", "Personenaufzug A2, Nr. 4711"],
          ["Pflicht", "Prüfart, Wartung, Inspektion, Unterweisung", "Hauptprüfung"],
          ["Rechtsquelle", "Gesetz, Verordnung, Norm, Vertrag", "BetrSichV Anhang 2 Abschnitt 2"],
          ["Intervall", "Frist und Begründung, falls verlängert/verkürzt", "2 Jahre (Höchstfrist)"],
          ["Qualifikation", "Wer darf prüfen", "Zugelassene Überwachungsstelle (ZÜS)"],
          ["Zuständig", "Interne Person und externer Dienstleister", "Technik: Herr X / ZÜS: Prüfstelle Y"],
          ["Letzte / nächste Fälligkeit", "Datum", "03/2026 · 03/2027 (Zwischenprüfung)"],
          ["Nachweis", "Ablageort des Berichts", "DMS › Aufzüge › A2 › 2026"],
          ["Mängelstatus", "offen / behoben, Frist", "1 Mangel, Frist 05/2026, behoben"],
        ],
      },
      { type: "h2", text: "In sieben Schritten zum Kataster", id: "schritte" },
      {
        type: "steps",
        items: [
          "**Anlagen erfassen:** Begehung je Standort, Anlagenlisten aus Wartungsverträgen, Bauakten und Prüfberichten zusammenführen.",
          "**Nutzung klären:** Arbeitsstätte, Sonderbau, Wohngebäude, öffentliche oder gewerbliche Tätigkeit – die Nutzung bestimmt, welche Rechtsquellen greifen.",
          "**Rechtsquellen zuordnen:** Für jede Anlagenart die einschlägigen Vorschriften festlegen, etwa BetrSichV, DGUV Vorschrift 3, ArbStättV, TrinkwV, VDI 6022, Landesbauordnung und Prüfverordnung.",
          "**Pflichten und Intervalle ableiten:** Prüfart, Frist und erforderliche Qualifikation (z. B. befähigte Person nach TRBS 1203, Sachkundiger, Prüfsachverständiger, ZÜS) eintragen.",
          "**Zuständigkeiten festlegen:** Für jede Pflicht eine verantwortliche Person benennen und Delegationen schriftlich dokumentieren (§ 13 Abs. 2 ArbSchG).",
          "**Ist-Stand erheben:** Vorhandene Nachweise prüfen, Lücken und überfällige Prüfungen markieren, Maßnahmenliste mit Prioritäten erstellen.",
          "**Pflege organisieren:** Fälligkeiten überwachen, neue Anlagen und Rechtsänderungen einpflegen, mindestens jährlich vollständig überprüfen.",
        ],
      },
      { type: "h2", text: "Beispielauszug", id: "beispiel" },
      {
        type: "table",
        caption: "Auszug aus einem Kataster für ein Verwaltungsgebäude",
        head: ["Anlage", "Pflicht", "Intervall", "Grundlage", "Status"],
        rows: [
          ["Elektrische Anlage", "Wiederholungsprüfung", "4 Jahre", "DGUV Vorschrift 3", "fällig 06/2027"],
          ["Ortsveränderliche Geräte Büro", "Wiederholungsprüfung", "2 Jahre (Fehlerquote < 2 %)", "DGUV Vorschrift 3", "erledigt 02/2026"],
          ["Feuerlöscher (24 Stück)", "Instandhaltung", "2 Jahre", "ASR A2.2", "erledigt 09/2026"],
          ["Sicherheitsbeleuchtung", "Funktionsprüfung", "monatlich", "DIN EN 50172", "Protokoll fehlt 08/2026"],
          ["RLT-Anlage", "Hygieneinspektion", "3 Jahre", "VDI 6022 Blatt 1", "überfällig"],
          ["Aufzug", "Zwischenprüfung ZÜS", "Mitte zwischen Hauptprüfungen", "BetrSichV Anhang 2", "fällig 01/2027"],
        ],
      },
      {
        type: "example",
        title: "Kataster nach Zukauf von drei Gewerbeobjekten",
        text: [
          "Ein Unternehmen übernimmt drei Objekte mit Hallen, Büros und einer Tiefgarage. Aus den übergebenen Unterlagen ergeben sich 140 Positionen; die Begehung ergänzt 38 weitere, unter anderem kraftbetätigte Tore, Regalanlagen und einen Fettabscheider, die in keiner Liste standen.",
          "Erst das Kataster zeigt: Für die Regale fehlt seit zwei Jahren die Inspektion nach DIN EN 15635, für die Tore die jährliche Prüfung nach ASR A1.7.",
        ],
      },
      { type: "h2", text: "Checkliste: Ist Ihr Kataster vollständig?", id: "checkliste" },
      {
        type: "checklist",
        items: [
          "Jede prüfpflichtige Anlage ist erfasst – auch Tore, Regale, Leitern, Abscheider und Außenanlagen",
          "Jede Pflicht hat eine Rechtsquelle und eine begründete Frist",
          "Jede Pflicht hat eine namentlich verantwortliche Person",
          "Delegationen sind schriftlich dokumentiert",
          "Nachweise sind je Anlage auffindbar",
          "Offene Mängel haben eine Frist und einen Status",
          "Das Kataster wurde in den letzten zwölf Monaten vollständig überprüft",
        ],
      },
      { type: "h2", text: "Excel, CAFM oder Dienstleister?", id: "werkzeug" },
      {
        type: "p",
        text: "Für einen Standort mit überschaubarem Bestand genügt eine sauber gepflegte Tabelle. Ab mehreren Standorten oder einigen hundert Positionen lohnt ein CAFM-System mit Fristenfunktion. Entscheidend ist nicht das Werkzeug, sondern dass jemand die Fälligkeiten tatsächlich überwacht. Diese Aufgabe übernimmt ein [externer Betreibermanager](/externer-betreibermanager).",
      },
    ],
    faqs: [
      [
        "Ist ein Betreiberpflichtenkataster gesetzlich vorgeschrieben?",
        "Ein Kataster als solches schreibt kein Gesetz ausdrücklich vor. Der Betreiber muss aber nachweisen können, dass er seine Pflichten kennt und erfüllt – etwa über die Gefährdungsbeurteilung nach ArbSchG und BetrSichV. Das Kataster ist der übliche und von GEFMA 190 empfohlene Weg dafür.",
      ],
      [
        "Wie lange dauert die Erstellung eines Betreiberpflichtenkatasters?",
        "Für ein einzelnes Verwaltungsgebäude meist wenige Tage einschließlich Begehung, für Bestände mit vielen Standorten mehrere Wochen. Den größten Aufwand verursacht das Zusammentragen vorhandener Prüfberichte.",
      ],
      [
        "Wer sollte das Kataster pflegen?",
        "Eine benannte Person, die Fälligkeiten überwacht und Änderungen an Anlagen und Recht einpflegt – intern etwa die technische Leitung oder extern ein Betreibermanager. Wichtig ist, dass die Pflege schriftlich zugewiesen ist.",
      ],
      [
        "Was ist der Unterschied zwischen Rechtskataster und Betreiberpflichtenkataster?",
        "Ein Rechtskataster listet die geltenden Vorschriften, häufig im Umwelt- oder Arbeitsschutzmanagement. Das Betreiberpflichtenkataster geht weiter und ordnet jeder Anlage die konkreten Pflichten, Fristen, Zuständigkeiten und Nachweise zu.",
      ],
    ],
    sources: [
    ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["ArbSchG", "§ 5, § 13 Abs. 2"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A–1C"],
    ["ArbStättV", "§ 4 Abs. 3"],
    ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
  ],
    related: [
      ["Externer Betreibermanager", "/externer-betreibermanager", "Kataster erstellen und pflegen lassen"],
      ["Prüffristen im Überblick", "/prueffristen", "Richtwerte je Anlagenart"],
      ["Betreiberpflichten bei Objektübernahmen", "/wissen/betreiberpflichten-objektuebernahme", "Kataster nach Zukauf"],
    ],
    cta: "Betreiberpflichtenkataster erstellen lassen.",
  },
  {
    slug: "was-ist-betreiberverantwortung",
    keyword: "was ist betreiberverantwortung",
    secondary: [],
    cluster: "Grundlagen",
    title: "Was ist Betreiberverantwortung? Definition & Pflichten",
    description:
      "Was ist Betreiberverantwortung? Definition, Rechtsgrundlagen, wer Betreiber ist, welche Pflichten gelten und was sich delegieren lässt – verständlich erklärt.",
    h1: "Was ist Betreiberverantwortung? Definition, Rechtsgrundlagen und Pflichten",
    kicker: "GRUNDLAGEN",
    teaser: "Definition, Rechtsgrundlagen und die Frage, was sich delegieren lässt und was nicht.",
    published,
    modified: published,
    lead: [
      "Betreiberverantwortung ist die Pflicht des Eigentümers oder Betreibers eines Gebäudes oder einer Anlage, für deren sicheren und rechtskonformen Betrieb zu sorgen – und dies nachweisen zu können. Sie ergibt sich nicht aus einem einzelnen Gesetz, sondern aus einer Vielzahl von Vorschriften, Normen und der allgemeinen Verkehrssicherungspflicht.",
    ],
    blocks: [
      { type: "h2", text: "Definition", id: "definition" },
      {
        type: "definition",
        term: "Betreiberverantwortung",
        text: "Die Gesamtheit der rechtlichen Pflichten, die einer natürlichen oder juristischen Person aus dem Betrieb von Gebäuden, Anlagen und Einrichtungen erwachsen. Ziel ist, Gefahren für Leben, Gesundheit, Umwelt und Sachwerte abzuwenden. Betreiber ist, wer die tatsächliche und rechtliche Verfügungsgewalt über die Anlage hat – in der Regel der Eigentümer.",
      },
      {
        type: "definition",
        term: "Betreiberpflichten",
        text: "Die konkreten Einzelpflichten, aus denen sich die Betreiberverantwortung zusammensetzt: Prüfen, Warten, Instandhalten, Unterweisen, Dokumentieren, Organisieren und Kontrollieren.",
      },
      { type: "h2", text: "Woraus sich Betreiberverantwortung ergibt", id: "rechtsgrundlagen" },
      {
        type: "table",
        head: ["Quelle", "Beispiele", "Was sie verlangt"],
        rows: [
          ["Zivilrecht", "§§ 823, 836 BGB", "Verkehrssicherungspflicht: Gefahrenquellen beherrschen, Gebäudeteile sichern"],
          ["Arbeitsschutzrecht", "ArbSchG, BetrSichV, ArbStättV", "Gefährdungsbeurteilung, Prüfung von Arbeitsmitteln und Sicherheitseinrichtungen"],
          ["Unfallverhütungsvorschriften", "DGUV Vorschrift 1, 3, 4", "Prüfung elektrischer Anlagen und Betriebsmittel"],
          ["Bauordnungsrecht der Länder", "Landesbauordnungen, Prüfverordnungen", "Prüfung sicherheitstechnischer Anlagen in Sonderbauten, Rauchwarnmelder"],
          ["Umwelt- und Gesundheitsrecht", "TrinkwV, WHG, F-Gase-Verordnung", "Legionellenuntersuchung, Anlagen mit wassergefährdenden Stoffen, Dichtheitskontrollen"],
          ["Technische Regeln und Normen", "TRBS, ASR, DIN, VDE, VDI 6022", "Konkretisieren den Stand der Technik und die Prüfverfahren"],
          ["Verträge", "Mietverträge, Versicherungsbedingungen", "Zusätzliche Pflichten, z. B. Obliegenheiten gegenüber dem Versicherer"],
        ],
      },
      { type: "h2", text: "Wer ist Betreiber?", id: "betreiber" },
      {
        type: "p",
        text: "Betreiber ist zunächst der Eigentümer. Bei Unternehmen trifft die Verantwortung die Organe – Geschäftsführung, Vorstand, bei Kommunen die Verwaltungsleitung. Durch Vertrag kann die Betreiberrolle teilweise übergehen, etwa auf einen Mieter, der eine Halle vollständig nutzt, oder auf einen Generalunternehmer im FM. Entscheidend ist, wer die Anlage tatsächlich beherrscht. Unklare Zuordnungen sind eine der häufigsten Ursachen für Lücken.",
      },
      { type: "h2", text: "Was sich delegieren lässt – und was nicht", id: "delegation" },
      {
        type: "p",
        text: "Delegierbar sind **Aufgaben**, nicht die **Verantwortung**. Wer Aufgaben überträgt, behält drei Pflichten, die in der Rechtsprechung als Auswahl-, Anweisungs- und Kontrollpflicht bezeichnet werden.",
      },
      {
        type: "table",
        head: ["Pflicht des Delegierenden", "Inhalt", "Nachweis"],
        rows: [
          ["Auswahlpflicht", "Nur zuverlässige und fachkundige Personen oder Firmen beauftragen", "Qualifikationsnachweise, z. B. nach TRBS 1203"],
          ["Anweisungspflicht", "Aufgaben, Befugnisse und Mittel klar festlegen", "Schriftliche Pflichtenübertragung, Leistungsbeschreibung"],
          ["Kontrollpflicht", "Stichprobenartig prüfen, ob Aufgaben erfüllt werden", "Statusberichte, Audits, Prüfberichte"],
        ],
      },
      {
        type: "p",
        text: "Für Arbeitgeberpflichten sieht § 13 Abs. 2 ArbSchG ausdrücklich eine schriftliche Übertragung auf zuverlässige und fachkundige Personen vor. Wie die Haftung im Einzelnen verteilt ist, erklärt der Artikel [Wer haftet bei fehlenden Prüfungen?](/wissen/haftung-fehlende-pruefungen).",
      },
      {
        type: "example",
        title: "Hausmeister mit Prüfaufgaben",
        text: [
          "Eine Geschäftsführerin überträgt dem Hausmeister mündlich, „sich um die Prüfungen zu kümmern“. Nach einem Stromunfall an einem ungeprüften Verlängerungskabel zeigt sich: Es gab weder eine Liste der Geräte noch eine schriftliche Aufgabenübertragung, noch wurde je kontrolliert.",
          "Die Delegation war damit unwirksam organisiert – die Verantwortung liegt weiter bei der Geschäftsführung. Eine schriftliche Übertragung mit Anlagenliste, Budget und Quartalsbericht hätte die Kontrollpflicht erfüllt.",
        ],
      },
      { type: "h2", text: "Die fünf Kernaufgaben der Betreiberorganisation", id: "aufgaben" },
      {
        type: "checklist",
        items: [
          "**Ermitteln:** Welche Pflichten gelten für welche Anlage? → [Betreiberpflichtenkataster](/wissen/betreiberpflichtenkataster-erstellen)",
          "**Übertragen:** Wer erfüllt welche Pflicht? → schriftliche Delegation",
          "**Durchführen:** Prüfungen und Wartungen durch qualifizierte Personen",
          "**Dokumentieren:** Nachweise je Anlage auffindbar ablegen",
          "**Kontrollieren:** Fristen, Mängel und Dienstleister überwachen",
        ],
      },
    ],
    faqs: [
      [
        "Was versteht man unter Betreiberverantwortung?",
        "Die Pflicht des Eigentümers oder Betreibers, Gebäude und Anlagen so zu betreiben, dass niemand zu Schaden kommt, und dies nachzuweisen. Sie setzt sich aus vielen Einzelpflichten wie Prüfen, Warten, Dokumentieren und Kontrollieren zusammen.",
      ],
      [
        "Ist Betreiberverantwortung gesetzlich geregelt?",
        "Es gibt kein einzelnes Betreiberverantwortungsgesetz. Die Pflichten ergeben sich aus BGB, Arbeitsschutzrecht wie ArbSchG, BetrSichV und ArbStättV, Unfallverhütungsvorschriften, Bauordnungsrecht, Trinkwasserverordnung sowie technischen Regeln und Normen.",
      ],
      [
        "Kann man Betreiberverantwortung auf einen Dienstleister übertragen?",
        "Übertragen lassen sich die Aufgaben, nicht die Verantwortung. Der Betreiber muss den Dienstleister sorgfältig auswählen, klar beauftragen und regelmäßig kontrollieren.",
      ],
      [
        "Wer ist bei einer GmbH für die Betreiberverantwortung zuständig?",
        "Die Geschäftsführung als Organ der Gesellschaft. Sie kann Aufgaben an Führungskräfte, Fachkräfte oder Dienstleister übertragen, muss aber die Organisation so gestalten und überwachen, dass die Pflichten erfüllt werden.",
      ],
    ],
    sources: [
    ["BGB", "§§ 823, 831, 836"],
    ["ArbSchG", "§ 5, § 13 Abs. 2"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["ArbStättV", "§ 4 Abs. 3"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A–1C"],
    ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
  ],
    related: [
      ["Wer haftet bei fehlenden Prüfungen?", "/wissen/haftung-fehlende-pruefungen", "Zivil-, Straf- und Bußgeldrecht"],
      ["Betreiberpflichten im Facility Management", "/wissen/betreiberpflichten-facility-management", "Delegation an FM-Dienstleister"],
      ["Externer Betreibermanager", "/externer-betreibermanager", "Aufgaben auslagern"],
    ],
    cta: "Betreiberverantwortung strukturiert organisieren.",
  },
  {
    slug: "haftung-fehlende-pruefungen",
    keyword: "haftung fehlende prüfung",
    secondary: ["wer haftet bei fehlenden prüfungen", "organisationsverschulden betreiber"],
    cluster: "Grundlagen",
    title: "Wer haftet bei fehlenden Prüfungen? Betreiberhaftung erklärt",
    description:
      "Wer haftet bei fehlenden Prüfungen? Zivil-, Straf- und Bußgeldhaftung von Unternehmen, Geschäftsführung und Beauftragten – mit Beispielen und Schutzmaßnahmen.",
    h1: "Wer haftet bei fehlenden Prüfungen? Haftung von Betreiber, Leitung und Beauftragten",
    kicker: "GRUNDLAGEN",
    teaser: "Zivil-, Straf- und Bußgeldhaftung – und wie eine saubere Organisation davor schützt.",
    published,
    modified: published,
    lead: [
      "Bei fehlenden Prüfungen haftet zunächst der Betreiber – also das Unternehmen, die Kommune oder der Eigentümer. Daneben können Geschäftsführung, Vorstand und beauftragte Personen persönlich in Anspruch genommen werden, wenn sie ihre Organisations-, Aufsichts- oder übertragenen Pflichten verletzt haben. Wer haftet, hängt davon ab, wie die Aufgaben verteilt und kontrolliert waren.",
    ],
    blocks: [
      { type: "h2", text: "Drei Haftungsebenen", id: "ebenen" },
      {
        type: "table",
        head: ["Ebene", "Wen es trifft", "Grundlage (Auswahl)", "Folge"],
        rows: [
          ["Zivilrechtlich", "Unternehmen; bei eigenem Verschulden auch Personen", "§§ 823, 831, 836 BGB", "Schadensersatz, Schmerzensgeld"],
          ["Ordnungswidrigkeitenrecht", "Unternehmen und Leitungspersonen", "§ 22 BetrSichV i. V. m. § 25 ArbSchG; § 209 SGB VII; §§ 9, 130 OWiG", "Bußgeld, nach § 130 OWiG bis zu 1 Mio. Euro bei strafbewehrten Pflichtverletzungen"],
          ["Strafrechtlich", "Natürliche Personen", "§§ 222, 229 StGB, § 13 StGB (Unterlassen), § 14 StGB", "Geld- oder Freiheitsstrafe"],
        ],
      },
      {
        type: "p",
        text: "Hinzu kommt die **versicherungsrechtliche** Seite: Verletzt der Versicherungsnehmer vertragliche Obliegenheiten – etwa die Pflicht, Anlagen nach Vorschrift prüfen zu lassen –, kann der Versicherer nach § 28 VVG die Leistung kürzen oder bei Vorsatz ganz verweigern.",
      },
      { type: "h2", text: "Wer konkret haftet", id: "personen" },
      {
        type: "definition",
        term: "Organisationsverschulden",
        text: "Ein Verschulden, das nicht in einer einzelnen Handlung liegt, sondern darin, dass die Leitung keine Organisation geschaffen hat, die die Erfüllung von Pflichten sicherstellt – also keine klaren Zuständigkeiten, keine Fristenüberwachung, keine Kontrolle.",
      },
      {
        type: "table",
        head: ["Person", "Haftet insbesondere, wenn …"],
        rows: [
          ["Geschäftsführung / Vorstand / Verwaltungsleitung", "keine geeignete Organisation besteht, Aufgaben nicht wirksam übertragen oder nicht kontrolliert werden"],
          ["Beauftragte Führungskraft (z. B. technische Leitung)", "ihr Pflichten schriftlich übertragen wurden und sie diese nicht erfüllt (§ 13 ArbSchG, § 9 OWiG, § 14 StGB)"],
          ["Mitarbeiter mit konkreter Aufgabe", "sie eine übertragene Aufgabe schuldhaft nicht ausführen"],
          ["Externer Dienstleister", "er vertraglich übernommene Leistungen mangelhaft erbringt – gegenüber dem Auftraggeber und ggf. Geschädigten"],
        ],
      },
      {
        type: "p",
        text: "Die Delegation verschiebt also Pflichten nach unten, entlastet die Leitung aber nur, wenn Auswahl, Anweisung und Kontrolle nachweisbar sind. Mehr dazu: [Was ist Betreiberverantwortung?](/wissen/was-ist-betreiberverantwortung)",
      },
      { type: "h2", text: "Bußgelder bei versäumten Prüfungen", id: "bussgelder" },
      {
        type: "table",
        head: ["Verstoß", "Rechtsgrundlage", "Bußgeldrahmen"],
        rows: [
          ["Arbeitsmittel nicht oder nicht rechtzeitig geprüft", "§ 22 Abs. 1 BetrSichV i. V. m. § 25 Abs. 2 ArbSchG", "bis 5.000 €"],
          ["Überwachungsbedürftige Anlage ohne vorgeschriebene Prüfung betrieben", "§ 22 BetrSichV", "Bußgeld nach § 22 Abs. 2 BetrSichV; bei Gefährdung von Leben oder Gesundheit Straftat nach § 23 BetrSichV"],
          ["Elektrische Anlagen entgegen § 5 DGUV Vorschrift 3 nicht geprüft", "§ 9 DGUV Vorschrift 3 i. V. m. § 209 SGB VII", "bis 10.000 €"],
          ["Aufsichtspflichtverletzung im Unternehmen", "§ 130 OWiG", "bis 1 Mio. €, wenn die Pflichtverletzung mit Strafe bedroht ist"],
        ],
      },
      {
        type: "example",
        title: "Brand nach überfälliger Elektroprüfung",
        text: [
          "In einer Werkstatt löst eine defekte Mehrfachsteckdose einen Brand aus; ein Mitarbeiter wird verletzt. Die letzte Prüfung der ortsveränderlichen Betriebsmittel liegt drei Jahre zurück, festgelegt waren zwölf Monate.",
          "Folgen: Die Unfallkasse bzw. BG prüft Regress, die Staatsanwaltschaft ermittelt wegen fahrlässiger Körperverletzung gegen die zuständige Führungskraft, der Sachversicherer prüft eine Leistungskürzung. Die Geschäftsführung muss nachweisen, dass sie die Aufgabe wirksam übertragen und kontrolliert hat – ohne Kataster und Statusberichte gelingt das kaum.",
        ],
      },
      { type: "h2", text: "So schützen Sie sich", id: "schutz" },
      {
        type: "checklist",
        items: [
          "Alle Pflichten in einem [Betreiberpflichtenkataster](/wissen/betreiberpflichtenkataster-erstellen) erfassen",
          "Aufgaben schriftlich übertragen – mit Befugnissen und Budget",
          "Nur qualifizierte Prüfer beauftragen und Qualifikation dokumentieren (TRBS 1203, ZÜS, Prüfsachverständige)",
          "Fristen zentral überwachen und Überschreitungen eskalieren",
          "Mängel bis zur Behebung nachverfolgen",
          "Der Leitung regelmäßig schriftlich berichten – das ist der Nachweis der Kontrollpflicht",
        ],
      },
    ],
    faqs: [
      [
        "Wer haftet, wenn eine vorgeschriebene Prüfung fehlt?",
        "Zunächst der Betreiber als Unternehmen oder Eigentümer. Persönlich können Geschäftsführung und Vorstand wegen Organisationsverschulden oder Aufsichtspflichtverletzung haften, ebenso Personen, denen die Aufgabe wirksam übertragen wurde und die sie schuldhaft nicht erfüllt haben.",
      ],
      [
        "Haftet der Geschäftsführer persönlich für fehlende Prüfungen?",
        "Er kann persönlich haften, wenn er keine geeignete Organisation geschaffen, Aufgaben nicht wirksam übertragen oder deren Erfüllung nicht kontrolliert hat. Bußgeldrechtlich greift § 130 OWiG, strafrechtlich kommen im Schadensfall fahrlässige Körperverletzung oder Tötung in Betracht.",
      ],
      [
        "Zahlt die Versicherung, wenn Prüfungen versäumt wurden?",
        "Nicht unbedingt. Sind Prüfungen als Obliegenheit vereinbart und wurden grob fahrlässig versäumt, kann der Versicherer die Leistung nach § 28 VVG im Verhältnis zur Schwere des Verschuldens kürzen, bei Vorsatz ganz verweigern – es sei denn, die Pflichtverletzung war für den Schaden nicht ursächlich.",
      ],
      [
        "Entlastet die Beauftragung eines Dienstleisters den Betreiber?",
        "Teilweise. Der Betreiber haftet dann nicht für jeden Fehler des Dienstleisters, muss aber nachweisen, dass er ihn sorgfältig ausgewählt, klar beauftragt und angemessen kontrolliert hat.",
      ],
    ],
    sources: [
    ["BGB", "§§ 823, 831, 836"],
    ["OWiG", "§§ 9, 130"],
    ["ArbSchG", "§ 5, § 13 Abs. 2"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A–1C"],
    ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
  ],
    related: [
      ["Was ist Betreiberverantwortung?", "/wissen/was-ist-betreiberverantwortung", "Definition und Delegation"],
      ["Externer Betreibermanager", "/externer-betreibermanager", "Haftungsrisiken reduzieren"],
      ["DGUV V3 Prüfung Kosten", "/pruefbereiche/dguv-v3-pruefung/kosten", "Was die Prüfung kostet"],
    ],
    cta: "Haftungsrisiken durch klare Organisation senken.",
  },
  {
    slug: "betreiberpflichten-facility-management",
    keyword: "betreiberpflichten facility management",
    secondary: ["gefma 190", "betreiberverantwortung fm"],
    cluster: "Organisation",
    title: "Betreiberpflichten im Facility Management nach GEFMA 190",
    description:
      "Betreiberpflichten im Facility Management: Rollen nach GEFMA 190, Delegation an FM-Dienstleister, Schnittstellen, Verträge und Kontrolle – mit Checkliste.",
    h1: "Betreiberpflichten im Facility Management: Rollen, Delegation und Kontrolle nach GEFMA 190",
    kicker: "ORGANISATION",
    teaser: "Wie Eigentümer, Nutzer und FM-Dienstleister Betreiberpflichten sauber aufteilen.",
    published,
    modified: published,
    lead: [
      "Im Facility Management werden Betreiberpflichten zwischen Eigentümer, Nutzer und Dienstleistern aufgeteilt. Die Richtlinie GEFMA 190 beschreibt, wie das rechtssicher gelingt: Pflichten ermitteln, schriftlich delegieren, Schnittstellen festlegen und die Erfüllung kontrollieren. Die Verantwortung bleibt dabei beim Betreiber.",
    ],
    blocks: [
      { type: "h2", text: "Die Rollen im FM", id: "rollen" },
      {
        type: "table",
        head: ["Rolle", "Typische Akteure", "Kernpflichten"],
        rows: [
          ["Eigentümer / Betreiber", "Unternehmen, Kommune, Fonds, Wohnungsunternehmen", "Organisation schaffen, Aufgaben übertragen, kontrollieren"],
          ["Nutzer / Mieter", "Mietende Unternehmen, Abteilungen", "Arbeitgeberpflichten für eigene Arbeitsmittel und Beschäftigte, Mängel melden"],
          ["Betreiberorganisation / Property Management", "Technische Leitung, Objektmanagement", "Kataster führen, Dienstleister steuern, berichten"],
          ["FM-Dienstleister", "Technischer Gebäudedienst, Wartungsfirmen, Prüfer", "Übernommene Leistungen fachgerecht erbringen und dokumentieren"],
        ],
      },
      {
        type: "definition",
        term: "GEFMA 190",
        text: "Richtlinie des Deutschen Verbands für Facility Management (GEFMA) zur Betreiberverantwortung im FM. Sie beschreibt den Weg von der Pflichtenermittlung über die Delegation bis zur Wirksamkeitskontrolle und ist in der Praxis der Referenzrahmen für Betreiberorganisationen.",
      },
      { type: "h2", text: "Delegation an FM-Dienstleister", id: "delegation" },
      {
        type: "p",
        text: "Ein FM-Vertrag überträgt Leistungen, nicht automatisch Pflichten. Damit eine Pflicht wirksam übergeht, muss sie im Vertrag konkret benannt sein – mit Anlage, Leistung, Intervall, Dokumentation und Befugnis, Mängel zu beauftragen. Pauschalformulierungen wie „Betreiberpflichten gemäß Gesetz“ reichen nicht.",
      },
      {
        type: "checklist",
        items: [
          "Leistungsverzeichnis mit Anlagenliste als Vertragsbestandteil",
          "Pflichten je Anlage mit Rechtsgrundlage und Intervall",
          "Qualifikation des eingesetzten Personals (z. B. TRBS 1203, Elektrofachkraft)",
          "Dokumentations- und Berichtspflichten mit Format und Ablageort",
          "Regelung für Mängel: Meldung, Frist, Freigabegrenze",
          "Schnittstellenliste: was bleibt beim Betreiber, was beim Nutzer",
          "Kontrollrechte und regelmäßige Leistungsnachweise",
        ],
      },
      { type: "h2", text: "Instandhaltung nach DIN 31051", id: "instandhaltung" },
      {
        type: "table",
        head: ["Maßnahme", "Bedeutung", "Beispiel"],
        rows: [
          ["Inspektion", "Ist-Zustand feststellen und beurteilen", "Sichtprüfung der Feuerlöscher"],
          ["Wartung", "Abnutzungsvorrat erhalten", "Filterwechsel RLT-Anlage"],
          ["Instandsetzung", "Funktionsfähigen Zustand wiederherstellen", "Austausch eines defekten RCD"],
          ["Verbesserung", "Funktionssicherheit erhöhen, ohne Funktion zu ändern", "Nachrüstung einer Notbeleuchtung"],
        ],
      },
      {
        type: "p",
        text: "Gesetzliche Prüfungen sind meist Inspektionen. Sie werden in FM-Verträgen häufig mit Wartungen gebündelt – sinnvoll, solange klar ist, wer die Prüfung durchführt und dass der Prüfer die erforderliche Qualifikation hat.",
      },
      {
        type: "example",
        title: "Schnittstelle Mieter – Vermieter in einem Bürogebäude",
        text: [
          "Der Vermieter lässt die elektrische Anlage des Gebäudes prüfen, der Mieter geht davon aus, dass damit auch seine Bürogeräte abgedeckt sind. Tatsächlich ist der Mieter als Arbeitgeber für seine ortsveränderlichen Betriebsmittel selbst verantwortlich.",
          "Eine Schnittstellenliste im Mietvertrag – Gebäudetechnik beim Vermieter, Arbeitsmittel beim Mieter, Meldepflicht für Mängel – hätte die Lücke verhindert.",
        ],
      },
      { type: "h2", text: "Kontrolle: wie der Betreiber seine Pflicht erfüllt", id: "kontrolle" },
      {
        type: "steps",
        items: [
          "Monatlicher oder quartalsweiser Statusbericht mit fälligen, erledigten und überfälligen Pflichten",
          "Stichprobenprüfung von Prüfberichten auf Vollständigkeit und Qualifikation des Prüfers",
          "Jährliche Begehung mit Abgleich von Kataster und Anlagenbestand",
          "Dokumentation der Kontrolle selbst – sie ist der Nachweis gegenüber Behörden und Gerichten",
        ],
      },
    ],
    faqs: [
      [
        "Was regelt GEFMA 190?",
        "GEFMA 190 beschreibt die Betreiberverantwortung im Facility Management: welche Pflichten Betreiber haben, wie sie diese ermitteln, an interne und externe Stellen delegieren und die Erfüllung kontrollieren.",
      ],
      [
        "Übernimmt der FM-Dienstleister die Betreiberverantwortung?",
        "Nein. Er übernimmt die vertraglich vereinbarten Aufgaben. Die Betreiberverantwortung bleibt beim Eigentümer bzw. Betreiber, der den Dienstleister auswählen, anweisen und kontrollieren muss.",
      ],
      [
        "Wer ist für Prüfungen in gemieteten Gebäuden zuständig?",
        "Grundsätzlich der Vermieter für Gebäude und Gebäudetechnik, der Mieter als Arbeitgeber für seine eigenen Arbeitsmittel und Arbeitsplätze. Abweichungen müssen im Mietvertrag konkret geregelt sein.",
      ],
      [
        "Welche Betreiberpflichten gibt es im Facility Management?",
        "Unter anderem Prüf- und Wartungspflichten für technische Anlagen, Verkehrssicherungspflichten für Gebäude und Außenanlagen, Dokumentationspflichten, Unterweisungspflichten sowie Organisations- und Kontrollpflichten gegenüber eingesetzten Dienstleistern.",
      ],
    ],
    sources: [
    ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["ArbStättV", "§ 4 Abs. 3"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A–1C"],
    ["ArbSchG", "§ 5, § 13 Abs. 2"],
    ["BGB", "§§ 823, 831, 836"],
  ],
    related: [
      ["Betreiberpflichtenkataster erstellen", "/wissen/betreiberpflichtenkataster-erstellen", "Grundlage jeder Delegation"],
      ["Externer Betreibermanager", "/externer-betreibermanager", "Steuerung der FM-Dienstleister"],
      ["Wer haftet bei fehlenden Prüfungen?", "/wissen/haftung-fehlende-pruefungen", "Haftung bei Delegation"],
    ],
    cta: "FM-Dienstleister steuern lassen – mit klarem Kataster.",
  },
  {
    slug: "betreiberpflichten-objektuebernahme",
    keyword: "betreiberpflichten objektübernahme",
    secondary: ["objektübernahme checkliste"],
    cluster: "Organisation",
    title: "Betreiberpflichten bei Objektübernahme – Checkliste",
    description:
      "Betreiberpflichten bei Objektübernahmen: Welche Unterlagen, Prüfnachweise und Verträge Sie bei Kauf, Neubau oder Mieterwechsel übernehmen müssen – Checkliste.",
    h1: "Betreiberpflichten bei Objektübernahmen: Unterlagen, Prüfstatus und Fristen sichern",
    kicker: "ORGANISATION",
    teaser: "Was Käufer, Bauherren und neue Betreiber am ersten Tag wissen müssen.",
    published,
    modified: published,
    lead: [
      "Mit dem Übergang von Besitz, Nutzen und Lasten gehen auch die Betreiberpflichten auf den neuen Eigentümer über – ab dem ersten Tag. Fehlen Prüfnachweise oder sind Fristen bereits abgelaufen, trägt der neue Betreiber das Risiko. Eine strukturierte Übernahme sichert Unterlagen, Prüfstatus und laufende Verträge.",
    ],
    blocks: [
      { type: "h2", text: "Typische Übernahmesituationen", id: "situationen" },
      {
        type: "table",
        head: ["Situation", "Besonderes Risiko"],
        rows: [
          ["Ankauf einer Bestandsimmobilie", "Unvollständige Unterlagen, unbekannter Prüfstatus, überfällige Prüfungen"],
          ["Übernahme eines Neubaus", "Prüfungen vor Inbetriebnahme, Abnahmen durch Prüfsachverständige, Gewährleistungsfristen"],
          ["Wechsel des FM-Dienstleisters", "Wissensverlust, fehlende Übergabe der Prüfhistorie"],
          ["Mieterwechsel bei Single-Tenant-Objekten", "Rückfall der Betreiberpflichten auf den Eigentümer"],
          ["Zusammenlegung von Beständen", "Unterschiedliche Systeme und Fristenstände"],
        ],
      },
      { type: "h2", text: "Checkliste: Unterlagen bei der Übergabe", id: "unterlagen" },
      {
        type: "checklist",
        items: [
          "Baugenehmigung mit Auflagen, Brandschutzkonzept, Flucht- und Rettungspläne",
          "Bescheinigungen der Prüfsachverständigen (Prüfverordnung) und Prüfberichte vor Inbetriebnahme",
          "Prüfbescheinigungen der ZÜS für Aufzüge und Druckanlagen",
          "Prüfprotokolle Elektro (DGUV Vorschrift 3), Blitzschutz, Sicherheitsbeleuchtung",
          "Wartungsnachweise Brandschutz (BMA, RWA, Feuerlöscher, Feststellanlagen)",
          "Hygieneinspektionsberichte RLT (VDI 6022) und Legionellenbefunde (TrinkwV)",
          "Feuerstättenbescheid des bevollmächtigten Bezirksschornsteinfegers",
          "Anlagenlisten, Revisionspläne, Bedienungs- und Wartungsanleitungen der Hersteller",
          "Laufende Wartungs- und Dienstleistungsverträge mit Kündigungsfristen",
          "Offene Mängellisten und behördliche Auflagen",
        ],
      },
      { type: "h2", text: "Ablauf einer strukturierten Übernahme", id: "ablauf" },
      {
        type: "steps",
        items: [
          "**Vor dem Signing:** technische Due Diligence mit Prüfstatus der wesentlichen Anlagen; fehlende Nachweise als Risiko bewerten.",
          "**Bis zum Übergang:** Unterlagenliste anfordern, Wartungsverträge prüfen, Übergabetermin mit Begehung vereinbaren.",
          "**Am Übergabetag:** Zählerstände, Schlüssel, Unterlagen und offene Mängel protokollieren.",
          "**In den ersten 30 Tagen:** Kataster anlegen, überfällige Prüfungen beauftragen, Zuständigkeiten intern festlegen.",
          "**In den ersten 90 Tagen:** Verträge neu ordnen oder bündeln, Fristen in die laufende Überwachung übernehmen.",
        ],
      },
      {
        type: "example",
        title: "Logistikimmobilie nach Ankauf",
        text: [
          "Ein Investor übernimmt eine Logistikhalle. Die Unterlagen enthalten Wartungsnachweise, aber keine Prüfberichte für die 14 kraftbetätigten Tore und die Regalanlagen. Die letzte Hauptprüfung des Lastenaufzugs liegt 26 Monate zurück.",
          "In der ersten Woche wird der Aufzug stillgelegt und die Prüfung durch die ZÜS beauftragt, Tore und Regale werden innerhalb von vier Wochen geprüft. Das [Betreiberpflichtenkataster](/wissen/betreiberpflichtenkataster-erstellen) bildet ab dann die Grundlage für alle Fristen.",
        ],
      },
      { type: "h2", text: "Neubau: Prüfungen vor Nutzungsaufnahme", id: "neubau" },
      {
        type: "p",
        text: "In Sonderbauten verlangen die Prüfverordnungen der Länder, dass sicherheitstechnische Anlagen vor der ersten Inbetriebnahme durch Prüfsachverständige geprüft werden. Aufzüge und überwachungsbedürftige Druckanlagen brauchen eine Prüfung vor Inbetriebnahme durch die ZÜS (§ 15 BetrSichV), elektrische Anlagen eine Erstprüfung. Mit der Abnahme beginnen die wiederkehrenden Fristen – sie müssen ab dem ersten Tag überwacht werden.",
      },
    ],
    faqs: [
      [
        "Ab wann gelten die Betreiberpflichten für den neuen Eigentümer?",
        "Mit dem Übergang von Besitz, Nutzen und Lasten, also in der Regel zum vereinbarten Stichtag im Kaufvertrag. Ab dann ist der neue Eigentümer für Prüfungen und Verkehrssicherung verantwortlich.",
      ],
      [
        "Welche Unterlagen brauche ich bei einer Objektübernahme?",
        "Insbesondere Baugenehmigung und Brandschutzkonzept, Prüfberichte von Prüfsachverständigen und ZÜS, Elektroprüfprotokolle, Wartungsnachweise Brandschutz, Hygiene- und Legionellenbefunde, Feuerstättenbescheid, Anlagenlisten, Wartungsverträge und offene Mängellisten.",
      ],
      [
        "Was tun, wenn Prüfnachweise fehlen?",
        "Fehlende Prüfungen kurzfristig nachholen lassen, bei sicherheitsrelevanten Anlagen wie Aufzügen gegebenenfalls bis dahin außer Betrieb nehmen und das Vorgehen dokumentieren. Im Kaufvertrag können fehlende Nachweise als Gewährleistungs- oder Preisthema geregelt werden.",
      ],
      [
        "Gehen Wartungsverträge beim Kauf automatisch über?",
        "Nicht automatisch. Ob Verträge übergehen, hängt von den Vertragsregelungen und der Vereinbarung im Kaufvertrag ab. Deshalb gehört die Prüfung laufender Verträge zur Übernahme.",
      ],
    ],
    sources: [
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["PrüfVO", "wiederkehrende Prüfungen sicherheitstechnischer Anlagen"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A–1C"],
    ["TrinkwV", "§ 31, § 51"],
    ["VDI 6022", "Hygienekontrollen und Hygieneinspektionen"],
    ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
  ],
    related: [
      ["Betreiberpflichtenkataster erstellen", "/wissen/betreiberpflichtenkataster-erstellen", "Kataster nach Übernahme"],
      ["Externer Betreibermanager", "/externer-betreibermanager", "Übernahme begleiten lassen"],
      ["Betreiberpflichten Wohnungsunternehmen", "/betreiberpflichten/wohnungsunternehmen", "Zukäufe im Wohnungsbestand"],
    ],
    cta: "Objektübernahme strukturiert begleiten lassen.",
  },
  {
    slug: "dguv-v3-prueffristen-organisieren",
    keyword: "dguv v3 prüffristen organisieren",
    secondary: [],
    cluster: "Organisation",
    areas: ["dguv-v3-pruefung"],
    title: "DGUV V3 Prüffristen richtig organisieren – Leitfaden",
    description:
      "DGUV-V3-Prüffristen organisieren: Fristen festlegen, Gefährdungsbeurteilung, Fehlerquote, Geräteerfassung und Fristenüberwachung für mehrere Standorte.",
    h1: "DGUV-V3-Prüffristen richtig organisieren: von der Geräteliste bis zur Fristverlängerung",
    kicker: "ORGANISATION",
    teaser: "Fristen begründet festlegen, Geräte erfassen, Fehlerquote nutzen – für einen oder viele Standorte.",
    published,
    modified: published,
    lead: [
      "DGUV-V3-Prüffristen werden vom Betreiber in der Gefährdungsbeurteilung festgelegt. Die Durchführungsanweisungen zur DGUV Vorschrift 3 nennen Richtwerte: vier Jahre für ortsfeste Anlagen, sechs Monate für ortsveränderliche Betriebsmittel – verlängerbar bis auf zwei Jahre, wenn die Fehlerquote unter 2 Prozent liegt. Gut organisiert wird daraus ein planbarer Jahreskalender statt einer Folge von Einzelterminen.",
    ],
    blocks: [
      { type: "h2", text: "Richtwerte der DGUV Vorschrift 3", id: "richtwerte" },
      {
        type: "table",
        caption: "Richtwerte nach den Durchführungsanweisungen zu § 5 DGUV Vorschrift 3",
        head: ["Anlage / Betriebsmittel", "Richtwert", "Prüfer", "Tabelle"],
        rows: [
          ["Elektrische Anlagen und ortsfeste Betriebsmittel", "4 Jahre", "Elektrofachkraft", "1A"],
          ["Anlagen in Räumen besonderer Art (DIN VDE 0100-700 ff.)", "1 Jahr", "Elektrofachkraft", "1A"],
          ["Ortsveränderliche Betriebsmittel", "6 Monate, Baustellen 3 Monate", "Elektrofachkraft; mit Messgerät auch EuP", "1B"],
          ["… bei Fehlerquote unter 2 %", "bis 1 Jahr (Werkstatt, Fertigung) bzw. 2 Jahre (Büro)", "wie oben", "1B"],
          ["RCD in stationären Anlagen", "Prüftaste alle 6 Monate", "Benutzer", "1C"],
        ],
      },
      {
        type: "note",
        text: "Für Kommunen und andere Mitglieder der Unfallkassen gilt die inhaltsgleiche DGUV Vorschrift 4. Alle Fristen mit Rechtsgrundlage: [DGUV V3 Prüfung](/pruefbereiche/dguv-v3-pruefung).",
      },
      { type: "h2", text: "Frist festlegen: die Gefährdungsbeurteilung", id: "festlegen" },
      {
        type: "p",
        text: "Verbindlich ist nicht der Richtwert, sondern die Frist, die der Betreiber nach § 3 Abs. 6 BetrSichV so bemisst, dass die Arbeitsmittel bis zur nächsten Prüfung sicher verwendet werden können. Kriterien sind Beanspruchung, Umgebungsbedingungen, Nutzungshäufigkeit, Nutzerkreis und Erfahrungen aus früheren Prüfungen.",
      },
      {
        type: "table",
        head: ["Einsatzbereich", "Typische Festlegung ortsveränderlicher Geräte", "Begründung"],
        rows: [
          ["Büro, Verwaltung", "12–24 Monate", "geringe Beanspruchung, Fehlerquote meist niedrig"],
          ["Schule, Kita (Lehrerzimmer, Küche)", "12 Monate", "wechselnde Nutzer, mitgebrachte Geräte"],
          ["Hausmeisterwerkstatt, Bauhof", "6–12 Monate", "mechanische Beanspruchung"],
          ["Baustelle, Außeneinsatz", "3 Monate", "hohe Beanspruchung, Feuchtigkeit"],
          ["Großküche", "6–12 Monate", "Feuchtigkeit, Wärme, Reinigung"],
        ],
      },
      { type: "h2", text: "Prüffristen organisieren in sechs Schritten", id: "organisieren" },
      {
        type: "steps",
        items: [
          "**Bestand erfassen:** Geräte und Anlagen je Raum mit Inventarnummer, Geräteart, Schutzklasse und letztem Prüfdatum.",
          "**Gruppen bilden:** Geräte nach Einsatzbereich zusammenfassen und je Gruppe eine Frist festlegen.",
          "**Fristen dokumentieren:** Begründung in der Gefährdungsbeurteilung festhalten.",
          "**Termine bündeln:** Prüfungen je Standort oder Region auf feste Monate legen; ortsfeste Anlagen und Geräte im selben Termin prüfen, wenn möglich.",
          "**Protokolle auswerten:** Fehlerquote je Gruppe aus den Prüfprotokollen ablesen.",
          "**Fristen anpassen:** Bei belegter Fehlerquote unter 2 % verlängern, bei hoher Quote verkürzen – jeweils dokumentiert.",
        ],
      },
      {
        type: "example",
        title: "Verwaltung mit 1.200 Geräten an neun Standorten",
        text: [
          "Bisher: jährliche Prüfung aller Geräte, verteilt auf 30 Einzeltermine. Nach Auswertung der Protokolle liegt die Fehlerquote in den Büros bei 0,8 %, in den Werkstätten bei 4,1 %.",
          "Neu: Bürogeräte alle 24 Monate, Werkstattgeräte alle 6 Monate, Prüfungen in drei regionalen Blöcken. Die Zahl der jährlichen Geräteprüfungen sinkt deutlich, während die risikoreichen Bereiche häufiger geprüft werden. Was das finanziell bedeutet, zeigt die Seite [DGUV V3 Prüfung Kosten](/pruefbereiche/dguv-v3-pruefung/kosten).",
        ],
      },
      { type: "h2", text: "Checkliste für das Prüfprotokoll", id: "protokoll" },
      {
        type: "checklist",
        items: [
          "Eindeutige Geräte-ID und Standort",
          "Angewandte Norm (DIN EN 50699 / VDE 0702 bzw. DIN VDE 0105-100)",
          "Messwerte und Bewertung bestanden / nicht bestanden",
          "Name und Qualifikation des Prüfers, verwendetes Messgerät",
          "Prüfdatum und nächster Prüftermin",
          "Festgestellte Mängel mit Maßnahme",
          "Auswertbar nach Gerätegruppe – Voraussetzung für die Fristverlängerung",
        ],
      },
    ],
    faqs: [
      [
        "Wer legt die DGUV-V3-Prüffristen fest?",
        "Der Unternehmer bzw. Betreiber in der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV. Die Tabellen der Durchführungsanweisungen zur DGUV Vorschrift 3 liefern dafür Richtwerte.",
      ],
      [
        "Kann die Prüffrist für Bürogeräte auf zwei Jahre verlängert werden?",
        "Ja, wenn bei den Prüfungen eine Fehlerquote unter 2 Prozent nachgewiesen ist. Dann nennt Tabelle 1B als Maximum zwei Jahre für Büros und ähnliche Bedingungen. Die Begründung muss dokumentiert sein.",
      ],
      [
        "Was ist die Fehlerquote bei der DGUV-V3-Prüfung?",
        "Der Anteil der geprüften Betriebsmittel, bei denen Mängel festgestellt wurden. Sie wird aus den Prüfprotokollen je Gerätegruppe ermittelt und ist Grundlage für die Verlängerung oder Verkürzung der Frist.",
      ],
      [
        "Müssen neue Geräte sofort geprüft werden?",
        "Die DGUV Vorschrift 3 verlangt eine Prüfung vor der ersten Inbetriebnahme. Bei neuen Geräten mit Herstellerbestätigung über die Einhaltung der elektrotechnischen Regeln entfällt diese Erstprüfung in der Regel; sie werden dann in den Prüfzyklus aufgenommen.",
      ],
    ],
    sources: [
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A–1C"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
    ["ArbSchG", "§ 5, § 13 Abs. 2"],
  ],
    related: [
      ["DGUV V3 Prüfung", "/pruefbereiche/dguv-v3-pruefung", "Prüfbereich Elektrotechnik"],
      ["DGUV V3 Prüfung Kosten", "/pruefbereiche/dguv-v3-pruefung/kosten", "Preise und Rechenbeispiel"],
      ["Prüffristen im Überblick", "/prueffristen", "Alle Prüfbereiche"],
    ],
    cta: "DGUV-V3-Prüfungen über alle Standorte koordinieren lassen.",
  },
];
