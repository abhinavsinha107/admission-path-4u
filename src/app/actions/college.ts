'use server';

import dbConnect from '@/lib/db';
import College, { ICollege } from '@/models/College';
import { revalidatePath } from 'next/cache';

function generateSlug(name: string) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export async function createCollege(data: Partial<ICollege>) {
    await dbConnect();

    if (!data.slug && data.name) {
        data.slug = generateSlug(data.name);
    }
    // Handle courses array if it comes as string (depending on form), but typescript says ICollege has string[].
    // We assume form sends correct data.

    try {
        const college = await College.create(data);
        revalidatePath('/admin/colleges');
        revalidatePath('/colleges');
        return { success: true, data: JSON.parse(JSON.stringify(college)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateCollege(id: string, data: Partial<ICollege>) {
    await dbConnect();
    try {
        const college = await College.findByIdAndUpdate(id, data, { new: true });
        revalidatePath('/admin/colleges');
        revalidatePath('/colleges');
        return { success: true, data: JSON.parse(JSON.stringify(college)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteCollege(id: string) {
    await dbConnect();
    try {
        await College.findByIdAndDelete(id);
        revalidatePath('/admin/colleges');
        revalidatePath('/colleges');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
