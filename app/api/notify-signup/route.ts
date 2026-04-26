import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (!notificationEmail) {
      console.error("NOTIFICATION_EMAIL not set");
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const { name, email, company_name, location, linkedin_url, website, specialties, expertise, pro_bono, pro_bono_circumstances } = body;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: notificationEmail,
      subject: `New JCP Registration — ${name}`,
      text: `New registration received — pending email verification and your review.

Name: ${name}${company_name ? `\nCompany: ${company_name}` : ""}
Email: ${email}
Location: ${location}
LinkedIn: ${linkedin_url}${website ? `\nWebsite: ${website}` : ""}
Specialties: ${specialties?.join(", ") || "None selected"}
Pro-Bono: ${pro_bono ? `Yes${pro_bono_circumstances ? ` — ${pro_bono_circumstances}` : ""}` : "No"}

Expertise:
${expertise}

---
Review in Supabase and set verified=true and public=true to approve.
https://supabase.com/dashboard
      `,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="margin: 0; padding: 0; background-color: #030303; font-family: 'Courier New', monospace;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ff1744; font-size: 20px; margin: 0; letter-spacing: 2px;">
                  NEW REGISTRATION
                </h1>
                <p style="color: #00ff41; font-size: 11px; margin-top: 6px; letter-spacing: 1px;">
                  PENDING EMAIL VERIFICATION + YOUR REVIEW
                </p>
              </div>

              <div style="background-color: #0a0a0a; border: 1px solid #2a2a2a; border-top: 3px solid #ff1744; padding: 24px;">

                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="color: #555; padding: 8px 0; border-bottom: 1px solid #1a1a1a; width: 140px;">Name</td>
                    <td style="color: #e8e8e8; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">${name}</td>
                  </tr>
                  ${company_name ? `
                  <tr>
                    <td style="color: #555; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">Company</td>
                    <td style="color: #e8e8e8; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">${company_name}</td>
                  </tr>` : ""}
                  <tr>
                    <td style="color: #555; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">Email</td>
                    <td style="color: #00d4ff; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">${email}</td>
                  </tr>
                  <tr>
                    <td style="color: #555; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">Location</td>
                    <td style="color: #e8e8e8; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">${location}</td>
                  </tr>
                  <tr>
                    <td style="color: #555; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">LinkedIn</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #1a1a1a;">
                      <a href="${linkedin_url}" style="color: #00d4ff;">${linkedin_url}</a>
                    </td>
                  </tr>
                  ${website ? `
                  <tr>
                    <td style="color: #555; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">Website</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #1a1a1a;">
                      <a href="${website}" style="color: #00d4ff;">${website}</a>
                    </td>
                  </tr>` : ""}
                  <tr>
                    <td style="color: #555; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">Specialties</td>
                    <td style="color: #00ff41; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">${specialties?.join(", ") || "None selected"}</td>
                  </tr>
                  <tr>
                    <td style="color: #555; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">Pro-Bono</td>
                    <td style="color: #e8e8e8; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">
                      ${pro_bono ? `Yes${pro_bono_circumstances ? ` — ${pro_bono_circumstances}` : ""}` : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #555; padding: 8px 0; vertical-align: top;">Expertise</td>
                    <td style="color: #e8e8e8; padding: 8px 0; line-height: 1.6;">${expertise}</td>
                  </tr>
                </table>

              </div>

              <div style="text-align: center; margin-top: 24px;">
                <p style="color: #555; font-size: 11px; margin: 0;">
                  Review in Supabase → set verified=true and public=true to approve.
                </p>
                <p style="color: #555; font-size: 11px; margin-top: 6px;">
                  Awaiting email verification by applicant before they can appear in directory.
                </p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend notification error:", error);
      return NextResponse.json({ error: "Notification failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notify signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
