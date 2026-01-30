"use client";

import Link from "next/link";
import { motion } from "motion/react";

const Resources = () => {
  const resourceSections = [
    {
      id: "01",
      title: "Educational Materials",
      items: [
        "Cybersecurity Basics: Understanding personal digital safety",
        "Guides on secure communication and encryption",
        "Recommended reading and video content for deeper learning",
      ],
    },
    {
      id: "02",
      title: "Toolkits & Downloads",
      items: [
        "Open-source privacy tools for everyday use",
        "Secure communication platform recommendations",
        "Step-by-step VPN and firewall setup guides",
      ],
    },
    {
      id: "03",
      title: "External Resources",
      items: [
        "Trusted cybersecurity organizations and platforms",
        "Government resources on digital protection",
        "Community groups and discussion forums",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[200px]" />

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
            <span className="text-crimson">Resources</span>
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
              Intel Repository
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Resources
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Explore interactive tools, educational materials, and trusted resources
            to protect your digital presence and counter AI-driven threats.
          </p>
        </motion.div>

        {/* Cybersecurity Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="terminal-card p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-crimson font-mono text-sm">[00]</span>
            <h2 className="font-display text-xl text-crimson">
              Home Cybersecurity Best Practices
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary mb-4 leading-relaxed">
            Actionable steps to secure your home network and devices. Each item
            directly counters AI-driven threats by strengthening your digital
            perimeter.
          </p>
          <ul className="font-mono text-sm text-text-secondary space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-phosphor">→</span>
              <span>
                Use a reputable VPN for encrypted browsing –{" "}
                <a
                  href="https://protonvpn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric hover:text-glow-electric transition-all"
                >
                  ProtonVPN
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-phosphor">→</span>
              <span>
                Deploy a firewall for network protection –{" "}
                <a
                  href="https://pfSense.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric hover:text-glow-electric transition-all"
                >
                  pfSense
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-phosphor">→</span>
              <span>
                Implement a password manager –{" "}
                <a
                  href="https://bitwarden.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric hover:text-glow-electric transition-all"
                >
                  Bitwarden
                </a>
              </span>
            </li>
          </ul>
        </motion.section>

        {/* Resource Sections */}
        <div className="space-y-6">
          {resourceSections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="terminal-card p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-crimson font-mono text-sm">
                  [{section.id}]
                </span>
                <h2 className="font-display text-lg text-crimson">
                  {section.title}
                </h2>
              </div>
              <ul className="font-mono text-sm text-text-secondary space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-phosphor">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}

          {/* Coming Soon Sections */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[04]</span>
              <h2 className="font-display text-lg text-crimson">
                Video Library
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 border border-ash text-text-muted ml-auto">
                Coming Soon
              </span>
            </div>
            <p className="font-mono text-sm text-text-secondary">
              Expert interviews, webinars, and explainers focused on defending
              against AI-driven threats and fostering digital resilience.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[05]</span>
              <h2 className="font-display text-lg text-crimson">
                Self-Hosting & AI Defense
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 border border-ash text-text-muted ml-auto">
                Coming Soon
              </span>
            </div>
            <p className="font-mono text-sm text-text-secondary">
              Learn how to self-host AI tools for independent truth-seeking and
              protect yourself from AI-driven digital threats.
            </p>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link href="/get-involved">
            <button className="btn-resistance px-6 py-3">
              <span className="relative z-10">Contribute Resources</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default Resources;
