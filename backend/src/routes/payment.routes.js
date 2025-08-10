// src/routes/payment.routes.js

// src/routes/payment.routes.js

import { Router } from 'express';
// ✅ Importamos el objeto completo del archivo CommonJS
import paymentController from '../controllers/payments.controller.cjs';
const { handlePaymentNotification } = paymentController;

const router = Router();
router.post('/payments/notifications', handlePaymentNotification);



// ✅ Rutas temporales para la redirección de Mercado Pago
router.get('/payments/success', (req, res) => {
    res.status(200).send('¡Pago exitoso! La redirección a tu backend funciona.');
});

router.get('/payments/failure', (req, res) => {
    res.status(400).send('Hubo un problema con el pago.');
});

router.get('/payments/pending', (req, res) => {
    res.status(200).send('Tu pago está pendiente de aprobación.');
});
export default router;