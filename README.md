# The John Connor Project

**Professional-Grade Infrastructure for Everyone.**

The John Connor Project connects everyday people and small businesses with skilled IT, networking, and infrastructure professionals — giving Main Street access to the same quality of technology infrastructure that corporations take for granted.

Think of it as the IT equivalent of a licensed electrician or plumber, but for your digital infrastructure: reliable home and small-office networks, IoT segmentation, NAS systems as alternatives to cloud subscriptions, smart home integration, structured cabling, access control, and physical security systems.

> _"The future is not set. There is no fate but what we make for ourselves."_

---

## Who It's For

**People who need help** — homeowners, families, and small businesses who want reliable, secure infrastructure but don't know where to start or who to trust.

**Professionals who want to help** — IT generalists, network engineers, structured cabling techs, smart home integrators, cybersecurity professionals, and anyone else with hands-on infrastructure skills who wants to serve their local community.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS + custom terminal/cyberpunk design system
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Email**: Resend (verification emails)
- **Form notifications**: Formspree
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel

---

## Site Structure

| Route | Purpose |
|---|---|
| `/` | Homepage — dual paths for help-seekers and professionals |
| `/about` | Project background and vision |
| `/mission` | Detailed mission with 5 objectives |
| `/get-involved` | Registration form for professionals |
| `/find-help` | For people seeking professional help |
| `/directory` | Public directory of verified professionals |
| `/learn` | Infrastructure and security education (7 topics) |
| `/resources` | Curated tools and links |
| `/your-cloud` | NAS and self-hosted storage education |
| `/protect-the-internet` | IP over HAM radio roadmap |
| `/your-stock-vote` | Proxy voting for corporate AI/privacy accountability |

---

## Professional Verification

Professionals self-register via `/get-involved`. The verification flow:

1. Pro submits form — entry created (`verified=false`, `public=false`, `email_verified=false`)
2. Resend sends a verification email with a unique token
3. Pro clicks the link — `email_verified` set to `true`
4. Owner manually reviews in Supabase and sets `verified=true`, `public=true`
5. Pro appears in `/directory`

All three flags must be true for a listing to be visible.

---

## Local Development

```bash
npm install
npm run dev
```

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Get Involved

**Are you an IT or infrastructure professional?** Get listed free at [johnconnorproject.org/get-involved](https://johnconnorproject.org/get-involved).

**Need help with your home or business network?** Find a verified professional at [johnconnorproject.org/directory](https://johnconnorproject.org/directory).

---

> _Join the resistance. Take back your network._
