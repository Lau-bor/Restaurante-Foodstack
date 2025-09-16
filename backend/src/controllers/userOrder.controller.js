import UserOrder from "../models/userOrder.model.js";
import Menu from "../models/menu.model.js";

export const createUserOrder = async (req, res) => {
  const { items } = req.body;

  try {
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const menu = await Menu.findById(item.menuId);

      if (!menu) {
        return res
          .status(404)
          .json({ message: `Menu item with ID ${item.menuId} not found.` });
      }

      orderItems.push({
        menu: menu._id,
        quantity: item.quantity,
      });

      total += menu.price * item.quantity;
    }

    const newUserOrder = new UserOrder({
      user: req.user.id,
      items: orderItems,
      total,
      status: "pending",
    });

    const savedUserOrder = await newUserOrder.save();

    return res.status(201).json({
      message: "Order created successfully",
      order: savedUserOrder,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({
      message: "Internal server error while processing the order.",
      details: err.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await UserOrder.find()
        .populate({
          path: "items.menu",
          select: "title price description",
        })
        .populate({
          path: "user",
          select: "email role",
        });

      
      orders = orders.filter(order => order.user !== null);

    } else {
      orders = await UserOrder.find({ user: req.user.id }).populate({
        path: "items.menu",
        select: "title price description",
      });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res
      .status(500)
      .json({ message: "Internal server error while fetching orders." });
  }
};




export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await UserOrder.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: "Estado actualizado correctamente.", order });
  } catch (err) {
    console.error("Error al actualizar el estado:", err);
    res.status(500).json({ message: "Error interno al actualizar el estado." });
  }
};
