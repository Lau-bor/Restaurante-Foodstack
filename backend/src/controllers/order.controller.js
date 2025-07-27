import fs from 'fs';
import path from 'path';
import Order from '../models/order.model.js';

export const createOrder = async (req, res) => {
    if (req.validationError || req.fileValidationError) {
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const filePath = path.join('public', 'uploads', 'orders', file.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }
        return res.status(400).json({ message: req.validationError || req.fileValidationError });
    }

    try {
        const { title, description, deliveryTime } = req.body;

        let savedFiles = [];

        if (req.files && req.files.length > 0) {
            savedFiles = req.files.map(file => ({
                name: file.originalname,
                path: `/uploads/orders/${file.filename}`,
                size: file.size,
                mimetype: file.mimetype
            }));
        }

        const newOrder = new Order({
            title,
            description,
            deliveryTime: deliveryTime || new Date(),
            user: req.user.id,
            files: savedFiles
        });

        const savedOrder = await newOrder.save();
        return res.status(201).json(savedOrder);

    } catch (error) {
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const filePath = path.join('public', 'uploads', 'orders', file.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("user")
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Orders not found" });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    try {
        const existingOrder = await Order.findById(req.params.id);
        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        let savedFiles = [];

        if (req.files && req.files.length > 0) {
            savedFiles = req.files.map(file => ({
                name: file.originalname,
                path: `/uploads/orders/${file.filename}`,
                size: file.size,
                mimetype: file.mimetype
            }));
        }

        const updateData = {
            ...req.body,
            files: [...(existingOrder.files || []), ...savedFiles]
        };

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });

        return res.status(200).json(updatedOrder);
    } catch (error) {
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const filePath = path.join('public', 'uploads', 'orders', file.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
