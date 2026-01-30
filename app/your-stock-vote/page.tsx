"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ProxyVotingToolPage = () => {
  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px]" />

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
            <span className="text-crimson">Stock Vote</span>
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
              Protocol: Corporate Accountability
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Your Vote Shapes AI Policy
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed">
            The same firms that control your retirement funds vote on AI ethics,
            data privacy, and surveillance at every major tech company. Take back
            your shareholder voice.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Why This Matters for Digital Sovereignty */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="terminal-card p-6 sm:p-8 border-warning/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-warning text-xl">⚡</span>
              <h2 className="font-display text-xl text-warning">
                Why This Matters for Digital Freedom
              </h2>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-4 leading-relaxed">
              <p>
                You might wonder what proxy voting has to do with cybersecurity.
                The answer: <span className="text-crimson">everything</span>.
              </p>
              <p>
                Every year, shareholders vote on corporate policies at companies
                like Google, Meta, Microsoft, Amazon, and Apple. These votes shape:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-warning">→</span>
                  <span><span className="text-text-primary">AI Ethics Policies</span> — How companies develop and deploy artificial intelligence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">→</span>
                  <span><span className="text-text-primary">Data Privacy Practices</span> — What data is collected, stored, and sold</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">→</span>
                  <span><span className="text-text-primary">Surveillance Technology</span> — Whether companies sell tech to authoritarian regimes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">→</span>
                  <span><span className="text-text-primary">Executive Accountability</span> — Whether leaders face consequences for privacy violations</span>
                </li>
              </ul>
              <p>
                <span className="text-phosphor">Your proxy vote is a weapon against surveillance capitalism.</span>{" "}
                But only if you use it.
              </p>
            </div>
          </motion.section>

          {/* The Problem */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[01]</span>
              <h2 className="font-display text-xl text-crimson">
                The Problem: Stolen Voices
              </h2>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-4 leading-relaxed">
              <p>
                If you have a 401(k), IRA, or pension, your money is likely managed
                by one of three giants: <span className="text-crimson">BlackRock</span>,{" "}
                <span className="text-crimson">Vanguard</span>, or{" "}
                <span className="text-crimson">State Street</span>.
              </p>
              <p>
                Together, they manage over <span className="text-text-primary">$20 trillion</span> in
                assets and are the largest shareholders in nearly every major
                corporation. When shareholder votes happen, they vote on your behalf
                — usually without asking what you think.
              </p>
              <p>
                These firms have voted against AI ethics proposals, against
                transparency in data practices, and against holding executives
                accountable for privacy failures. They claim to represent your
                interests, but their voting record tells a different story.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-ash text-center">
                <div>
                  <div className="font-display text-2xl text-crimson">$20T+</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">Assets Controlled</div>
                </div>
                <div>
                  <div className="font-display text-2xl text-crimson">90%</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">S&P 500 Shares</div>
                </div>
                <div>
                  <div className="font-display text-2xl text-crimson">3</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">Firms in Control</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* The Solution */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[02]</span>
              <h2 className="font-display text-xl text-crimson">
                The Solution: Reclaim Your Vote
              </h2>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-4 leading-relaxed">
              <p>
                The good news: you can take your voting power back. Many brokerages
                now allow you to vote your own shares or provide instructions on
                how your proxy should be voted. The bad news: proxy statements are
                intentionally complex, often hundreds of pages of legal jargon.
              </p>
              <p>
                <span className="text-phosphor">This is where self-hosted AI comes in.</span>
              </p>
              <p>
                We&apos;re building open-source tools that use locally-run Large Language
                Models (LLMs) to analyze proxy statements and explain them in plain
                English. No cloud services, no data collection — just you and your
                AI assistant, running on your own hardware.
              </p>
            </div>
          </motion.section>

          {/* What You Can Do Now */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[03]</span>
              <h2 className="font-display text-xl text-crimson">
                What You Can Do Now
              </h2>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-4 leading-relaxed">
              <p>
                While we develop the proxy analysis tools, here are steps you can
                take today:
              </p>
              <ol className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-crimson font-mono">1.</span>
                  <div>
                    <span className="text-text-primary">Check your brokerage settings</span>
                    <span className="block text-text-muted text-xs mt-1">
                      Look for "proxy voting" or "shareholder voting" options. Many brokers
                      now offer "pass-through voting" that lets you vote directly.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-crimson font-mono">2.</span>
                  <div>
                    <span className="text-text-primary">Review your proxy materials</span>
                    <span className="block text-text-muted text-xs mt-1">
                      When you receive proxy materials (usually by email), don&apos;t ignore them.
                      Look for proposals related to AI, privacy, and executive compensation.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-crimson font-mono">3.</span>
                  <div>
                    <span className="text-text-primary">Support shareholder advocacy groups</span>
                    <span className="block text-text-muted text-xs mt-1">
                      Organizations like As You Sow file shareholder resolutions on privacy
                      and AI ethics. Your vote in support amplifies their impact.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-crimson font-mono">4.</span>
                  <div>
                    <span className="text-text-primary">Consider direct stock ownership</span>
                    <span className="block text-text-muted text-xs mt-1">
                      Owning shares directly (not through a fund) gives you unambiguous
                      voting rights that no one else can exercise.
                    </span>
                  </div>
                </li>
              </ol>
            </div>
          </motion.section>

          {/* Coming Soon */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[04]</span>
              <h2 className="font-display text-xl text-crimson">
                Coming Soon: Proxy Analysis Tools
              </h2>
              <span className="ml-auto text-xs font-mono px-2 py-0.5 border border-ash text-text-muted">
                In Development
              </span>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-4 leading-relaxed">
              <p>
                We&apos;re building self-hosted tools to help you understand and act on
                proxy votes:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "AI-powered summarization of proxy statements",
                  "Plain-English explanations of each proposal",
                  "Analysis aligned with your values (privacy, AI ethics, etc.)",
                  "Voting recommendations based on digital rights impact",
                  "Runs entirely on your own NAS or computer",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-phosphor">→</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="text-text-muted">
                Want to be notified when these tools launch? Join the resistance
                and we&apos;ll keep you updated.
              </p>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="terminal-card p-6 sm:p-8 text-center"
          >
            <h3 className="font-display text-xl text-crimson mb-4">
              Your Vote. Your Voice. Your Future.
            </h3>
            <p className="font-mono text-sm text-text-secondary mb-6 max-w-xl mx-auto">
              Digital sovereignty isn&apos;t just about protecting your data — it&apos;s about
              shaping the corporations that control our digital world. Reclaim your
              shareholder power.
            </p>
            <Link href="/get-involved">
              <button className="btn-resistance px-6 py-3">
                <span className="relative z-10">Join the Resistance</span>
              </button>
            </Link>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default ProxyVotingToolPage;
