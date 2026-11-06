import mongoose from 'mongoose';
import { GalleryItem, IGalleryItem } from '../models/GalleryItem';

export interface GalleryFilterOptions {
  categorySlug?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
}

export interface GalleryCategoryCount {
  name: string;
  slug: string;
  count: number;
}

export class GalleryService {
  public static readonly PREDEFINED_CATEGORIES: { name: string; slug: string }[] = [
    { name: 'All Projects', slug: 'all' },
    { name: 'Home Decor', slug: 'home-decor' },
    { name: 'Personalized Gifts', slug: 'personalized-gifts' },
    { name: 'Toys & Figures', slug: 'toys-figures' },
    { name: 'Architectural Models', slug: 'architectural-models' },
    { name: 'Engineering & Prototypes', slug: 'engineering-prototypes' },
    { name: 'Custom Creations', slug: 'custom-creations' },
  ];

  public static async getAllGalleryItems(options: GalleryFilterOptions = {}) {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(options.limit) || 12));
    const skip = (page - 1) * limit;

    const query: any = {
      status: options.status || 'published',
    };

    if (options.categorySlug && options.categorySlug !== 'all') {
      // Support matching categorySlug directly, or normalized slug
      query.categorySlug = options.categorySlug.toLowerCase().trim();
    }

    if (options.featured !== undefined) {
      query.featured = options.featured;
    }

    if (options.search && options.search.trim()) {
      const searchRegex = new RegExp(options.search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { shortDescription: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { materials: searchRegex },
        { printingTechnology: searchRegex },
      ];
    }

    const [items, total] = await Promise.all([
      GalleryItem.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      GalleryItem.countDocuments(query),
    ]);

    // Ensure backward compatibility on returned documents
    const mappedItems = items.map((doc: any) => ({
      ...doc,
      image: doc.image || doc.coverImage,
      coverImage: doc.coverImage || doc.image,
      images: (doc.images && doc.images.length > 0) ? doc.images : [doc.coverImage || doc.image],
      material: doc.material || (doc.materials ? doc.materials.join(', ') : ''),
      technology: doc.technology || doc.printingTechnology,
      order: doc.displayOrder !== undefined ? doc.displayOrder : doc.order,
    }));

    return {
      items: mappedItems,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  public static async getCategoriesWithCounts(): Promise<GalleryCategoryCount[]> {
    const publishedFilter = { status: 'published' };

    // Group counts by categorySlug
    const aggregateCounts = await GalleryItem.aggregate([
      { $match: publishedFilter },
      { $group: { _id: '$categorySlug', count: { $sum: 1 } } },
    ]);

    const countMap = new Map<string, number>();
    let totalPublished = 0;

    aggregateCounts.forEach((entry) => {
      if (entry._id) {
        countMap.set(entry._id.toLowerCase(), entry.count);
        totalPublished += entry.count;
      }
    });

    // Build category list with predetermined order
    const result: GalleryCategoryCount[] = this.PREDEFINED_CATEGORIES.map((cat) => {
      if (cat.slug === 'all') {
        return {
          name: cat.name,
          slug: cat.slug,
          count: totalPublished,
        };
      }
      return {
        name: cat.name,
        slug: cat.slug,
        count: countMap.get(cat.slug) || 0,
      };
    });

    return result;
  }

  public static async getFeaturedGalleryItems(limit = 6) {
    const items = await GalleryItem.find({
      status: 'published',
      featured: true,
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean();

    return items.map((doc: any) => ({
      ...doc,
      image: doc.image || doc.coverImage,
      coverImage: doc.coverImage || doc.image,
      images: (doc.images && doc.images.length > 0) ? doc.images : [doc.coverImage || doc.image],
      material: doc.material || (doc.materials ? doc.materials.join(', ') : ''),
      technology: doc.technology || doc.printingTechnology,
      order: doc.displayOrder !== undefined ? doc.displayOrder : doc.order,
    }));
  }

  public static async getGalleryItemBySlug(slugOrId: string) {
    let item = await GalleryItem.findOne({
      slug: slugOrId.toLowerCase().trim(),
      status: 'published',
    }).lean();

    if (!item && mongoose.isValidObjectId(slugOrId)) {
      item = await GalleryItem.findOne({
        _id: slugOrId,
        status: 'published',
      }).lean();
    }

    if (!item) {
      return null;
    }

    const doc: any = item;
    return {
      ...doc,
      image: doc.image || doc.coverImage,
      coverImage: doc.coverImage || doc.image,
      images: (doc.images && doc.images.length > 0) ? doc.images : [doc.coverImage || doc.image],
      material: doc.material || (doc.materials ? doc.materials.join(', ') : ''),
      technology: doc.technology || doc.printingTechnology,
      order: doc.displayOrder !== undefined ? doc.displayOrder : doc.order,
    };
  }

  public static async getGalleryItemById(id: string) {
    return this.getGalleryItemBySlug(id);
  }
}
