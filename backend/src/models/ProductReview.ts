import mongoose, { Document, Schema } from 'mongoose';

export interface IProductReview extends Document {
  productId: mongoose.Types.ObjectId;
  productSlug: string;
  userName: string;
  userEmail?: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  images?: string[];
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductReviewSchema = new Schema<IProductReview>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    productSlug: { type: String, required: true, index: true },
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, trim: true, lowercase: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true, default: '' },
    comment: { type: String, required: true, trim: true },
    verifiedPurchase: { type: Boolean, default: true },
    images: [{ type: String }],
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProductReview = mongoose.model<IProductReview>('ProductReview', ProductReviewSchema);

