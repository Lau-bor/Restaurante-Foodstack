import { z } from 'zod';

export const createMenuSchema = z.object({
  title: z.string({
    required_error: 'Title is required!!!'
  }),
  description: z.string().optional(),
  price: z.coerce.number({
    required_error: 'Price is required and must be a number'
  }).min(0, 'Price must be positive'),
  date: z.string().datetime().optional()
});

