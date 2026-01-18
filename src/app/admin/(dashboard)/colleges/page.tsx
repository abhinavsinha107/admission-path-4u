import dbConnect from "@/lib/db";
import College from "@/models/College";
import { CollegeManager } from "./college-manager";

export const dynamic = "force-dynamic";

export default async function AdminCollegesPage() {
  await dbConnect();
  const colleges = await College.find({}).sort({ createdAt: -1 });
  const serializedColleges = JSON.parse(JSON.stringify(colleges));

  return <CollegeManager initialColleges={serializedColleges} />;
}
