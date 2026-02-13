"use server";

import prisma from "@/src/lib/prisma";
import { categorySchema } from "@/src/lib/validations/category";
import { revalidatePath } from "next/cache";

export type FormState = {
  success: boolean;
  error?: string;
};

export async function addCategory(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get("name"),
  };

  const parsed = categorySchema.safeParse(rawData);

  // ❌ validation error
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  const { name } = parsed.data;

  await prisma.category.create({
    data: { name },
  });

  revalidatePath("/admin/categories");

  // ✅ MUST return success
  return {
    success: true,
  };
}
