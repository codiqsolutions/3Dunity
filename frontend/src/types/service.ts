export interface ServiceColorScheme {
  bg: string;
  text: string;
  border: string;
  badgeBg: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  iconName: string;
  badge?: string;
  features: string[];
  materialsSupported: string[];
  turnaroundTime: string;
  colorScheme: ServiceColorScheme;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

