import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  iconName: string; // Lucide icon identifier: 'Printer' | 'Box' | 'Cpu' | 'Sliders' | 'Layers' | 'Sparkles'
  badge?: string;
  features: string[];
  materialsSupported: string[];
  turnaroundTime: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
  };
  order: number;
  isActive: boolean;
}

const ServiceSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true,
      default: 'Box',
    },
    badge: {
      type: String,
      trim: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    materialsSupported: [
      {
        type: String,
        trim: true,
      },
    ],
    turnaroundTime: {
      type: String,
      default: '24-48 Hours',
    },
    colorScheme: {
      bg: { type: String, default: '#E0F2FE' },
      text: { type: String, default: '#087FC3' },
      border: { type: String, default: '#BAE6FD' },
      badgeBg: { type: String, default: '#087FC3' },
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);

