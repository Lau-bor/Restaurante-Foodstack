import userOrder from '../models/userOrder.model.js';
import { generatePayment } from './payment.controller.js'; // Importar la función de generación de pago

export const createUserOrder = async (req, res) => {
  const { items, totalAmount } = req.body; // Los datos ya validados por el esquema

  try {
    // ⚠️ Nota: En un entorno de producción real, el totalAmount debería ser
    // calculado y verificado en el backend basándose en los precios de los
    // items de tu base de datos (Menu) para evitar manipulaciones del cliente.
    // Por simplicidad, aquí se usa el totalAmount enviado por el frontend.

    // 1. Crear la orden en la base de datos con un estado inicial 'pending'
    const newUserOrder = new userOrder({
      user: req.user.id, // ID del usuario autenticado (asume que viene de un middleware)
      items, // Los ítems ya incluyen name, price, quantity gracias al validador
      totalAmount,
      status: 'pending', // Estado inicial de la orden
    });

    const savedUserOrder = await newUserOrder.save(); // Guarda la orden en MongoDB

    // 2. Preparar los ítems para la API de Mercado Pago
    // Los nombres de las propiedades (title, unit_price) son específicos de Mercado Pago
    const mpItems = items.map(item => ({
      title: item.name, // Usar el nombre del item de la orden
      quantity: item.quantity,
      unit_price: Number(item.price), // Usar el precio unitario del item de la orden
      currency_id: 'ARS', // Moneda (Asegúrate de que sea la correcta para tu país)
    }));

    // 3. Generar la preferencia de pago en Mercado Pago
    // Se llama a la función generatePayment del controlador de pagos
    const paymentResult = await generatePayment({
      body: {
        items: mpItems,
        userId: req.user.id,
        orderId: savedUserOrder._id.toString(), // Convertir ObjectId a string para Mercado Pago
      }
    }, res); // Se pasa 'res' para que generatePayment pueda manejar su propia respuesta si es necesario

    // Si la generación de la preferencia fue exitosa
    if (paymentResult && paymentResult.id) {
      // Opcional: Guardar el ID de la preferencia de Mercado Pago en tu orden
      savedUserOrder.paymentId = paymentResult.id;
      await savedUserOrder.save(); // Vuelve a guardar la orden con el paymentId

      // Enviar la respuesta al frontend con los datos de la orden y las URLs de pago
      res.status(201).json({
        message: 'Orden creada y pago iniciado',
        order: savedUserOrder,
        payment: {
          id: paymentResult.id,
          init_point: paymentResult.init_point, // URL para producción
          sandbox_init_point: paymentResult.sandbox_init_point, // URL para desarrollo
        }
      });
    } else {
      // Si generatePayment falló y no envió una respuesta HTTP
      savedUserOrder.status = 'failed'; // Marcar la orden como fallida en la DB
      await savedUserOrder.save();
      res.status(500).json({ message: 'Error al iniciar el pago con Mercado Pago.' });
    }

  } catch (err) {
    console.error('Error creando orden o generando pago:', err);
    res.status(500).json({ message: 'Error interno del servidor al procesar la orden.' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    // Buscar órdenes del usuario actual y popular los detalles de los ítems del menú
    const usersOrders = await userOrder.find({ user: req.user.id }).populate('items.menuItemId');
    res.json(usersOrders);
  } catch (err) {
    console.error('Error al obtener órdenes del usuario:', err);
    res.status(500).json({ message: 'Error al obtener órdenes.' });
  }
};
