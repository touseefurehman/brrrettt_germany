import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/Subpage";

export const metadata: Metadata = { title: { absolute: "Bestätigung | betreibermanager.de" }, robots: { index: false, follow: false } };

export default async function Bestaetigt({ searchParams }: { searchParams: Promise<{ ungueltig?: string }> }) {
  const bad = Boolean((await searchParams).ungueltig);
  return (
    <PageIntro
      crumbs={[["Nullmessung", "/nullmessung/bestaetigt"]]}
      kicker="NULLMESSUNG"
      title={bad ? "Link ungültig" : "E-Mail bestätigt"}
    >
      <p>
        {bad
          ? "Dieser Bestätigungslink ist ungültig oder abgelaufen. Bitte fordern Sie die Nullmessung erneut an."
          : "Danke. Ihre Nullmessung folgt, sobald die Erhebung für Ihr Feld abgeschlossen ist. Wir melden uns per E-Mail."}
      </p>
      <p>
        <Link href="/fachpartner">Zur Fachpartner-Übersicht</Link>
      </p>
    </PageIntro>
  );
}
