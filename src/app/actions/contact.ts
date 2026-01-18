'use server';

import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function submitLead(data: any) {
    await dbConnect();

    // Validate data here or trust Zod on client. Zod on client is good for UX, but server validation is needed.
    // For prototype, we assume data is roughly correct.

    try {
        await Lead.create(data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
