"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const Mission = () => {
  const objectives = [
    {
      id: "01",
      title: "Infrastructure for All",
      description:
        "Reliable home networks, proper IoT segmentation, NAS systems, smart home integration — the same infrastructure corporations rely on, made accessible to everyday people and small businesses.",
      icon: "◉",
    },
    {
      id: "02",
      title: "A Professional Network",
      description:
        "A directory of skilled, vetted IT, cybersecurity, and infrastructure professionals — connected directly to the communities that need them, not filtered through a corporate help desk.",
      icon: "◎",
    },
    {
      id: "03",
      title: "Digital Sovereignty",
      description:
        "Personal data on personal hardware. Break the dependency on cloud subscriptions and Big Tech ecosystems. Own your storage, control your devices, keep your data.",
      icon: "◈",
    },
    {
      id: "04",
      title: "Education",
      description:
        "Practical, no-jargon resources so anyone can understand their own network, their own devices, and their own digital life — with or without professional help.",
      icon: "◇",
    },
    {
      id: "05",
      title: "Community Defense",
      description:
        "The same professionals who build your infrastructure are equipped to identify and defend against AI-powered scams, surveillance devices, and digital threats.",
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
            Take Back Your Network. One Community at a Time.
          </p>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto">
            Closing the gap between the people who understand technology and
            the people who depend on it.
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
              src="/logo-skull-hero.png"
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

        {/* The Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="terminal-card hex-corner p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">◎</span>
              <h2 className="font-display text-xl sm:text-2xl text-crimson">
                The Problem
              </h2>
            </div>

            <div className="font-mono text-text-secondary leading-relaxed text-sm sm:text-base space-y-4">
              <p>
                When a corporation needs a reliable network, they hire an IT department.
                When they need structured cabling, they call a certified contractor. When
                they need a storage system, they deploy one. When they get hacked, they
                have people on call to respond.
              </p>
              <p>
                Everyday people get none of that. They get a router from their ISP, a
                cloud subscription they didn&apos;t fully choose, smart home devices that
                phone home to servers they don&apos;t control, and a &ldquo;support&rdquo; number that
                leads to a script reader in another country.
              </p>
              <p>
                <span className="text-phosphor">
                  The technology to do this right exists. The professionals who know how
                  exist. The only thing missing is the connection between them and the
                  people who need them.
                </span>
              </p>
              <p>
                That&apos;s what The John Connor Project exists to build.
              </p>
            </div>
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
            How We Achieve It
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

            <p className="font-mono text-text-secondary mb-8 text-sm leading-relaxed">
              If you work in IT, networking, structured cabling, cybersecurity,
              smart home integration, or security systems — your community needs
              access to what you know. Join the directory and start building.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved">
                <button className="btn-resistance px-10 py-4 text-base font-semibold">
                  <span className="relative z-10">Join the Resistance</span>
                </button>
              </Link>
              <Link href="/find-help">
                <button className="px-10 py-4 text-base font-semibold border border-electric text-electric hover:bg-electric/10 transition-all duration-300">
                  Find Help Near You
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Mission;
