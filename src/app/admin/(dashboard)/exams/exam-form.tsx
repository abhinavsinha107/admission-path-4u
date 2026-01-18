"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExam, updateExam } from "@/app/actions/exam";
import { Loader2 } from "lucide-react";
import { IExam } from "@/models/Exam";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  date: z.string().min(1, "Date is required"), // Validate as string for input[type=date]
  description: z.string().min(10, "Description is required"),
  eligibility: z.string().min(5, "Eligibility criteria is required"),
  listing_mode: z.enum(["Online", "Offline"]),
});

interface ExamFormProps {
  exam?: IExam;
  onSuccess: () => void;
}

export function ExamForm({ exam, onSuccess }: ExamFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: exam?.name || "",
      date: exam?.date ? new Date(exam.date).toISOString().split("T")[0] : "",
      description: exam?.description || "",
      eligibility: exam?.eligibility || "",
      listing_mode: (exam?.listing_mode as "Online" | "Offline") || "Online",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        date: new Date(values.date),
      };

      if (exam?._id) {
        const res = await updateExam(exam._id as unknown as string, data);
        if (!res.success) throw new Error(res.error);
      } else {
        const res = await createExam(data);
        if (!res.success) throw new Error(res.error);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. JEE Mains 2026" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing_mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="eligibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eligibility</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g. 12th Pass with PCM..."
                  className="min-h-[80px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Detailed description of the exam..."
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {exam ? "Update Exam" : "create Exam"}
        </Button>
      </form>
    </Form>
  );
}
