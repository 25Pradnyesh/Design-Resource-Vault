# DESIGN RESOURCE VAULT

> A curated, visual-first digital archive and systematic reference engine for discovering, inspecting, and organizing high-quality web and product design craft.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-Audited-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Not_Specified-64748b?style=flat-square)](#-license)

---

## 🌐 Live Demo

**[→ Visit Design Resource Vault](https://design-resource-vault.vercel.app/)**

---

## ✦ What is Design Resource Vault?

**Design Resource Vault (DRV)** is an art-directed digital archive engineered for rapid visual discovery, technical inspection, and bookmark curation across digital design and creative engineering. Built to replace fragmented browser bookmarks and chaotic link dumps, the Vault provides a tactile, high-density environment for exploring interface benchmarks, animation systems, 3D WebGL scenes, typography foundations, and frontend tools.

Rather than presenting a generic SaaS dashboard or plain text directory, the interface treats every resource as an archival specimen. It combines fixed-ratio visual cards, systematic 3D blueprint fallbacks, multi-signal relevance scoring, 4-quadrant technical specifications, and local-first persistence into a focused, design-tool experience.

Whether discovering interaction patterns during active UI/UX ideation, benchmarking layout paradigms, or analyzing frontend motion code, Design Resource Vault functions as an authoritative, noise-free visual reference library.

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  Visual Specimen Archive  ·  22 Design Taxonomies  ·  Command Palette (⌘K)              │
│  Multi-Signal Search      ·  Scroll-Blend Chrome   ·  Local-First Curations (Favorites) │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## The Problem

Designers, creative technologists, and frontend engineers discover dozens of inspiring websites, component libraries, motion patterns, and design utilities every week. However, these valuable references inevitably end up scattered across:

- Unorganized browser bookmarks that lack visual previews or context
- Hundreds of open browser tabs that consume memory and get accidentally closed
- Disorganized Notion pages, notes apps, and personal folders
- Ephemeral Slack messages, Discord threads, and social bookmarks
- Ad-hoc desktop screenshots without source URLs or technical metadata

Standard bookmark managers reduce rich visual design work to unhelpful flat lists of text links without context, domain-specific categorization, or technical specifications.

---

## The Idea

Design Resource Vault is built around a continuous, cyclical reference workflow:

```text
┌──────────────┐          ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│  01 DISCOVER │  ─────>  │  02 EXPLORE  │  ─────>  │   03 SAVE    │  ─────>  │  04 RETURN   │
└──────────────┘          └──────────────┘          └──────────────┘          └──────────────┘
```

1. **DISCOVER**: Rapidly scan visual specimen cards or invoke the global command palette (`⌘K`) to find relevant benchmarks by name, domain, category, tag, or style.
2. **EXPLORE**: Inspect 4-quadrant technical specifications (*What It Does*, *Why Use It*, *When To Use It*, *How To Use It*), examine source domains, and explore related taxonomy recommendations.
3. **SAVE**: Star entries into a personal reference collection, persisted client-side in local storage without registration barriers, tracking, or cloud lock-in.
4. **RETURN**: Revisit curated favorites and recent browsing history during active design and engineering sprints.

---

## ✦ Features

### 01 — Discovery & Visual Specimen Archive
- **3-Zone Visual Specimen Cards**: Fixed `16:10` aspect ratio cards with live favicon containers, monospace source domains, archival tag chips, and instant external links.
- **Systematic Blueprint Previews**: 3D geometric SVG specimen artwork serving as resilient visual blueprints whenever live screenshots are loading or absent.
- **22-Category Design Taxonomy**: Deep categorization organized across 4 macro disciplines with custom 3D isometric SVG artwork for each category.
- **Global Command Menu (`⌘K` / `Ctrl+K`)**: Keyboard-first command palette supporting Arrow key navigation with auto-scroll, `Enter` to inspect specifications, and `⌘Enter` to visit source websites.

### 02 — Search & Intelligence Engine
- **Multi-Signal Relevance Scoring** (`lib/search.ts`): Deterministic weighted scoring prioritizing Resource Name → Domain → Tags → Categories → Technologies & Styles → Purpose & Specifications.
- **Source Domain Matching**: Direct indexing and scoring for root domains (e.g. `activetheory.net`, `bruno-simon.com`, `framer.com`).
- **Forgiving Token Matching**: Normalized prefix queries (e.g. `typogr` → Typography, `figm` → Figma, `motion` → Motion Tools).
- **Search Intent Parsing** (`lib/search-intent.ts`): Automatically extracts technologies, visual styles, and category concepts from natural language search queries.

### 03 — Curation & Inspection
- **4-Quadrant Technical Specifications**: Deep inspection on `/resources/[slug]` structured into *What It Does*, *Why Use It*, *When To Use It*, and *How To Use It*.
- **Local-First Favorites**: Star resources to curate a persistent personal reference collection stored client-side in `localStorage` without login requirements.
- **Browsing History**: Automatically tracks recently viewed and recently added specimens across browser sessions.
- **Taxonomy Recommendation Engine** (`lib/related.ts`): Recommends contextually related specimens based on shared category tags and technical stacks.

### 04 — Ingestion & System Architecture
- **Manual Submission Form (`AddResourceModal`)**: Structured dialog for adding custom design resources with tags, categories, specifications, and descriptions.
- **URL Metadata Analyzer (`AddByUrlModal`)**: In-browser URL draft parser that extracts domains and suggests contextual taxonomies.
- **Multi-Faceted Filter Matrix**: Category filter popover with active removable chips and independent clearing (clearing search preserves category filters; removing chips preserves search).
- **Responsive Viewport Adaptation**: Pixel-perfect layout across desktop (1440 × 900, 1280 × 800), tablet (1024 × 768, 768 × 1024), and mobile (390 × 844) with zero horizontal overflow.

---

## ✦ Resource Taxonomy

The Vault categorizes digital craft across 22 specialized design disciplines grouped into 4 macro clusters:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TAXONOMY MATRIX                                       │
├──────────────────────────┬──────────────────────────┬───────────────────────────────────┤
│ 01 · Inspiration & Web   │ 02 · Interaction & Motion│ 03 · Visual Systems & Assets      │
├──────────────────────────┼──────────────────────────┼───────────────────────────────────┤
│ • UI / Web Inspiration   │ • Website Animation      │ • UI Components                   │
│ • Landing Page Reference │ • Animation Motion Tools │ • Color & Typography              │
│ • SaaS / Product Design  │ • Frontend Animation     │ • Visual Assets                   │
│ • Portfolio Inspiration  │ • 3D & Interactive Web   │ • Iconography                     │
│ • Award-Winning / Exper. │ • Backgrounds & Effects  │ • Mockups & Presentation          │
│ • Creative & Advertising │                          │ • Visual Search & Moodboarding    │
├──────────────────────────┴──────────────────────────┴───────────────────────────────────┤
│ 04 · Product & Engineering                                                              │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ • UX / User Flows  ·  UI / UX Prototyping  ·  AI Design & Vibe Coding                   │
│ • Design Workflow  ·  Learning & Vibe Coding                                            │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Macro Groups & Category Slugs:

#### 1. Inspiration & Web
- `ui-web-inspiration` — Curated web and interface design inspiration.
- `landing-page-inspiration` — High-quality landing page references and conversion patterns.
- `saas-product-design` — SaaS dashboards, complex product UI, and application design.
- `portfolio-inspiration` — Designer, agency, and creative technologist portfolio references.
- `award-winning-experimental` — Award-winning, avant-garde, and experimental web experiences.
- `creative-advertising` — Creative campaigns, digital advertising, and interactive brand experiences.

#### 2. Interaction & Motion
- `website-animation-inspiration` — Animated websites and motion-rich digital experiences.
- `animation-motion-tools` — Tools for creating, editing, and managing motion design.
- `frontend-animation` — Code-first animation libraries, layout engines, and physics frameworks.
- `3d-interactive-web` — 3D scenes, WebGL, shaders, and spatial interactive experiences.
- `backgrounds-visual-effects` — Generative backgrounds, canvas effects, and shader generators.

#### 3. Visual Systems & Assets
- `ui-components` — Reusable UI component libraries, design systems, and web primitives.
- `color-typography` — Color palettes, type foundries, pairing tools, and typography systems.
- `visual-assets` — High-quality illustrations, 3D assets, and graphic design collections.
- `iconography` — Open-source icon sets, 3D icons, animated iconography, and symbol libraries.
- `mockups-presentation` — Device mockups, scene generators, and editorial presentation kits.
- `visual-search-moodboarding` — Visual search engines, moodboard curators, and aesthetic references.

#### 4. Product & Engineering
- `ux-user-flows` — User onboarding flows, UX patterns, and interaction mechanics.
- `ui-ux-prototyping` — Prototyping tools for rapid wireframing and micro-interaction design.
- `ai-design-vibe-coding` — AI-assisted design systems, prompt-to-UI, and vibe coding platforms.
- `design-workflow` — Productivity tools, browser extensions, and designer-developer handoff.
- `learning-vibe-coding` — Creative coding tutorials, engineering guides, and design learning hubs.

---

## ✦ Design Philosophy

Design Resource Vault is intentionally built as an **art-directed digital archive** rather than a generic commercial SaaS dashboard:

| Dimension | Vault Direction | Generic SaaS Clutter (Avoided) |
|---|---|---|
| **Visual Hierarchy** | High-contrast editorial ink on crisp white/slate canvas | Low-contrast text on dark purple backgrounds |
| **Color Discipline** | Restrained Navy `#0B132B` + Slate with Electric Aqua `#00C4CC` & warm accents | Over-saturated neon rainbow gradients, aggressive violet washes |
| **Motion** | Snappy, physical feedback (160–280ms) + Reduced Motion support | Excessive continuous floating/spinning decorative loops |
| **Previews** | Fixed `16:10` aspect ratio with systematic 3D blueprint fallbacks | Inconsistent broken thumbnails, plain text link lists |
| **Privacy & Storage** | Local-first client storage without login walls or tracking | Mandatory accounts, analytics bloat, cloud lock-in |

---

## ✦ Design System

The interface is built on a consolidated semantic token architecture defined in `app/globals.css` with Tailwind CSS v4:

### Color Palette

| Token Role | CSS Variable | Hex / Value | Purpose |
|---|---|---|---|
| **Canvas Background** | `--background` | `#FFFFFF` | Primary viewport background |
| **Subtle Canvas** | `--background-subtle` | `#F8FAFC` | Secondary page canvas |
| **Surface** | `--surface` | `#FFFFFF` | Card and modal surfaces |
| **Surface Muted** | `--surface-muted` | `#F1F5F9` | Neutral pill badges and chips |
| **Primary Ink** | `--text-primary` | `#0B132B` | Headings, titles, high-contrast text |
| **Secondary Text** | `--text-secondary` | `#334155` | Body copy, descriptions |
| **Muted Text** | `--text-muted` | `#64748B` | Monospace tags, domains, counters |
| **Light Border** | `--border` | `#E2E8F0` | Dividers, card borders |
| **Strong Border** | `--border-strong` | `#CBD5E1` | Interactive borders, focus states |
| **Primary Accent** | `--accent` | `#00C4CC` | Electric Aqua for active filters & focus |
| **Mint Accent** | `--accent-mint` | `#10B981` | Verification signals, status badges |
| **Amber Accent** | `--accent-yellow` | `#FBBF24` | Featured highlights |
| **Orange Accent** | `--accent-orange` | `#FB923C` | Category tags |
| **Coral Accent** | `--accent-coral` | `#FA5252` | Specialty markers |

### Typography

- **Interface Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif`
  Used with tight tracking (`tracking-tight`) and high-contrast font weights for titles and body text.
- **Technical Monospace Stack**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
  Used for source domains, category numbering (`CAT // 01`), keyboard shortcuts (`⌘K`), and technical specifications.

### Motion Principles

Animations are powered by Framer Motion 12 and native CSS transitions:
- **Card Elevation**: `translateY(-3px)` elevation with layered shadow expansion (`180–280ms`).
- **Modal Transitions**: Quick opacity and scale transitions (`scale(0.98) → scale(1.0)`).
- **Reduced Motion Support**: Strictly respects `prefers-reduced-motion: reduce`, instantaneously disabling all transforms and transitions across all components.

---

## ✦ Tech Stack

| Technology | Version | Purpose in Codebase |
|---|---|---|
| **Next.js** | `^15.2.0` | React application framework with App Router architecture |
| **React** | `^19.0.0` | UI component runtime |
| **React DOM** | `^19.0.0` | DOM rendering engine |
| **TypeScript** | `^5.0.0` | Strict static type checking and data contracts |
| **Tailwind CSS** | `^4.0.0` | Utility-first CSS engine with inline `@theme` token configuration |
| **@tailwindcss/postcss** | `^4.0.0` | PostCSS plugin for Tailwind CSS v4 |
| **Framer Motion** | `^12.4.7` | Fluid micro-interactions, layout transitions, and dialog animations |
| **Phosphor Icons** | `^2.1.10` | Primary icon set (`@phosphor-icons/react`, `phosphor-react`) |
| **Lucide React** | `^0.475.0` | Secondary UI icons (`lucide-react`) |
| **Three.js** | `^0.185.1` | WebGL canvas scene for subtle background atmosphere |
| **clsx & tailwind-merge** | `^2.1.1` / `^3.0.1` | Conditional class composition and token collision resolution |
| **Playwright** | `^1.62.1` | Cross-viewport automated testing and search UX verification |
| **ESLint** | `^9.0.0` | Static code analysis and linting (`eslint-config-next`) |

---

## ✦ Architecture

```text
app/                     # Next.js App Router (Pages, Layout, Dynamic Metadata, SEO)
├── categories/[slug]/   # Dynamic category archive routes
├── favorites/           # Starred user collection route
├── recently-added/      # Chronological additions route
├── recently-viewed/     # Session history route
├── resources/[slug]/    # Dynamic 4-quadrant resource specification routes
├── globals.css          # Tailwind CSS v4 design tokens and global styles
├── icon.svg             # Vector browser tab icon
├── layout.tsx           # Root layout with OpenGraph, Twitter, and SEO metadata
├── not-found.tsx        # Custom 404 error page
├── page.tsx             # Vault homepage (Hero, Category Matrix, Archive Grid)
├── providers.tsx        # Combined Context Providers wrapper
├── robots.ts            # Dynamic robots.txt generation
└── sitemap.ts           # Dynamic sitemap.xml generation

components/              # Modular UI Components
├── add-resource/        # Manual submission, URL analyzer, and resource editor modals
├── archive/             # Hero banner, 3D category grid, and featured specimen reel
├── command-menu/        # Global ⌘K search palette with keyboard navigation
├── filters/             # Multi-faceted filter popover, chips, and sort controls
├── layout/              # Persistent AppShell, scroll-blend header, and footer
├── resource-card/       # 3-zone visual specimen cards, favicon badge, blueprint fallbacks
├── resource-detail/     # 4-quadrant specifications and related resource recommendations
├── resource-grid/       # Responsive CSS grid and empty state views
├── sidebar/             # Taxonomy navigation drawer
├── ui/                  # Primitives (Badge, Button, Input, Modal, 3D Category Icons)
└── webgl/               # Three.js ambient background scene

data/                    # Curated Datasets
├── categories.ts        # 22 design category definitions and 4 macro groups
└── resources.ts         # 98 curated seed resources with 4-quadrant specifications

lib/                     # Business Logic & Infrastructure
├── related.ts           # Taxonomy similarity scoring for related recommendations
├── resource-context.tsx # Reactive resource, favorites, and view state provider
├── search-intent.ts     # Natural language query intent parser
├── search.ts            # Multi-attribute weighted relevance scoring engine
├── storage.ts           # Local-first client persistence adapter (LocalStorage)
├── theme-context.tsx    # Theme context provider
├── ui-context.tsx       # Global drawer, command palette, and modal UI state
└── utils.ts             # Tailwind class merging utility (`cn`)

types/                   # TypeScript Contracts
└── index.ts             # Complete type definitions (Resource, Category, Filters, Search)

scripts/                 # Automated Test Suites
├── test-design-system-audit.mjs  # Design tokens and responsive route audit
├── test-responsive-audit.mjs     # 5-viewport layout and overflow test suite
└── test-search-ux.mjs            # Command menu, keyboard shortcuts, and search tests
```

---

## ✦ Resource Data Model

Every resource in the Vault conforms to the strict `Resource` interface defined in `types/index.ts`:

```typescript
export interface Resource {
  id: string;                      // Unique identifier (e.g., "framer")
  slug: string;                    // URL routing slug (e.g., "framer")
  name: string;                    // Resource title (e.g., "Framer")
  url: string;                     // Canonical website URL (e.g., "https://framer.com")
  description: string;             // Editorial summary
  whatItDoes: string;              // 4-Quadrant Spec: Functional description
  whyUseIt: string;                // 4-Quadrant Spec: Architectural strengths & benefits
  whenToUseIt: string;             // 4-Quadrant Spec: Ideal scenarios and use cases
  howToUseIt: string;              // 4-Quadrant Spec: Practical implementation steps
  categories: string[];            // Primary and secondary category IDs
  tags: string[];                  // Archival discovery tags (e.g., ["Prototyping", "React"])
  purpose: string;                 // Controlled primary purpose classification
  featured: boolean;               // Featured collection flag
  isUserAdded?: boolean;           // True if created via client submission modal
  previewImage?: string;           // Screenshot image URL (falls back to 3D specimen blueprint)
  technologies?: string[];         // Tech stack keywords (e.g., ["React", "WebGL", "TypeScript"])
  styles?: string[];               // Visual style keywords (e.g., ["Minimal", "Brutalist"])
  visualKeywords?: string[];       // Semantic visual descriptors
  relatedResourceIds?: string[];   // Explicit related resource recommendations
  createdAt: string;               // ISO 8601 creation timestamp
  updatedAt: string;               // ISO 8601 update timestamp
  viewCount?: number;              // Local inspection count
}
```

---

## ✦ Getting Started

### Prerequisites
- **Node.js**: `18.18.0` or higher
- **Package Manager**: `npm` (or `pnpm` / `yarn`)

### 01 — Clone
```bash
git clone https://github.com/25Pradnyesh/Design-Resource-Vault.git
cd Design-Resource-Vault
```

### 02 — Install
```bash
npm install
```

### 03 — Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 04 — Build & Verify
```bash
npm run typecheck
npm run build
```

---

## ✦ Testing & Verification

The project includes three automated Playwright browser test suites that run against the live application:

### Static & Build Verification
```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Production build compilation
npm run build
```

### Automated Playwright UX & Responsive Audits
```bash
# 1. Design System & Color Token Audit (53 tests)
node scripts/test-design-system-audit.mjs

# 2. Comprehensive Responsive & Cross-Viewport Audit (60 tests across 5 viewports)
npm test

# 3. Search, Command Menu, and Filter UX Audit (24 tests)
node scripts/test-search-ux.mjs
```

### Verified Viewport Matrix:
- `1440 × 900` — Desktop Benchmark (Zero overflow, 6 category cols, centered brand)
- `1280 × 800` — Normal Laptop (Zero overflow, 6 category cols, centered brand)
- `1024 × 768` — Tablet Landscape (Zero overflow, 4 category cols, compact brand)
- `768 × 1024` — Tablet Portrait (Zero overflow, 4 category cols, compact brand)
- `390 × 844` — Mobile (Zero overflow, 2 category cols, drawer menu, search icon)

---

## 🚀 Deployment

Design Resource Vault is deployed on Vercel.

The GitHub repository is connected to Vercel, so every push to the `main` branch automatically triggers a new production deployment.

```text
GitHub → main → Vercel → Production
```

Production: [https://design-resource-vault.vercel.app/](https://design-resource-vault.vercel.app/)

---

## ✦ Roadmap

- [x] Responsive application header with scroll-aware opacity blending
- [x] Layered hero composition with 3D studio artwork and geometric ribbons
- [x] 22-category taxonomy system with custom 3D isometric SVG artwork
- [x] 3-zone resource card architecture with fixed-ratio previews and blueprint fallbacks
- [x] Secondary command menu (`⌘K` / `Ctrl+K`) with domain scoring and forgiving prefix search
- [x] Multi-category filter popover with active filter chips and independent clear actions
- [x] 4-quadrant resource specification pages with related taxonomy recommendations
- [x] Local-first Favorites and Recently Viewed curation
- [x] Dynamic SEO metadata, robots.txt, and sitemap generator
- [ ] Collection export/import functionality (JSON & Markdown formats)
- [ ] Service worker offline caching for specimen browsing without internet connectivity

---

## ✦ License

Currently no open-source license is specified. All rights reserved by the author.

---

<div align="center">

### Built by Pradnyesh

[![GitHub Profile](https://img.shields.io/badge/GitHub-25Pradnyesh-0B132B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/25Pradnyesh)
[![X Profile](https://img.shields.io/badge/X-@Pradnyesh__25-0B132B?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Pradnyesh_25)

<br />

**Design Resource Vault**<br />
*A visual archive for people who actually design.*

</div>
