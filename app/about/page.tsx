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
            Giving Main Street access to the IT infrastructure that corporations
            take for granted.
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

        {/* The Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="terminal-card hex-corner p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">◎</span>
              <h2 className="font-display text-xl text-crimson">
                The Story
              </h2>
            </div>

            <div className="font-mono text-sm text-text-secondary leading-relaxed space-y-4">
              <p>
                This project didn&apos;t start in a boardroom. It started with a pattern.
              </p>
              <p>
                Over 25 years across very different worlds — financial systems and derivatives,
                fitness and personal development, and eventually IT and infrastructure — one thing
                kept appearing: a{" "}
                <span className="text-phosphor">gap between the people who understand technology
                and the people who depend on it</span>.
              </p>
              <p>
                Families adopting smart home systems with no one to set them up correctly.
                Small businesses renting cloud storage they could own outright. Homeowners
                paying for WiFi that only works in two rooms. People handing their data to
                corporations because no one ever showed them another way — not because they
                were careless, but because access to real IT support has always been a
                corporate privilege.
              </p>
              <p>
                The founder of this project is a structured cabling professional and growing
                smart home integrator. CompTIA A+, Network+, Security+, AZ-900, and Ubiquiti
                UniFi Professional — with Lutron, Extron, Control4, and BICSI certifications
                in progress. The work is physical: running cable, commissioning networks,
                integrating systems. And every job makes the same thing clear —
              </p>
              <p className="text-text-primary">
                The infrastructure that transforms how a home or business operates is not
                technically out of reach for anyone. It&apos;s just out of reach for anyone
                without a corporate IT department.
              </p>
              <p>
                That&apos;s the problem The John Connor Project exists to solve.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What We're Building + The Call */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* What We're Building */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="terminal-card hex-corner p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">◈</span>
                <h2 className="font-display text-xl text-crimson">
                  What We&apos;re Building
                </h2>
              </div>

              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                A directory of mission-driven IT, cybersecurity, and infrastructure
                professionals — connected directly to the individuals, families, and
                small businesses who need them. Not a helpdesk ticket. Not a call
                center in another country.{" "}
                <span className="text-phosphor">
                  A local professional who knows what they&apos;re doing and gives a damn.
                </span>
              </p>

              <p className="font-mono text-sm text-text-secondary leading-relaxed mt-4">
                Your home network should run like a data center. Your data should
                belong to you. You shouldn&apos;t need a corporate IT budget to get there.
              </p>

              <div className="mt-6 pt-6 border-t border-ash">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-crimson rounded-full" />
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    Status: Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Machines */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="terminal-card hex-corner p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">◇</span>
                <h2 className="font-display text-xl text-crimson">
                  Why &ldquo;John Connor&rdquo;?
                </h2>
              </div>

              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                Because John Connor was never just a person. He was a symbol —
                a leader who understood the machine and chose to fight for
                humanity anyway.
              </p>

              <p className="font-mono text-sm text-text-secondary leading-relaxed mt-4">
                The machines in our story aren&apos;t fictional. They&apos;re the surveillance
                devices already in your home, the cloud servers holding your data,
                the AI systems running scams on your family. The professionals in our
                directory know how to build the infrastructure that gives you control
                back — and how to defend it when it matters.
              </p>

              <p className="font-mono text-sm text-phosphor leading-relaxed mt-4">
                This project isn&apos;t about fear. It&apos;s about preparation, skill, and
                people willing to show up.
              </p>

              <div className="mt-6 pt-6 border-t border-ash">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-phosphor rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    Mission: Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Directives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl text-crimson mb-8 text-center">
            Core Directives
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "01",
                title: "Build",
                desc: "Help people build reliable home and small-business infrastructure — networks, NAS, smart home, security.",
              },
              {
                id: "02",
                title: "Connect",
                desc: "Match skilled infrastructure professionals with the individuals and businesses who need them.",
              },
              {
                id: "03",
                title: "Educate",
                desc: "Free guides and resources so anyone can understand their own infrastructure.",
              },
              {
                id: "04",
                title: "Empower",
                desc: "Give professionals a platform to serve their community — and give communities access they never had.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
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

        {/* Mission Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mb-12 text-center"
        >
          <Link
            href="/mission"
            className="inline-flex items-center gap-2 font-mono text-sm text-electric hover:text-glow-electric transition-all"
          >
            <span>Read our full mission and objectives</span>
            <span>→</span>
          </Link>
        </motion.div>

        {/* Call to Infrastructure Professionals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <div className="terminal-card p-6 sm:p-10 border-phosphor/20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">◉</span>
              <h2 className="font-display text-xl text-phosphor">
                A Call to Infrastructure Professionals
              </h2>
            </div>

            <div className="font-mono text-sm text-text-secondary leading-relaxed space-y-4">
              <p>
                If you work in networking, cybersecurity, structured cabling,
                smart home integration, access control, or security systems —
                you already have what people need.
              </p>
              <p>
                You know how systems break. You know how networks communicate.
                You know where the vulnerabilities are. Now imagine applying those
                same skills outside the corporate environment — helping a family
                build a reliable home network, helping a small business own their
                data instead of renting it, helping someone set up a smart home
                that actually works.
              </p>
              <p>
                Not as &ldquo;tech support.&rdquo; As a{" "}
                <span className="text-phosphor">trusted digital tradesman</span>.
                A modern-day electrician or plumber — but for the infrastructure
                that now runs everything.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Set your own rates", sub: "Or offer pro-bono on your terms" },
                { label: "Build real reputation", sub: "With verified community reviews" },
                { label: "Own your clientele", sub: "Direct relationships, no middleman" },
              ].map((item) => (
                <div key={item.label} className="border border-ash p-4">
                  <p className="font-mono text-xs text-phosphor mb-1">{item.label}</p>
                  <p className="font-mono text-xs text-text-muted">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <div className="terminal-card p-8 sm:p-12 max-w-2xl mx-auto">
            <p className="font-mono text-text-secondary mb-2">
              Ready to put your skills to work?
            </p>
            <p className="font-mono text-xs text-text-muted mb-8">
              Or just need someone who can help you take back your infrastructure?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved">
                <button className="btn-resistance px-8 py-4 text-base font-semibold">
                  <span className="relative z-10">Join the Resistance</span>
                </button>
              </Link>
              <Link href="/find-help">
                <button className="px-8 py-4 text-base font-semibold border border-electric text-electric hover:bg-electric/10 transition-all duration-300">
                  Find Help Near You
                </button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-ash">
              <p className="font-mono text-xs text-text-muted italic">
                Be sovereign. Be sharp. Be human.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
