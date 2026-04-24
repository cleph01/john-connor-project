# Claude Project Memory - John Connor Project

## Project Overview
The John Connor Project connects everyday people and small businesses with skilled IT, cybersecurity, and infrastructure professionals — giving Main Street access to the same quality of technology infrastructure that corporations take for granted.

The primary mission is **infrastructure empowerment**: reliable home and small-office networks, IoT segmentation, NAS systems as alternatives to cloud subscriptions, smart home integration, structured cabling, access control, and security systems. AI-powered threats (scams, surveillance, data exploitation) are a real and present concern that professionals in the directory also address — but it is a secondary frame, not the primary one.

Think of it as: the IT equivalent of a licensed electrician or plumber — but for your digital infrastructure.

**Founder context**: The founder is a structured cabling professional and growing smart home integrator. Certifications: CompTIA A+, Network+, Security+, AZ-900, Ubiquiti UniFi Professional. In progress: Lutron, Extron, Control4, BICSI.

## Tech Stack
- **Framework**: Next.js 15 with App Router, TypeScript
- **Styling**: Tailwind CSS + custom terminal/cyberpunk design system (globals.css)
- **Animations**: Framer Motion (via `motion/react`)
- **Database**: Supabase (PostgreSQL)
- **Form notifications**: Formspree

## Key Integrations

### Supabase
- **Project URL**: https://ibcickdkznscryqrdfui.supabase.co
- **Table**: `professionals` - stores directory entries
- **Credentials**: In `.env.local` (not committed)
- **Security**: Row Level Security enabled
  - SELECT: Only verified=true AND public=true entries visible
  - INSERT: Anyone can submit (creates unverified entry)

### Formspree
- **Form ID**: mdazdvnz
- **Purpose**: Email notifications when someone submits Get Involved form

## Site Structure

### Pages
| Route | Purpose |
|-------|---------|
| `/` | Homepage with hero, "Choose Your Path" section, defense protocols |
| `/about` | Project background and vision |
| `/mission` | Detailed mission with 5 objectives |
| `/get-involved` | Registration form for professionals (submits to Supabase + Formspree) |
| `/find-help` | For people seeking professional help |
| `/learn` | Threat education (7 topics: DNS, network, NAS, passwords, encryption, data minimization, AI threats) |
| `/directory` | Public directory of verified professionals (fetches from Supabase) |
| `/resources` | Curated security tools and links |
| `/your-cloud` | NAS/self-hosted storage education |
| `/protect-the-internet` | IP over HAM radio roadmap |
| `/your-stock-vote` | Proxy voting for corporate AI/privacy accountability |

### Navigation Structure
- Home, About, Mission
- **Protocols** (dropdown): Your Cloud, Decentralized Net, Stock Vote
- Find Help, Learn, Directory
- CTA: "Join the Resistance" → /get-involved

## Design System
- **Background**: `bg-void` (#030303)
- **Primary accent**: `text-crimson` (#ff1744)
- **Secondary**: `text-phosphor` (#00ff41), `text-electric` (#00d4ff)
- **Cards**: `terminal-card` class with border glow effects
- **Fonts**: Orbitron (display), Share Tech Mono (body)

## User Journeys
1. **Professionals**: Home → "I'm a Technologist" → Get Involved → Registration
2. **Help seekers (individuals)**: Home → "I Need Help" → Find Help → Directory (or Learn for self-help)
3. **Small businesses**: Same as help seekers — future: dedicated path/messaging planned

### Professional Specialty Tags (directory filter categories)
- Home Networking & WiFi
- NAS & Personal Cloud Setup
- IoT & Smart Home Integration
- Structured Cabling & Low-Voltage
- Access Control & Security Systems
- Cybersecurity & Privacy
- AI Threat Defense
- Small Business IT
- General Tech Support & Troubleshooting

## Verification Workflow
1. Professional fills out /get-involved form
2. Entry created in Supabase (verified=false, public=false)
3. Owner gets email via Formspree
4. Owner reviews in Supabase dashboard
5. Owner sets verified=true, public=true
6. Professional appears in /directory

## Key Decisions Made
- **Supabase over self-hosted Postgres**: Faster to launch, managed service, good free tier
- **Formspree for notifications**: Simple, no backend needed for email alerts
- **No ratings system yet**: Too complex for v1, would need review submission + moderation
- **"Join the Resistance" as brand CTA**: Used on homepage hero and nav. On /get-involved specifically, the form button says "Deploy Your Skills" — more specific to the pro action
- **Homepage stats**: Remove dummy stats (10K, 50 states). Either show real numbers (honest, founding-member framing) or remove until meaningful numbers exist
- **Pro-bono checkbox on pro profiles**: Pros can indicate willingness to do pro-bono work and under what circumstances (e.g., seniors, veterans, low-income). This is a key differentiator

## Tagline & Messaging Decisions
- **Primary tagline**: "Professional-Grade Infrastructure for Everyone." — states the mission clearly for both audiences
- **Secondary/section tagline**: "Take Back Your Network." — action-oriented, fits resistance brand
- **Homepage hero CTA (pros)**: "Join the Resistance" — rallying cry, brand identity
- **Get Involved page CTA**: "Deploy Your Skills" — specific to the pro action
- **Help seeker CTA**: "Find Help Near You" — keep as-is, it's clear

## Files to Know
- `lib/supabase.ts` - Supabase client and Professional type
- `app/globals.css` - Complete design system (550+ lines)
- `app/components/Nav.tsx` - Navigation with Protocols dropdown
- `.env.local` - Contains Supabase keys (not in git)

## What's Working
- All pages styled with terminal theme
- Get Involved form submits to Supabase + Formspree
- Directory fetches from Supabase with location search
- Learn page with 7 comprehensive security topics

## What's Pending/Future
- Add more professionals to directory (currently empty until signups)
- Proxy voting analysis tools (marked as "Coming Soon")
- Video library (marked as "Coming Soon")
- Potentially add ratings/reviews later

## Manual Verification Process
Until an admin panel is built, verify professionals manually:
1. Log into Supabase dashboard: https://supabase.com/dashboard
2. Go to Table Editor → `professionals` table
3. Find the new entry (verified=false, public=false)
4. Review their info (name, email, location, expertise)
5. Optionally reach out to verify identity/credentials
6. Update: set `verified=true` and `public=true`
7. They now appear in /directory

## Growth Roadmap

### Phase 1: Foundation (Now)
- [x] Core site with dual user journeys
- [x] Professional registration → Supabase
- [x] Public directory with search
- [x] Educational content (Learn page)
- [ ] SEO basics (meta tags, sitemap)
- [ ] Analytics integration

### Phase 2: Trust & Credibility (1-2 months)
- [ ] First 5-10 verified professionals
- [ ] Testimonials/case studies
- [ ] Professional badges/specialties
- [ ] Contact mechanism for directory

### Phase 3: Growth & Awareness (2-4 months)
- [ ] Content marketing (blog, social)
- [ ] Local community outreach
- [ ] Newsletter signup
- [ ] Social proof metrics

### Phase 4: Sustainability (4-6 months)
- [ ] Payment integration (optional)
- [ ] Donation option
- [ ] Partnerships

## Monetization Strategy (Phased)

### Now — Month 6: Build trust, no charges
- Free listings for all pros
- Affiliate links on /resources page (1Password, Synology/QNAP, Ubiquiti, ProtonMail, Backblaze, NordVPN)
- No platform fees

### Month 6–12: Pro tier
- **Free tier**: Basic listing, searchable
- **Pro tier ($20-35/month)**: Featured placement, pro-bono badge, specialty tags highlighted, contact button, response time shown
- Pitch: "You're already listed. Upgrade to get found first."

### Month 12+: Education + Marketplace
- Short course/guide bundle for help-seekers: "Take Back Your Network" — practical home networking, NAS, IoT segmentation (~$29-49 on Gumroad)
- Lightweight job/project board: pros post availability, help-seekers post needs, platform fee (~10-15%) only on completed paid engagements
- YouTube channel drives organic traffic to both

## Content & Publicity Strategy

### Target Audiences
1. **Technologists**: LinkedIn, X/Twitter, Reddit (r/cybersecurity, r/privacy)
2. **Help seekers**: Local community, YouTube, Facebook (older demographics)

### Priority Channels (Start Narrow)
1. **LinkedIn** → Recruit technologists, establish credibility
2. **Blog on site** → SEO foundation, content to share
3. **YouTube OR X** → Pick one for broader reach

### Content Pillars
- Home networking & infrastructure (primary — WiFi, LANs, NAS, IoT segmentation)
- Smart home & budget efficiency (Lutron, Control4, smart appliances)
- Digital sovereignty (own your data, self-hosted alternatives to cloud)
- AI threat awareness (scams, deepfakes, voice cloning — secondary frame)
- Professional development (certs, career paths, giving back to community)
- Success stories / case studies

### Content Flywheel
```
Blog post (1x/week)
    → LinkedIn post (summarize + link)
    → X thread (key points)
    → YouTube video (if topic warrants)
```

### YouTube Channel Positioning
Not a tech tutorial channel. "The show that helps regular people take control of their digital infrastructure." Every video watchable by a homeowner or small business owner with no IT background.

### First Content Pieces to Create
1. **"Why I Started the John Connor Project"** - Personal story, founder background, the gap you saw
2. **"Your Home Network Is a Mess — Here's How to Fix It"** - Practical, high search volume, directly on-mission
3. **"Stop Paying for Cloud Storage You Don't Need"** - NAS intro, affiliate opportunity
4. **"A Call to Infrastructure Professionals: Your Community Needs You"** - Pro recruitment
5. **"AI Voice Cloning Scams Are Targeting Your Family"** - Secondary mission, high shareability
