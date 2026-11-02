export interface Review {
  _id: string;
  authorName: string;
  authorRole?: string;
  role?: string;
  company?: string;
  comment: string;
  rating: number;
  avatarUrl?: string;
  isVerified?: boolean;
  projectType?: string;
  productOrService?: string;
  createdAt?: string;
}

export interface ProductReviewItem {
  _id: string;
  productId: string;
  productSlug: string;
  userName: string;
  userEmail?: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  images?: string[];
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RatingStats {
  average: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  percentages: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface ProductReviewsResponse {
  success: boolean;
  message: string;
  data: ProductReviewItem[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    ratingStats: RatingStats;
  };
}

export interface ReviewSubmissionInput {
  userName: string;
  userEmail?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
}
