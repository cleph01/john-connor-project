import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { createClient } from "@supabase/supabase-js";

// Use service role key for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, name, token } = await request.json();

    if (!email || !name || !token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://johnconnorproject.org"}/api/verify-email/${token}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify your email - John Connor Project",
      text: `Hello ${name},

Thank you for registering with the John Connor Project.

Please verify your email address by visiting the link below:

${verificationUrl}

This link expires in 24 hours.

If you didn't sign up for the John Connor Project, you can ignore this email.

— The John Connor Project
https://johnconnorproject.org
      `,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #030303; font-family: 'Courier New', monospace;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #ff1744; font-size: 24px; margin: 0; letter-spacing: 2px;">
                  JOHN CONNOR PROJECT
                </h1>
                <p style="color: #00ff41; font-size: 12px; margin-top: 8px; letter-spacing: 1px;">
                  DIGITAL RESISTANCE NETWORK
                </p>
              </div>

              <!-- Main Content -->
              <div style="background-color: #0a0a0a; border: 1px solid #2a2a2a; border-top: 3px solid #ff1744; padding: 30px;">
                <p style="color: #e8e8e8; font-size: 14px; margin: 0 0 20px 0;">
                  Hello ${name},
                </p>

                <p style="color: #888888; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                  Thank you for joining the resistance. To complete your registration, please verify your email address by clicking the button below.
                </p>

                <!-- Button -->
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}"
                     style="display: inline-block; background-color: #ff1744; color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 14px; letter-spacing: 1px; font-weight: bold;">
                    VERIFY EMAIL
                  </a>
                </div>

                <p style="color: #555555; font-size: 12px; line-height: 1.6; margin: 20px 0 0 0;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="color: #00d4ff; font-size: 12px; word-break: break-all; margin: 10px 0 0 0;">
                  ${verificationUrl}
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #555555; font-size: 11px; margin: 0;">
                  This link expires in 24 hours.
                </p>
                <p style="color: #555555; font-size: 11px; margin: 10px 0 0 0;">
                  If you didn't sign up for the John Connor Project, you can ignore this email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verification email error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
