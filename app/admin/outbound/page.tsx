import type { Metadata } from "next";
import Link from "next/link";
import { clusterBySlug } from "@/lib/clusters";
import { baseUrl } from "@/lib/mail";
import type { Findings } from "@/lib/nullmessung";
import { getLeads, storeConfigured } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Outbound (Admin)", robots: { index: false, follow: false } };

function template(company: string, contact: string, clusterName: string, f: Findings, link: string) {
  return [
    `Guten Tag${contact ? ` ${contact}` : ""},`,
    "",
    `für unseren KI-Report „${clusterName}“ haben wir am ${f.dateLabel} gemessen, welche Anbieter ChatGPT, Perplexity und Gemini in ${f.answerCount} Antworten nennen.`,
    `Für ${company} haben wir einen persönlichen Befund vorbereitet: ${link}`,
    "",
    "Der Befund ist eine Momentaufnahme und keine Bewertung Ihrer Leistung. Wenn Sie keine weitere Nachricht von uns möchten, sagen Sie uns bitte kurz Bescheid.",
  ].join("\n");
}

export default async function Outbound({ searchParams }: { searchParams: Promise<{ erstellt?: string; uebersprungen?: string }> }) {
  const sp = await searchParams;
  const leads = storeConfigured ? (await getLeads().catch(() => [])).filter((l) => l.source === "outbound") : [];
  return (
    <main className="section page-width">
      <h1>Outbound-Liste</h1>
      <p><Link href="/admin/leads">Leads</Link> · <Link href="/admin/scores">Scores</Link></p>
      <p>
        <strong>Kein automatischer E-Mail-Versand.</strong> Der Import erzeugt nur Befundseiten und Links für den manuellen Versand per Brief oder
        LinkedIn-Nachricht (keine Werbe-E-Mails ohne Einwilligung, UWG § 7).
      </p>
      {sp.erstellt && <p role="status">{sp.erstellt} Befundseiten erstellt.{sp.uebersprungen ? ` Übersprungen (kein Cluster, keine Domain oder noch keine Messung): ${sp.uebersprungen}` : ""}</p>}
      <form method="post" action="/admin/outbound/import" className="rr-form">
        <label>
          CSV (Firma, Domain, Cluster-Slug, Kontakt – eine Zeile je Unternehmen)
          <textarea name="csv" rows={8} required placeholder={"Firma,Domain,Cluster,Kontakt\nMusterprüf GmbH,musterpruef.de,pruefdienste,Erika Mustermann"} />
        </label>
        <button className="rr-btn" type="submit">Befundseiten erzeugen</button>
      </form>
      {leads.map((l) => {
        const link = `${baseUrl()}/befund/${l.token}`;
        const f = l.findingsJson as Findings;
        return (
          <section key={l.id} className="section-tight">
            <h2>{l.company}</h2>
            <p>{l.domain} · {l.name || "ohne Kontakt"} · <a href={`/befund/${l.token}`}>{link}</a></p>
            <textarea readOnly rows={9} style={{ width: "100%" }} value={template(l.company, l.name, clusterBySlug(l.cluster)?.name ?? l.cluster, f, link)} aria-label={`Textvorlage ${l.company}`} />
          </section>
        );
      })}
    </main>
  );
}
