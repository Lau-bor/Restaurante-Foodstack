import User from '../models/user.model.js';
import { createAccessToken } from '../helpers/jwt.js';
import transport from '../helpers/mailer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { id } from 'zod/v4/locales';


export const requestPasswordReset = async (req, res) => {
    try {
        
        const {email} = req.body;

       
        if(!email){
            return res.status(400).json({message: "El email es requerido"})
        }

       
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }

        

        const resetToken = await createAccessToken({
            id: user._id,
            purpose: 'password_reset'
        })

        
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = new Date(Date.now() + 3600000) 
        await user.save()

        

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: `${process.env.APP_NAME} || "TODO-APP" <${process.env.MAIL_USER}>`,
            to: user.email,
            subject: 'Instrucciones para resetear tu contraseña',
            template: 'forgotPassword', 
            context: {
                name: user.username,
                link: resetLink,
                subject: 'Restablecimiento de contraseña'
            } 
        }

        await transport.sendMail(mailOptions);

        
        res.status(200).json({
            message: 'Email con instrucciones enviado',
            expiresIn: '1h'
        })

    } catch (error) {
        console.error('Error en requestPasswordReset', {
            message: error.message,
            stack: error.stack,
            email: req.body.email
        });
        
        res.status(500).json({
            message: 'Error al procesar la solicitud',
            error: error.message
        })

    }
}

export const resetPassword = async (req, res) => {
    try {
        
        const {token} = req.params;
        const {newPassword} = req.body;

        
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message:'Token inválido o expirado',
                    error: err.message
                })
            }
            
        const user = await User.findOne({
            _id: decoded.id,
            passwordResetToken: token,
            passwordResetExpires: {$gt: Date.now()}
        });

        if(!user){
            return res.status(400).json({
                message:'Usuario no encontrado o token inválido'
            })
        }

        

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        

        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        

        res.status(200).json({
            message: 'Contraseña actualizada correctamente'
        });
        })


    } catch (error) {
        console.error('Error en resetPassword', error);
        res.status(500).json({
            message: 'error al resetear la contraseña',
            error: error.message
        })
    }
}