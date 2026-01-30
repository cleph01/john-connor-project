"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { supabase, Professional } from "@/lib/supabase";

const PublicDirectory = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState("");

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

  const filteredProfessionals = professionals.filter((pro) =>
    pro.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

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
            Public Directory
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Connect with verified technologists and cybersecurity professionals
            in your area for digital protection and guidance.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
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
        </motion.div>

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

        {/* Empty State */}
        {!loading && !error && professionals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="terminal-card p-8 text-center"
          >
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="font-display text-xl text-text-primary mb-2">
              Directory Coming Soon
            </h3>
            <p className="font-mono text-sm text-text-secondary mb-6">
              We&apos;re building our network of verified professionals. Be among
              the first to join and get listed.
            </p>
            <Link href="/get-involved">
              <button className="btn-resistance px-6 py-3">
                <span className="relative z-10">Register Now</span>
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
            <p className="font-mono text-text-secondary mb-4">
              No professionals found in &quot;{searchLocation}&quot;
            </p>
            <button
              onClick={() => setSearchLocation("")}
              className="font-mono text-sm text-crimson hover:text-glow-crimson transition-all"
            >
              Clear search
            </button>
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
                className="terminal-card p-6 group hover:border-crimson transition-all duration-300"
              >
                {/* Terminal header dots */}
                <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-ash">
                  <span className="w-2 h-2 rounded-full bg-crimson/60" />
                  <span className="w-2 h-2 rounded-full bg-warning/60" />
                  <span className="w-2 h-2 rounded-full bg-phosphor/60" />
                  <span className="ml-2 text-text-muted text-xs font-mono">
                    profile.dat
                  </span>
                  <span className="ml-auto text-text-muted text-xs font-mono">
                    Since {formatDate(professional.created_at)}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="font-display text-lg text-crimson group-hover:text-glow-crimson transition-all">
                    {professional.name}
                  </h3>
                  <p className="font-mono text-sm text-text-secondary mt-1">
                    {professional.expertise}
                  </p>
                  <p className="font-mono text-xs text-text-muted mt-1">
                    📍 {professional.location}
                    {professional.years_experience && (
                      <span className="ml-3">
                        ⏱ {professional.years_experience}+ years
                      </span>
                    )}
                  </p>
                </div>

                {/* Bio */}
                {professional.bio && (
                  <p className="font-mono text-xs text-text-secondary mb-4 leading-relaxed">
                    {professional.bio}
                  </p>
                )}

                {/* Specialties */}
                {professional.specialties && professional.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {professional.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2 py-1 bg-terminal border border-ash text-text-muted"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="pt-3 border-t border-ash flex items-center justify-between">
                  <span className="font-mono text-xs text-text-muted">
                    Status: <span className="text-phosphor">Verified</span>
                  </span>
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
          className="mt-12 text-center"
        >
          <div className="terminal-card p-8 inline-block">
            <p className="font-mono text-sm text-text-secondary mb-4">
              Are you a cybersecurity professional?
            </p>
            <Link href="/get-involved">
              <button className="btn-resistance px-6 py-3">
                <span className="relative z-10">Join the Directory</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { value: professionals.length || "—", label: "Verified Experts" },
            { value: "—", label: "States Covered" },
            { value: "—", label: "Connections Made" },
          ].map((stat) => (
            <div key={stat.label} className="terminal-card p-4">
              <div className="font-display text-2xl text-crimson">
                {stat.value}
              </div>
              <div className="text-text-muted text-xs font-mono uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default PublicDirectory;
