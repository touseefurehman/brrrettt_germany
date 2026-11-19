import { ImageResponse } from "next/og";
import { int, pct, reportBySlug, reports } from "@/lib/sov";

// OG-Bild je Report: Titel und die vier Kennzahlen (Stil wie app/opengraph-image.tsx)
export const alt = "KI-Report von betreibermanager.de";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export default async function ReportOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const r = reportBySlug((await params).slug) ?? reports[0];
  const stats: [string, string][] = [
    [int(r.methodology.citations), "KI-Zitationen"],
    [int(r.methodology.runs), "KI-Antworten"],
    [int(r.methodology.uniqueDomains), "zitierte Domains"],
    [pct(r.keyFindings.maxSingleShare), "höchster Share of Voice"],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#173f33",
          color: "#f7faf8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
          <div
            style={{
              width: 48,
              height: 52,
              borderRadius: 6,
              background: "#c4e48a",
              color: "#173f33",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
            }}
          >
            B
          </div>
          betreibermanager.de · {r.shortTitle}
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 600, lineHeight: 1.15 }}>{r.title}</div>
        <div style={{ display: "flex", gap: 24 }}>
          {stats.map(([value, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "20px 24px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontSize: 52, fontWeight: 700, color: "#c4e48a" }}>{value}</div>
              <div style={{ fontSize: 22, color: "#cfd8d3" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
