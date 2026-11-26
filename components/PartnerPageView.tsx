import Link from "next/link";
import JsonLd, { breadcrumbSchema, faqSchema, webPageSchema } from "./JsonLd";
import { PageIntro } from "./Subpage";
import { DataTable, Marked, Md } from "./B2bPage";
import PartnerPrivacySection from "./partners/PartnerPrivacySection";
import PruefpartnerForm from "./partners/PruefpartnerForm";
import SichtbarkeitBox from "./partners/SichtbarkeitBox";
import { b2bPublished } from "@/lib/b2b";
import { partnerFormLive, partnerPublished, partnerWeb3FormsKey } from "@/lib/partner";
import { PARTNER_BASE, type PartnerPage } from "@/lib/partner-core";
import { formatDate } from "@/lib/rank-rent";
import { site } from "@/lib/site";

const linkable = (href: string) =>
  href === PARTNER_BASE ||
  (href.startsWith(`${PARTNER_BASE}/`) ? partnerPublished.some((p) => p.url === href) : href.startsWith("/pruefmanagement/") ? b2bPublished.some((p) => p.url === href) : true);

/** Prüfpartner-Unterseite (operative Zusammenarbeit). Kein Service-Schema; WebPage, BreadcrumbList, FAQPage (nur sichtbare FAQ). */
export default function PartnerPageView({ page, preview = false, previewToken }: { page: PartnerPage; preview?: boolean; previewToken?: string }) {
  const crumbs: [string, string][] = [["Prüfpartner werden", PARTNER_BASE], [page.h1, page.url]];
  const draft = page.status !== "published";
  const contactHref = `/kontakt?thema=${encodeURIComponent(page.ctaTopic)}`;
  const ctaHref = partnerFormLive ? "#registrierung" : contactHref;
  return (
    <>
      <JsonLd data={webPageSchema(page.url, page.h1, page.lastReviewed)} />
      <JsonLd data={faqSchema(page.faq.map((f): [string, string] => [f.question, f.answer]))} />
      {preview && draft && (
        <div role="note" style={{ background: "#b91c1c", color: "#fff", textAlign: "center", padding: "10px 16px", fontWeight: 700, letterSpacing: "0.04em" }}>
          ENTWURF – nicht veröffentlicht <span style={{ fontWeight: 400 }}>· Status: {page.status} · noindex</span>
        </div>
      )}
      <PageIntro crumbs={crumbs} kicker="PRÜFPARTNER" title={<Marked text={page.h1} preview={preview} />}>
        <p className="b2b-kurzantwort">
          <Marked text={page.kurzantwort} preview={preview} />
        </p>
        <p>
          <Link href={ctaHref} className="rr-btn">
            {page.cta}
          </Link>
        </p>
      </PageIntro>

      {page.sections.map((s) => (
        <section key={s.heading} className="section page-width section-tight prose">
          <h2>{s.heading}</h2>
          <Md source={s.content} preview={preview} />
          {s.table !== undefined && <DataTable table={page.tables[s.table]} preview={preview} />}
        </section>
      ))}

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <div className="faq-list">
          {page.faq.map((f, i) => (
            <details key={f.question} className="faq-item" open={i === 0}>
              <summary className="faq-trigger">
                <h3>
                  <Marked text={f.question} preview={preview} />
                </h3>
              </summary>
              <p className="faq-answer">
                <Marked text={f.answer} preview={preview} />
              </p>
            </details>
          ))}
        </div>
      </section>

      {page.sources.length > 0 && (
        <section className="section page-width section-tight prose" id="quellen">
          <h2>Quellen</h2>
          <ul>
            {page.sources.map((s) => (
              <li key={s.url + s.label}>
                <a href={s.url} rel="noopener">
                  {s.label}
                </a>
                {s.note ? ` – ${s.note}` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section page-width section-tight">
        <h2>Weiterführende Seiten</h2>
        <div className="link-cards three">
          {page.internalLinks.filter((l) => linkable(l.href)).map((l) => (
            <Link key={l.href} href={l.href}>
              <strong>{l.label}</strong>
              <span>{l.note}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="registrierung" className="section page-width section-tight">
        <h2>Registrierung</h2>
        {partnerFormLive ? (
          <>
            <p>
              Die Registrierung ist keine automatische Freigabe und keine Auftragszusage. Wir prüfen Ihre Angaben; Konditionen werden jeweils
              individuell vereinbart.
            </p>
            <PruefpartnerForm sourcePage={page.url} cta={page.cta} accessKey={partnerWeb3FormsKey} />
            {preview && (
              <div className="prose">
                <PartnerPrivacySection heading="Datenschutzhinweis (Vorschau; erscheint in der Datenschutzerklärung)" highlight />
              </div>
            )}
          </>
        ) : (
          <>
            <p>
              Die Registrierung läuft über das Kontaktformular, vorbelegt mit dem Thema „{page.ctaTopic}“. Nennen Sie dort Gewerke,
              Einsatzgebiet, Qualifikationen und Kapazität; die Pflichtangabe „Anzahl Standorte“ bezieht sich in diesem Fall auf Ihre
              Betriebsstandorte. Die Registrierung ist keine automatische Freigabe; Konditionen werden jeweils individuell vereinbart.
            </p>
            <p>
              <Link href={contactHref} className="rr-btn">
                {page.cta}
              </Link>
            </p>
          </>
        )}
      </section>

      <section className="section page-width section-tight">
        <SichtbarkeitBox />
      </section>

      <section className="section page-width section-tight">
        <aside className="author-box">
          <strong>Redaktion {site.domain}</strong>
          <span>
            Zuletzt inhaltlich geprüft: <time dateTime={page.lastReviewed}>{formatDate(page.lastReviewed)}</time>
            {page.reviewedBy ? ` · Fachliche Prüfung: ${page.reviewedBy}` : ""}
          </span>
        </aside>
      </section>
    </>
  );
}
