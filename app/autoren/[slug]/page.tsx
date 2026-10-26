import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd, { personSchema } from "@/components/JsonLd";
import { CtaBand, PageIntro } from "@/components/Subpage";
import { Check } from "@/components/icons";
import { authorBySlug, authorFor, authorPath, authors } from "@/lib/autoren";
import { isSet } from "@/lib/site";
import { articles } from "@/lib/wissen";

type Props = { params: Promise<{ slug: string }> };

// Profilseiten entstehen nur für Autoren mit eingetragenem Namen (lib/autoren.ts)
export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = authorBySlug((await params).slug);
  if (!author) return {};
  const path = authorPath(author);
  const title = `${author.name} – Autor bei betreibermanager.de`;
  const description = `${author.name}${isSet(author.role) ? `, ${author.role}` : ""}: Fachartikel zu Betreiberpflichten, Prüffristen und Prüforganisation.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description, type: "profile" },
  };
}

export default async function AuthorPage({ params }: Props) {
  const author = authorBySlug((await params).slug);
  if (!author) notFound();
  const path = authorPath(author);
  const written = articles.filter((a) => authorFor(a.author)?.slug === author.slug);

  return (
    <>
      <JsonLd data={personSchema(author)} />
      <PageIntro crumbs={[["Wissen", "/wissen"], [author.name, path]]} kicker="AUTOR" title={author.name}>
        {isSet(author.role) && <p>{author.role}</p>}
      </PageIntro>

      <section className="section page-width prose-grid">
        <div className="person-card">
          {author.photo ? (
            <img className="person-photo" src={author.photo} alt={`${author.name}, ${author.role}`} />
          ) : (
            <div className="person-photo" aria-hidden="true"></div>
          )}
        </div>
        <div className="prose">
          {isSet(author.bio) && (
            <>
              <h2>Werdegang</h2>
              <p>{author.bio}</p>
            </>
          )}
          {(author.qualifications.length > 0 || isSet(author.yearsOfExperience)) && (
            <>
              <h2>Qualifikation</h2>
              <ul className="check-list">
                {author.qualifications.map((q) => (
                  <li key={q}>
                    <Check size={15} /> {q}
                  </li>
                ))}
                {isSet(author.yearsOfExperience) && (
                  <li>
                    <Check size={15} /> {author.yearsOfExperience} Jahre Berufserfahrung
                  </li>
                )}
              </ul>
            </>
          )}
          {author.expertise.length > 0 && (
            <>
              <h2>Fachgebiete</h2>
              <p>{author.expertise.join(" · ")}</p>
            </>
          )}
          {written.length > 0 && (
            <>
              <h2>Artikel</h2>
              <ul>
                {written.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/wissen/${a.slug}`}>{a.h1}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
