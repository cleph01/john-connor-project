"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-void relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 data-grid opacity-30" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-crimson/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric/5 rounded-full blur-[128px] animate-pulse" />

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        {/* Transmission header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-ash bg-terminal/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-phosphor rounded-full animate-pulse" />
            <span className="text-phosphor text-xs font-mono uppercase tracking-widest">
              Encrypted Transmission Active
            </span>
          </div>
        </motion.div>

        {/* Logo with glitch effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 blur-2xl bg-crimson/20 scale-150" />

          <div className="relative glitch-hover">
            <Image
              src="/logo-skull.jpg"
              alt="John Connor Project Logo"
              width={180}
              height={180}
              className="relative z-10 rounded-lg border-2 border-crimson/50 shadow-[0_0_30px_rgba(255,23,68,0.3)]"
              priority
            />
          </div>
        </motion.div>

        {/* Title with staggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-crimson text-glow-crimson animate-flicker tracking-wider">
            John Connor Project
          </h1>
          <div className="mt-4 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-crimson to-transparent" />
        </motion.div>

        {/* Tagline with typing effect styling */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-10"
        >
          <p className="font-mono text-lg sm:text-xl text-electric text-glow-electric text-center max-w-xl">
            <span className="text-text-muted">&gt;</span> Professional-Grade Infrastructure for Everyone.
          </p>
        </motion.div>

        {/* Mission Statement Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-3xl"
        >
          <div className="terminal-card p-6 sm:p-8 hex-corner">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-ash">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-crimson/80" />
                <span className="w-3 h-3 rounded-full bg-warning/80" />
                <span className="w-3 h-3 rounded-full bg-phosphor/80" />
              </div>
              <span className="text-text-muted text-xs font-mono ml-2">
                mission_briefing.txt
              </span>
            </div>

            <p className="font-mono text-base sm:text-lg leading-relaxed text-text-primary/90">
              <span className="text-crimson">The John Connor Project</span> connects everyday people and small businesses with skilled IT and infrastructure professionals —{" "}
              <span className="text-phosphor">
                giving Main Street access to the same level of technical support that corporations take for granted
              </span>
              . Reliable home networks. Proper IoT segmentation. NAS systems instead of cloud subscriptions. Smart home systems built right. Security that actually holds.
            </p>

            {/* Take Back Your Network sub-tagline */}
            <div className="mt-6 pt-6 border-t border-ash">
              <p className="font-mono text-sm text-text-muted text-center leading-relaxed">
                <span className="text-electric">Take Back Your Network.</span>{" "}
                Your data should belong to you. Your home should run like a data center. You deserve IT support.
              </p>
            </div>

            {/* TODO: Replace with real stats once directory has active professionals
            <div className="mt-6 pt-6 border-t border-ash grid grid-cols-3 gap-4 text-center">
              {[
                { value: "10K", label: "Technologists" },
                { value: "50", label: "States" },
                { value: "24/7", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-xl sm:text-2xl text-crimson">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    Goal: {stat.label}
                  </div>
                </div>
              ))}
            </div>
            */}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs font-mono uppercase tracking-widest">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-crimson to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Choose Your Path Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-ash">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl text-crimson mb-4">
              Choose Your Path
            </h2>
            <p className="font-mono text-text-secondary max-w-xl mx-auto">
              Whether you&apos;re here to protect or be protected, there&apos;s a place for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Professional Path */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="terminal-card p-8 h-full flex flex-col group hover:border-phosphor transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛡</span>
                  <span className="font-mono text-xs text-phosphor uppercase tracking-wider">
                    For Professionals
                  </span>
                </div>

                <h3 className="font-display text-2xl text-text-primary mb-4">
                  I&apos;m a <span className="text-phosphor">Technologist</span>
                </h3>

                <p className="font-mono text-sm text-text-secondary leading-relaxed mb-6 flex-grow">
                  You work in IT, networking, structured cabling, cybersecurity, smart home integration, or security systems. Get listed in our directory and connect with homeowners and small businesses in your community who need your skills.
                </p>

                <ul className="font-mono text-xs text-text-muted space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-phosphor">→</span>
                    Get listed in our professional directory
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-phosphor">→</span>
                    Set your own rates — or offer pro-bono on your terms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-phosphor">→</span>
                    Build reputation and real-world clientele
                  </li>
                </ul>

                <Link href="/get-involved" className="mt-auto">
                  <button className="btn-resistance w-full py-4 text-base font-semibold">
                    <span className="relative z-10">Join the Resistance</span>
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Help Seeker Path */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="terminal-card p-8 h-full flex flex-col group hover:border-electric transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🔍</span>
                  <span className="font-mono text-xs text-electric uppercase tracking-wider">
                    For Individuals & Businesses
                  </span>
                </div>

                <h3 className="font-display text-2xl text-text-primary mb-4">
                  I Need <span className="text-electric">Help</span>
                </h3>

                <p className="font-mono text-sm text-text-secondary leading-relaxed mb-6 flex-grow">
                  Your home network isn&apos;t what it should be. Your data is sitting on someone else&apos;s server. Your smart home needs a real setup. Find a local professional who can actually fix it — on your terms, at a fair price.
                </p>

                <ul className="font-mono text-xs text-text-muted space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-electric">→</span>
                    Find local IT and infrastructure pros
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-electric">→</span>
                    Get help with networking, NAS, smart home, and more
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-electric">→</span>
                    Browse free guides to learn the basics yourself
                  </li>
                </ul>

                <div className="mt-auto space-y-3">
                  <Link href="/find-help">
                    <button className="w-full py-4 text-base font-semibold border border-electric text-electric hover:bg-electric/10 transition-all duration-300">
                      Find Help Near You
                    </button>
                  </Link>
                  <Link href="/learn">
                    <button className="w-full py-2 text-sm font-mono text-text-muted hover:text-electric transition-colors">
                      Or learn to protect yourself →
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-2xl sm:text-3xl text-crimson mb-4">
              Infrastructure for Main Street
            </h2>
            <p className="font-mono text-text-secondary max-w-2xl mx-auto">
              The same technology corporations rely on — built for your home and small business
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: "01",
                title: "Home Networking",
                description:
                  "Reliable wired and wireless networks. Proper IoT segmentation. WiFi that covers your whole home. Done right, once.",
                href: "/find-help",
                icon: "◉",
              },
              {
                id: "02",
                title: "Your Cloud",
                description:
                  "Own your data. A NAS replaces iCloud, Google Drive, and Dropbox — no monthly fees, no data mining, no surprises.",
                href: "/your-cloud",
                icon: "☁",
              },
              {
                id: "03",
                title: "Smart Home & Security",
                description:
                  "Cameras, access control, smart appliances, and home automation. The same systems businesses use, designed for your home.",
                href: "/find-help",
                icon: "◈",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link href={feature.href} className="block group h-full">
                  <div className="terminal-card p-6 h-full transition-all duration-300 group-hover:border-crimson group-hover:shadow-[0_0_30px_rgba(255,23,68,0.15)]">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{feature.icon}</span>
                      <span className="font-mono text-xs text-text-muted">
                        [{feature.id}]
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-crimson mb-3 group-hover:text-glow-crimson transition-all">
                      {feature.title}
                    </h3>
                    <p className="font-mono text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-ash flex items-center justify-between">
                      <span className="text-phosphor text-xs font-mono group-hover:text-glow-phosphor">
                        Learn More
                      </span>
                      <span className="text-text-muted group-hover:text-crimson group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-ash">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-6 px-3 py-1 border border-crimson/50 bg-crimson/10">
              <span className="font-mono text-xs text-crimson uppercase tracking-widest">
                Incoming Transmission
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl text-text-primary mb-6">
              The Future is{" "}
              <span className="text-crimson text-glow-crimson">Not Set</span>
            </h2>

            <p className="font-mono text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you&apos;re a professional ready to put your skills to work for your community, or someone who just wants their home infrastructure done right — there&apos;s a place for you here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved">
                <button className="btn-resistance px-8 py-4 text-base font-semibold min-w-[200px]">
                  <span className="relative z-10">Join the Resistance</span>
                </button>
              </Link>
              <Link href="/find-help">
                <button className="px-8 py-4 text-base font-semibold min-w-[200px] border border-electric text-electric hover:bg-electric/10 transition-all duration-300">
                  Find Help Near You
                </button>
              </Link>
            </div>

            {/* Decorative code snippet */}
            <div className="mt-16 inline-block text-left">
              <pre className="font-mono text-xs text-text-muted bg-terminal p-4 border border-ash">
                <code>
                  <span className="text-phosphor">$</span> ./init_connection
                  --secure
                  <br />
                  <span className="text-text-muted">[*]</span> Scanning network...
                  <br />
                  <span className="text-text-muted">[*]</span> Encryption:
                  <span className="text-phosphor"> ACTIVE</span>
                  <br />
                  <span className="text-text-muted">[*]</span> Status:
                  <span className="text-crimson"> READY</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-ash">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-skull-nav.png"
              alt="JCP"
              width={32}
              height={32}
              className="opacity-60"
            />
            <span className="font-mono text-xs text-text-muted">
              &copy; 2025 John Connor Project
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="status-active text-xs font-mono text-text-muted">
              Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
