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
      { type: "h2", text: "Rechtsquellen je Anlage finden", id: "rechtsquellen" },
      {
        type: "table",
        caption: "Wo die Pflichten für typische Anlagen stehen",
        head: ["Anlage", "Rechtsquelle", "Beispiel einer Pflicht"],
        rows: [
          ["Elektrische Anlagen und Geräte", "DGUV Vorschrift 3 bzw. 4, BetrSichV", "Wiederholungsprüfung nach § 5 DGUV V3"],
          ["Aufzüge", "BetrSichV Anhang 2 Abschnitt 2", "Haupt- und Zwischenprüfung durch ZÜS"],
          ["Trinkwasser", "TrinkwV", "Legionellenuntersuchung nach § 31"],
          ["RLT-Anlagen", "ArbStättV, VDI 6022", "Hygieneinspektion"],
          ["Feuerlöscher", "ArbStättV, ASR A2.2, DIN 14406-4", "Instandhaltung mindestens alle 2 Jahre"],
          ["Sicherheitstechnik in Sonderbauten", "Prüfverordnung des Landes", "Prüfung durch Prüfsachverständige"],
          ["Regale", "BetrSichV, DIN EN 15635", "Experteninspektion mindestens alle 12 Monate"],
          ["Fahrzeuge, Stapler", "DGUV Vorschrift 70, 68", "Sachkundigenprüfung mindestens jährlich"],
        ],
      },
      {
        type: "p",
        text: "Die Tabelle ist ein Einstieg, keine vollständige Liste. Je nach Nutzung kommen weitere Rechtsquellen hinzu – Landesbauordnungen für Rauchwarnmelder, die Medizinprodukte-Betreiberverordnung in Kliniken und Pflege, das Wasserhaushaltsrecht für Anlagen mit wassergefährdenden Stoffen. Ein gutes Kataster zeigt bei jeder Zeile, aus welcher Quelle die Pflicht stammt, damit Änderungen der Rechtslage gezielt eingepflegt werden können.",
      },
      { type: "h2", text: "Das Kataster aktuell halten", id: "pflege" },
      {
        type: "p",
        text: "Ein Kataster veraltet an drei Stellen: wenn sich Anlagen ändern (Neubau, Umbau, Austausch, Stilllegung), wenn sich die Nutzung ändert (ein Büro wird zur Kita, ein Lager zur Werkstatt) und wenn sich die Rechtslage ändert. Legen Sie für jede dieser Änderungsarten fest, wer das Kataster informiert. Bei Organisationen mit vielen Standorten sollte jede Baumaßnahme und jeder Mieterwechsel automatisch eine Prüfung des Katasters auslösen. Mindestens einmal jährlich wird das Kataster vollständig mit dem tatsächlichen Bestand abgeglichen – am besten bei einer Begehung, bei der auch Anlagen auffallen, die in keiner Liste stehen.",
      },
      {
        type: "p",
        text: "Ein Hinweis zum Umfang: Ein Kataster muss nicht am ersten Tag perfekt sein. Beginnen Sie mit den Anlagen, bei denen ein Versäumnis die schwersten Folgen hätte – Aufzüge, Brandschutztechnik, Trinkwasser, Elektro –, und ergänzen Sie danach Regale, Tore, Leitern und Außenanlagen. Wichtig ist, dass jede erfasste Pflicht sofort eine Frist und eine verantwortliche Person erhält. Ein unvollständiges, aber gepflegtes Kataster ist wertvoller als ein vollständiges, das niemand nutzt.",
      },
      {
        type: "p",
        text: "Für Wohnungsunternehmen, Kommunen und Klinikträger mit vielen Standorten empfiehlt sich eine einheitliche Struktur über alle Liegenschaften, damit Auswertungen und Statusberichte ohne Nacharbeit möglich sind.",
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
      [
        "Wie oft muss ein Betreiberpflichtenkataster aktualisiert werden?",
        "Bei jeder Änderung an Anlagen, Nutzung oder Rechtslage und zusätzlich mindestens einmal jährlich in einem vollständigen Abgleich mit dem tatsächlichen Bestand.",
      ],
    ],
    sources: [
    ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["ArbSchG", "§ 5, § 13 Abs. 2"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A und 1B"],
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
    slug: "haftung-fehlende-pruefungen",
    keyword: "haftung fehlende prüfung",
    secondary: ["wer haftet bei fehlenden prüfungen", "organisationsverschulden betreiber"],
    cluster: "Grundlagen",
    title: "Wer haftet bei fehlenden Prüfungen? Betreiberhaftung erklärt",
    description:
      "Wer haftet bei fehlenden Prüfungen? Zivil-, Straf- und Bußgeldhaftung von Unternehmen, Leitung und Beauftragten – mit Beispielen und Schutzmaßnahmen.",
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
        text: "Die Delegation verschiebt also Pflichten nach unten, entlastet die Leitung aber nur, wenn Auswahl, Anweisung und Kontrolle nachweisbar sind. Mehr dazu: [Was ist Betreiberverantwortung?](/betreiberverantwortung)",
      },
      { type: "h2", text: "Bußgelder bei versäumten Prüfungen", id: "bussgelder" },
      {
        type: "table",
        head: ["Verstoß", "Rechtsgrundlage", "Bußgeldrahmen"],
        rows: [
          ["Arbeitsmittel vor der erstmaligen Verwendung bzw. Arbeitsmittel nach Anhang 3 nicht oder nicht rechtzeitig prüfen lassen", "§ 22 Abs. 1 Nr. 28 BetrSichV i. V. m. § 25 Abs. 2 ArbSchG", "bis 5.000 €"],
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
      { type: "h2", text: "Haftung in Kommunen und bei sozialen Trägern", id: "oeffentlich" },
      {
        type: "p",
        text: "Bei Kommunen tritt neben die zivilrechtliche Haftung die Amtshaftung: Verletzt ein Amtsträger in Ausübung eines öffentlichen Amtes eine Pflicht gegenüber Dritten, haftet grundsätzlich die Körperschaft (§ 839 BGB in Verbindung mit Art. 34 GG). Die Verkehrssicherungspflicht für öffentliche Gebäude wird in der Praxis häufig als Amtspflicht behandelt. Strafrechtlich bleibt es bei der persönlichen Verantwortung der handelnden Personen – Bürgermeister, Amtsleitungen, technische Leitungen und beauftragte Mitarbeiter können ebenso ins Visier von Ermittlungen geraten wie Geschäftsführer eines Unternehmens. § 130 OWiG gilt nach Abs. 2 ausdrücklich auch für öffentliche Unternehmen.",
      },
      {
        type: "p",
        text: "Bei sozialen Trägern, Kirchengemeinden und Vereinen ist die Verantwortung oft auf ehrenamtliche Vorstände verteilt. Auch sie tragen die Organisationsverantwortung für Gebäude und Anlagen, die der Träger betreibt. Gerade dort fehlt häufig eine klare schriftliche Aufgabenübertragung an Hauptamtliche oder Dienstleister – und damit der Nachweis, dass die Leitung ihre Auswahl-, Anweisungs- und Kontrollpflicht erfüllt hat.",
      },
      { type: "h2", text: "Wie eine wirksame Delegation aussieht", id: "delegation" },
      {
        type: "table",
        caption: "Inhalt einer schriftlichen Pflichtenübertragung (Beispiel)",
        head: ["Bestandteil", "Inhalt"],
        rows: [
          ["Aufgaben", "konkret benannte Pflichten, z. B. Organisation der Elektro- und Brandschutzprüfungen für die Liegenschaften A bis F"],
          ["Befugnisse", "Beauftragung von Prüfdiensten bis zu einer Wertgrenze, Stilllegung von Anlagen bei Gefahr"],
          ["Mittel", "Budget, Zugang zu Unterlagen, Unterstützung durch Fachkraft für Arbeitssicherheit"],
          ["Berichtspflicht", "quartalsweiser Statusbericht an die Leitung"],
          ["Qualifikation", "Nachweis, dass die Person zuverlässig und fachkundig ist"],
          ["Unterschriften", "Leitung und beauftragte Person, mit Datum"],
        ],
      },
      {
        type: "p",
        text: "§ 13 Abs. 2 ArbSchG verlangt für die Übertragung von Arbeitgeberpflichten die Schriftform. Eine Stellenbeschreibung, die nur allgemein von „Betreiberpflichten“ spricht, reicht dafür in der Regel nicht. Je konkreter die Übertragung, desto klarer ist im Schadensfall, wer welche Pflicht hatte.",
      },
      {
        type: "p",
        text: "Für die Praxis lässt sich die Haftungsfrage auf drei Prüffragen zurückführen, die im Schadensfall gestellt werden: Waren die Pflichten bekannt, also im Kataster erfasst? Waren sie wirksam einer Person oder einem Dienstleister übertragen, schriftlich und mit den nötigen Befugnissen? Und hat die Leitung kontrolliert, ob sie erfüllt werden? Wer alle drei Fragen mit Unterlagen beantworten kann, hat seine Organisationspflicht erfüllt – auch wenn im Einzelfall trotzdem etwas schiefgeht. Wer eine der Fragen nicht beantworten kann, hat ein Organisationsproblem, das über den Einzelfall hinausgeht.",
      },
      {
        type: "p",
        text: "Für Organisationen mit vielen Standorten ist der Statusbericht an die Leitung das zentrale Instrument: Er dokumentiert die Kontrollpflicht der Leitung und zeigt rechtzeitig, wo Fristen überschritten oder Mängel offen sind.",
      },
      {
        type: "p",
        text: "Der Bericht sollte schriftlich erfolgen und von der Leitung zur Kenntnis genommen werden – erst dann ist er im Ernstfall ein Beleg.",
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
      [
        "Haftet eine Kommune für fehlende Prüfungen in einer Schule?",
        "Gegenüber Geschädigten kommt die Amtshaftung nach § 839 BGB in Verbindung mit Art. 34 GG in Betracht; die Körperschaft haftet dann anstelle des Amtsträgers. Strafrechtlich bleiben die handelnden Personen persönlich verantwortlich.",
      ],
    ],
    sources: [
    ["BGB", "§§ 823, 831, 836"],
    ["OWiG", "§§ 9, 130"],
    ["ArbSchG", "§ 5, § 13 Abs. 2"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A und 1B"],
    ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
  ],
    related: [
      ["Was ist Betreiberverantwortung?", "/betreiberverantwortung", "Definition und Delegation"],
      ["Externer Betreibermanager", "/externer-betreibermanager", "Haftungsrisiken reduzieren"],
      ["DGUV V3 Prüfung Kosten", "/dguv-v3-pruefung-kosten", "Was die Prüfung kostet"],
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
      { type: "h2", text: "Typische Schnittstellen und ihre Regelung", id: "schnittstellen" },
      {
        type: "table",
        caption: "Häufige Schnittstellen im Facility Management",
        head: ["Schnittstelle", "Typisches Problem", "Regelung"],
        rows: [
          ["Eigentümer – Mieter", "Unklar, wer Arbeitsmittel und Gebäudetechnik prüft", "Pflichtenmatrix als Anlage zum Mietvertrag"],
          ["Eigentümer – FM-Dienstleister", "Pflichten nur pauschal übertragen", "Leistungsverzeichnis mit Anlagenliste und Rechtsgrundlagen"],
          ["FM-Dienstleister – Nachunternehmer", "Prüfer nicht qualifiziert, Protokolle fehlen", "Qualifikationsnachweise und Protokollformat im Vertrag"],
          ["Technik – Hygiene (Klinik)", "Doppelte oder fehlende Prüfungen an RLT und Trinkwasser", "Schriftliche Zuständigkeitsregelung"],
          ["Verwaltung – Nutzer (Schule)", "Mitgebrachte Geräte, Vereinsnutzung", "Hausordnung und Nutzungsvereinbarungen"],
        ],
      },
      {
        type: "p",
        text: "Die meisten Lücken entstehen nicht durch fehlende Dienstleister, sondern durch ungeregelte Übergänge zwischen ihnen. Eine Schnittstellenliste – welche Pflicht liegt bei wem, wer meldet Mängel an wen, wer entscheidet über Maßnahmen – ist deshalb so wichtig wie das Kataster selbst.",
      },
      { type: "h2", text: "Leistungsverzeichnisse richtig aufbauen", id: "leistungsverzeichnis" },
      {
        type: "p",
        text: "Ein FM-Vertrag überträgt nur, was im Leistungsverzeichnis konkret steht. Bewährt hat sich eine Struktur, die jeder Anlage aus dem Betreiberpflichtenkataster eine Leistung, ein Intervall, eine Rechtsgrundlage und eine Dokumentationspflicht zuordnet. GEFMA bietet dafür Arbeitshilfen; viele öffentliche Auftraggeber orientieren sich zusätzlich an den Empfehlungen des Arbeitskreises Maschinen- und Elektrotechnik staatlicher und kommunaler Verwaltungen (AMEV). Entscheidend ist, dass das Leistungsverzeichnis aus dem Kataster entsteht und nicht umgekehrt – sonst decken Verträge nur ab, was der Dienstleister ohnehin anbietet.",
      },
      {
        type: "checklist",
        items: [
          "Jede Position mit Anlage, Leistung, Intervall und Rechtsgrundlage",
          "Qualifikation des Personals je Leistung",
          "Format und Frist für Berichte und Protokolle",
          "Mängelmeldung mit Fristen nach Dringlichkeit",
          "Schnittstellen zu anderen Dienstleistern und zum Nutzer",
          "Kennzahlen für das Berichtswesen, z. B. Anteil fristgerecht erledigter Prüfungen",
        ],
      },
      { type: "h2", text: "FM über mehrere Standorte steuern", id: "steuerung" },
      {
        type: "p",
        text: "Bei Wohnungsunternehmen, Kommunen und Klinikverbünden arbeiten oft mehrere FM-Dienstleister nebeneinander – regional verteilt oder nach Gewerken getrennt. Die Betreiberorganisation braucht dann eine Stelle, die alle Verträge, Fristen und Berichte zusammenführt. Ohne diese Stelle hat jeder Dienstleister seinen Ausschnitt im Blick, aber niemand das Ganze. Das ist die Aufgabe eines Betreibermanagements, intern oder extern: Pflichten aus dem Kataster in Verträge übersetzen, Erfüllung kontrollieren und der Leitung berichten.",
      },
      { type: "h2", text: "Häufige Fehler in FM-Verträgen", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Pauschale Übertragung „aller Betreiberpflichten“ ohne Anlagenliste",
          "Keine Regelung, wer Prüfungen durch ZÜS oder Prüfsachverständige beauftragt",
          "Mängel werden gemeldet, aber niemand ist befugt, die Behebung zu beauftragen",
          "Berichte nur auf Anfrage statt regelmäßig",
          "Kein Recht des Betreibers, Prüfnachweise und Qualifikationsnachweise einzusehen",
        ],
      },
      {
        type: "p",
        text: "Diese Fehler fallen meist erst auf, wenn etwas passiert. Dann zeigt sich, dass der Dienstleister seinen Vertrag erfüllt hat, die eigentliche Pflicht aber nicht abgedeckt war. Eine jährliche Überprüfung der Verträge gegen das Betreiberpflichtenkataster schließt diese Lücken: Jede Pflicht im Kataster muss einer Vertragsposition oder einer internen Stelle zugeordnet sein. Was übrig bleibt, ist eine offene Pflicht und muss vergeben werden.",
      },
      { type: "h2", text: "Kennzahlen für die Steuerung", id: "kennzahlen" },
      {
        type: "table",
        head: ["Kennzahl", "Aussage"],
        rows: [
          ["Anteil fristgerecht durchgeführter Prüfungen", "Wie zuverlässig arbeitet die Organisation?"],
          ["Zahl überfälliger Prüfungen", "Wo besteht akuter Handlungsbedarf?"],
          ["Offene Mängel nach Alter", "Werden Mängel behoben oder nur verwaltet?"],
          ["Anlagen ohne zugeordnete Zuständigkeit", "Wo fehlt die Delegation?"],
          ["Verträge ohne Qualifikationsnachweis", "Ist die Auswahlpflicht erfüllt?"],
        ],
      },
      {
        type: "p",
        text: "Wenige Kennzahlen genügen, um die Kontrollpflicht wirksam wahrzunehmen. Sie gehören in den regelmäßigen Bericht an Geschäftsführung, Vorstand oder Verwaltungsleitung und zeigen über die Zeit, ob die Betreiberorganisation besser wird.",
      },
      {
        type: "p",
        text: "Für öffentliche Auftraggeber haben Kennzahlen einen zusätzlichen Nutzen: Sie machen die Leistung verschiedener Dienstleister vergleichbar und liefern Argumente für die nächste Vergabe. Wer über mehrere Jahre sieht, dass ein Dienstleister Fristen regelmäßig überschreitet oder Mängel lange offen lässt, kann das bei der Neuausschreibung berücksichtigen. Ebenso zeigen die Kennzahlen, wo interne Abläufe hakeln – etwa wenn Mängel zwar gemeldet, aber mangels Freigabe nicht beauftragt werden. Solche Engpässe lassen sich durch klare Wertgrenzen und Befugnisse beheben. Ein jährliches Gespräch mit jedem Dienstleister auf Basis dieser Zahlen hält beide Seiten im Takt.",
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
      [
        "Was gehört in ein Leistungsverzeichnis für FM-Dienstleister?",
        "Je Anlage die Leistung, das Intervall, die Rechtsgrundlage, die Qualifikation des Personals, Format und Frist der Dokumentation, die Regelung für Mängel und die Schnittstellen zu anderen Beteiligten.",
      ],
    ],
    sources: [
    ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["ArbStättV", "§ 4 Abs. 3"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A und 1B"],
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
      "Betreiberpflichten bei Objektübernahmen: welche Unterlagen, Prüfnachweise und Verträge Sie bei Kauf, Neubau oder Mieterwechsel brauchen – Checkliste.",
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
      { type: "h2", text: "Technische Due Diligence: worauf es ankommt", id: "due-diligence" },
      {
        type: "p",
        text: "Vor einem Ankauf zeigt die technische Due Diligence, welche Betreiberpflichten das Objekt auslöst und ob sie bisher erfüllt wurden. Dabei geht es nicht nur um den baulichen Zustand, sondern um Nachweise: Liegen für alle prüfpflichtigen Anlagen aktuelle Prüfberichte vor? Sind Mängel aus diesen Berichten behoben? Gibt es behördliche Auflagen oder offene Beanstandungen aus einer Brandschau? Fehlende Nachweise sind kein Ausschlussgrund, aber ein Kostenfaktor: Nachgeholte Prüfungen, Mängelbeseitigung und eventuell Stilllegungen bis zur Prüfung gehören in die Kaufpreisverhandlung oder in die Gewährleistungsregelung.",
      },
      {
        type: "table",
        caption: "Prüfpunkte der technischen Due Diligence aus Sicht der Betreiberpflichten",
        head: ["Bereich", "Frage", "Risiko bei fehlendem Nachweis"],
        rows: [
          ["Aufzüge", "Aktuelle Prüfbescheinigung der ZÜS, Notrufsystem?", "Stilllegung bis zur Prüfung"],
          ["Brandschutz", "Prüfberichte der Prüfsachverständigen, Wartung BMA, RWA, Feuerlöscher?", "Auflagen der Bauaufsicht, Nutzungsuntersagung im Extremfall"],
          ["Elektro", "Prüfprotokolle ortsfester Anlagen?", "Nachprüfung, Mängelbeseitigung"],
          ["Trinkwasser", "Legionellenbefunde, Probennahmestellen?", "Nachuntersuchung, Nachrüstung, ggf. Sanierung"],
          ["Lüftung", "Hygieneinspektionsberichte?", "Inspektion und Reinigung"],
          ["Verträge", "Laufzeiten, Kündigungsfristen, Leistungsumfang?", "Doppelte Kosten, Lücken nach Übergang"],
        ],
      },
      { type: "h2", text: "Häufige Fehler bei Übernahmen", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Unterlagen nach dem Übergang angefordert statt vor der Unterzeichnung",
          "Wartungsverträge des Verkäufers ungeprüft weiterlaufen lassen oder gekündigt, ohne Ersatz",
          "Prüffristen aus alten Berichten nicht übernommen – die nächste Fälligkeit wird übersehen",
          "Anlagen im Mieterbereich nicht erfasst, weil sie in keiner Liste standen",
          "Zuständigkeit im eigenen Haus für das neue Objekt nicht festgelegt",
        ],
      },
      { type: "h2", text: "Übernahme im Wohnungsbestand und bei Kommunen", id: "bestand" },
      {
        type: "p",
        text: "Wohnungsunternehmen übernehmen Objekte häufig im Paket – etwa beim Ankauf eines Portfolios oder bei der Fusion zweier Genossenschaften. Die Prüfung jedes einzelnen Gebäudes ist dann aufwendig, aber notwendig: Legionellenpflicht, Aufzüge, Tiefgaragen und Spielplätze unterscheiden sich von Objekt zu Objekt. Kommunen übernehmen Gebäude bei Schulneubauten, Rückkäufen aus PPP-Modellen oder Eingemeindungen. In allen Fällen gilt: Die Betreiberpflichten beginnen mit dem Übergang, unabhängig davon, ob die Unterlagen vollständig sind. Wer die Übernahme mit einem Kataster abschließt, hat ab dem ersten Tag einen Fristenplan.",
      },
      { type: "h2", text: "Die ersten 100 Tage nach dem Übergang", id: "hundert-tage" },
      {
        type: "table",
        head: ["Zeitraum", "Aufgabe", "Ergebnis"],
        rows: [
          ["Tag 1", "Übergabeprotokoll mit Unterlagen, Schlüsseln und offenen Mängeln", "dokumentierter Ausgangszustand"],
          ["Woche 1", "überfällige sicherheitsrelevante Prüfungen beauftragen, gefährliche Anlagen sichern", "kein Betrieb ohne Prüfung"],
          ["Monat 1", "Betreiberpflichtenkataster anlegen, Zuständigkeiten festlegen", "vollständige Pflichtenliste"],
          ["Monat 2", "Verträge prüfen, übernehmen, kündigen oder neu vergeben", "lückenlose Leistungsabdeckung"],
          ["Monat 3", "Fristenplan in die laufende Überwachung übernehmen, erster Statusbericht", "Regelbetrieb"],
        ],
      },
      {
        type: "p",
        text: "Der Zeitplan ist ehrgeizig, aber realistisch, wenn die Unterlagen vor dem Übergang angefordert wurden. Kritisch sind die ersten Tage: Eine Aufzugsprüfung, die seit Monaten überfällig ist, wird mit dem Übergang zum Risiko des neuen Eigentümers. Wer in der ersten Woche handelt und dokumentiert, steht im Schadensfall deutlich besser da als jemand, der erst den vollständigen Überblick abwartet. Für Wohnungsunternehmen, Kommunen und Klinikträger, die regelmäßig Objekte übernehmen, lohnt sich ein standardisierter Übernahmeprozess mit Checkliste und Verantwortlichen.",
      },
      { type: "h2", text: "Übernahme bei Mieterwechsel", id: "mieterwechsel" },
      {
        type: "p",
        text: "Ein Sonderfall ist der Auszug eines Mieters, der ein Gebäude allein genutzt und als Betreiber vieler Anlagen auftrat – etwa eines Logistikers in einer Halle oder einer Klinik in einem gemieteten Gebäude. Mit dem Auszug fallen Pflichten an den Eigentümer zurück, die er jahrelang nicht wahrgenommen hat. Lassen Sie sich bei der Rückgabe die Prüfnachweise und Wartungsverträge übergeben, erfassen Sie Einbauten des Mieters und klären Sie, welche Anlagen zurückgebaut werden. Bis zur Neuvermietung bleiben Verkehrssicherung, Trinkwasser und Brandschutz Pflichten des Eigentümers, auch im Leerstand.",
      },
      {
        type: "p",
        text: "Im Leerstand ändern sich manche Pflichten, andere nicht. Trinkwasseranlagen müssen weiter so betrieben werden, dass sich keine Legionellen vermehren – Stagnation im Leerstand ist ein typisches Risiko. Aufzüge, die außer Betrieb genommen werden, sollten formal stillgelegt und gesichert werden. Brandschutz und Verkehrssicherung bleiben in vollem Umfang bestehen. Wer leerstehende Objekte im Kataster als eigenen Status führt, behält diese Pflichten im Blick, bis das Objekt wieder genutzt wird. Das gilt auch für Teilleerstand in einzelnen Etagen oder Gebäudeteilen.",
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
      [
        "Wer haftet für Prüfungen, die der Verkäufer versäumt hat?",
        "Für Schäden nach dem Übergang haftet grundsätzlich der neue Betreiber, wenn er die Lücke kennen musste und nicht gehandelt hat. Ansprüche gegen den Verkäufer richten sich nach dem Kaufvertrag. Deshalb gehören fehlende Nachweise vor der Unterzeichnung auf den Tisch.",
      ],
    ],
    sources: [
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["PrüfVO", "wiederkehrende Prüfungen sicherheitstechnischer Anlagen"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A und 1B"],
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
];
