"use server";

import prisma from "@/src/lib/prisma";
import { auth } from "@/src/auth";
import { uploadToCloudinary } from "@/src/lib/cloudenary";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // جلب بيانات المستخدم الحالية
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) throw new Error("User not found");

  let imageUrl: string | undefined;

  const image = formData.get("image") as File | null;

  if (image) {
    // رفع الصورة الجديدة فقط
    const upload = await uploadToCloudinary(image);
    imageUrl = upload.secure_url;
  }

  // تحديث المستخدم
  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: formData.get("name") as string,
      city: formData.get("city") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      ...(imageUrl && { image: imageUrl }), // تحديث الصورة الجديدة فقط
    },
  });

  // إعادة تحميل صفحات Server Components
  revalidatePath("/admin");
  revalidatePath("/profile");

  return updatedUser;
}
