import { Router } from 'express';
import { CustomRequestController } from '../controllers/customRequestController';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/estimate', CustomRequestController.getEstimate);
router.post('/', upload.array('files', 5), CustomRequestController.submitRequest);
router.get('/:id', CustomRequestController.getById);

export default router;

