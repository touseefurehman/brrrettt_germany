import clusterData from "@/content/clusters.json";
import { reportBySlug } from "@/lib/sov";

// Cluster = ein Marktfeld mit eigenem KI-Report, eigener Fachpartner-Seite und genau einem bundesweiten Partnerplatz.
// Einzige Quelle: content/clusters.json. Entwürfe (status "draft") sind in Produktion nicht erreichbar (404).

export type PartnerStatus = "frei" | "reserviert" | "vergeben";

export type Cluster = {
  slug: string;
  name: string;
  /** Thema in Fragen, z. B. „DGUV-V3-Prüfung“ */
  topicLabel: string;
  /** null, solange es noch keinen Report gibt */
  reportSlug: string | null;
  status: "published" | "draft";
  partnerStatus: PartnerStatus;
  partnerName: string | null;
  priceLabel: string;
  latestMeasurementFile: string | null;
  promptSetFile: string;
  /** Bestehende Informationsseite des Prüfbereichs (Ziel der Karte, solange keine Partnerseite veröffentlicht ist) */
  existingPage: string | null;
};

export const clusters = clusterData as Cluster[];
export const publishedClusters = clusters.filter((c) => c.status === "published");

export const CLUSTER_BASE = "/fachpartner";
export const clusterPath = (c: { slug: string }) => `${CLUSTER_BASE}/${c.slug}`;
/** Frühere Cluster-Slugs (vor der Umstellung auf 6 Prüfbereiche) → heutiger Slug; bestehende Leads bleiben erhalten */
export const LEGACY_CLUSTERS: Record<string, string> = { pruefdienste: "dguv-v3" };
export const canonicalCluster = (slug: string) => LEGACY_CLUSTERS[slug] ?? slug;
export const clusterBySlug = (slug: string) => clusters.find((c) => c.slug === canonicalCluster(slug));
export const publishedClusterBySlug = (slug: string) => publishedClusters.find((c) => c.slug === canonicalCluster(slug));
export const clusterForReport = (reportSlug: string) => publishedClusters.find((c) => c.reportSlug === reportSlug);

export const partnerStatusLabel: Record<PartnerStatus, string> = {
  frei: "Platz frei",
  reserviert: "Platz reserviert",
  vergeben: "Platz vergeben",
};

const slugs = new Set<string>();
for (const c of clusters) {
  if (slugs.has(c.slug)) throw new Error(`content/clusters.json: Slug doppelt (${c.slug})`);
  slugs.add(c.slug);
  if (!(c.partnerStatus in partnerStatusLabel)) throw new Error(`content/clusters.json: ${c.slug}: unbekannter partnerStatus`);
  if (c.status === "published" && (!c.reportSlug || !reportBySlug(c.reportSlug))) {
    throw new Error(`content/clusters.json: ${c.slug} ist veröffentlicht, aber der Report ${c.reportSlug} existiert nicht`);
  }
}
