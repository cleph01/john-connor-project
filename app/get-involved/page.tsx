"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { supabase } from "@/lib/supabase";

const SPECIALTIES = [
  "Home Networking & WiFi",
  "NAS & Personal Cloud",
  "IoT & Smart Home",
  "Structured Cabling",
  "Access Control & Security Systems",
  "Cybersecurity & Privacy",
  "AI Threat Defense",
  "Small Business IT",
  "General IT Support",
];

const US_STATES = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "DC", name: "District of Columbia" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
];

interface FormErrors {
  name?: string;
  email?: string;
  city?: string;
  state?: string;
  linkedin_url?: string;
  website?: string;
  expertise?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const URL_REGEX = /^https?:\/\/.+\..+/;
const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/.+/;

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const GetInvolved = () => {
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    email: "",
    city: "",
    state: "",
    linkedin_url: "",
    website: "",
    specialties: [] as string[],
    expertise: "",
    pro_bono: false,
    pro_bono_circumstances: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = "Name is required";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = "Invalid email format";
    }

    const trimmedCity = formData.city.trim();
    if (!trimmedCity) {
      newErrors.city = "City is required";
    } else if (trimmedCity.length < 2) {
      newErrors.city = "City must be at least 2 characters";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    const trimmedLinkedIn = formData.linkedin_url.trim();
    if (!trimmedLinkedIn) {
      newErrors.linkedin_url = "LinkedIn profile URL is required";
    } else if (!LINKEDIN_REGEX.test(trimmedLinkedIn)) {
      newErrors.linkedin_url = "Must be a valid linkedin.com URL";
    }

    const trimmedWebsite = formData.website.trim();
    if (trimmedWebsite && !URL_REGEX.test(trimmedWebsite)) {
      newErrors.website = "Must be a valid URL (include https://)";
    }

    const trimmedExpertise = formData.expertise.trim();
    if (!trimmedExpertise) {
      newErrors.expertise = "Expertise is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const verificationToken = generateToken();
      const trimmedEmail = formData.email.trim().toLowerCase();
      const trimmedName = formData.name.trim();
      const location = `${formData.city.trim()}, ${formData.state}`;

      const { data: existingUser } = await supabase
        .from("professionals")
        .select("id, email_verified")
        .eq("email", trimmedEmail)
        .single();

      if (existingUser) {
        if (existingUser.email_verified) {
          setErrorMessage(
            "This email is already registered. Contact us if you need to update your information."
          );
          setStatus("error");
          return;
        } else {
          setErrorMessage(
            "This email is pending verification. Please check your inbox or spam folder."
          );
          setStatus("error");
          return;
        }
      }

      const { error: supabaseError } = await supabase
        .from("professionals")
        .insert([
          {
            name: trimmedName,
            company_name: formData.company_name.trim() || null,
            email: trimmedEmail,
            location,
            linkedin_url: formData.linkedin_url.trim(),
            website: formData.website.trim() || null,
            specialties: formData.specialties.length > 0 ? formData.specialties : null,
            expertise: formData.expertise.trim(),
            pro_bono: formData.pro_bono,
            pro_bono_circumstances: formData.pro_bono
              ? formData.pro_bono_circumstances.trim() || null
              : null,
            verified: false,
            public: false,
            email_verified: false,
            verification_token: verificationToken,
          },
        ]);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        throw supabaseError;
      }

      const emailResponse = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          name: trimmedName,
          token: verificationToken,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Failed to send verification email");
      }

      await fetch("/api/notify-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          location,
          _subject: "New JCP Registration (pending email verification)",
        }),
      });

      setStatus("success");

      sendGAEvent("event", "technologist_signup", {
        event_category: "conversion",
        event_label: location,
      });

      setFormData({
        name: "",
        company_name: "",
        email: "",
        city: "",
        state: "",
        linkedin_url: "",
        website: "",
        specialties: [],
        expertise: "",
        pro_bono: false,
        pro_bono_circumstances: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Transmission failed. Please try again or contact us directly.");
    }
  };

  const inputClass = (fieldName: keyof FormErrors) => `
    w-full p-4 rounded-none bg-terminal border border-l-2
    text-text-primary placeholder-text-muted font-mono
    focus:outline-none focus:shadow-[0_0_10px_rgba(255,23,68,0.3)] transition-all
    ${
      errors[fieldName]
        ? "border-crimson/50 border-l-crimson focus:border-crimson"
        : "border-ash border-l-crimson focus:border-crimson"
    }
  `;

  return (
    <main className="min-h-screen bg-void relative">
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-phosphor/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-crimson transition-colors">Home</Link>
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
            Get listed in our directory. Whether you work in IT, networking, structured
            cabling, cybersecurity, smart home integration, or security systems —
            your community needs access to what you know.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 border border-warning/30 bg-warning/5">
            <span className="text-warning text-xs font-mono">
              Note: This is not a charity. You will negotiate a fair price between you and your client.
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
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-ash">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-warning/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-phosphor/80" />
              </div>
              <span className="text-text-muted text-xs font-mono ml-2">recruitment_form.sh</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* 01. Full Name */}
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
                  className={inputClass("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.name}
                  </p>
                )}
              </div>

              {/* 02. Company Name */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">02.</span> Company Name{" "}
                    <span className="text-text-muted normal-case">(optional)</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Your business or LLC name"
                  className={inputClass("name").replace("border-l-crimson", "border-l-crimson")}
                />
              </div>

              {/* 03. Email */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">03.</span> Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@domain.com"
                  className={inputClass("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.email}
                  </p>
                )}
              </div>

              {/* 04. Location (city + state) */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">04.</span> Location
                  </span>
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className={inputClass("city")}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "city-error" : undefined}
                    />
                    {errors.city && (
                      <p id="city-error" className="mt-2 font-mono text-xs text-crimson">
                        [ERROR] {errors.city}
                      </p>
                    )}
                  </div>
                  <div className="w-36">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-none bg-terminal border border-l-2 text-text-primary font-mono focus:outline-none focus:shadow-[0_0_10px_rgba(255,23,68,0.3)] transition-all appearance-none cursor-pointer ${
                        errors.state
                          ? "border-crimson/50 border-l-crimson focus:border-crimson"
                          : "border-ash border-l-crimson focus:border-crimson"
                      } ${!formData.state ? "text-text-muted" : ""}`}
                      aria-invalid={!!errors.state}
                      aria-describedby={errors.state ? "state-error" : undefined}
                    >
                      <option value="" disabled>State</option>
                      {US_STATES.map(({ abbr, name }) => (
                        <option key={abbr} value={abbr}>{abbr} — {name}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <p id="state-error" className="mt-2 font-mono text-xs text-crimson">
                        [ERROR] {errors.state}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 05. LinkedIn */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">05.</span> LinkedIn Profile
                  </span>
                </label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className={inputClass("linkedin_url")}
                  aria-invalid={!!errors.linkedin_url}
                  aria-describedby={errors.linkedin_url ? "linkedin-error" : undefined}
                />
                {errors.linkedin_url ? (
                  <p id="linkedin-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.linkedin_url}
                  </p>
                ) : (
                  <p className="mt-2 font-mono text-xs text-text-muted">
                    Required — helps us verify you&apos;re a real professional
                  </p>
                )}
              </div>

              {/* 06. Website */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">06.</span> Website{" "}
                    <span className="text-text-muted normal-case">(optional)</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className={inputClass("website")}
                  aria-invalid={!!errors.website}
                  aria-describedby={errors.website ? "website-error" : undefined}
                />
                {errors.website && (
                  <p id="website-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.website}
                  </p>
                )}
              </div>

              {/* 07. Specialties */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">07.</span> Specialties
                  </span>
                  <span className="ml-2 text-text-muted text-xs font-mono">(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2 p-4 bg-terminal border border-ash border-l-2 border-l-crimson">
                  {SPECIALTIES.map((specialty) => {
                    const selected = formData.specialties.includes(specialty);
                    return (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => handleSpecialtyToggle(specialty)}
                        className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 ${
                          selected
                            ? "border-phosphor bg-phosphor/10 text-phosphor"
                            : "border-ash text-text-muted hover:border-phosphor hover:text-phosphor"
                        }`}
                      >
                        {selected ? "✓ " : ""}{specialty}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 08. Expertise */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">08.</span> Your Expertise
                  </span>
                </label>
                <textarea
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  placeholder="Describe your technical background, specialties, and the types of work you're available for (e.g. home networking, NAS setup, cabling, smart home, cybersecurity)..."
                  rows={5}
                  className={`${inputClass("expertise")} resize-none`}
                  aria-invalid={!!errors.expertise}
                  aria-describedby={errors.expertise ? "expertise-error" : undefined}
                />
                {errors.expertise && (
                  <p id="expertise-error" className="mt-2 font-mono text-xs text-crimson">
                    [ERROR] {errors.expertise}
                  </p>
                )}
              </div>

              {/* 09. Pro-Bono */}
              <div>
                <label className="block mb-2">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    <span className="text-crimson">09.</span> Pro-Bono Work
                  </span>
                </label>
                <div className="p-4 bg-terminal border border-ash border-l-2 border-l-crimson space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.pro_bono}
                      onChange={(e) =>
                        setFormData({ ...formData, pro_bono: e.target.checked, pro_bono_circumstances: "" })
                      }
                      className="mt-0.5 w-4 h-4 accent-crimson flex-shrink-0"
                    />
                    <span className="font-mono text-xs text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
                      I&apos;m open to pro-bono work for individuals or families who need it
                    </span>
                  </label>
                  {formData.pro_bono && (
                    <div className="mt-3">
                      <label className="block mb-1">
                        <span className="text-text-muted text-xs font-mono">
                          Circumstances (optional — e.g. seniors, veterans, low-income households)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.pro_bono_circumstances}
                        onChange={(e) =>
                          setFormData({ ...formData, pro_bono_circumstances: e.target.value })
                        }
                        placeholder="Describe who you'd consider helping pro-bono..."
                        className="w-full p-3 rounded-none bg-void border border-ash text-text-primary placeholder-text-muted font-mono text-xs focus:outline-none focus:border-phosphor transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-resistance w-full py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {status === "submitting" ? "Transmitting..." : "Deploy Your Skills"}
                  </span>
                </button>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="p-4 border border-phosphor/50 bg-phosphor/10">
                  <p className="font-mono text-sm text-phosphor mb-2">
                    [SUCCESS] Application received!
                  </p>
                  <p className="font-mono text-xs text-text-secondary">
                    Check your email for a verification link. Please also check
                    your spam folder. Once verified, your application will be
                    reviewed by our team.
                  </p>
                </div>
              )}
              {status === "error" && (
                <div className="p-4 border border-crimson/50 bg-crimson/10">
                  <p className="font-mono text-sm text-crimson">
                    [ERROR] {errorMessage}
                  </p>
                </div>
              )}

              {/* Terminal decoration */}
              <div className="pt-6 border-t border-ash">
                <pre className="font-mono text-xs text-text-muted">
                  <code>
                    <span className="text-phosphor">$</span> ./submit --application
                    <br />
                    <span className="text-text-muted">[*]</span> Validating credentials...
                    <br />
                    <span className="text-text-muted">[*]</span> Encryption:
                    <span className="text-phosphor"> AES-256</span>
                    <br />
                    <span className="text-text-muted">[*]</span> Awaiting input...
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
            <h3 className="font-display text-sm text-crimson mb-3">What Happens Next?</h3>
            <p className="font-mono text-xs text-text-secondary leading-relaxed">
              After verifying your email, your application will be reviewed by
              our team. Verified technologists are added to our directory and
              connected with community members who need assistance.
            </p>
          </div>
          <div className="terminal-card p-6">
            <h3 className="font-display text-sm text-crimson mb-3">Your Privacy Matters</h3>
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
