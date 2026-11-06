import { Request, Response } from 'express';
import { GalleryService } from '../services/galleryService';

export const getGallery = async (req: Request, res: Response) => {
  try {
    const { category, page, limit, featured, search } = req.query;

    const result = await GalleryService.getAllGalleryItems({
      categorySlug: category as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 12,
      featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
      search: search as string,
    });

    res.json({
      success: true,
      count: result.items.length,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      data: result.items,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve gallery items',
      error: error.message,
    });
  }
};

export const getGalleryCategories = async (req: Request, res: Response) => {
  try {
    const categories = await GalleryService.getCategoriesWithCounts();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve gallery categories',
      error: error.message,
    });
  }
};

export const getFeaturedGallery = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 6;
    const items = await GalleryService.getFeaturedGalleryItems(limit);

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve featured gallery items',
      error: error.message,
    });
  }
};

export const getGalleryItemBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const item = await GalleryService.getGalleryItemBySlug(slug);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Gallery project '${slug}' not found`,
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve gallery project',
      error: error.message,
    });
  }
};

export const getGalleryItemById = async (req: Request, res: Response) => {
  return getGalleryItemBySlug(req, res);
};
