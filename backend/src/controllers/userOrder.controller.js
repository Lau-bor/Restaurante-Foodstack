// src/controllers/userOrder.controller.js

// src/controllers/userOrder.controller.js

import UserOrder from '../models/userOrder.model.js';
import Menu from '../models/menu.model.js';
// ✅ Importamos el objeto completo del archivo CommonJS
import paymentController from './payments.controller.cjs';
const { generatePaymentPreference } = paymentController;

// ... el resto de tu código ...

export const createUserOrder = async (req, res) => {
    const { items } = req.body;

    try {
        let total = 0;
        const orderItems = [];

        for (const item of items) {
            const menu = await Menu.findById(item.menuId);

            if (!menu) {
                return res.status(404).json({ message: `Menu item with ID ${item.menuId} not found.` });
            }

            orderItems.push({
                menu: menu._id,
                name: menu.title,
                price: menu.price,
                quantity: item.quantity
            });

            total += menu.price * item.quantity;
        }

        const newUserOrder = new UserOrder({
            user: req.user.id,
            items: orderItems,
            total,
            status: 'pending',
        });

        const savedUserOrder = await newUserOrder.save();

        const paymentResult = await generatePaymentPreference({
            items: orderItems.map(item => ({
                title: item.name,
                quantity: item.quantity,
                unit_price: Number(item.price),
                currency_id: 'ARS',
            })),
            userId: req.user.id,
            orderId: savedUserOrder._id.toString(),
        });

        if (paymentResult && paymentResult.id) {
            savedUserOrder.paymentId = paymentResult.id;
            await savedUserOrder.save();

            return res.status(201).json({
                message: 'Order created and payment started',
                order: savedUserOrder,
                payment: {
                    id: paymentResult.id,
                    init_point: paymentResult.init_point,
                    sandbox_init_point: paymentResult.sandbox_init_point,
                }
            });
        }
    } catch (err) {
        console.error('Error creating order or generating payment:', err);
        return res.status(500).json({
            message: 'Internal server error while processing the order.',
            details: err.message
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await UserOrder.find({ user: req.user.id }).populate('items.menu');
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        res.status(500).json({ message: 'Internal server error while fetching orders.' });
    }
};