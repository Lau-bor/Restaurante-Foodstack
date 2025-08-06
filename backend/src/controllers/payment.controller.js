import { MercadoPagoConfig, Preference } from 'mercadopago'; 
import dotenv from 'dotenv';

dotenv.config();


const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });


export const generatePayment = async (req, res) => {
  try {
    const { items, userId, orderId } = req.body;

    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items requeridos' });
    }

    
    const preference = new Preference(client);

    const result = await preference.create({
      body: { 
        items: items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: Number(item.unit_price),
          currency_id: 'ARS',
        })),
        external_reference: orderId, 
        payer: {
          id: userId,
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL}/success`,
          failure: `${process.env.FRONTEND_URL}/failure`,
          pending: `${process.env.FRONTEND_URL}/pending`,
        },
        auto_return: 'approved',
      },
    });

    return res.status(200).json({
      id: result.id, 
      init_point: result.init_point, 
      sandbox_init_point: result.sandbox_init_point, 
    });
  } catch (error) {
    console.error('Error al generar preferencia:', error);
    return res.status(500).json({ message: 'Error interno al generar pago' });
  }
};


export const paymentWebhook = async (req, res) => {
  try {
    const payment = req.body;

    console.log('📬 Webhook recibido:', JSON.stringify(payment, null, 2));

    

    res.sendStatus(200);
  } catch (error) {
    console.error('Error en webhook:', error);
    res.sendStatus(500);
  }
};
