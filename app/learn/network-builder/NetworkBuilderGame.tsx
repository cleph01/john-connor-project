'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

// ─── TYPES ────────────────────────────────────────────────────────────────────

type GameMode = 'menu' | 'tutorial' | 'architect' | 'diagnose' | 'progress'
type TutorialPhase = 'learn' | 'quiz' | 'complete'
type ArchitectPhase = 'build' | 'segment' | 'secure' | 'score'
type DiagnosePhase = 'select' | 'briefing' | 'investigate' | 'result'
type VlanType = 'main' | 'iot' | 'guest' | null
type RuleType = 'allow' | 'deny' | null

interface Question { q: string; options: string[]; correct: number; explanation: string }
interface Slide { title: string; points: string[]; callout?: string }
interface Stage {
  id: number; title: string; icon: string; subtitle: string
  badge: string; badgeLabel: string; slides: Slide[]; quiz: Question[]
}
interface GameState {
  xp: number
  completedStages: number[]
  stageScores: Record<number, number>
  badges: string[]
  architectUnlocked: boolean
  architectCompleted: boolean
  architectScore: { security: number; performance: number; resilience: number } | null
  diagnoseUnlocked: boolean
  completedScenarios: number[]
  scenarioScores: Record<number, number>
}

const DEFAULT_STATE: GameState = {
  xp: 0, completedStages: [], stageScores: {}, badges: [],
  architectUnlocked: false, architectCompleted: false, architectScore: null,
  diagnoseUnlocked: false, completedScenarios: [], scenarioScores: {},
}

// ─── STAGE DATA ───────────────────────────────────────────────────────────────

const STAGES: Stage[] = [
  {
    id: 0, icon: '🌐', badge: '🌐', badgeLabel: 'Connected',
    title: 'Your Internet Connection',
    subtitle: 'Where it all starts — the link between your home and the internet',
    slides: [
      {
        title: 'Modem vs. Router — Two Different Jobs',
        points: [
          'The modem is your home\'s translator. It converts your ISP\'s signal (cable, fiber, DSL) into ethernet data your home network can use.',
          'The router is your home\'s traffic cop. It takes that internet connection and distributes it to every device, assigning each one a local IP address.',
          'Many ISPs bundle both into one device. Convenient — but a liability. You\'re locked into their firmware, their update schedule, and their security choices.',
          'The modem can stay. The router is where your upgrade matters.',
        ],
        callout: 'Modem talks to the internet. Router talks to your devices.',
      },
      {
        title: 'IP Addresses, DHCP, and DNS',
        points: [
          'Every device on your network gets an IP address — a unique number like 192.168.1.42. This is how devices find each other locally.',
          'DHCP (Dynamic Host Configuration Protocol) is the process that hands out these addresses automatically. Your router runs a DHCP server — every new device gets an address without you doing anything.',
          'DNS (Domain Name System) is the internet\'s phone book. When you type "netflix.com", DNS translates that into a numeric IP address your device actually connects to.',
          'By default, DNS goes through your ISP — they can log every site every device on your network visits. You can change this.',
        ],
        callout: 'Router = local addresses (192.168.x.x). Internet = global addresses. DNS = the translator between names and numbers.',
      },
      {
        title: 'Why You Should Own Your Own Router',
        points: [
          'ISP equipment is designed for the ISP\'s convenience. It often lacks VLAN support, advanced firewall rules, and timely security updates.',
          'A router you own gives you full control: your configuration, your firewall, your DNS, your update schedule.',
          'With your own router you can: segment your network into VLANs, run your own DNS filter, set up a home VPN, and monitor traffic — none of which ISP combo units typically support.',
          'Think of the ISP combo unit as a rental car with a governor. A router you own removes the governor.',
        ],
        callout: 'Own your router. It\'s the command center of your entire home network.',
      },
    ],
    quiz: [
      { q: 'What is the primary function of a modem?',
        options: ['Distribute internet to home devices','Translate the ISP signal into usable ethernet data','Assign local IP addresses','Block unauthorized traffic'],
        correct: 1, explanation: 'The modem translates your ISP\'s signal (cable, fiber, DSL) into ethernet data. Distribution and IP assignment are the router\'s jobs.' },
      { q: 'Which process automatically assigns IP addresses to devices on your network?',
        options: ['DNS','VPN','DHCP','NAT'],
        correct: 2, explanation: 'DHCP (Dynamic Host Configuration Protocol) runs on your router and hands out local IP addresses to every device that connects.' },
      { q: 'What does DNS do?',
        options: ['Encrypts your internet traffic','Assigns local IP addresses','Translates domain names into IP addresses','Connects your modem to the ISP'],
        correct: 2, explanation: 'DNS is the internet\'s phone book — it converts human-readable names like "google.com" into the numeric IP addresses computers actually use.' },
      { q: 'What is a key downside of using your ISP\'s combo modem/router unit?',
        options: ['It\'s always slower','It can\'t do WiFi','Limited control over configuration, security, and firmware','It doesn\'t support DHCP'],
        correct: 2, explanation: 'ISP combo units prioritize ISP convenience. They lack features like VLANs and custom DNS, and you depend on the ISP for firmware updates.' },
      { q: 'Between a modem and a router, which upgrade has the biggest impact on your home network?',
        options: ['Modem — it\'s the most critical','Router — it controls everything inside your home','Both equally','Neither — the ISP controls everything'],
        correct: 1, explanation: 'The router is your home network\'s command center. Upgrading it unlocks VLAN segmentation, custom DNS, home VPN, and proper firewall rules.' },
    ],
  },
  {
    id: 1, icon: '🔌', badge: '🔌', badgeLabel: 'Cabled Up',
    title: 'Wired Foundation',
    subtitle: 'Ethernet, switches, and structured cabling — the backbone of reliability',
    slides: [
      {
        title: 'Wired vs. Wireless — When Each Makes Sense',
        points: [
          'WiFi is convenient. Ethernet is reliable. The right answer is both — in the right places.',
          'Wired connections win on speed, latency, and consistency. A wired gigabit link doesn\'t compete with your neighbor\'s microwave.',
          'Always wire: your router, switches, NAS, desktops, smart TVs, and gaming consoles that support it.',
          'WiFi makes sense for: phones, tablets, laptops, and anything that physically moves.',
        ],
        callout: 'A NAS on WiFi is leaving serious performance on the table. Run the cable.',
      },
      {
        title: 'Cable Categories — What the Spec Means',
        points: [
          'Cat5e: Supports 1 Gbps up to 100m. Minimum acceptable for any new install. Anything older should be replaced.',
          'Cat6: Supports 1 Gbps reliably, 10 Gbps at shorter distances. Better shielding, less interference. Good for most home runs.',
          'Cat6A: Supports 10 Gbps up to 100m. Thicker and harder to work with — but fully future-proof for any home install.',
          'For new construction or runs inside finished walls: use Cat6A. You won\'t be re-opening those walls to upgrade.',
        ],
        callout: 'Spec the cable for where you want to be in 10 years, not where you are today.',
      },
      {
        title: 'Switches, PoE, and Structured Cabling',
        points: [
          'A switch expands wired port count. Your router has 4 ports. A managed switch gives you 8, 16, or 24+ ports off one uplink.',
          'Managed switches support VLANs — essential for network segmentation. Unmanaged switches are plug-and-play with zero configuration options.',
          'PoE (Power over Ethernet) delivers power through the ethernet cable itself — how ceiling-mounted APs and IP cameras get powered without a nearby outlet.',
          'Structured cabling: run all ethernet from a central patch panel to wall plates throughout your home. One location controls your entire network.',
        ],
        callout: 'One central patch panel = full network control from one location. This is how every commercial building is wired.',
      },
    ],
    quiz: [
      { q: 'Which device should always use wired ethernet rather than WiFi?',
        options: ['Smartphone','Tablet','NAS (Network Attached Storage)','Smart speaker'],
        correct: 2, explanation: 'A NAS transfers large files constantly. WiFi latency and speed variability significantly degrade NAS performance. Wired is non-negotiable.' },
      { q: 'For a new home build where cables run inside walls, which category is the right choice?',
        options: ['Cat3','Cat5e','Cat6','Cat6A'],
        correct: 3, explanation: 'Cat6A supports 10 Gbps up to 100m and is the right spec when you can\'t easily re-run cable later. The cost difference is trivial versus reopening walls.' },
      { q: 'What does a managed switch provide that an unmanaged switch doesn\'t?',
        options: ['More ports','Faster speeds','PoE support','VLAN configuration and network control'],
        correct: 3, explanation: 'Managed switches support VLAN configuration, port-level access control, and traffic monitoring. Unmanaged switches are plug-and-play only.' },
      { q: 'What is PoE?',
        options: ['A cable that carries both data and electrical power','A protocol that boosts ethernet speed','A way to share one port across multiple devices','A type of surge protector'],
        correct: 0, explanation: 'Power over Ethernet allows a single cable to carry both data and electrical power — how ceiling-mounted APs and IP cameras get power without a separate outlet.' },
      { q: 'In structured cabling, all cable runs terminate at a central:',
        options: ['Modem','Mesh node','Patch panel','VLAN controller'],
        correct: 2, explanation: 'A patch panel is the central termination point for all ethernet runs. From here, short patch cables connect any room to any switch port or VLAN.' },
    ],
  },
  {
    id: 2, icon: '📡', badge: '📡', badgeLabel: 'Signal Strong',
    title: 'Wireless Coverage',
    subtitle: 'Eliminate dead zones — understand bands, access points, and placement',
    slides: [
      {
        title: 'The Three WiFi Bands',
        points: [
          '2.4 GHz: Longest range, best wall penetration, slowest speeds. Heavily congested — shared with microwaves, baby monitors, and every neighbor\'s router. Best for IoT devices spread around a large home.',
          '5 GHz: Medium range, faster speeds, much less congested. Best for laptops, phones, and streaming devices within reasonable distance of an AP.',
          '6 GHz (WiFi 6E/7): Short range, fastest speeds, essentially no congestion. Best for high-throughput devices close to the AP — 4K/8K streaming, VR, fast file transfers.',
          'A modern AP broadcasts all three. Devices connect to the best available band automatically.',
        ],
        callout: '2.4 GHz = range. 5 GHz = balance. 6 GHz = max performance at close range.',
      },
      {
        title: 'Router vs. Access Points vs. Mesh',
        points: [
          'Single router: Fine for a small apartment under ~1,200 sq ft. One device, one zone.',
          'Dedicated APs with wired backhaul: The professional standard. APs connect back to the router via ethernet — no speed penalty, full throughput everywhere. This is what offices and commercial buildings use.',
          'Mesh systems: Multiple nodes that backhaul wirelessly. Easier to set up. The tradeoff: wireless backhaul permanently reduces throughput at every hop.',
          'Rule: if you can run ethernet to it, use a wired AP. If you can\'t, mesh is the practical choice.',
        ],
        callout: 'Wired backhaul = no speed penalty. Wireless backhaul = always a speed penalty.',
      },
      {
        title: 'AP Placement Principles',
        points: [
          'Mount APs on ceilings, centered in the zone they serve. RF radiates outward in all directions — a corner mount wastes half the signal.',
          'Concrete and thick masonry walls sharply attenuate 5 GHz. Plan AP zones around your construction materials.',
          'Overlap zones between adjacent APs by ~15-20% for seamless roaming — devices switch APs without dropping connection.',
          'Interference: microwaves (2.4 GHz), Bluetooth devices, neighboring networks. Use a WiFi analyzer to pick low-congestion channels.',
        ],
        callout: 'One well-placed AP beats three poorly placed ones every time.',
      },
    ],
    quiz: [
      { q: 'Your IoT devices are spread across a large home. Which band is most appropriate?',
        options: ['6 GHz for fastest speeds','5 GHz for balance','2.4 GHz for range and penetration','IoT devices don\'t use WiFi'],
        correct: 2, explanation: '2.4 GHz has the longest range and best wall penetration — ideal for IoT devices like sensors and thermostats distributed across a large home.' },
      { q: 'For best wireless performance in a large home, which is the professional choice?',
        options: ['A single high-powered router in the center','Multiple APs with wired ethernet backhaul','Mesh system with wireless backhaul','Powerline adapters'],
        correct: 1, explanation: 'Wired backhaul = each AP connects to the router via ethernet with no speed penalty. This is the commercial standard.' },
      { q: 'Where should access points ideally be mounted?',
        options: ['Walls near the floor for access','Ceilings centered in the coverage area','Near windows for external range','Inside closets'],
        correct: 1, explanation: 'Ceiling-mounted APs centered in their zone give even, omnidirectional coverage across the floor. Wall and corner mounts waste significant signal.' },
      { q: 'The main tradeoff of mesh with wireless backhaul vs. wired APs is:',
        options: ['Mesh doesn\'t support 5 GHz','Wireless backhaul reduces available throughput','Wired APs don\'t support roaming','Mesh can\'t cover multiple floors'],
        correct: 1, explanation: 'A mesh node using wireless backhaul splits its radio bandwidth between node-to-node communication and device service — a permanent throughput penalty.' },
      { q: 'A 2-story home, 2,500 sq ft per floor, with thick interior walls. Minimum APs needed?',
        options: ['1 — one good router covers everything','2 — one per floor','4 — two per floor based on size and construction','6+'],
        correct: 2, explanation: 'At 2,500 sq ft per floor in dense construction, plan for ~1,200-1,500 sq ft per AP. Two APs per floor = four total minimum.' },
    ],
  },
  {
    id: 3, icon: '🔀', badge: '🔀', badgeLabel: 'VLAN Architect',
    title: 'Network Segmentation & VLANs',
    subtitle: 'The most impactful security step you can take on a home network',
    slides: [
      {
        title: 'Why Flat Networks Are a Risk',
        points: [
          'A flat network — every device able to talk to every other device — is a single point of failure. One compromised device can reach everything: laptop, NAS, cameras, work computer.',
          'IoT devices are the biggest risk. Smart TVs, cameras, thermostats, and smart plugs often run outdated firmware with known vulnerabilities. They\'re built cheap, not secure.',
          'Segmentation divides your network into isolated zones. A compromised smart fridge cannot reach your laptop. An infected TV cannot scan your NAS.',
          'This is exactly how enterprises and data centers are built. It\'s not overcomplicated for a home — it\'s the correct way to build any network.',
        ],
        callout: 'Assume any IoT device can be compromised. Segmentation contains the blast radius.',
      },
      {
        title: 'VLANs — Virtual Networks on Shared Hardware',
        points: [
          'A VLAN (Virtual LAN) is a logical partition of your network. Multiple VLANs share the same physical switch — but their traffic is isolated at the software level.',
          'Your router and managed switch enforce VLAN rules. Traffic from one VLAN cannot enter another unless you explicitly allow it through a firewall rule.',
          'You don\'t need separate hardware per segment — VLANs are virtual. One switch, one set of cables, multiple isolated networks.',
          'Requirement: a router and managed switch that support VLANs. Consumer gear often doesn\'t. UniFi, pfSense/OPNsense, and TP-Link Omada do.',
        ],
        callout: 'VLANs cost zero in hardware — software isolation on equipment you already have.',
      },
      {
        title: 'The Three-Segment Model + Firewall Rules',
        points: [
          'Main (Trusted): laptops, phones, tablets, NAS. Can reach the internet and each other.',
          'IoT: smart TVs, cameras, speakers, thermostats, plugs. Can reach the internet. Cannot initiate connections to Main or Guest.',
          'Guest: visitor devices. Internet only. Completely isolated from Main and IoT.',
          'Firewall rules that matter: IoT → Main = DENY. IoT → Internet = ALLOW. Guest → Main = DENY. Guest → IoT = DENY. Main → IoT = context-dependent (allow if you run Home Assistant or similar).',
        ],
        callout: 'Default deny: block everything, then explicitly allow only what you need.',
      },
    ],
    quiz: [
      { q: 'Why are IoT devices a particular network security risk?',
        options: ['They use excessive bandwidth','They run outdated firmware with known vulnerabilities and are rarely updated','They only work on 2.4 GHz','They always require cloud access'],
        correct: 1, explanation: 'IoT devices are built for cost, not security. Manufacturers abandon firmware updates quickly, leaving known CVEs unpatched indefinitely.' },
      { q: 'What is a VLAN?',
        options: ['A faster ethernet cable type','A type of VPN','A software-defined network partition that isolates traffic','A managed switch brand'],
        correct: 2, explanation: 'A VLAN is a Virtual LAN — a logical partition that isolates network traffic at the software level on shared physical hardware.' },
      { q: 'Which device belongs on the IoT VLAN, not Main?',
        options: ['Work laptop','Personal phone','NAS','Smart TV'],
        correct: 3, explanation: 'A smart TV runs embedded software that\'s rarely updated. It should be isolated from personal devices and the NAS — IoT VLAN.' },
      { q: 'Should IoT devices be able to initiate connections to your Main network?',
        options: ['Yes — they need to communicate with your devices','No — IoT gets internet access but is blocked from Main','Yes, but only port 80','Only if on the same physical switch'],
        correct: 1, explanation: 'Correct segmentation: IoT → Internet = ALLOW, IoT → Main = DENY. A compromised IoT device cannot reach your laptop or NAS.' },
      { q: 'What hardware do you need to implement VLANs at home?',
        options: ['A special VLAN modem','Any router with guest WiFi','A VLAN-capable router and managed switch (e.g., UniFi, pfSense, Omada)','Nothing — all routers support VLANs'],
        correct: 2, explanation: 'VLANs require both a router and managed switch that support VLAN configuration. Consumer gear often doesn\'t — prosumer gear like UniFi and pfSense does.' },
    ],
  },
  {
    id: 4, icon: '💾', badge: '💾', badgeLabel: '3-2-1 Operator',
    title: 'Your Personal Cloud (NAS)',
    subtitle: 'Own your data — replace cloud subscriptions with hardware you control',
    slides: [
      {
        title: 'What a NAS Replaces',
        points: [
          'A NAS (Network Attached Storage) is a small server on your home network. It stores files, streams media, backs up devices — everything the cloud does, on hardware you own.',
          'It replaces: iCloud/Google Drive (file sync), Dropbox (sharing), Google Photos/iCloud Photos (photo backup), Plex Cloud (media), and cloud backup services.',
          'One NAS serves your entire household. One hardware cost, no monthly fees, no data mining, no surprises.',
          'Access it from anywhere — phone, laptop, remote location — just like any cloud service. Your data stays on your hardware.',
        ],
        callout: 'A NAS pays for itself in 1–2 years versus equivalent cloud subscriptions.',
      },
      {
        title: 'The 3-2-1 Backup Rule',
        points: [
          '3 copies of your data: the original plus 2 backups.',
          '2 different storage media: e.g., internal drive + NAS, or NAS + external drive.',
          '1 offsite copy: cloud backup, a drive at a family member\'s house, or an offsite backup service.',
          'The NAS itself is copy #1. It still needs to be backed up. An offsite copy is copy #3. Without it, fire or flood takes everything.',
        ],
        callout: '3 copies. 2 media types. 1 offsite. No exceptions.',
      },
      {
        title: 'RAID is Not a Backup',
        points: [
          'RAID mirrors data across drives (RAID 1) or uses parity (RAID 5/6). If one drive fails, your data survives. This is drive redundancy — not backup.',
          'RAID does NOT protect against: ransomware (encrypts all drives simultaneously), accidental deletion, fire, flood, theft, or controller failure.',
          'Use RAID for uptime — keeping the NAS online if a drive dies. Use backups for recovery. Never confuse the two.',
          'When ransomware hits, RAID mirrors the encryption to every drive instantly. Both drives are equally destroyed.',
        ],
        callout: 'RAID = availability. Backup = recovery. You need both.',
      },
    ],
    quiz: [
      { q: 'In the 3-2-1 backup rule, what does the "1" represent?',
        options: ['One backup per day','One copy on a NAS','One offsite copy','One encrypted backup'],
        correct: 2, explanation: 'The "1" = one offsite copy, physically separate from your home. This is the copy that survives fire, flood, or theft.' },
      { q: 'Your NAS uses RAID 1. Your home is hit by ransomware. Are your files safe?',
        options: ['Yes — RAID 1 protects all data','Yes — one drive will be clean','No — RAID mirrors all writes instantly, including encryption','No — only without a password'],
        correct: 2, explanation: 'RAID 1 mirrors every write instantly — including ransomware encryption. Both drives are encrypted simultaneously. RAID is no defense against ransomware.' },
      { q: 'Which of these does a NAS NOT replace?',
        options: ['iCloud Photo Library','Google Drive','Your router/modem','Dropbox'],
        correct: 2, explanation: 'A NAS replaces cloud storage and sync services. It does not replace your networking hardware.' },
      { q: 'Most private way to access your NAS remotely?',
        options: ['Open the admin port on the firewall','Use the manufacturer\'s cloud relay','Run a VPN server and connect through it','FTP with username/password'],
        correct: 2, explanation: 'A VPN server on your router or NAS tunnels you inside your home network. No services are exposed to the open internet.' },
      { q: 'Original files on laptop + copy on NAS + external drive stored next to NAS. Does this meet 3-2-1?',
        options: ['Yes — 3 copies, 2 media, 1 backup','No — the external drive next to the NAS is not offsite','Yes — an external drive counts as offsite','No — need 4 copies minimum'],
        correct: 1, explanation: 'The external drive next to the NAS is not offsite. A house fire takes both. The "1" must be at a physically separate location.' },
    ],
  },
  {
    id: 5, icon: '🏡', badge: '🏡', badgeLabel: 'Physical Layer',
    title: 'Smart Home & Physical Security',
    subtitle: 'Cameras, access control, and automation — done right, locally',
    slides: [
      {
        title: 'Cloud-Dependent vs. Local Smart Home',
        points: [
          'Most consumer smart home devices require the manufacturer\'s server to function. No internet = lights don\'t work.',
          'The risks: server outage, company shutdown (your devices brick), data collection (your activity patterns sold), and loss of control.',
          'Local-first: devices controlled by a hub on your local network. Home Assistant is the leading open-source option. Works without internet. Your data stays home.',
          'Protocols for local control: Matter (new cross-platform standard), Zigbee, Z-Wave. Avoid WiFi-only devices requiring proprietary cloud apps.',
        ],
        callout: 'If it requires the manufacturer\'s app to function, you\'re renting the functionality — not owning it.',
      },
      {
        title: 'IP Cameras and Local Recording',
        points: [
          'Consumer cameras (Ring, Nest, Arlo) send footage to the cloud. You pay a subscription; the company has access; law enforcement can subpoena.',
          'IP cameras with NVR (Network Video Recorder) or NAS recording keep footage on your hardware. No cloud, no subscription, no third-party access.',
          'ONVIF is an open standard for IP cameras — mix and match cameras and NVRs from different manufacturers.',
          'Always put IP cameras on the IoT VLAN — even cameras you trust should be isolated from personal devices.',
        ],
        callout: 'Local recording = your footage. Cloud recording = the company\'s footage, accessible to them.',
      },
      {
        title: 'Access Control',
        points: [
          'Smart locks and keypads provide keyless entry, access logs, and remote control. But cloud-dependent locks are a reliability risk — servers down, you\'re locked out.',
          'Prefer locks with local operation: keypad that works without internet, or integration with a local smart home hub.',
          'Door/window sensors and motion detectors can trigger local automations without internet — lights, sirens, alerts through your local hub.',
          'A smart lock that stops working when internet goes down is not a reliable security device.',
        ],
        callout: 'A smart lock that can\'t open without internet is not a lock — it\'s a liability.',
      },
    ],
    quiz: [
      { q: 'Main risk of cloud-dependent smart home devices?',
        options: ['Too much power usage','More expensive','Server outages or company shutdowns can instantly disable devices you paid for','They don\'t support automation'],
        correct: 2, explanation: 'Cloud-dependent devices stop working if the manufacturer\'s server goes down, the company shuts down, or they change their policy.' },
      { q: 'Which protocol is designed for local-first cross-platform smart home control?',
        options: ['Bluetooth','Matter','WiFi Direct','HDMI CEC'],
        correct: 1, explanation: 'Matter is a new cross-platform standard backed by Apple, Google, and Amazon — designed for local control without requiring cloud servers.' },
      { q: 'You install IP cameras with local NVR recording. Which network segment?',
        options: ['Main — they need to reach the NVR','IoT VLAN — isolated from personal devices','Guest — accessible to visitors','No network access needed'],
        correct: 1, explanation: 'IP cameras belong on the IoT VLAN. Your NVR or NAS can be on Main with a specific firewall rule allowing camera → NVR traffic only.' },
      { q: 'What does ONVIF provide for IP cameras?',
        options: ['Cloud storage','Open standard for interoperability between cameras and NVRs from different brands','End-to-end encryption','Motion detection'],
        correct: 1, explanation: 'ONVIF is an open standard that allows cameras and NVRs from different manufacturers to work together, preventing vendor lock-in.' },
      { q: 'Internet goes down. What should happen to a well-designed smart lock?',
        options: ['Default to unlocked for safety','Stop working until internet restores','Continue working via keypad or local hub','Call a locksmith'],
        correct: 2, explanation: 'A well-designed smart lock must have local access modes — keypad or local hub integration. Internet loss must never disable a physical security device.' },
    ],
  },
  {
    id: 6, icon: '⚙️', badge: '⚙️', badgeLabel: 'Network Operator',
    title: 'Ongoing Operations',
    subtitle: 'A secure network isn\'t built once — it\'s maintained',
    slides: [
      {
        title: 'Firmware Updates and Patch Discipline',
        points: [
          'Routers, switches, APs, NAS, and cameras all run firmware. Firmware vulnerabilities are real and actively exploited. Your router is the front door to your entire network.',
          'Rule: apply security updates within 30 days. Critical vulnerabilities: patch immediately. Most prosumer gear has automatic update notifications — enable them.',
          'End-of-life devices no longer receive firmware updates. An unpatched router is a permanent open door. Plan hardware refresh cycles every 5–7 years.',
          'Test updates before deploying on production gear when possible, but don\'t use this as an excuse to delay security patches.',
        ],
        callout: 'Unpatched firmware on your router is an unlocked door. Stay current.',
      },
      {
        title: 'DNS Filtering',
        points: [
          'DNS filtering intercepts DNS requests and blocks known malicious, advertising, and tracking domains before a connection is ever made.',
          'Pi-hole and AdGuard Home run on your network as a DNS server. Every device benefits — phones, TVs, IoT, laptops — without any per-device configuration.',
          'Benefits: blocks malware domains proactively, eliminates most ads network-wide, and prevents many IoT devices from phoning home to their manufacturers.',
          'Configure your router to push your Pi-hole as the DNS server for all DHCP clients. All devices are protected automatically.',
        ],
        callout: 'DNS filtering is the highest-impact, lowest-effort security upgrade for a home network.',
      },
      {
        title: 'Home VPN and UPS',
        points: [
          'A home VPN server (WireGuard is the modern standard) lets you connect to your home network from anywhere as if you\'re physically there — access your NAS, manage gear, reach local services.',
          'Use your home VPN on public WiFi. Untrusted networks can intercept traffic. Tunneling through your home VPN encrypts everything.',
          'A UPS (Uninterruptible Power Supply) provides battery backup for network gear. Power flickers cause router/switch reboots and NAS filesystem corruption.',
          'Put on UPS: router, switch, and NAS. A modest 600–1000VA UPS keeps core gear running 15–30 minutes and allows a graceful NAS shutdown before battery dies.',
        ],
        callout: 'WireGuard on your router = encrypted tunnel home from anywhere. UPS = cheap insurance against data corruption.',
      },
    ],
    quiz: [
      { q: 'How quickly should you apply a security firmware update to your router?',
        options: ['Within a week','Wait 6 months for others to find bugs','Annually to minimize disruption','Updates aren\'t necessary with a firewall'],
        correct: 0, explanation: 'Security patches should be applied promptly — within a week for critical CVEs, within 30 days otherwise. Waiting leaves known vulnerabilities open.' },
      { q: 'DNS filtering with Pi-hole protects devices at which level?',
        options: ['Only the device Pi-hole runs on','Network level — all devices benefit without per-device config','Only wired devices','Only devices with the Pi-hole app'],
        correct: 1, explanation: 'Pi-hole runs as a DNS server on your network. When your router points all DHCP clients at it, every device is filtered automatically.' },
      { q: 'What is WireGuard?',
        options: ['A home firewall','A DNS filter','A modern lightweight VPN protocol','An intrusion detection system'],
        correct: 2, explanation: 'WireGuard is a modern, lightweight, open-source VPN protocol. It\'s the current standard for home VPN servers and is supported natively by most prosumer routers.' },
      { q: 'Which devices should always be on a UPS?',
        options: ['Smart lights and plugs','Router, switch, and NAS','Gaming consoles and TVs','Phone chargers'],
        correct: 1, explanation: 'Core network infrastructure and data storage must be on a UPS. Abrupt power loss can corrupt NAS filesystems and disrupts the whole home network.' },
      { q: 'How does a home VPN differ from a commercial VPN service?',
        options: ['Commercial VPNs are faster','Home VPN connects you to your own network; commercial VPNs route traffic through a third-party for internet privacy','Home VPN only works on WiFi','Commercial VPNs are more secure'],
        correct: 1, explanation: 'A home VPN tunnels you into your own network from anywhere. Commercial VPNs hide your traffic from your ISP by routing it through their servers.' },
    ],
  },
]

// ─── ARCHITECT DATA ───────────────────────────────────────────────────────────

const TOPOLOGY_SLOTS = [
  { id: 'modem', label: 'Slot A', role: 'Between ISP and router', hint: 'Converts the ISP\'s signal into ethernet data your network can use', answer: 'modem', answerLabel: 'Modem', icon: '📡' },
  { id: 'router', label: 'Slot B', role: 'Core of your network', hint: 'Routes traffic, runs DHCP, enforces the firewall and inter-VLAN rules', answer: 'router', answerLabel: 'Router', icon: '🔁' },
  { id: 'switch', label: 'Slot C', role: 'Wired device expansion', hint: 'Expands port count and enforces VLAN tagging on wired devices', answer: 'switch', answerLabel: 'Managed Switch', icon: '🔀' },
  { id: 'ap', label: 'Slot D', role: 'Wireless coverage', hint: 'Broadcasts SSID for each VLAN — connected back to switch via PoE', answer: 'ap', answerLabel: 'Access Point', icon: '📶' },
  { id: 'nas', label: 'Slot E', role: 'Data storage — Main VLAN', hint: 'Your personal cloud server — always on the trusted (Main) VLAN', answer: 'nas', answerLabel: 'NAS', icon: '💾' },
]

const TOPOLOGY_PALETTE = [
  { id: 'modem', name: 'Modem', icon: '📡', desc: 'Converts ISP signal to ethernet' },
  { id: 'router', name: 'Router', icon: '🔁', desc: 'Routes traffic and runs firewall' },
  { id: 'switch', name: 'Managed Switch', icon: '🔀', desc: 'VLAN-capable port expansion' },
  { id: 'ap', name: 'Access Point', icon: '📶', desc: 'WiFi coverage, PoE-powered' },
  { id: 'nas', name: 'NAS', icon: '💾', desc: 'Personal cloud storage' },
  { id: 'smart_tv', name: 'Smart TV', icon: '📺', desc: 'IoT end device' },
  { id: 'hub', name: 'Smart Hub', icon: '🏠', desc: 'Home automation controller' },
  { id: 'extender', name: 'WiFi Extender', icon: '📻', desc: 'Wireless signal repeater' },
]

const SEGMENT_DEVICES = [
  { id: 'work_laptop', name: 'Work Laptop', icon: '💻', correct: 'main' as const, hint: 'Contains sensitive corporate data — must be on the most trusted segment.' },
  { id: 'personal_phone', name: 'Personal Phone', icon: '📱', correct: 'main' as const, hint: 'Primary personal device. Trusted segment.' },
  { id: 'nas', name: 'NAS', icon: '💾', correct: 'main' as const, hint: 'Contains your most important data. Must be on the trusted, isolated segment.' },
  { id: 'desktop', name: 'Desktop PC', icon: '🖥️', correct: 'main' as const, hint: 'Trusted personal device — Main VLAN.' },
  { id: 'smart_tv', name: 'Smart TV', icon: '📺', correct: 'iot' as const, hint: 'Runs rarely-updated firmware. Isolate from personal devices.' },
  { id: 'ring_doorbell', name: 'Ring Doorbell', icon: '🔔', correct: 'iot' as const, hint: 'IoT camera — internet yes, access to your network absolutely not.' },
  { id: 'thermostat', name: 'Smart Thermostat', icon: '🌡️', correct: 'iot' as const, hint: 'Cloud-connected IoT device. Isolate from personal devices.' },
  { id: 'smart_speaker', name: 'Smart Speaker', icon: '🔊', correct: 'iot' as const, hint: 'Always-on microphone. Not on your main network.' },
  { id: 'ip_camera', name: 'IP Security Camera', icon: '📷', correct: 'iot' as const, hint: 'Even with local recording, cameras belong on IoT.' },
  { id: 'smart_plug', name: 'Smart Plug', icon: '🔌', correct: 'iot' as const, hint: 'Basic IoT device — internet access for control, not on Main.' },
  { id: 'guest_phone', name: 'Guest\'s Phone', icon: '📲', correct: 'guest' as const, hint: 'Unknown device. Internet only — no access to your network.' },
  { id: 'guest_laptop', name: 'Visitor\'s Laptop', icon: '💻', correct: 'guest' as const, hint: 'You don\'t know what\'s on it. Guest VLAN only.' },
]

const FIREWALL_RULES = [
  { id: 'iot_internet', label: 'IoT → Internet', correct: 'allow' as const, explanation: 'IoT devices need internet to function (firmware updates, cloud features). Allow.' },
  { id: 'iot_main', label: 'IoT → Main Network', correct: 'deny' as const, explanation: 'Critical rule. IoT must NOT be able to initiate connections to Main. A compromised smart TV should not reach your NAS.' },
  { id: 'guest_internet', label: 'Guest → Internet', correct: 'allow' as const, explanation: 'Guests need internet access. Allow internet-bound traffic from Guest VLAN.' },
  { id: 'guest_main', label: 'Guest → Main Network', correct: 'deny' as const, explanation: 'Guests get internet only — no access to personal devices, NAS, or smart home.' },
  { id: 'guest_iot', label: 'Guest → IoT', correct: 'deny' as const, explanation: 'Guests shouldn\'t control your smart home. Deny cross-segment access.' },
  { id: 'main_iot', label: 'Main → IoT (management)', correct: 'allow' as const, explanation: 'Your trusted devices (e.g., Home Assistant on Main) may need to send commands to IoT devices. Allow — but IoT still cannot initiate back to Main.' },
]

// ─── DIAGNOSE DATA ────────────────────────────────────────────────────────────

const DIAGNOSE_SCENARIOS = [
  {
    id: 0,
    title: 'The Smith Household',
    severity: 'HIGH',
    description: 'A family of 4. Two work-from-home laptops, phones, a Smart TV, Ring doorbell, Nest thermostat, smart speaker, and a NAS with family photos and work documents. Single flat network — no VLANs, no segmentation.',
    devices: [
      { name: 'Work Laptops (×2)', segment: 'Everything (flat)' },
      { name: 'Smart TV', segment: 'Everything (flat)' },
      { name: 'Ring Doorbell', segment: 'Everything (flat)' },
      { name: 'Nest Thermostat', segment: 'Everything (flat)' },
      { name: 'Smart Speaker', segment: 'Everything (flat)' },
      { name: 'NAS', segment: 'Everything (flat)' },
    ],
    problems: [
      { id: 'no_iot_vlan', label: 'IoT devices on same segment as personal devices and NAS', correct: true },
      { id: 'no_guest_vlan', label: 'No isolated guest network', correct: true },
      { id: 'nas_exposed', label: 'NAS reachable by IoT devices with poor firmware', correct: true },
      { id: 'no_nas', label: 'No NAS on the network', correct: false },
      { id: 'no_wired', label: 'No ethernet connections anywhere', correct: false },
    ],
    fixes: [
      'Create IoT VLAN — move all smart devices to it',
      'Create Guest VLAN for visitor devices',
      'Add firewall rules: IoT → Main = DENY, Guest → Main = DENY',
      'The NAS is already on the right device — it just needs proper VLAN isolation around it',
    ],
  },
  {
    id: 1,
    title: 'The Backup That Isn\'t',
    severity: 'CRITICAL',
    description: 'A user has a NAS with two drives in RAID 1. They consider this their backup. It\'s the only copy of 10 years of family photos. No offsite backup exists. No UPS on the NAS.',
    devices: [
      { name: 'NAS (RAID 1)', segment: 'Main VLAN' },
      { name: 'Laptop', segment: 'Main VLAN' },
      { name: 'Offsite backup', segment: '(none)' },
      { name: 'UPS', segment: '(none)' },
    ],
    problems: [
      { id: 'raid_not_backup', label: 'RAID 1 being used as the sole backup strategy', correct: true },
      { id: 'no_offsite', label: 'No offsite copy of critical data', correct: true },
      { id: 'no_ups', label: 'No UPS protecting the NAS from power loss / filesystem corruption', correct: true },
      { id: 'wrong_vlan', label: 'NAS is on the wrong VLAN', correct: false },
      { id: 'no_segmentation', label: 'Network has no VLAN segmentation', correct: false },
    ],
    fixes: [
      'Add cloud backup or an offsite drive to meet the 3-2-1 rule',
      'Add UPS to the NAS (and router/switch)',
      'Schedule quarterly backup verification — confirm restores work',
    ],
  },
  {
    id: 2,
    title: 'The Open Door',
    severity: 'HIGH',
    description: 'A home user set up a guest WiFi network. The guest VLAN was misconfigured — guests can reach the Main VLAN. A visitor\'s malware-infected laptop has been on this network.',
    devices: [
      { name: 'Guest Devices', segment: 'Guest VLAN' },
      { name: 'Personal Laptop', segment: 'Main VLAN' },
      { name: 'NAS', segment: 'Main VLAN' },
      { name: 'Firewall: Guest → Main', segment: 'ALLOW (wrong)' },
    ],
    problems: [
      { id: 'guest_to_main', label: 'Guest VLAN firewall rule set to ALLOW for Main network access', correct: true },
      { id: 'no_guest_vlan', label: 'No guest VLAN exists at all', correct: false },
      { id: 'iot_exposed', label: 'IoT devices have no VLAN', correct: false },
      { id: 'nas_on_guest', label: 'NAS is on the guest VLAN', correct: false },
      { id: 'no_internet', label: 'Guests have no internet access', correct: false },
    ],
    fixes: [
      'Change Guest → Main firewall rule to DENY',
      'Verify Guest → IoT is also DENY',
      'Test by connecting a guest device and attempting to ping a Main VLAN device',
    ],
  },
  {
    id: 3,
    title: 'The Coverage Illusion',
    severity: 'MEDIUM',
    description: 'A 3,000 sq ft two-story home with one router in the living room. Dead zones on the 2nd floor. The homeowner added a wireless WiFi extender upstairs. The whole network is now slow.',
    devices: [
      { name: 'Router/AP (living room)', segment: 'Main' },
      { name: 'WiFi Extender (wireless)', segment: 'Main' },
      { name: '2nd floor devices', segment: 'Main' },
    ],
    problems: [
      { id: 'single_router', label: 'Single router insufficient for 3,000 sq ft multi-story home', correct: true },
      { id: 'wireless_extender', label: 'Wireless repeater halves throughput — creates a slow zone, not a fast one', correct: true },
      { id: 'no_vlan', label: 'No VLAN segmentation', correct: false },
      { id: 'wrong_band', label: 'Using the wrong WiFi band', correct: false },
      { id: 'no_switch', label: 'Missing a managed switch', correct: false },
    ],
    fixes: [
      'Run ethernet to strategic locations on each floor',
      'Install dedicated access points with wired backhaul',
      'Remove wireless extender — replace with wired AP',
      'Mount APs on ceilings, centered in each coverage zone',
    ],
  },
  {
    id: 4,
    title: 'The Unpatched Router',
    severity: 'CRITICAL',
    description: 'A user\'s network has a consumer router with firmware 2 years out of date — a known CVE exists for this model. No UPS. IP cameras are on the Main VLAN instead of IoT.',
    devices: [
      { name: 'Consumer Router', segment: 'Core — unpatched' },
      { name: 'NAS', segment: 'Main VLAN' },
      { name: 'IP Cameras', segment: 'Main VLAN (wrong)' },
      { name: 'UPS', segment: '(none)' },
    ],
    problems: [
      { id: 'unpatched', label: 'Router firmware 2 years old with known public vulnerability', correct: true },
      { id: 'no_ups', label: 'No UPS on core network gear', correct: true },
      { id: 'cameras_wrong', label: 'IP cameras on Main VLAN instead of IoT VLAN', correct: true },
      { id: 'no_nas', label: 'No NAS on the network', correct: false },
      { id: 'too_many_vlans', label: 'Too many VLANs creating unnecessary complexity', correct: false },
    ],
    fixes: [
      'Update router firmware immediately — or replace if end-of-life',
      'Add UPS to router, switch, and NAS',
      'Move IP cameras to IoT VLAN with firewall rule allowing camera → NVR traffic only',
      'Enable firmware update notifications going forward',
    ],
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const VLAN_COLORS: Record<string, string> = {
  main: 'text-phosphor border-phosphor/40 bg-phosphor/5',
  iot: 'text-warning border-warning/40 bg-warning/5',
  guest: 'text-electric border-electric/40 bg-electric/5',
}
const VLAN_LABELS: Record<string, string> = { main: 'Main', iot: 'IoT', guest: 'Guest' }
const SEV_COLORS: Record<string, string> = {
  CRITICAL: 'text-crimson border-crimson/50 bg-crimson/10',
  HIGH: 'text-warning border-warning/40 bg-warning/5',
  MEDIUM: 'text-electric border-electric/30 bg-electric/5',
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function NetworkBuilderGame() {
  const [gs, setGs] = useState<GameState>(DEFAULT_STATE)
  const [mode, setMode] = useState<GameMode>('menu')

  // Tutorial state
  const [stageIdx, setStageIdx] = useState(0)
  const [tPhase, setTPhase] = useState<TutorialPhase>('learn')
  const [slideIdx, setSlideIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])

  // Architect state
  const [aPhase, setAPhase] = useState<ArchitectPhase>('build')
  const [placements, setPlacements] = useState<Record<string, string>>({})
  const [pickedDevice, setPickedDevice] = useState<string | null>(null)
  const [buildChecked, setBuildChecked] = useState(false)
  const [segments, setSegments] = useState<Record<string, VlanType>>({})
  const [segChecked, setSegChecked] = useState(false)
  const [rules, setRules] = useState<Record<string, RuleType>>({})
  const [rulesChecked, setRulesChecked] = useState(false)

  // Diagnose state
  const [dPhase, setDPhase] = useState<DiagnosePhase>('select')
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [checkedProblems, setCheckedProblems] = useState<Set<string>>(new Set())
  const [diagnoseChecked, setDiagnoseChecked] = useState(false)

  // Load / save
  useEffect(() => {
    try {
      const s = localStorage.getItem('jcp_network_game')
      if (s) setGs(JSON.parse(s))
    } catch {}
  }, [])

  const save = useCallback((next: GameState) => {
    setGs(next)
    try { localStorage.setItem('jcp_network_game', JSON.stringify(next)) } catch {}
  }, [])

  // ── TUTORIAL LOGIC ──────────────────────────────────────────────────────────

  const startStage = (idx: number) => {
    setStageIdx(idx); setTPhase('learn'); setSlideIdx(0)
    setQIdx(0); setSelected(null); setConfirmed(false); setAnswers([])
    setMode('tutorial')
  }

  const confirmAnswer = () => {
    if (selected === null) return
    setConfirmed(true)
    const correct = selected === STAGES[stageIdx].quiz[qIdx].correct
    setAnswers(prev => [...prev, correct])
  }

  const nextQuestion = () => {
    const stage = STAGES[stageIdx]
    if (qIdx + 1 < stage.quiz.length) {
      setQIdx(q => q + 1); setSelected(null); setConfirmed(false)
    } else {
      // Stage complete
      const correct = answers.filter(Boolean).length + (selected === stage.quiz[qIdx].correct ? 1 : 0)
      const score = Math.round((correct / stage.quiz.length) * 100)
      const xpEarned = correct * 10
      const newGs: GameState = {
        ...gs,
        xp: gs.xp + xpEarned,
        completedStages: gs.completedStages.includes(stageIdx) ? gs.completedStages : [...gs.completedStages, stageIdx],
        stageScores: { ...gs.stageScores, [stageIdx]: Math.max(gs.stageScores[stageIdx] ?? 0, score) },
        badges: stage.badge && !gs.badges.includes(stage.badge) && score >= 60
          ? [...gs.badges, stage.badge] : gs.badges,
        architectUnlocked: gs.architectUnlocked || [...gs.completedStages, stageIdx].length >= 7,
      }
      save(newGs)
      setTPhase('complete')
    }
  }

  // ── ARCHITECT LOGIC ─────────────────────────────────────────────────────────

  const placeBuild = (slotId: string) => {
    if (!pickedDevice) return
    // If slot already has device, return it to palette (remove mapping)
    const prev = Object.entries(placements).find(([, v]) => v === pickedDevice)
    const newP = { ...placements }
    if (prev) delete newP[prev[0]]
    newP[slotId] = pickedDevice
    setPlacements(newP); setPickedDevice(null); setBuildChecked(false)
  }

  const removeBuild = (slotId: string) => {
    const newP = { ...placements }
    delete newP[slotId]
    setPlacements(newP); setBuildChecked(false)
  }

  const buildScore = () =>
    TOPOLOGY_SLOTS.filter(s => placements[s.id] === s.answer).length

  const submitBuild = () => {
    setBuildChecked(true)
    if (buildScore() === TOPOLOGY_SLOTS.length) {
      const xp = TOPOLOGY_SLOTS.length * 10
      save({ ...gs, xp: gs.xp + xp })
    }
  }

  const segScore = () =>
    SEGMENT_DEVICES.filter(d => segments[d.id] === d.correct).length

  const submitSegment = () => {
    setSegChecked(true)
    if (Object.keys(segments).length === SEGMENT_DEVICES.length) {
      const correct = segScore()
      save({ ...gs, xp: gs.xp + correct * 5 })
    }
  }

  const ruleScore = () =>
    FIREWALL_RULES.filter(r => rules[r.id] === r.correct).length

  const submitRules = () => {
    setRulesChecked(true)
    const correct = ruleScore()
    const sec = Math.round((correct / FIREWALL_RULES.length) * 100)
    const segCorrect = segScore()
    const segPct = Math.round((segCorrect / SEGMENT_DEVICES.length) * 100)
    const score = { security: Math.round((sec + segPct) / 2), performance: 82, resilience: 68 }
    const diagnoseUnlocked = score.security >= 70
    save({
      ...gs, xp: gs.xp + correct * 10,
      architectCompleted: true, architectScore: score,
      diagnoseUnlocked: gs.diagnoseUnlocked || diagnoseUnlocked,
    })
    setAPhase('score')
  }

  // ── DIAGNOSE LOGIC ──────────────────────────────────────────────────────────

  const startScenario = (idx: number) => {
    setScenarioIdx(idx); setDPhase('briefing')
    setCheckedProblems(new Set()); setDiagnoseChecked(false)
  }

  const submitDiagnose = () => {
    setDiagnoseChecked(true)
    const scenario = DIAGNOSE_SCENARIOS[scenarioIdx]
    const correctProblems = scenario.problems.filter(p => p.correct)
    const hits = correctProblems.filter(p => checkedProblems.has(p.id)).length
    const falsePositives = [...checkedProblems].filter(id => !correctProblems.find(p => p.id === id)).length
    const score = Math.max(0, Math.round(((hits - falsePositives) / correctProblems.length) * 100))
    const xp = hits * 10
    save({
      ...gs, xp: gs.xp + xp,
      completedScenarios: gs.completedScenarios.includes(scenarioIdx)
        ? gs.completedScenarios : [...gs.completedScenarios, scenarioIdx],
      scenarioScores: { ...gs.scenarioScores, [scenarioIdx]: Math.max(gs.scenarioScores[scenarioIdx] ?? 0, score) },
    })
  }

  // ── RESET LOGIC ─────────────────────────────────────────────────────────────

  const resetStage = (idx: number) => {
    const newGs = { ...gs }
    newGs.completedStages = newGs.completedStages.filter(s => s !== idx)
    delete newGs.stageScores[idx]
    save(newGs)
  }

  const resetMode = (m: 'tutorial' | 'architect' | 'diagnose') => {
    if (m === 'tutorial') save({ ...gs, completedStages: [], stageScores: {}, architectUnlocked: false })
    if (m === 'architect') save({ ...gs, architectCompleted: false, architectScore: null, diagnoseUnlocked: false })
    if (m === 'diagnose') save({ ...gs, completedScenarios: [], scenarioScores: {} })
  }

  const resetAll = () => { save(DEFAULT_STATE) }

  // ── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-void relative">
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-phosphor/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-8">
          <Link href="/" className="hover:text-crimson transition-colors">Home</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-crimson transition-colors">Learn</Link>
          <span>/</span>
          <span className="text-crimson">Network Builder</span>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'menu' && <MenuScreen key="menu" gs={gs} onStart={setMode} onStartStage={startStage} onStartArchitect={() => { setAPhase('build'); setPlacements({}); setPickedDevice(null); setBuildChecked(false); setSegments({}); setSegChecked(false); setRules({}); setRulesChecked(false); setMode('architect') }} onStartDiagnose={() => { setDPhase('select'); setMode('diagnose') }} />}
          {mode === 'tutorial' && <TutorialScreen key="tutorial" gs={gs} stageIdx={stageIdx} tPhase={tPhase} slideIdx={slideIdx} qIdx={qIdx} selected={selected} confirmed={confirmed} answers={answers} onSlideNext={() => { if (slideIdx + 1 < STAGES[stageIdx].slides.length) setSlideIdx(i => i + 1); else setTPhase('quiz') }} onSlidePrev={() => setSlideIdx(i => i - 1)} onSelectAnswer={setSelected} onConfirm={confirmAnswer} onNextQ={nextQuestion} onBack={() => setMode('menu')} onContinue={() => setMode('menu')} />}
          {mode === 'architect' && <ArchitectScreen key="architect" gs={gs} aPhase={aPhase} placements={placements} pickedDevice={pickedDevice} buildChecked={buildChecked} segments={segments} segChecked={segChecked} rules={rules} rulesChecked={rulesChecked} onPickDevice={setPickedDevice} onPlaceSlot={placeBuild} onRemoveSlot={removeBuild} onCheckBuild={submitBuild} onNextPhase={() => { if (aPhase === 'build') setAPhase('segment'); else if (aPhase === 'segment') setAPhase('secure') }} onAssignSegment={(id, v) => { setSegments(p => ({ ...p, [id]: v })); setSegChecked(false) }} onSetRule={(id, v) => { setRules(p => ({ ...p, [id]: v })); setRulesChecked(false) }} onSubmitSeg={submitSegment} onSubmitRules={submitRules} onBack={() => setMode('menu')} />}
          {mode === 'diagnose' && <DiagnoseScreen key="diagnose" gs={gs} dPhase={dPhase} scenarioIdx={scenarioIdx} checkedProblems={checkedProblems} diagnoseChecked={diagnoseChecked} onSelectScenario={startScenario} onStartInvestigate={() => setDPhase('investigate')} onToggleProblem={id => { setCheckedProblems(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n }); setDiagnoseChecked(false) }} onSubmit={submitDiagnose} onResult={() => setDPhase('result')} onBack={() => setMode('menu')} onNextScenario={() => setDPhase('select')} />}
          {mode === 'progress' && <ProgressScreen key="progress" gs={gs} onResetStage={resetStage} onResetMode={resetMode} onResetAll={resetAll} onBack={() => setMode('menu')} />}
        </AnimatePresence>
      </div>
    </main>
  )
}

// ─── MENU SCREEN ──────────────────────────────────────────────────────────────

function MenuScreen({ gs, onStart, onStartStage, onStartArchitect, onStartDiagnose }: {
  gs: GameState
  onStart: (m: GameMode) => void
  onStartStage: (i: number) => void
  onStartArchitect: () => void
  onStartDiagnose: () => void
}) {
  const totalXpMax = STAGES.length * 50 + 170 + 250
  const pct = Math.min(100, Math.round((gs.xp / totalXpMax) * 100))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-5">
          <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse" />
          <span className="text-phosphor text-xs font-mono uppercase tracking-widest">Interactive Training</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-crimson text-glow-crimson mb-3">Network Builder</h1>
        <p className="font-mono text-sm text-text-secondary max-w-xl mx-auto">
          Go from zero to confident home network operator. Learn, build, and diagnose — step by step.
        </p>
      </div>

      {/* XP Bar */}
      <div className="terminal-card p-4 mb-8 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-mono text-xs text-text-muted">OPERATOR XP</span>
            <span className="font-mono text-xs text-crimson">{gs.xp} XP</span>
          </div>
          <div className="h-2 bg-ash rounded-full overflow-hidden">
            <div className="h-full bg-crimson transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {gs.badges.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {gs.badges.map(b => <span key={b} className="text-xl" title="Badge earned">{b}</span>)}
          </div>
        )}
        <button onClick={() => onStart('progress')} className="text-xs font-mono text-text-muted hover:text-electric transition-colors whitespace-nowrap">
          Progress →
        </button>
      </div>

      {/* Mode 1: Tutorial */}
      <div className="terminal-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-6 h-6 bg-phosphor/20 border border-phosphor/40 flex items-center justify-center font-display text-xs text-phosphor">1</span>
          <div>
            <h2 className="font-display text-lg text-phosphor">Guided Tutorial</h2>
            <p className="font-mono text-xs text-text-muted">7 stages · Learn → Quiz → Earn XP</p>
          </div>
          <span className="ml-auto font-mono text-xs text-text-muted">{gs.completedStages.length}/7 complete</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {STAGES.map((stage, i) => {
            const done = gs.completedStages.includes(i)
            const score = gs.stageScores[i]
            return (
              <button key={i} onClick={() => onStartStage(i)}
                className={`text-left p-3 border transition-all duration-200 group ${done ? 'border-phosphor/30 bg-phosphor/5 hover:border-phosphor' : 'border-ash hover:border-crimson'}`}>
                <div className="flex items-center gap-2">
                  <span>{stage.icon}</span>
                  <span className={`font-mono text-xs flex-1 ${done ? 'text-phosphor' : 'text-text-secondary group-hover:text-text-primary'}`}>{stage.title}</span>
                  {done && score !== undefined && <span className="font-mono text-xs text-phosphor">{score}%</span>}
                  {!done && <span className="font-mono text-xs text-text-muted">{i + 1 <= gs.completedStages.length + 1 ? '→' : '🔒'}</span>}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mode 2: Architect */}
      <div className={`terminal-card p-6 mb-6 ${!gs.architectUnlocked ? 'opacity-60' : ''}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-6 bg-electric/20 border border-electric/40 flex items-center justify-center font-display text-xs text-electric">2</span>
          <div>
            <h2 className={`font-display text-lg ${gs.architectUnlocked ? 'text-electric' : 'text-text-muted'}`}>Architect Mode</h2>
            <p className="font-mono text-xs text-text-muted">Build topology · Segment VLANs · Configure firewall rules</p>
          </div>
          {!gs.architectUnlocked && <span className="ml-auto font-mono text-xs text-text-muted">🔒 Complete all 7 tutorial stages</span>}
          {gs.architectUnlocked && gs.architectScore && (
            <div className="ml-auto flex gap-3">
              <span className="font-mono text-xs text-phosphor">Sec {gs.architectScore.security}</span>
              <span className="font-mono text-xs text-electric">Perf {gs.architectScore.performance}</span>
              <span className="font-mono text-xs text-warning">Res {gs.architectScore.resilience}</span>
            </div>
          )}
        </div>
        {gs.architectUnlocked && (
          <button onClick={onStartArchitect} className="w-full py-2.5 border border-electric text-electric font-mono text-sm hover:bg-electric/10 transition-all">
            {gs.architectCompleted ? 'Replay Architect Mode' : 'Start Architect Mode →'}
          </button>
        )}
      </div>

      {/* Mode 3: Diagnose */}
      <div className={`terminal-card p-6 ${!gs.diagnoseUnlocked ? 'opacity-60' : ''}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-6 bg-warning/20 border border-warning/40 flex items-center justify-center font-display text-xs text-warning">3</span>
          <div>
            <h2 className={`font-display text-lg ${gs.diagnoseUnlocked ? 'text-warning' : 'text-text-muted'}`}>Incident Response</h2>
            <p className="font-mono text-xs text-text-muted">5 real-world scenarios · Find and fix network problems</p>
          </div>
          {!gs.diagnoseUnlocked && <span className="ml-auto font-mono text-xs text-text-muted">🔒 Achieve 70+ Security score in Architect Mode</span>}
          {gs.diagnoseUnlocked && <span className="ml-auto font-mono text-xs text-text-muted">{gs.completedScenarios.length}/5 solved</span>}
        </div>
        {gs.diagnoseUnlocked && (
          <button onClick={onStartDiagnose} className="w-full py-2.5 border border-warning text-warning font-mono text-sm hover:bg-warning/10 transition-all">
            Open Incident Console →
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ─── TUTORIAL SCREEN ──────────────────────────────────────────────────────────

function TutorialScreen({ gs, stageIdx, tPhase, slideIdx, qIdx, selected, confirmed, answers, onSlideNext, onSlidePrev, onSelectAnswer, onConfirm, onNextQ, onBack, onContinue }: {
  gs: GameState; stageIdx: number; tPhase: TutorialPhase; slideIdx: number
  qIdx: number; selected: number | null; confirmed: boolean; answers: boolean[]
  onSlideNext: () => void; onSlidePrev: () => void; onSelectAnswer: (i: number) => void
  onConfirm: () => void; onNextQ: () => void; onBack: () => void; onContinue: () => void
}) {
  const stage = STAGES[stageIdx]

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      {/* Stage header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="font-mono text-xs text-text-muted hover:text-crimson transition-colors">← Back</button>
        <div className="flex-1 h-px bg-ash" />
        <span className="font-mono text-xs text-text-muted">Stage {stageIdx + 1}/7</span>
        <div className="flex gap-1">
          {STAGES.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i < stageIdx ? 'bg-phosphor' : i === stageIdx ? 'bg-crimson' : 'bg-ash'}`} />
          ))}
        </div>
      </div>

      <div className="terminal-card p-6 mb-4">
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-ash">
          <span className="text-3xl">{stage.icon}</span>
          <div>
            <h2 className="font-display text-xl text-crimson mb-0.5">{stage.title}</h2>
            <p className="font-mono text-xs text-text-muted">{stage.subtitle}</p>
          </div>
          <div className="ml-auto text-right">
            <span className="font-mono text-xs text-text-muted">{tPhase === 'learn' ? `Slide ${slideIdx + 1}/${stage.slides.length}` : tPhase === 'quiz' ? `Q${qIdx + 1}/${stage.quiz.length}` : 'Complete'}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tPhase === 'learn' && (
            <motion.div key={`slide-${slideIdx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className="font-display text-base text-text-primary mb-4">{stage.slides[slideIdx].title}</h3>
              <ul className="space-y-3 mb-5">
                {stage.slides[slideIdx].points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-crimson font-mono text-xs mt-1 shrink-0">→</span>
                    <span className="font-mono text-sm text-text-secondary leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              {stage.slides[slideIdx].callout && (
                <div className="border-l-2 border-electric pl-4 py-2 bg-electric/5">
                  <span className="font-mono text-xs text-electric">{stage.slides[slideIdx].callout}</span>
                </div>
              )}
            </motion.div>
          )}

          {tPhase === 'quiz' && !confirmed && (
            <motion.div key={`q-${qIdx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                <span className="font-mono text-xs text-warning uppercase tracking-wider">Quiz</span>
                <span className="font-mono text-xs text-text-muted ml-auto">{answers.filter(Boolean).length} correct so far</span>
              </div>
              <p className="font-mono text-sm text-text-primary mb-5 leading-relaxed">{stage.quiz[qIdx].q}</p>
              <div className="space-y-2">
                {stage.quiz[qIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => onSelectAnswer(i)}
                    className={`w-full text-left p-3 border font-mono text-sm transition-all ${selected === i ? 'border-crimson bg-crimson/10 text-text-primary' : 'border-ash text-text-secondary hover:border-ash hover:text-text-primary hover:bg-slate/50'}`}>
                    <span className="text-text-muted mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {tPhase === 'quiz' && confirmed && (
            <motion.div key={`exp-${qIdx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`flex items-center gap-2 mb-4 px-4 py-2 border ${selected === stage.quiz[qIdx].correct ? 'border-phosphor/40 bg-phosphor/5' : 'border-crimson/40 bg-crimson/5'}`}>
                <span className={selected === stage.quiz[qIdx].correct ? 'text-phosphor' : 'text-crimson'}>
                  {selected === stage.quiz[qIdx].correct ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>
              <p className="font-mono text-sm text-text-secondary leading-relaxed mb-4">{stage.quiz[qIdx].explanation}</p>
              {selected !== stage.quiz[qIdx].correct && (
                <p className="font-mono text-xs text-phosphor">
                  Correct answer: <span className="text-text-primary">{String.fromCharCode(65 + stage.quiz[qIdx].correct)}. {stage.quiz[qIdx].options[stage.quiz[qIdx].correct]}</span>
                </p>
              )}
            </motion.div>
          )}

          {tPhase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="text-5xl mb-4">{stage.badge}</div>
              <h3 className="font-display text-xl text-phosphor mb-2">Stage Complete</h3>
              <p className="font-mono text-sm text-text-muted mb-2">Badge earned: <span className="text-text-primary">{stage.badgeLabel}</span></p>
              <p className="font-mono text-xs text-crimson mb-6">
                {answers.filter(Boolean).length}/{stage.quiz.length} correct · +{answers.filter(Boolean).length * 10} XP
              </p>
              {stageIdx < STAGES.length - 1 && !gs.completedStages.includes(stageIdx + 1) && (
                <p className="font-mono text-xs text-electric mb-6">Next: {STAGES[stageIdx + 1].title}</p>
              )}
              {gs.completedStages.length >= 7 - 1 && !gs.architectUnlocked && (
                <div className="border border-electric/40 bg-electric/5 p-3 mb-6">
                  <p className="font-mono text-xs text-electric">🔓 All 7 stages complete — Architect Mode unlocked!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-end">
        {tPhase === 'learn' && (
          <>
            {slideIdx > 0 && <button onClick={onSlidePrev} className="px-4 py-2 border border-ash font-mono text-sm text-text-muted hover:border-text-muted transition-all">← Previous</button>}
            <button onClick={onSlideNext} className="px-6 py-2 border border-crimson text-crimson font-mono text-sm hover:bg-crimson/10 transition-all">
              {slideIdx + 1 < stage.slides.length ? 'Next Slide →' : 'Take Quiz →'}
            </button>
          </>
        )}
        {tPhase === 'quiz' && !confirmed && (
          <button onClick={onConfirm} disabled={selected === null}
            className={`px-6 py-2 font-mono text-sm border transition-all ${selected !== null ? 'border-crimson text-crimson hover:bg-crimson/10' : 'border-ash text-text-muted cursor-not-allowed'}`}>
            Confirm Answer
          </button>
        )}
        {tPhase === 'quiz' && confirmed && (
          <button onClick={onNextQ} className="px-6 py-2 border border-crimson text-crimson font-mono text-sm hover:bg-crimson/10 transition-all">
            {qIdx + 1 < stage.quiz.length ? 'Next Question →' : 'Finish Stage →'}
          </button>
        )}
        {tPhase === 'complete' && (
          <button onClick={onContinue} className="px-6 py-2 border border-phosphor text-phosphor font-mono text-sm hover:bg-phosphor/10 transition-all">
            Back to Menu →
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ─── ARCHITECT SCREEN ─────────────────────────────────────────────────────────

function ArchitectScreen({ gs, aPhase, placements, pickedDevice, buildChecked, segments, segChecked, rules, rulesChecked, onPickDevice, onPlaceSlot, onRemoveSlot, onCheckBuild, onNextPhase, onAssignSegment, onSetRule, onSubmitSeg, onSubmitRules, onBack }: {
  gs: GameState; aPhase: ArchitectPhase; placements: Record<string, string>; pickedDevice: string | null
  buildChecked: boolean; segments: Record<string, VlanType>; segChecked: boolean
  rules: Record<string, RuleType>; rulesChecked: boolean
  onPickDevice: (id: string | null) => void; onPlaceSlot: (id: string) => void
  onRemoveSlot: (id: string) => void; onCheckBuild: () => void; onNextPhase: () => void
  onAssignSegment: (id: string, v: VlanType) => void; onSetRule: (id: string, v: RuleType) => void
  onSubmitSeg: () => void; onSubmitRules: () => void; onBack: () => void
}) {
  const phases: ArchitectPhase[] = ['build', 'segment', 'secure', 'score']
  const phaseLabels = ['Build Topology', 'Assign VLANs', 'Firewall Rules', 'Health Score']
  const phaseIdx = phases.indexOf(aPhase)
  const usedDevices = new Set(Object.values(placements))
  const allSlotsPlaced = TOPOLOGY_SLOTS.every(s => placements[s.id])
  const allSegmentsSet = SEGMENT_DEVICES.every(d => segments[d.id])
  const allRulesSet = FIREWALL_RULES.every(r => rules[r.id])
  const buildCorrect = TOPOLOGY_SLOTS.filter(s => placements[s.id] === s.answer).length
  const segCorrect = SEGMENT_DEVICES.filter(d => segments[d.id] === d.correct).length
  const ruleCorrect = FIREWALL_RULES.filter(r => rules[r.id] === r.correct).length

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      {/* Phase header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="font-mono text-xs text-text-muted hover:text-crimson transition-colors">← Menu</button>
        <div className="flex-1 flex gap-1">
          {phases.map((p, i) => (
            <div key={p} className={`flex-1 h-1 rounded-full ${i < phaseIdx ? 'bg-electric' : i === phaseIdx ? 'bg-crimson' : 'bg-ash'}`} />
          ))}
        </div>
        <span className="font-mono text-xs text-electric">{phaseLabels[phaseIdx]}</span>
      </div>

      {/* BUILD PHASE */}
      {aPhase === 'build' && (
        <div className="terminal-card p-6 mb-4">
          <h2 className="font-display text-lg text-electric mb-2">Phase 1: Build Your Topology</h2>
          <p className="font-mono text-xs text-text-muted mb-5">Select a device from the palette, then click the matching slot in the network diagram.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Topology slots */}
            <div>
              <p className="font-mono text-xs text-text-muted mb-3 uppercase tracking-wider">Network Diagram</p>
              <div className="space-y-2">
                <div className="text-center py-2 border border-ash font-mono text-xs text-text-muted">🌐 ISP / Internet</div>
                <div className="flex justify-center"><div className="w-px h-5 bg-ash" /></div>
                {TOPOLOGY_SLOTS.map((slot, i) => {
                  const placed = placements[slot.id]
                  const dev = TOPOLOGY_PALETTE.find(d => d.id === placed)
                  const isCorrect = buildChecked ? placed === slot.answer : null
                  return (
                    <div key={slot.id}>
                      <button onClick={() => placed ? onRemoveSlot(slot.id) : pickedDevice && onPlaceSlot(slot.id)}
                        className={`w-full p-3 border text-left transition-all ${isCorrect === true ? 'border-phosphor bg-phosphor/10' : isCorrect === false ? 'border-crimson bg-crimson/5' : placed ? 'border-electric/50 bg-electric/5' : pickedDevice ? 'border-crimson/50 hover:border-crimson animate-pulse' : 'border-ash hover:border-ash/80'}`}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-text-muted">{slot.label}</span>
                          {dev ? (
                            <span className="font-mono text-sm text-text-primary flex items-center gap-1.5">{dev.icon} {dev.name}</span>
                          ) : (
                            <span className="font-mono text-xs text-text-muted italic">{slot.role}</span>
                          )}
                          {isCorrect === true && <span className="ml-auto text-phosphor text-xs">✓</span>}
                          {isCorrect === false && <span className="ml-auto text-crimson text-xs">✗ → {slot.answerLabel}</span>}
                          {placed && !buildChecked && <span className="ml-auto font-mono text-xs text-text-muted">click to remove</span>}
                        </div>
                        {!placed && <p className="font-mono text-xs text-text-muted mt-1">Hint: {slot.hint}</p>}
                      </button>
                      {i < TOPOLOGY_SLOTS.length - 1 && <div className="flex justify-center"><div className="w-px h-3 bg-ash" /></div>}
                    </div>
                  )
                })}
                <div className="flex justify-center"><div className="w-px h-5 bg-ash" /></div>
                <div className="text-center py-2 border border-ash font-mono text-xs text-text-muted">📱 💻 📺 End Devices</div>
              </div>
            </div>
            {/* Device palette */}
            <div>
              <p className="font-mono text-xs text-text-muted mb-3 uppercase tracking-wider">Device Palette</p>
              <div className="space-y-2">
                {TOPOLOGY_PALETTE.map(dev => {
                  const isUsed = usedDevices.has(dev.id)
                  const isPicked = pickedDevice === dev.id
                  return (
                    <button key={dev.id} onClick={() => onPickDevice(isPicked ? null : dev.id)} disabled={isUsed}
                      className={`w-full p-2.5 border text-left transition-all ${isUsed ? 'border-ash opacity-30 cursor-not-allowed' : isPicked ? 'border-crimson bg-crimson/10' : 'border-ash hover:border-electric/50'}`}>
                      <span className="font-mono text-sm text-text-primary">{dev.icon} {dev.name}</span>
                      <span className="block font-mono text-xs text-text-muted mt-0.5">{dev.desc}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          {buildChecked && (
            <div className={`mt-4 p-3 border font-mono text-sm ${buildCorrect === TOPOLOGY_SLOTS.length ? 'border-phosphor/40 bg-phosphor/5 text-phosphor' : 'border-warning/40 bg-warning/5 text-warning'}`}>
              {buildCorrect}/{TOPOLOGY_SLOTS.length} correct · {buildCorrect * 10} XP earned
              {buildCorrect < TOPOLOGY_SLOTS.length && ` — Review the incorrect slots above.`}
            </div>
          )}
          <div className="flex gap-3 mt-5 justify-end">
            {!buildChecked && <button onClick={onCheckBuild} disabled={!allSlotsPlaced} className={`px-5 py-2 border font-mono text-sm transition-all ${allSlotsPlaced ? 'border-crimson text-crimson hover:bg-crimson/10' : 'border-ash text-text-muted cursor-not-allowed'}`}>Check Build</button>}
            {buildChecked && <button onClick={onNextPhase} className="px-5 py-2 border border-electric text-electric font-mono text-sm hover:bg-electric/10 transition-all">Next: Assign VLANs →</button>}
          </div>
        </div>
      )}

      {/* SEGMENT PHASE */}
      {aPhase === 'segment' && (
        <div className="terminal-card p-6 mb-4">
          <h2 className="font-display text-lg text-electric mb-2">Phase 2: Assign VLANs</h2>
          <p className="font-mono text-xs text-text-muted mb-2">Assign each device to the correct network segment.</p>
          <div className="flex gap-4 mb-5 text-xs font-mono">
            {(['main', 'iot', 'guest'] as const).map(v => (
              <span key={v} className={`px-2 py-1 border rounded-sm ${VLAN_COLORS[v]}`}>{VLAN_LABELS[v]}</span>
            ))}
          </div>
          <div className="space-y-2">
            {SEGMENT_DEVICES.map(dev => {
              const assigned = segments[dev.id]
              const isCorrect = segChecked ? assigned === dev.correct : null
              return (
                <div key={dev.id} className={`p-3 border transition-all ${isCorrect === true ? 'border-phosphor/40 bg-phosphor/5' : isCorrect === false ? 'border-crimson/40 bg-crimson/5' : 'border-ash'}`}>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-sm text-text-primary">{dev.icon} {dev.name}</span>
                    <div className="ml-auto flex gap-2">
                      {(['main', 'iot', 'guest'] as const).map(v => (
                        <button key={v} onClick={() => onAssignSegment(dev.id, v)}
                          className={`px-2.5 py-1 border font-mono text-xs transition-all ${assigned === v ? VLAN_COLORS[v] : 'border-ash text-text-muted hover:border-ash/60'}`}>
                          {VLAN_LABELS[v]}
                        </button>
                      ))}
                    </div>
                    {isCorrect === true && <span className="text-phosphor text-xs">✓</span>}
                    {isCorrect === false && <span className="text-crimson text-xs">→ {VLAN_LABELS[dev.correct]}</span>}
                  </div>
                  {!segChecked && assigned === null && <p className="font-mono text-xs text-text-muted mt-1">{dev.hint}</p>}
                </div>
              )
            })}
          </div>
          {segChecked && (
            <div className={`mt-4 p-3 border font-mono text-sm ${segCorrect === SEGMENT_DEVICES.length ? 'border-phosphor/40 bg-phosphor/5 text-phosphor' : 'border-warning/40 bg-warning/5 text-warning'}`}>
              {segCorrect}/{SEGMENT_DEVICES.length} correct · +{segCorrect * 5} XP
            </div>
          )}
          <div className="flex gap-3 mt-5 justify-end">
            {!segChecked && <button onClick={onSubmitSeg} disabled={!allSegmentsSet} className={`px-5 py-2 border font-mono text-sm transition-all ${allSegmentsSet ? 'border-crimson text-crimson hover:bg-crimson/10' : 'border-ash text-text-muted cursor-not-allowed'}`}>Check Segmentation</button>}
            {segChecked && <button onClick={onNextPhase} className="px-5 py-2 border border-electric text-electric font-mono text-sm hover:bg-electric/10 transition-all">Next: Firewall Rules →</button>}
          </div>
        </div>
      )}

      {/* SECURE PHASE */}
      {aPhase === 'secure' && (
        <div className="terminal-card p-6 mb-4">
          <h2 className="font-display text-lg text-electric mb-2">Phase 3: Configure Firewall Rules</h2>
          <p className="font-mono text-xs text-text-muted mb-5">Set the inter-VLAN firewall rules. Should each traffic path be allowed or denied?</p>
          <div className="space-y-3">
            {FIREWALL_RULES.map(rule => {
              const set = rules[rule.id]
              const isCorrect = rulesChecked ? set === rule.correct : null
              return (
                <div key={rule.id} className={`p-3 border transition-all ${isCorrect === true ? 'border-phosphor/40 bg-phosphor/5' : isCorrect === false ? 'border-crimson/40 bg-crimson/5' : 'border-ash'}`}>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-sm text-text-primary flex-1">{rule.label}</span>
                    <div className="flex gap-2">
                      <button onClick={() => onSetRule(rule.id, 'allow')}
                        className={`px-3 py-1.5 border font-mono text-xs transition-all ${set === 'allow' ? 'border-phosphor/40 bg-phosphor/10 text-phosphor' : 'border-ash text-text-muted hover:border-phosphor/30'}`}>
                        ALLOW
                      </button>
                      <button onClick={() => onSetRule(rule.id, 'deny')}
                        className={`px-3 py-1.5 border font-mono text-xs transition-all ${set === 'deny' ? 'border-crimson/40 bg-crimson/10 text-crimson' : 'border-ash text-text-muted hover:border-crimson/30'}`}>
                        DENY
                      </button>
                    </div>
                    {isCorrect === true && <span className="text-phosphor text-xs">✓</span>}
                    {isCorrect === false && <span className="text-crimson text-xs">→ {rule.correct.toUpperCase()}</span>}
                  </div>
                  {rulesChecked && <p className="font-mono text-xs text-text-muted mt-2">{rule.explanation}</p>}
                </div>
              )
            })}
          </div>
          {rulesChecked && (
            <div className={`mt-4 p-3 border font-mono text-sm ${ruleCorrect === FIREWALL_RULES.length ? 'border-phosphor/40 bg-phosphor/5 text-phosphor' : 'border-warning/40 bg-warning/5 text-warning'}`}>
              {ruleCorrect}/{FIREWALL_RULES.length} correct · +{ruleCorrect * 10} XP — check explanations above
            </div>
          )}
          <div className="flex gap-3 mt-5 justify-end">
            {!rulesChecked && <button onClick={onSubmitRules} disabled={!allRulesSet} className={`px-5 py-2 border font-mono text-sm transition-all ${allRulesSet ? 'border-crimson text-crimson hover:bg-crimson/10' : 'border-ash text-text-muted cursor-not-allowed'}`}>Submit Rules</button>}
            {rulesChecked && <button onClick={onSubmitRules} className="px-5 py-2 border border-electric text-electric font-mono text-sm hover:bg-electric/10 transition-all">View Health Score →</button>}
          </div>
        </div>
      )}

      {/* SCORE PHASE */}
      {aPhase === 'score' && gs.architectScore && (
        <div className="terminal-card p-6 mb-4">
          <h2 className="font-display text-lg text-electric mb-5">Network Health Score</h2>
          {[
            { label: 'Security', value: gs.architectScore.security, textCls: 'text-crimson', barCls: 'bg-crimson', desc: 'Based on VLAN segmentation + firewall rule correctness' },
            { label: 'Performance', value: gs.architectScore.performance, textCls: 'text-electric', barCls: 'bg-electric', desc: 'Assumes wired backhaul to APs — strong foundation' },
            { label: 'Resilience', value: gs.architectScore.resilience, textCls: 'text-warning', barCls: 'bg-warning', desc: 'Room to improve: add UPS and offsite backup to reach 100' },
          ].map(m => (
            <div key={m.label} className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-display text-sm text-text-primary">{m.label}</span>
                <span className={`font-display text-lg ${m.textCls}`}>{m.value}</span>
              </div>
              <div className="h-3 bg-ash rounded-full overflow-hidden mb-1">
                <motion.div initial={{ width: 0 }} animate={{ width: `${m.value}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full ${m.barCls} rounded-full`} />
              </div>
              <p className="font-mono text-xs text-text-muted">{m.desc}</p>
            </div>
          ))}
          {gs.diagnoseUnlocked && (
            <div className="border border-warning/40 bg-warning/5 p-3 mt-4">
              <p className="font-mono text-xs text-warning">🔓 Security score ≥ 70 — Incident Response mode unlocked!</p>
            </div>
          )}
          <button onClick={onBack} className="mt-5 w-full py-2.5 border border-phosphor text-phosphor font-mono text-sm hover:bg-phosphor/10 transition-all">
            Back to Menu →
          </button>
        </div>
      )}
    </motion.div>
  )
}

// ─── DIAGNOSE SCREEN ──────────────────────────────────────────────────────────

function DiagnoseScreen({ gs, dPhase, scenarioIdx, checkedProblems, diagnoseChecked, onSelectScenario, onStartInvestigate, onToggleProblem, onSubmit, onResult, onBack, onNextScenario }: {
  gs: GameState; dPhase: DiagnosePhase; scenarioIdx: number
  checkedProblems: Set<string>; diagnoseChecked: boolean
  onSelectScenario: (i: number) => void; onStartInvestigate: () => void
  onToggleProblem: (id: string) => void; onSubmit: () => void
  onResult: () => void; onBack: () => void; onNextScenario: () => void
}) {
  const scenario = DIAGNOSE_SCENARIOS[scenarioIdx]
  const correctProblems = scenario?.problems.filter(p => p.correct) ?? []
  const hits = correctProblems.filter(p => checkedProblems.has(p.id)).length
  const fps = [...checkedProblems].filter(id => !correctProblems.find(p => p.id === id)).length
  const score = Math.max(0, Math.round(((hits - fps) / (correctProblems.length || 1)) * 100))

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="font-mono text-xs text-text-muted hover:text-crimson transition-colors">← Menu</button>
        <div className="flex-1 h-px bg-ash" />
        <span className="font-mono text-xs text-warning">Incident Response Console</span>
      </div>

      {dPhase === 'select' && (
        <div className="terminal-card p-6">
          <h2 className="font-display text-lg text-warning mb-2">Select a Scenario</h2>
          <p className="font-mono text-xs text-text-muted mb-5">Each scenario presents a real-world network. Find the problems and identify fixes.</p>
          <div className="space-y-3">
            {DIAGNOSE_SCENARIOS.map((s, i) => {
              const done = gs.completedScenarios.includes(i)
              const sc = gs.scenarioScores[i]
              return (
                <button key={i} onClick={() => onSelectScenario(i)}
                  className={`w-full text-left p-4 border transition-all group ${done ? 'border-phosphor/30 bg-phosphor/5 hover:border-phosphor' : 'border-ash hover:border-warning/50'}`}>
                  <div className="flex items-start gap-3">
                    <span className={`px-1.5 py-0.5 border font-mono text-xs shrink-0 ${SEV_COLORS[s.severity]}`}>{s.severity}</span>
                    <div className="flex-1">
                      <p className="font-mono text-sm text-text-primary group-hover:text-warning transition-colors">{s.title}</p>
                      <p className="font-mono text-xs text-text-muted mt-0.5 line-clamp-2">{s.description.slice(0, 100)}…</p>
                    </div>
                    {done && sc !== undefined && <span className="font-mono text-xs text-phosphor shrink-0">{sc}%</span>}
                    {!done && <span className="font-mono text-xs text-text-muted shrink-0">→</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {dPhase === 'briefing' && (
        <div className="terminal-card p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-ash">
            <span className={`px-2 py-1 border font-mono text-xs ${SEV_COLORS[scenario.severity]}`}>{scenario.severity}</span>
            <h2 className="font-display text-lg text-warning">{scenario.title}</h2>
          </div>
          <p className="font-mono text-sm text-text-secondary leading-relaxed mb-5">{scenario.description}</p>
          <div className="bg-terminal/50 border border-ash p-4 mb-5">
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">Current Network State</p>
            <div className="space-y-1.5">
              {scenario.devices.map((d, i) => (
                <div key={i} className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-text-muted">→</span>
                  <span className="text-text-secondary">{d.name}</span>
                  <span className="ml-auto text-text-muted">[{d.segment}]</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onStartInvestigate} className="w-full py-2.5 border border-warning text-warning font-mono text-sm hover:bg-warning/10 transition-all">
            Begin Investigation →
          </button>
        </div>
      )}

      {dPhase === 'investigate' && (
        <div className="terminal-card p-6">
          <h2 className="font-display text-lg text-warning mb-2">{scenario.title}</h2>
          <p className="font-mono text-xs text-text-muted mb-5">Check all items that represent real problems with this network. Avoid false positives — they cost points.</p>
          <div className="space-y-2 mb-5">
            {scenario.problems.map(p => {
              const checked = checkedProblems.has(p.id)
              const result = diagnoseChecked ? (p.correct ? (checked ? 'correct' : 'missed') : (checked ? 'fp' : 'ok')) : null
              return (
                <button key={p.id} onClick={() => onToggleProblem(p.id)} disabled={diagnoseChecked}
                  className={`w-full text-left p-3 border font-mono text-sm transition-all flex items-start gap-3
                    ${result === 'correct' ? 'border-phosphor/40 bg-phosphor/5' : result === 'missed' ? 'border-warning/40 bg-warning/5' : result === 'fp' ? 'border-crimson/40 bg-crimson/5' : checked ? 'border-crimson/50 bg-crimson/5' : 'border-ash hover:border-ash/60'}`}>
                  <span className={`w-4 h-4 border shrink-0 mt-0.5 flex items-center justify-center text-xs ${checked ? 'border-crimson bg-crimson/20 text-crimson' : 'border-ash'}`}>
                    {checked ? '✓' : ''}
                  </span>
                  <span className={`text-sm leading-relaxed ${checked ? 'text-text-primary' : 'text-text-secondary'}`}>{p.label}</span>
                  {result === 'correct' && <span className="ml-auto text-phosphor text-xs shrink-0">✓ correct</span>}
                  {result === 'missed' && <span className="ml-auto text-warning text-xs shrink-0">missed</span>}
                  {result === 'fp' && <span className="ml-auto text-crimson text-xs shrink-0">false positive</span>}
                </button>
              )
            })}
          </div>
          {diagnoseChecked && (
            <div className={`p-3 border mb-4 font-mono text-sm ${score >= 70 ? 'border-phosphor/40 bg-phosphor/5 text-phosphor' : 'border-warning/40 bg-warning/5 text-warning'}`}>
              Score: {score}% · {hits}/{correctProblems.length} problems found · {fps} false positive{fps !== 1 ? 's' : ''} · +{hits * 10} XP
            </div>
          )}
          <div className="flex gap-3 justify-end">
            {!diagnoseChecked && (
              <button onClick={onSubmit} disabled={checkedProblems.size === 0}
                className={`px-5 py-2 border font-mono text-sm transition-all ${checkedProblems.size > 0 ? 'border-warning text-warning hover:bg-warning/10' : 'border-ash text-text-muted cursor-not-allowed'}`}>
                Submit Analysis
              </button>
            )}
            {diagnoseChecked && <button onClick={onResult} className="px-5 py-2 border border-phosphor text-phosphor font-mono text-sm hover:bg-phosphor/10 transition-all">View Fixes →</button>}
          </div>
        </div>
      )}

      {dPhase === 'result' && (
        <div className="terminal-card p-6">
          <h2 className="font-display text-lg text-phosphor mb-4">Recommended Fixes — {scenario.title}</h2>
          <div className="space-y-2 mb-6">
            {scenario.fixes.map((fix, i) => (
              <div key={i} className="flex gap-3 p-3 border border-phosphor/20 bg-phosphor/5">
                <span className="text-phosphor font-mono text-xs mt-0.5 shrink-0">{i + 1}.</span>
                <span className="font-mono text-sm text-text-secondary leading-relaxed">{fix}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={onNextScenario} className="flex-1 py-2.5 border border-warning text-warning font-mono text-sm hover:bg-warning/10 transition-all">
              Next Scenario →
            </button>
            <button onClick={onBack} className="px-5 py-2.5 border border-ash text-text-muted font-mono text-sm hover:border-text-muted transition-all">
              Menu
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ─── PROGRESS SCREEN ──────────────────────────────────────────────────────────

function ProgressScreen({ gs, onResetStage, onResetMode, onResetAll, onBack }: {
  gs: GameState
  onResetStage: (i: number) => void
  onResetMode: (m: 'tutorial' | 'architect' | 'diagnose') => void
  onResetAll: () => void
  onBack: () => void
}) {
  const [confirm, setConfirm] = useState<string | null>(null)

  const handleReset = (key: string, fn: () => void) => {
    if (confirm === key) { fn(); setConfirm(null) } else setConfirm(key)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="font-mono text-xs text-text-muted hover:text-crimson transition-colors">← Menu</button>
        <div className="flex-1 h-px bg-ash" />
        <span className="font-mono text-xs text-text-muted">Progress & Reset</span>
      </div>

      {/* Summary */}
      <div className="terminal-card p-6 mb-5">
        <h2 className="font-display text-lg text-crimson mb-4">Your Progress</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="font-display text-2xl text-crimson">{gs.xp}</div>
            <div className="font-mono text-xs text-text-muted">Total XP</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl text-phosphor">{gs.completedStages.length}/7</div>
            <div className="font-mono text-xs text-text-muted">Stages Done</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl text-warning">{gs.badges.length}</div>
            <div className="font-mono text-xs text-text-muted">Badges</div>
          </div>
        </div>
        {gs.badges.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-3 border-t border-ash">
            {gs.badges.map(b => <span key={b} className="text-2xl">{b}</span>)}
          </div>
        )}
      </div>

      {/* Stage-level reset */}
      <div className="terminal-card p-6 mb-5">
        <h3 className="font-display text-sm text-text-muted uppercase tracking-wider mb-4">Reset Individual Stage</h3>
        <div className="space-y-2">
          {STAGES.map((stage, i) => {
            const done = gs.completedStages.includes(i)
            const score = gs.stageScores[i]
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-muted w-4">{i + 1}</span>
                <span className="font-mono text-sm text-text-secondary flex-1">{stage.icon} {stage.title}</span>
                {done && score !== undefined && <span className="font-mono text-xs text-phosphor">{score}%</span>}
                {done && (
                  <button onClick={() => handleReset(`stage-${i}`, () => onResetStage(i))}
                    className={`font-mono text-xs px-2 py-1 border transition-all ${confirm === `stage-${i}` ? 'border-crimson text-crimson' : 'border-ash text-text-muted hover:border-crimson/50'}`}>
                    {confirm === `stage-${i}` ? 'Confirm?' : 'Reset'}
                  </button>
                )}
                {!done && <span className="font-mono text-xs text-text-muted">—</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mode-level reset */}
      <div className="terminal-card p-6 mb-5">
        <h3 className="font-display text-sm text-text-muted uppercase tracking-wider mb-4">Reset Entire Mode</h3>
        <div className="space-y-2">
          {[
            { key: 'tutorial', label: 'Reset Tutorial (all 7 stages)', fn: () => onResetMode('tutorial') },
            { key: 'architect', label: 'Reset Architect Mode', fn: () => onResetMode('architect') },
            { key: 'diagnose', label: 'Reset Incident Response', fn: () => onResetMode('diagnose') },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="font-mono text-sm text-text-secondary">{item.label}</span>
              <button onClick={() => handleReset(item.key, item.fn)}
                className={`font-mono text-xs px-3 py-1.5 border transition-all ${confirm === item.key ? 'border-crimson text-crimson bg-crimson/10' : 'border-ash text-text-muted hover:border-crimson/50'}`}>
                {confirm === item.key ? 'Confirm Reset?' : 'Reset Mode'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Full reset */}
      <div className="terminal-card p-4 border-crimson/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-sm text-text-primary">Full Reset</p>
            <p className="font-mono text-xs text-text-muted">Erase all progress, XP, badges, and unlocks</p>
          </div>
          <button onClick={() => handleReset('all', onResetAll)}
            className={`font-mono text-xs px-4 py-2 border transition-all ${confirm === 'all' ? 'border-crimson bg-crimson/20 text-crimson' : 'border-crimson/30 text-crimson/60 hover:border-crimson'}`}>
            {confirm === 'all' ? '⚠ Confirm Full Reset?' : 'Full Reset'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
