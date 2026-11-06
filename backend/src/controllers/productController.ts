import { Request, Response, NextFunction } from 'express';
import { ProductService, ProductFilterQuery } from '../services/productService';
import { sendSuccess, sendError } from '../utils/responseHelper';

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: ProductFilterQuery = {
        category: req.query.category as string,
        search: req.query.search as string,
        material: req.query.material as string,
        availability: req.query.availability as string,
        customizable: req.query.customizable as string,
        featured: req.query.featured as string,
        bestSeller: req.query.bestSeller as string,
        technology: req.query.technology as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        sort: req.query.sort as string,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 12,
      };

      const result = await ProductService.getProducts(filters);
      return sendSuccess(res, result.products, 'Products retrieved successfully', 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 8;
      const products = await ProductService.getFeaturedProducts(limit);
      return sendSuccess(res, products, 'Featured products retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const product = await ProductService.getProductBySlug(slug);
      if (!product) {
        return sendError(res, `Product with slug '${slug}' not found`, 404);
      }
      return sendSuccess(res, product, 'Product details retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async getRelated(req: Request, res: Response, next: NextFunction) {
    try {
      const identifier = (req.params.id || req.query.id || req.query.slug) as string;
      if (!identifier) {
        return sendError(res, 'Product ID or slug is required', 400);
      }
      const limit = Number(req.query.limit) || 4;
      const products = await ProductService.getRelatedProducts(identifier, limit);
      return sendSuccess(res, products, 'Related products retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const identifier = req.params.id;
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

      const result = await ProductService.getProductReviews(identifier, page, limit);
      return sendSuccess(res, result.reviews, 'Product reviews retrieved successfully', 200, {
        ...result.pagination,
        ratingStats: result.ratingStats,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addReview(req: Request, res: Response, next: NextFunction) {
    try {
      const identifier = req.params.id;
      const { userName, userEmail, rating, title, comment, images } = req.body;

      if (!userName || !comment) {
        return sendError(res, 'Name and comment are required to submit a review.', 400);
      }

      if (!rating || Number(rating) < 1 || Number(rating) > 5) {
        return sendError(res, 'Please provide a valid rating between 1 and 5 stars.', 400);
      }

      const review = await ProductService.addProductReview(identifier, {
        userName,
        userEmail,
        rating: Number(rating),
        title,
        comment,
        images: Array.isArray(images) ? images : [],
        verifiedPurchase: true,
      });

      return sendSuccess(res, review, 'Thank you! Your review has been published.', 201);
    } catch (error: any) {
      next(error);
    }
  }
}

