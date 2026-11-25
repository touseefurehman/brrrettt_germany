import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/admin";
import { applicationStatuses, setApplicationStatus, type ApplicationStatus } from "@/lib/partner-applications";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return new NextResponse("Forbidden", { status: 403 });
  const fd = await req.formData();
  const status = String(fd.get("status") ?? "") as ApplicationStatus;
  const id = String(fd.get("id") ?? "");
  if (!id || !applicationStatuses.includes(status)) return new NextResponse("Ungültig", { status: 400 });
  await setApplicationStatus(id, status);
  return NextResponse.redirect(new URL("/admin/partner", req.headers.get("origin") ?? req.url), 303);
}
