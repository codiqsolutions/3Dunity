import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryItem extends Document {
  projectId: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription?: string;
  description?: string;
  coverImage: string;
  images: string[];
  videos?: string[];
  materials: string[];
  printingTechnology?: string;
  dimensions?: string;
  weight?: string;
  surfaceFinish?: string;
  customizationDetails?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  displayOrder: number;
  // Backward compatibility fields
  image: string;
  material?: string;
  technology?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema: Schema = new Schema(
  {
    projectId: {
      type: String,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    categorySlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    videos: {
      type: [String],
      default: [],
    },
    materials: {
      type: [String],
      default: [],
    },
    printingTechnology: {
      type: String,
      trim: true,
      default: 'FDM 3D Printing',
    },
    dimensions: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    surfaceFinish: {
      type: String,
      trim: true,
    },
    customizationDetails: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    // Backward compatibility fields stored for legacy components
    image: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    technology: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook to ensure backward compatibility fields and arrays
GalleryItemSchema.pre('save', function (this: any, next) {
  if (!this.image && this.coverImage) {
    this.image = this.coverImage;
  }
  if (!this.coverImage && this.image) {
    this.coverImage = this.image;
  }
  if ((!this.images || this.images.length === 0) && (this.coverImage || this.image)) {
    this.images = [this.coverImage || this.image];
  }
  if (!this.material && Array.isArray(this.materials) && this.materials.length > 0) {
    this.material = this.materials.join(', ');
  }
  if (!this.technology && this.printingTechnology) {
    this.technology = this.printingTechnology;
  }
  if (this.displayOrder !== undefined && this.order === undefined) {
    this.order = this.displayOrder;
  }
  next();
});

export const GalleryItem = mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
