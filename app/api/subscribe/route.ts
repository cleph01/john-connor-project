import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    return NextResponse.json({ error: "Newsletter service not configured." }, { status: 500 });
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "johnconnorproject.org",
        utm_medium: "website",
      }),
    }
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    // Treat "already subscribed" as success — no need to surface an error
    if (res.status === 409 || body?.errors?.[0]?.includes("already")) {
      return NextResponse.json({ message: "Already subscribed." }, { status: 200 });
    }
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ message: "Subscribed." }, { status: 200 });
}
