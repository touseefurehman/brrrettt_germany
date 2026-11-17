import { handlePartnerRequest } from "@/lib/leads";
import { leadResponse } from "@/lib/lead-route";

export const dynamic = "force-dynamic";

export const POST = (req: Request) => leadResponse(req, handlePartnerRequest);
