import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import uploadOrderFiles from '../helpers/multer.config.orders.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createOrderSchema } from '../validators/order.validator.js';
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder
} from '../controllers/order.controller.js';
import { cleanUpOrderFiles } from '../middlewares/cleanUpOrderFiles.js';

import { verifyToken } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";

const router = Router();

router.get("/admin/orders", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Solo los administradores pueden ver esto ✅" });
});


router.post(
  '/orders',
  authRequired,
  uploadOrderFiles,
  validateSchema(createOrderSchema),
  createOrder
);

router.get('/orders', authRequired, getOrders);
router.get('/orders/:id', authRequired, getOrder);

router.put(
  '/orders/:id',
  authRequired,
  uploadOrderFiles,
  updateOrder
);

router.delete('/orders/:id', authRequired, cleanUpOrderFiles, deleteOrder);

export default router;
