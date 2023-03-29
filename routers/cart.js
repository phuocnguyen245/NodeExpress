import express from 'express';
import { addToCart, deleteAllCartItems, deleteCartItem, renderCart, updateCartQty } from '../controllers/cartController.js';
const router = express.Router();
router.get('/', renderCart);
router.post('/add-to-cart', addToCart);
router.put('/update-qty', updateCartQty);
router.delete('/delete-cart-item/:id', deleteCartItem);
router.delete('/delete-all', deleteAllCartItems);
export default router;
