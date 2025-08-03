import userOrder from '../models/userOrder.model.js';

export const createUserOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    const newUserOrder = new Order({
      user: req.user.id,
      items,
      totalAmount
    });

    const savedUserOrder = await newOrder.save();
    res.status(201).json(savedUserOrder);
  } catch (err) {
    console.error('Error creando orden:', err);
    res.status(500).json({ message: 'Error interno' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const usersOrders = await userOrder.find({ user: req.user.id }).populate('items.menuItemId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener órdenes' });
  }
};
