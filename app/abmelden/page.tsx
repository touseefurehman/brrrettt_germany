import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/Subpage";

export const metadata: Metadata = { title: { absolute: "Abgemeldet | betreibermanager.de" }, robots: { index: false, follow: false } };

export default async function Abgemeldet({ searchParams }: { searchParams: Promise<{ ungueltig?: string }> }) {
  const bad = Boolean((await searchParams).ungueltig);
  return (
    <PageIntro crumbs={[["Abmeldung", "/abmelden"]]} kicker="NULLMESSUNG" title={bad ? "Link ungültig" : "Sie sind abgemeldet"}>
      <p>
        {bad
          ? "Dieser Abmeldelink ist ungültig oder abgelaufen. Schreiben Sie uns kurz, dann tragen wir Sie aus."
          : "Wir senden Ihnen keine weiteren Nachrichten zur Nullmessung."}
      </p>
      <p>
        <Link href="/">Zur Startseite</Link>
      </p>
    </PageIntro>
  );
}
