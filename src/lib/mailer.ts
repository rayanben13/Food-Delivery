// src/lib/mailer.ts
import nodemailer from "nodemailer";

export async function sendMail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your App password
    },
  });

  await transporter.sendMail({
    from: `"Pizza App 🍕" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
