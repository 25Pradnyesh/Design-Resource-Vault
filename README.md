# Design Resource Vault

A curated, visual-first digital archive and systematic reference library engineered for discovering, inspecting, and organizing high-quality web and product design resources.

---

## Problem

Digital designers, creative technologists, and frontend engineers constantly discover outstanding tools, design systems, animation references, and visual benchmarks. However, bookmarks quickly become fragmented, browser tabs proliferate uncontrollably, and standard bookmark managers reduce rich visual work to unhelpful flat text lists without context, previews, or domain-specific taxonomies.

## Solution

**Design Resource Vault (DRV)** replaces bookmark sprawl with an editorial, highly structured digital archive. Every entry is treated as an archival visual specimen, complete with predictable fixed-ratio previews, systematic 3D blueprint fallbacks, 4-quadrant technical specifications, instant command search (`⌘K`), multi-faceted faceted filtering, and local-first persistence without tracking, social noise, or generic SaaS clutter.

---

## Features

- **Curated Resource Archive**: 100+ handpicked design resources spanning UI inspiration, creative tools, motion libraries, typography systems, and frontend frameworks.
- **22-Category Design Taxonomy**: Deep categorization organized across 4 macro disciplines (Inspiration & Web, Interaction & Motion, Visual Systems & Assets, Product & Engineering).
- **3-Zone Visual Resource Cards**: Predictable `16:10` aspect ratio previews, resilient favicon badges with letter fallbacks, source domains, archival tags, and instant external links.
- **Instant Command Menu Search (`⌘K` / `Ctrl+K`)**: Fast multi-signal search scoring across resource names, domains (e.g. `framer.com`), tags, categories, visual styles, and specifications with keyboard arrow navigation.
- **Multi-Faceted Filtering & Predictable Intersection**: Category filter popover with live specimen counters, active removable filter chips, and strict mathematical intersection (`AND`) between search and filters.
- **Favorites & Local History**: Star favorite resources to build a personal reference collection, and review session history in Recently Viewed without server authentication barriers.
- **Resource Submission & URL Ingestion**: Manual submission modal with 4-quadrant specifications and URL metadata analyzer for rapid entry drafting.
- **Responsive Architecture**: Pixel-perfect adaptation across desktop (1440×900, 1280×800), tablet (1024×768, 768×1024), and mobile (390×844) with zero horizontal overflow and adaptive brand compression.
- **Bespoke 3D Category Artwork**: 22 custom isometric 3D specimen icons with physical lighting and color themes adhering strictly to the DRV palette.

---

## Design Direction

Design Resource Vault is designed as an art-directed digital archive rather than a generic commercial SaaS dashboard:

- **Editorial Hierarchy**: High-contrast typography pairing deep navy ink (`#0B132B`) with slate body text (`#334155`) on crisp white and subtle canvas surfaces (`#FFFFFF`, `#F8FAFC`).
- **Visual Depth**: Layered planes separating atmospheric background glows, structured middle-ground cards, and floating foreground glass chrome.
- **Restrained Motion**: Snappy, physical micro-interactions (160–280ms cubic-bezier easing) with complete suppression under `prefers-reduced-motion: reduce`.
- **Intentional Whitespace**: Generous layout margins, clean border grids, and structured dividers that eliminate visual noise.
- **Consistent Visual Language**: Multi-color iris emblem and restrained accent palette (Electric Aqua `#00C4CC`, Mint `#10B981`, Amber `#FBBF24`, Orange `#FB923C`, Coral `#FA5252`) with strict exclusion of purple/neon gradients.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss`, `tailwind-merge`, and `clsx`
- **Motion**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) and [Phosphor Icons](https://phosphoricons.com/)
- **3D & Canvas**: [Three.js](https://threejs.org/)
- **Testing**: [Playwright](https://playwright.dev/) for automated cross-viewport and interaction testing

---

## Architecture

- `app/`: Next.js App Router pages (Home, Category detail, Favorites, Recently Added, Recently Viewed, Resource detail, 404, robots, sitemap, and global providers).
- `components/`: Modular UI components organized by feature domain (`layout`, `archive`, `filters`, `command-menu`, `resource-card`, `resource-detail`, `resource-grid`, `add-resource`, `sidebar`, `ui`, `webgl`).
- `lib/`: Core utilities, reactive state contexts (`ResourceContext`, `UIContext`), search scoring algorithms (`search.ts`), natural language intent parser (`search-intent.ts`), relationship recommenders (`related.ts`), and local-first storage adapter (`storage.ts`).
- `data/`: Curated dataset including 22 category definitions (`categories.ts`) and 100+ resource specifications (`resources.ts`).
- `types/`: Complete TypeScript interfaces for resources, categories, filters, search scoring, and UI contracts.

---

## Getting Started

### Prerequisites
- Node.js 18.18.0 or higher
- npm

### Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/25Pradnyesh/Design-Resource-Vault.git
   cd Design-Resource-Vault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing & Verification

Run the validation and verification commands:

```bash
# TypeScript type checking
npm run typecheck

# Production build compilation
npm run build

# Playwright automated test suites
node scripts/test-design-system-audit.mjs
node scripts/test-responsive-audit.mjs
node scripts/test-search-ux.mjs
```

---

## Project Structure

```text
├── app/
│   ├── categories/[slug]/       # Category archive pages
│   ├── favorites/               # Starred user collection view
│   ├── recently-added/          # Chronological resource additions
│   ├── recently-viewed/         # Session browsing history
│   ├── resources/[slug]/        # Resource specification and detail view
│   ├── globals.css              # Design tokens and global CSS
│   ├── icon.svg                 # Tab icon emblem
│   ├── layout.tsx               # Root layout with SEO and OpenGraph metadata
│   ├── not-found.tsx            # Custom 404 page
│   ├── page.tsx                 # Main homepage and archive grid
│   ├── providers.tsx            # Application context providers
│   ├── robots.ts                # Dynamic robots.txt
│   └── sitemap.ts               # Dynamic sitemap generator
├── components/
│   ├── add-resource/            # Resource creation & URL analyzer modals
│   ├── archive/                 # Hero section, 3D category grid, featured
│   ├── command-menu/            # Global ⌘K search palette
│   ├── filters/                 # Multi-faceted filter popover and chips
│   ├── layout/                  # Persistent AppShell, header, drawer, footer
│   ├── resource-card/           # 3-zone visual specimen cards
│   ├── resource-detail/         # 4-quadrant specification views
│   ├── resource-grid/           # Responsive CSS resource grid
│   ├── sidebar/                 # Taxonomy index drawer
│   ├── ui/                      # Button, Input, Modal, 3D Category Icons
│   └── webgl/                   # Ambient Three.js background plane
├── data/
│   ├── categories.ts            # 22 design category taxonomy definitions
│   └── resources.ts             # 100+ curated resource entries
├── lib/
│   ├── related.ts               # Related resource recommendation engine
│   ├── resource-context.tsx     # Reactive resource state provider
│   ├── search-intent.ts         # Query intent parser
│   ├── search.ts                # Multi-attribute scoring engine
│   └── storage.ts               # Local-first client persistence adapter
├── scripts/
│   ├── test-design-system-audit.mjs
│   ├── test-responsive-audit.mjs
│   └── test-search-ux.mjs
└── types/
    └── index.ts                 # TypeScript data contracts
```

---

## Roadmap

- [x] Persistent responsive application header with scroll-aware opacity blending
- [x] Layered hero composition with atmospheric geometry and 3D studio artwork
- [x] 22-category taxonomy system with custom 3D isometric SVG artwork
- [x] 3-zone resource card architecture with fixed-ratio previews and blueprint fallbacks
- [x] Secondary command menu (`⌘K` / `Ctrl+K`) with domain scoring and forgiving prefix search
- [x] Multi-category filter popover with active filter chips and independent clear actions
- [x] Local-first Favorites and Recently Viewed curation
- [x] Dynamic SEO metadata, robots.txt, and sitemap generation
- [ ] Collection export/import functionality (JSON & Markdown)
- [ ] Service worker offline caching for specimen browsing without internet connectivity
