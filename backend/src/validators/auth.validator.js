import {z} from 'zod';

export const registerSchema = z.object({
    username: z
    .string({required_error: "Nombre de usuario es requerido"})
    .min(5, {message: "Nombre de usuario debe tener al menos 5 caracteres"})
    .max(20)
    ,

    email: z
        .string({required_error: "Email es requerido"})
        .email({ pattern: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i}, {message:"Email invalido"}),

    password: z
        .string({required_error: "Contraseña es requerida"})
        .min(6, {message: "Contraseña debe tener al menos 6 caracteres"})
        .max(20, {message: "Contraseña debe tener como maximo 20 caracteres"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
            message: "Contraseña debe tener al menos una mayuscula, una minuscula y un numero"
        }),
})

export const loginSchema = z.object({
    email: z
        .string({required_error: "Email es requerido"})
        .email({message: "Formato de email invalido"}),

        password: z
        .string({required_error: "Contraseña es requerida"})
        .min(6, {message: "Contraseña debe tener al menos 6 caracteres"})
        .max(18, {message: "Contraseña debe tener como maximo 18 caracteres"})
})