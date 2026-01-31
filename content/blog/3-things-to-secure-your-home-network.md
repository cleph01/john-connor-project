---
title: "3 Things You Can Do This Weekend to Secure Your Home Network"
author: "John Connor Project"
date: "2026-01-30"
tags: ["home-security", "pi-hole", "nas", "network", "iot", "how-to"]
excerpt: "Three practical projects that will immediately improve your home network security: DNS-level ad blocking, self-hosted cloud storage, and isolating your smart devices."
---

## Why Your Home Network Is a Target

Your home network isn't just connecting your laptop to Netflix anymore. It's running smart thermostats, security cameras, voice assistants, baby monitors, and dozens of other devices. Each one is a potential entry point for attackers.

The good news: three weekend projects can dramatically improve your security. None require advanced skills, and the total cost is under $300.

## Project 1: Set Up a Pi-hole DNS Sinkhole

**Time:** 2-3 hours | **Cost:** ~$50 | **Difficulty:** Beginner-friendly

### What It Does

Pi-hole is a network-wide ad blocker that runs on a Raspberry Pi. But it's much more than an ad blocker. It blocks:

- Tracking domains that follow you across the internet
- Known malware and phishing domains
- Telemetry from devices that "phone home"
- Ads before they even load (faster browsing)

Every device on your network gets protected automatically, no software to install on each device.

### Why It Matters

Most IoT devices constantly communicate with manufacturer servers. Your smart TV reports what you watch. Your thermostat reports when you're home. Your robot vacuum maps your house and sends it to the cloud.

Pi-hole lets you see exactly what's happening and block what you don't want.

### What You Need

- Raspberry Pi Zero 2 W (~$15) or any Raspberry Pi
- MicroSD card (8GB minimum, ~$10)
- Power supply (~$10)
- Ethernet adapter (optional but recommended, ~$15)

### Quick Setup

1. Flash Raspberry Pi OS Lite to your SD card using [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
2. Boot the Pi and connect via SSH
3. Run the one-line installer: `curl -sSL https://install.pi-hole.net | bash`
4. Point your router's DNS to the Pi-hole IP address
5. Done. All devices now route through Pi-hole

### What You'll See

The Pi-hole dashboard shows you every DNS query on your network. You'll be shocked how often your devices phone home. That cheap security camera? It might be making thousands of requests per day to servers in other countries.

---

## Project 2: Set Up a NAS for Self-Hosted Cloud Storage

**Time:** 3-4 hours | **Cost:** ~$150-400 | **Difficulty:** Moderate

### What It Does

A NAS (Network Attached Storage) is your own private cloud. Instead of storing photos, documents, and backups on Google Drive or iCloud, you store them on hardware you control, in your home.

### Why It Matters

When you use public cloud storage:

- The provider can scan your files (they do, for "safety")
- Your data can be sold or shared with third parties
- A breach at the provider exposes your data
- Terms of service can change at any time
- Account suspension locks you out of your own files

With a NAS, your data never leaves your home unless you choose to access it remotely.

### What You Need

**Budget Option (~$150):**
- Raspberry Pi 4 (4GB+ RAM)
- External USB hard drive
- Software: OpenMediaVault or CasaOS

**Dedicated Option (~$300-400):**
- Entry-level NAS like Synology DS224+ or QNAP TS-233
- Two hard drives (for redundancy)

### Key Features to Set Up

1. **Automatic phone backups** - Photos sync to your NAS instead of iCloud/Google
2. **File sync** - Replace Dropbox with Syncthing or Nextcloud
3. **Media streaming** - Run Plex or Jellyfin for your own Netflix
4. **Automated backups** - Your computers back up to the NAS nightly

### Remote Access (Safely)

If you want to access your NAS outside your home:

- Use a VPN like WireGuard or Tailscale (never expose the NAS directly to the internet)
- Enable two-factor authentication
- Keep firmware updated

---

## Project 3: Isolate IoT Devices with VLANs

**Time:** 2-4 hours | **Cost:** ~$50-100 (if router upgrade needed) | **Difficulty:** Intermediate

### What It Does

VLANs (Virtual LANs) create separate networks within your home network. Your computers and phones are on one network, your IoT devices on another. They can't talk to each other directly.

### Why It Matters

Smart devices are notoriously insecure:

- Manufacturers often abandon security updates
- Many use outdated, vulnerable software
- Some have known backdoors
- They're attractive targets because they're always on

If an attacker compromises your smart light bulb, VLAN isolation means they can't pivot to your laptop with your banking info.

### The IoT Callback Problem

Many IoT devices maintain constant connections to manufacturer cloud servers. These connections could theoretically be hijacked to:

- Deliver malicious firmware updates
- Send commands to the device
- Exfiltrate data from your network
- Use the device as a foothold for further attacks

VLAN isolation limits the blast radius. A compromised smart plug can't scan your network for other targets.

### What You Need

**Option 1: Router with VLAN support**
Many consumer routers don't support VLANs. You may need to:
- Flash custom firmware (DD-WRT, OpenWrt) on your existing router
- Upgrade to a router with built-in VLAN support (Ubiquiti, pfSense, OPNsense)

**Option 2: Managed switch + existing router**
- Add a managed switch (~$50) that supports VLANs
- Configure your router to route between VLANs

### Basic VLAN Setup

1. **VLAN 1 (Trusted):** Computers, phones, tablets
2. **VLAN 2 (IoT):** Smart home devices, cameras, voice assistants
3. **VLAN 3 (Guest):** Visitor devices

### Firewall Rules

After creating VLANs, set firewall rules:

- IoT VLAN can access the internet but NOT the trusted VLAN
- Trusted VLAN can access IoT devices for control (one-way initiation)
- Block IoT devices from accessing known telemetry domains (Pi-hole helps here)

Some devices genuinely need cloud access to function. Others work fine locally. Test each device and block what you can.

---

## Start This Weekend

You don't have to do all three at once. Start with the one that addresses your biggest concern:

- **Worried about tracking?** Start with Pi-hole
- **Worried about cloud providers?** Start with the NAS
- **Worried about smart devices?** Start with VLANs

Each project makes your network meaningfully more secure. Combined, they give you a level of protection that most home users never achieve.

## Need Help?

If these projects feel overwhelming, you're not alone. That's exactly why the John Connor Project exists. We connect people with local technologists who can help with exactly these kinds of projects.

- [Find a technologist near you](/directory)
- [Learn more about digital security](/learn)

Your home network is the front door to your digital life. This weekend, install some better locks.
