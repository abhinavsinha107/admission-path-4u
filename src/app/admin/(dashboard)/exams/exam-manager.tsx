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
import { ExamForm } from "./exam-form";
import { Plus, Pencil, Trash } from "lucide-react";
import { deleteExam } from "@/app/actions/exam";
import { IExam } from "@/models/Exam";

export function ExamManager({ initialExams }: { initialExams: any[] }) {
  const [open, setOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<any | null>(null);

  const handleAdd = () => {
    setEditingExam(null);
    setOpen(true);
  };

  const handleEdit = (exam: any) => {
    setEditingExam(exam);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this exam?")) {
      await deleteExam(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Exams</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Exam
        </Button>
      </div>

      <div className="border rounded-md bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialExams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  No exams found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              initialExams.map((exam) => (
                <TableRow key={exam._id}>
                  <TableCell className="font-medium">{exam.name}</TableCell>
                  <TableCell>
                    {new Date(exam.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{exam.listing_mode}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(exam)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(exam._id)}
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
              {editingExam ? "Edit Exam" : "Add New Exam"}
            </SheetTitle>
            <SheetDescription>
              {editingExam
                ? "Make changes to the exam details here."
                : "Fill in the details for the new exam."}
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <ExamForm exam={editingExam} onSuccess={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
