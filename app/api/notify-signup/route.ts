import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const formId = process.env.FORMSPREE_FORM_ID;
    if (!formId) {
      console.error("FORMSPREE_FORM_ID not set");
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Formspree error:", response.status);
      return NextResponse.json({ error: "Notification failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notify signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
