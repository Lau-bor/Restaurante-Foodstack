import { z } from 'zod';

export const createUserOrderSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string().min(1, "El ID del item del menú es requerido."), 
    name: z.string().min(1, "El nombre del item es requerido."), 
    price: z.number().min(0.01, "El precio del item debe ser mayor que cero."), 
    quantity: z.number().min(1, "La cantidad debe ser al menos 1.") 
  }), "La orden debe contener al menos un item."), 
  totalAmount: z.number().min(0.01, "El monto total debe ser mayor que cero.") 
});