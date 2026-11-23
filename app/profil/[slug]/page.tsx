import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/Subpage";
import { PROFILE_PAGES_ENABLED } from "@/lib/flags";

// Vorbereiteter Seitentyp, hinter dem Feature-Flag PROFILE_PAGES_ENABLED (Standard: aus → 404).
// Auch bei eingeschaltetem Flag: noindex, nicht in der Sitemap, kein Inhalt zu Unternehmen, bis die rechtliche Prüfung umgesetzt ist.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ProfilePage() {
  if (!PROFILE_PAGES_ENABLED) notFound();
  return (
    <PageIntro crumbs={[["Profil", "#"]]} kicker="VORBEREITET" title="Profilseiten sind noch nicht umgesetzt">
      <p>Dieser Seitentyp ist vorbereitet, zeigt aber bewusst keine Unternehmensdaten.</p>
    </PageIntro>
  );
}
