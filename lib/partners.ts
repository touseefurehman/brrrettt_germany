import messenData from "@/content/partners/messen.json";
import paketeData from "@/content/partners/sponsoring-pakete.json";
import upcomingData from "@/content/sov/upcoming-reports.json";

// Fachpartner-Seiten (/fachpartner, /fachpartner/studien-sponsoring). Daten: content/partners/*.json, content/sov/upcoming-reports.json

export const FACHPARTNER_PATH = "/fachpartner";
export const SPONSORING_PATH = "/fachpartner/studien-sponsoring";

export type MesseZeile = { themen: string; messen: string[]; links: { label: string; href: string }[] };
export type SponsoringPaket = { slug: string; name: string; summary: string; points: string[]; price: string };
export type UpcomingReport = { slug: string; title: string; messe: string; status: string };

export const messen = messenData as MesseZeile[];
export const sponsoringPakete = paketeData as SponsoringPaket[];
export const upcomingReports = upcomingData as UpcomingReport[];

export const POSITIONEN = ["CEO/Geschäftsführung", "Marketing", "Vertrieb", "Sonstige"] as const;
export const ANLIEGEN = ["Exklusive Fachpartnerschaft", "Studien-Sponsoring", "Beides"] as const;
