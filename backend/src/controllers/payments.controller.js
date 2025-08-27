import mercadopago from 'mercadopago';
import userOrder from '../models/userOrder.model.js';


mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export const createPayment = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío." });
    }

    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const total = items.reduce((sum, item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || isNaN(quantity)) {
        throw new Error(`Datos inválidos en el item: ${JSON.stringify(item)}`);
      }

      return sum + price * quantity;
    }, 0);

   
    const newOrder = new UserOrder({
      user: userId,
      items: items.map((item) => ({
        menu: item._id,
        quantity: Number(item.quantity),
      })),
      total,
      status: "pending",
    });

    const savedOrder = await newOrder.save();
    const orderId = savedOrder._id.toString();

    
    const preferenceBody = {
      items: items.map((item) => ({
        title: item.title,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
        currency_id: "ARS",
      })),
      payer: {
        email: foundUser.email,
      },
      external_reference: orderId,
      back_urls: {
        success: `${process.env.VITE_API_URL}/api/v1/payments/success`,
        failure: `${process.env.VITE_API_URL}/api/v1/payments/failure`,
        pending: `${process.env.VITE_API_URL}/api/v1/payments/pending`,
      },
      notification_url: `${process.env.VITE_API_URL}/api/v1/payments/notifications`,
      metadata: {
        userId,
        orderId,
      },
    };

    const mpResponse = await mercadopago.preferences.create(preferenceBody);

    return res.status(200).json({ init_point: mpResponse.body.init_point });
  } catch (error) {
    console.error("Error en el checkout:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al procesar el pago." });
  }
};

export const handlePaymentNotification = async (req, res) => {
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

    return res.status(200).send('Webhook recibido y procesado correctamente.');
  } catch (err) {
    console.error('Error al procesar la notificación del webhook:', err);
    return res.status(500).send('Error interno del servidor.');
  }
};
          