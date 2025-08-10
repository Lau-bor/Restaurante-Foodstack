// src/controllers/payments.controller.cjs
// src/controllers/payments.controller.cjs

const mercadopago = require('mercadopago');

// ✅ Configuración de la librería con el token de las variables de entorno
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// ----------------------------------------------------
// Función para generar la preferencia de pago
// ----------------------------------------------------
const generatePaymentPreference = async (paymentData) => {
    try {
        const preferenceBody = {
            items: paymentData.items,
            external_reference: paymentData.orderId,
            back_urls: {
                success: 'https://25c9f5fb1520.ngrok-free.app/api/v1/payments/success',
                failure: 'https://25c9f5fb1520.ngrok-free.app/api/v1/payments/failure',
                pending:  'https://25c9f5fb1520.ngrok-free.app/api/v1/payments/pending'
            },
            notification_url: 'https://25c9f5fb1520.ngrok-free.app/api/v1/payments/notifications',
            metadata: {
                userId: paymentData.userId,
                orderId: paymentData.orderId
            }
        };

        const paymentResponse = await mercadopago.preferences.create(preferenceBody);
        return paymentResponse.body;
    } catch (error) {
        console.error('Error al generar preferencia en Mercado Pago:', error);
        throw new Error('Error al generar la preferencia de pago.');
    }
};

// ----------------------------------------------------
// Función para manejar las notificaciones del webhook
// ----------------------------------------------------
const handlePaymentNotification = async (req, res) => {
    console.log('Notificación de webhook recibida:', req.body);
    
    try {
      res.status(200).send('Webhook recibido correctamente.');
    } catch (err) {
      console.error('Error al procesar la notificación del webhook:', err);
      res.status(500).send('Error interno del servidor.');
    }
};

// ✅ Exportamos las funciones
module.exports = {
    generatePaymentPreference,
    handlePaymentNotification,
};