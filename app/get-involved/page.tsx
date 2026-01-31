"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { supabase } from "@/lib/supabase";

interface FormErrors {
  name?: string;
  email?: string;
  location?: string;
  expertise?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const GetInvolved = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    expertise: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = "Name is required";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = "Invalid email format";
    }

    // Location validation
    const trimmedLocation = formData.location.trim();
    if (!trimmedLocation) {
      newErrors.location = "Location is required";
    } else if (trimmedLocation.length < 2) {
      newErrors.location = "Location must be at least 2 characters";
    }

    // Expertise validation
    const trimmedExpertise = formData.expertise.trim();
    if (!trimmedExpertise) {
      newErrors.expertise = "Expertise is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    setStatus("submitting");

    try {
      // Submit to Supabase (creates unverified entry)
      const { error: supabaseError } = await supabase
        .from("professionals")
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            location: formData.location.trim(),
            expertise: formData.expertise.trim(),
            verified: false,
            public: false,
          },
        ]);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        throw supabaseError;
      }

      // Also notify via Formspree (for email alerts)
      await fetch("https://formspree.io/f/mdazdvnz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus("success");

      // Track conversion in Google Analytics
      sendGAEvent("event", "technologist_signup", {
        event_category: "conversion",
        event_label: formData.location,
      });

      setFormData({ name: "", email: "", location: "", expertise: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClassName = (fieldName: keyof FormErrors) => `
    w-full p-4 rounded-none bg-terminal border border-l-2
    text-text-primary placeholder-text-muted font-mono
    focus:outline-none focus:shadow-[0_0_10px_rgba(255,23,68,0.3)] transition-all
    ${errors[fieldName]
      ? "border-crimson/50 border-l-crimson focus:border-crimson"
      : "border-ash border-l-crimson focus:border-crimson"
    }
  `;

  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-phosphor/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-crimson transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-crimson">Get Involved</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-6">
            <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse" />
            <span className="text-phosphor text-xs font-mono uppercase tracking-widest">
              Recruitment Active
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Get Involved
          </h1>

          <p className="font-mono text-text-secondary max-w-xl mx-auto leading-relaxed">
            Join the mission. Register as a technologist or cybersecurity
            professional to help protect your community from AI-driven threats.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 border border-warning/30 bg-warning/5">
            <span className="text-warning text-xs font-mono">
              Note: This is not a charity. You will negotiate a fair price
              between you and your client.
            </span>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="terminal-card hex-corner p-6 sm:p-10">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-ash">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-warning/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-phosphor/80" />
              </div>
              <span className="text-text-muted text-xs font-mono ml-2">
                recruitment_form.sh
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">01.</span> Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClassName("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">02.</span> Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@domain.com"
                  className={inputClassName("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.email}
                  </p>
                )}
              </div>

              {/* Location Field */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">03.</span> Location
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className={inputClassName("location")}
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? "location-error" : undefined}
                />
                {errors.location && (
                  <p id="location-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.location}
                  </p>
                )}
              </div>

              {/* Expertise Field */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">04.</span> Your Expertise
                  </span>
                </label>
                <textarea
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  placeholder="Briefly describe your expertise and how you can contribute to the mission..."
                  rows={5}
                  className={`${inputClassName("expertise")} resize-none`}
                  aria-invalid={!!errors.expertise}
                  aria-describedby={errors.expertise ? "expertise-error" : undefined}
                />
                {errors.expertise && (
                  <p id="expertise-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.expertise}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-resistance w-full py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {status === "submitting" ? "Transmitting..." : "Submit Application"}
                  </span>
                </button>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="p-4 border border-phosphor/50 bg-phosphor/10">
                  <p className="font-mono text-sm text-phosphor">
                    [SUCCESS] Application transmitted. We&apos;ll be in touch soon.
                  </p>
                </div>
              )}
              {status === "error" && (
                <div className="p-4 border border-crimson/50 bg-crimson/10">
                  <p className="font-mono text-sm text-crimson">
                    [ERROR] Transmission failed. Please try again or contact us directly.
                  </p>
                </div>
              )}

              {/* Terminal output decoration */}
              <div className="pt-6 border-t border-ash">
                <pre className="font-mono text-xs text-text-muted">
                  <code>
                    <span className="text-phosphor">$</span> ./submit
                    --application
                    <br />
                    <span className="text-text-muted">[*]</span> Validating
                    credentials...
                    <br />
                    <span className="text-text-muted">[*]</span> Encryption:
                    <span className="text-phosphor"> AES-256</span>
                    <br />
                    <span className="text-text-muted">[*]</span> Awaiting
                    input...
                    <span className="cursor-blink" />
                  </code>
                </pre>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid sm:grid-cols-2 gap-6"
        >
          <div className="terminal-card p-6">
            <h3 className="font-display text-sm text-crimson mb-3">
              What Happens Next?
            </h3>
            <p className="font-mono text-xs text-text-secondary leading-relaxed">
              After submission, your application will be reviewed by our team.
              Verified technologists are added to our directory and connected
              with community members who need assistance.
            </p>
          </div>
          <div className="terminal-card p-6">
            <h3 className="font-display text-sm text-crimson mb-3">
              Your Privacy Matters
            </h3>
            <p className="font-mono text-xs text-text-secondary leading-relaxed">
              We practice what we preach. Your data is encrypted, never sold,
              and only used to connect you with those who need your expertise.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default GetInvolved;
