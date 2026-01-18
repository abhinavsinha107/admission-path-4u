import mongoose, { Document, Schema } from 'mongoose';

export interface IExam extends Document {
    name: string;
    slug: string;
    date: Date;
    description: string;
    eligibility: string;
    listing_mode: 'Online' | 'Offline';
    createdAt: Date;
    updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
    {
        name: {
            type: String,
            required: [true, 'Please provide an exam name'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        slug: {
            type: String,
            unique: true,
        },
        date: {
            type: Date,
            required: [true, 'Please provide an exam date'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        eligibility: {
            type: String,
            required: [true, 'Please provide eligibility criteria'],
        },
        listing_mode: {
            type: String,
            enum: ['Online', 'Offline'],
            default: 'Online',
        },
    },
    { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);
