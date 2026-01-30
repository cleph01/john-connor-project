"use client";

import Link from "next/link";
import { motion } from "motion/react";

const FindHelp = () => {
  const helpCategories = [
    {
      id: "01",
      title: "Home Network Security",
      description:
        "Secure your WiFi, set up firewalls, protect your smart home devices from intrusion.",
      icon: "🏠",
    },
    {
      id: "02",
      title: "Privacy Protection",
      description:
        "Stop data tracking, secure your communications, protect your family's digital footprint.",
      icon: "🔒",
    },
    {
      id: "03",
      title: "Data Backup & Recovery",
      description:
        "Set up secure backups, recover from ransomware, protect irreplaceable photos and documents.",
      icon: "💾",
    },
    {
      id: "04",
      title: "Small Business Security",
      description:
        "Protect customer data, secure payment systems, train employees on cyber threats.",
      icon: "🏪",
    },
    {
      id: "05",
      title: "AI & Scam Defense",
      description:
        "Identify deepfakes, avoid AI-powered scams, protect against social engineering.",
      icon: "🤖",
    },
    {
      id: "06",
      title: "Self-Hosted Solutions",
      description:
        "Break free from Big Tech with your own cloud storage, email, and communication tools.",
      icon: "☁️",
    },
  ];

  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-phosphor/5 rounded-full blur-[200px]" />

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
            <span className="text-electric">Find Help</span>
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
            <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
            <span className="text-electric text-xs font-mono uppercase tracking-widest">
              Support Available
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-electric mb-6">
            Find Help Near You
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Connect with verified cybersecurity professionals in your area.
            Get the protection you need from someone you can trust.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="terminal-card p-8">
            <h2 className="font-display text-xl text-crimson mb-6 text-center">
              How It Works
            </h2>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Browse Directory",
                  desc: "Find verified technologists in your area with the skills you need",
                },
                {
                  step: "02",
                  title: "Make Contact",
                  desc: "Reach out directly to discuss your needs and get a quote",
                },
                {
                  step: "03",
                  title: "Get Protected",
                  desc: "Work together to secure your digital life on your terms",
                },
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border border-electric flex items-center justify-center">
                    <span className="font-mono text-electric text-lg">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display text-base text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Main CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 text-center"
        >
          <div className="terminal-card p-8 border-electric/30">
            <h2 className="font-display text-2xl text-text-primary mb-4">
              Ready to Find a <span className="text-electric">Technologist</span>?
            </h2>
            <p className="font-mono text-sm text-text-secondary mb-6 max-w-lg mx-auto">
              Browse our directory of verified professionals. Each has been vetted
              and is committed to protecting their community.
            </p>
            <Link href="/directory">
              <button className="px-8 py-4 text-base font-semibold border-2 border-electric text-electric hover:bg-electric hover:text-void transition-all duration-300">
                Browse the Directory
              </button>
            </Link>
          </div>
        </motion.section>

        {/* Help Categories */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-display text-xl text-crimson mb-8 text-center">
            What Can They Help With?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="terminal-card p-6 h-full hover:border-ash transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-mono text-xs text-text-muted">
                      [{category.id}]
                    </span>
                  </div>
                  <h3 className="font-display text-base text-text-primary mb-2">
                    {category.title}
                  </h3>
                  <p className="font-mono text-xs text-text-secondary leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Self-Help Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="terminal-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📚</span>
              <h2 className="font-display text-xl text-crimson">
                Want to Learn First?
              </h2>
            </div>

            <p className="font-mono text-sm text-text-secondary mb-6">
              Not ready to contact a professional? Start with our free guides
              to learn the basics of protecting yourself online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/learn" className="flex-1">
                <button className="btn-resistance w-full py-3">
                  <span className="relative z-10">Start Learning</span>
                </button>
              </Link>
              <Link href="/resources" className="flex-1">
                <button className="btn-terminal w-full py-3">
                  View Resources
                </button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Trust Notice */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="terminal-card p-6 border-phosphor/30">
            <div className="flex items-start gap-3">
              <span className="text-phosphor text-xl">✓</span>
              <div>
                <h3 className="font-display text-base text-phosphor mb-2">
                  Verified Professionals
                </h3>
                <p className="font-mono text-sm text-text-secondary">
                  Every technologist in our directory has been reviewed by the
                  John Connor Project community. You negotiate directly with them —
                  we don&apos;t take a cut. This is about protecting communities,
                  not profit.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default FindHelp;
