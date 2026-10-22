import type { Metadata } from "next";
import ServicePageView from "@/components/ServicePageView";
import { externerBetreibermanager as page } from "@/lib/leistungen";

const path = "/externer-betreibermanager";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: path },
  openGraph: { url: path, title: page.title, description: page.description },
};

export default function ExternerBetreibermanagerPage() {
  return <ServicePageView page={page} path={path} crumbs={[[page.name, path]]} />;
}
