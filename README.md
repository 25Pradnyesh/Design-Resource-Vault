# Design Resource Vault

> A curated, searchable library of UI/UX resources, design tools, frontend utilities, inspiration, and creative references — built for people who actually ship.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Framer%20Motion-12-black?style=flat-square" />
</p>

<p align="center">
  <strong>61 resources · 21 categories · one place to find the good shit.</strong>
</p>

---

## ✦ What is Design Resource Vault?

Design Resource Vault is a personal **UI/UX and frontend resource intelligence library**.

Instead of keeping hundreds of random browser bookmarks, scattered Notion pages, screenshots, and "I'll remember this website later" tabs, the Vault organizes useful resources into one searchable interface.

Find inspiration.

Discover tools.

Save references.

Ship better work.

### The goal

> **DISCOVER → SEARCH → FILTER → OPEN → SAVE → RETURN**

The Vault is designed to grow continuously — new resources can be added without changing the underlying product architecture.

---

## ✦ What's Inside?

The current V1 contains:

- **61 curated resources**
- **21 design categories**
- Global search
- `⌘ K` / `Ctrl K` command palette
- Category filtering
- Tag filtering
- Favorites
- Recently viewed
- Recently added
- Related resources
- Resource detail pages
- Manual resource creation
- Add-by-URL workflow
- Local persistence
- Dark / light theme
- Responsive layouts
- Motion-driven interactions

---

## ✦ Resource Categories

Resources can belong to multiple categories.

### Design & Inspiration

- UI / Web Inspiration
- Landing Page Inspiration
- SaaS / Product Design
- UX / User Flows
- Portfolio Inspiration
- Award-Winning / Experimental Web
- Visual Search / Moodboarding

### Motion & Frontend

- Website Animation Inspiration
- Animation / Motion Tools
- Frontend Animation
- UI Components
- 3D / Interactive Web
- Backgrounds / Visual Effects

### Creative & Visual

- Color / Typography
- Visual Assets
- Mockups / Presentation
- Creative / Advertising

### AI & Workflow

- AI Design / Vibe Coding
- Design Workflow
- Learning / Vibe Coding
- UI / UX Prototyping

---

## ✦ Featured Resources

The Vault currently includes resources such as:

**UI & Components**

- React Bits
- shadcn/ui
- Uiverse
- VibeUI
- Tailark
- assistant-ui

**Animation & Motion**

- Motion.dev
- GSAP
- Rive
- LottieLab
- LottieFiles
- Lenis
- Vanta.js
- Motion Primitives

**Inspiration**

- Mobbin
- Awwwards
- Land-book
- Landingfolio
- SaaSPO
- One Page Love
- Minimal Gallery
- Landing Love
- Page Flows

**AI / Vibe Coding**

- v0
- Google Stitch
- Manus
- Vibe Code Components
- Vibe Coder Blog
- Tickle Vibe Coding

**Design Utilities**

- Huemint
- Realtime Colors
- Haikei
- Jitter
- Mockup Design
- Pixcap
- Magic Animator

…and more.

---

# ✦ Product Philosophy

The Vault is intentionally **not** designed as a traditional SaaS dashboard.

No meaningless analytics.

No bloated admin panels.

No 47-step onboarding flow.

The primary interface revolves around **discovery**.

### Good resource management should feel like:

```text
SEARCH
   ↓
DISCOVER
   ↓
UNDERSTAND
   ↓
SAVE
   ↓
USE

✦ V1 Architecture

Design Resource Vault
│
├── app/
│   ├── categories/
│   ├── favorites/
│   ├── recently-added/
│   ├── recently-viewed/
│   ├── resources/
│   └── add-resource/
│
├── components/
│   ├── add-resource/
│   ├── command-menu/
│   ├── dashboard/
│   ├── filters/
│   ├── layout/
│   ├── resource-card/
│   ├── resource-detail/
│   ├── resource-grid/
│   ├── sidebar/
│   └── ui/
│
├── data/
│   ├── categories.ts
│   └── resources.ts
│
├── lib/
│   ├── related.ts
│   ├── resource-context.tsx
│   ├── search.ts
│   ├── storage.ts
│   ├── theme-context.tsx
│   ├── ui-context.tsx
│   └── utils.ts
│
└── types/
    └── index.ts


✦ Tech Stack

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| Next.js 15      | Application framework   |
| React 19        | UI                      |
| TypeScript      | Type safety             |
| Tailwind CSS v4 | Styling                 |
| Framer Motion   | Motion & interactions   |
| Lucide React    | Icons                   |
| React Context   | Application state       |
| LocalStorage    | Client-side persistence |


The architecture intentionally keeps the data layer independent from the UI so it can evolve later.

✦ Design Direction

The visual language is inspired by products and studios that prioritize clarity, typography, interaction, and restraint.

References
Linear
Vercel
Raycast
Mobbin
Are.na
Premium digital studios
Principles

01 — Content first

The resources are the product.

02 — High information density

Users should discover useful resources quickly without visual clutter.

03 — Motion with purpose

Animations should communicate interaction, not exist just because they can.

04 — Quiet interface

The UI should stay out of the way.

05 — Designed to scale

The system should remain usable when 61 resources becomes 600.

✦ Current V1

V1 focuses on building the foundation:

61 Resources
      +
21 Categories
      +
Search
      +
Filtering
      +
Favorites
      +
History
      +
Related Resources
      +
Resource Details
      +
Local Persistence

✦ Roadmap
V1 — Foundation ✓
 Resource database
 Categories
 Search
 Filtering
 Favorites
 Recently viewed
 Recently added
 Resource details
 Related resources
 Add resource
 Local persistence
 Dark / light mode
V2 — Visual Intelligence
 Redesign homepage around discovery
 Editorial resource layout
 Better resource cards
 Visual website previews
 Improved search experience
 Better command palette
 Enhanced category pages
 Richer resource detail pages
 Refined motion system
 Better responsive experience
V3 — Intelligence
 Automatic URL metadata extraction
 AI-powered categorization
 AI-generated tags
 Similar resource recommendations
 Website screenshot previews
 Smart collections
Future
 Cloud sync
 Authentication
 Public collections
 Browser extension
 Community submissions
 Personal notes
 Cross-device sync

✦ Contributing

This project is currently being developed as a personal design resource system.

If you have a resource that genuinely deserves to be here, the ideal contribution is something that provides real value to:

designers
frontend developers
product designers
creative developers
UI/UX researchers
indie hackers
people building products

No link dumping.

Signal over noise.

✦ Philosophy

There are thousands of design resources on the internet.

The problem isn't finding more.

The problem is finding the right one at the right moment.

Design Resource Vault exists to solve that.

Less hunting. More designing.

Built with caffeine, curiosity & questionable sleep schedules.

Design Resource Vault
Made by Pradnyesh