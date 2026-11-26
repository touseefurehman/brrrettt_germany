import { NextResponse } from "next/server";
import { adminUser, sameOrigin } from "@/lib/admin";
import { approveApplication, deleteApplication, setApplicationNotes, setApplicationStatus } from "@/lib/partner-applications";
import { applicationStatuses, type ApplicationStatus } from "@/lib/partner-options";

export const dynamic = "force-dynamic";

// Aktionen aus /admin/partner/<id>: Statuswechsel, Freigabe (mit Bestätigung), Notizen, endgültiges Löschen (mit Bestätigung)
export async function POST(req: Request) {
  if (!sameOrigin(req)) return new NextResponse("Forbidden", { status: 403 });
  const fd = await req.formData();
  const id = String(fd.get("id") ?? "");
  const action = String(fd.get("action") ?? "");
  const actor = adminUser(req);
  const confirmed = fd.get("confirm") === "yes";
  const base = req.headers.get("origin") ?? req.url;
  if (!id) return new NextResponse("Ungültig", { status: 400 });

  let r: { ok: true } | { ok: false; message: string };
  if (action === "status") {
    const status = String(fd.get("status") ?? "") as ApplicationStatus;
    // „aktiv“ nie über die Auswahl – nur über „Freigeben“
    r = applicationStatuses.includes(status) && status !== "aktiv" ? await setApplicationStatus(id, status, actor) : { ok: false, message: "Ungültiger Status." };
  } else if (action === "approve") {
    r = confirmed ? await approveApplication(id, actor) : { ok: false, message: "Bitte die Freigabe bestätigen." };
  } else if (action === "notes") {
    r = await setApplicationNotes(id, String(fd.get("notes") ?? ""), actor);
  } else if (action === "delete") {
    if (!confirmed) r = { ok: false, message: "Bitte das Löschen bestätigen." };
    else {
      r = await deleteApplication(id, "manuell", actor);
      if (r.ok) return NextResponse.redirect(new URL("/admin/partner", base), 303);
    }
  } else r = { ok: false, message: "Unbekannte Aktion." };

  const url = new URL(`/admin/partner/${encodeURIComponent(id)}`, base);
  if (!r.ok) url.searchParams.set("fehler", r.message);
  return NextResponse.redirect(url, 303);
}
