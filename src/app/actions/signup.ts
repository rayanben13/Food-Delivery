"use server";

import { hash } from "bcrypt";
import { SignupSchema } from "../../lib/validations/auth";
import prisma from "@/src/lib/prisma";

type ActionState = {
  error?: string;
  success?: boolean;
};

export async function signupAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { name, email, password } = parsed.data;

  const exists = await prisma.user.findUnique({
    where: { email },
  });

  if (exists) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: true };
}
