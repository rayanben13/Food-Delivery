"use server";

import prisma from "@/src/lib/prisma";
import { EditCategorySchema } from "@/src/lib/validations/category";
import { revalidatePath } from "next/cache";

export type FormState = {
  error?: string;
  success?: boolean;
};

export async function editCategoryAction(
  id: string,
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get("name"),
  };

  const parsed = EditCategorySchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await prisma.category.update({
    where: { id },
    data: { name: parsed.data.name },
  });

  revalidatePath("/admin/categories");

  return { success: true };
}
