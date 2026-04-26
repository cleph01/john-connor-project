"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { supabase, Professional } from "@/lib/supabase";

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

const PublicDirectory = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [proBonoOnly, setProBonoOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyEmail = (id: string, email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("verified", true)
        .eq("public", true)
        .eq("email_verified", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProfessionals(data || []);
    } catch (err) {
      setError("Failed to load directory. Please try again later.");
      console.error("Error fetching professionals:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = professionals.filter((pro) => {
    const matchesLocation =
      !searchLocation ||
      pro.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesSpecialty =
      !selectedSpecialty ||
      (pro.specialties && pro.specialties.includes(selectedSpecialty));
    const matchesProBono = !proBonoOnly || pro.pro_bono;
    return matchesLocation && matchesSpecialty && matchesProBono;
  });

  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-phosphor/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
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
            <span className="text-crimson">Directory</span>
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
              Verified Network
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Professional Directory
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Verified IT and infrastructure professionals available in your area.
            Search by location and filter by specialty to find the right person
            for your project.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Location Search */}
          <div className="terminal-card p-4">
            <label className="block mb-2">
              <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                Search by Location
              </span>
            </label>
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Enter city or state..."
              className="w-full p-3 rounded-none bg-terminal border border-ash border-l-2 border-l-crimson text-text-primary placeholder-text-muted font-mono focus:outline-none focus:border-crimson transition-all"
            />
          </div>

          {/* Specialty Filter Chips */}
          <div className="terminal-card p-4">
            <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-3">
              Filter by Specialty
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSpecialty(null)}
                className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 ${
                  !selectedSpecialty
                    ? "border-crimson bg-crimson/10 text-crimson"
                    : "border-ash text-text-muted hover:border-crimson hover:text-crimson"
                }`}
              >
                All
              </button>
              {SPECIALTIES.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() =>
                    setSelectedSpecialty(
                      selectedSpecialty === specialty ? null : specialty
                    )
                  }
                  className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 ${
                    selectedSpecialty === specialty
                      ? "border-phosphor bg-phosphor/10 text-phosphor"
                      : "border-ash text-text-muted hover:border-phosphor hover:text-phosphor"
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Pro-Bono Filter */}
          <div className="terminal-card p-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={proBonoOnly}
                onChange={(e) => setProBonoOnly(e.target.checked)}
                className="w-4 h-4 accent-electric flex-shrink-0"
              />
              <span className="font-mono text-xs text-text-muted group-hover:text-electric transition-colors">
                Show only pros open to{" "}
                <span className="text-electric">pro-bono work</span>
              </span>
            </label>
          </div>
        </motion.div>

        {/* Result count */}
        {!loading && !error && professionals.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs text-text-muted mb-6"
          >
            {filteredProfessionals.length === professionals.length
              ? `${professionals.length} verified professional${professionals.length !== 1 ? "s" : ""}`
              : `${filteredProfessionals.length} of ${professionals.length} professionals`}
            {selectedSpecialty && (
              <span className="text-phosphor"> — {selectedSpecialty}</span>
            )}
            {searchLocation && (
              <span className="text-electric"> near &ldquo;{searchLocation}&rdquo;</span>
            )}
            {proBonoOnly && (
              <span className="text-electric"> · pro-bono available</span>
            )}
          </motion.p>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3">
              <span className="w-2 h-2 bg-phosphor rounded-full animate-pulse" />
              <span className="font-mono text-text-secondary">
                Loading directory...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="terminal-card p-6 border-crimson/50 text-center">
            <p className="font-mono text-crimson">{error}</p>
          </div>
        )}

        {/* Empty State — no professionals yet */}
        {!loading && !error && professionals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="terminal-card p-10 text-center"
          >
            <div className="font-mono text-xs text-phosphor uppercase tracking-widest mb-4">
              Founding Members Wanted
            </div>
            <h3 className="font-display text-2xl text-text-primary mb-4">
              Be the First Pro Listed
            </h3>
            <p className="font-mono text-sm text-text-secondary mb-4 max-w-lg mx-auto leading-relaxed">
              This directory is actively being built. If you work in IT,
              networking, structured cabling, smart home integration, cybersecurity,
              or security systems — your community needs access to what you know.
            </p>
            <p className="font-mono text-xs text-text-muted mb-8">
              Free to list. Set your own rates. Pro-bono on your terms.
            </p>
            <Link href="/get-involved">
              <button className="btn-resistance px-8 py-4 text-base font-semibold">
                <span className="relative z-10">Get Listed</span>
              </button>
            </Link>
          </motion.div>
        )}

        {/* No Search Results */}
        {!loading && !error && professionals.length > 0 && filteredProfessionals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="terminal-card p-8 text-center"
          >
            <p className="font-mono text-text-secondary mb-2">
              No professionals found
              {searchLocation && ` in "${searchLocation}"`}
              {selectedSpecialty && ` for "${selectedSpecialty}"`}.
            </p>
            <p className="font-mono text-xs text-text-muted mb-4">
              The directory is growing. Check back soon — or be the first in your area.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => { setSearchLocation(""); setSelectedSpecialty(null); setProBonoOnly(false); }}
                className="font-mono text-sm text-crimson hover:text-glow-crimson transition-all"
              >
                Clear filters
              </button>
              <Link href="/get-involved">
                <button className="font-mono text-sm text-phosphor hover:text-glow-phosphor transition-all">
                  Get listed →
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Directory Grid */}
        {!loading && !error && filteredProfessionals.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredProfessionals.map((professional, index) => (
              <motion.div
                key={professional.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="terminal-card p-6 group hover:border-crimson transition-all duration-300 flex flex-col"
              >
                {/* Name + location */}
                <div className="mb-3">
                  <h3 className="font-display text-lg text-crimson group-hover:text-glow-crimson transition-all">
                    {professional.name}
                  </h3>
                  {professional.company_name && (
                    <p className="font-mono text-xs text-text-secondary mt-0.5">
                      {professional.company_name}
                    </p>
                  )}
                  <p className="font-mono text-xs text-text-muted mt-1 flex items-center gap-3">
                    <span>📍 {professional.location}</span>
                    {professional.years_experience && (
                      <span>{professional.years_experience}+ yrs exp</span>
                    )}
                  </p>
                </div>

                {/* Specialties */}
                {professional.specialties && professional.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {professional.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2 py-0.5 bg-terminal border border-ash text-text-muted"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expertise summary */}
                <p className="font-mono text-xs text-text-secondary leading-relaxed mb-3">
                  {professional.expertise}
                </p>

                {/* Bio */}
                {professional.bio && (
                  <p className="font-mono text-xs text-text-muted leading-relaxed mb-3 line-clamp-3">
                    {professional.bio}
                  </p>
                )}

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-ash flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs">
                      <span className="text-text-muted">Status: </span>
                      <span className="text-phosphor">Verified</span>
                    </span>
                    {professional.pro_bono && (
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs px-2 py-0.5 border border-electric/50 text-electric bg-electric/5">
                          Pro-Bono Available
                        </span>
                        {professional.pro_bono_circumstances && (
                          <span className="font-mono text-xs text-text-muted leading-relaxed">
                            {professional.pro_bono_circumstances}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {professional.linkedin_url && (
                      <a
                        href={professional.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-electric hover:text-glow-electric transition-all"
                      >
                        LinkedIn →
                      </a>
                    )}
                    {professional.website && (
                      <a
                        href={professional.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-electric hover:text-glow-electric transition-all"
                      >
                        Website →
                      </a>
                    )}
                    <div className="flex flex-col gap-1.5 items-end">
                      <a
                        href={`mailto:${professional.email}?subject=Found you on the John Connor Project`}
                        className="font-mono text-xs px-3 py-1.5 border border-crimson text-crimson hover:bg-crimson/10 transition-all duration-200"
                      >
                        Contact
                      </a>
                      <button
                        onClick={() => copyEmail(professional.id, professional.email)}
                        title="Copy email address"
                        className="font-mono text-xs px-2 py-1.5 border border-ash text-text-muted hover:border-crimson hover:text-crimson transition-all duration-200"
                      >
                        {copiedId === professional.id ? "Copied!" : "Copy Email"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Register CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 terminal-card p-8 text-center"
        >
          <p className="font-mono text-sm text-text-secondary mb-1">
            Are you an IT or infrastructure professional?
          </p>
          <p className="font-mono text-xs text-text-muted mb-6">
            Networking, cabling, smart home, cybersecurity, access control — get listed free.
          </p>
          <Link href="/get-involved">
            <button className="btn-resistance px-8 py-3">
              <span className="relative z-10">Get Listed</span>
            </button>
          </Link>
        </motion.div>

        {/* Stats — real count only */}
        {!loading && professionals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="terminal-card p-4 inline-block">
              <div className="font-display text-2xl text-crimson">
                {professionals.length}
              </div>
              <div className="text-text-muted text-xs font-mono uppercase tracking-wider mt-1">
                Verified Professional{professionals.length !== 1 ? "s" : ""}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default PublicDirectory;
