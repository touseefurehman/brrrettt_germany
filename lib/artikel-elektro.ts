import type { Article } from "./pages";

// Fachartikel Cluster Elektro – Longtail zu „dguv v3 prüfung“ (Anlage A Nr. 1 und 6). Übergeordnete Leistungsseite:
// /dguv-v3-pruefung. Fristen nach DGUV Vorschrift 3 mit Durchführungsanweisungen (Fassung 01/1997, DA 04/1997),
// BetrSichV geprüft am Volltext (Stand 12/2025).

const published = "2026-10-22";

export const elektroArticles: Article[] = [
  {
    slug: "dguv-v3-pruefung-wie-oft",
    keyword: "dguv v3 prüfung wie oft",
    secondary: ["dguv v3 prüffristen", "dguv v3 prüfung intervall", "prüffrist ortsveränderliche geräte", "dguv v3 prüfung alle 2 jahre", "dguv v3 fehlerquote"],
    cluster: "Elektro",
    title: "DGUV V3 Prüfung: Wie oft? Fristen nach Tabelle 1A und 1B",
    description:
      "Wie oft muss die DGUV V3 Prüfung erfolgen? Richtwerte für Anlagen, Geräte und RCD, Verlängerung bei Fehlerquote unter 2 % und wer die Frist festlegt.",
    h1: "DGUV V3 Prüfung: Wie oft geprüft werden muss",
    kicker: "ELEKTRO",
    teaser: "Richtwerte nach Tabelle 1A und 1B, Fristverlängerung über die Fehlerquote und wie Sie die Frist begründen.",
    areas: ["dguv-v3-pruefung"],
    published,
    modified: published,
    lead: [
      "Eine feste gesetzliche Frist für die DGUV V3 Prüfung gibt es nicht. Die Durchführungsanweisungen zu § 5 DGUV Vorschrift 3 nennen Richtwerte: vier Jahre für ortsfeste Anlagen, ein Jahr für Anlagen in Räumen besonderer Art, sechs Monate für ortsveränderliche Geräte – bei belegter Fehlerquote unter 2 Prozent höchstens ein Jahr in Werkstätten und zwei Jahre in Büros. Verbindlich ist die Frist, die der Arbeitgeber in der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV festlegt.",
    ],
    blocks: [
      { type: "h2", text: "Die Richtwerte im Überblick", id: "richtwerte" },
      {
        type: "table",
        caption: "Richtwerte nach den Durchführungsanweisungen zu § 5 DGUV Vorschrift 3",
        head: ["Anlage / Betriebsmittel", "Richtwert", "Prüfer", "Fundstelle"],
        rows: [
          ["Elektrische Anlagen und ortsfeste Betriebsmittel", "4 Jahre", "Elektrofachkraft", "Tabelle 1A"],
          ["Anlagen in „Betriebsstätten, Räumen und Anlagen besonderer Art“ (DIN VDE 0100 Gruppe 700)", "1 Jahr", "Elektrofachkraft", "Tabelle 1A"],
          ["Ortsveränderliche Betriebsmittel, Verlängerungs- und Geräteanschlussleitungen", "6 Monate, auf Baustellen 3 Monate", "Elektrofachkraft, mit geeigneten Messgeräten auch elektrotechnisch unterwiesene Person", "Tabelle 1B"],
          ["… wenn die Fehlerquote unter 2 % liegt", "höchstens 1 Jahr (Werkstätten, Fertigungsstätten, Baustellen) bzw. 2 Jahre (Büros und ähnliche Bedingungen)", "wie oben", "Tabelle 1B"],
          ["Schutzmaßnahmen mit Fehlerstrom-Schutzeinrichtungen in nichtstationären Anlagen", "1 Monat (Prüfung auf Wirksamkeit)", "Elektrofachkraft oder unterwiesene Person mit geeigneten Messgeräten", "Tabelle 1A"],
          ["Fehlerstrom-Schutzeinrichtungen in stationären Anlagen", "Betätigen der Prüftaste alle 6 Monate", "Benutzer", "Tabelle 1A"],
          ["Fehlerstrom-Schutzeinrichtungen in nichtstationären Anlagen", "Betätigen der Prüftaste arbeitstäglich", "Benutzer", "Tabelle 1A"],
        ],
      },
      {
        type: "p",
        text: "Die Werte stehen in den Durchführungsanweisungen, nicht im Vorschriftentext selbst. § 5 Abs. 1 Nr. 2 DGUV Vorschrift 3 verlangt nur, dass Anlagen und Betriebsmittel „in bestimmten Zeitabständen“ geprüft werden, die so zu bemessen sind, dass entstehende Mängel rechtzeitig festgestellt werden. Für Kommunen und andere Mitglieder der Unfallkassen gilt die inhaltsgleiche DGUV Vorschrift 4.",
      },
      { type: "h2", text: "Wer die Frist festlegt", id: "festlegen" },
      {
        type: "p",
        text: "Der Arbeitgeber. Nach § 3 Abs. 6 BetrSichV ermittelt er Art und Umfang der erforderlichen Prüfungen und legt die Fristen der wiederkehrenden Prüfungen fest – und zwar so, dass die Arbeitsmittel bis zur nächsten festgelegten Prüfung sicher verwendet werden können. Ergibt eine Prüfung, dass das nicht der Fall ist, ist die Frist neu festzulegen (§ 14 Abs. 2 BetrSichV). Die Richtwerte der DGUV sind also der Ausgangspunkt, nicht das Ergebnis.",
      },
      {
        type: "definition",
        term: "Räume besonderer Art",
        text: "Bereiche, für die die Normenreihe DIN VDE 0100 Gruppe 700 besondere Anforderungen stellt, etwa Räume mit Badewanne oder Dusche, Baustellen, landwirtschaftliche Betriebsstätten oder medizinisch genutzte Bereiche. Für Anlagen dort nennt Tabelle 1A ein Jahr statt vier Jahren.",
      },
      { type: "h2", text: "Kriterien für die Gefährdungsbeurteilung", id: "kriterien" },
      {
        type: "table",
        head: ["Kriterium", "Wirkt Richtung kürzer", "Wirkt Richtung länger"],
        rows: [
          ["Beanspruchung", "häufiges Umstecken, Biegen, Ziehen an Leitungen", "fest aufgestellte Geräte"],
          ["Umgebung", "Feuchtigkeit, Staub, Hitze, Außenbereich", "trockene, saubere Büroräume"],
          ["Nutzerkreis", "wechselnde Nutzer, mitgebrachte Geräte", "feste Nutzer, unterwiesenes Personal"],
          ["Erfahrungen", "Mängel bei früheren Prüfungen", "über Jahre mängelfreie Prüfprotokolle"],
          ["Herstellerangaben", "kürzere Wartungs- oder Prüfintervalle", "–"],
        ],
      },
      { type: "h2", text: "Fristverlängerung über die Fehlerquote", id: "fehlerquote" },
      {
        type: "p",
        text: "Für ortsveränderliche Betriebsmittel erlaubt Tabelle 1B eine Verlängerung, wenn bei den Prüfungen eine Fehlerquote unter 2 Prozent festgestellt wird. Gemeint ist der Anteil der geprüften Geräte, bei denen Mängel gefunden wurden. Die Verlängerung ist begrenzt: höchstens ein Jahr in Werkstätten, Fertigungsstätten und auf Baustellen, höchstens zwei Jahre in Büros oder unter ähnlichen Bedingungen.",
      },
      {
        type: "steps",
        items: [
          "Geräte nach Einsatzbereich gruppieren – etwa Büro, Werkstatt, Küche, Außenbereich.",
          "Prüfprotokolle so anfordern, dass sich die Fehlerquote je Gruppe ablesen lässt.",
          "Fehlerquote über mindestens einen vollständigen Prüfzyklus ermitteln.",
          "Verlängerung je Gruppe in der Gefährdungsbeurteilung begründen und dokumentieren.",
          "Fehlerquote bei jeder Folgeprüfung erneut auswerten und die Frist bei Bedarf wieder verkürzen.",
        ],
      },
      {
        type: "note",
        text: "Ohne auswertbare Protokolle bleibt es beim Richtwert von sechs Monaten. Was die Frist für die Kosten bedeutet, zeigt das Rechenbeispiel auf der Seite [DGUV V3 Prüfung Kosten](/dguv-v3-pruefung-kosten).",
      },
      { type: "h2", text: "Typische Festlegungen nach Einsatzbereich", id: "einsatzbereiche" },
      {
        type: "table",
        caption: "Beispiele aus der Praxis – im Einzelfall durch die Gefährdungsbeurteilung zu begründen",
        head: ["Einsatzbereich", "Ortsveränderliche Geräte", "Begründung"],
        rows: [
          ["Verwaltung, Kundencenter", "12 bis 24 Monate", "geringe Beanspruchung; 24 Monate nur bei belegter Fehlerquote unter 2 %"],
          ["Schulen, Kitas", "12 Monate", "wechselnde Nutzer, mitgebrachte Geräte"],
          ["Hausmeisterwerkstatt, Bauhof", "6 bis 12 Monate", "mechanische Beanspruchung; 12 Monate nur bei Fehlerquote unter 2 %"],
          ["Großküche", "6 bis 12 Monate", "Feuchtigkeit, Wärme, Reinigung"],
          ["Baustelle, Außeneinsatz", "3 Monate", "Richtwert für Baustellen nach Tabelle 1B"],
        ],
      },
      {
        type: "example",
        title: "Wohnungsgenossenschaft mit drei Geschäftsstellen und Regiebetrieb",
        text: [
          "Bisher wurden alle 620 Geräte jährlich geprüft. Die Auswertung der letzten beiden Protokolle ergibt: In den Geschäftsstellen liegt die Fehlerquote bei 0,9 Prozent, im Regiebetrieb bei 3,6 Prozent.",
          "Neu festgelegt werden 24 Monate für die Bürogeräte und sechs Monate für die Werkzeuge im Regiebetrieb. Die Zahl der Geräteprüfungen pro Jahr bleibt etwa gleich, aber die Prüfungen liegen jetzt dort, wo die Mängel entstehen.",
        ],
      },
      { type: "h2", text: "Wer prüft und was eine versäumte Frist bedeutet", id: "folgen" },
      {
        type: "p",
        text: "Geprüft wird durch eine Elektrofachkraft bzw. eine zur Prüfung befähigte Person nach § 2 Abs. 6 BetrSichV und TRBS 1203 – Details im Artikel [Befähigte Person nach TRBS 1203](/wissen/befaehigte-person-trbs-1203). Wer die Prüfung nach § 5 DGUV Vorschrift 3 vorsätzlich oder fahrlässig unterlässt, handelt nach § 9 der Vorschrift ordnungswidrig; die Geldbuße kann nach § 209 Abs. 3 SGB VII bis zu 10.000 Euro betragen. Entscheidend ist im Schadensfall aber der Nachweis, dass die Frist begründet festgelegt und eingehalten wurde.",
      },
      {
        type: "p",
        text: "Organisationen mit vielen Standorten verlieren den Überblick selten bei der Frist selbst, sondern bei der Frage, welche Geräte an welchem Standort wann fällig sind. Ein gemeinsamer Fristenplan über alle Standorte ist deshalb wichtiger als die Wahl zwischen zwölf und 24 Monaten. Wie das organisiert wird, beschreibt die Seite [DGUV V3 Prüfung](/dguv-v3-pruefung).",
      },
      { type: "h2", text: "Häufige Fehler bei der Fristfestlegung", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Richtwerte ohne eigene Begründung übernommen – die Gefährdungsbeurteilung fehlt",
          "Eine Frist für alle Geräte, obwohl Büro und Werkstatt sehr unterschiedlich beansprucht werden",
          "Zwei Jahre für Bürogeräte angesetzt, ohne die Fehlerquote aus früheren Protokollen zu belegen",
          "Räume besonderer Art übersehen – etwa Duschräume in Sporthallen oder medizinisch genutzte Bereiche mit Ein-Jahres-Frist",
          "Fristen festgelegt, aber nicht überwacht: Die Prüfung findet statt, wenn jemand daran denkt",
        ],
      },
      {
        type: "p",
        text: "Der letzte Punkt ist bei Organisationen mit mehreren Standorten der häufigste. Eine gut begründete Frist nützt nichts, wenn niemand den Fälligkeitstermin je Standort im Blick hat. Bewährt hat sich ein fester Prüfmonat je Standortgruppe, in dem ortsfeste Anlagen und Geräte gemeinsam geprüft werden.",
      },
      { type: "h2", text: "Fristen über mehrere Standorte abstimmen", id: "standorte" },
      {
        type: "table",
        caption: "Beispiel eines Fristenplans für eine Organisation mit unterschiedlichen Gebäudearten",
        head: ["Standortgruppe", "Ortsveränderliche Geräte", "Ortsfeste Anlagen", "Prüfmonat"],
        rows: [
          ["Verwaltung, Kundencenter", "24 Monate bei Fehlerquote unter 2 %", "4 Jahre", "Februar"],
          ["Schulen, Kitas", "12 Monate", "4 Jahre; Duschräume 1 Jahr", "Sommerferien"],
          ["Werkstätten, Bauhof", "6 Monate", "4 Jahre", "März und September"],
          ["Pflegeeinrichtung", "12 Monate", "medizinisch genutzte Bereiche 1 Jahr, sonst 4 Jahre", "Oktober"],
        ],
      },
    ],
    faqs: [
      [
        "Wie oft muss die DGUV V3 Prüfung durchgeführt werden?",
        "Es gibt keine feste gesetzliche Frist. Die Durchführungsanweisungen zu § 5 DGUV Vorschrift 3 nennen Richtwerte: vier Jahre für ortsfeste Anlagen, ein Jahr in Räumen besonderer Art, sechs Monate für ortsveränderliche Geräte. Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV.",
      ],
      [
        "Reicht im Büro eine DGUV V3 Prüfung alle zwei Jahre?",
        "Für ortsveränderliche Geräte ja, wenn bei den Prüfungen eine Fehlerquote unter 2 Prozent belegt ist. Zwei Jahre sind laut Tabelle 1B das Maximum für Büros und ähnliche Bedingungen.",
      ],
      [
        "Wer legt die Prüffrist für die DGUV V3 Prüfung fest?",
        "Der Arbeitgeber in der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV. Er muss die Frist so bemessen, dass die Geräte bis zur nächsten Prüfung sicher verwendet werden können.",
      ],
      [
        "Wie oft muss der FI-Schutzschalter geprüft werden?",
        "Die Prüftaste von Fehlerstrom-Schutzeinrichtungen ist in stationären Anlagen alle sechs Monate, in nichtstationären Anlagen arbeitstäglich durch den Benutzer zu betätigen (Tabelle 1A der Durchführungsanweisungen).",
      ],
      [
        "Gilt die Frist ab dem Kaufdatum oder ab der ersten Prüfung?",
        "Die wiederkehrende Frist läuft ab der letzten Prüfung bzw. ab der Inbetriebnahme. Neue Geräte mit Herstellerbestätigung nach § 5 Abs. 4 DGUV Vorschrift 3 werden ab Inbetriebnahme in den Prüfzyklus aufgenommen.",
      ],
    ],
    sources: [
      ["DGUV V3", "§ 5 Abs. 1 Nr. 2, § 9; Durchführungsanweisungen zu § 5, Tabellen 1A und 1B"],
      ["DGUV V4", "§ 5 (inhaltsgleich)"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6, § 14 Abs. 2"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["SGB VII", "§ 209 Abs. 1 Nr. 1, Abs. 3"],
    ],
    related: [
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Pflicht, Prüfer, Organisation"],
      ["DGUV V3 Prüfung Kosten", "/dguv-v3-pruefung-kosten", "Was die Frist kostet"],
      ["Prüffristen festlegen", "/wissen/prueffristen-festlegen", "Gefährdungsbeurteilung"],
      ["Ortsveränderliche Geräte", "/wissen/dguv-v3-ortsveraenderliche-geraete", "Was dazugehört"],
    ],
    cta: "DGUV-V3-Fristen über alle Standorte führen lassen.",
  },
  {
    slug: "dguv-v3-pruefung-selber-machen",
    keyword: "dguv v3 prüfung selber machen",
    secondary: ["dguv v3 prüfung selbst durchführen", "elektrotechnisch unterwiesene person", "dguv v3 eigenprüfung", "elektrofachkraft für festgelegte tätigkeiten"],
    cluster: "Elektro",
    title: "DGUV V3 Prüfung selber machen: Wann es zulässig ist",
    description:
      "DGUV V3 Prüfung selber machen: Wann eigene Mitarbeiter prüfen dürfen, welche Qualifikation und Messgeräte nötig sind und wann sich die Eigenprüfung lohnt.",
    h1: "DGUV V3 Prüfung selber machen: Voraussetzungen, Grenzen und Wirtschaftlichkeit",
    kicker: "ELEKTRO",
    teaser: "Wann eigene Beschäftigte prüfen dürfen, was sie brauchen und wann sich die Eigenprüfung rechnet.",
    areas: ["dguv-v3-pruefung"],
    published,
    modified: published,
    lead: [
      "Die DGUV V3 Prüfung darf mit eigenem Personal durchgeführt werden. Ortsfeste Anlagen prüft eine Elektrofachkraft. Für ortsveränderliche Geräte darf nach den Durchführungsanweisungen zu § 5 DGUV Vorschrift 3 auch eine elektrotechnisch unterwiesene Person die Verantwortung für die Prüfung übernehmen, wenn sie geeignete Mess- und Prüfgeräte verwendet; die Unterweisung erfolgt durch eine Elektrofachkraft.",
    ],
    blocks: [
      { type: "h2", text: "Wer prüfen darf", id: "wer" },
      {
        type: "table",
        head: ["Person", "Darf prüfen", "Voraussetzung", "Fundstelle"],
        rows: [
          ["Elektrofachkraft", "ortsfeste Anlagen und ortsveränderliche Geräte", "fachliche Ausbildung, Kenntnisse und Erfahrungen, Kenntnis der Normen; kann Gefahren erkennen", "§ 2 Abs. 3 DGUV Vorschrift 3"],
          ["Elektrotechnisch unterwiesene Person", "ortsveränderliche Geräte; ortsfeste Anlagen nur unter Leitung und Aufsicht einer Elektrofachkraft", "Unterweisung durch eine Elektrofachkraft, geeignete Mess- und Prüfgeräte", "DGUV V3, DA zu § 5 Abs. 1 Nr. 2, Tabelle 1B"],
          ["Zur Prüfung befähigte Person", "Arbeitsmittel im Sinne der BetrSichV", "Berufsausbildung, Berufserfahrung, zeitnahe berufliche Tätigkeit", "§ 2 Abs. 6 BetrSichV, TRBS 1203"],
          ["Laie ohne Unterweisung", "nicht zulässig", "–", "§ 3 Abs. 1 DGUV Vorschrift 3"],
        ],
      },
      {
        type: "definition",
        term: "Elektrotechnisch unterwiesene Person (EuP)",
        text: "Eine Person, die durch eine Elektrofachkraft über die ihr übertragenen Aufgaben und die möglichen Gefahren bei unsachgemäßem Verhalten unterrichtet und erforderlichenfalls angelernt sowie über die notwendigen Schutzeinrichtungen und Schutzmaßnahmen belehrt wurde. Der Begriff stammt aus DIN VDE 0105-100; die DGUV Vorschrift 3 verwendet ihn in den Durchführungsanweisungen zu §§ 3 und 5.",
      },
      {
        type: "p",
        text: "Eine Zwischenstufe ist die **Elektrofachkraft für festgelegte Tätigkeiten**: Beschäftigte ohne elektrotechnische Berufsausbildung können durch eine Ausbildung in Theorie und Praxis für gleichartige, sich wiederholende Arbeiten qualifiziert werden, die der Unternehmer in einer Arbeitsanweisung beschreibt (Durchführungsanweisungen zu § 2 Abs. 3 DGUV Vorschrift 3). Die Qualifikation deckt nur diese festgelegten Tätigkeiten ab.",
      },
      {
        type: "p",
        text: "Nach § 3 Abs. 1 DGUV Vorschrift 3 dürfen elektrische Anlagen und Betriebsmittel nur von einer Elektrofachkraft oder unter Leitung und Aufsicht einer Elektrofachkraft errichtet, geändert und instand gehalten werden. Für die Organisation des Elektrobereichs im Unternehmen beschreibt DIN VDE 1000-10 zusätzlich die Rolle einer verantwortlichen Elektrofachkraft, die die Fachverantwortung trägt.",
      },
      {
        type: "note",
        text: "Spannungsfeld: Die Betriebssicherheitsverordnung verlangt für Prüfungen eine zur Prüfung befähigte Person (§ 2 Abs. 6 BetrSichV). Die TRBS 1203 setzt für Prüfungen zum Schutz vor elektrischen Gefährdungen grundsätzlich eine elektrotechnische Berufsausbildung voraus. Ob eine elektrotechnisch unterwiesene Person allein diese Anforderung erfüllt, wird deshalb unterschiedlich bewertet. Auf der sicheren Seite sind Sie, wenn unterwiesene Personen unter Leitung und Aufsicht einer Elektrofachkraft prüfen.",
      },
      { type: "h2", text: "Was für die Eigenprüfung gebraucht wird", id: "voraussetzungen" },
      {
        type: "checklist",
        items: [
          "Eine bestellte Elektrofachkraft, die Leitung und Aufsicht tatsächlich wahrnimmt – nicht nur auf dem Papier",
          "Schriftlich unterwiesene Prüfer mit dokumentierter Unterweisung",
          "Ein für die Prüfung nach DIN EN 50699 (VDE 0702) geeignetes Prüfgerät mit regelmäßiger Kalibrierung",
          "Eine Geräteliste mit eindeutiger Kennzeichnung je Gerät",
          "Ein Protokollformat, das die Anforderungen von § 14 Abs. 7 BetrSichV erfüllt",
          "Ein Verfahren für Mängel: Gerät sperren, kennzeichnen, Instandsetzung oder Aussonderung",
        ],
      },
      { type: "h2", text: "Ablauf einer Geräteprüfung", id: "ablauf" },
      {
        type: "steps",
        items: [
          "**Sichtprüfung:** Gehäuse, Stecker, Leitung, Knickschutz, Zugentlastung, Typschild und Aufschriften.",
          "**Messungen** nach Schutzklasse mit dem Prüfgerät, etwa Schutzleiterwiderstand bei Geräten der Schutzklasse I, Isolationswiderstand sowie Schutzleiter- oder Berührungsstrom.",
          "**Funktionsprüfung** des Geräts.",
          "**Bewertung und Dokumentation:** bestanden oder nicht bestanden, Messwerte, Prüfer, Prüfgerät, Datum.",
          "**Kennzeichnung** mit Prüfplakette und nächstem Termin; mängelbehaftete Geräte sperren.",
        ],
      },
      {
        type: "note",
        text: "Grenzwerte und Messverfahren stehen in der kostenpflichtigen Norm DIN EN 50699 (VDE 0702) und werden hier deshalb nicht wiedergegeben. Ein Gerät, das nach einer Reparatur wieder in Betrieb geht, wird nach DIN EN 50678 (VDE 0701) geprüft.",
      },
      { type: "h2", text: "Wann sich die Eigenprüfung rechnet", id: "wirtschaftlichkeit" },
      {
        type: "table",
        head: ["Faktor", "Eher Eigenprüfung", "Eher externer Prüfdienst"],
        rows: [
          ["Bestand", "mehrere hundert Geräte an einem Standort", "kleine Bestände an vielen Standorten"],
          ["Personal", "Elektrofachkraft im Haus, z. B. in der Haustechnik", "keine Elektrofachkraft"],
          ["Auslastung", "Prüfungen lassen sich in ruhige Zeiten legen", "Prüfungen konkurrieren mit dem Tagesgeschäft"],
          ["Ortsfeste Anlagen", "Elektrofachkraft prüft mit", "externer Elektrobetrieb ohnehin beauftragt"],
        ],
      },
      {
        type: "p",
        text: "Zur Eigenprüfung gehören Prüfgerät und Kalibrierung, die Unterweisung der Prüfer, ihre Arbeitszeit und die Zeit der Elektrofachkraft für Leitung und Aufsicht. Dem stehen die Kosten eines externen Prüfdienstes gegenüber – Preisspannen unter [DGUV V3 Prüfung Kosten](/dguv-v3-pruefung-kosten). Bei vielen kleinen Standorten fallen für die Eigenprüfung dieselben Fahrten an wie für einen Dienstleister.",
      },
      {
        type: "example",
        title: "Kreisverwaltung mit Haustechnik",
        text: [
          "Die Haustechnik beschäftigt zwei Elektriker mit Gesellenbrief. Im Verwaltungsgebäude stehen rund 900 Geräte, in den 24 Außenstellen jeweils 20 bis 60.",
          "Ergebnis der Abwägung: Das Verwaltungsgebäude prüft die Haustechnik selbst – ein Elektriker ist als Elektrofachkraft bestellt, zwei Hausmeister sind als elektrotechnisch unterwiesene Personen geschult. Die Außenstellen werden in Losen an einen externen Prüfdienst vergeben. Beide Ergebnisse laufen in einem gemeinsamen Fristenplan zusammen.",
        ],
      },
      { type: "h2", text: "Risiken der Eigenprüfung", id: "risiken" },
      {
        type: "p",
        text: "Das häufigste Problem ist nicht die Messung, sondern die Organisation: Die Elektrofachkraft ist nur formal bestellt, Unterweisungen sind nicht dokumentiert, das Prüfgerät ist nicht kalibriert oder Protokolle lassen sich keiner Geräteliste zuordnen. Im Schadensfall zählt, ob die Eigenprüfung die Anforderungen an Qualifikation und Dokumentation erfüllt hat. Wer haftet, wenn das nicht der Fall ist, beschreibt der Artikel [Haftung bei fehlenden Prüfungen](/wissen/haftung-fehlende-pruefungen).",
      },
      { type: "h2", text: "Eigen- und Fremdprüfung kombinieren", id: "kombination" },
      {
        type: "p",
        text: "In vielen Organisationen ist die beste Lösung keine Entweder-oder-Entscheidung. Große, gut erreichbare Standorte prüft eigenes Personal, kleine und entfernte Standorte ein externer Prüfdienst. Wichtig ist, dass beide Ergebnisse im selben Format in einer Ablage zusammenlaufen und dieselben Fristen gelten. Sonst entstehen zwei Parallelwelten mit unterschiedlichen Gerätelisten.",
      },
      {
        type: "table",
        caption: "Aufgabenteilung bei kombinierter Prüfung",
        head: ["Aufgabe", "Eigenes Personal", "Externer Prüfdienst"],
        rows: [
          ["Geräteliste pflegen", "ja, zentral für alle Standorte", "liefert Änderungen zurück"],
          ["Prüfung ortsveränderlicher Geräte", "Hauptstandorte", "Außenstellen"],
          ["Prüfung ortsfester Anlagen", "nur mit eigener Elektrofachkraft", "übrige Standorte"],
          ["Protokolle", "einheitliches Format", "vertraglich gleiches Format"],
          ["Fehlerquote auswerten", "zentral je Gerätegruppe", "–"],
        ],
      },
      { type: "h2", text: "Häufige Fehler bei der Eigenprüfung", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Prüfgerät gekauft, aber nie kalibrieren lassen",
          "Unterweisung einmalig durchgeführt und nicht dokumentiert",
          "Geräte nur mit „i. O.“ protokolliert, ohne Messwerte",
          "Mängelgeräte weiterbenutzt, weil keine Sperrregel existiert",
        ],
      },
      { type: "h2", text: "Vor dem Start: fünf Entscheidungen", id: "entscheidungen" },
      {
        type: "steps",
        items: [
          "**Umfang:** Nur ortsveränderliche Geräte oder auch ortsfeste Anlagen? Für Anlagen ist eine Elektrofachkraft nötig.",
          "**Personal:** Wer prüft, wer unterweist, wer trägt die Fachverantwortung – und wie viel Arbeitszeit steht zur Verfügung?",
          "**Technik:** Welches Prüfgerät, welche Software für Protokolle, wie wird kalibriert?",
          "**Organisation:** Wer pflegt die Geräteliste, wer überwacht die Fristen, wer verfolgt Mängel?",
          "**Absicherung:** Ist die Eigenprüfung in der Gefährdungsbeurteilung beschrieben und von der Leitung freigegeben?",
        ],
      },
      {
        type: "p",
        text: "Wer diese Fragen schriftlich beantwortet, hat zugleich die Grundlage für den Nachweis gegenüber Berufsgenossenschaft und Versicherer. Eine Eigenprüfung ohne diese Grundlage ist im Ernstfall schwer zu verteidigen, auch wenn die Messungen korrekt waren.",
      },
    ],
    faqs: [
      [
        "Darf man die DGUV V3 Prüfung selbst durchführen?",
        "Ja. Ortsfeste Anlagen prüft eine Elektrofachkraft. Ortsveränderliche Geräte darf nach den Durchführungsanweisungen zu § 5 DGUV Vorschrift 3 auch eine von einer Elektrofachkraft unterwiesene Person mit geeigneten Mess- und Prüfgeräten prüfen. Wegen der Anforderungen der TRBS 1203 ist die Prüfung unter Leitung und Aufsicht einer Elektrofachkraft die sichere Variante.",
      ],
      [
        "Reicht eine Schulung zur Prüfung ortsveränderlicher Geräte aus?",
        "Eine Schulung kann die Unterweisung zur elektrotechnisch unterwiesenen Person sein, wenn sie durch eine Elektrofachkraft erfolgt. Hinzu kommen geeignete Mess- und Prüfgeräte. Wegen der Anforderungen der TRBS 1203 empfiehlt sich zusätzlich die Leitung und Aufsicht durch eine Elektrofachkraft.",
      ],
      [
        "Wer darf ortsfeste elektrische Anlagen prüfen?",
        "Eine Elektrofachkraft. Für ortsfeste Anlagen reicht die Unterweisung nicht aus.",
      ],
      [
        "Lohnt sich die Eigenprüfung?",
        "Eher bei großen, räumlich konzentrierten Beständen mit eigener Elektrofachkraft. Bei vielen kleinen Standorten ist ein externer Prüfdienst meist wirtschaftlicher.",
      ],
      [
        "Was braucht man an Ausstattung für die Eigenprüfung?",
        "Ein für die Prüfung nach DIN EN 50699 (VDE 0702) geeignetes und kalibriertes Prüfgerät, Prüfplaketten, eine Geräteliste und ein Protokollformat, das die Anforderungen von § 14 Abs. 7 BetrSichV erfüllt.",
      ],
    ],
    sources: [
      ["DGUV V3", "§ 2 Abs. 3, § 3 Abs. 1, § 5; Durchführungsanweisungen zu § 2 Abs. 3, § 3 Abs. 1, § 5"],
      ["DIN VDE 0105-100", "Begriff elektrotechnisch unterwiesene Person"],
      ["BetrSichV", "§ 2 Abs. 6, § 14 Abs. 7"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["DIN VDE 1000-10", "Verantwortliche Elektrofachkraft"],
      ["DIN EN 50699", "Wiederholungsprüfung elektrischer Geräte"],
      ["DIN EN 50678", "Prüfung nach Reparatur"],
    ],
    related: [
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Pflicht, Fristen, Organisation"],
      ["Befähigte Person nach TRBS 1203", "/wissen/befaehigte-person-trbs-1203", "Qualifikation der Prüfer"],
      ["DGUV V3 Prüfprotokoll", "/wissen/dguv-v3-pruefprotokoll", "Was dokumentiert werden muss"],
    ],
    cta: "Eigen- und Fremdprüfung in einem Plan zusammenführen.",
  },
  {
    slug: "dguv-v3-ortsveraenderliche-geraete",
    keyword: "dguv v3 ortsveränderliche geräte",
    secondary: ["ortsveränderliche elektrische betriebsmittel", "prüfung ortsveränderlicher geräte", "ortsfest ortsveränderlich unterschied", "din en 50699"],
    cluster: "Elektro",
    title: "Ortsveränderliche Geräte nach DGUV V3: Prüfung, Fristen",
    description:
      "Ortsveränderliche Geräte nach DGUV V3: was dazugehört, Abgrenzung zu ortsfesten Betriebsmitteln, Prüffristen nach Tabelle 1B, Prüfablauf und Organisation.",
    h1: "Ortsveränderliche Geräte nach DGUV V3: Abgrenzung, Fristen und Prüfung",
    kicker: "ELEKTRO",
    teaser: "Was als ortsveränderlich gilt, welche Fristen gelten und wie die Prüfung abläuft.",
    areas: ["dguv-v3-pruefung"],
    published,
    modified: published,
    lead: [
      "Ortsveränderliche elektrische Betriebsmittel sind Geräte, die während des Betriebs bewegt werden oder sich leicht von einem Platz zum anderen bringen lassen, während sie an den Stromkreis angeschlossen sind – etwa Wasserkocher, Bürotechnik, Verlängerungsleitungen und Handwerkzeuge. Für sie nennt Tabelle 1B der Durchführungsanweisungen zur DGUV Vorschrift 3 einen Richtwert von sechs Monaten, der bei belegter Fehlerquote unter 2 Prozent auf ein bzw. zwei Jahre verlängert werden kann.",
    ],
    blocks: [
      { type: "h2", text: "Ortsveränderlich oder ortsfest?", id: "abgrenzung" },
      {
        type: "table",
        caption: "Abgrenzung nach den Durchführungsanweisungen zu § 5 DGUV Vorschrift 3",
        head: ["Gruppe", "Merkmal", "Beispiele", "Prüfung nach"],
        rows: [
          ["Ortsveränderliche Betriebsmittel", "werden im Betrieb bewegt oder lassen sich leicht umsetzen", "Wasserkocher, Monitore, Drucker, Verlängerungen, Mehrfachsteckdosen, Bohrmaschinen", "DIN EN 50699 (VDE 0702)"],
          ["Ortsfeste Betriebsmittel", "fest angebracht oder ohne Tragevorrichtung zu schwer zum Umsetzen", "Durchlauferhitzer, Standbohrmaschine, Großküchengerät", "DIN VDE 0105-100"],
          ["Elektrische Anlagen", "Verteilungen, Leitungsnetz, Schutzmaßnahmen", "Unterverteilung, Steckdosenstromkreise", "DIN VDE 0105-100"],
        ],
      },
      {
        type: "p",
        text: "Die Zuordnung entscheidet über Frist, Prüfer und Prüfverfahren. Grenzfälle sind schwere Geräte mit Rollen oder Geräte, die zwar fest stehen, aber regelmäßig zum Reinigen abgesteckt werden. Halten Sie die Zuordnung in der Geräteliste fest, damit Prüfdienst und Gefährdungsbeurteilung dieselbe Grundlage haben.",
      },
      { type: "h2", text: "Wer verpflichtet ist", id: "pflicht" },
      {
        type: "p",
        text: "Der Arbeitgeber für alle Geräte, die seine Beschäftigten bei der Arbeit nutzen – auch für mitgebrachte private Geräte, wenn er deren Nutzung duldet. In Mietobjekten prüft der Mieter als Arbeitgeber seine eigenen Geräte; der Vermieter ist für die Gebäudeinstallation zuständig. In Schulen sind Geräte, die Lehrkräfte mitbringen, eine häufige Lücke.",
      },
      { type: "h2", text: "Wie oft geprüft wird", id: "fristen" },
      {
        type: "table",
        caption: "Tabelle 1B der Durchführungsanweisungen zu § 5 DGUV Vorschrift 3 (Richtwerte)",
        head: ["Einsatz", "Richtwert", "Maximum bei Fehlerquote unter 2 %"],
        rows: [
          ["allgemein", "6 Monate", "–"],
          ["Baustellen", "3 Monate", "1 Jahr"],
          ["Werkstätten, Fertigungsstätten", "6 Monate", "1 Jahr"],
          ["Büros und ähnliche Bedingungen", "6 Monate", "2 Jahre"],
        ],
      },
      {
        type: "p",
        text: "Die Richtwerte gelten für Geräte, Verlängerungs- und Geräteanschlussleitungen mit Steckvorrichtungen sowie Anschlussleitungen mit Stecker. Wie die Frist begründet und über die Fehlerquote verlängert wird, beschreibt der Artikel [DGUV V3 Prüfung: wie oft](/wissen/dguv-v3-pruefung-wie-oft).",
      },
      { type: "h2", text: "Wer prüfen darf", id: "pruefer" },
      {
        type: "p",
        text: "Die Verantwortung liegt bei einer Elektrofachkraft. Ortsveränderliche Geräte dürfen auch elektrotechnisch unterwiesene Personen prüfen, wenn sie geeignete Mess- und Prüfgeräte verwenden und unter Leitung und Aufsicht einer Elektrofachkraft arbeiten. Unter welchen Bedingungen sich das intern lohnt: [DGUV V3 Prüfung selber machen](/wissen/dguv-v3-pruefung-selber-machen).",
      },
      { type: "h2", text: "So läuft die Prüfung ab", id: "ablauf" },
      {
        type: "steps",
        items: [
          "Sichtprüfung auf Beschädigungen an Gehäuse, Leitung und Stecker.",
          "Messungen je nach Schutzklasse, etwa Schutzleiterwiderstand, Isolationswiderstand und Schutzleiter- bzw. Berührungsstrom.",
          "Funktionsprüfung.",
          "Dokumentation mit Messwerten, Bewertung, Prüfer und Prüfgerät.",
          "Kennzeichnung mit Prüfplakette; Geräte mit Mängeln sperren und aussondern oder instand setzen.",
        ],
      },
      {
        type: "definition",
        term: "Schutzklassen",
        text: "Schutzklasse I: Gerät mit Schutzleiteranschluss, meist Metallgehäuse. Schutzklasse II: schutzisoliert, ohne Schutzleiter. Schutzklasse III: Betrieb mit Schutzkleinspannung. Die Schutzklasse bestimmt, welche Messungen erforderlich sind.",
      },
      { type: "h2", text: "Was die Prüfung kostet", id: "kosten" },
      {
        type: "p",
        text: "Nach veröffentlichten Anbieterangaben (Stand Oktober 2026) liegen ortsveränderliche Geräte bei rund 3 bis 8 Euro netto je Stück, bei großen Stückzahlen darunter, zuzüglich Anfahrt. Quellen und Rechenbeispiel: [DGUV V3 Prüfung Kosten](/dguv-v3-pruefung-kosten).",
      },
      {
        type: "checklist",
        items: [
          "Geräteliste je Raum mit Inventarnummer, Geräteart, Schutzklasse und letztem Prüfdatum",
          "Defekte und ausgemusterte Geräte vor dem Termin aussortieren",
          "Zugang zu allen Räumen sicherstellen, Ansprechpartner vor Ort benennen",
          "Private Geräte entweder aufnehmen oder ihre Nutzung untersagen",
          "Mehrfachsteckdosen und Verlängerungen nicht vergessen – sie sind häufig die Geräte mit Mängeln",
        ],
      },
      {
        type: "example",
        title: "Schulträger mit elf Schulen",
        text: [
          "In den Lehrerzimmern, Fachräumen und Schulküchen stehen rund 2.300 ortsveränderliche Geräte, dazu Geräte von Lehrkräften. Die Prüfungen fanden bisher je Schule zu unterschiedlichen Zeitpunkten statt.",
          "Neu: Alle Schulen werden in den Sommerferien geprüft, private Geräte werden registriert und mitgeprüft oder untersagt. Die Frist beträgt einheitlich zwölf Monate, weil wechselnde Nutzer und mitgebrachte Geräte eine Verlängerung nicht tragen.",
        ],
      },
      { type: "h2", text: "Folgen fehlender Prüfungen", id: "folgen" },
      {
        type: "p",
        text: "Defekte Verlängerungen und Mehrfachsteckdosen sind eine häufige Brandursache in Büros und Werkstätten. Fehlt der Prüfnachweis, ist das eine Ordnungswidrigkeit nach § 9 DGUV Vorschrift 3 in Verbindung mit § 209 SGB VII; im Schadensfall prüfen Versicherer und Unfallversicherungsträger, ob ordnungsgemäß geprüft wurde.",
      },
      { type: "h2", text: "Grenzfälle in der Praxis", id: "grenzfaelle" },
      {
        type: "table",
        caption: "Typische Zuordnungsfragen und eine nachvollziehbare Entscheidung",
        head: ["Gerät", "Zuordnung", "Begründung"],
        rows: [
          ["Kühlschrank in der Teeküche", "ortsveränderlich", "mit Stecker angeschlossen und ohne Werkzeug umsetzbar"],
          ["Kopierer auf Rollen", "ortsveränderlich", "wird zum Reinigen und bei Umzügen bewegt"],
          ["Großküchenherd mit Festanschluss", "ortsfest", "fest angeschlossen, ohne Tragevorrichtung zu schwer"],
          ["Server-Rack mit Steckdosenleiste", "Rack ortsfest, Steckdosenleisten ortsveränderlich", "Steckdosenleisten werden umgesteckt"],
          ["Pflegebett, elektrisch verstellbar", "ortsveränderlich; zusätzlich Medizinprodukt", "wird bewegt; Herstellervorgaben und MPBetreibV beachten"],
        ],
      },
      {
        type: "p",
        text: "Die Zuordnung sollte einmal begründet und in der Geräteliste festgehalten werden. Wechselt der Prüfdienst, bleibt die Entscheidung nachvollziehbar und die Fristen ändern sich nicht zufällig.",
      },
      { type: "h2", text: "Geräte über mehrere Standorte erfassen", id: "erfassung" },
      {
        type: "steps",
        items: [
          "Je Standort eine Begehung mit Raumliste; jedes Gerät erhält eine eindeutige Nummer.",
          "Geräteart, Schutzklasse und Einsatzbereich erfassen – sie bestimmen Prüfschritte und Frist.",
          "Private und mitgebrachte Geräte gesondert markieren und eine Regel festlegen.",
          "Nach jeder Prüfung Zu- und Abgänge in der zentralen Liste nachtragen.",
          "Fehlerquote je Standort und Gerätegruppe auswerten, Fristen jährlich überprüfen.",
        ],
      },
      { type: "h2", text: "Häufige Mängel bei ortsveränderlichen Geräten", id: "maengel" },
      {
        type: "checklist",
        items: [
          "Beschädigte oder gequetschte Anschlussleitungen",
          "Defekte Knickschutztüllen und gelöste Zugentlastungen",
          "Hintereinandergesteckte Mehrfachsteckdosen",
          "Geräte ohne lesbares Typschild",
          "Selbst reparierte Stecker",
        ],
      },
      { type: "h2", text: "Prüfung nach Reparatur und bei Neugeräten", id: "reparatur" },
      {
        type: "p",
        text: "Zwei Anlässe außerhalb der Wiederholungsprüfung werden oft übersehen. Nach einer Instandsetzung ist ein Gerät vor der Wiederinbetriebnahme zu prüfen (§ 5 Abs. 1 Nr. 1 DGUV Vorschrift 3); maßgeblich ist DIN EN 50678 (VDE 0701). Neugeräte müssen dagegen nicht vor der ersten Nutzung geprüft werden, wenn der Hersteller bestätigt, dass sie den elektrotechnischen Regeln entsprechen (§ 5 Abs. 4). Sie werden aber ab Inbetriebnahme in die Geräteliste und den Prüfzyklus aufgenommen – sonst fehlen sie bei der nächsten Prüfrunde.",
      },
      {
        type: "table",
        head: ["Anlass", "Prüfung", "Fundstelle"],
        rows: [
          ["Neugerät mit Herstellerbestätigung", "keine Erstprüfung, Aufnahme in Geräteliste", "§ 5 Abs. 4 DGUV Vorschrift 3"],
          ["Nach Reparatur", "vor Wiederinbetriebnahme", "§ 5 Abs. 1 Nr. 1 DGUV Vorschrift 3; DIN EN 50678"],
          ["Wiederholungsprüfung", "nach festgelegter Frist", "§ 5 Abs. 1 Nr. 2; DIN EN 50699"],
        ],
      },
      { type: "h2", text: "Sonderfall Schulen, Kitas und Pflege", id: "sonderfaelle" },
      {
        type: "p",
        text: "In Schulen und Kitas sind wechselnde Nutzer und mitgebrachte Geräte die Regel – von der Kaffeemaschine im Lehrerzimmer bis zum Laminiergerät der Erzieherin. Für Kommunen gilt die DGUV Vorschrift 4, inhaltlich gleich mit der DGUV Vorschrift 3. In Pflegeeinrichtungen kommen elektrisch verstellbare Betten, Lifter und Absauggeräte hinzu, die zugleich Medizinprodukte sind; hier sind neben der Elektroprüfung die Herstellervorgaben und die Medizinprodukte-Betreiberverordnung zu beachten. In beiden Fällen ist eine klare Regel für private Geräte und eine vollständige Geräteliste wichtiger als die Wahl zwischen sechs und zwölf Monaten Prüffrist. Wie Kommunen das für alle Liegenschaften organisieren, beschreibt die Seite [Betreiberpflichten Kommunen](/betreiberpflichten/kommunen).",
      },
    ],
    faqs: [
      [
        "Was sind ortsveränderliche Geräte nach DGUV V3?",
        "Elektrische Betriebsmittel, die während des Betriebs bewegt werden oder sich leicht umsetzen lassen, während sie angeschlossen sind – etwa Wasserkocher, Bürogeräte, Verlängerungen und Handwerkzeuge.",
      ],
      [
        "Wie oft müssen ortsveränderliche Geräte geprüft werden?",
        "Der Richtwert nach Tabelle 1B beträgt sechs Monate, auf Baustellen drei Monate. Bei belegter Fehlerquote unter 2 Prozent sind höchstens ein Jahr in Werkstätten und zwei Jahre in Büros möglich.",
      ],
      [
        "Nach welcher Norm werden ortsveränderliche Geräte geprüft?",
        "Die Wiederholungsprüfung erfolgt nach DIN EN 50699 (VDE 0702), die Prüfung nach einer Reparatur nach DIN EN 50678 (VDE 0701).",
      ],
      [
        "Müssen private Geräte von Beschäftigten geprüft werden?",
        "Wenn der Arbeitgeber ihre Nutzung im Betrieb duldet, ja. Alternativ kann er die Nutzung privater Geräte untersagen.",
      ],
      [
        "Zählen Verlängerungskabel und Mehrfachsteckdosen als ortsveränderliche Geräte?",
        "Ja. Verlängerungs- und Geräteanschlussleitungen mit Steckvorrichtungen nennt Tabelle 1B der Durchführungsanweisungen ausdrücklich. Sie sind häufig die Geräte mit den meisten Mängeln.",
      ],
    ],
    sources: [
      ["DGUV V3", "§ 5, § 9; Durchführungsanweisungen zu § 5 (Begriffe, Tabelle 1B)"],
      ["BetrSichV", "§ 3 Abs. 6, § 14 Abs. 7"],
      ["DIN EN 50699", "Wiederholungsprüfung elektrischer Geräte"],
      ["DIN EN 50678", "Prüfung nach Reparatur"],
      ["DIN VDE 0105-100", "Prüfung ortsfester Anlagen und Betriebsmittel"],
      ["SGB VII", "§ 209"],
    ],
    related: [
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Pflicht und Organisation"],
      ["DGUV V3 Prüfung: wie oft", "/wissen/dguv-v3-pruefung-wie-oft", "Fristen und Fehlerquote"],
      ["DGUV V3 Prüfung Kosten", "/dguv-v3-pruefung-kosten", "Preise je Gerät"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Schulen und Verwaltung"],
    ],
    cta: "Geräteprüfung an allen Standorten koordinieren.",
  },
  {
    slug: "dguv-v3-pruefprotokoll",
    keyword: "dguv v3 prüfprotokoll",
    secondary: ["prüfprotokoll elektroprüfung", "dguv v3 dokumentation", "prüfprotokoll aufbewahrung", "prüfbuch dguv v3"],
    cluster: "Elektro",
    title: "DGUV V3 Prüfprotokoll: Pflichtangaben und Aufbewahrung",
    description:
      "DGUV V3 Prüfprotokoll: welche Angaben § 14 Abs. 7 BetrSichV verlangt, wie lange es aufzubewahren ist, elektronische Form, Prüfbuch und typische Fehler.",
    h1: "DGUV V3 Prüfprotokoll: was drinstehen muss und wie lange es aufbewahrt wird",
    kicker: "ELEKTRO",
    teaser: "Pflichtangaben, Aufbewahrung, elektronische Form – und woran Protokolle im Ernstfall scheitern.",
    areas: ["dguv-v3-pruefung"],
    published,
    modified: published,
    lead: [
      "Ein DGUV V3 Prüfprotokoll muss nach § 14 Abs. 7 BetrSichV mindestens Art der Prüfung, Prüfumfang, Ergebnis und Name und Unterschrift der prüfenden Person enthalten und mindestens bis zur nächsten Prüfung aufbewahrt werden. Elektronische Protokolle sind zulässig; bei ausschließlich elektronisch übermittelten Dokumenten ist eine elektronische Signatur erforderlich.",
    ],
    blocks: [
      { type: "h2", text: "Pflichtangaben nach BetrSichV", id: "pflichtangaben" },
      {
        type: "table",
        caption: "Mindestinhalt nach § 14 Abs. 7 BetrSichV",
        head: ["Angabe", "Bedeutung", "Beispiel"],
        rows: [
          ["Art der Prüfung", "Erstprüfung, Wiederholungsprüfung, Prüfung nach Instandsetzung", "Wiederholungsprüfung nach DIN EN 50699"],
          ["Prüfumfang", "Was wurde geprüft, mit welchen Prüfschritten", "Sichtprüfung, Schutzleiterwiderstand, Isolationswiderstand, Funktion"],
          ["Ergebnis", "bestanden oder nicht bestanden, festgestellte Mängel", "nicht bestanden – Leitung beschädigt"],
          ["Name und Unterschrift der befähigten Person", "bei elektronisch übermittelten Dokumenten elektronische Signatur", "Max Muster, Elektrofachkraft"],
        ],
      },
      {
        type: "p",
        text: "Das ist das gesetzliche Minimum. Damit ein Protokoll im Alltag und im Schadensfall trägt, gehören weitere Angaben dazu: eindeutige Geräte-ID und Standort, Messwerte, Prüfgerät mit Seriennummer und Kalibrierdatum, Prüfdatum und nächster Prüftermin.",
      },
      { type: "h2", text: "Wie lange das Protokoll aufbewahrt wird", id: "aufbewahrung" },
      {
        type: "p",
        text: "§ 14 Abs. 7 BetrSichV verlangt die Aufbewahrung mindestens bis zur nächsten Prüfung. In der Praxis empfiehlt es sich, Protokolle länger aufzubewahren: Erst mehrere Prüfzyklen zeigen die Fehlerquote, mit der sich eine längere Frist begründen lässt, und im Schadensfall wird nach der Prüfhistorie gefragt. Die Aufzeichnungen dürfen elektronisch geführt werden.",
      },
      {
        type: "definition",
        term: "Prüfbuch",
        text: "Nach § 5 Abs. 3 DGUV Vorschrift 3 ist auf Verlangen der Berufsgenossenschaft ein Prüfbuch mit bestimmten Eintragungen zu führen. Ohne ein solches Verlangen genügen Protokolle, die die Anforderungen der BetrSichV erfüllen.",
      },
      { type: "h2", text: "Wer das Protokoll erstellt und verantwortet", id: "wer" },
      {
        type: "p",
        text: "Das Protokoll erstellt die prüfende Elektrofachkraft bzw. befähigte Person. Verantwortlich dafür, dass es vorliegt und aufbewahrt wird, ist der Arbeitgeber (§ 14 Abs. 7 Satz 1 BetrSichV: „Der Arbeitgeber hat dafür zu sorgen …“). Bei externen Prüfdiensten sollte vertraglich geregelt sein, in welchem Format und innerhalb welcher Frist die Protokolle geliefert werden.",
      },
      { type: "h2", text: "Typische Mängel in Prüfprotokollen", id: "maengel" },
      {
        type: "checklist",
        items: [
          "Geräte nur mit Sammelbezeichnung („20 Bürogeräte“) statt mit eindeutiger ID",
          "Kein Standort – das Gerät lässt sich später nicht zuordnen",
          "Keine Messwerte, nur „i. O.“",
          "Kein Prüfgerät oder kein Kalibriernachweis angegeben",
          "Mängel festgestellt, aber kein Vermerk zur Behebung",
          "Protokolle je Standort in unterschiedlichen Formaten, nicht auswertbar",
        ],
      },
      { type: "h2", text: "Protokolle über mehrere Standorte führen", id: "standorte" },
      {
        type: "table",
        head: ["Anforderung", "Umsetzung"],
        rows: [
          ["Einheitliches Format", "Vorgabe an alle Prüfdienste: Export als Tabelle und PDF mit identischen Feldern"],
          ["Zentrale Ablage", "eine Ablage je Standort und Anlage, nicht in Postfächern"],
          ["Auswertbarkeit", "Fehlerquote je Gerätegruppe und Standort ablesbar"],
          ["Mängelverfolgung", "jeder Mangel mit Verantwortlichem, Frist und Erledigungsvermerk"],
          ["Berichtswesen", "Statusbericht an die Leitung mit fälligen, erledigten und überfälligen Prüfungen"],
        ],
      },
      {
        type: "example",
        title: "Klinikum mit Außenstellen",
        text: [
          "Drei Prüfdienste lieferten Protokolle als PDF-Scans, als Excel-Listen und auf Papier. Bei einer Begehung ließ sich für ein Gerät, das einen Kurzschluss verursacht hatte, die letzte Prüfung nicht innerhalb eines Tages belegen.",
          "Seitdem gilt ein einheitliches Protokollformat für alle Dienstleister, die Ablage erfolgt zentral je Haus und Raum, offene Mängel werden monatlich an die Technische Leitung berichtet.",
        ],
      },
      { type: "h2", text: "Was ein fehlendes Protokoll bedeutet", id: "folgen" },
      {
        type: "p",
        text: "Eine Prüfung ohne Protokoll ist im Streitfall kaum zu belegen. Fehlende Aufzeichnungen sind ein eigener Verstoß gegen § 14 Abs. 7 BetrSichV; im Schadensfall stellt sich die Frage, ob überhaupt geprüft wurde. Mehr dazu: [Haftung bei fehlenden Prüfungen](/wissen/haftung-fehlende-pruefungen). Was Prüfdienste kosten, die vollständige Protokolle liefern: [DGUV V3 Prüfung Kosten](/dguv-v3-pruefung-kosten).",
      },
      { type: "h2", text: "Vom Protokoll zum Nachweis", id: "nachweis" },
      {
        type: "p",
        text: "Ein einzelnes Protokoll belegt eine einzelne Prüfung. Für den Nachweis gegenüber Berufsgenossenschaft, Versicherer oder Gericht zählt, dass sich für jedes Gerät die lückenlose Prüfhistorie zeigen lässt und offene Mängel nachweislich behoben wurden. Dafür müssen Protokolle drei Dinge leisten: eindeutige Zuordnung zum Gerät, Vergleichbarkeit über Prüfzyklen hinweg und eine Verbindung zur Mängelverfolgung.",
      },
      {
        type: "table",
        caption: "Empfohlene Felder über das gesetzliche Minimum hinaus",
        head: ["Feld", "Nutzen"],
        rows: [
          ["Geräte-ID und Inventarnummer", "Zuordnung über Jahre und Prüfdienste hinweg"],
          ["Standort, Gebäude, Raum", "Gerät wird beim nächsten Termin gefunden"],
          ["Geräteart und Schutzklasse", "bestimmt Prüfschritte und Grenzwerte"],
          ["Messwerte je Prüfschritt", "Veränderungen über die Zeit erkennbar"],
          ["Prüfgerät mit Seriennummer und Kalibrierdatum", "Nachweis geeigneter Messtechnik"],
          ["Mangelbeschreibung und Maßnahme", "Grundlage der Mängelverfolgung"],
          ["Nächster Prüftermin", "Fristenüberwachung"],
        ],
      },
      { type: "h2", text: "Mängel aus dem Protokoll verfolgen", id: "maengelverfolgung" },
      {
        type: "steps",
        items: [
          "Gerät mit Mangel sofort kennzeichnen und sperren; bei dringender Gefahr darf es nicht weiter verwendet werden (§ 3 Abs. 2 DGUV Vorschrift 3).",
          "Mangel mit Verantwortlichem und Frist in einer zentralen Liste erfassen.",
          "Instandsetzung beauftragen oder Gerät aussondern.",
          "Nach Instandsetzung Prüfung nach DIN EN 50678 (VDE 0701) und Protokoll ergänzen.",
          "Erledigung in der Mängelliste vermerken.",
        ],
      },
      { type: "h2", text: "Was Sie von Prüfdiensten verlangen sollten", id: "dienstleister" },
      {
        type: "checklist",
        items: [
          "Protokoll je Gerät mit den oben genannten Feldern",
          "Lieferung als auswertbare Tabelle und als PDF innerhalb einer vereinbarten Frist",
          "Name und Qualifikation des Prüfers, nicht nur Firmenname",
          "Gesonderte Mängelliste je Standort",
          "Übernahme der bestehenden Geräte-IDs statt neuer Nummerierung",
        ],
      },
      { type: "h2", text: "Papier, Tabelle oder Software?", id: "format" },
      {
        type: "p",
        text: "Für wenige Geräte an einem Standort reichen Papierprotokolle oder eine Tabelle. Ab mehreren hundert Geräten oder mehreren Standorten stoßen beide an Grenzen: Fehlerquoten lassen sich kaum auswerten, Mängel gehen verloren und Prüfdienste liefern in unterschiedlichen Formaten. Prüfgeräte mit Datenexport oder eine zentrale Software schaffen dann Vergleichbarkeit. Entscheidend ist nicht das Werkzeug, sondern ein einheitlicher Datensatz je Gerät, der über alle Standorte und Prüfdienste gleich bleibt.",
      },
      {
        type: "checklist",
        items: [
          "Einheitliche Geräte-ID über alle Prüfdienste",
          "Export der Messwerte, nicht nur der Bewertung",
          "Zugriff auf Protokolle unabhängig vom Dienstleister",
          "Sicherung der Daten bei Wechsel des Prüfdienstes",
        ],
      },
      { type: "h2", text: "Was Prüfer und Auftraggeber vorab klären sollten", id: "vorab" },
      {
        type: "table",
        head: ["Frage", "Warum sie wichtig ist"],
        rows: [
          ["Welche Geräte-IDs werden verwendet?", "Ohne einheitliche IDs lassen sich Protokolle verschiedener Jahre nicht verknüpfen."],
          ["In welchem Format wird geliefert?", "Nur auswertbare Daten erlauben die Ermittlung der Fehlerquote."],
          ["Wie werden Mängel gemeldet?", "Gefährliche Mängel müssen sofort, nicht erst mit dem Bericht gemeldet werden."],
          ["Wer kennzeichnet gesperrte Geräte?", "Ein Gerät mit Mangel darf bei dringender Gefahr nicht weiter benutzt werden."],
          ["Bis wann liegt das Protokoll vor?", "Die Fristenüberwachung braucht das Datum der Prüfung zeitnah."],
        ],
      },
      {
        type: "p",
        text: "Diese Punkte gehören in den Vertrag mit dem Prüfdienst. Bei Organisationen mit mehreren Standorten sollten sie für alle Dienstleister gleich formuliert sein, damit die Protokolle zusammenpassen.",
      },
      {
        type: "p",
        text: "Ein Hinweis zur Aufbewahrung über mehrere Zyklen: Wer Fristen über die Fehlerquote verlängern will, braucht Protokolle aus mindestens einem vollständigen Prüfzyklus je Gerätegruppe. Werden alte Protokolle nach der Folgeprüfung vernichtet, fehlt diese Grundlage. Bewahren Sie deshalb mehrere Zyklen auf, auch wenn § 14 Abs. 7 BetrSichV nur die Aufbewahrung bis zur nächsten Prüfung verlangt – eine Begründung im Archiv kostet wenig, eine fehlende Begründung im Streitfall viel.",
      },
    ],
    faqs: [
      [
        "Was muss im DGUV V3 Prüfprotokoll stehen?",
        "Nach § 14 Abs. 7 BetrSichV mindestens Art der Prüfung, Prüfumfang, Ergebnis sowie Name und Unterschrift der befähigten Person. Sinnvoll sind zusätzlich Geräte-ID, Standort, Messwerte, Prüfgerät und nächster Termin.",
      ],
      [
        "Wie lange muss ein Prüfprotokoll aufbewahrt werden?",
        "Mindestens bis zur nächsten Prüfung (§ 14 Abs. 7 BetrSichV). Eine längere Aufbewahrung ist sinnvoll, um die Fehlerquote auszuwerten und die Prüfhistorie belegen zu können.",
      ],
      [
        "Darf das Prüfprotokoll digital geführt werden?",
        "Ja. Aufzeichnungen dürfen elektronisch aufbewahrt werden; bei ausschließlich elektronisch übermittelten Dokumenten ist eine elektronische Signatur der prüfenden Person erforderlich.",
      ],
      [
        "Ist ein Prüfbuch Pflicht?",
        "Nur auf Verlangen der Berufsgenossenschaft (§ 5 Abs. 3 DGUV Vorschrift 3). Sonst genügen Protokolle nach § 14 Abs. 7 BetrSichV.",
      ],
      [
        "Was passiert mit einem Gerät, das die Prüfung nicht besteht?",
        "Es ist zu kennzeichnen und darf bei dringender Gefahr nicht weiter verwendet werden, bis der Mangel behoben ist (§ 3 Abs. 2 DGUV Vorschrift 3). Nach einer Instandsetzung wird es nach DIN EN 50678 geprüft.",
      ],
    ],
    sources: [
      ["BetrSichV", "§ 14 Abs. 7"],
      ["DGUV V3", "§ 5 Abs. 3"],
      ["DIN EN 50699", "Dokumentation der Wiederholungsprüfung"],
      ["TRBS 1201", "Dokumentation von Prüfungen"],
    ],
    related: [
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Pflicht und Organisation"],
      ["DGUV V3 Prüfung: wie oft", "/wissen/dguv-v3-pruefung-wie-oft", "Fehlerquote auswerten"],
      ["DGUV V3 Prüfung selber machen", "/wissen/dguv-v3-pruefung-selber-machen", "Eigenprüfung"],
    ],
    cta: "Prüfprotokolle aller Standorte zentral führen lassen.",
  },
  {
    slug: "befaehigte-person-trbs-1203",
    keyword: "befähigte person trbs 1203",
    secondary: ["zur prüfung befähigte person", "befähigte person betrsichv", "sachkundiger befähigte person unterschied", "trbs 1203 anforderungen"],
    cluster: "Elektro",
    title: "Befähigte Person nach TRBS 1203: Anforderungen",
    description:
      "Befähigte Person nach § 2 Abs. 6 BetrSichV und TRBS 1203: Ausbildung, Erfahrung, zeitnahe Tätigkeit, Abgrenzung zu Sachkundigem und ZÜS.",
    h1: "Befähigte Person nach TRBS 1203: wer prüfen darf und wie Sie das nachweisen",
    kicker: "ELEKTRO · ARBEITSMITTEL",
    teaser: "Was eine zur Prüfung befähigte Person ausmacht und wie sie sich von Sachkundigen, ZÜS und Prüfsachverständigen unterscheidet.",
    areas: ["dguv-v3-pruefung"],
    published,
    modified: published,
    lead: [
      "Eine zur Prüfung befähigte Person ist nach § 2 Abs. 6 BetrSichV eine Person, die durch ihre Berufsausbildung, ihre Berufserfahrung und ihre zeitnahe berufliche Tätigkeit über die erforderlichen Kenntnisse zur Prüfung von Arbeitsmitteln verfügt. Die Technische Regel TRBS 1203 konkretisiert diese drei Anforderungen je nach Art des Arbeitsmittels und der Gefährdung.",
    ],
    blocks: [
      { type: "h2", text: "Die drei Anforderungen", id: "anforderungen" },
      {
        type: "table",
        head: ["Anforderung", "Bedeutung", "Nachweis"],
        rows: [
          ["Berufsausbildung", "abgeschlossene Ausbildung, die das fachliche Grundwissen für die Prüfaufgabe vermittelt", "Gesellen- oder Facharbeiterbrief, Studienabschluss"],
          ["Berufserfahrung", "praktische Erfahrung mit den zu prüfenden Arbeitsmitteln", "Tätigkeitsnachweise, Lebenslauf"],
          ["Zeitnahe berufliche Tätigkeit", "aktuelle Tätigkeit im Prüfbereich, Kenntnis des Stands der Technik", "laufende Prüftätigkeit, Fortbildungen"],
        ],
      },
      {
        type: "p",
        text: "Die Auswahl und Beauftragung ist Sache des Arbeitgebers. Er muss sich vergewissern, dass die Person die Anforderungen erfüllt – bei eigenen Beschäftigten ebenso wie bei externen Dienstleistern. Befähigte Personen unterliegen bei der Prüfung keinen fachlichen Weisungen des Arbeitgebers und dürfen wegen ihrer Prüftätigkeit nicht benachteiligt werden (§ 14 Abs. 6 BetrSichV).",
      },
      { type: "h2", text: "Befähigte Person, Sachkundiger, Sachverständiger: die Begriffe", id: "begriffe" },
      {
        type: "table",
        head: ["Begriff", "Herkunft", "Typische Prüfungen"],
        rows: [
          ["Zur Prüfung befähigte Person", "§ 2 Abs. 6 BetrSichV, TRBS 1203", "wiederkehrende Prüfung von Arbeitsmitteln, Regalen, Leitern"],
          ["Elektrofachkraft", "§ 2 Abs. 3 DGUV Vorschrift 3", "elektrische Anlagen und Betriebsmittel"],
          ["Sachkundiger", "Unfallverhütungsvorschriften, Normen", "Fahrzeuge (§ 57 DGUV V70), Flurförderzeuge (§ 37 DGUV V68), Feuerlöscher (DIN 14406-4)"],
          ["Zugelassene Überwachungsstelle (ZÜS)", "BetrSichV Anhang 2", "Aufzüge, viele Druckanlagen"],
          ["Prüfsachverständiger", "Bauordnungsrecht der Länder", "sicherheitstechnische Anlagen in Sonderbauten"],
        ],
      },
      {
        type: "p",
        text: "Die Begriffe überschneiden sich: Ein Sachkundiger für Stapler ist im Sinne der BetrSichV in der Regel eine zur Prüfung befähigte Person für dieses Arbeitsmittel. Entscheidend ist, dass die Qualifikation zum konkreten Arbeitsmittel passt – ein Elektromeister ist nicht automatisch befähigt, Regale oder Krane zu prüfen.",
      },
      { type: "h2", text: "Wann eine befähigte Person nicht ausreicht", id: "grenzen" },
      {
        type: "p",
        text: "Für überwachungsbedürftige Anlagen wie Aufzüge schreibt Anhang 2 BetrSichV Prüfungen durch eine zugelassene Überwachungsstelle vor. In Sonderbauten verlangt das Landesrecht für sicherheitstechnische Anlagen bauaufsichtlich anerkannte Prüfsachverständige. In beiden Fällen genügt eine befähigte Person nicht. Welche Prüfung wer durchführt, steht für die wichtigsten Anlagen in der Übersicht [Prüffristen](/prueffristen).",
      },
      { type: "h2", text: "So prüfen Sie die Befähigung eines Dienstleisters", id: "pruefen" },
      {
        type: "checklist",
        items: [
          "Nachweis der Berufsausbildung im passenden Fachgebiet",
          "Nachweis einschlägiger Berufserfahrung mit dem konkreten Arbeitsmittel",
          "Fortbildungen der letzten Jahre zum Prüfbereich",
          "Bei Elektroprüfungen: Bestätigung als Elektrofachkraft",
          "Bei Regalen, Staplern, Toren: Schulungsnachweis für das jeweilige Arbeitsmittel",
          "Name der prüfenden Person im Protokoll – nicht nur der Firmenname",
        ],
      },
      {
        type: "example",
        title: "Kommune vergibt Prüfleistungen neu",
        text: [
          "Eine Stadt schreibt Elektroprüfungen, Regalinspektionen und die Prüfung kraftbetätigter Tore aus. In den bisherigen Verträgen war die Qualifikation der Prüfer nicht geregelt; in Protokollen stand nur der Firmenname.",
          "Die neuen Leistungsverzeichnisse verlangen je Los den Nachweis der Befähigung nach TRBS 1203 für das jeweilige Arbeitsmittel und die namentliche Nennung der prüfenden Person im Protokoll. Damit kann die Stadt ihre Auswahlpflicht belegen.",
        ],
      },
      { type: "h2", text: "Was eine falsche Auswahl kostet", id: "folgen" },
      {
        type: "p",
        text: "Prüft eine nicht befähigte Person, gilt die Prüfung als nicht ordnungsgemäß durchgeführt. Der Arbeitgeber hat dann seine Auswahlpflicht verletzt; im Schadensfall entlastet ihn die Beauftragung nicht. Für Leitungspersonen kommt eine Aufsichtspflichtverletzung nach § 130 OWiG in Betracht, zu deren erforderlichen Maßnahmen ausdrücklich die sorgfältige Auswahl gehört. Mehr: [Haftung bei fehlenden Prüfungen](/wissen/haftung-fehlende-pruefungen). Die Kosten einer qualifizierten Prüfung unterscheiden sich meist nur geringfügig von denen einer unqualifizierten – die Auswahl ist eine Frage der Vorgabe, nicht des Budgets.",
      },
      { type: "h2", text: "Befähigte Personen im eigenen Haus", id: "intern" },
      {
        type: "p",
        text: "Viele Organisationen haben befähigte Personen im eigenen Personal, ohne es zu wissen – etwa Elektriker in der Haustechnik, Kfz-Mechaniker im Bauhof oder Schlosser in der Werkstatt. Ob sie für eine bestimmte Prüfung befähigt sind, hängt vom Arbeitsmittel ab. Halten Sie die Entscheidung schriftlich fest, mit Bezug auf Ausbildung, Erfahrung und aktuelle Tätigkeit.",
      },
      {
        type: "table",
        caption: "Beispiel einer Zuordnung im eigenen Haus",
        head: ["Mitarbeiter", "Qualifikation", "Befähigt für", "Nicht befähigt für"],
        rows: [
          ["Haustechniker", "Elektroniker, 8 Jahre Haustechnik", "DGUV-V3-Prüfung als Elektrofachkraft", "Aufzüge, Druckbehälter"],
          ["Bauhofmeister", "Kfz-Mechatroniker, Schulung Flurförderzeuge", "UVV-Prüfung Fahrzeuge und Stapler", "Krane ohne Zusatzschulung"],
          ["Lagerleiter", "Schulung Regalinspektion nach DIN EN 15635", "Experteninspektion Regale", "Elektroprüfung"],
        ],
      },
      { type: "h2", text: "Zeitnahe berufliche Tätigkeit erhalten", id: "aktualitaet" },
      {
        type: "p",
        text: "Die dritte Anforderung – zeitnahe berufliche Tätigkeit – geht leicht verloren. Wer Regale nur einmal im Jahr prüft und sonst andere Aufgaben hat, muss seine Kenntnisse aktuell halten: durch regelmäßige Prüfpraxis, Fortbildung zu geänderten Regeln und Erfahrungsaustausch. Dokumentieren Sie Fortbildungen, damit die Befähigung bei einer Nachfrage belegbar bleibt.",
      },
      {
        type: "checklist",
        items: [
          "Liste aller internen befähigten Personen mit Zuständigkeit je Arbeitsmittel",
          "Nachweise zu Ausbildung, Erfahrung und Fortbildung je Person",
          "Schriftliche Beauftragung durch den Arbeitgeber",
          "Regelmäßige Überprüfung, ob die Befähigung noch aktuell ist",
        ],
      },
      { type: "h2", text: "Befähigung in Ausschreibungen festlegen", id: "ausschreibung" },
      {
        type: "p",
        text: "Für Kommunen und andere öffentliche Auftraggeber ist die Leistungsbeschreibung der Ort, an dem die Auswahlpflicht erfüllt wird. Wer nur „Prüfung nach DGUV Vorschrift 3“ ausschreibt, bekommt Angebote unterschiedlicher Qualität und kann sie kaum vergleichen. Wer die Anforderungen an die prüfende Person konkret beschreibt, macht die Qualifikation zum Eignungs- oder Zuschlagskriterium.",
      },
      {
        type: "table",
        caption: "Beispielhafte Anforderungen je Los",
        head: ["Los", "Anforderung an die prüfende Person", "Nachweis mit dem Angebot"],
        rows: [
          ["Elektroprüfung", "Elektrofachkraft; Prüferfahrung mit ortsfesten Anlagen", "Berufsabschluss, Referenzen"],
          ["Regalinspektion", "Schulung zu DIN EN 15635, Prüfpraxis", "Schulungsnachweis, Referenzen"],
          ["Tore und Türen", "Sachkunde für kraftbetätigte Tore", "Schulungsnachweis des Herstellers oder Verbands"],
          ["Hygieneinspektion RLT", "Schulung VDI 6022 Kategorie A", "Schulungsnachweis"],
        ],
      },
      {
        type: "p",
        text: "Ergänzen Sie die Pflicht, die prüfende Person im Protokoll namentlich zu nennen, und behalten Sie sich vor, Nachweise für eingesetzte Ersatzprüfer anzufordern.",
      },
      { type: "h2", text: "Wenn die befähigte Person ausfällt", id: "vertretung" },
      {
        type: "p",
        text: "Prüffristen laufen auch dann, wenn die einzige befähigte Person krank ist oder das Unternehmen verlässt. Legen Sie deshalb für jede Prüfart eine Vertretung fest – intern oder durch einen Rahmenvertrag mit einem externen Prüfdienst. Gerade in kleineren Kommunen und bei sozialen Trägern hängt die Prüforganisation häufig an einer einzelnen Person; fällt sie aus, bleiben Prüfungen unbemerkt liegen. Ein zentraler Fristenplan zeigt rechtzeitig, welche Prüfung ohne Prüfer dasteht, und macht die Abhängigkeit sichtbar, bevor eine Frist überschritten ist. Für Prüfungen mit hoher Gefährdung, etwa an Kranen oder elektrischen Anlagen in Kliniken, sollte die Vertretung bereits namentlich benannt und ihre Befähigung ebenso dokumentiert sein wie die der regulären Prüfer.",
      },
      {
        type: "p",
        text: "Für Organisationen mit vielen Standorten empfiehlt sich eine zentrale Übersicht: je Prüfart die befähigten Personen, ihre Nachweise, ihre Vertretung und die Standorte, für die sie zuständig sind. Diese Übersicht ist Teil des [Betreiberpflichtenkatasters](/wissen/betreiberpflichtenkataster-erstellen) und zeigt bei jeder Begehung oder Anfrage auf einen Blick, wer wofür prüfen darf. Ändert sich eine technische Regel, lässt sich an derselben Stelle nachvollziehen, welche Personen eine Fortbildung brauchen.",
      },
    ],
    faqs: [
      [
        "Was ist eine befähigte Person nach TRBS 1203?",
        "Eine Person, die durch Berufsausbildung, Berufserfahrung und zeitnahe berufliche Tätigkeit über die Kenntnisse zur Prüfung bestimmter Arbeitsmittel verfügt (§ 2 Abs. 6 BetrSichV). Die TRBS 1203 konkretisiert die Anforderungen je nach Arbeitsmittel.",
      ],
      [
        "Wer bestimmt die befähigte Person?",
        "Der Arbeitgeber. Er wählt sie aus und muss sich vergewissern, dass sie die Anforderungen erfüllt – auch bei externen Prüfdiensten.",
      ],
      [
        "Ist ein Sachkundiger dasselbe wie eine befähigte Person?",
        "Die Begriffe stammen aus unterschiedlichen Regelwerken. Ein Sachkundiger nach einer Unfallverhütungsvorschrift ist für das betreffende Arbeitsmittel in der Regel auch eine befähigte Person im Sinne der BetrSichV.",
      ],
      [
        "Darf eine befähigte Person Aufzüge prüfen?",
        "Nein. Aufzüge sind überwachungsbedürftige Anlagen; ihre wiederkehrende Prüfung erfolgt nach Anhang 2 BetrSichV durch eine zugelassene Überwachungsstelle.",
      ],
      [
        "Muss die Befähigung einer Person schriftlich festgehalten werden?",
        "Die BetrSichV verlangt keine bestimmte Form. Eine schriftliche Dokumentation von Ausbildung, Erfahrung, Fortbildung und Beauftragung ist aber der einfachste Nachweis, dass der Arbeitgeber seine Auswahlpflicht erfüllt hat.",
      ],
    ],
    sources: [
      ["BetrSichV", "§ 2 Abs. 6, § 14 Abs. 6; Anhang 2"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["DGUV V3", "§ 2 Abs. 3"],
      ["DGUV V70", "§ 57"],
      ["DGUV V68", "§ 37"],
      ["OWiG", "§ 130 Abs. 1"],
    ],
    related: [
      ["UVV-Prüfung", "/uvv-pruefung", "Sachkundigenprüfungen"],
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Elektrofachkraft"],
      ["DGUV V3 Prüfung selber machen", "/wissen/dguv-v3-pruefung-selber-machen", "Eigene Prüfer"],
      ["Prüffristen festlegen", "/wissen/prueffristen-festlegen", "Gefährdungsbeurteilung"],
    ],
    cta: "Qualifizierte Prüfer für alle Gewerke beauftragen lassen.",
  },
];
