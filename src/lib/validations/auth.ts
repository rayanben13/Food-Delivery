import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string("Email is required").email("Invalid email"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const SignupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "confirm password must be like password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // الخطأ يظهر تحت confirmPassword
  });

export type SignupForm = z.infer<typeof SignupSchema>;

export const ProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  city: z.string().optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^(?:\+213|00213|0)(5|6|7)\d{8}$/.test(val), {
      message: "Invalid phone number",
    }),
  image: z.preprocess(
    (val) => (val instanceof File ? val : undefined),
    z
      .instanceof(File)
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only JPG, PNG, or WEBP images are allowed"
      )
      .refine(
        (file) => file.size <= 2 * 1024 * 1024,
        "Image must be less than 2MB"
      )
      .optional()
  ),
});

export type ProfileForm = z.infer<typeof ProfileSchema>;
