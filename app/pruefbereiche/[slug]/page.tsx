import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd, { serviceSchema } from "@/components/JsonLd";
import { CoordinationNote, InquirySection, LegalNotice } from "@/components/PageParts";
import { DeadlineTable, PageIntro } from "@/components/Subpage";
import { Check } from "@/components/icons";
import { areaBySlug, areaPath, areas, isMovedArea } from "@/lib/content";
import { leistungsseiten } from "@/lib/leistungsseiten";
import { articlesForArea } from "@/lib/wissen";

// Prüfbereiche ohne eigene Leistungsseite auf oberster Ebene. Elektrotechnik und Lüftung liegen unter
// /dguv-v3-pruefung bzw. /vdi-6022 (301-Weiterleitung in next.config.ts).
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.filter((a) => !isMovedArea(a.slug)).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = areaBySlug((await params).slug);
  if (!area) return {};
  const path = `/pruefbereiche/${area.slug}`;
  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: path },
    openGraph: { url: path, title: area.title, description: area.description },
  };
}

export default async function AreaPage({ params }: Props) {
  const area = areaBySlug((await params).slug);
  if (!area || isMovedArea(area.slug)) notFound();
  const path = `/pruefbereiche/${area.slug}`;
  const others = areas.filter((a) => a.slug !== area.slug);
  const related = articlesForArea(area.slug);
  const fireExtinguishers = area.slug === "brandschutz" && leistungsseiten.find((p) => p.slug === "feuerloescher-pruefung");

  return (
    <>
      <JsonLd data={serviceSchema(area.serviceType, area.description, path, area.name)} />
      <PageIntro crumbs={[["Prüfbereiche", "/#pruefbereiche"], [area.name, path]]} kicker="PRÜFBEREICH" title={area.h1}>
        {area.intro.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </PageIntro>

      <section className="section page-width prose-grid">
        <div>
          <h2>Was geprüft wird</h2>
          <ul className="check-list">
            {area.scope.map((s) => (
              <li key={s}>
                <Check size={15} /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Was wir übernehmen</h2>
          <ol className="task-list">
            {area.tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <p className="muted-note">
            Die gesetzliche Betreiberverantwortung verbleibt beim Betreiber. Wir übernehmen Ermittlung, Organisation,
            Koordination und Dokumentation. <Link href="/betreiberverantwortung">Was Betreiberverantwortung umfasst</Link>
          </p>
        </div>
      </section>

      <section className="section page-width section-tight">
        <h2>Prüffristen {area.name}</h2>
        <DeadlineTable rows={area.rows} />
        <p className="muted-note">
          Richtwerte und Höchstfristen. Die verbindliche Frist ergibt sich aus der Gefährdungsbeurteilung, Herstellerangaben
          und gegebenenfalls Landesrecht. <Link href="/prueffristen">Alle Prüffristen im Überblick</Link>
        </p>
        {fireExtinguishers && (
          <Link href={`/${fireExtinguishers.slug}`} className="text-link">
            Feuerlöscher-Prüfung: Pflicht, Frist und Nachweis
          </Link>
        )}
      </section>

      {related.length > 0 && (
        <section className="section page-width section-tight">
          <h2>Fachartikel zum Thema</h2>
          <div className="link-cards three">
            {related.map((a) => (
              <Link key={a.slug} href={`/wissen/${a.slug}`}>
                <strong>{a.h1}</strong>
                <p>{a.teaser}</p>
                <span>Artikel lesen</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section page-width section-tight">
        <h2>Weitere Prüfbereiche</h2>
        <div className="link-cards">
          {others.map((a) => (
            <Link key={a.slug} href={areaPath(a.slug)}>
              <strong>{a.name}</strong>
              <span>{a.norm}</span>
            </Link>
          ))}
        </div>
      </section>

      <CoordinationNote />
      <InquirySection title={`${area.name}: Prüfungen koordinieren lassen.`} source={path} />
      <section className="section page-width section-tight">
        <LegalNotice />
      </section>
    </>
  );
}
