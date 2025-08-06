import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { verificarAdmin } from '../middlewares/adminVerify.js';
import { createMenu, updateMenu, deleteMenu, getMenus, getMenuById } from '../controllers/menu.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createMenuSchema } from '../validators/menu.validator.js';
import uploadMenuImages from '../helpers/multer.config.menu.js';


const router = Router();

router.get('/menus/:id', getMenuById);
router.get('/menus', getMenus);

router.post(
  '/menus',
  authRequired,
  verificarAdmin,
  uploadMenuImages,
  validateSchema(createMenuSchema),
  createMenu
);

router.put(
  '/menus/:id',
  authRequired,
  verificarAdmin,
  uploadMenuImages,
  validateSchema(createMenuSchema),
  updateMenu
);

router.delete(
  '/menus/:id',
  authRequired,
  verificarAdmin,
  deleteMenu
);

export default router;