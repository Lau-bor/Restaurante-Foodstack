import { z } from 'zod';

export const createUserOrderSchema = z.object({
  items: z.array(z.object({
    menuId: z.string().min(1, "Menu item ID es requerido."),
    quantity: z.number().min(1, "Quantity debe ser al menos 1.")
  }), "Order debe contener al menos 1 item.")
});
