import { z } from 'zod';

export const createMenuSchema = z.object({
  title: z.string().min(1, "Title es requerido."),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => typeof val === "string" ? Number(val) : val,
    z.number().min(0, "Price debe ser al menos 0.")
  ),
  category: z.string().optional(),
  deliveryTime: z.string().optional(),
  files: z.array(z.object({
    name: z.string(),
    path: z.string(),
    size: z.number(),
    mimetype: z.string()
  })).optional()
});