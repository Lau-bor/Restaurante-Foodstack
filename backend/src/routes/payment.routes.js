import express from 'express';
import { generatePayment, paymentWebhook } from '../controllers/payment.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = express.Router();

router.post('/paymentRoutes', authRequired, generatePayment);
router.post('/webhook', express.json(), paymentWebhook); // sin auth, lo llama MercadoPago

export default router;
