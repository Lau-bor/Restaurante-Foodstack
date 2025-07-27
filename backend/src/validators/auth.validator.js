import {z} from 'zod';

export const registerSchema = z.object({
    username: z
    .string({required_error: "Username is required"})
    .min(5, {message: "Username must be at least 5 characters"})
    .max(20)
    ,

    email: z
        .string({required_error: "Email is required"})
        .email({ pattern: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i}, {message:"Invalid Email"}),

    password: z
        .string({required_error: "Password is required"})
        .min(6, {message: "Password must be at least 6 characters"})
        .max(20, {message: "Password must be at most 20 characters"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        }),
})

export const loginSchema = z.object({
    email: z
        .string({required_error: "Email is required"})
        .email({message: "Invalid email format"}),

        password: z
        .string({required_error: "Password is required"})
        .min(6, {message: "Password must be at least 6 characters"})
        .max(18, {message: "Password must be at most 18 characters"})
})