import express from 'express';
import { getOrder, createOrder } from '../controllers/orderController.js';
const router = express.Router();

router.get('/', getOrder);
router.post('/create-order', createOrder);
export default router;
