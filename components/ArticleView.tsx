import ContentBlocks, { NormList, RelatedLinks } from "./ContentBlocks";
import FaqList from "./FaqList";
import JsonLd, { articleSchema, faqSchema } from "./JsonLd";
import { CtaBand, PageIntro } from "./Subpage";
import type { Article } from "@/lib/pages";
import { norms } from "@/lib/normen";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function ArticleView({ article }: { article: Article }) {
  const path = `/wissen/${article.slug}`;
  const headings = article.blocks.flatMap((b) => (b.type === "h2" && b.id ? [{ text: b.text, id: b.id }] : []));

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: article.h1,
          description: article.description,
          path,
          published: article.published,
          modified: article.modified,
          about: article.norms.map((k) => norms[k].name),
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
          Aktualisiert am <time dateTime={article.modified}>{formatDate(article.modified)}</time> · Redaktion
          betreibermanager.de
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
        <h2>Rechtsgrundlagen und Regelwerke</h2>
        <NormList keys={article.norms} />
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <FaqList faqs={article.faqs} />
        <p className="muted-note">
          Dieser Beitrag ersetzt keine Rechtsberatung und keine Gefährdungsbeurteilung. Fristen sind Richtwerte;
          verbindlich ist, was sich aus Gefährdungsbeurteilung, Herstellerangaben, Landesrecht und behördlichen Auflagen
          für Ihre Anlage ergibt.
        </p>
      </section>

      <section className="section page-width section-tight">
        <h2>Weiterführend</h2>
        <RelatedLinks links={article.related} />
      </section>

      <CtaBand title={article.cta} />
    </>
  );
}
