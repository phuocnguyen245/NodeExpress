import express from 'express';
const router = express.Router();
import login from './login.js';
import cart from './cart.js';
import categories from './categories.js';
import products from './product.js';
import verify from '../middleware/auth/index.js';
import order from './order.js';
import orfus from './orfus.js';

router.use('/api', login);
router.use('/api/cart', verify, cart);
router.use('/api/products', products);
router.use('/api/categories', categories);
router.use('/api/order', order);
router.use('/api/v1', orfus);
export default router;
