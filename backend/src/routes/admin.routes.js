import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verificarAdmin } from "../middlewares/adminVerify.js";
import { getUsers, inactivateUser, activateUser } from "../controllers/admin.controller.js";

const router = Router();

router.get("/admin/users", authRequired, verificarAdmin, getUsers);
router.patch("/admin/users/:id/inactivate", authRequired, verificarAdmin, inactivateUser);
router.patch("/admin/users/:id/activate", authRequired, verificarAdmin, activateUser);

export default router;