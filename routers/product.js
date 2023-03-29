import express from 'express';
import { createProduct, getProduct } from '../controllers/productController.js';
const router = express.Router();

router.get('/', getProduct);
router.post('/create-product', createProduct);
export default router;
