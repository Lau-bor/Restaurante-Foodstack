// src/controllers/userOrder.controller.js

import UserOrder from '../models/userOrder.model.js';
import Menu from '../models/menu.model.js';
import paymentController from './payments.controller.cjs';
const { generatePaymentPreference } = paymentController;

export const createUserOrder = async (req, res) => {
    const { items } = req.body;

    try {
        let total = 0;
        const orderItems = [];
        const paymentItems = []; // Array para los ítems que se enviarán a la pasarela de pago

        for (const item of items) {
            const menu = await Menu.findById(item.menuId);

            if (!menu) {
                return res.status(404).json({ message: `Menu item with ID ${item.menuId} not found.` });
            }

            // A. Guardamos solo la referencia al menú y la cantidad para la DB
            orderItems.push({
                menu: menu._id,
                quantity: item.quantity
            });

            // B. Recopilamos los datos completos para la pasarela de pago
            paymentItems.push({
                title: menu.title,
                quantity: item.quantity,
                unit_price: Number(menu.price),
                currency_id: 'ARS',
            });

            // C. Calculamos el total de forma segura
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
            items: paymentItems, // Usamos el array preparado
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
        const orders = await UserOrder.find({ user: req.user.id }).populate({
            path: 'items.menu',
            select: 'title price description' // Solo seleccionamos los campos que necesitamos
        });
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        res.status(500).json({ message: 'Internal server error while fetching orders.' });
    }
};