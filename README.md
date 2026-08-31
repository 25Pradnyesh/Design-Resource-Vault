# Design Resource Vault

A curated, visual-first digital archive and reference library engineered for discovering, inspecting, and organizing high-quality web and product design resources.

---

## Overview

**Design Resource Vault** is a structured digital archive designed for rapid visual exploration and benchmark curation. Built to replace fragmented bookmarks and unorganized browser tabs, the Vault provides an editorial environment for exploring design benchmarks, UI component libraries, animation patterns, typography systems, and creative engineering references.

Rather than presenting a generic SaaS dashboard or simple link directory, the interface treats every resource as an archival specimen. It combines fixed-ratio visual previews, bespoke 3D category artwork, multi-signal search scoring, and local-first persistence into a focused, design-tool experience.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  Visual Specimen Archive  ·  22 Design Taxonomies  ·  Command Palette (⌘K)  │
│  Multi-Filter Matrix      ·  Scroll-Blend Chrome   ·  Local-First Curations │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design Philosophy

The Vault is designed as an art-directed archive rather than a commercial dashboard, following core product principles:

- **Restraint**: Clean canvas surfaces and controlled contrast without aggressive purple/neon SaaS gradients or visual clutter.
- **Visual-First Recognition**: Prioritizes immediate visual inspection with fixed `16:10` specimen cards and systematic blueprint fallbacks over dense text lists.
- **Hierarchy & Depth**: Distinct separation of visual planes (ambient atmospheric background, middle-ground content structure, foreground floating chrome) with subtle tactile elevation.
- **Consistency ("Same Universe, Different Objects")**: All interface surfaces share cohesive architectural tokens (deep navy ink, cool slate neutrals, electric accents), while each category and specimen retains a unique visual metaphor.
- **Usability & Speed**: Frictionless discovery through a secondary command palette (`⌘K` / `Ctrl+K`), deterministic multi-faceted filtering, and zero layout shift.

---

## Features

### Visual Specimen Archive
A dense, scannable catalog organized for rapid exploration. Every entry features a structured 3-zone visual specimen card complete with live favicon containers, fixed-ratio previews with systematic 3D blueprint fallbacks, monospace source domains, and archival tag metadata.

### 22-Category Design Taxonomy
Resources are organized across 22 specialized design disciplines grouped into 4 macro clusters:
- **Inspiration & Web**: UI / Web Inspiration, Landing Page Inspiration, SaaS / Product Design, Portfolio Inspiration, Award-Winning & Experimental Web, Creative & Advertising.
- **Interaction & Motion**: Website Animation Inspiration, Animation & Motion Tools, Frontend Animation, 3D & Interactive Web, Backgrounds & Visual Effects.
- **Visual Systems & Assets**: UI Components, Color & Typography, Visual Assets, Iconography, Mockups & Presentation, Visual Search & Moodboarding.
- **Product & Engineering**: UX & User Flows, UI / UX Prototyping, AI Design & Vibe Coding, Design Workflow, Learning & Vibe Coding.

### Secondary Command Menu (`⌘K` / `Ctrl+K`)
- **Design-Tool Palette**: A focused, compact command interface accessible globally via header trigger or keyboard shortcut.
- **Keyboard Navigation**: Full support for `ArrowDown` / `ArrowUp` with automated `scrollIntoView`, `Enter` to view resource specifications, `⌘Enter` / `Ctrl+Enter` to open source URLs directly, and `Escape` to close.
- **Instant Query Reset**: Compact clear button (`×`) that resets search queries while keeping focus within the input.
- **Clean Empty State**: Displays the active query term, contextual suggestions, and a direct clear affordance.

### Multi-Signal Search Scoring & Intent Engine
- **Strict Relevance Priority**: Resource Name (highest) → Domain (high) → Tags (medium) → Categories (medium) → Technologies & Styles → Purpose & Specifications.
- **Domain Matching**: Direct scoring and identification for source domains (e.g. `activetheory.net`, `bruno-simon.com`, `framer.com`).
- **Forgiving Token Matching**: Normalized prefix and partial token matching (e.g. `typogr` → Typography, `figm` → Figma, `motion des` → Motion Design) without heavy external search dependencies.

### Multi-Faceted Filter Matrix
- **Category Filter Popover**: Multi-category selection with live category specimen counters and grouped taxonomy lists.
- **Predictable Intersection (`AND`)**: Search queries and category/tag filters strictly intersect mathematically, ensuring clear, reproducible results.
- **Independent Clear Actions**: Active filter chips allow clearing search queries while preserving active category filters, or removing category tags while keeping the active query.

### Local-First Persistence
- **Favorites Collection**: Star entries to curate a personal reference archive, persisted client-side in local storage and accessible via `/favorites`.
- **Browsing History**: Automatically tracks recently viewed and recently added specimens without external tracking or authentication barriers.

### Resource Ingestion Workflows
- **Manual Submission (`AddResourceModal`)**: Structured metadata form for adding custom design resources with tags, categories, specifications, and descriptions.
- **URL Metadata Analyzer (`AddByUrlModal`)**: In-browser URL draft parser that extracts domains and suggests contextual taxonomies.

---

## Design System

The Design Resource Vault interface is built on a custom design token architecture:

### Color Palette
- **Canvas & Surfaces**: Crisp white (`#FFFFFF`), subtle slate canvas (`#F8FAFC`), and clean border lines (`#E2E8F0`, `#CBD5E1`).
- **Typography & Ink**: Deep navy ink (`#0B132B`) for primary titles, slate (`#334155`) for body content, and muted slate (`#64748B`) for technical metadata.
- **Accent Family**: Electric Aqua (`#00C4CC`), Mint (`#10B981`), Emerald (`#059669`), Warm Yellow (`#FBBF24`), Orange (`#FB923C`), Coral (`#FA5252`), and Rose (`#F43F5E`).
- **Color Discipline**: Strict exclusion of generic purple, violet, indigo, and neon gradient styling.

### Typography
- **Primary Interface**: System sans-serif stack (`-apple-system`, `BlinkMacSystemFont`, `Inter`, `Segoe UI`, `Roboto`) with tight tracking and high-contrast weights.
- **Technical Metadata**: Monospace stack (`ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`) for domains, category IDs (`CAT // 01`), and shortcut keys.

### 3D Category Iconography
Each of the 22 categories features bespoke 3D isometric SVG artwork (`Category3DIcon`) following a unified physical metaphor:
- **Consistent Perspective**: Isometric 3D angle across all category icons.
- **Lighting & Materiality**: Subtle top-lit gloss surfaces, directional gradients, and soft colored drop shadows.
- **Metaphor Mapping**: e.g., faceted gemstone for *Iconography*, dimensional browser for *UI / Web Inspiration*, wireframe spatial cube for *3D / Interactive Web*, and dimensional letterforms for *Color / Typography*.

### Motion & Tactility
- **Micro-Interactions**: Hover elevation (`translateY(-3px)`) and layered shadow expansion on cards (`180–280ms var(--ease-smooth)`).
- **Reduced Motion Support**: Fully respects `prefers-reduced-motion: reduce`, instantaneously suppressing all scale, translation, and rotation transforms across all components.

### Responsive Breakpoint Architecture
- **Mobile (`390 × 844`)**: 2-column resource grid with compact metadata, mobile search icon, drawer navigation, and zero horizontal scroll overflow.
- **Adaptive Brand Title**: Brand compresses to `VAULT` on screens `< 1200px` to prevent collision with action buttons, and expands to `DESIGN RESOURCE VAULT` on screens `≥ 1200px`. The brand emblem remains mathematically centered to the viewport across all widths.
- **Tablet (`768px` & `1024px`)**: 2-to-3 column grid with full metadata tags and popover filtering.
- **Desktop (`1280px` & `1440px`)**: 4-to-5 column high-density specimen archive grid.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`, `tailwindcss`, `tailwind-merge`, `clsx`)
- **Motion**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) and [Phosphor Icons](https://phosphoricons.com/)
- **3D & Canvas**: [Three.js](https://threejs.org/)
- **State & Storage**: React Context API (`ResourceContext`, `UIContext`) with local storage persistence
- **Testing & Verification**: [Playwright](https://playwright.dev/) for cross-viewport browser testing

---

## Project Structure

```text
app/
├── categories/[slug]/       # Category archive pages
├── favorites/               # Starred user collection view
├── recently-added/          # Chronological resource additions
├── recently-viewed/         # Session browsing history
├── resources/[slug]/        # Resource specification and detail view
├── globals.css              # Tailwind CSS v4 design tokens and global styles
├── layout.tsx               # Root layout and metadata configuration
├── not-found.tsx            # Custom 404 page
├── page.tsx                 # Main homepage, hero discovery, and archive grid
└── providers.tsx            # Application context providers wrapper

components/
├── add-resource/            # Resource submission and URL importer modals
├── archive/                 # Hero section, 3D category grid, and featured references
├── command-menu/            # Global ⌘K search palette and shortcut handlers
├── dashboard/               # Metric overviews and statistics
├── filters/                 # Multi-faceted filter matrix, active chips, and sorters
├── layout/                  # Persistent AppShell, header, drawer, and footer
├── resource-card/           # Resource cards with 3-zone architecture and fallbacks
├── resource-detail/         # Specification views and metadata inspectors
├── resource-grid/           # Responsive CSS resource grid and empty state
├── sidebar/                 # Taxonomy index navigation drawer
├── ui/                      # Base primitives (Badge, Button, Input, Modal, 3D Icons)
└── webgl/                   # Ambient canvas effects and interactive visual planes

data/
├── categories.ts            # 22 category taxonomy definitions and grouping helpers
└── resources.ts             # Curated seed resource database

lib/
├── related.ts               # Taxonomy similarity recommendation engine
├── resource-context.tsx     # Reactive resource and favorites state
├── search-intent.ts         # Natural language query intent parser
├── search.ts                # Multi-attribute scoring and search algorithms
├── storage.ts               # Local-first client storage adapter
├── theme-context.tsx        # UI theme context
├── ui-context.tsx           # Global drawer, command menu, and modal state
└── utils.ts                 # Class merging and helper utilities

scripts/
└── test-search-ux.mjs       # Playwright automated browser test suite

types/
└── index.ts                 # TypeScript interfaces and data model definitions
```

---

## Development

### Prerequisites
- Node.js 18.18.0 or higher
- npm, pnpm, or yarn

### Installation & Setup

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
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port indicated in terminal output).

### Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts local Next.js development server with hot module reloading |
| `npm run build` | Compiles optimized static and server production build |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Executes ESLint validation across all project files |
| `npx tsc --noEmit` | Runs strict TypeScript type checking without emitting files |
| `node scripts/test-search-ux.mjs` | Executes the automated Playwright Search & UX test suite |

---

## Testing & Verification

The project includes an automated Playwright verification suite (`scripts/test-search-ux.mjs`) alongside strict quality checks:

### Verification Philosophy
- **Responsive Viewport Benchmarks**: Tested across standard breakpoints (1440 × 900 desktop, 1280 × 800 laptop, 1024 × 768 tablet landscape, 768 × 1024 tablet portrait, and 390 × 844 mobile).
- **Interaction & Keyboard Verification**: Validates `⌘K` / `Ctrl+K` shortcut activation, Arrow key navigation with automatic item scrolling, Enter activation, and Escape dismissal.
- **Search & Filter Logic**: Validates mathematical intersection (`AND`), partial prefix queries (`typogr`, `figm`), domain resolution, and independent state clearing.
- **Regression Prevention**: Every change is validated with `npx tsc --noEmit`, `npm run build`, and `git diff --check`.

---

## Current Design Direction

The current objective is to reinforce Design Resource Vault as an authoritative, visual-first archive for design engineering and digital craft. The roadmap avoids generic dashboard tropes and focus-stealing marketing elements in favor of tactile specimen cards, predictable search mechanics, and editorial curation.

---

## Roadmap

- [x] Persistent responsive application header with scroll-aware opacity blending
- [x] Layered hero composition with atmospheric geometry and 3D studio artwork
- [x] 22-category taxonomy system with custom 3D isometric SVG artwork
- [x] 3-zone resource card architecture with fixed-ratio previews and blueprint fallbacks
- [x] Secondary command menu (`⌘K` / `Ctrl+K`) with domain scoring and forgiving prefix search
- [x] Multi-category filter popover with active filter chips and independent clear actions
- [ ] Systematic color token audit and strict hex consolidation across all components
- [ ] Screenshot ingestion pipeline and cached preview image CDN integration
- [ ] Collection export/import functionality (JSON & Markdown)
- [ ] Service worker offline caching for specimen browsing without internet connectivity

---

## License

This project is open source and available under the [MIT License](LICENSE).
