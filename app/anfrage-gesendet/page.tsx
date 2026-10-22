import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/Subpage";
import { site } from "@/lib/site";

// Bestätigungsseite mit eigener URL (Lastenheft L-06): Ziel-URL für die Conversion-Messung in GA4.
export const metadata: Metadata = {
  title: "Anfrage gesendet | betreibermanager.de",
  alternates: { canonical: "/anfrage-gesendet" },
  robots: { index: false, follow: true },
};

export default function AnfrageGesendetPage() {
  return (
    <>
      <PageIntro crumbs={[["Anfrage gesendet", "/anfrage-gesendet"]]} kicker="VIELEN DANK" title="Ihre Anfrage ist bei uns eingegangen">
        <p>
          Wir melden uns innerhalb eines Werktags bei Ihnen, um den Umfang der Bestandsaufnahme abzustimmen. Falls Sie
          Unterlagen wie Anlagenlisten oder Prüfberichte bereits zur Hand haben, können Sie diese an{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> senden.
        </p>
      </PageIntro>
      <section className="section page-width section-tight prose">
        <h2>Bis dahin</h2>
        <p>
          <Link href="/prueffristen">Prüffristen im Überblick</Link> ·{" "}
          <Link href="/wissen/betreiberpflichtenkataster-erstellen">Betreiberpflichtenkataster erstellen</Link> ·{" "}
          <Link href="/">Zur Startseite</Link>
        </p>
      </section>
    </>
  );
}
