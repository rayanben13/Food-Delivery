import { DefaultSession } from "next-auth";
import { $Enums } from "@/src/app/generated/prisma/client";

type Role = $Enums.Role;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      phone?: string;
      city?: string;
      name?: string;
      image?: string;
      address?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role: Role;
    phone?: string;
    city?: string;
    image?: string;
    name?: string;
    address?: string;
  }
}
