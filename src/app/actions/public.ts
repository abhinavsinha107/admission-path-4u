'use server';

import dbConnect from '@/lib/db';
import College from '@/models/College';
import Exam from '@/models/Exam';
import Blog from '@/models/Blog';
import Lead from '@/models/Lead';

export async function getBlogs(searchParams: { [key: string]: string | string[] | undefined }) {
    await dbConnect();
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (searchParams.search) {
        query.title = { $regex: searchParams.search as string, $options: 'i' };
    }

    const blogs = await Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Blog.countDocuments(query);

    return {
        blogs: JSON.parse(JSON.stringify(blogs)),
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
}

export async function getBlogBySlug(slug: string) {
    await dbConnect();
    const blog = await Blog.findOne({ slug });
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
}


export async function getExams(searchParams: { [key: string]: string | string[] | undefined }) {
    await dbConnect();
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (searchParams.search) {
        query.name = { $regex: searchParams.search as string, $options: 'i' };
    }

    const exams = await Exam.find(query)
        .sort({ date: 1 })
        .skip(skip)
        .limit(limit);

    const total = await Exam.countDocuments(query);

    return {
        exams: JSON.parse(JSON.stringify(exams)),
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
}

export async function getExamBySlug(slug: string) {
    await dbConnect();
    const exam = await Exam.findOne({ slug });
    if (!exam) return null;
    return JSON.parse(JSON.stringify(exam));
}


export async function getColleges(searchParams: { [key: string]: string | string[] | undefined }) {
    await dbConnect();

    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (searchParams.state) {
        query.state = { $regex: searchParams.state as string, $options: 'i' };
    }
    if (searchParams.city) {
        query.city = { $regex: searchParams.city as string, $options: 'i' };
    }
    if (searchParams.course) {
        query.courses = { $regex: searchParams.course as string, $options: 'i' };
    }
    if (searchParams.search) {
        query.name = { $regex: searchParams.search as string, $options: 'i' };
    }

    const colleges = await College.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await College.countDocuments(query);

    return {
        colleges: JSON.parse(JSON.stringify(colleges)),
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
}

export async function getCollegeBySlug(slug: string) {
    await dbConnect();
    const college = await College.findOne({ slug });
    if (!college) return null;
    return JSON.parse(JSON.stringify(college));
}

export async function getFeaturedColleges() {
    await dbConnect();
    // For now, just return latest 6
    const colleges = await College.find({}).sort({ createdAt: -1 }).limit(6);
    return JSON.parse(JSON.stringify(colleges));
}

export async function getTopColleges() {
    await dbConnect();
    // Sort by highestPackage desc, limit to 3
    const colleges = await College.find({}).sort({ highestPackage: -1 }).limit(3);
    return JSON.parse(JSON.stringify(colleges));
}

export async function getRecentExams() {
    await dbConnect();
    // Upcoming exams (date >= now), sort by date asc, limit 3
    // For simplicity, just showing latest created or nearest date
    const exams = await Exam.find({}).sort({ date: 1 }).limit(3);
    return JSON.parse(JSON.stringify(exams));
}

export async function getRecentBlogs() {
    await dbConnect();
    // Sort by createdAt desc, limit 3
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(3);
    return JSON.parse(JSON.stringify(blogs));
}

export async function getUniqueCourses() {
    await dbConnect();
    // Aggregation to get unique courses
    const courses = await College.distinct("courses");
    return courses.sort(); // Sort alphabetically
}

export async function createLead(formData: FormData) {
    await dbConnect();

    // Extract data
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('mobile') as string;
    const message = formData.get('message') as string;

    // Combine names
    const name = `${firstName} ${lastName}`.trim();

    // Validations (Basic)
    if (!firstName || !email || !phone) {
        return { success: false, error: "Name, Email and Phone are required" };
    }

    try {
        await Lead.create({
            name,
            email,
            phone,
            message,
            state: 'General', // Default since not in form
            interestedCourse: 'General' // Default since not in form
        });
        return { success: true };
    } catch (error) {
        console.error("Error creating lead:", error);
        return { success: false, error: "Failed to submit form" };
    }
}
