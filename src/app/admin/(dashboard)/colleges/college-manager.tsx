"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CollegeForm } from "./college-form";
import { Plus, Pencil, Trash } from "lucide-react";
import { deleteCollege } from "@/app/actions/college";

export function CollegeManager({
  initialColleges,
}: {
  initialColleges: any[];
}) {
  const [open, setOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState<any | null>(null);

  const handleAdd = () => {
    setEditingCollege(null);
    setOpen(true);
  };

  const handleEdit = (college: any) => {
    setEditingCollege(college);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this college?")) {
      await deleteCollege(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Colleges</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add College
        </Button>
      </div>

      <div className="border rounded-md bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>State</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialColleges.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  No colleges found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              initialColleges.map((college) => (
                <TableRow key={college._id}>
                  <TableCell className="font-medium">{college.name}</TableCell>
                  <TableCell>{college.state}</TableCell>
                  <TableCell>{college.city}</TableCell>
                  <TableCell>₹{college.fees}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(college)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(college._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="overflow-y-auto sm:max-w-xl w-full px-8"
        >
          <SheetHeader>
            <SheetTitle>
              {editingCollege ? "Edit College" : "Add New College"}
            </SheetTitle>
            <SheetDescription>
              {editingCollege
                ? "Make changes to the college details here."
                : "Fill in the details for the new college."}
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <CollegeForm
              college={editingCollege}
              onSuccess={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
