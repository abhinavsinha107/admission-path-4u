"use client";

import { ILead } from "@/models/Lead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateLeadStatus } from "@/app/actions/lead";

import { Badge } from "@/components/ui/badge"; // Need to add badge shadecn

// I'll use native date for now to avoid installing date-fns if not needed, or install if I want it nice.
// "Modern dashboard layout" implies nice date formatting.
// I'll use new Date().toLocaleDateString()

export function LeadManager({ initialLeads }: { initialLeads: any[] }) {
  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateLeadStatus(id, newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "contacted":
        return "bg-yellow-500";
      case "enrolled":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
      <div className="border rounded-md bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No leads yet.
                </TableCell>
              </TableRow>
            ) : (
              initialLeads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.interestedCourse}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={lead.status}
                      onValueChange={(val) => handleStatusChange(lead._id, val)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="enrolled">Enrolled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
