# Design Resource Vault

Design Resource Vault is an editorial, curated visual archive created to bring clarity and physical museum restraint to the discovery and organization of high-quality digital design references. Built as a permanent visual memory for creative craftspeople, it replaces cluttered bookmarks and ephemeral link dumps with an architectural, edge-to-edge catalogue where every entry is presented as a framed print.

---

## What It Is

Designers and creative technologists accumulate hundreds of references, websites, animation studies, component libraries, and tools across projects. However, discovery quickly becomes fragmented: bookmarks lack visual hierarchy, browser tabs get lost, and unstructured notes bury valuable work.

Design Resource Vault solves this with an intentional curatorial archive engineered around focused discovery, strict taxonomy classification, and in-depth visual reference. It treats digital craft not as throwaway content, but as archival specimens catalogued for sustained study and daily professional reference.

---

## Design Philosophy

The visual layer of Design Resource Vault intentionally rejects conventional SaaS dashboards, pastel UI templates, glassmorphism, and startup marketing patterns. The interface recedes completely so the work itself leads.

- **Museum & Archive Metaphor**: The interface behaves like a gallery catalogue or architectural exhibition rather than a software tool.
- **Editorial Composition**: Clean typography, strict baseline rhythm, and generous deliberate whitespace anchor every page.
- **Continuous Edge-to-Edge Grid**: The two-column 50/50 grid lattice runs edge-to-edge with no centered wrapper or artificial max-width constraints, framed top and bottom by 1px solid black viewport rules.
- **Framed-Print Resource Cards**: Cards butt directly against each other, sharing 1px hairlines. Each card features 45px padding, a category label at the top-left, project title in whisper weight 200, and a year timestamp anchored at the bottom-right.
- **Monochrome UI**: The chrome is strictly achromatic (`#eaeaea` canvas, `#f0f0f0` card surface, `#d8d8d8` hairlines, `#000000` ink, and `#ffffff` paper drawer surfaces). Color is permitted only inside actual resource artwork.
- **Whisper-Weight Typography**: Set exclusively in Inter with ultra-light weights (200 for headlines, 300 for body/captions, 400 for rare emphasis). Semibold and bold weights (500–900) are eliminated.
- **Zero-Radius Geometry**: All elements—cards, buttons, inputs, tags, dialogs, and drawers—feature sharp 0px corners (`border-radius: 0`).
- **Zero Shadows**: Depth is established exclusively through 1px structural hairlines, spacing, and typographic proportion—never through elevation or drop shadows.
- **Restrained Artwork**: Imagery is used sparingly as deliberate compositional counterpoints rather than ambient decoration.

---

## Features

All features documented below are implemented and verified in the repository:

### Discovery
- **Curated Resource Archive**: 88 verified digital craft specimens across design systems, WebGL, typography, motion, and creative tools.
- **Category Browsing**: Dedicated taxonomy route (`/categories/[slug]`) with in-category search, descriptions, and adjacent taxonomy recommendations.
- **Catalogue Search**: Direct text search indexing resource names, root domains, tags, categories, technologies, and styles.
- **Intelligent Search & Intent Matching**: Multi-signal scoring engine (`lib/search.ts`) with intent parsing (`lib/search-intent.ts`) that extracts adjacent discovery concepts from natural-language queries.
- **Structural Taxonomy Filters**: Collapsible architectural matrix covering all 22 categories, technologies (WebGL, Three.js, React, Tailwind CSS, GLSL Shaders, Canvas), and aesthetic styles (Brutalist, Minimalist, 3D / Spatial, Dark Mode, Kinetic Motion, Editorial).
- **Related Specimens**: Algorithmic relatedness engine (`lib/related.ts`) that scores shared tags, technologies, and categories to surface contextually relevant specimens.

### Personal Organization
- **Starred Favorites**: Save resources to a personal collection accessible at `/favorites`, complete with independent filtering and search.
- **Recently Viewed**: Automatic history tracking on `/recently-viewed` recording specimens inspected across active browser sessions.
- **Recently Added**: Chronological archive feed on `/recently-added` sorted by initial indexing date.
- **Local-First Persistence**: Favorites and viewing history are stored client-side in `localStorage` without tracking or authentication barriers.

### Resource Management
- **Resource Detail Pages**: Dedicated specimen view (`/resources/[slug]`) featuring 4-Quadrant architectural specifications (*What It Does*, *Why Use It*, *When To Use It*, *How To Use It*), technical metadata, and adjacent discoveries.
- **Custom Resource Creation**: Manual ingestion modal (`AddResourceForm`) to catalogue new resources with categories, tags, and architectural specifications.
- **URL Metadata Import**: In-browser URL draft analyzer (`AddByUrlModal`) that parses domain references and suggests contextual taxonomy tags.
- **Resource Modification**: Editing and deletion actions for custom user-added resources with immediate state updates.

### Navigation
- **Minimalist Framing & Hamburger**: Top and bottom 1px solid black framing rules, with an unobtrusive two-line hamburger button in the top-right corner.
- **Architectural Index Drawer**: Slide-out paper drawer (`#ffffff`) providing direct access to primary navigation, quick search, specimen creation, and all 22 categorized taxonomies.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-first search modal (`CommandMenu`) with keyboard navigation (`↑`/`↓`/`↵`) and instant slug routing.
- **Quick Inspect Drawer**: Slide-over specification drawer (`QuickInspectDrawer`) to review full architectural quadrant details without leaving the current view.

---

## Resource Architecture

The application data model is defined in `types/index.ts`. Every specimen follows a structured schema:

```typescript
export interface Resource {
  id: string;                      // Unique identifier (e.g. "bruno-simon")
  slug: string;                    // URL-safe routing slug
  name: string;                    // Specimen display title
  url: string;                     // Canonical external URL
  description: string;             // Concise curatorial summary
  whatItDoes: string;              // Architectural Quadrant 1
  whyUseIt: string;                // Architectural Quadrant 2
  whenToUseIt: string;             // Architectural Quadrant 3
  howToUseIt: string;              // Architectural Quadrant 4
  categories: string[];            // Primary and secondary category IDs
  tags: string[];                  // Curated indexing tags
  purpose: string;                 // Primary use case descriptor
  featured: boolean;               // Editorial spotlight status
  isUserAdded?: boolean;           // Flag for client-created custom resources
  previewImage?: string;           // Optional image reference
  technologies?: string[];         // Tech stack (e.g. ["WebGL", "Three.js"])
  styles?: string[];               // Aesthetic styles (e.g. ["Brutalist", "3D / Spatial"])
  visualKeywords?: string[];       // Visual indexing tokens
  relatedResourceIds?: string[];   // Explicit relation overrides
  createdAt: string;               // ISO 8601 creation timestamp
  updatedAt: string;               // ISO 8601 update timestamp
  viewCount?: number;              // Session view frequency counter
}
```

---

## Categories

The archive organizes 88 specimens across **22 specialized design taxonomies** grouped into 4 macro disciplines (`data/categories.ts`):

### 1. Inspiration & Web (6)
- **UI / Web Inspiration** (`ui-web-inspiration`): Curated web and interface design inspiration.
- **Landing Page Inspiration** (`landing-page-inspiration`): High-quality landing page references and patterns.
- **SaaS / Product Design** (`saas-product-design`): SaaS dashboards, product UI, and growth design.
- **Portfolio Inspiration** (`portfolio-inspiration`): Benchmark portfolios and interactive personal showcases.
- **Award-Winning / Experimental** (`award-winning-experimental`): Boundary-pushing web design and digital art direction.
- **Creative / Advertising** (`creative-advertising`): Digital campaigns, creative agencies, and brand experiences.

### 2. Interaction & Motion (5)
- **Website Animation Inspiration** (`website-animation-inspiration`): Animated websites and motion-rich experiences.
- **Animation / Motion Tools** (`animation-motion-tools`): Tools for creating and managing motion design.
- **Frontend Animation** (`frontend-animation`): Creative development libraries and motion frameworks.
- **3D / Interactive Web** (`3d-interactive-web`): Three.js, WebGL, shaders, and spatial web experiences.
- **Backgrounds / Visual Effects** (`backgrounds-visual-effects`): Dynamic canvas shaders, geometric fields, and canvas backgrounds.

### 3. Visual Systems & Assets (6)
- **UI Components** (`ui-components`): Reusable UI components, design systems, and code patterns.
- **Color / Typography** (`color-typography`): Color palettes, type specimen foundries, and visual foundations.
- **Visual Assets** (`visual-assets`): High-craft textures, 3D elements, gradients, and graphic assets.
- **Iconography** (`iconography`): Open-source, 3D, animated, and specialty icon sets.
- **Mockups / Presentation** (`mockups-presentation`): Device frames, presentation kits, and staging mockups.
- **Visual Search / Moodboarding** (`visual-search-moodboarding`): Visual curation, board curation, and moodboard tools.

### 4. Product & Engineering (5)
- **UX / User Flows** (`ux-user-flows`): User flows, onboarding breakdowns, and product UX patterns.
- **UI / UX Prototyping** (`ui-ux-prototyping`): Prototyping tools, interaction recorders, and testing suites.
- **AI Design / Vibe Coding** (`ai-design-vibe-coding`): Generative interface builders and agentic coding workflows.
- **Design Workflow** (`design-workflow`): Hand-off utilities, documentation generators, and workflow tools.
- **Learning / Vibe Coding** (`learning-vibe-coding`): Tutorials, creative coding courses, and shader workshops.

---

## Design System

The application is styled with strict custom tokens defined in [DESIGN.md](file:///d:/Design%20Resouce%20Vault/DESIGN.md) and compiled through Tailwind CSS v4 in `app/globals.css`:

| Token | CSS Variable | Value | Role |
|---|---|---|---|
| **Warm Concrete** | `--color-warm-concrete` | `#eaeaea` | Page canvas background |
| **Bone** | `--color-bone` | `#f0f0f0` | Card interior surface |
| **Hairline** | `--color-hairline` | `#d8d8d8` | 1px structural dividers and shared card borders |
| **Obsidian** | `--color-obsidian` | `#000000` | Typographic ink and viewport framing rules |
| **Paper** | `--color-paper` | `#ffffff` | Navigation drawer, modal surfaces, and active tags |

### Typography Scale

| Role | Font Family | Size | Weight | Line Height |
|---|---|---|---|---|
| **Display** | Inter | `38px` | `200` (Extra Light) | `1.00` |
| **Subheading** | Inter | `21px` | `300` (Light) | `1.31` |
| **Body / UI** | Inter | `16px` | `300` (Light) | Normal / `1.6` |
| **Year / Caption** | Inter | `16px` | `300` (Light) | `2.37` |
| **Emphasis** | Inter | `14px`–`16px` | `400` (Regular) | Normal |

### Shape & Elevation
- **Border Radius**: `0px` universal across all elements (Cards, Buttons, Inputs, Tags, Dialogs, Menus).
- **Box Shadows**: `none` universal across all surfaces. Depth is established purely through 1px hairlines and contrast.
- **Card Padding**: `45px` on desktop/tablet (`24px` responsive on small mobile).

---

## Tech Stack

The application runs on modern, production-grade web technologies:

- **Framework**: [Next.js 15.2 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native CSS variables
- **Motion & Transitions**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing & Visual Audit**: [Playwright](https://playwright.dev/) with automated multi-viewport screenshot captures
- **Linting**: [ESLint 9](https://eslint.org/) with Next.js configuration

---

## Project Structure

```text
├── app/
│   ├── categories/[slug]/       # Category archive routes
│   ├── favorites/               # Starred personal collection
│   ├── recently-added/          # Chronological feed route
│   ├── recently-viewed/         # Session history route
│   ├── resources/[slug]/        # Specimen detail & 4-Quadrant matrix
│   ├── globals.css              # Strict monochrome design tokens & zero-radius rules
│   ├── layout.tsx               # Root layout with Inter font and AppShell
│   ├── not-found.tsx            # Minimalist 404 specimen page
│   └── page.tsx                 # Homepage: Edge-to-edge 50/50 curated archive
├── components/
│   ├── add-resource/            # Resource creation & URL draft modals
│   ├── command-menu/            # ⌘K keyboard search palette
│   ├── filters/                 # Structural taxonomy matrix & active tags
│   ├── layout/                  # Framing rules, app shell, and footer
│   ├── resource-card/           # Framed print resource card (45px padding, 38px/200 title)
│   ├── resource-detail/         # Specimen detail view & quick inspect drawer
│   ├── resource-grid/           # Edge-to-edge continuous 50/50 lattice grid
│   ├── sidebar/                 # Architectural paper drawer (INDEX)
│   └── ui/                      # Zero-radius primitives (Button, Input, Modal, Badge)
├── data/
│   ├── categories.ts            # 22 design disciplines across 4 macro groups
│   └── resources.ts             # 88 curated digital craft specimens
├── lib/
│   ├── related.ts               # Algorithmic relatedness engine
│   ├── resource-context.tsx     # State management, local-first store & analytics
│   ├── search.ts                # Multi-signal search scoring
│   ├── search-intent.ts         # Query intent parser & adjacent paths
│   ├── storage.ts               # LocalStorage abstraction
│   └── ui-context.tsx           # Global modal & drawer UI state
├── scripts/
│   └── test-responsive-audit.mjs# 5-viewport Playwright audit & screenshot suite
├── screenshots/                 # Multi-viewport audit screenshot captures
├── types/
│   └── index.ts                 # TypeScript interfaces & Resource schema
├── DESIGN.md                    # Strict visual design specification
├── package.json                 # Project dependencies & verification scripts
└── tsconfig.json                # TypeScript configuration
```

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or newer
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/25Pradnyesh/Design-Resource-Vault.git
cd "Design Resource Vault"

# Install dependencies
npm install
```

### Development
```bash
# Start the Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the archive.

### Verification Suite
```bash
# Verify TypeScript types
npm run typecheck

# Verify ESLint rules
npm run lint

# Build production bundle
npm run build

# Run Playwright responsive visual audit across 5 viewports
npm test
```
