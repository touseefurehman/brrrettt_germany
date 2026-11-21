// Platzhalter für den Fachpartner-Bereich: erscheinen auf /fachpartner erst, wenn sie gesetzt sind (nie leer oder als „[…]“).
// BOOKING_URL: Terminbuchungslink (Umgebungsvariable, https://…). Ohne Wert gibt es keinen Button „Gespräch buchen“.
// Ansprechpartner: Umgebungsvariablen PARTNER_CONTACT_NAME, PARTNER_CONTACT_ROLE, PARTNER_CONTACT_EMAIL (Name ist Pflicht).

const clean = (v: string | undefined) => (v ?? "").trim();

const rawBooking = clean(process.env.BOOKING_URL);
export const BOOKING_URL = /^https:\/\/[^\s]+$/i.test(rawBooking) ? rawBooking : "";

const name = clean(process.env.PARTNER_CONTACT_NAME);
const email = clean(process.env.PARTNER_CONTACT_EMAIL);
export const partnerContact = name
  ? { name, role: clean(process.env.PARTNER_CONTACT_ROLE), email: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email) ? email : "" }
  : null;
