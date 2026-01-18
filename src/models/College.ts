import mongoose, { Schema, Document } from 'mongoose';

export interface ICollege extends Document {
    name: string;
    slug: string;
    state: string;
    city: string;
    courses: string[];
    fees: number;
    description: string;
    images: string[];
    highestPackage?: number;
    averagePackage?: number;
    createdAt: Date;
    updatedAt: Date;
}

const CollegeSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    state: { type: String, required: true, index: true },
    city: { type: String, required: true },
    courses: { type: [String], required: true },
    fees: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    highestPackage: { type: Number },
    averagePackage: { type: Number },
}, { timestamps: true });

export default mongoose.models.College || mongoose.model<ICollege>('College', CollegeSchema);
