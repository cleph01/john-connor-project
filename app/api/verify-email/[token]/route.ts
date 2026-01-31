import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role key for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface RouteParams {
  params: Promise<{ token: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.redirect(
        new URL("/verify-email?status=error&message=missing-token", request.url)
      );
    }

    // Find professional with this token
    const { data: professional, error: findError } = await supabaseAdmin
      .from("professionals")
      .select("id, email_verified")
      .eq("verification_token", token)
      .single();

    if (findError || !professional) {
      return NextResponse.redirect(
        new URL("/verify-email?status=error&message=invalid-token", request.url)
      );
    }

    if (professional.email_verified) {
      return NextResponse.redirect(
        new URL("/verify-email?status=already-verified", request.url)
      );
    }

    // Mark as verified and clear token
    const { error: updateError } = await supabaseAdmin
      .from("professionals")
      .update({
        email_verified: true,
        verification_token: null,
      })
      .eq("id", professional.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return NextResponse.redirect(
        new URL("/verify-email?status=error&message=update-failed", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/verify-email?status=success", request.url)
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(
      new URL("/verify-email?status=error&message=unknown", request.url)
    );
  }
}
