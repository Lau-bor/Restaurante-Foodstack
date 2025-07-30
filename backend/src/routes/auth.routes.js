import express from 'express'; 
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';
import { login, logout, profile, register, verifyEmail, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import uploadIconProfileImage from '../helpers/multer.config.iconProfile.js';
import { getProfileImage, uploadProfileImage } from '../controllers/profile.controller.js';
import { requestPasswordReset, resetPassword } from '../controllers/passwordReset.controller.js';
import { createMenu } from '../controllers/menu.controller.js';
import { createMenuSchema } from '../validators/menu.validator.js';
import uploadMenuImages from '../helpers/multer.config.menu.js';

const router = express.Router(); 

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile)
router.get('/verify-token', verifyToken);
router.get('/verify-email', verifyEmail);

router.post('/request-password-reset', requestPasswordReset)
router.post('/reset-password/:token', resetPassword)
router.post('/upload-profile-image',
    authRequired,
    uploadIconProfileImage.single("iconProfile"), 
    uploadProfileImage
); 

router.post('/menu', uploadMenuImages, validateSchema(createMenuSchema), createMenu);

router.get('/profile-image', authRequired, getProfileImage); 



export default router; 