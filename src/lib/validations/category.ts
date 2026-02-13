import { z } from "zod";

export const categorySchema = z.object({
  name: z.string("Name is required").min(1, "Name is required"),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const EditCategorySchema = z.object({
  name: z.string("Name is required").min(1, "Name is required"),
});

export type EditCategoryInput = z.infer<typeof EditCategorySchema>;
