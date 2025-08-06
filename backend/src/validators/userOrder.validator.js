import { z } from 'zod';

export const createUserOrderSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string().min(1, "El ID del item del menú es requerido."),
    quantity: z.number().min(1, "La cantidad debe ser al menos 1.")
  }), "La orden debe contener al menos un item.")
});
