'use server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import { revalidatePath } from 'next/cache';

export async function updateLeadStatus(id: string, status: string) {
    await dbConnect();
    await Lead.findByIdAndUpdate(id, { status });
    revalidatePath('/admin/leads');
}
