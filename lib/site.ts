// Zentrale Firmendaten. Alles in eckigen Klammern muss vor dem Launch ersetzt werden –
// diese Angaben erscheinen in Header, Footer, Kontakt, Impressum, Datenschutz und im JSON-LD.
// Schreibweise überall identisch halten (NAP-Konsistenz mit Google Business Profile & Verzeichnissen).

export const site = {
  url: "https://www.betreibermanager.de",
  domain: "betreibermanager.de",
  companyName: "[Firmenname]",
  legalForm: "[Rechtsform]",
  street: "[Straße und Hausnummer]",
  postalCode: "[PLZ]",
  city: "[Ort]",
  phoneDisplay: "[Telefonnummer]",
  /** E.164 ohne Leerzeichen, z. B. +494012345678 */
  phoneHref: "[+49…]",
  email: "kontakt@betreibermanager.de",
  region: "[Region]",
  /** Bundesland des Firmensitzes, z. B. "Hamburg" – bestimmt die Aufsichtsbehörde in der Datenschutzerklärung */
  state: "[Bundesland]",
  representative: "[Vertretungsberechtigte Person]",
  registerCourt: "[Registergericht]",
  registerNumber: "[HRB-Nummer]",
  vatId: "[USt-IdNr.]",
  contactPerson: "[Name]",
  contactPersonRole: "[Qualifikation / Funktion]",
  /** Verantwortlich für redaktionelle Inhalte nach § 18 Abs. 2 MStV (Wissensbereich): Name und Anschrift */
  editorialResponsible: "[Name, Anschrift]",
  responseTime: "Antwort innerhalb eines Werktags",
  /** URLs von Google Business Profile, LinkedIn, wlw etc., sobald vorhanden */
  sameAs: [] as string[],
};

// Belegbare Angaben für „Über uns“ und das Organization-Schema (GEO-Audit, Aufgabe 3).
// Nur eintragen, was belegt ist – leere oder „[…]“-Felder werden ausgelassen statt vage formuliert.
export const company = {
  /** z. B. "2024" */
  foundingYear: "[Gründungsjahr]",
  /** z. B. "5 Mitarbeitende" */
  teamSize: "[Teamgröße]",
  /** Kennzahlen, z. B. ["120", "betreute Standorte"] */
  figures: [] as [value: string, label: string][],
  /** Handelnde Personen mit Werdegang */
  people: [] as { name: string; role: string; background: string }[],
  /** Mitgliedschaften, z. B. "GEFMA – Deutscher Verband für Facility Management" */
  memberships: [] as string[],
  /** Eigene Zertifizierungen, z. B. "ISO 9001:2015 (Zertifizierer, Gültigkeit)" */
  certifications: [] as string[],
  /** Referenzen oder anonymisierte Fallbeispiele: Ausgangslage, Vorgehen, Ergebnis */
  cases: [] as { title: string; text: string }[],
};

/** true, sobald ein Platzhalter durch echte Daten ersetzt wurde */
export const isSet = (value: string) => value.trim() !== "" && !value.trim().startsWith("[");

export const fullCompanyName = isSet(site.companyName)
  ? `${site.companyName}${isSet(site.legalForm) ? ` ${site.legalForm}` : ""}`
  : site.domain;
export const hasPhone = isSet(site.phoneDisplay) && isSet(site.phoneHref);
export const hasAddress = [site.street, site.postalCode, site.city].every(isSet);
export const addressLine = `${site.street}, ${site.postalCode} ${site.city}`;
export const phoneLink = `tel:${site.phoneHref}`;
export const emailLink = `mailto:${site.email}`;
