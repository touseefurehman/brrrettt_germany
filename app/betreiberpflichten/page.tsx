import type { Metadata } from "next";
import ServicePageView from "@/components/ServicePageView";
import { leistungsseiteBySlug } from "@/lib/leistungsseiten";

const page = leistungsseiteBySlug("betreiberpflichten")!;
const path = "/betreiberpflichten";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: path },
  openGraph: { url: path, title: page.title, description: page.description },
};

export default function BetreiberpflichtenPage() {
  return <ServicePageView page={page} path={path} crumbs={[[page.name, path]]} />;
}
