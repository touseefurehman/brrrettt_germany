import { clusterBySlug, partnerStatusLabel } from "@/lib/clusters";
import { baseUrl, type Mail } from "@/lib/mail";
import type { Findings } from "@/lib/nullmessung";
import type { Lead } from "@/lib/store";
import { BOOKING_URL } from "@/lib/partner-config";
import { site } from "@/lib/site";

// E-Mail-Folge nach bestätigter Nullmessung. Klartext, persönlich, ohne Preis, mit Abmeldelink in jeder Mail.
// Tag 0 sofort, Tag 3/7/14 solange keine Buchung, Tag 30 nur bei einer neuen Messung.

export const STEPS = [3, 7, 14] as const;
export const COMPARISON_STEP = 30;

const befundUrl = (l: Lead) => `${baseUrl()}/befund/${l.token}`;
export const unsubscribeUrl = (l: Lead) => `${baseUrl()}/abmelden/${l.unsubToken}`;
export const confirmUrl = (l: Lead) => `${baseUrl()}/api/nullmessung/bestaetigen?t=${l.confirmToken}`;
const clusterName = (l: Lead) => clusterBySlug(l.cluster)?.name ?? l.cluster;
const firstName = (l: Lead) => l.name.split(" ")[0];

const footer = (l: Lead) =>
  [
    "",
    "Freundliche Grüße",
    `Das Team von ${site.domain}`,
    "",
    "—",
    `Sie erhalten diese Nachricht, weil Sie eine Nullmessung für ${l.company} angefordert haben.`,
    `Abmelden: ${unsubscribeUrl(l)}`,
  ].join("\n");

const mail = (l: Lead, subject: string, body: string[]): Mail => ({
  to: l.email,
  subject,
  text: [...body, footer(l)].join("\n"),
  unsubscribeUrl: unsubscribeUrl(l),
});

export function confirmMail(l: Lead, waitlist: boolean): Mail {
  return mail(
    l,
    waitlist ? `Ihre Nullmessung für ${clusterName(l)} folgt` : "Bitte bestätigen Sie Ihre Anfrage zur Nullmessung",
    [
      `Guten Tag ${l.name},`,
      "",
      waitlist
        ? `Ihre Nullmessung folgt, sobald die Erhebung für ${clusterName(l)} abgeschlossen ist. Wir melden uns dann mit Ihrem persönlichen Befund.`
        : `Sie haben eine kostenlose Nullmessung für ${l.company} angefordert.`,
      "",
      "Damit wir Ihnen den Befund senden dürfen, bestätigen Sie bitte Ihre E-Mail-Adresse:",
      confirmUrl(l),
      "",
      "Wenn Sie die Anfrage nicht gestellt haben, ignorieren Sie diese Nachricht. Ohne Bestätigung löschen wir Ihre Angaben nach 30 Tagen.",
    ],
  );
}

export const day0 = (l: Lead): Mail =>
  mail(l, `Ihr Befund für ${l.company} ist fertig`, [
    `Guten Tag ${firstName(l)},`,
    "",
    `Ihre Nullmessung für ${l.company} im Feld „${clusterName(l)}“ liegt vor:`,
    befundUrl(l),
    "",
    "Sie sehen darin, wie oft und wo KI-Systeme Ihr Unternehmen in der letzten Messung genannt haben und wen sie stattdessen nennen.",
    "Der Befund ist eine Momentaufnahme und keine Bewertung Ihrer Leistung.",
  ]);

export function day3(l: Lead, f: Findings): Mail {
  const top = f.topSources.slice(0, 3);
  return mail(l, `Welche Quellen KI-Systeme im Feld „${clusterName(l)}“ nutzen`, [
    `Guten Tag ${firstName(l)},`,
    "",
    `in der Messung vom ${f.dateLabel} haben ChatGPT, Perplexity und Gemini diese Quellen am häufigsten genutzt:`,
    ...top.map((s, i) => `${i + 1}. ${s.domain} (${s.citations} Zitationen)`),
    ...(f.outsideProviderShare != null ? ["", `${f.outsideProviderShare.toString().replace(".", ",")} % der gewichteten Zitationen stammen nicht von Anbieter-Websites.`] : []),
    "",
    `Ihren Befund finden Sie weiterhin hier: ${befundUrl(l)}`,
  ]);
}

export const day7 = (l: Lead): Mail =>
  mail(l, "20 Minuten zu Ihrem Ergebnis?", [
    `Guten Tag ${firstName(l)},`,
    "",
    "wenn Sie möchten, gehen wir Ihren Befund in 20 Minuten gemeinsam durch: was er zeigt, was er nicht zeigt und was Sie daraus machen können.",
    BOOKING_URL ? `Termin wählen: ${BOOKING_URL}` : `Antworten Sie einfach auf diese Nachricht oder schreiben Sie an ${site.email}, dann finden wir einen Termin.`,
  ]);

export function day14(l: Lead): Mail {
  const c = clusterBySlug(l.cluster);
  const status = c ? partnerStatusLabel[c.partnerStatus] : "";
  return mail(l, `Fachpartnerplatz „${clusterName(l)}“: aktueller Stand`, [
    `Guten Tag ${firstName(l)},`,
    "",
    `Pro Feld vergeben wir genau einen bundesweiten Fachpartnerplatz. Aktueller Stand für „${clusterName(l)}“: ${status}.`,
    "Wir garantieren keine Nennung in KI-Systemen. Wenn Sie den Platz besprechen möchten, melden Sie sich gern:",
    BOOKING_URL || site.email,
    "",
    "Danach melden wir uns nur noch, wenn es eine neue Messung gibt.",
  ]);
}

export function day30(l: Lead, before: Findings, now: Findings): Mail {
  const cmp = (label: string, a: number | null, b: number | null) =>
    a == null || b == null ? `${label}: nicht direkt vergleichbar (unterschiedliche Datenbasis)` : `${label}: ${a} → ${b}`;
  return mail(l, `Neue Messung „${clusterName(l)}“: Ihr Wert im Vergleich`, [
    `Guten Tag ${firstName(l)},`,
    "",
    `es gibt eine neue Messung (${now.dateLabel}). Ihr Wert im Vergleich zur Nullmessung (${before.dateLabel}):`,
    cmp("Antworten mit Nennung", before.mentions, now.mentions),
    cmp("Zitationen Ihrer Domain", before.citations, now.citations),
    "",
    `Stichprobe: ${now.answerCount} Antworten. KI-Antworten schwanken; die Zahlen sind eine Momentaufnahme.`,
    `Aktueller Befund: ${befundUrl(l)}`,
  ]);
}

export const notifyMail = (l: Lead, f: Findings | null): Mail => ({
  to: process.env.NOTIFY_EMAIL ?? "",
  subject: `Neuer bestätigter Lead: ${l.company} (${clusterName(l)})`,
  text: [
    `Firma: ${l.company} (${l.domain})`,
    `Cluster: ${clusterName(l)}`,
    `Kontakt: ${l.name}, ${l.role}, ${l.email}`,
    f
      ? `Befund: ${f.named ? "genannt" : "nicht genannt"}; Nennungen ${f.mentions ?? "nicht erhoben"}, Zitationen ${f.citations}; Messung ${f.dateLabel}`
      : "Befund: noch keine Messung (Warteliste)",
  ].join("\n"),
});
