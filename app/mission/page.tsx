"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const Mission = () => {
  const objectives = [
    {
      id: "01",
      title: "Education",
      description:
        "Creating accessible educational resources on digital security, AI threats, and personal defense.",
      icon: "◎",
    },
    {
      id: "02",
      title: "Network",
      description:
        "Establishing a public directory of cybersecurity professionals for communities and small businesses.",
      icon: "◉",
    },
    {
      id: "03",
      title: "Sovereignty",
      description:
        "Promoting self-hosted Cloud and AI solutions to prevent data exploitation by large corporations.",
      icon: "◈",
    },
    {
      id: "04",
      title: "Connection",
      description:
        "Connecting technologists with individuals seeking practical, real-world cybersecurity solutions.",
      icon: "◇",
    },
    {
      id: "05",
      title: "Resilience",
      description:
        "Empowering communities to establish censorship-resistant communication networks for digital sovereignty.",
      icon: "◆",
    },
  ];

  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[200px]" />

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
            <span className="text-crimson">Mission</span>
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-6">
            <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
            <span className="text-crimson text-xs font-mono uppercase tracking-widest">
              Priority Alpha
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Our Mission
          </h1>

          <p className="font-mono text-lg text-electric text-glow-electric mb-4">
            Building the Resistance, One Technologist at a Time
          </p>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto">
            Equipping individuals and communities with the knowledge and tools
            to defend against AI-driven digital threats.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 relative"
        >
          <div className="absolute inset-0 bg-crimson/10 blur-3xl" />
          <div className="relative terminal-card p-2">
            <Image
              src="/logo_skull.webp"
              alt="John Connor Project"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="scan-line" />
            </div>
          </div>
        </motion.div>

        {/* What Drives Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="terminal-card hex-corner p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">◎</span>
              <h2 className="font-display text-xl sm:text-2xl text-crimson">
                What Drives Us
              </h2>
            </div>

            <p className="font-mono text-text-secondary leading-relaxed text-base sm:text-lg">
              The John Connor Project is more than a movement; it&apos;s a mission
              to ensure cybersecurity professionals play a{" "}
              <span className="text-phosphor">
                critical role in protecting digital freedom
              </span>
              . We believe that every individual deserves to understand how to
              safeguard their data, defend against AI exploitation, and maintain
              autonomy in an increasingly connected world.
            </p>
          </div>
        </motion.div>

        {/* Objectives Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl text-crimson text-center mb-10">
            How We Achieve Our Mission
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, index) => (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="terminal-card p-6 h-full group hover:border-crimson transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{obj.icon}</span>
                    <span className="font-mono text-xs text-text-muted">
                      [{obj.id}]
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-crimson mb-3 group-hover:text-glow-crimson transition-all">
                    {obj.title}
                  </h3>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <div className="terminal-card p-8 sm:p-12 max-w-2xl mx-auto">
            <div className="mb-6">
              <span className="font-mono text-xs text-phosphor uppercase tracking-widest">
                Ready to Deploy?
              </span>
            </div>

            <h3 className="font-display text-2xl text-text-primary mb-4">
              Your Skills Are{" "}
              <span className="text-crimson text-glow-crimson">Needed</span>
            </h3>

            <p className="font-mono text-text-secondary mb-8">
              Join the network of digital defenders protecting communities
              across the nation.
            </p>

            <Link href="/get-involved">
              <button className="btn-resistance px-10 py-4 text-base font-semibold">
                <span className="relative z-10">Join the Resistance</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Mission;
