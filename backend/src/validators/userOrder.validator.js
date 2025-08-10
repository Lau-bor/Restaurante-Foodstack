import { z } from 'zod';

export const createUserOrderSchema = z.object({
  items: z.array(z.object({
    menuId: z.string().min(1, "Menu item ID is required."),
    quantity: z.number().min(1, "Quantity must be at least 1.")
  }), "Order must contain at least one item.")
});
