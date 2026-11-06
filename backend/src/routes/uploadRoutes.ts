import { Router, Request, Response } from 'express';
import { upload } from '../middleware/uploadMiddleware';
import { sendSuccess, sendError } from '../utils/responseHelper';

const router = Router();

// Single or multiple file upload handler
router.post('/', upload.array('files', 5), (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return sendError(res, 'No files were uploaded. Please select a valid 3D file or image.', 400);
    }

    const uploaded = files.map((file) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }));

    return sendSuccess(res, uploaded, 'Files uploaded successfully', 201);
  } catch (error: any) {
    return sendError(res, error.message || 'File upload failed', 500);
  }
});

export default router;

