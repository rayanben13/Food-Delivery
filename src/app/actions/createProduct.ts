"use server";

import { uploadToCloudinary } from "@/src/lib/cloudenary";
import prisma from "@/src/lib/prisma";
import { ProductSchema } from "@/src/lib/validations/product";
import { revalidatePath } from "next/cache";

export type CreateProductState = {
  success: boolean;
  errors?: {
    name?: string;
    description?: string;
    price?: string;
    categoryId?: string;
    image?: string;
  };
};

export async function createProduct(
  prevState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
    image: formData.get("image"),
  };

  const parsed = ProductSchema.safeParse(rawData);

  // ❌ أخطاء Zod
  if (!parsed.success) {
    const errors: CreateProductState["errors"] = {};

    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof errors;
      errors[field] = issue.message;
    });

    return { success: false, errors };
  }

  // ✅ رفع الصورة
  const upload = await uploadToCloudinary(parsed.data.image);

  await prisma.product.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      categoryId: parsed.data.categoryId,
      image: upload.secure_url,
    },
  });

  revalidatePath("/admin/menuItems");
  revalidatePath("/menu");

  return { success: true };
}
