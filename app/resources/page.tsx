"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface Tool {
  name: string;
  url: string;
  desc: string;
  badge: "Free" | "Open Source" | "Freemium" | "Paid";
}

interface ResourceSection {
  id: string;
  title: string;
  subtitle: string;
  tools: Tool[];
}

const sections: ResourceSection[] = [
  {
    id: "01",
    title: "Home Networking",
    subtitle: "Routers, switches, access points, and firewall software",
    tools: [
      { name: "Ubiquiti UniFi", url: "https://ui.com", desc: "Professional-grade mesh networking — the gold standard for serious home and small-business use.", badge: "Paid" },
      { name: "TP-Link Omada", url: "https://www.tp-link.com/us/omada-sdn/", desc: "Affordable managed networking with a solid controller app. Great bang for the buck.", badge: "Paid" },
      { name: "pfSense", url: "https://www.pfsense.org", desc: "Open-source firewall and router OS. Runs on dedicated hardware or a small PC.", badge: "Open Source" },
      { name: "OPNsense", url: "https://opnsense.org", desc: "Feature-rich pfSense alternative with a cleaner UI and more frequent updates.", badge: "Open Source" },
      { name: "OpenWrt", url: "https://openwrt.org", desc: "Install on many consumer routers to unlock advanced features including VLANs and QoS.", badge: "Open Source" },
      { name: "Wireshark", url: "https://www.wireshark.org", desc: "The industry-standard tool for analyzing what's actually happening on your network.", badge: "Open Source" },
    ],
  },
  {
    id: "02",
    title: "NAS & Storage",
    subtitle: "Own your data — hardware and software for personal cloud storage",
    tools: [
      { name: "Synology", url: "https://www.synology.com", desc: "The most user-friendly NAS hardware. Excellent mobile apps, polished OS, great for beginners and pros alike.", badge: "Paid" },
      { name: "QNAP", url: "https://www.qnap.com", desc: "More powerful and flexible than Synology, with better virtualization support. Steeper learning curve.", badge: "Paid" },
      { name: "TrueNAS", url: "https://www.truenas.com", desc: "Enterprise-grade NAS OS built on FreeBSD. Run it on your own hardware for free.", badge: "Open Source" },
      { name: "Nextcloud", url: "https://nextcloud.com", desc: "Self-hosted Dropbox/Google Drive replacement. Runs on a NAS, Raspberry Pi, or VPS.", badge: "Open Source" },
      { name: "Immich", url: "https://immich.app", desc: "Self-hosted Google Photos alternative. Facial recognition, auto-albums, mobile backup.", badge: "Open Source" },
      { name: "Backblaze", url: "https://www.backblaze.com", desc: "Affordable cloud backup for your NAS or PC. Use as offsite backup alongside local storage.", badge: "Paid" },
    ],
  },
  {
    id: "03",
    title: "Smart Home",
    subtitle: "Local-first automation — control your home without cloud dependency",
    tools: [
      { name: "Home Assistant", url: "https://www.home-assistant.io", desc: "The definitive open-source home automation hub. Runs locally, supports 3,000+ integrations. Your data never leaves your home.", badge: "Open Source" },
      { name: "Zigbee2MQTT", url: "https://www.zigbee2mqtt.io", desc: "Connect Zigbee devices directly to Home Assistant without proprietary bridges or manufacturer clouds.", badge: "Open Source" },
      { name: "Hubitat", url: "https://hubitat.com", desc: "Local-first smart home hub out of the box. Good choice if Home Assistant feels overwhelming.", badge: "Paid" },
      { name: "Z-Wave JS UI", url: "https://zwave-js.github.io/zwave-js-ui/", desc: "Open-source Z-Wave controller that integrates with Home Assistant for reliable local automation.", badge: "Open Source" },
      { name: "ESPHome", url: "https://esphome.io", desc: "Flash cheap ESP32/ESP8266 chips to create your own local smart home sensors and switches.", badge: "Open Source" },
    ],
  },
  {
    id: "04",
    title: "Security & Privacy",
    subtitle: "Essential tools for locking down your digital life",
    tools: [
      { name: "Bitwarden", url: "https://bitwarden.com", desc: "Free, open-source password manager. Self-host it or use their cloud. The best option for most people.", badge: "Open Source" },
      { name: "Pi-hole", url: "https://pi-hole.net", desc: "Network-wide DNS sinkhole. Blocks ads, trackers, and malicious domains for every device on your network.", badge: "Open Source" },
      { name: "AdGuard Home", url: "https://adguard.com/adguard-home.html", desc: "Pi-hole alternative with a cleaner interface. Runs on NAS, Raspberry Pi, or any Linux machine.", badge: "Open Source" },
      { name: "ProtonVPN", url: "https://protonvpn.com", desc: "Trustworthy VPN with a genuine no-logs policy. Free tier available. Swiss-based privacy laws.", badge: "Freemium" },
      { name: "ProtonMail", url: "https://proton.me/mail", desc: "End-to-end encrypted email. The best option for private communications short of running your own server.", badge: "Freemium" },
      { name: "Signal", url: "https://signal.org", desc: "Gold standard for encrypted messaging. Uses the Signal Protocol, which even iMessage is based on.", badge: "Free" },
    ],
  },
  {
    id: "05",
    title: "Monitoring & Diagnostics",
    subtitle: "Know what's on your network and whether you've been compromised",
    tools: [
      { name: "Have I Been Pwned", url: "https://haveibeenpwned.com", desc: "Check if your email or password has appeared in a known data breach. Run this for every account.", badge: "Free" },
      { name: "VirusTotal", url: "https://www.virustotal.com", desc: "Scan suspicious files and URLs against 70+ antivirus engines before opening them.", badge: "Free" },
      { name: "Nmap", url: "https://nmap.org", desc: "The industry-standard network scanner. Discover every device on your network and what ports they expose.", badge: "Open Source" },
      { name: "Uptime Kuma", url: "https://github.com/louislam/uptime-kuma", desc: "Self-hosted uptime monitoring for your home services. Alerts when something goes down.", badge: "Open Source" },
      { name: "Netdata", url: "https://www.netdata.cloud", desc: "Real-time performance monitoring for your network, NAS, and servers.", badge: "Open Source" },
    ],
  },
];

const badgeColors: Record<Tool["badge"], string> = {
  "Free": "border-phosphor/50 text-phosphor",
  "Open Source": "border-electric/50 text-electric",
  "Freemium": "border-warning/50 text-warning",
  "Paid": "border-ash text-text-muted",
};

const Resources = () => {
  return (
    <main className="min-h-screen bg-void relative">
      {/* Background effects */}
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[200px]" />

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
            Curated tools and gear for building, securing, and owning your home
            infrastructure. Organized by category — start anywhere.
          </p>
        </motion.div>

        {/* Badge Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {(Object.entries(badgeColors) as [Tool["badge"], string][]).map(([badge, classes]) => (
            <span
              key={badge}
              className={`font-mono text-xs px-2 py-1 border ${classes}`}
            >
              {badge}
            </span>
          ))}
          <span className="font-mono text-xs text-text-muted self-center">
            — cost indicators
          </span>
        </motion.div>

        {/* Resource Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.05 }}
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono text-xs text-crimson">[{section.id}]</span>
                <h2 className="font-display text-xl text-crimson">{section.title}</h2>
                <span className="font-mono text-xs text-text-muted hidden sm:block">
                  — {section.subtitle}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-card p-5 hover:border-crimson transition-all duration-300 group block"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-display text-sm text-text-primary group-hover:text-crimson transition-colors">
                        {tool.name}
                      </span>
                      <span className={`font-mono text-xs px-1.5 py-0.5 border shrink-0 ml-2 ${badgeColors[tool.badge]}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-text-muted leading-relaxed">
                      {tool.desc}
                    </p>
                    <span className="block mt-3 font-mono text-xs text-phosphor opacity-0 group-hover:opacity-100 transition-opacity">
                      → Visit site
                    </span>
                  </a>
                ))}
              </div>
            </motion.section>
          ))}

          {/* Coming Soon: Video Library */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-crimson font-mono text-sm">[06]</span>
              <h2 className="font-display text-lg text-crimson">Video Library</h2>
              <span className="text-xs font-mono px-2 py-0.5 border border-ash text-text-muted ml-auto">
                Coming Soon
              </span>
            </div>
            <p className="font-mono text-sm text-text-secondary">
              Walkthroughs, installation guides, gear reviews, and how-to content
              for home networking, NAS setup, smart home integration, and more.
              Linked from the YouTube channel as it grows.
            </p>
          </motion.section>

          {/* Coming Soon: Gear Picks by Budget */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="terminal-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-crimson font-mono text-sm">[07]</span>
              <h2 className="font-display text-lg text-crimson">Gear Picks by Budget</h2>
              <span className="text-xs font-mono px-2 py-0.5 border border-ash text-text-muted ml-auto">
                Coming Soon
              </span>
            </div>
            <p className="font-mono text-sm text-text-secondary">
              Curated hardware recommendations organized by budget and use case —
              routers, NAS devices, access points, switches, and smart home gear.
              Vetted by infrastructure professionals, not marketing departments.
            </p>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 terminal-card p-8 text-center"
        >
          <h2 className="font-display text-xl text-text-primary mb-3">
            Need Help <span className="text-electric">Choosing or Installing?</span>
          </h2>
          <p className="font-mono text-sm text-text-secondary mb-6 max-w-lg mx-auto">
            Knowing the tools is the first step. If you want a professional to
            recommend, source, and set up the right gear for your situation —
            find one in our directory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/find-help">
              <button className="px-6 py-3 text-base font-semibold border border-electric text-electric hover:bg-electric/10 transition-all duration-300">
                Find a Pro Near You
              </button>
            </Link>
            <Link href="/learn">
              <button className="btn-terminal px-6 py-3">
                Read the Guides
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Resources;
