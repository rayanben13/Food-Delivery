import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(5, "Description is too short"),
  price: z.coerce.number().positive("Price must be a positive number"),
  categoryId: z.string().min(1, "Please select a category"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Image must be JPG, PNG, or WEBP"
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Image size must be less than 2MB"
    ),
});

export type ProductForm = z.infer<typeof ProductSchema>;
