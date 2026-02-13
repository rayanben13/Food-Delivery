import prisma from "@/src/lib/prisma";
import { sendMail } from "../../../../lib/mailer";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    // Get order before deleting it
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" });
    }

    await prisma.order.delete({
      where: { id: Number(id) },
    });

    // ✅ Send cancellation email
    await sendMail(
      order.userEmail,
      "❌ Order Canceled",
      `
        <h2>Order Cancellation</h2>
        <p>Your order <strong>${order.name}</strong> has been canceled.</p>
        <p>Total: ${order.totalPrice} DA</p>
      `
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json({
      success: false,
      error: message,
    });
  }
}
