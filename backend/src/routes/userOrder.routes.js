import express from 'express';
import { createUserOrder, getUserOrders, updateOrderStatus } from '../controllers/userOrder.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createUserOrderSchema } from '../validators/userOrder.validator.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = express.Router();

router.post('/userOrder', authRequired, validateSchema(createUserOrderSchema), createUserOrder);
router.get('/userOrder', authRequired, getUserOrders);
router.put('/userOrder/:id/status', authRequired, updateOrderStatus);

export default router;
