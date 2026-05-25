import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey.includes("your_resend_api_key_here")) {
      return NextResponse.json(
        { error: "Missing real RESEND_API_KEY in .env.local or Vercel." },
        { status: 500 }
      );
    }

    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "StillAwake Media <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || "jaedendoody10@gmail.com",
      replyTo: email,
      subject: `New StillAwake Media inquiry from ${name}`,
      text: `Name: ${name}
Email: ${email}
Service: ${service || "Not selected"}

Message:
${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error sending message." }, { status: 500 });
  }
}
