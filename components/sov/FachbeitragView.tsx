import Link from "next/link";
import FaqList from "../FaqList";
import JsonLd, { editorialArticleSchema, faqSchema } from "../JsonLd";
import { LegalNotice } from "../PageParts";
import { PageIntro } from "../Subpage";
import Markdown from "../rank-rent/Markdown";
import { formatDate, legalBasisParts, markdownToText, PARTNER_PAGE_PATH } from "@/lib/rank-rent";
import { site } from "@/lib/site";
import {
  ARTICLE_BASE,
  ARTICLE_BASE_NAME,
  articlePath,
  articleTypeHeadings,
  isDraftArticle,
  pageLabel,
  type ReadyArticle,
} from "@/lib/sov";

/** Fachbeitrag (Aufbau siehe content/sov/README.md) */
export default function FachbeitragView({ a }: { a: ReadyArticle }) {
  const path = articlePath(a);
  const modified = a.dateModified ?? a.datePublished;
  const body = [a.shortAnswer, ...a.sections.map((s) => `${s.heading}. ${markdownToText(s.content)}`)].join("\n\n");

  return (
    <>
      <JsonLd
        data={editorialArticleSchema({
          title: a.title,
          description: a.metaDescription,
          path,
          published: a.datePublished,
          modified,
          body,
        })}
      />
      {a.faq && a.faq.length > 0 && <JsonLd data={faqSchema(a.faq.map((f): [string, string] => [f.question, f.answer]))} />}

      <PageIntro
        crumbs={[
          [ARTICLE_BASE_NAME, ARTICLE_BASE],
          [a.title, path],
        ]}
        kicker={`FACHBEITRAG · ${articleTypeHeadings[a.type].split(":")[0].toUpperCase()}`}
        title={a.title}
      >
        {isDraftArticle(a) && (
          <p className="rr-draft-note" role="note">
            ENTWURF – nur lokal sichtbar, nicht indexiert.
          </p>
        )}
      </PageIntro>

      <section className="section page-width section-tight">
        <div className="short-answer">
          <span className="short-answer-label">Kurzantwort</span>
          <p>{a.shortAnswer}</p>
        </div>
      </section>

      <section className="section page-width section-tight prose">
        {a.sections.map((s) => (
          <div key={s.heading}>
            <h2>{s.heading}</h2>
            <Markdown source={s.content} />
          </div>
        ))}
      </section>

      {a.legalBasis.length > 0 && (
        <section className="section page-width section-tight prose">
          <h2>Rechtsgrundlagen</h2>
          <ul className="legal-basis">
            {a.legalBasis.map((item) => (
              <li key={item}>
                {legalBasisParts(item).map((part, i) =>
                  part.url ? (
                    <a key={i} href={part.url} rel="noopener">
                      {part.text}
                    </a>
                  ) : (
                    part.text
                  ),
                )}
              </li>
            ))}
          </ul>
          {a.disclaimer ? <p className="muted-note legal-note">{a.disclaimer}</p> : <LegalNotice />}
        </section>
      )}

      {a.faq && a.faq.length > 0 && (
        <section className="section page-width section-tight">
          <h2>Häufige Fragen</h2>
          <FaqList faqs={a.faq.map((f): [string, string] => [f.question, f.answer])} />
        </section>
      )}

      {a.relatedPages.length > 0 && (
        <section className="section page-width section-tight">
          <h2>Weiterlesen</h2>
          <div className="link-cards three">
            {a.relatedPages.map((p) => (
              <Link key={p} href={p}>
                <strong>{pageLabel(p)}</strong>
                <span>{site.domain}{p}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {a.showPartnerCta && (
      <section className="section page-width section-tight">
        <aside className="partner-box">
          <strong>Sie sind Prüfdienstleister?</strong>
          <p>
            Auf {site.domain} vergeben wir je Prüfbereich und Objekttyp einen exklusiven Partnerplatz.{" "}
            <Link href={PARTNER_PAGE_PATH}>Mehr für Prüfpartner</Link>
          </p>
        </aside>
      </section>
      )}

      <section className="section page-width section-tight">
        <aside className="author-box">
          <strong>{a.author ?? `Redaktion ${site.domain}`}</strong>
          {a.reviewedBy && <span>Fachlich geprüft: {a.reviewedBy}</span>}
          {a.lastReviewed && (
            <span>
              Stand: <time dateTime={a.lastReviewed}>{formatDate(a.lastReviewed)}</time>
            </span>
          )}
          {a.legalStatus && <span>Rechtsstand: {a.legalStatus}</span>}
          <span>
            Veröffentlicht: <time dateTime={a.datePublished}>{formatDate(a.datePublished)}</time>
          </span>
          {modified !== a.datePublished && (
            <span>
              Aktualisiert: <time dateTime={modified}>{formatDate(modified)}</time>
            </span>
          )}
        </aside>
      </section>
    </>
  );
}
