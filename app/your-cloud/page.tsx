"use client";

import Link from "next/link";
import { motion } from "motion/react";

const DecoupleNASPage = () => {
  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[200px]" />

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
            <span className="text-crimson">Your Cloud</span>
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
              Protocol: Data Sovereignty
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Your Data, Your Hardware, Your Rules
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Stop renting storage you could own. A personal NAS replaces cloud
            subscriptions with hardware in your home — your files, accessible
            from anywhere, with no monthly fees and no data mining.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[01]</span>
              <h2 className="font-display text-xl text-crimson">
                The Real Cost of Cloud Storage
              </h2>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-4 leading-relaxed">
              <p>
                iCloud, Google Drive, Dropbox — they&apos;re convenient until they&apos;re not.
                Prices go up. Storage limits get hit. Your account gets locked. The
                company changes its terms. And the whole time, your files are on
                servers you don&apos;t control, scanned by systems you didn&apos;t agree to in
                any meaningful way.
              </p>
              <p>
                Beyond the privacy issues, there&apos;s a straightforward financial argument:
                a NAS device pays for itself. A 2-bay Synology with 8TB of storage costs
                roughly what you&apos;d pay for two years of a mid-tier cloud plan — and then
                it&apos;s yours, indefinitely, with no recurring fees.
              </p>
              <p>
                Five to ten years ago, setting up a personal storage server required
                real technical skill. Today, NAS devices come with polished interfaces,
                mobile apps, and automatic sync. The hard part is just deciding to do it.
              </p>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[02]</span>
              <h2 className="font-display text-xl text-crimson">
                Own Your Memories, Secure Your Privacy
              </h2>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-4 leading-relaxed">
              <p>
                Imagine a world where your photos and videos are stored safely
                within your own home, accessible only to you and those you choose to
                share them with. That&apos;s the power of a NAS. You have complete
                control over your data, with no fear of privacy breaches or
                unexpected changes to terms of service.
              </p>
              <p>
                A NAS is essentially a private cloud server that you own and manage.
                It connects to your home network, allowing you to access your files
                from any device, anywhere in the world.
              </p>
              <ul className="space-y-2 mt-4">
                {[
                  "Store all your photos, videos, and other files in one secure location",
                  "Access your media from any device, anywhere in the world",
                  "Create automatic backups to protect your data",
                  "Share photos and videos with family without third-party services",
                  "Use facial recognition CLI to organize and name your pictures",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-phosphor mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-crimson font-mono text-sm">[03]</span>
              <h2 className="font-display text-xl text-crimson">
                Demystifying the NAS
              </h2>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-4 leading-relaxed">
              <p>
                Setting up a NAS is simpler than you might think. Most NAS devices
                come with user-friendly interfaces and step-by-step instructions.
                You&apos;ll need a NAS device, a hard drive, and a network connection.
              </p>
              <p className="text-text-muted">The basic process involves:</p>
              <ol className="space-y-2 mt-2">
                {[
                  "Connecting the NAS to your router",
                  "Installing the hard drive",
                  "Configuring the NAS software",
                  "Transferring your photos and videos",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-crimson font-mono">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4">
                Many NAS devices also offer mobile apps, allowing you to access your
                files from your smartphone or tablet. The John Connor Project will be
                providing detailed roadmaps and tutorials to assist you through the
                process.
              </p>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="terminal-card p-6 sm:p-8 text-center"
          >
            <h3 className="font-display text-xl text-crimson mb-4">
              Ready to Own Your Data?
            </h3>
            <p className="font-mono text-sm text-text-secondary mb-6 max-w-xl mx-auto">
              See the hardware we recommend, read the setup guides, or find a local
              professional to install it for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/gear">
                <button className="btn-resistance px-6 py-3">
                  <span className="relative z-10">See NAS Gear Picks</span>
                </button>
              </Link>
              <Link href="/find-help">
                <button className="btn-terminal px-6 py-3">
                  Find a Pro to Install It
                </button>
              </Link>
            </div>
            <Link href="/learn" className="font-mono text-xs text-electric hover:underline transition-colors">
              Or read the self-hosting guides first →
            </Link>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default DecoupleNASPage;
