import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";

import prisma from "./lib/prisma";
import { LoginSchema } from "./lib/validations/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            role: true,
            phone: true,
            city: true,
            image: true,
            address: true,
          },
        });

        if (!user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
          city: user.city,
          image: user.image,
          address: user.address,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
      }
      if (user && token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            role: true,
            phone: true,
            city: true,
            name: true,
            image: true,
            address: true,
          },
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.phone = dbUser.phone ?? undefined;
          token.city = dbUser.city ?? undefined;
          token.image = dbUser.image ?? undefined;
          token.name = dbUser.name ?? undefined;
          token.address = dbUser.address ?? undefined;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.city = token.city;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.address = token.address;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
});
