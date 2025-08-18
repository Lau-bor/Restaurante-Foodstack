import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verificarAdmin } from "../middlewares/adminVerify.js";
import { getUsers, toggleUserStatus } from "../controllers/admin.controller.js";

const router = Router();

router.get("/admin/users", authRequired, verificarAdmin, getUsers);
router.patch("/admin/users/:id/toggle", authRequired, verificarAdmin, toggleUserStatus);

export default router;