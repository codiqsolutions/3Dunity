import { Router } from 'express';
import { getCartItems, addCartItem, removeCartItem } from '../controllers/cartController';

const router = Router();

router.get('/items', getCartItems);
router.post('/items', addCartItem);
router.delete('/items/:productId', removeCartItem);

export default router;

