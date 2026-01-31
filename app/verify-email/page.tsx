"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerificationContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  const getContent = () => {
    switch (status) {
      case "success":
        return {
          icon: "✓",
          iconColor: "text-phosphor",
          title: "Email Verified",
          description:
            "Your email has been verified successfully. Your application is now in our review queue. We'll be in touch soon.",
          showHomeLink: true,
        };
      case "already-verified":
        return {
          icon: "✓",
          iconColor: "text-electric",
          title: "Already Verified",
          description:
            "This email has already been verified. No further action is needed.",
          showHomeLink: true,
        };
      case "error":
        return {
          icon: "✗",
          iconColor: "text-crimson",
          title: "Verification Failed",
          description: getErrorMessage(message),
          showHomeLink: true,
        };
      default:
        return {
          icon: "?",
          iconColor: "text-warning",
          title: "Invalid Request",
          description:
            "This page requires a verification link. Please check your email for the verification link.",
          showHomeLink: true,
        };
    }
  };

  const getErrorMessage = (msg: string | null) => {
    switch (msg) {
      case "missing-token":
        return "The verification link is incomplete. Please use the full link from your email.";
      case "invalid-token":
        return "This verification link is invalid or has expired. Please submit a new application.";
      case "update-failed":
        return "There was a problem updating your verification status. Please try again or contact us.";
      default:
        return "An unexpected error occurred. Please try again or contact us for assistance.";
    }
  };

  const content = getContent();

  return (
    <main className="min-h-screen bg-void relative flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="terminal-card p-8 sm:p-10 text-center"
        >
          {/* Icon */}
          <div
            className={`text-6xl mb-6 ${content.iconColor}`}
            style={{ fontFamily: "monospace" }}
          >
            {content.icon}
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-6">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === "success" || status === "already-verified"
                  ? "bg-phosphor"
                  : "bg-crimson"
              }`}
            />
            <span
              className={`text-xs font-mono uppercase tracking-widest ${
                status === "success" || status === "already-verified"
                  ? "text-phosphor"
                  : "text-crimson"
              }`}
            >
              {status === "success" || status === "already-verified"
                ? "Verification Complete"
                : "Verification Error"}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl text-text-primary mb-4">
            {content.title}
          </h1>

          {/* Description */}
          <p className="font-mono text-sm text-text-secondary leading-relaxed mb-8">
            {content.description}
          </p>

          {/* Links */}
          {content.showHomeLink && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn-terminal px-6 py-3 text-sm text-center"
              >
                Return Home
              </Link>
              {status === "success" && (
                <Link
                  href="/directory"
                  className="btn-resistance px-6 py-3 text-sm text-center"
                >
                  <span className="relative z-10">View Directory</span>
                </Link>
              )}
            </div>
          )}

          {/* Terminal decoration */}
          <div className="mt-8 pt-6 border-t border-ash">
            <pre className="font-mono text-xs text-text-muted text-left">
              <code>
                <span className="text-phosphor">$</span> ./verify --email
                <br />
                <span className="text-text-muted">[*]</span> Status:{" "}
                <span
                  className={
                    status === "success" || status === "already-verified"
                      ? "text-phosphor"
                      : "text-crimson"
                  }
                >
                  {status?.toUpperCase() || "UNKNOWN"}
                </span>
                <br />
                <span className="text-text-muted">[*]</span> Process complete
                <span className="cursor-blink" />
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-void flex items-center justify-center">
          <div className="font-mono text-text-muted">Loading...</div>
        </main>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}
