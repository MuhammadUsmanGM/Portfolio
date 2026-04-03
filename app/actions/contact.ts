"use server";

import { Resend } from "resend";
import { rateLimit, getClientIp } from "../api/nova/rate-limit";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const headerList = await headers();
  const ip = getClientIp((name) => headerList.get(name));
  
  // Strict rate limit for contact form: 2 requests per minute
  const { success } = rateLimit(`contact_${ip}`, 2);
  if (!success) {
    return { success: false, error: "Too many attempts. Please wait a minute." };
  }

  const honeypot = formData.get("website") as string;
  if (honeypot) {
    // Return fake success for bots
    return { success: true };
  }

  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const message = (formData.get("message") as string || "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields." };
  }

  if (name.length > 100 || email.length > 254 || message.length > 3000 || message.length < 10) {
    return { success: false, error: "Invalid input length." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "mu.ai.dev@gmail.com"],
      subject: `New Message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Resend Error:", err);
    return { success: false, error: "Internal server error." };
  }
}
