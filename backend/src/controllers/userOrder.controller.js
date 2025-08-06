import userOrder from '../models/userOrder.model.js';
import { generatePayment } from './payment.controller.js';
//import Menu from '../models/menu.model.js'; 

export const createUserOrder = async (req, res) => {
  const { items } = req.body;

  try {
    let totalAmount = 0;
    const orderItems = [];

   
    for (const item of items) {
      const menuItem = await Menu.findById(item.menuItemId); 

      if (!menuItem) {
        return res.status(404).json({ message: `Plato con ID ${item.menuItemId} no encontrado.` });
      }

      
      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,   
        price: menuItem.price, 
        quantity: item.quantity
      });

      totalAmount += menuItem.price * item.quantity;
    }

    
    const newUserOrder = new userOrder({
      user: req.user.id,
      items: orderItems, 
      totalAmount,       
      status: 'pending',
    });

    const savedUserOrder = await newUserOrder.save();

    
    const mpItems = orderItems.map(item => ({
      title: item.name,
      quantity: item.quantity,
      unit_price: Number(item.price),
      currency_id: 'ARS',
    }));

    
    const paymentResult = await generatePayment({
      body: {
        items: mpItems,
        userId: req.user.id,
        orderId: savedUserOrder._id.toString(),
      }
    }, res);

    
    if (paymentResult && paymentResult.id) {
      savedUserOrder.paymentId = paymentResult.id;
      await savedUserOrder.save();

      res.status(201).json({
        message: 'Orden creada y pago iniciado',
        order: savedUserOrder,
        payment: {
          id: paymentResult.id,
          init_point: paymentResult.init_point,
          sandbox_init_point: paymentResult.sandbox_init_point,
        }
      });
    } else {
      savedUserOrder.status = 'failed';
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
    
    const usersOrders = await userOrder.find({ user: req.user.id }).populate('items.menuItemId');
    res.json(usersOrders);
  } catch (err) {
    console.error('Error al obtener órdenes del usuario:', err);
    res.status(500).json({ message: 'Error al obtener órdenes.' });
  }
};
