import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verificarAdmin } from "../middlewares/adminVerify.js";
import { getUsers, inactivateUser } from "../controllers/admin.controller.js";

const router = Router();

router.get("/admin/users", authRequired, verificarAdmin, getUsers);
router.patch("/admin/users/:id/inactivate", authRequired, verificarAdmin, inactivateUser);

export default router;
