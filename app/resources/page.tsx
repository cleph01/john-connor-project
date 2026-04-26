"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState, useMemo } from "react";

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
  category: string;
  tools: Tool[];
}

interface Partner {
  name: string;
  url: string;
  tagline: string;
  desc: string;
  why: string;
}

const partners: Partner[] = [
  {
    name: "iDrive",
    url: "https://www.idrive.com/idrive/signup?from=c2c&p=charlesmon",
    tagline: "The offsite piece of a proper backup strategy.",
    desc: "Cloud backup for computers, NAS devices, and mobile. One plan covers multiple devices — designed for households that take their data seriously.",
    why: "We advocate owning your data on a NAS first. But the 3-2-1 rule exists for a reason: one offsite copy protects against fire, theft, and catastrophic failure. A second NAS at a family member's house is the ideal — iDrive is the practical alternative when that's not an option. It's not a replacement for local ownership. It's the insurance policy behind it.",
  },
  {
    name: "Proton",
    url: "https://proton.me",
    tagline: "The privacy suite that actually lives up to its promises.",
    desc: "Swiss-based, end-to-end encrypted email, VPN, cloud storage, and password manager. Zero-knowledge architecture, audited code, no ad business model.",
    why: "When we tell clients to stop using Gmail for sensitive communication, this is what we point them to. The whole suite, not just the VPN.",
  },
  {
    name: "1Password",
    url: "https://1password.com",
    tagline: "The fix for password reuse in your household.",
    desc: "Password manager for individuals and families. Stores passwords, passkeys, and sensitive documents with a strong security model and an interface non-technical family members will actually use.",
    why: "Password reuse is the most common and most preventable attack vector for regular people. This is the tool we recommend when someone asks what to do about it.",
  },
];

const sections: ResourceSection[] = [
  {
    id: "01",
    title: "Home Networking",
    category: "Networking",
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
    category: "NAS & Storage",
    subtitle: "Own your data — hardware and software for personal cloud storage",
    tools: [
      { name: "Synology", url: "https://www.synology.com", desc: "The most user-friendly NAS hardware. Excellent mobile apps, polished OS, great for beginners and pros alike.", badge: "Paid" },
      { name: "QNAP", url: "https://www.qnap.com", desc: "More powerful and flexible than Synology, with better virtualization support. Steeper learning curve.", badge: "Paid" },
      { name: "TrueNAS", url: "https://www.truenas.com", desc: "Enterprise-grade NAS OS built on FreeBSD. Run it on your own hardware for free.", badge: "Open Source" },
      { name: "Nextcloud", url: "https://nextcloud.com", desc: "Self-hosted Dropbox/Google Drive replacement. Runs on a NAS, Raspberry Pi, or VPS.", badge: "Open Source" },
      { name: "Immich", url: "https://immich.app", desc: "Self-hosted Google Photos alternative. Facial recognition, auto-albums, mobile backup.", badge: "Open Source" },
      { name: "iDrive e2", url: "https://console.idrivee2.com/partner/charlesmon", desc: "S3-compatible object storage for NAS offsite backup. The technical solution for satisfying the offsite requirement of a 3-2-1 strategy without surrendering primary ownership.", badge: "Paid" },
    ],
  },
  {
    id: "03",
    title: "Smart Home",
    category: "Smart Home",
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
    title: "Cameras & Surveillance",
    category: "Cameras",
    subtitle: "Local NVR software and camera platforms — your footage, your hardware",
    tools: [
      { name: "UniFi Protect", url: "https://ui.com/camera-security", desc: "Ubiquiti's camera management platform. Runs on UniFi hardware, records locally, no subscription. The professional standard for local IP camera systems.", badge: "Paid" },
      { name: "Frigate", url: "https://frigate.video", desc: "Open-source NVR with real-time AI object detection. Runs locally on your own hardware, integrates directly with Home Assistant. The most capable self-hosted camera platform available.", badge: "Open Source" },
      { name: "Agent DVR", url: "https://www.ispyconnect.com", desc: "Self-hosted NVR software for Windows and Linux. Supports hundreds of IP camera models via ONVIF. Good choice for mixed camera setups.", badge: "Freemium" },
      { name: "Scrypted", url: "https://www.scrypted.app", desc: "Local smart home camera hub with HomeKit Secure Video support. Bridges IP cameras into Apple Home without any cloud.", badge: "Open Source" },
      { name: "ZoneMinder", url: "https://zoneminder.com", desc: "Veteran open-source NVR. Battle-tested, runs on Linux, handles large camera counts. Steeper setup curve but rock solid once running.", badge: "Open Source" },
      { name: "Reolink App", url: "https://reolink.com/software-and-manual/", desc: "Local management app for Reolink cameras. Supports direct LAN access without cloud — enable this in settings to keep your footage fully local.", badge: "Free" },
    ],
  },
  {
    id: "05",
    title: "Access Control",
    category: "Access Control",
    subtitle: "Door hardware, smart locks, and entry management software",
    tools: [
      { name: "UniFi Access", url: "https://ui.com/door-access", desc: "Ubiquiti's enterprise door access platform. Manages readers, door strikes, and schedules from the UniFi dashboard. Right-sized for small offices, multi-unit properties, and serious home installs.", badge: "Paid" },
      { name: "Konnected", url: "https://konnected.io", desc: "Modernize existing wired alarm systems without replacing them. Connects hardwired door/window sensors to Home Assistant or SmartThings. Keep the reliable infrastructure, ditch the monitoring contract.", badge: "Paid" },
      { name: "Home Assistant Locks", url: "https://www.home-assistant.io/integrations/#lock", desc: "Home Assistant's lock integration hub — supports Z-Wave, Zigbee, and WiFi deadbolts from Schlage, Yale, Kwikset, and others. Full local control, no manufacturer cloud required.", badge: "Open Source" },
      { name: "KeypadLinc", url: "https://www.insteon.com", desc: "Hardwired keypad controller for scene and access management. Popular in structured installations where a physical panel is required.", badge: "Paid" },
      { name: "Nuki Bridge", url: "https://nuki.io", desc: "Smart lock bridge that adds HomeKit, Home Assistant, and API access to compatible Nuki locks. Local API available — no cloud dependency.", badge: "Paid" },
    ],
  },
  {
    id: "06",
    title: "Security & Privacy",
    category: "Security",
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
    id: "07",
    title: "Monitoring & Diagnostics",
    category: "Monitoring",
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

const CATEGORIES = ["All", "Networking", "NAS & Storage", "Smart Home", "Cameras", "Access Control", "Security", "Monitoring"];
const COSTS: Array<Tool["badge"] | "All"> = ["All", "Free", "Open Source", "Freemium", "Paid"];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCost, setSelectedCost] = useState<Tool["badge"] | "All">("All");

  const filteredSections = useMemo(() => {
    return sections
      .filter((section) => selectedCategory === "All" || section.category === selectedCategory)
      .map((section) => ({
        ...section,
        tools: selectedCost === "All"
          ? section.tools
          : section.tools.filter((tool) => tool.badge === selectedCost),
      }))
      .filter((section) => section.tools.length > 0);
  }, [selectedCategory, selectedCost]);

  const isFiltered = selectedCategory !== "All" || selectedCost !== "All";

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

        {/* Trusted Partners — always visible */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-14"
        >
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="font-display text-xl text-crimson">Trusted Partners</h2>
          </div>
          <p className="font-mono text-xs text-text-muted mb-1">
            Tools we recommend by name — not because they pay us to, but because they're what we'd install for a family member.
          </p>
          <p className="font-mono text-xs text-text-muted mb-6">
            <span className="text-text-secondary">Disclosure:</span> Some links below are affiliate links. If you purchase through them, we may earn a small commission at no extra cost to you.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <div key={partner.name} className="terminal-card p-5 border-t-2 border-t-electric flex flex-col">
                <h3 className="font-display text-base text-electric mb-1">{partner.name}</h3>
                <p className="font-mono text-xs text-text-secondary mb-3 italic">{partner.tagline}</p>
                <p className="font-mono text-xs text-text-muted leading-relaxed mb-3">{partner.desc}</p>
                <p className="font-mono text-xs text-text-secondary leading-relaxed mb-4 flex-1">
                  <span className="text-phosphor">Why we recommend it:</span> {partner.why}
                </p>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs px-3 py-2 border border-electric text-electric hover:bg-electric/10 transition-all duration-200 text-center"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 space-y-4"
        >
          {/* Category filter */}
          <div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2 block">Category</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 ${
                    selectedCategory === cat
                      ? "border-crimson text-crimson bg-crimson/10"
                      : "border-ash text-text-muted hover:border-text-secondary hover:text-text-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cost filter */}
          <div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2 block">Cost</span>
            <div className="flex flex-wrap gap-2">
              {COSTS.map((cost) => (
                <button
                  key={cost}
                  onClick={() => setSelectedCost(cost)}
                  className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 ${
                    selectedCost === cost
                      ? cost === "All"
                        ? "border-crimson text-crimson bg-crimson/10"
                        : `${badgeColors[cost as Tool["badge"]]} bg-terminal/50`
                      : "border-ash text-text-muted hover:border-text-secondary hover:text-text-secondary"
                  }`}
                >
                  {cost}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Resource Sections */}
        <div className="space-y-12">
          {filteredSections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="terminal-card p-10 text-center"
            >
              <p className="font-mono text-text-muted text-sm mb-3">No tools match the selected filters.</p>
              <button
                onClick={() => { setSelectedCategory("All"); setSelectedCost("All"); }}
                className="font-mono text-xs text-crimson hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            filteredSections.map((section, sectionIndex) => (
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
            ))
          )}

          {/* Only show these if no category filter is active */}
          {!isFiltered && (
            <>
              {/* Coming Soon: Video Library */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="terminal-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-crimson font-mono text-sm">[08]</span>
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

              {/* Gear Picks — link to dedicated page */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="terminal-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-crimson font-mono text-sm">[09]</span>
                  <h2 className="font-display text-lg text-crimson">Gear Picks</h2>
                </div>
                <p className="font-mono text-sm text-text-secondary mb-4">
                  Curated hardware recommendations organized by category —
                  routers, NAS devices, access points, switches, cabling tools, and smart home gear.
                  Vetted by infrastructure professionals, not marketing departments.
                </p>
                <Link href="/gear" className="font-mono text-sm text-electric hover:text-glow-electric transition-all">
                  Browse gear picks →
                </Link>
              </motion.section>
            </>
          )}
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
