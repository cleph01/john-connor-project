---
title: "Stop Paying for Cloud Storage You Don't Need"
author: "John Connor Project"
date: "2026-02-12"
tags: ["nas", "storage", "synology", "self-hosting", "infrastructure", "cloud"]
excerpt: "iCloud, Google Drive, and Dropbox have a business model that depends on you never doing the math. Here's the math — and what you get when you own your own storage instead."
---

## Do the Math

A 2TB iCloud plan costs $9.99/month. Over five years, that's $599.

A Synology DS224+ NAS — a solid entry-level two-bay unit — costs around $300. Add two 4TB hard drives at roughly $60 each: $420 total upfront.

After five years, the iCloud plan has cost you $599 and you still own nothing. The NAS has cost you $420 and you have 8TB of redundant storage, on hardware you own, with no recurring fees, that will likely run for another 5-10 years.

The financial case isn't close. But the financial case isn't even the main point.

## What You're Actually Giving Up With Cloud Storage

When your photos live on iCloud or Google Photos, a few things are true:

**The provider can access your files.** Both Apple and Google scan content for policy violations. Google uses your photos and data to train AI models. You agreed to this in a terms of service document you didn't read.

**The provider controls your access.** If your account gets flagged, locked, or compromised, you can lose access to your files. This has happened to enough people that there are subreddits dedicated to it.

**The provider can change the deal.** Google Photos used to offer unlimited storage. Then it didn't. Terms of service can change at any time — and they don't need your permission.

**Your files are in one place.** Cloud storage isn't a backup. If you delete something, it's gone. If the provider deletes it, it's gone. A proper backup strategy requires copies in multiple locations.

None of this means cloud storage is malicious. It means it's a service with terms that favor the provider, not you.

## What a NAS Actually Is

A NAS (Network Attached Storage) is a small computer designed to hold hard drives and serve files over your local network. The software makes it look and work almost exactly like cloud storage — automatic phone backup, file sync across devices, access from anywhere — except the hardware is in your home.

The key differences:

- **You own the hardware.** No subscription, no account, no terms of service.
- **Files are on your network.** Sync is fast because it's local. Access is private because it's yours.
- **Remote access is optional.** You can access your NAS from anywhere via a secure VPN — but you're not required to expose it to the internet.
- **You control the backup.** You can mirror to a second drive, back up to an external drive, or replicate to an offsite location. You define the strategy.

## What Getting Started Actually Looks Like

### The Easy Path: Synology

Synology makes the most user-friendly NAS hardware available. Their operating system (DSM) is polished and well-documented. Setup takes about 30 minutes.

The basic process:
1. Buy a Synology NAS (DS224+ is the current value pick for most households)
2. Buy two hard drives — matching size, 4TB or larger, NAS-rated (WD Red or Seagate IronWolf)
3. Install the drives, power on, follow the setup wizard
4. Install the Synology Photos app on your phone — it replaces Google Photos/iCloud Photos
5. Install Synology Drive on your computers — it replaces Dropbox/Google Drive
6. Done

The phone app does automatic backup. Every photo you take goes to your NAS over WiFi before it goes anywhere else. Your Google Photos and iCloud accounts can be your secondary backup, not your primary.

### The Flexible Path: TrueNAS + Your Own Hardware

If you have an old PC or want more control, TrueNAS is a free, enterprise-grade NAS operating system you can install on any compatible hardware. More powerful than Synology's DSM, significantly more complex to configure. Worth it if you want to run other services (home automation, media server, etc.) on the same hardware.

### Remote Access (Done Right)

Don't expose your NAS directly to the internet. Instead, use a VPN:

- **Tailscale** is the easiest option — install it on your NAS and your devices, and they form a private network regardless of where you are. Free for personal use.
- **WireGuard** is built into most modern routers and NAS devices — more setup, zero ongoing cost.

Both options give you access to your files from anywhere without putting your NAS on the public internet.

## Migrating Off Cloud Storage

The process of getting your data off iCloud or Google Photos is straightforward but takes time:

**Google Takeout** — Go to takeout.google.com, select Google Photos, and export everything. You'll get a series of zip files with your photos and videos.

**iCloud Photos** — On Mac: open the Photos app, select all, export. Or use iCloud.com on any browser to download in batches.

Once you have the files, Synology Photos can import them maintaining the original timestamps. Your library stays intact; it just lives on your hardware now.

## What You Can Do With the Hardware

Once your NAS is running, it can do more than replace cloud storage:

- **Media server** — Plex or Jellyfin turns your NAS into your own Netflix, streaming your movies and TV to any device
- **Time Machine target** — Mac users can back up directly to the NAS over the network
- **Password manager** — Run Vaultwarden (self-hosted Bitwarden) for private password sync
- **Home Assistant** — Run your smart home hub on the NAS instead of a separate device
- **Network backup** — Other computers on your network can back up to it automatically

You're not just replacing cloud storage. You're building a home server that you control.

## When to Get Help

If you're comfortable with basic networking and following documentation, a Synology setup is genuinely DIY-friendly. Synology's official guides are thorough.

If you want to run the more advanced setup — TrueNAS on custom hardware, Nextcloud, multiple services — or if you want it done once and done right, a pro with NAS experience can get this built and configured in a few hours.

Either way, the outcome is the same: your data on your hardware, no monthly fees, and a backup strategy that actually works.

[Find a pro who specializes in NAS setup](/find-help) — or [read our full self-hosted cloud guide](/your-cloud).
