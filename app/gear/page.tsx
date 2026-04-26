"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface GearItem {
  name: string;
  desc: string;
  why: string;
  price: "Budget" | "Mid-Range" | "Pro";
  url: string;
}

interface GearSection {
  id: string;
  title: string;
  subtitle: string;
  items: GearItem[];
}

const AMAZON_TAG = "johnconnorpro-20";

const amz = (query: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;

const sections: GearSection[] = [
  {
    id: "01",
    title: "Home Networking",
    subtitle: "Routers, access points, and switches worth buying",
    items: [
      {
        name: "Ubiquiti UniFi Dream Router",
        desc: "All-in-one router, firewall, and WiFi 6 access point.",
        why: "The best single-device solution for serious home networking. Full UniFi ecosystem, VLAN support, and a controller built in. This is what we install.",
        price: "Mid-Range",
        url: amz("Ubiquiti UniFi Dream Router UDR"),
      },
      {
        name: "Ubiquiti U6 Lite",
        desc: "WiFi 6 access point for homes and small offices.",
        why: "The entry point to the UniFi ecosystem. Pair with a UniFi router for proper network segmentation. Rock solid.",
        price: "Budget",
        url: amz("Ubiquiti U6 Lite access point"),
      },
      {
        name: "Ubiquiti UniFi Switch Lite 8 PoE",
        desc: "8-port managed switch with Power over Ethernet.",
        why: "Powers access points and IP cameras without separate adapters. Managed means you can set up VLANs properly.",
        price: "Mid-Range",
        url: amz("Ubiquiti UniFi Switch Lite 8 PoE"),
      },
      {
        name: "TP-Link EAP670 (Omada)",
        desc: "WiFi 6 access point — best value for the price.",
        why: "If UniFi is out of budget, Omada is the next best thing. Solid performance, good controller app, proper VLAN support.",
        price: "Budget",
        url: amz("TP-Link EAP670 Omada WiFi 6"),
      },
      {
        name: "TP-Link TL-SG108E",
        desc: "8-port managed gigabit switch.",
        why: "The most affordable way to get a managed switch with VLAN support. Perfect for a clean wired backbone.",
        price: "Budget",
        url: amz("TP-Link TL-SG108E managed switch"),
      },
    ],
  },
  {
    id: "02",
    title: "NAS & Storage",
    subtitle: "Own your data — stop renting it from the cloud",
    items: [
      {
        name: "Synology DS223",
        desc: "2-bay NAS — best starter unit for most households.",
        why: "User-friendly OS, excellent mobile apps, automatic backup for your devices. The right first NAS for most people.",
        price: "Mid-Range",
        url: amz("Synology DS223 NAS"),
      },
      {
        name: "Synology DS423+",
        desc: "4-bay NAS with Intel processor — serious home cloud.",
        why: "Step up when you need more storage, faster transcoding, or want to run more apps locally. Built to last a decade.",
        price: "Pro",
        url: amz("Synology DS423+ NAS"),
      },
      {
        name: "WD Red Plus NAS Drive",
        desc: "NAS-optimized hard drives — the standard recommendation.",
        why: "Purpose-built for always-on NAS operation. Run two in RAID 1 for data redundancy. Available in 2TB–14TB.",
        price: "Budget",
        url: amz("WD Red Plus NAS hard drive"),
      },
      {
        name: "Seagate IronWolf NAS Drive",
        desc: "Alternative to WD Red — solid and widely available.",
        why: "Our second choice for NAS drives. Same reliability profile, slightly different pricing at different capacities.",
        price: "Budget",
        url: amz("Seagate IronWolf NAS drive"),
      },
    ],
  },
  {
    id: "03",
    title: "Smart Home",
    subtitle: "Local-first hardware — your automations, your data",
    items: [
      {
        name: "Raspberry Pi 5 (4GB)",
        desc: "The brain for a local Home Assistant setup.",
        why: "Run Home Assistant locally on a Pi 5 and your automations work without internet, without clouds, without subscriptions. This is the setup we recommend.",
        price: "Budget",
        url: amz("Raspberry Pi 5 4GB"),
      },
      {
        name: "SONOFF Zigbee 3.0 USB Dongle Plus",
        desc: "Zigbee coordinator for local smart home control.",
        why: "Plug into your Home Assistant device and control Zigbee sensors, bulbs, and switches without any manufacturer cloud.",
        price: "Budget",
        url: amz("SONOFF Zigbee 3.0 USB Dongle Plus"),
      },
      {
        name: "GL.iNet Beryl AX (GL-MT3000)",
        desc: "Travel router with built-in VPN support.",
        why: "Bring your home network with you. Connect to hotel WiFi and tunnel back to your home network securely. Runs OpenWrt.",
        price: "Mid-Range",
        url: amz("GL.iNet Beryl AX GL-MT3000"),
      },
    ],
  },
  {
    id: "04",
    title: "Cabling & Low-Voltage Tools",
    subtitle: "Do the job right — the tools professionals use",
    items: [
      {
        name: "Klein Tools Pass-Through Crimper",
        desc: "RJ45 pass-through crimping tool.",
        why: "The standard crimper in the field. Pass-through design makes terminating ethernet cables faster and cleaner.",
        price: "Budget",
        url: amz("Klein Tools VDV226-110 pass through crimper"),
      },
      {
        name: "Fluke Networks Pro3000 Toner",
        desc: "Cable toner and probe kit.",
        why: "Find and trace cables through walls, panels, and bundles. A must-have for any structured cabling work.",
        price: "Mid-Range",
        url: amz("Fluke Networks Pro3000 toner probe"),
      },
      {
        name: "Cable Matters Cat6A Keystone Jacks",
        desc: "Tool-free Cat6A keystone jacks — 10-pack.",
        why: "What we use for clean, reliable terminations. Tool-free punch-down makes installs faster.",
        price: "Budget",
        url: amz("Cable Matters Cat6A keystone jack tool-free"),
      },
      {
        name: "Monoprice 24-Port Cat6 Patch Panel",
        desc: "Rackmount patch panel for structured wiring.",
        why: "Anchor your home wiring closet properly. Monoprice makes solid low-cost infrastructure gear.",
        price: "Budget",
        url: amz("Monoprice 24 port Cat6 patch panel"),
      },
      {
        name: "Brother P-Touch Label Maker",
        desc: "Cable and port labeling — don't skip this.",
        why: "Label everything. Every cable, every port, every panel. You'll thank yourself six months later when you need to trace something.",
        price: "Budget",
        url: amz("Brother P-Touch label maker"),
      },
    ],
  },
];

const priceColors: Record<GearItem["price"], string> = {
  Budget: "border-phosphor/50 text-phosphor",
  "Mid-Range": "border-warning/50 text-warning",
  Pro: "border-crimson/50 text-crimson",
};

const GearPage = () => {
  return (
    <main className="min-h-screen bg-void relative">
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-crimson transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-crimson transition-colors">Resources</Link>
            <span>/</span>
            <span className="text-crimson">Gear Picks</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-6">
            <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse" />
            <span className="text-phosphor text-xs font-mono uppercase tracking-widest">
              Field Tested
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Gear Picks
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Hardware we actually recommend — vetted by infrastructure professionals,
            not marketing departments. Organized by category with honest notes on
            who each product is right for.
          </p>
        </motion.div>

        {/* Price Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {(Object.entries(priceColors) as [GearItem["price"], string][]).map(([tier, classes]) => (
            <span key={tier} className={`font-mono text-xs px-2 py-1 border ${classes}`}>
              {tier}
            </span>
          ))}
          <span className="font-mono text-xs text-text-muted self-center">— price tiers</span>
        </motion.div>

        {/* Affiliate Disclosure */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-12 px-4 py-3 border border-ash bg-terminal/30"
        >
          <p className="font-mono text-xs text-text-muted leading-relaxed">
            <span className="text-text-secondary">Disclosure:</span> Some links on this page are Amazon affiliate links. If you purchase through them, we may earn a small commission at no extra cost to you. We only recommend gear we would actually install.
          </p>
        </motion.div>

        {/* Gear Sections */}
        <div className="space-y-14">
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
                {section.items.map((item) => (
                  <div key={item.name} className="terminal-card p-5 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-display text-sm text-text-primary leading-snug pr-2">
                        {item.name}
                      </span>
                      <span className={`font-mono text-xs px-1.5 py-0.5 border shrink-0 ${priceColors[item.price]}`}>
                        {item.price}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-text-muted leading-relaxed mb-2">
                      {item.desc}
                    </p>

                    <p className="font-mono text-xs text-text-secondary leading-relaxed mb-4 flex-1">
                      <span className="text-phosphor">Why:</span> {item.why}
                    </p>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-3 py-2 border border-crimson text-crimson hover:bg-crimson/10 transition-all duration-200 text-center"
                    >
                      View on Amazon →
                    </a>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 terminal-card p-8 text-center"
        >
          <h2 className="font-display text-xl text-text-primary mb-3">
            Want Someone to <span className="text-electric">Source and Install</span> This?
          </h2>
          <p className="font-mono text-sm text-text-secondary mb-6 max-w-lg mx-auto">
            Knowing what to buy is one thing. Having it installed correctly is another.
            Find a vetted local professional in our directory.
          </p>
          <Link href="/directory">
            <button className="btn-resistance px-8 py-3">
              <span className="relative z-10">Find a Pro Near You</span>
            </button>
          </Link>
        </motion.div>

      </div>
    </main>
  );
};

export default GearPage;
