export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  badge?: string;
  featured: boolean;
  order: number;
  itemCount: number;
  bannerImage: string;
}

