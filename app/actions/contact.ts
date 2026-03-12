"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields." };
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
