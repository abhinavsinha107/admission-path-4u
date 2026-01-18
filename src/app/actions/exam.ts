'use server';

import dbConnect from '@/lib/db';
import Exam, { IExam } from '@/models/Exam';
import { revalidatePath } from 'next/cache';

function generateSlug(name: string) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export async function createExam(data: Partial<IExam>) {
    await dbConnect();

    if (!data.slug && data.name) {
        data.slug = generateSlug(data.name);
    }

    try {
        const exam = await Exam.create(data);
        revalidatePath('/admin/exams');
        revalidatePath('/exams');
        return { success: true, data: JSON.parse(JSON.stringify(exam)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateExam(id: string, data: Partial<IExam>) {
    await dbConnect();
    try {
        const exam = await Exam.findByIdAndUpdate(id, data, { new: true });
        revalidatePath('/admin/exams');
        revalidatePath('/exams');
        return { success: true, data: JSON.parse(JSON.stringify(exam)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteExam(id: string) {
    await dbConnect();
    try {
        await Exam.findByIdAndDelete(id);
        revalidatePath('/admin/exams');
        revalidatePath('/exams');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getExams() {
    await dbConnect();
    const exams = await Exam.find({}).sort({ date: 1 });
    return JSON.parse(JSON.stringify(exams));
}
