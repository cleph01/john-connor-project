"use client";

import { useState } from "react";

interface SubscribeFormProps {
  context?: string; // optional framing text override
  compact?: boolean; // inline single-line layout vs. stacked
}

const SubscribeForm = ({
  context = "Infrastructure intel for homeowners and IT pros. Home networking, NAS, smart home, and digital sovereignty — straight from the field.",
  compact = false,
}: SubscribeFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setMessage("You're in. Welcome to The Uplink.");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Connection failed. Please try again.");
    }
  };

  if (compact) {
    return (
      <div className="w-full">
        {status === "success" ? (
          <p className="font-mono text-xs text-phosphor">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
              className="flex-1 bg-void border border-ash px-3 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-crimson transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="font-mono text-xs px-4 py-2 border border-crimson text-crimson hover:bg-crimson/10 transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Subscribe →"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="font-mono text-xs text-crimson mt-1">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="terminal-card p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
        <span className="font-mono text-xs text-electric uppercase tracking-widest">
          The Uplink
        </span>
      </div>

      <h3 className="font-display text-lg text-text-primary mb-2">
        Stay in the Loop
      </h3>
      <p className="font-mono text-xs text-text-muted leading-relaxed mb-6">
        {context}
      </p>

      {status === "success" ? (
        <div className="px-4 py-3 border border-phosphor/30 bg-phosphor/5">
          <p className="font-mono text-sm text-phosphor">{message}</p>
          <p className="font-mono text-xs text-text-muted mt-1">
            Check your inbox to confirm your subscription.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            className="w-full bg-void border border-ash px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-electric transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full font-mono text-sm px-4 py-3 border border-electric text-electric hover:bg-electric/10 transition-all duration-200 disabled:opacity-50"
          >
            {status === "loading" ? "Connecting..." : "Subscribe to The Uplink →"}
          </button>
          {status === "error" && (
            <p className="font-mono text-xs text-crimson">{message}</p>
          )}
          <p className="font-mono text-xs text-text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
};

export default SubscribeForm;
