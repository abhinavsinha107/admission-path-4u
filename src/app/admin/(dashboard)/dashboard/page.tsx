import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dbConnect from "@/lib/db";
import College from "@/models/College";
import Lead from "@/models/Lead";
import { School, Users, UserPlus } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  await dbConnect();
  const collegeCount = await College.countDocuments();
  const leadCount = await Lead.countDocuments();
  const newLeadsCount = await Lead.countDocuments({ status: "new" });

  return { collegeCount, leadCount, newLeadsCount };
}

export default async function AdminDashboardPage() {
  const { collegeCount, leadCount, newLeadsCount } = await getStats();

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Colleges
            </CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collegeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newLeadsCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
