<div align="center">

# DESIGN RESOURCE VAULT

**A curated, visual-first archive for discovering and organizing high-quality design resources.**

<br />

[![Next.js](https://img.shields.io/badge/Next.js-15.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<br />

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Visual-First Archive  ·  Curated Taxonomies  ·  Command Palette (⌘K)       │
│  Multi-Filter Matrix   ·  Persistent Chrome   ·  Client-Side Persistence    │
└─────────────────────────────────────────────────────────────────────────────┘
```

</div>

---

## Overview

**Design Resource Vault** is a curated visual archive engineered for fast design discovery and reference organization. Built to replace fragmented bookmarks and unorganized browser tabs, the Vault provides an editorial, structured environment for exploring benchmarks, UI components, motion patterns, typography, and creative development resources.

The interface prioritizes immediate visual recognition over generic list views, combining deterministic previews, rich taxonomy classification, and real-time faceted search into a cohesive design-tool experience.

```
                    ┌─────────────────────────┐
                    │        DISCOVER         │
                    │ Search · Filter · Cmd+K │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │         INSPECT         │
                    │ Visual Previews · Specs │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      SAVE & CURATE      │
                    │ Favorites · Collections │
                    └─────────────────────────┘
```

---

## Core Features

### Visual Resource Archive
A high-density, visual-first catalog for exploring curated design resources. Each entry displays live favicons, visual screenshot previews, domains, category indicators, and structured operational metadata.

### Structured Category Taxonomy
Resources are organized across specialized design domains to enable systematic browsing:
- **Inspiration & Web**: UI / Web Inspiration, Landing Page Inspiration, SaaS / Product Design, Portfolio Inspiration, Award-Winning & Experimental Web, Creative & Advertising.
- **Interaction & Motion**: Website Animation Inspiration, Animation & Motion Tools, Frontend Animation, 3D & Interactive Web, Backgrounds & Visual Effects.
- **Visual Systems & Assets**: UI Components, Color & Typography, Visual Assets, Iconography, Mockups & Presentation, Visual Search & Moodboarding.
- **Product & Engineering**: UX & User Flows, UI / UX Prototyping, AI Design & Prototyping, Design Workflow, Learning & Creative Coding.

### Global Search & Command Menu (`⌘K`)
Instant search across resource titles, domains, descriptions, tags, and categorized purposes. Accessible globally via the header search pill or the `⌘K` / `Ctrl+K` keyboard shortcut.

### Multi-Category Filtering
- **Multi-Category Selection**: Select multiple categories simultaneously using OR logic.
- **Integrated Querying**: Search queries and category filters operate concurrently.
- **Active Filter Chips**: Visual tags for all currently applied filters with one-click individual dismissal.
- **Clear All**: Instant reset of all active query parameters and filter selections.
- **Dynamic Counters**: Live item count indicators across active views and categories.

### Favorites & Bookmarking
Save entries to a personal collection with one-click bookmarking. Starred items persist locally in the client and are accessible via the dedicated `/favorites` view.

### Resource Submission Workflows
- **Manual Submission (`AddResourceModal`)**: Direct form submission with title, domain, description, category assignment, and tag associations.
- **URL Metadata Analyzer (`AddByUrlModal`)**: In-browser URL importer that parses domains, suggests contextual categories, and formats metadata boilerplate.

### Responsive UI Architecture
Engineered for fluid operation across 390px mobile viewports, tablets, and wide desktop displays with zero layout shift and touch-friendly controls.

### Art-Directed Interface
Layered ambient background lighting, custom category iconography, restrained motion transitions, and an editorial typographic hierarchy tailored for creative reference.

---

## Global Header & Navigation Chrome

The header operates as a permanent design-system chrome element floating above the page across all application routes.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [MENU]             (●) DESIGN RESOURCE VAULT             [♥ 0] [Search ⌘K] [+] │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **True Viewport Centering**: The brand title and multi-color iris logo remain mathematically centered relative to the viewport (`50%`), independent of dynamic left or right control widths.
- **3-State Scroll Blending**:
  - **Top of Page (`scrollY: 0–24px`)**: Clearly visible, crisp application chrome (`bg-white/85`, subtle border, `backdrop-blur-[12px]`).
  - **Light Scroll (`scrollY: 24–120px`)**: Smoothly steps down visual prominence (`bg-white/50`, `backdrop-blur-[10px]`).
  - **Deep Scroll (`scrollY > 120px`)**: Visually dissolves into the page (`bg-white/[0.18]`, `backdrop-blur-[6px]`, borderless). The underlying hero artwork and content dominate while the header remains persistent and functional.
- **Interactive Iris Logo**: Multi-color geometric wheel with a smooth 180° hover rotation.
- **Integrated Controls**: Quick-access drawer trigger (`MENU`), live favorites counter, command search shortcut, and primary `ADD` action.

---

## Design System & Aesthetics

Design Resource Vault follows an editorial, design-tool aesthetic emphasizing visual clarity, tactile micro-interactions, and controlled contrast.

### Curated Color Direction
The color palette uses fresh canvas surfaces, crisp deep-navy typography, and warm, energetic accent tones:
- **Canvas & Surface**: Crisp white (`#FFFFFF`), subtle slate canvas (`#F8FAFC`), and neutral border lines (`#E2E8F0`).
- **Typography**: Deep navy / slate ink (`#0B132B`, `#334155`, `#64748B`).
- **Accent Family**: Electric Aqua (`#00C4CC`), Mint (`#10B981`), Emerald (`#059669`), Warm Yellow (`#FBBF24`), Orange (`#FB923C`), Coral (`#FA5252`), and Rose (`#F43F5E`).
- **Strict Color Restraint**: The design system strictly excludes purple, violet, indigo, lavender, and blue-dominant gradient treatments to maintain a distinct, warm-editorial brand identity.

---

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack, React 19)
- **UI & Logic**: React 19 Client & Server Components
- **Type Safety**: TypeScript 5
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with inline token architecture
- **Motion**: [Framer Motion 12](https://www.framer.com/motion/) for fluid transitions, modals, and drawers
- **Iconography**: [Lucide React](https://lucide.dev/) & [Phosphor Icons](https://phosphoricons.com/)
- **Media**: Next/Image optimization and deterministic SVG blueprint fallbacks
- **State & Storage**: React Context API (`ResourceContext`, `UIContext`) paired with client-side persistence (`StorageAdapter`)

---

## Project Structure

```text
app/
├── categories/[slug]/       # Dedicated category browsing pages
├── favorites/               # Starred user collection view
├── recently-added/          # Chronological resource additions
├── recently-viewed/         # Session browsing history
├── resources/[slug]/        # Detailed resource specification view
├── globals.css              # Tailwind v4 theme tokens and global styles
├── layout.tsx               # Root layout and metadata configuration
├── not-found.tsx            # Custom 404 handler
├── page.tsx                 # Main archive hero and resource grid experience
└── providers.tsx            # Context providers wrapper

components/
├── add-resource/            # Resource creation and URL importer modals
├── archive/                 # Hero section, category grid, and featured tiles
├── command-menu/            # Global ⌘K search palette
├── dashboard/               # Metric overviews and statistics
├── filters/                 # Multi-faceted filter bar, sorters, and active chips
├── layout/                  # Persistent AppShell, header, drawer, and footer
├── resource-card/           # Resource cards with image previews and fallbacks
├── resource-detail/         # Specification views and metadata inspectors
├── resource-grid/           # Responsive CSS resource grid and empty states
├── sidebar/                 # Taxonomy index navigation drawer
├── ui/                      # Base primitives (Badge, Button, Input, Modal)
└── webgl/                   # Ambient canvas effects and interactive visual planes

data/
├── categories.ts            # Category taxonomy definitions and grouping helpers
└── resources.ts             # Curated seed resource database

lib/
├── related.ts               # Taxonomy similarity recommendation engine
├── resource-context.tsx     # Reactive resource and favorites state
├── search-intent.ts         # Natural language query intent parser
├── search.ts                # Multi-attribute scoring and search algorithms
├── storage.ts               # Local-first storage adapter layer
├── theme-context.tsx        # UI theme context
├── ui-context.tsx           # Global drawer, command menu, and modal state
└── utils.ts                 # Class merging and helper utilities

types/
└── index.ts                 # TypeScript type definitions and interfaces
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

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Boots local Next.js development server with hot module reloading |
| `npm run build` | Compiles optimized static and server production build |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Executes ESLint validation across all project files |

---

## License

This project is open source and available under the [MIT License](LICENSE).
