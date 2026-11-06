import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController';

const router = Router();

router.get('/featured', ReviewController.getFeatured);

export default router;

