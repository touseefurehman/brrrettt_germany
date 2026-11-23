// Hilfen für /admin (Basic Auth über middleware.ts)

/** POST nur von der eigenen Seite zulassen (Schutz vor Cross-Site-Formularen, solange der Browser die Zugangsdaten hält) */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  return new URL(origin).host === (req.headers.get("x-forwarded-host") ?? req.headers.get("host"));
}

export const csvCell = (v: unknown) => {
  const s = String(v ?? "");
  // Formelinjektion in Tabellenprogrammen verhindern
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};

/** Einfacher CSV-Parser (Komma oder Semikolon, Anführungszeichen) */
export function parseCsv(text: string): string[][] {
  const first = text.split(/\r?\n/, 1)[0] ?? "";
  const sep = first.split(";").length > first.split(",").length ? ";" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === sep) { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((x) => x.trim())) rows.push(row.map((x) => x.trim()));
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim())) rows.push(row.map((x) => x.trim()));
  return rows;
}
