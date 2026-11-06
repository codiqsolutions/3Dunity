import { Router } from 'express';
import {
  getGallery,
  getGalleryCategories,
  getFeaturedGallery,
  getGalleryItemBySlug,
} from '../controllers/galleryController';

const router = Router();

// Specific routes first
router.get('/categories', getGalleryCategories);
router.get('/featured', getFeaturedGallery);

// Generic / root list
router.get('/', getGallery);

// Parameterized item route
router.get('/:slug', getGalleryItemBySlug);

export default router;
