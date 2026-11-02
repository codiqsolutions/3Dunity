import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  authorName: string;
  authorRole: string;
  company?: string;
  rating: number;
  comment: string;
  projectType: string;
  verifiedBuyer: boolean;
  avatarUrl: string;
  featuredOnHome: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    authorName: { type: String, required: true },
    authorRole: { type: String, required: true },
    company: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    projectType: { type: String, required: true },
    verifiedBuyer: { type: Boolean, default: true },
    avatarUrl: { type: String, default: '' },
    featuredOnHome: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>('Review', ReviewSchema);

