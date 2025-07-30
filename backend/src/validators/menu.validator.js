import { z } from 'zod';

export const createMenuSchema = z.object({
    title: z.string({
        required_error: 'Title is required!!!'
    }).min(1, 'Title cannot be empty'),
    
    description: z.string({
        required_error: 'Description is required!!!'
    }).optional(),

    deliveryTime: z.coerce.date().optional()
});

export const updateMenuSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    deliveryTime: z.coerce.date().optional()
});
