import dbConnect from "@/lib/db";
import Lead from "@/models/Lead";
import { LeadManager } from "./lead-manager";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await dbConnect();
  const leads = await Lead.find({}).sort({ createdAt: -1 });
  const serializedLeads = JSON.parse(JSON.stringify(leads));

  return <LeadManager initialLeads={serializedLeads} />;
}
