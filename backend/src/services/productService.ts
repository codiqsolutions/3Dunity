import { Product } from '../models/Product';
import { ProductReview } from '../models/ProductReview';

export interface ProductFilterQuery {
  category?: string;
  search?: string;
  material?: string;
  availability?: string;
  customizable?: boolean | string;
  featured?: boolean | string;
  bestSeller?: boolean | string;
  technology?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export class ProductService {
  static async getProducts(filters: ProductFilterQuery) {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(filters.limit) || 12));
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};

    if (filters.category && filters.category !== 'all' && filters.category !== 'more-categories') {
      query.category = filters.category;
    }

    if (filters.featured === true || filters.featured === 'true') {
      query.isFeatured = true;
    }

    if (filters.bestSeller === true || filters.bestSeller === 'true') {
      query.isBestSeller = true;
    }

    if (filters.technology) {
      query['specs.technology'] = filters.technology;
    }

    // Material Filter (PLA, ABS, PETG, Resin, Other)
    if (filters.material && filters.material !== 'all') {
      const mat = filters.material.trim();
      query.$and = query.$and || [];
      if (mat.toLowerCase() === 'other') {
        query.$and.push({ material: { $nin: [/^PLA$/i, /^ABS$/i, /^PETG$/i, /^Resin$/i] } });
      } else {
        query.$and.push({
          $or: [
            { material: new RegExp(mat, 'i') },
            { 'specs.availableMaterials': new RegExp(mat, 'i') },
          ],
        });
      }
    }

    // Availability Filter (in-stock, made-to-order)
    if (filters.availability && filters.availability !== 'all') {
      if (filters.availability === 'in-stock') {
        query.$and = query.$and || [];
        query.$and.push({
          $or: [{ stockStatus: 'in-stock' }, { stock: { $gt: 0 } }],
        });
      } else if (filters.availability === 'made-to-order') {
        query.stockStatus = 'made-to-order';
      }
    }

    // Customization Filter
    if (filters.customizable !== undefined && filters.customizable !== '' && filters.customizable !== 'all') {
      const isCust =
        filters.customizable === true ||
        filters.customizable === 'true' ||
        filters.customizable === 'customizable';
      query.customizationAvailable = isCust;
    }

    // Price Range Filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined && !isNaN(Number(filters.minPrice))) {
        query.price.$gte = Number(filters.minPrice);
      }
      if (filters.maxPrice !== undefined && !isNaN(Number(filters.maxPrice))) {
        query.price.$lte = Number(filters.maxPrice);
      }
    }

    // Search Filter
    if (filters.search && filters.search.trim()) {
      const term = filters.search.trim();
      const searchRegex = new RegExp(term, 'i');
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { name: searchRegex },
          { shortDescription: searchRegex },
          { description: searchRegex },
          { categoryName: searchRegex },
          { tags: { $in: [searchRegex] } },
        ],
      });
    }

    // Sorting Options
    let sortOption: Record<string, any> = { createdAt: -1 };
    if (filters.sort === 'price-low' || filters.sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (filters.sort === 'price-high' || filters.sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (filters.sort === 'rating' || filters.sort === 'top-rated') {
      sortOption = { rating: -1, reviewCount: -1 };
    } else if (filters.sort === 'popular' || filters.sort === 'popularity') {
      sortOption = { isBestSeller: -1, reviewCount: -1, rating: -1 };
    } else if (filters.sort === 'name-asc' || filters.sort === 'name') {
      sortOption = { name: 1 };
    } else if (filters.sort === 'latest') {
      sortOption = { createdAt: -1 };
    }

    const [products, totalCount] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    };
  }

  static async getProductBySlug(identifier: string) {
    const isId = /^[0-9a-fA-F]{24}$/.test(identifier);
    if (isId) {
      return Product.findOne({
        $or: [{ _id: identifier }, { slug: identifier }, { productId: identifier }],
      }).lean();
    }
    return Product.findOne({
      $or: [{ slug: identifier }, { productId: identifier }],
    }).lean();
  }

  static async getFeaturedProducts(limit = 5) {
    const targetSlugs = [
      'geometric-deer-sculpture',
      'miniature-house-model',
      'astronaut-figurine',
      'mechanical-gear-functional',
      'spiral-design-vase',
    ];

    const featured = await Product.find({ slug: { $in: targetSlugs } }).lean();

    // Order precisely as in the photo
    featured.sort((a, b) => targetSlugs.indexOf(a.slug) - targetSlugs.indexOf(b.slug));

    if (featured.length < limit) {
      const additional = await Product.find({
        isFeatured: true,
        slug: { $nin: targetSlugs },
      })
        .limit(limit - featured.length)
        .lean();
      return [...featured, ...additional];
    }

    return featured.slice(0, limit);
  }

  static async getRelatedProducts(identifier: string, limit = 4) {
    const isId = /^[0-9a-fA-F]{24}$/.test(identifier);
    const product = await Product.findOne(
      isId ? { $or: [{ _id: identifier }, { slug: identifier }] } : { slug: identifier }
    ).lean();

    if (!product) {
      return Product.find().limit(limit).lean();
    }

    // Find products in same category or material, excluding this product
    const related = await Product.find({
      _id: { $ne: product._id },
      $or: [{ category: product.category }, { material: product.material }],
    })
      .limit(limit)
      .lean();

    if (related.length < limit) {
      const more = await Product.find({
        _id: { $nin: [product._id, ...related.map((r: any) => r._id)] },
      })
        .limit(limit - related.length)
        .lean();
      return [...related, ...more];
    }

    return related;
  }

  static async getProductReviews(identifier: string, page = 1, limit = 10) {
    const isId = /^[0-9a-fA-F]{24}$/.test(identifier);
    const product = await Product.findOne(
      isId ? { $or: [{ _id: identifier }, { slug: identifier }] } : { slug: identifier }
    ).lean();

    if (!product) {
      return {
        reviews: [],
        ratingStats: {
          average: 5.0,
          totalReviews: 0,
          distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
          percentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
        },
        pagination: { page: 1, limit, totalPages: 1, totalCount: 0 },
      };
    }

    const query = {
      $or: [{ productId: product._id }, { productSlug: product.slug }],
    };

    const skip = (page - 1) * limit;
    const [reviews, totalCount, allReviews] = await Promise.all([
      ProductReview.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ProductReview.countDocuments(query),
      ProductReview.find(query, { rating: 1 }).lean(),
    ]);

    // Calculate distribution
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    for (const r of allReviews) {
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      distribution[rounded] = (distribution[rounded] || 0) + 1;
      sum += r.rating;
    }

    const totalAll = allReviews.length;
    const average = totalAll > 0 ? Number((sum / totalAll).toFixed(1)) : (product.rating || 5.0);

    const percentages: Record<number, number> = {
      5: totalAll > 0 ? Math.round((distribution[5] / totalAll) * 100) : 100,
      4: totalAll > 0 ? Math.round((distribution[4] / totalAll) * 100) : 0,
      3: totalAll > 0 ? Math.round((distribution[3] / totalAll) * 100) : 0,
      2: totalAll > 0 ? Math.round((distribution[2] / totalAll) * 100) : 0,
      1: totalAll > 0 ? Math.round((distribution[1] / totalAll) * 100) : 0,
    };

    return {
      reviews,
      ratingStats: {
        average,
        totalReviews: totalAll,
        distribution,
        percentages,
      },
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    };
  }

  static async addProductReview(
    identifier: string,
    data: {
      userName: string;
      userEmail?: string;
      rating: number;
      title?: string;
      comment: string;
      images?: string[];
      verifiedPurchase?: boolean;
    }
  ) {
    const isId = /^[0-9a-fA-F]{24}$/.test(identifier);
    const product = await Product.findOne(
      isId ? { $or: [{ _id: identifier }, { slug: identifier }] } : { slug: identifier }
    );

    if (!product) {
      throw new Error(`Product '${identifier}' not found`);
    }

    const newReview = await ProductReview.create({
      productId: product._id,
      productSlug: product.slug,
      userName: data.userName.trim(),
      userEmail: data.userEmail?.trim(),
      rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
      title: data.title?.trim() || '',
      comment: data.comment.trim(),
      images: data.images || [],
      verifiedPurchase: data.verifiedPurchase ?? true,
    });

    // Recalculate average rating
    const allReviews = await ProductReview.find({
      $or: [{ productId: product._id }, { productSlug: product.slug }],
    });
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    product.rating = Number(avg.toFixed(1));
    product.reviewCount = allReviews.length;
    await product.save();

    return newReview;
  }
}
