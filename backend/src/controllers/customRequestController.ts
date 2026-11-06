import { Request, Response, NextFunction } from 'express';
import { CustomRequestService } from '../services/customRequestService';
import { IUploadedFile } from '../models/CustomRequest';
import { sendSuccess, sendError } from '../utils/responseHelper';
import path from 'path';

export class CustomRequestController {
  static async getEstimate(req: Request, res: Response, next: NextFunction) {
    try {
      const { technology, material, infillPercentage, surfaceFinish, quantity } = req.body;
      const estimate = CustomRequestService.calculateEstimate({
        technology: technology || 'FDM',
        material: material || 'PLA Tough',
        infillPercentage: Number(infillPercentage) || 20,
        surfaceFinish: surfaceFinish || 'Raw / As-Printed',
        quantity: Number(quantity) || 1,
      });

      return sendSuccess(res, estimate, 'Quote estimated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async submitRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        productId,
        productName,
        fullName,
        email,
        phone,
        companyName,
        projectTitle,
        projectDescription,
        technology,
        material,
        colorPreference,
        dimensions,
        customText,
        referenceImageUrls,
        uploadedFileUrls,
        specialInstructions,
        infillPercentage,
        surfaceFinish,
        quantity,
        toleranceRequirement,
        notes,
      } = req.body;

      if (!fullName || !email) {
        return sendError(
          res,
          'Full name and email are required fields.',
          400
        );
      }

      // Title and description default for product-based custom quotes
      const title = projectTitle || (productName ? `Custom Request for ${productName}` : 'Custom 3D Printing Project');
      const description = projectDescription || specialInstructions || 'Custom quotation requested for product.';

      // Process uploaded files if any
      const files = req.files as Express.Multer.File[] | undefined;
      const uploadedFiles: IUploadedFile[] = [];

      if (files && Array.isArray(files)) {
        for (const file of files) {
          const ext = path.extname(file.originalname).toLowerCase();
          let fileType: '3d-model' | 'reference-image' | 'spec-doc' = '3d-model';

          if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
            fileType = 'reference-image';
          } else if (['.pdf', '.zip'].includes(ext)) {
            fileType = 'spec-doc';
          }

          uploadedFiles.push({
            originalName: file.originalname,
            fileName: file.filename,
            filePath: `/uploads/${file.filename}`,
            fileSize: file.size,
            mimeType: file.mimetype,
            fileType,
          });
        }
      }

      const customRequest = await CustomRequestService.createCustomRequest(
        {
          productId,
          productName,
          fullName,
          email,
          phone,
          companyName,
          projectTitle: title,
          projectDescription: description,
          technology,
          material,
          colorPreference,
          dimensions,
          customText,
          referenceImageUrls: Array.isArray(referenceImageUrls) ? referenceImageUrls : (referenceImageUrls ? [referenceImageUrls] : []),
          uploadedFileUrls: Array.isArray(uploadedFileUrls) ? uploadedFileUrls : (uploadedFileUrls ? [uploadedFileUrls] : []),
          specialInstructions,
          infillPercentage: Number(infillPercentage) || 20,
          surfaceFinish,
          quantity: Number(quantity) || 1,
          toleranceRequirement,
          notes: notes || specialInstructions,
        },
        uploadedFiles
      );

      return sendSuccess(
        res,
        customRequest,
        'Your custom 3D printing project has been submitted successfully! Our engineering team will review the specifications.',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const request = await CustomRequestService.getCustomRequestById(id);
      if (!request) {
        return sendError(res, 'Custom request project not found', 404);
      }
      return sendSuccess(res, request, 'Custom request details retrieved');
    } catch (error) {
      next(error);
    }
  }
}

