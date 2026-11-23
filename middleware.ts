import { NextResponse, type NextRequest } from "next/server";

// Basic Auth für /admin (ADMIN_USER / ADMIN_PASSWORD). Ohne gesetzte Werte ist /admin gesperrt.
export const config = { matcher: ["/admin/:path*"] };

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  const deny = (status: number) =>
    new NextResponse(status === 503 ? "Admin nicht konfiguriert" : "Anmeldung erforderlich", {
      status,
      headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"', "X-Robots-Tag": "noindex, nofollow" },
    });
  if (!user || !pass) return deny(503);
  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = new TextDecoder().decode(Uint8Array.from(atob(header.slice(6)), (c) => c.charCodeAt(0)));
      const i = decoded.indexOf(":");
      if (i > 0 && decoded.slice(0, i) === user && decoded.slice(i + 1) === pass) {
        const res = NextResponse.next();
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        res.headers.set("Cache-Control", "no-store");
        return res;
      }
    } catch {
      /* ungültiger Header → 401 */
    }
  }
  return deny(401);
}
