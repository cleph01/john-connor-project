"use client";

import Link from "next/link";
import { motion } from "motion/react";

const Learn = () => {
  const topics = [
    {
      id: "01",
      title: "Home Networking Fundamentals",
      subtitle: "The foundation everything else runs on",
      icon: "🌐",
      threat: "Most home networks are set up by an ISP technician in 20 minutes, optimized for the ISP's convenience — not yours. Single-band WiFi, default passwords, no segmentation, and dead zones in half the house. A poorly designed network is the root cause of most home tech frustrations — and a liability when something goes wrong.",
      solution: "A well-designed home network starts with understanding your space, your devices, and your needs. The right hardware — router, switches, access points — combined with proper placement and configuration can transform your home's connectivity and give you real control over what's on your network.",
      steps: [
        "Audit your setup — count connected devices, map dead zones, check your router's age and model",
        "Consider a mesh system or multiple access points for larger or multi-story homes",
        "Run ethernet to TVs, desktops, and gaming consoles where possible — wired is always faster and more reliable",
        "Use separate SSIDs (network names) for personal devices and IoT devices",
        "Change default router credentials and enable WPA3 encryption",
      ],
      tools: [
        { name: "Ubiquiti UniFi", url: "https://ui.com", desc: "Professional-grade mesh networking for serious home use" },
        { name: "TP-Link Omada", url: "https://www.tp-link.com/us/omada-sdn/", desc: "Affordable managed networking for homes and small businesses" },
        { name: "Wireshark", url: "https://www.wireshark.org", desc: "Analyze what's actually happening on your network" },
      ],
    },
    {
      id: "02",
      title: "Smart Home Integration",
      subtitle: "Automation that works for you, not the cloud",
      icon: "🏡",
      threat: "Most smart home devices are designed to lock you into a cloud ecosystem. When the company's servers go down, your lights don't work. When they get acquired or shut down, your devices become bricks. And every cloud-dependent device is a potential entry point into your network — and a data collection endpoint reporting back to a server you don't control.",
      solution: "Local-first smart home systems — using protocols like Matter, Z-Wave, or Zigbee with a local hub — give you full automation without the dependency. Devices work without internet, your data stays in your home, and you're not beholden to any single company's future decisions.",
      steps: [
        "Separate smart home devices onto their own network segment (see Network Segmentation below)",
        "Prefer Matter, Zigbee, or Z-Wave devices over WiFi-only cloud-dependent ones",
        "Use a local hub like Home Assistant instead of relying on manufacturer cloud apps",
        "Check whether devices can operate locally before buying",
        "For complex systems (Lutron, Control4, Crestron), consider a certified smart home integrator",
      ],
      tools: [
        { name: "Home Assistant", url: "https://www.home-assistant.io", desc: "Open-source local home automation hub — runs on your own hardware" },
        { name: "Zigbee2MQTT", url: "https://www.zigbee2mqtt.io", desc: "Connect Zigbee devices to Home Assistant without manufacturer bridges" },
        { name: "Matter", url: "https://csa-iot.org/all-solutions/matter/", desc: "New cross-platform, local-first smart home standard" },
      ],
    },
    {
      id: "03",
      title: "Network Segmentation",
      subtitle: "Don't let one breach compromise everything",
      icon: "🔀",
      threat: "Your smart TV, security cameras, and IoT devices are often poorly secured. If compromised, they can access everything on your network - your computers, phones, and personal files. One weak link breaks the whole chain.",
      solution: "Network segmentation creates separate zones in your home network. Your IoT devices live on one network, your personal devices on another. Even if your smart fridge gets hacked, it can't reach your laptop.",
      steps: [
        "Access your router's admin panel",
        "Create a separate guest network for IoT devices",
        "Or set up VLANs if your router supports them",
        "Keep sensitive devices on the main, secured network",
      ],
      tools: [
        { name: "pfSense", url: "https://www.pfsense.org", desc: "Open-source firewall/router" },
        { name: "OPNsense", url: "https://opnsense.org", desc: "pfSense alternative" },
        { name: "UniFi", url: "https://ui.com", desc: "Prosumer network gear with VLAN support" },
      ],
    },
    {
      id: "04",
      title: "Self-Hosted Cloud",
      subtitle: "Your data, your servers, your control",
      icon: "☁️",
      threat: "When you store photos on Google or iCloud, you're trusting corporations with your most personal data. They can scan it, use it for AI training, share it with authorities, or lose it in a breach. You have no real control.",
      solution: "A Network Attached Storage (NAS) device is your personal cloud server. It sits in your home, holds your files, and syncs across your devices - just like Dropbox or iCloud, but you own it. No monthly fees, no data mining.",
      steps: [
        "Choose a NAS device (Synology, QNAP, or DIY)",
        "Install hard drives for storage",
        "Set up sync apps on your phone and computer",
        "Enable remote access for anywhere availability",
      ],
      tools: [
        { name: "Synology", url: "https://www.synology.com", desc: "User-friendly NAS devices" },
        { name: "Nextcloud", url: "https://nextcloud.com", desc: "Self-hosted cloud software" },
        { name: "Immich", url: "https://immich.app", desc: "Self-hosted Google Photos alternative" },
      ],
      link: { href: "/your-cloud", label: "Learn more about self-hosted cloud →" },
    },
    {
      id: "05",
      title: "DNS Protection",
      subtitle: "Block threats before they reach your devices",
      icon: "🛡",
      threat: "Every time you visit a website, your device asks a DNS server for the address. By default, this goes through your ISP, who can log every site you visit. Advertisers and malicious sites use DNS to track you and serve harmful content.",
      solution: "A DNS sinkhole like Pi-hole acts as your network's bouncer. It intercepts DNS requests and blocks known advertising, tracking, and malicious domains before they ever reach your devices. One Pi-hole protects your entire network.",
      steps: [
        "Set up a Raspberry Pi or use an old computer",
        "Install Pi-hole (free, open-source)",
        "Point your router's DNS to your Pi-hole",
        "All devices on your network are now protected",
      ],
      tools: [
        { name: "Pi-hole", url: "https://pi-hole.net", desc: "Network-wide ad blocking" },
        { name: "AdGuard Home", url: "https://adguard.com/adguard-home.html", desc: "Alternative to Pi-hole" },
        { name: "NextDNS", url: "https://nextdns.io", desc: "Cloud-based DNS filtering" },
      ],
    },
    {
      id: "06",
      title: "Password Security",
      subtitle: "Your first and most important defense",
      icon: "🔐",
      threat: "If you reuse passwords, one breach exposes all your accounts. Hackers buy leaked password databases and automatically try them everywhere. 'Password123' gets cracked in milliseconds. Even 'complex' passwords you can remember aren't strong enough.",
      solution: "A password manager generates and stores unique, random passwords for every account. You remember one master password; it handles the rest. Combined with two-factor authentication (2FA), your accounts become extremely difficult to breach.",
      steps: [
        "Choose a password manager (Bitwarden is free and open-source)",
        "Import your existing passwords",
        "Generate new, unique passwords for critical accounts",
        "Enable 2FA everywhere it's offered (use an app, not SMS)",
      ],
      tools: [
        { name: "Bitwarden", url: "https://bitwarden.com", desc: "Free, open-source password manager" },
        { name: "KeePassXC", url: "https://keepassxc.org", desc: "Offline password manager" },
        { name: "Aegis", url: "https://getaegis.app", desc: "Open-source 2FA app for Android" },
      ],
    },
    {
      id: "07",
      title: "Encrypted Communications",
      subtitle: "Keep your conversations private",
      icon: "💬",
      threat: "Regular SMS and email can be intercepted, read by providers, and subpoenaed by authorities. Your ISP can see every unencrypted website you visit. In an era of mass surveillance, privacy requires deliberate action.",
      solution: "End-to-end encryption means only you and your recipient can read messages - not the service provider, not hackers, not governments. A VPN encrypts your internet traffic, hiding what you do online from your ISP and network snoopers.",
      steps: [
        "Switch to Signal for messaging (free, easy)",
        "Use a VPN when on public WiFi or for general privacy",
        "Consider ProtonMail for encrypted email",
        "Enable HTTPS-only mode in your browser",
      ],
      tools: [
        { name: "Signal", url: "https://signal.org", desc: "Gold standard for encrypted messaging" },
        { name: "ProtonVPN", url: "https://protonvpn.com", desc: "Trustworthy VPN with free tier" },
        { name: "ProtonMail", url: "https://proton.me/mail", desc: "Encrypted email service" },
      ],
    },
    {
      id: "08",
      title: "Data Minimization",
      subtitle: "The best protection is not having data to steal",
      icon: "🗑",
      threat: "Every app, service, and website collects data about you. This data gets breached, sold to brokers, and used to build detailed profiles. The more data exists about you, the more vulnerable you are to identity theft, scams, and manipulation.",
      solution: "Data minimization means reducing your digital footprint. Delete unused accounts, opt out of data collection, use privacy-respecting alternatives, and think twice before giving out personal information.",
      steps: [
        "Audit your accounts - delete what you don't use",
        "Opt out of data broker sites (use a service or DIY)",
        "Review app permissions on your phone",
        "Use temporary email addresses for signups",
      ],
      tools: [
        { name: "JustDeleteMe", url: "https://justdeleteme.xyz", desc: "Directory of account deletion links" },
        { name: "SimpleLogin", url: "https://simplelogin.io", desc: "Email aliases for signups" },
        { name: "Permission Slip", url: "https://permissionslipcr.com", desc: "Data deletion requests (by Consumer Reports)" },
      ],
    },
    {
      id: "09",
      title: "AI Threat Awareness",
      subtitle: "Recognize and resist AI-powered manipulation",
      icon: "🤖",
      threat: "AI can now clone voices from seconds of audio, create convincing fake videos, and write personalized phishing emails. Scammers use AI to impersonate family members, CEOs, and trusted institutions. The era of 'seeing is believing' is over.",
      solution: "Awareness is your best defense. Verify unexpected requests through a different channel. Be skeptical of urgent demands for money or information. Establish family code words for emergencies. Trust your instincts when something feels off.",
      steps: [
        "Create a family code word for emergency verification",
        "Always verify unusual requests via a different channel (call back on a known number)",
        "Be extra skeptical of urgent financial requests",
        "Learn to spot AI-generated content (unnatural movements, audio glitches)",
      ],
      tools: [
        { name: "Have I Been Pwned", url: "https://haveibeenpwned.com", desc: "Check if your email was in a breach" },
        { name: "VirusTotal", url: "https://www.virustotal.com", desc: "Scan suspicious files and URLs" },
        { name: "ScamAdviser", url: "https://www.scamadviser.com", desc: "Check if a website is legitimate" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-phosphor/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[200px]" />

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
            <span className="text-crimson">Learn</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-6">
            <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse" />
            <span className="text-phosphor text-xs font-mono uppercase tracking-widest">
              Knowledge Base
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Build &amp; Protect
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed mb-6">
            Practical guides to building, optimizing, and securing your home
            infrastructure. No jargon, no fear-mongering — just actionable steps.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 border border-ash bg-terminal/30">
            <span className="text-text-muted font-mono text-sm">
              {topics.length} topics
            </span>
            <span className="text-ash">•</span>
            <span className="text-text-muted font-mono text-sm">
              ~20 min read
            </span>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="terminal-card p-6 mb-16"
        >
          <h2 className="font-display text-lg text-crimson mb-4">
            Quick Navigation
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {topics.map((topic) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className="flex items-center gap-3 py-2 px-3 hover:bg-slate/50 transition-colors group"
              >
                <span className="text-lg">{topic.icon}</span>
                <span className="font-mono text-sm text-text-secondary group-hover:text-crimson transition-colors">
                  {topic.title}
                </span>
              </a>
            ))}
          </div>
        </motion.nav>

        {/* Topics */}
        <div className="space-y-16">
          {topics.map((topic) => (
            <motion.section
              key={topic.id}
              id={topic.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="scroll-mt-24"
            >
              <div className="terminal-card p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-ash">
                  <span className="text-4xl">{topic.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-crimson">
                        [{topic.id}]
                      </span>
                    </div>
                    <h2 className="font-display text-2xl text-crimson mb-1">
                      {topic.title}
                    </h2>
                    <p className="font-mono text-sm text-text-muted">
                      {topic.subtitle}
                    </p>
                  </div>
                </div>

                {/* Threat */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-warning">⚠</span>
                    <h3 className="font-display text-sm text-warning uppercase tracking-wider">
                      The Problem
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-6">
                    {topic.threat}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-phosphor">✓</span>
                    <h3 className="font-display text-sm text-phosphor uppercase tracking-wider">
                      The Solution
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-6">
                    {topic.solution}
                  </p>
                </div>

                {/* Steps */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-electric">→</span>
                    <h3 className="font-display text-sm text-electric uppercase tracking-wider">
                      Get Started
                    </h3>
                  </div>
                  <ol className="pl-6 space-y-2">
                    {topic.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-crimson mt-0.5">
                          {i + 1}.
                        </span>
                        <span className="font-mono text-sm text-text-secondary">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tools */}
                <div className="bg-terminal/50 border border-ash p-4">
                  <h3 className="font-display text-sm text-text-muted uppercase tracking-wider mb-3">
                    Recommended Tools
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {topic.tools.map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 border border-ash hover:border-crimson transition-colors group"
                      >
                        <span className="font-mono text-sm text-text-primary group-hover:text-crimson transition-colors">
                          {tool.name}
                        </span>
                        <span className="block font-mono text-xs text-text-muted mt-1">
                          {tool.desc}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Optional deep-dive link */}
                {topic.link && (
                  <div className="mt-4 pt-4 border-t border-ash">
                    <Link
                      href={topic.link.href}
                      className="font-mono text-sm text-phosphor hover:text-glow-phosphor transition-all"
                    >
                      {topic.link.label}
                    </Link>
                  </div>
                )}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="terminal-card p-8 text-center">
            <h2 className="font-display text-2xl text-text-primary mb-4">
              Need <span className="text-electric">Hands-On Help</span>?
            </h2>
            <p className="font-mono text-sm text-text-secondary mb-6 max-w-lg mx-auto">
              These guides are a starting point. If you want a professional to
              design, install, or optimize your infrastructure — find one in
              your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/find-help">
                <button className="px-6 py-3 text-base font-semibold border border-electric text-electric hover:bg-electric/10 transition-all duration-300">
                  Find Help Near You
                </button>
              </Link>
              <Link href="/resources">
                <button className="btn-terminal px-6 py-3">
                  More Resources
                </button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Learn;
