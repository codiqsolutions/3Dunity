import mongoose, { Document, Schema } from 'mongoose';

export interface IUploadedFile {
  originalName: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  fileType: '3d-model' | 'reference-image' | 'spec-doc';
}

export interface ICustomRequest extends Document {
  productId?: string;
  productName?: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  projectTitle: string;
  projectDescription: string;
  technology: 'FDM' | 'SLA Resin' | 'SLS' | 'Direct Metal (DMLS)' | 'Consultant Recommendation';
  material: string;
  colorPreference: string;
  dimensions?: string;
  customText?: string;
  referenceImageUrls?: string[];
  uploadedFileUrls?: string[];
  specialInstructions?: string;
  infillPercentage: number;
  surfaceFinish: 'Raw / As-Printed' | 'Sanded Smooth' | 'Vapor Smoothed' | 'Primer & Painted' | 'Electroplated';
  quantity: number;
  toleranceRequirement: string;
  uploadedFiles: IUploadedFile[];
  estimatedPrice?: number;
  estimatedTurnaroundDays?: number;
  status: 'pending_review' | 'quoted' | 'approved' | 'in_production' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UploadedFileSchema = new Schema<IUploadedFile>(
  {
    originalName: { type: String, required: true },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, required: true },
    fileType: {
      type: String,
      enum: ['3d-model', 'reference-image', 'spec-doc'],
      default: '3d-model',
    },
  },
  { _id: false }
);

const CustomRequestSchema = new Schema<ICustomRequest>(
  {
    productId: { type: String, default: '' },
    productName: { type: String, default: '' },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    companyName: { type: String, default: '' },
    projectTitle: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true },
    technology: {
      type: String,
      enum: ['FDM', 'SLA Resin', 'SLS', 'Direct Metal (DMLS)', 'Consultant Recommendation'],
      default: 'FDM',
    },
    material: { type: String, default: 'PLA Tough (Standard)' },
    colorPreference: { type: String, default: 'Space Gray' },
    dimensions: { type: String, default: '' },
    customText: { type: String, default: '' },
    referenceImageUrls: [{ type: String }],
    uploadedFileUrls: [{ type: String }],
    specialInstructions: { type: String, default: '' },
    infillPercentage: { type: Number, default: 20, min: 10, max: 100 },
    surfaceFinish: {
      type: String,
      enum: ['Raw / As-Printed', 'Sanded Smooth', 'Vapor Smoothed', 'Primer & Painted', 'Electroplated'],
      default: 'Raw / As-Printed',
    },
    quantity: { type: Number, default: 1, min: 1, max: 10000 },
    toleranceRequirement: { type: String, default: 'Standard (±0.2mm)' },
    uploadedFiles: [UploadedFileSchema],
    estimatedPrice: { type: Number, default: 0 },
    estimatedTurnaroundDays: { type: Number, default: 2 },
    status: {
      type: String,
      enum: ['pending_review', 'quoted', 'approved', 'in_production', 'completed', 'cancelled'],
      default: 'pending_review',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const CustomRequest = mongoose.model<ICustomRequest>('CustomRequest', CustomRequestSchema);

