export interface ProductColor {
  name: string;
  hex: string;
  priceModifier?: number;
  image?: string;
}

export interface SizeOption {
  name: string;
  dimensions: string;
  priceModifier: number;
}

export interface MaterialOption {
  material: string;
  priceModifier: number;
  description: string;
}

export interface CustomizationOptions {
  allowCustomText: boolean;
  maxTextLength: number;
  allowFileUpload: boolean;
  allowCustomDimensions: boolean;
  materialOptions: MaterialOption[];
  colorOptions: ProductColor[];
}

export interface TechnicalSpecifications {
  layerHeight: string;
  infillPercentage: string;
  durability: string;
  recommendedUsage: string;
  manufacturingTime: string;
}

export interface Product3dSpecs {
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
  colors: ProductColor[];
}

export interface Product {
  _id: string;
  productId?: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  categoryName: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  material?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  videos?: string[];
  model3DUrl?: string;
  thumbnail: string;
  specs: Product3dSpecs;
  sizeOptions?: SizeOption[];
  dimensions?: string;
  weight?: string;
  surfaceFinish?: string;
  waterproof?: boolean;
  printingTechnology?: string;
  technicalSpecifications?: TechnicalSpecifications;
  productionTime?: string;
  shippingCharges?: number;
  customizationOptions?: CustomizationOptions;
  stock: number;
  stockStatus?: 'in-stock' | 'made-to-order' | 'out-of-stock';
  customizationAvailable?: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  badge?: string;
  tags: string[];
  cadFileAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}
