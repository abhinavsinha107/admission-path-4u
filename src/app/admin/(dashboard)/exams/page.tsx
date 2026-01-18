import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import { ExamManager } from "./exam-manager";

export const dynamic = "force-dynamic";

export default async function AdminExamsPage() {
  await dbConnect();
  const exams = await Exam.find({}).sort({ date: 1 });
  const serializedExams = JSON.parse(JSON.stringify(exams));

  return <ExamManager initialExams={serializedExams} />;
}
