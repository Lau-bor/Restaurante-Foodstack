// src/controllers/userOrder.controller.js

import UserOrder from '../models/userOrder.model.js';
import Menu from '../models/menu.model.js';
// ✅ Importación de funciones específicas del controlador de pagos
import { createPayment } from './payments.controller.js';

export const createUserOrder = async (req, res) => {
    const { items } = req.body;

    try {
        let total = 0;
        const orderItems = [];
        const paymentItems = [];

        for (const item of items) {
            const menu = await Menu.findById(item.menuId);

            if (!menu) {
                return res.status(404).json({ message: `Menu item with ID ${item.menuId} not found.` });
            }

            orderItems.push({
                menu: menu._id,
                quantity: item.quantity
            });

            paymentItems.push({
                title: menu.title,
                quantity: item.quantity,
                unit_price: Number(menu.price),
                currency_id: 'ARS',
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
        const orderId = savedUserOrder._id.toString();

        // ✅ Llama directamente a la función 'createPayment' del otro controlador
        //    que ya incluye la lógica de generar la preferencia de Mercado Pago.
        const paymentResult = await createPayment(req, res);

        // Si la función 'createPayment' ya envía la respuesta (res.json), 
        // no necesitas volver a enviar la respuesta aquí.
        // La lógica de 'createPayment' ya se encarga de todo.

        if (paymentResult && paymentResult.init_point) {
            // Este bloque podría no ser necesario si createPayment ya maneja la respuesta
            // y la redirección. Si aún lo necesitas, deberías reestructurar
            // cómo createPayment devuelve los datos.
        }

        return res.status(201).json({
            message: 'Order created and payment started',
            order: savedUserOrder,
            payment: paymentResult // Asume que createPayment devuelve un objeto con init_point
        });

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
        const orders = await UserOrder.find({ user: req.user.id }).populate({
            path: 'items.menu',
            select: 'title price description'
        });
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        res.status(500).json({ message: 'Internal server error while fetching orders.' });
    }
};