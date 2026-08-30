# Design Resource Vault

A curated, visual-first archive and reference library for discovering, inspecting, and organizing high-quality web and product design resources.

---

## Overview

**Design Resource Vault** is a structured digital archive engineered for fast visual discovery and reference management. Built to replace fragmented bookmarks and unorganized browser tabs, the Vault provides an editorial environment for exploring design benchmarks, UI component libraries, motion patterns, typography systems, and creative engineering references.

The interface prioritizes immediate visual recognition over generic text lists, combining fixed-ratio previews, rich taxonomy classification, natural language search scoring, and local-first persistence into a focused design-tool experience.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  Visual Specimen Archive  ·  22 Design Taxonomies  ·  Command Palette (⌘K)  │
│  Multi-Filter Matrix      ·  Scroll-Blend Chrome   ·  Local-First Curations │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Features

### Visual Specimen Archive
A dense, scannable catalog designed for rapid exploration. Every resource entry presents a structured 3-zone visual specimen card complete with live favicon containers, fixed-ratio previews or systematic 3D fallbacks, monospace source domains, and archival tag metadata.

### 22-Category Design Taxonomy
Resources are organized across 22 specialized design disciplines grouped into 4 macro clusters:
- **Inspiration & Web**: UI / Web Inspiration, Landing Page Inspiration, SaaS / Product Design, Portfolio Inspiration, Award-Winning & Experimental Web, Creative & Advertising.
- **Interaction & Motion**: Website Animation Inspiration, Animation & Motion Tools, Frontend Animation, 3D & Interactive Web, Backgrounds & Visual Effects.
- **Visual Systems & Assets**: UI Components, Color & Typography, Visual Assets, Iconography, Mockups & Presentation, Visual Search & Moodboarding.
- **Product & Engineering**: UX & User Flows, UI / UX Prototyping, AI Design & Vibe Coding, Design Workflow, Learning & Vibe Coding.

### Natural Language Search & Command Palette (`⌘K`)
- **Global Command Menu**: Instant discovery accessible via header search or `⌘K` / `Ctrl+K`.
- **Search Intent Engine**: Parses queries into capability keywords, technology matches, and adjacent discovery concepts.
- **Match Scoring**: Displays match percentages and contextual explanation snippets for scored query results.

### Multi-Faceted Filter Matrix
- **Multi-Category Selection**: Filter across multiple categories simultaneously with active item counters.
- **Concurrent Querying**: Search keywords, category tags, purpose types, and sort criteria operate seamlessly together.
- **Active Filter Chips**: Removable filter tags with one-click individual dismissal and global reset.

### Local-First Persistence
- **Favorites Collection**: Star entries to curate a personal reference library, persisted client-side and accessible via `/favorites`.
- **Browsing History**: Automatically tracks recently viewed and recently added items without tracking or external accounts.

### Resource Ingestion Workflows
- **Manual Submission (`AddResourceModal`)**: Structured metadata form for adding custom design resources with tags, categories, and descriptions.
- **URL Metadata Analyzer (`AddByUrlModal`)**: In-browser URL draft parser that extracts domains and suggests contextual taxonomies.

---

## Design System & Aesthetics

Design Resource Vault follows an editorial, tool-focused visual philosophy where every element emphasizes visual clarity, tactile micro-interactions, and controlled contrast.

### Visual Philosophy: "Same Universe, Different Objects"
All interface surfaces share a consistent architectural language—light neutral surfaces, crisp deep-navy typography, and warm electric accents—while each category and resource card maintains its own distinct visual identity.

### Curated Color Palette
- **Canvas & Surfaces**: Clean white (`#FFFFFF`), subtle slate canvas (`#F8FAFC`), and neutral border lines (`#E2E8F0`).
- **Typography**: Deep navy ink (`#0B132B`) for primary titles, slate (`#334155`) for secondary content, and muted slate (`#64748B`) for technical metadata.
- **Accent Family**: Electric Aqua (`#00C4CC`), Mint (`#10B981`), Emerald (`#059669`), Warm Yellow (`#FBBF24`), Orange (`#FB923C`), Coral (`#FA5252`), and Rose (`#F43F5E`).
- **Strict Color Restraint**: Excludes purple, violet, indigo, and blue-dominant gradient treatments to maintain a distinct, warm-editorial brand identity.

### Persistent Scroll-Blending Navigation Chrome
The floating global header adapts its visual prominence across 3 discrete scroll tiers:
- **Top of Page (`0–24px`)**: Crisp application chrome with subtle border (`bg-white/85`, `backdrop-blur-[12px]`).
- **Light Scroll (`24–120px`)**: Stepped-down visual prominence (`bg-white/50`, `backdrop-blur-[10px]`).
- **Deep Scroll (`> 120px`)**: Borderless translucent dissolution (`bg-white/[0.18]`, `backdrop-blur-[6px]`), allowing underlying hero artwork and grid content to dominate while keeping controls accessible.

---

## Category Visual System

The repository includes a dedicated 22-category visual icon system rendered as custom 3D isometric SVG artwork (`Category3DIcon`).

### Rendering Principles
- **Metaphor**: Each category conveys a physical or conceptual design object.
- **Silhouette**: High-contrast, recognizable geometry at small and large scales.
- **Perspective**: Consistent isometric or orthogonal 3D orientation.
- **Lighting**: Subtle top-lit gloss surfaces, directional gradients, and soft colored drop shadows.
- **Palette Consistency**: Category surfaces and borders align with defined category theme tokens (`CATEGORY_THEMES`).

### Specimen Metaphors
- **UI / Web Inspiration (`CAT // 01`)**: 3D glossy cyan browser window with internal card geometry.
- **Landing Page Inspiration (`CAT // 02`)**: Mint 3D browser featuring a hero billboard banner and content cards.
- **SaaS / Product Design (`CAT // 03`)**: Translucent teal isometric cube with a glowing inner core block.
- **UX / User Flows (`CAT // 04`)**: Golden node network with dimensional connector bridges and orbiting points.
- **Color / Typography (`CAT // 08`)**: Dimensional golden "Aa" letterforms with isometric depth.
- **3D / Interactive Web (`CAT // 10`)**: Emerald wireframe isometric cube with spatial vertex points.
- **Iconography (`CAT // 22`)**: Faceted 3D emerald gemstone.
- **Frontend Animation (`CAT // 14`)**: Dimensional pink code window containing illuminated `< >` syntax brackets.

---

## Resource Card Architecture

Resource cards are structured into three intentional zones to ensure immediate scannability:

```text
┌────────────────────────────────────────────────────────┐
│ [CAT // 04]                                 [ ♡ Fav ]  │
│                                                        │
│                   RESOURCE PREVIEW                     │
│          (Screenshot or 3D Specimen Fallback)          │
│                                                        │
├────────────────────────────────────────────────────────┤
│ RESOURCE NAME                            [● Featured]  │
│ [ Favicon ] domain.com                                 │
│                                                        │
├────────────────────────────────────────────────────────┤
│ [TAG 1]  [+N]                             (i)    (↗)   │
└────────────────────────────────────────────────────────┘
```

1. **Zone 1 — Visual Preview (`aspect-[16/10]`)**:
   - **Predictable Geometry**: Fixed `16:10` aspect ratio with subtle `#F8FAFC` surface and `rounded-xl` corners. Eliminates layout shift during image loading.
   - **Image Handling**: Cover crop with subtle hover zoom (`scale-[1.03]`) on valid preview images.
   - **Systematic Fallback Artwork**: When screenshots are unavailable, renders category-themed pastel surfaces, radial blueprint grid patterns, monospace `CAT // {num}` tags, and centered 3D category icons with subtle hover buoyancy.
   - **Interactive Overlays**: Search match score badges (top-left) and favorite heart buttons with glass backdrops (top-right).

2. **Zone 2 — Identity**:
   - **Resource Name**: Strongest typographic element in bold navy (`#0B132B`, `text-[13px] sm:text-[13.5px]`, `line-clamp-1`) with aqua hover transition.
   - **Featured Marker**: Aqua specimen dot indicator.
   - **Resilient Favicon Badge**: 14×14px neutral container (`rounded-[3px] bg-slate-100 border border-slate-200/80`) with graceful single-letter fallback for missing or broken domain favicons.
   - **Domain Source**: Monospace metadata (`font-mono text-[10.5px] text-[#64748B]`).

3. **Zone 3 — Archive Metadata & Action Affordances**:
   - **Responsive Tag Truncation**: Shows 1 tag + count on mobile (`390px`) and up to 2 tags + count on desktop (`sm:`+), preventing horizontal label collisions.
   - **Specification Detail Link `(i)`**: Direct accessible link to internal `/resources/[slug]` view.
   - **External Link Affordance `(↗)`**: `ArrowUpRight` icon with smooth directional hover translation.

---

## Responsive Design & Breakpoints

The responsive layout strategy is verified across standard screen dimensions:

- **Mobile (`390 × 844`)**: 2-column resource grid with compact single-tag display, full touch targets, and collision-proof header navigation.
- **Adaptive Brand Title**: The center brand wordmark compresses to `VAULT` on screens `< 1200px` to prevent collisions with navigation controls, while displaying full `DESIGN RESOURCE VAULT` on screens `≥ 1200px`. The brand emblem remains mathematically centered to the viewport across all widths.
- **Tablet Portrait (`768 × 1024`)**: 2-to-3 column grid with full metadata tags and accessible drawer navigation.
- **Tablet Landscape (`1024 × 768`)**: 3-column grid maintaining balanced preview proportions and comfortable whitespace.
- **Desktop Standard (`1280 × 800`)**: 4-column archive grid.
- **Desktop Wide (`1440 × 900`)**: 5-column archive grid with high density and spacious specimen frames.

---

## Interaction & Motion

Motion in the Design Resource Vault communicates hierarchy and physicality rather than decorative distraction:

- **Tactile Elevation**: Cards lift subtly (`translateY(-3px)`) on hover with smooth layered shadow expansion.
- **Preview Scaling**: Subtle `1.03x` preview scale and `translate-x-0.5 -translate-y-0.5` arrow translation.
- **GPU Easing**: Transitions run over `220–320ms` using `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`, instantaneously suppressing all scale and translation transforms.
- **Keyboard Focus**: Explicit focus rings (`ring-2 ring-[#00C4CC]`) across all interactive preview links, buttons, and form inputs.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **UI & Components**: React 19 Client & Server Components
- **Language**: TypeScript 5
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with inline token architecture
- **Motion**: [Framer Motion 12](https://www.framer.com/motion/) for header state, drawers, and modal transitions
- **Icons**: [Lucide React](https://lucide.dev/) and [Phosphor Icons](https://phosphoricons.com/)
- **3D & Graphics**: Three.js
- **State & Storage**: React Context API (`ResourceContext`, `UIContext`) paired with client-side local storage persistence
- **Verification Tooling**: Playwright for cross-viewport browser testing and visual validation

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

types/
└── index.ts                 # TypeScript interfaces and data model definitions
```

---

## Getting Started

### Prerequisites
- Node.js 18.18.0 or higher
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/25Pradnyesh/Design-Resource-Vault.git
   cd Design-Resource-Vault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts local Next.js development server with hot module reloading |
| `npm run build` | Compiles optimized static and server production build |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Executes ESLint validation across all project files |

---

## License

This project is open source and available under the [MIT License](LICENSE).
