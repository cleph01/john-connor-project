# Claude Project Memory - John Connor Project

## Project Overview
The John Connor Project is a Next.js website dedicated to empowering IT/cybersecurity professionals to defend communities from AI-driven threats. Think of it as connecting "digital plumbers/electricians" with people who need help.

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
2. **Help seekers**: Home → "I Need Help" → Find Help → Directory (or Learn for self-help)

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
- **Single "Join the Resistance" CTA**: Consistent messaging across all pages
- **Stats shown as "Goals"**: Honest about current state vs aspirational numbers

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

## Content & Publicity Strategy

### Target Audiences
1. **Technologists**: LinkedIn, X/Twitter, Reddit (r/cybersecurity, r/privacy)
2. **Help seekers**: Local community, YouTube, Facebook (older demographics)

### Priority Channels (Start Narrow)
1. **LinkedIn** → Recruit technologists, establish credibility
2. **Blog on site** → SEO foundation, content to share
3. **YouTube OR X** → Pick one for broader reach

### Content Pillars
- AI threat awareness (scams, deepfakes, voice cloning)
- Practical privacy tips
- Success stories / case studies
- Behind-the-scenes of the mission

### Content Flywheel
```
Blog post (1x/week)
    → LinkedIn post (summarize + link)
    → X thread (key points)
    → YouTube video (if topic warrants)
```

### First Content Pieces to Create
1. **"Why I Started the John Connor Project"** - Personal story, mission, the problem you saw
2. **"5 AI Scams Targeting Your Parents Right Now"** - Practical, shareable, SEO-friendly
3. **"A Call to Technologists: Your Community Needs You"** - Recruitment focused
