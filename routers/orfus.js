import express from 'express';
import { getOrfus } from '../controllers/orfusController.js';
const router = express.Router();

router.get('/line_content_to_display', getOrfus);
export default router;
