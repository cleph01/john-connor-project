"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[150px]" />

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
            <span className="text-crimson">About</span>
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-6">
            <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse" />
            <span className="text-phosphor text-xs font-mono uppercase tracking-widest">
              Intel Brief
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            About The Project
          </h1>

          <p className="font-mono text-lg text-electric text-glow-electric max-w-2xl">
            Empowering a new generation of technologists to defend digital
            freedom and protect Main Street from AI-driven threats.
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
            {/* Scan line overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="scan-line" />
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="terminal-card hex-corner p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">◎</span>
                <h2 className="font-display text-xl text-crimson">
                  Our Mission
                </h2>
              </div>

              <p className="font-mono text-text-secondary leading-relaxed">
                The John Connor Project exists to elevate IT and cybersecurity
                professionals as{" "}
                <span className="text-phosphor">
                  guardians of the digital frontier
                </span>
                . Our knowledge and expertise should extend beyond serving big
                business — it should protect communities, families, and
                individuals from AI-driven threats.
              </p>

              <div className="mt-6 pt-6 border-t border-ash">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-crimson rounded-full" />
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    Priority: Maximum
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="terminal-card hex-corner p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">◈</span>
                <h2 className="font-display text-xl text-crimson">
                  Our Vision
                </h2>
              </div>

              <p className="font-mono text-text-secondary leading-relaxed">
                Just as society values mechanics, electricians, and plumbers for
                maintaining physical infrastructure, we envision a world where{" "}
                <span className="text-phosphor">
                  cybersecurity experts are equally recognized
                </span>{" "}
                for safeguarding digital freedom. We aim to build a resilient
                network of technologists prepared to confront surveillance, data
                exploitation, and AI-based manipulation.
              </p>

              <div className="mt-6 pt-6 border-t border-ash">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-phosphor rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    Status: Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl text-crimson mb-8 text-center">
            Core Directives
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "01",
                title: "Educate",
                desc: "Spread knowledge about digital threats and defenses",
              },
              {
                id: "02",
                title: "Connect",
                desc: "Build networks of skilled technologists",
              },
              {
                id: "03",
                title: "Protect",
                desc: "Shield communities from digital exploitation",
              },
              {
                id: "04",
                title: "Mobilize",
                desc: "Activate defenders when threats emerge",
              },
            ].map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="terminal-card p-5 text-center group hover:border-crimson transition-all duration-300"
              >
                <span className="font-mono text-xs text-text-muted block mb-2">
                  [{value.id}]
                </span>
                <h3 className="font-display text-lg text-crimson mb-2 group-hover:text-glow-crimson">
                  {value.title}
                </h3>
                <p className="font-mono text-xs text-text-secondary">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="terminal-card p-8 sm:p-12 max-w-2xl mx-auto">
            <p className="font-mono text-text-secondary mb-6">
              Ready to join the network of digital defenders?
            </p>

            <Link href="/get-involved">
              <button className="btn-resistance px-8 py-4 text-base font-semibold">
                <span className="relative z-10">Join the Resistance</span>
              </button>
            </Link>

            <div className="mt-8 pt-6 border-t border-ash">
              <pre className="font-mono text-xs text-text-muted text-left inline-block">
                <code>
                  <span className="text-phosphor">$</span> status --network
                  <br />
                  <span className="text-text-muted">[+]</span> Nodes:{" "}
                  <span className="text-phosphor">10,247</span>
                  <br />
                  <span className="text-text-muted">[+]</span> Coverage:{" "}
                  <span className="text-phosphor">47 states</span>
                  <br />
                  <span className="text-text-muted">[+]</span> Uptime:{" "}
                  <span className="text-crimson">99.97%</span>
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
