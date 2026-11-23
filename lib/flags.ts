/**
 * Öffentliche Profilseiten je Unternehmen („Wird [Firma] von KI-Systemen empfohlen?“).
 * Bleiben AUS (Standard), bis Henryk die Nutzung fremder Firmennamen und Marken zur Eigenwerbung rechtlich (UWG) hat prüfen lassen.
 * Bis dahin gibt es persönliche Befunde nur unter /befund/[token] (noindex).
 */
export const PROFILE_PAGES_ENABLED = process.env.PROFILE_PAGES_ENABLED === "true";
