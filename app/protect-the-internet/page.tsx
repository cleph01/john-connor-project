"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SubscribeForm from "../components/SubscribeForm";

const IPOverHamRoadmap = () => {
  const phases = [
    {
      id: "01",
      title: "Research & Licensing",
      description:
        "Understand regulatory requirements and obtain an amateur radio license to legally operate HAM radio equipment.",
      status: "In Progress",
    },
    {
      id: "02",
      title: "Equipment & Setup",
      description:
        "Acquire necessary hardware, such as transceivers, TNCs, and antennas, and set up a basic HAM radio station.",
      status: "Planned",
    },
    {
      id: "03",
      title: "Experimentation with Digital Modes",
      description:
        "Learn and test digital transmission protocols like AX.25, Winlink, and packet radio for data communication.",
      status: "Planned",
    },
    {
      id: "04",
      title: "Implementing IP Networking",
      description:
        "Explore AMPRNet (44.0.0.0/8) and mesh networking techniques to establish IP-based communication over HAM radio.",
      status: "Planned",
    },
    {
      id: "05",
      title: "Deployment & Community Building",
      description:
        "Develop a resilient, decentralized network and educate others on setting up their own censorship-resistant communication systems.",
      status: "Planned",
    },
  ];

  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-phosphor/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
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
            <span className="text-crimson">Decentralized Net</span>
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
              Protocol: Resilient Communications
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            IP Over HAM Radio
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A structured path to establishing censorship-resistant communication
            networks using IP over HAM radio technology.
          </p>
        </motion.div>

        {/* Roadmap Phases */}
        <div className="space-y-6">
          {phases.map((phase, index) => (
            <motion.section
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="terminal-card p-6 sm:p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-crimson font-mono text-sm">
                    [{phase.id}]
                  </span>
                  <h2 className="font-display text-lg text-crimson">
                    {phase.title}
                  </h2>
                </div>
                <span
                  className={`text-xs font-mono px-2 py-1 border ${
                    phase.status === "In Progress"
                      ? "border-phosphor/50 text-phosphor bg-phosphor/10"
                      : "border-ash text-text-muted bg-terminal/50"
                  }`}
                >
                  {phase.status}
                </span>
              </div>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                {phase.description}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 terminal-card p-6 sm:p-8 border-warning/30"
        >
          <div className="flex items-start gap-3">
            <span className="text-warning text-xl">⚠</span>
            <div>
              <h3 className="font-display text-base text-warning mb-2">
                Important Notice
              </h3>
              <p className="font-mono text-sm text-text-secondary">
                This roadmap is for educational purposes. Operating HAM radio
                equipment requires proper licensing from your national
                telecommunications authority. Always comply with local
                regulations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12"
        >
          <SubscribeForm context="This project is in active development. Subscribe to The Uplink and get notified when Phase 2 begins and new milestones are reached." />
        </motion.div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-6 text-center"
        >
          <Link href="/get-involved">
            <button className="btn-resistance px-6 py-3">
              <span className="relative z-10">Join the Resistance</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default IPOverHamRoadmap;
