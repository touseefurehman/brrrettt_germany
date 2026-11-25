import { handlePartnerApplication } from "@/lib/partner-applications";
import { leadResponse } from "@/lib/lead-route";

export const dynamic = "force-dynamic";

export const POST = (req: Request) => leadResponse(req, handlePartnerApplication);
