'use server';

import dbConnect from '@/lib/db';
import Blog, { IBlog } from '@/models/Blog';
import { revalidatePath } from 'next/cache';

function generateSlug(title: string) {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export async function createBlog(data: Partial<IBlog>) {
    await dbConnect();

    if (!data.slug && data.title) {
        data.slug = generateSlug(data.title);
    }

    try {
        const blog = await Blog.create(data);
        revalidatePath('/admin/blogs');
        revalidatePath('/blogs');
        return { success: true, data: JSON.parse(JSON.stringify(blog)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateBlog(id: string, data: Partial<IBlog>) {
    await dbConnect();
    try {
        const blog = await Blog.findByIdAndUpdate(id, data, { new: true });
        revalidatePath('/admin/blogs');
        revalidatePath('/blogs');
        return { success: true, data: JSON.parse(JSON.stringify(blog)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteBlog(id: string) {
    await dbConnect();
    try {
        await Blog.findByIdAndDelete(id);
        revalidatePath('/admin/blogs');
        revalidatePath('/blogs');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getBlogs() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(blogs));
}
