import { formatDate } from "@/lib/rank-rent";
import { AUTHOR_LINE } from "@/lib/page-meta";

/** Sichtbare Zeile „Stand: <Datum> · Redaktion betreibermanager.de“ (wie auf den Wissensseiten) */
export default function PageStand({ iso }: { iso: string }) {
  return (
    <p className="page-meta">
      Stand: <time dateTime={iso}>{formatDate(iso)}</time> · {AUTHOR_LINE}
    </p>
  );
}
