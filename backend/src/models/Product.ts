import mongoose, { Document, Schema } from 'mongoose';

export interface IProductColor {
  name: string;
  hex: string;
  priceModifier?: number;
  image?: string;
}

export interface ISizeOption {
  name: string;
  dimensions: string;
  priceModifier: number;
}

export interface IMaterialOption {
  material: string;
  priceModifier: number;
  description: string;
}

export interface ICustomizationOptions {
  allowCustomText: boolean;
  maxTextLength: number;
  allowFileUpload: boolean;
  allowCustomDimensions: boolean;
  materialOptions: IMaterialOption[];
  colorOptions: IProductColor[];
}

export interface ITechnicalSpecifications {
  layerHeight: string;
  infillPercentage: string;
  durability: string;
  recommendedUsage: string;
  manufacturingTime: string;
}

export interface I3dSpecs {
  technology: 'FDM' | 'SLA Resin' | 'SLS' | 'Multi-Material';
  layerResolution: string;
  printTime: string;
  weightGrams: number;
  dimensionsMm: {
    length: number;
    width: number;
    height: number;
  };
  infill: string;
  availableMaterials: string[];
  colors: IProductColor[];
}

export interface IProduct extends Document {
  productId: string; // e.g. '3DM001'
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string; // Category slug or id
  categoryName: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  material: string; // 'PLA' | 'ABS' | 'PETG' | 'Resin' | 'Other'
  rating: number;
  reviewCount: number;
  images: string[];
  videos?: string[];
  model3DUrl?: string;
  thumbnail: string;
  specs: I3dSpecs;
  sizeOptions?: ISizeOption[];
  dimensions?: string;
  weight?: string;
  surfaceFinish?: string;
  waterproof?: boolean;
  printingTechnology?: string;
  technicalSpecifications?: ITechnicalSpecifications;
  productionTime?: string;
  shippingCharges?: number;
  customizationOptions?: ICustomizationOptions;
  stock: number;
  stockStatus: 'in-stock' | 'made-to-order' | 'out-of-stock';
  customizationAvailable: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  badge?: string;
  tags: string[];
  cadFileAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductColorSchema = new Schema<IProductColor>(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
    priceModifier: { type: Number, default: 0 },
    image: { type: String },
  },
  { _id: false }
);

const SizeOptionSchema = new Schema<ISizeOption>(
  {
    name: { type: String, required: true },
    dimensions: { type: String, required: true },
    priceModifier: { type: Number, default: 0 },
  },
  { _id: false }
);

const MaterialOptionSchema = new Schema<IMaterialOption>(
  {
    material: { type: String, required: true },
    priceModifier: { type: Number, default: 0 },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const CustomizationOptionsSchema = new Schema<ICustomizationOptions>(
  {
    allowCustomText: { type: Boolean, default: true },
    maxTextLength: { type: Number, default: 50 },
    allowFileUpload: { type: Boolean, default: true },
    allowCustomDimensions: { type: Boolean, default: true },
    materialOptions: [MaterialOptionSchema],
    colorOptions: [ProductColorSchema],
  },
  { _id: false }
);

const TechnicalSpecificationsSchema = new Schema<ITechnicalSpecifications>(
  {
    layerHeight: { type: String, default: '0.12mm' },
    infillPercentage: { type: String, default: '20% Gyroid' },
    durability: { type: String, default: 'High Rigidity' },
    recommendedUsage: { type: String, default: 'Indoor Display' },
    manufacturingTime: { type: String, default: '1–2 Days' },
  },
  { _id: false }
);

const SpecsSchema = new Schema<I3dSpecs>(
  {
    technology: {
      type: String,
      enum: ['FDM', 'SLA Resin', 'SLS', 'Multi-Material'],
      default: 'FDM',
    },
    layerResolution: { type: String, default: '0.12mm Precision' },
    printTime: { type: String, default: '6h 30m' },
    weightGrams: { type: Number, default: 150 },
    dimensionsMm: {
      length: { type: Number, default: 100 },
      width: { type: Number, default: 100 },
      height: { type: Number, default: 100 },
    },
    infill: { type: String, default: '20% Gyroid' },
    availableMaterials: [{ type: String }],
    colors: [ProductColorSchema],
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    productId: { type: String, default: '3DM001', index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    categoryName: { type: String, required: true },
    subcategory: { type: String },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    discountPrice: { type: Number },
    material: { type: String, default: 'PLA', index: true },
    rating: { type: Number, default: 5.0, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    videos: [{ type: String }],
    model3DUrl: { type: String },
    thumbnail: { type: String, required: true },
    specs: { type: SpecsSchema, required: true },
    sizeOptions: [SizeOptionSchema],
    dimensions: { type: String, default: '15 × 12 × 18 cm' },
    weight: { type: String, default: '220 g' },
    surfaceFinish: { type: String, default: 'Matte' },
    waterproof: { type: Boolean, default: false },
    printingTechnology: { type: String, default: 'FDM Precision Extrusion' },
    technicalSpecifications: { type: TechnicalSpecificationsSchema },
    productionTime: { type: String, default: '2–3 Business Days' },
    shippingCharges: { type: Number, default: 0 },
    customizationOptions: { type: CustomizationOptionsSchema },
    stock: { type: Number, default: 25 },
    stockStatus: {
      type: String,
      enum: ['in-stock', 'made-to-order', 'out-of-stock'],
      default: 'in-stock',
      index: true,
    },
    customizationAvailable: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    badge: { type: String, default: '' },
    tags: [{ type: String }],
    cadFileAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
