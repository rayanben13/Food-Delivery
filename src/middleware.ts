import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@/generated/prisma/enums";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup");

  const isProfile = pathname.startsWith("/profile");
  const isAdminPage = pathname.startsWith("/admin");

  // ✅ إذا المستخدم مسجل الدخول وحاول زيارة صفحة تسجيل الدخول → أرسله إلى الصفحة المناسبة
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // ✅ إذا المستخدم غير مسجل الدخول وحاول زيارة dashboard أو admin → أرسله لتسجيل الدخول
  if (!token && (isProfile || isAdminPage)) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // ✅ إذا المستخدم مسجل الدخول، توجيه حسب الدور فقط إذا ليس في الصفحة الصحيحة
  if (token) {
    if (token.role === Role.ADMIN && !isAdminPage) {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (token.role !== Role.ADMIN && !isProfile) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  // ✅ اترك أي مستخدم بالفعل في الصفحة الصحيحة
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/signin/:path*",
    "/auth/signup/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
