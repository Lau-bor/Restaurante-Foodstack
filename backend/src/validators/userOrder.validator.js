import { z } from 'zod';

export const createUserOrderSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string().min(1),
    quantity: z.number().min(1)
  })),
  totalAmount: z.number().min(1)
});