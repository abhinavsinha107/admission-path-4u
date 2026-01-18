import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: string;
    main_image: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: [true, 'Please provide a blog title'],
            maxlength: [120, 'Title cannot be more than 120 characters'],
        },
        slug: {
            type: String,
            unique: true,
        },
        content: {
            type: String,
            required: [true, 'Please provide blog content'],
        },
        excerpt: {
            type: String,
            required: [true, 'Please provide a short excerpt'],
            maxlength: [300, 'Excerpt cannot be more than 300 characters'],
        },
        author: {
            type: String,
            required: [true, 'Please provide an author name'],
        },
        main_image: {
            type: String,
            required: [true, 'Please provide a main image'],
        },
    },
    { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
