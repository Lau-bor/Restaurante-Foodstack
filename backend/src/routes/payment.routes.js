// ✅ En tu archivo src/routes/payment.routes.js
import { Router } from 'express';
import { createPayment, handlePaymentNotification } from '../controllers/payments.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/checkout', authRequired, createPayment);
router.post('/payments/notifications', handlePaymentNotification);

export default router;