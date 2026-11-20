import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { PageIntro } from "@/components/Subpage";
import { formatDate } from "@/lib/rank-rent";
import { SPONSORING_PATH, upcomingReports } from "@/lib/partners";
import { site } from "@/lib/site";
import { REPORT_BASE, REPORT_BASE_NAME, reportPath, reports } from "@/lib/sov";

// Übersicht aller Datenreports
const title = `Reports zu Betreiberpflichten und Prüfungen | ${site.domain}`;
const description =
  "Eigene Datenauswertungen von betreibermanager.de, z. B. welche Quellen ChatGPT, Perplexity und Gemini bei Fragen zur Elektroprüfung nach DGUV V3 nennen.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: REPORT_BASE },
  openGraph: { url: REPORT_BASE, title, description },
};

const sorted = [...reports].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export default function ReportsOverview() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Reports",
          description,
          url: `${site.url}${REPORT_BASE}`,
          inLanguage: "de-DE",
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: sorted.length,
            itemListElement: sorted.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}${reportPath(r)}`,
              name: r.title,
            })),
          },
        }}
      />
      <PageIntro crumbs={[[REPORT_BASE_NAME, REPORT_BASE]]} kicker="REPORTS" title="Reports">
        <p>Eigene Datenauswertungen der Redaktion zu Betreiberpflichten, Prüfungen und Prüfdienstleistern.</p>
      </PageIntro>
      <section className="section page-width section-tight">
        <div className="link-cards three">
          {sorted.map((r) => (
            <Link key={r.slug} href={reportPath(r)}>
              <strong>{r.title}</strong>
              <span>
                {r.shortTitle} · {formatDate(r.datePublished)}
              </span>
            </Link>
          ))}
        </div>
      </section>
      {upcomingReports.length > 0 && (
        <section className="section page-width section-tight">
          <h2>Kommende Reports</h2>
          <div className="link-cards three">
            {upcomingReports.map((u) => (
              <div key={u.slug} className="rr-benefit">
                <strong>{u.title}</strong>
                <span>
                  Messe-Bezug: {u.messe} · Status: {u.status}
                </span>
              </div>
            ))}
          </div>
          <p className="muted-note">
            Sie möchten einen Report unterstützen? <Link href={SPONSORING_PATH}>Studien-Sponsoring</Link>
          </p>
        </section>
      )}
    </>
  );
}
