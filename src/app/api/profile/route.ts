import { auth } from "@/src/auth";
import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, city, phone, image } = await req.json();

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, email, city, phone, image },
  });

  return NextResponse.json({ success: true });
}
