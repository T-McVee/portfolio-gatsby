import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  // TODO: Wire up Resend or another email service
  // For now, just log and return success
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ success: true });
}
