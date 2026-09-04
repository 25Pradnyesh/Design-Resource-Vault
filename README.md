# Design Resource Vault

Design Resource Vault is a curated, visual-first archive for discovering and organizing high-quality design resources. Built as a permanent visual memory for designers, creative technologists, and frontend engineers, it replaces cluttered bookmarks and ephemeral link dumps with an architectural, edge-to-edge catalogue where every specimen is presented as a framed print. The visual identity is strictly editorial, archival, gallery-inspired, monochrome, architectural, typography-led, edge-to-edge, and intentionally restrained.

---

## What It Is

Designers collect huge numbers of resources, references, inspiration sites, tools, and visual systems across their projects, but discovery quickly becomes fragmented and difficult to revisit. Bookmarks lack visual hierarchy, browser tabs get lost, and unstructured notes bury valuable work.

Design Resource Vault solves this problem as a curated archive designed specifically around discovery, classification, and visual reference. It treats digital craft not as throwaway bookmark fodder, but as archival specimens catalogued for sustained study, contextual rediscovery, and daily professional reference.

---

## Design Philosophy

The visual system of Design Resource Vault intentionally rejects conventional SaaS dashboards, AI startup landing pages, colorful marketing components, and generic resource marketplaces. The interface recedes completely into an achromatic architectural canvas so the creative work itself leads.

- **Museum & Archive Metaphor**: The interface functions as a physical exhibition catalogue or gallery archive rather than a commercial web software application.
- **Editorial Composition**: Strict baseline grid alignment, generous deliberate whitespace, and disciplined hierarchy structure every view.
- **Continuous Grid**: The two-column 50/50 grid lattice runs edge-to-edge with no centered container wrapper or artificial max-width constraints, framed at the top and bottom by 1px solid black viewport rules.
- **Framed-Print Resource Cards**: Cards butt directly against each other with zero gap, sharing 1px hairlines. Each card features 45px padding on all sides, a category label at the top-left, a project title set in whisper weight 200, and a year timestamp anchored at the bottom-right.
- **Edge-to-Edge Layout**: Full viewport bleed maximizes visual reference immersion without arbitrary gutters.
- **Monochrome UI**: The chrome is strictly achromatic (`#eaeaea` canvas, `#f0f0f0` card surface, `#d8d8d8` hairlines, `#000000` typographic ink, and `#ffffff` paper drawer surfaces). Color is strictly isolated to the resource media itself.
- **Whisper-Weight Typography**: Set exclusively in Inter with ultra-light weights (200 for headlines, 300 for body/captions, and 400 for rare emphasis). Standard bold and semibold weights (500–900) are intentionally eliminated.
- **1px Hairlines**: Structural 1px hairlines define all boundaries, dividing lines, and card perimeters—never decorative outlines.
- **Zero-Radius Geometry**: Universal 0px border radius across all elements—cards, buttons, inputs, tags, drawers, and modal dialogs feature razor-sharp corners.
- **Zero Shadows**: All drop shadows, box shadows, and fake elevations are eliminated. Visual depth is established purely through 1px structural hairlines, tonal contrast, and typographic proportions.
- **Deliberate Whitespace**: Spacious 45px internal padding and proportional margins establish an unhurried, contemplative rhythm.
- **Restrained Use of Visual Artwork**: Imagery and WebGL graphics are deployed as deliberate compositional counterpoints rather than ambient decorative filler.

---

## Features

All features listed below are verified and implemented in the repository:

### Discovery
- **Curated Resource Archive**: 88 verified digital craft specimens across design systems, WebGL, typography, motion, and creative tools.
- **Category Browsing**: Dedicated taxonomy route (`/categories/[slug]`) with in-category filtering, descriptions, and adjacent taxonomy recommendations.
- **Search**: Fast catalogue search indexing resource titles, root domains, tags, categories, technologies, and styles.
- **Intelligent Search & Intent Matching**: Multi-signal scoring engine (`lib/search.ts`) with intent parsing (`lib/search-intent.ts`) that extracts semantic intent and adjacent discovery paths from natural queries.
- **Filtering**: Architectural taxonomy matrix covering all 22 categories, creative technologies (WebGL, Three.js, React, Tailwind CSS, GLSL Shaders, Canvas), aesthetic styles (Brutalist, Minimalist, 3D / Spatial, Dark Mode, Kinetic Motion, Editorial), and operational purposes.
- **Related Resources**: Algorithmic relatedness engine (`lib/related.ts`) that computes shared categories, tags, technologies, and styles to suggest contextually adjacent resources.

### Personal Organization
- **Favorites / Starred Resources**: Bookmark resources into a personal collection accessible at `/favorites`, complete with independent search and filtering.
- **Recently Viewed**: Automatic history tracking on `/recently-viewed` recording specimens inspected across active browser sessions.
- **Recently Added**: Chronological archive feed on `/recently-added` sorted by specimen indexing date.
- **Local-First Persistence**: User collections, favorites, and viewing history are stored client-side via `localStorage` with zero account barriers or tracking.

### Resource Management
- **Resource Detail Pages**: Dedicated specimen view (`/resources/[slug]`) featuring 4-Quadrant architectural specifications (*What It Does*, *Why To Use It*, *When To Use It*, *How To Use It*), technical metadata, and adjacent discoveries.
- **Custom Resource Creation**: Manual ingestion modal (`AddResourceModal`) to catalogue custom resources with categories, tags, and architectural specifications.
- **Resource Ingestion via URL**: Automated URL analyzer (`AddByUrlModal`) that parses domain references and pre-fills taxonomy tags and descriptions.
- **Editing & Deleting Resources**: In-place edit and delete capabilities for custom user-created resources with immediate state updates.
- **Resource Metadata**: Comprehensive multi-axial metadata capturing categories, tags, purpose, technologies, and aesthetic styles.
- **Categorization and Tagging**: Multi-tag classification system allowing overlapping assignments across disciplines.

### Navigation
- **Minimal Archive Index**: Top and bottom 1px solid black viewport framing rules, paired with an unobtrusive two-line hamburger trigger in the top-right corner that opens an architectural paper drawer (`#ffffff`).
- **Command Menu (`⌘K` / `Ctrl+K`)**: Keyboard-first search modal (`CommandMenu`) with arrow key navigation (`↑`/`↓`/`↵`) and instant slug routing.
- **Quick Inspector**: Slide-over drawer (`QuickInspectDrawer`) allowing rapid inspection of a specimen's 4-Quadrant specifications without losing grid position.

---

## Resource Architecture

The data architecture is defined in `types/index.ts`. Every specimen follows a strict TypeScript model:

```typescript
export interface Resource {
  id: string;                      // Unique slug identifier (e.g. "bruno-simon")
  slug: string;                    // URL-safe routing path
  name: string;                    // Specimen display title
  url: string;                     // Canonical external website URL
  description: string;             // Concise curatorial summary
  whatItDoes: string;              // Architectural Quadrant 1
  whyUseIt: string;                // Architectural Quadrant 2
  whenToUseIt: string;             // Architectural Quadrant 3
  howToUseIt: string;              // Architectural Quadrant 4
  categories: string[];            // Canonical category IDs
  tags: string[];                  // Curated indexing tags
  purpose: string;                 // Primary operational use case
  featured: boolean;               // Editorial spotlight status
  isUserAdded?: boolean;           // Flag identifying client-created specimens
  previewImage?: string;           // Optional asset path or screenshot reference
  technologies?: string[];         // Creative technology stack identifiers
  styles?: string[];               // Aesthetic design language classifications
  visualKeywords?: string[];       // Visual indexing tokens
  relatedResourceIds?: string[];   // Explicit relation overrides
  createdAt: string;               // ISO 8601 creation timestamp
  updatedAt: string;               // ISO 8601 update timestamp
  viewCount?: number;              // Session view frequency counter
}
```

### Important Metadata Fields

- **name**: The primary specimen title and brand/studio identity.
- **URL**: The canonical destination link to the original resource or experience.
- **description**: A concise curatorial overview summarizing the resource's creative importance and utility.
- **whatItDoes** *(Quadrant 1)*: Functional breakdown detailing what the resource produces, facilitates, or demonstrates.
- **why to use it** (`whyUseIt` - *Quadrant 2*): The rational justification and competitive creative edge provided by the resource.
- **when to use it** (`whenToUseIt` - *Quadrant 3*): Concrete project scenarios and design phases where this specimen is most effectively applied.
- **how to use it** (`howToUseIt` - *Quadrant 4*): Practical workflows, implementation advice, and step-by-step guidance for integrating the resource.
- **categories**: Multi-category taxonomy mapping assigning the specimen to one or more curated design disciplines.
- **tags**: Fine-grained indexing tags for search discovery and thematic filtering.
- **purpose**: Controlled operational classification (Inspiration, Reference, Tool, Asset, Template, Component, Design System, Learning, AI, Development).
- **featured status** (`featured`): Editorial boolean indicating whether the specimen is spotlighted in curated showcase sections.
- **preview image** (`previewImage`): Path or URL to high-fidelity visual documentation of the specimen.
- **technologies**: Stack identifiers documenting code frameworks and libraries (e.g., WebGL, Three.js, React, Tailwind CSS, GLSL Shaders, Canvas).
- **styles**: Aesthetic classifications cataloguing design languages (e.g., Brutalist, Minimalist, 3D / Spatial, Dark Mode, Kinetic Motion, Editorial).
- **visual keywords** (`visualKeywords`): Micro-aesthetic visual descriptors capturing lighting, typography, and layout nuances.
- **related resources** (`relatedResourceIds`): Explicit relationship mappings linking to complementary specimens across the archive.
- **timestamps** (`createdAt`, `updatedAt`): ISO 8601 dates recording the initial indexing date and recent edits.
- **view count** (`viewCount`): Numeric frequency tracking how often a specimen's specifications have been inspected in active sessions.

---

## Categories

The archive classifies 88 specimens across **22 verified categories** organized into **4 macro disciplines** (`data/categories.ts`):

### 1. Inspiration & Web (6 Categories)
- **UI / Web Inspiration** (`ui-web-inspiration`): Curated web and interface design inspiration.
- **Landing Page Inspiration** (`landing-page-inspiration`): High-quality landing page references and conversion patterns.
- **SaaS / Product Design** (`saas-product-design`): SaaS dashboards, product UI, and growth design.
- **Portfolio Inspiration** (`portfolio-inspiration`): Benchmark portfolios and interactive developer showcases.
- **Award-Winning / Experimental Web** (`award-winning-experimental`): Boundary-pushing web design, digital art direction, and experimental interfaces.
- **Creative / Advertising** (`creative-advertising`): Digital campaigns, agency showcases, and interactive brand experiences.

### 2. Interaction & Motion (5 Categories)
- **Website Animation Inspiration** (`website-animation-inspiration`): Animated websites and motion-rich digital experiences.
- **Animation / Motion Tools** (`animation-motion-tools`): Tools for creating, authoring, and exporting motion design.
- **Frontend Animation** (`frontend-animation`): Creative coding animation libraries and web motion frameworks.
- **3D / Interactive Web** (`3d-interactive-web`): Three.js, WebGL, shaders, and spatial web environments.
- **Backgrounds / Visual Effects** (`backgrounds-visual-effects`): Dynamic canvas shaders, geometric particles, and generative backgrounds.

### 3. Visual Systems & Assets (6 Categories)
- **UI Components** (`ui-components`): Reusable UI component libraries, design systems, and code patterns.
- **Color / Typography** (`color-typography`): Color palettes, type specimen foundries, and visual foundation utilities.
- **Visual Assets** (`visual-assets`): High-craft textures, 3D elements, graphic kits, and visual assets.
- **ICONOGRAPHY** (`iconography`): Curated open-source, 3D, animated, brand, and specialty icon systems.
- **Mockups / Presentation** (`mockups-presentation`): Device frames, presentation kits, and portfolio staging mockups.
- **Visual Search / Moodboarding** (`visual-search-moodboarding`): Visual discovery platforms, reference boards, and moodboarding tools.

### 4. Product & Engineering (5 Categories)
- **UX / User Flows** (`ux-user-flows`): Real-world user flows, onboarding breakdowns, and product UX teardowns.
- **UI / UX Prototyping** (`ui-ux-prototyping`): Prototyping software, interaction recorders, and user testing platforms.
- **AI Design / Vibe Coding** (`ai-design-vibe-coding`): AI-assisted design systems, generative UI builders, and agentic coding workflows.
- **Design Workflow** (`design-workflow`): Hand-off utilities, keyboard shortcut tools, and design productivity resources.
- **Learning / Vibe Coding** (`learning-vibe-coding`): Creative coding courses, shader workshops, tutorials, and technical blogs.

---

## Design System

The visual design system is governed by strict tokens defined in [DESIGN.md](file:///d:/Design%20Resouce%20Vault/DESIGN.md) and applied globally:

| Token | Value | Description / Role |
|---|---|---|
| **Canvas** | `#eaeaea` | Warm concrete page background |
| **Card Surface** | `#f0f0f0` | Bone card interior surface |
| **Hairline** | `#d8d8d8` | 1px structural dividing lines and shared card perimeters |
| **Text** | `#000000` | Obsidian typographic ink and viewport framing rules |
| **Paper** | `#ffffff` | Navigation drawer, modal surfaces, and active tags |
| **Display Weight** | `200` | Extra-light whisper weight for display titles |
| **Body Weight** | `300` | Light weight for body copy, category labels, and timestamps |
| **Emphasis Weight** | `400` | Regular weight reserved for rare structural emphasis |
| **Display Size** | `38px` | Primary headline scale with line-height 1.00 |
| **Subheading** | `21px` | Section header scale with line-height 1.31 |
| **Body / UI** | `16px` | Standard interface copy and metadata scale |
| **Card Radius** | `0px` | Universal sharp corners across all elements |
| **Shadow** | `none` | Zero box-shadow or artificial drop-shadow elevation |
| **Card Padding** | `45px` | Generous internal margin framing every specimen card |

---

## Tech Stack

The application is built on modern, production-grade web technologies:

- **Next.js**: [Next.js 15.2 (App Router)](https://nextjs.org/) for server-rendered page routing, metadata handling, and optimized static generation.
- **React**: [React 19](https://react.dev/) utilizing client components and responsive hooks.
- **TypeScript**: [TypeScript 5](https://www.typescriptlang.org/) for complete type safety across schemas, filters, and state contexts.
- **Tailwind CSS**: [Tailwind CSS v4](https://tailwindcss.com/) using modern CSS variable integration and universal hairline layout utilities.
- **Framer Motion**: [Framer Motion 12](https://www.framer.com/motion/) powering restrained drawer transitions and modal physics.
- **Icon Libraries**: [Lucide React](https://lucide.dev/) for minimal geometric iconography across navigation, actions, and quadrants.
- **Three.js**: [Three.js (0.185)](https://threejs.org/) powering interactive WebGL geometric fields and ambient background canvases.
- **Playwright**: [Playwright 1.62](https://playwright.dev/) for automated multi-viewport responsive testing across 5 standard viewport resolutions.
- **ESLint**: [ESLint 9](https://eslint.org/) with Next.js core web vitals and strict linting rules.

---

## Project Structure

```text
app/
├── categories/[slug]/           # Category archive routes
├── favorites/                   # Starred personal collection
├── recently-added/              # Chronological archive feed
├── recently-viewed/             # Session history view
├── resources/[slug]/            # Specimen detail & 4-Quadrant matrix
├── globals.css                  # Strict monochrome design tokens & zero-radius rules
├── layout.tsx                   # Root layout with Inter font and AppShell
├── not-found.tsx                # Minimalist 404 specimen page
└── page.tsx                     # Homepage: Edge-to-edge curated archive
components/
├── add-resource/                # Manual creation & URL draft ingestion modals
├── command-menu/                # ⌘K keyboard search palette
├── filters/                     # Structural taxonomy matrix & active tags
├── layout/                      # Viewport framing rules, app shell, and footer
├── resource-card/               # Framed print resource card (45px padding, 38px/200 title)
├── resource-detail/             # Specimen detail view & quick inspect drawer
├── resource-grid/               # Edge-to-edge continuous 50/50 lattice grid
├── sidebar/                     # Architectural paper drawer (INDEX)
├── ui/                          # Zero-radius primitives (Button, Input, Modal, Badge)
└── webgl/                       # Interactive Three.js canvas scenes
data/
├── categories.ts                # 22 design disciplines across 4 macro groups
└── resources.ts                 # 88 curated digital craft specimens
lib/
├── related.ts                   # Algorithmic relatedness engine
├── resource-context.tsx         # State management, local-first store & analytics
├── search.ts                    # Multi-signal search scoring
├── search-intent.ts             # Query intent parser & adjacent paths
├── storage.ts                   # LocalStorage abstraction
└── ui-context.tsx               # Global modal & drawer UI state
scripts/
└── test-responsive-audit.mjs    # 5-viewport Playwright audit & screenshot suite
screenshots/                     # Multi-viewport audit screenshot captures
types/
└── index.ts                     # TypeScript interfaces & Resource schema
DESIGN.md                        # Strict visual design specification
package.json                     # Project dependencies & verification scripts
tsconfig.json                    # TypeScript configuration
```

---

## Getting Started

### Prerequisites
- Node.js 18.17 or newer
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
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the archive.

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
