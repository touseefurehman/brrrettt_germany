import type { ReactNode } from "react";
import Link from "next/link";
import JsonLd, { editorialArticleSchema, faqSchema } from "./JsonLd";
import { LegalNotice } from "./PageParts";
import { CtaBand, PageIntro } from "./Subpage";
import { legalBasisParts, MODIFIED_DATE, PUBLISHED_DATE, type Partner } from "@/lib/elektropruefung";
import { site } from "@/lib/site";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const paragraphs = (text: string) => text.split(/\n\s*\n/).filter((p) => p.trim());

export type QaLink = [title: string, path: string, note: string];

/**
 * Frage-Antwort-Seite (Antwortseite unter /elektropruefung-dguv-v3 oder Wissensseite unter /wissen/elektropruefung):
 * H1 = Frage → Kurzantwort (erster Absatz, wird von KI-Suchen zitiert) → Einordnung der Redaktion →
 * Rechtsgrundlagen → ggf. Anzeige → verwandte Fragen → Autorenbox.
 */
export default function ElektroQaView({
  item,
  path,
  crumbs,
  kicker,
  description,
  partner,
  children,
}: {
  item: { question: string; shortAnswer: string; expertText: string; legalBasis: string };
  path: string;
  crumbs: [name: string, path: string][];
  kicker: string;
  description: string;
  partner?: Partner | null;
  /** Abschnitte mit weiterführenden Links */
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd data={faqSchema([[item.question, `${item.shortAnswer} ${item.expertText}`]])} />
      <JsonLd
        data={editorialArticleSchema({
          title: item.question,
          description,
          path,
          published: PUBLISHED_DATE,
          modified: MODIFIED_DATE,
        })}
      />
      <PageIntro crumbs={crumbs} kicker={kicker} title={item.question}>
        <div className="short-answer">
          <span className="short-answer-label">Kurzantwort</span>
          <p>{item.shortAnswer}</p>
        </div>
      </PageIntro>

      <section className="section page-width section-tight prose">
        <h2>Einordnung der Redaktion</h2>
        {paragraphs(item.expertText).map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </section>

      <section className="section page-width section-tight prose">
        <h2>Rechtsgrundlagen</h2>
        <p className="legal-basis">
          {legalBasisParts(item.legalBasis).map((part, i) =>
            part.url ? (
              <a key={i} href={part.url} rel="noopener">
                {part.text}
              </a>
            ) : (
              part.text
            ),
          )}
        </p>
        <LegalNotice />
      </section>

      {partner && (
        // Bezahlte Partnernennung – nach § 5a UWG deutlich als Anzeige gekennzeichnet
        <section className="section page-width section-tight">
          <aside className="partner-box" aria-label="Anzeige">
            <span className="partner-label">Anzeige</span>
            <strong>{partner.name}</strong>
            {partner.text.trim() && <p>{partner.text}</p>}
            {partner.url.trim() && (
              <a href={partner.url} rel="sponsored noopener">
                Zum Anbieter
              </a>
            )}
          </aside>
        </section>
      )}

      {children}

      <section className="section page-width section-tight">
        <aside className="author-box">
          <strong>Redaktion {site.domain}</strong>
          <span>
            Zuletzt aktualisiert: <time dateTime={MODIFIED_DATE}>{formatDate(MODIFIED_DATE)}</time>
          </span>
        </aside>
      </section>

      <CtaBand title="Elektroprüfung für alle Standorte organisieren lassen." />
    </>
  );
}

/** Linkkarten wie im übrigen Wissensbereich */
export function QaLinks({ title, links }: { title: string; links: QaLink[] }) {
  if (links.length === 0) return null;
  return (
    <section className="section page-width section-tight">
      <h2>{title}</h2>
      <div className="link-cards three">
        {links.map(([label, href, note]) => (
          <Link key={href} href={href}>
            <strong>{label}</strong>
            <span>{note}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
