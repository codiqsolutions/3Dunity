import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();

router.get('/', ProductController.getAll);
router.get('/featured', ProductController.getFeatured);
router.get('/related', ProductController.getRelated);
router.get('/:id/related', ProductController.getRelated);
router.get('/:id/reviews', ProductController.getReviews);
router.post('/:id/reviews', ProductController.addReview);
router.get('/:slug', ProductController.getBySlug);

export default router;

