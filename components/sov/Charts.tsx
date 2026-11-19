import type { ReactNode } from "react";

// Diagramme ohne Bibliothek: Balken sind reine CSS-Breiten, Beschriftung und Werte stehen als Text daneben.
// Unter jedem Diagramm liegt dieselbe Zahlenreihe als HTML-Tabelle (in <details>, steht immer im HTML –
// lesbar für Screenreader und Crawler).

export type BarRow = { label: string; value: number; display: string };

function Bars({ rows, scaleMax, labelWidth }: { rows: BarRow[]; scaleMax: number; labelWidth?: "wide" }) {
  return (
    <ul className={`bar-chart${labelWidth === "wide" ? " bar-chart-wide" : ""}`}>
      {rows.map((r) => (
        <li key={r.label} className="bar-row">
          <span className="bar-label">{r.label}</span>
          <span className="bar-track" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${Math.max(0, Math.min(100, (r.value / scaleMax) * 100))}%` }} />
          </span>
          <span className="bar-value">{r.display}</span>
        </li>
      ))}
    </ul>
  );
}

export function DataTable({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <details className="chart-data">
      <summary>Daten als Tabelle</summary>
      <div className="table-wrap">
        <table className="data-table chart-table">
          <caption>{caption}</caption>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([first, ...rest], i) => (
              <tr key={i}>
                <th scope="row">{first}</th>
                {rest.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

/** Waagerechte Balken mit Titel, optionaler Notiz und Datentabelle */
export function BarChart({
  id,
  title,
  note,
  rows,
  scaleMax,
  table,
  labelWidth,
}: {
  id: string;
  title: string;
  note?: string;
  rows: BarRow[];
  /** Wert, der einem vollen Balken entspricht (Standard: größter Wert) */
  scaleMax?: number;
  table: { caption: string; head: string[]; rows: ReactNode[][] };
  labelWidth?: "wide";
}) {
  const max = scaleMax ?? Math.max(...rows.map((r) => r.value));
  return (
    <figure className="chart" aria-labelledby={`${id}-title`}>
      <figcaption>
        <h3 id={`${id}-title`}>{title}</h3>
        {note && <p className="chart-note">{note}</p>}
      </figcaption>
      <Bars rows={rows} scaleMax={max} labelWidth={labelWidth} />
      <DataTable {...table} />
    </figure>
  );
}

/** Kleine Vielfache: je Gruppe (z. B. KI-System) ein Balkendiagramm auf gemeinsamer Skala, darunter eine Tabelle */
export function SmallMultiples({
  id,
  title,
  note,
  groups,
  scaleMax,
  table,
}: {
  id: string;
  title: string;
  note?: string;
  groups: { name: string; rows: BarRow[] }[];
  scaleMax: number;
  table: { caption: string; head: string[]; rows: ReactNode[][] };
}) {
  return (
    <figure className="chart" aria-labelledby={`${id}-title`}>
      <figcaption>
        <h3 id={`${id}-title`}>{title}</h3>
        {note && <p className="chart-note">{note}</p>}
      </figcaption>
      <div className="small-multiples">
        {groups.map((g) => (
          <div key={g.name} className="small-multiple">
            <h4>{g.name}</h4>
            <Bars rows={g.rows} scaleMax={scaleMax} />
          </div>
        ))}
      </div>
      <DataTable {...table} />
    </figure>
  );
}
