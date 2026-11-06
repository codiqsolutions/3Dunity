import { Request, Response, NextFunction } from 'express';
import { Review } from '../models/Review';
import { sendSuccess } from '../utils/responseHelper';

export class ReviewController {
  static async getFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await Review.find({ featuredOnHome: true })
        .sort({ rating: -1, createdAt: -1 })
        .limit(6)
        .lean();
      return sendSuccess(res, reviews, 'Customer reviews retrieved');
    } catch (error) {
      next(error);
    }
  }
}

