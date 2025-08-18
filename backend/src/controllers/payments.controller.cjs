const mercadopago = require('mercadopago');
const userOrder = require('../models/userOrder.model.js').default; 


mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});


// Función para generar la preferencia de pago

const generatePaymentPreference = async (paymentData) => {
    try {
        // Reemplaza esta URL con la URL que obtienes al iniciar ngrok
        const ngrokUrl = 'https://85f125faf5d5.ngrok-free.app';
        
        const preferenceBody = {
            items: paymentData.items,
            payer: {
                email: 'TESTUSER902587602@tester.com'
            },
            external_reference: paymentData.orderId,
            back_urls: {
                success: `${ngrokUrl}/api/v1/payments/success`,
                failure: `${ngrokUrl}/api/v1/payments/failure`,
                pending:  `${ngrokUrl}/api/v1/payments/pending`
            },
            notification_url: `${ngrokUrl}/api/v1/payments/notifications`,
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


// Función para manejar las notificaciones del webhook

const handlePaymentNotification = async (req, res) => {
    try {
        const { type, data } = req.body;

        if (type === 'payment') {
            const paymentId = data.id;

            const payment = await mercadopago.payment.findById(paymentId);
            const status = payment.body.status;
            const orderId = payment.body.external_reference;

            const order = await userOrder.findById(orderId);

            if (order) {
                order.status = status;
                await order.save();
                console.log(`Orden ${orderId} actualizada a estado: ${order.status}`);
            } else {
                console.log(`No se encontró la orden con ID: ${orderId}`);
            }
        }
        
        res.status(200).send('Webhook recibido y procesado correctamente.');
        
    } catch (err) {
        console.error('Error al procesar la notificación del webhook:', err);
        res.status(500).send('Error interno del servidor.');
    }
};

// se exportan las funciones con module.exports
module.exports = {
    generatePaymentPreference,
    handlePaymentNotification,
};