"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export type DeleteState = {
  success: boolean;
  error?: string;
};

export async function deleteCategoryAction(
  id: string,
  prevState: DeleteState
): Promise<DeleteState> {
  try {
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";

    return {
      success: false,
      error: message,
    };
  }
}
