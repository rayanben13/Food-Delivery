import { NextResponse } from "next/server";
import { sendMail } from "../../../lib/mailer";
import prisma from "@/src/lib/prisma";

// 🟢 Create order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      image,
      size,
      extras,
      delivery,
      totalPrice,
      userEmail,
      phone,
      city,
      subTotal,
    } = body;

    const subTotalNum = parseFloat(subTotal);
    const deliveryNum = parseFloat(delivery);
    const totalPriceNum = parseFloat(totalPrice);

    const order = await prisma.order.create({
      data: {
        name,
        image,
        size,
        extras: Array.isArray(extras) ? extras.join(", ") : extras,
        subTotal: subTotalNum,
        delivery: deliveryNum,
        totalPrice: totalPriceNum,
        userEmail: userEmail || process.env.EMAIL_USER,
        phone: phone || "00000000",
        city: city || "Alger",
      },
    });

    // Send confirmation email
    await sendMail(
      userEmail || process.env.EMAIL_USER,
      "✅ Order Confirmed!",
      `<h2>Your order has been confirmed</h2>
       <p><b>${name}</b> - ${size}</p>
       <p>Total: ${totalPriceNum} DA</p>`
    );

    return NextResponse.json({ success: true, order }); // ✅ Must return JSON
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Order Save Error:", message);
    return NextResponse.json({ success: false, error: message });
  }
}

// 🟡 Get all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json({ success: true, orders }); // ✅ Must return JSON
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Fetch Orders Error:", message);
    return NextResponse.json({ success: false, error: message });
  }
}
