# Shield Exteriors — Website Rebuild (Demo)

A conversion-first rebuild of [shieldexteriors.com](https://www.shieldexteriors.com/) for **Shield Exteriors**, Northeast Indiana's metal & asphalt roofing company. Built by **SweetDreams Studios** as a working demo.

**Live demo:** https://sweet-dreams-us.github.io/ShieldExteriors/
**Crew portal (admin):** https://sweet-dreams-us.github.io/ShieldExteriors/#/admin (any credentials work)

---

## What's inside

### The one job: rank + convert
Engineered around a single action — **book a free inspection** — and a single promise — **"Protected for Life."**

- **Scroll-driven drone hero.** A cinematic AI-generated video (Higgsfield / Kling 3.0) of a worn roof transforming into a new charcoal standing-seam metal roof as a drone pulls away — *scrubbed frame-by-frame on scroll.*
- **Multi-step funnel form** that captures intent on step 1 and writes leads straight into the CRM.
- **Sticky header CTA + tap-to-call**, sticky mobile call/inspection bar, trust bar, financing nudges everywhere.
- **Every money page** from the strategy: Metal pillar (+ Standing Seam / Ribbed / Metal Shingle), Asphalt, Gutters, the **Shield Warranty** brand page, **Financing** (with a payment calculator), Reviews & Results, About, Service Area hub + **13 real city pages**, Careers, Blog/Learn, FAQ, Contact, Thank-You, Privacy, and dedicated **paid-traffic landing pages** (`/free-inspection`, `/storm-damage`).
- **SEO discipline:** per-page titles/descriptions, `RoofingContractor` + `FAQPage` + per-city schema, clean URLs.

### Behind-the-scenes admin (Crew Portal) — `#/admin`
A client-side operations system seeded with realistic data:
- **Dashboard** — KPIs, incoming job requests, pipeline-by-stage, today's schedule.
- **Lead Inbox** — searchable/filterable; the public funnel drops new requests here live.
- **CRM Pipeline** — drag-and-drop kanban (New → Contacted → Inspection → Estimate → Won/Lost).
- **Crew** — crews, specialties, staff roster & status.
- **Schedule** — 7-day staff/job calendar by crew.
- **Operations** — revenue, win rate, pipeline value, lead-source & crew-workload charts.

> Lead/CRM data is stored in the browser (`localStorage`) for the demo — submit a request on the site, then watch it appear in the admin inbox. Use **Reset demo data** in the sidebar to restore the seed.

## Tech
Vite · React + TypeScript · Tailwind CSS v4 · Framer Motion · React Router (HashRouter for GitHub Pages). Media generated with Higgsfield. Deployed via GitHub Actions → GitHub Pages.

## Develop
```bash
npm install
npm run dev        # local dev
npm run build      # production build → dist/
npm run preview    # preview the build
```
