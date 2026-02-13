"use server";

import { signIn } from "@/src/auth";
import { LoginSchema } from "@/src/lib/validations/auth";

export type LoginState = {
  success?: boolean;
  error?: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  // ✅ Validate input
  const parsed = LoginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // مهم جدًا
    });

    return { success: true };
  } catch (err: any) {
    return {
      error: "Invalid email or password",
    };
  }
}
