import Link from "next/link";
import ContentBlocks, { RelatedLinks, SourceList } from "./ContentBlocks";
import FaqList from "./FaqList";
import JsonLd, { articleSchema, faqSchema } from "./JsonLd";
import { CoordinationNote, LegalNotice } from "./PageParts";
import { CtaBand, PageIntro } from "./Subpage";
import { authorFor, authorPath } from "@/lib/autoren";
import type { Article } from "@/lib/pages";
import { isSet } from "@/lib/site";
import { norms } from "@/lib/normen";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function ArticleView({ article }: { article: Article }) {
  const path = `/wissen/${article.slug}`;
  const headings = article.blocks.flatMap((b) => (b.type === "h2" && b.id ? [{ text: b.text, id: b.id }] : []));
  const author = authorFor(article.author);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: article.h1,
          description: article.description,
          path,
          published: article.published,
          modified: article.modified,
          about: [...new Set(article.sources.map(([k]) => norms[k].name))],
          author,
        })}
      />
      <JsonLd data={faqSchema(article.faqs)} />
      <PageIntro
        crumbs={[
          ["Wissen", "/wissen"],
          [article.h1, path],
        ]}
        kicker={article.kicker}
        title={article.h1}
      >
        {article.lead.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
        <p className="page-meta">
          {author ? (
            <>
              Von <Link href={authorPath(author)}>{author.name}</Link>
              {isSet(author.role) && <>, {author.role}</>}
            </>
          ) : (
            "Redaktion betreibermanager.de"
          )}{" "}
          · Veröffentlicht am <time dateTime={article.published}>{formatDate(article.published)}</time>
          {article.modified !== article.published && (
            <>
              {" "}
              · Aktualisiert am <time dateTime={article.modified}>{formatDate(article.modified)}</time>
            </>
          )}
        </p>
      </PageIntro>

      <section className="section page-width section-tight prose">
        {headings.length > 2 && (
          <nav className="toc" aria-label="Inhalt">
            {headings.map((h) => (
              <a key={h.id} href={`#${h.id}`}>
                {h.text}
              </a>
            ))}
          </nav>
        )}
        <ContentBlocks blocks={article.blocks} />
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <FaqList faqs={article.faqs} />
      </section>

      <section className="section page-width section-tight">
        <h2>Weiterführend</h2>
        <RelatedLinks links={article.related} />
      </section>

      <CoordinationNote href="/kontakt" />

      <section className="section page-width section-tight">
        <h2>Quellen</h2>
        <SourceList sources={article.sources} />
        <LegalNotice />
      </section>

      <CtaBand title={article.cta} />
    </>
  );
}
