import { Request, Response } from 'express';
import { ServiceService } from '../services/serviceService';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await ServiceService.getAllServices();
    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve services',
      error: error.message,
    });
  }
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const service = await ServiceService.getServiceBySlug(slug);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service with slug '${slug}' not found`,
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve service',
      error: error.message,
    });
  }
};

