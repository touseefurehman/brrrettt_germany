import Link from "next/link";
import { int, latestReport, pct, reportPath } from "@/lib/sov";

/** Kleine Linkbox auf den neuesten Report (Elektroprüfung-Hub, Partnerseite) */
export default function ReportTeaser({ label, text }: { label: string; text?: string }) {
  const r = latestReport;
  const m = r.methodology;
  return (
    <aside className="sov-teaser">
      <span className="short-answer-label">{label}</span>
      <Link href={reportPath(r)}>
        <strong>{r.title}</strong>
      </Link>
      <p>
        {text ??
          `${int(m.citations)} Quellenangaben aus ${int(m.runs)} Antworten von ${m.engines.join(", ")}: Keine Quelle erreicht mehr als ${pct(r.keyFindings.maxSingleShare)} Share of Voice.`}
      </p>
    </aside>
  );
}
