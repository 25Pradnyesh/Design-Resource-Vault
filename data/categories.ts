import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "ui-web-inspiration",
    name: "UI / Web Inspiration",
    emoji: "🎨",
    slug: "ui-web-inspiration",
    description: "Curated web and interface design inspiration.",
  },
  {
    id: "landing-page-inspiration",
    name: "Landing Page Inspiration",
    emoji: "🖥️",
    slug: "landing-page-inspiration",
    description: "High-quality landing page references and patterns.",
  },
  {
    id: "saas-product-design",
    name: "SaaS / Product Design",
    emoji: "💼",
    slug: "saas-product-design",
    description: "SaaS dashboards, product UI, and growth design.",
  },
  {
    id: "ux-user-flows",
    name: "UX / User Flows",
    emoji: "🧠",
    slug: "ux-user-flows",
    description: "User flows, onboarding, and product UX patterns.",
  },
  {
    id: "website-animation-inspiration",
    name: "Website Animation Inspiration",
    emoji: "🌀",
    slug: "website-animation-inspiration",
    description: "Animated websites and motion-rich experiences.",
  },
  {
    id: "animation-motion-tools",
    name: "Animation / Motion Tools",
    emoji: "⚡",
    slug: "animation-motion-tools",
    description: "Tools for creating and managing motion design.",
  },
  {
    id: "ui-components",
    name: "UI Components",
    emoji: "🧩",
    slug: "ui-components",
    description: "Reusable UI components, libraries, and patterns.",
  },
  {
    id: "color-typography",
    name: "Color / Typography",
    emoji: "🎨",
    slug: "color-typography",
    description: "Color palettes, type systems, and visual foundations.",
  },
  {
    id: "backgrounds-visual-effects",
    name: "Backgrounds / Visual Effects",
    emoji: "🌊",
    slug: "backgrounds-visual-effects",
    description: "Backgrounds, gradients, and visual effect generators.",
  },
  {
    id: "3d-interactive-web",
    name: "3D / Interactive Web",
    emoji: "🧊",
    slug: "3d-interactive-web",
    description: "3D scenes, WebGL, and interactive web experiences.",
  },
  {
    id: "visual-assets",
    name: "Visual Assets",
    emoji: "🖼️",
    slug: "visual-assets",
    description: "Icons, illustrations, and visual asset libraries.",
  },
  {
    id: "mockups-presentation",
    name: "Mockups / Presentation",
    emoji: "📱",
    slug: "mockups-presentation",
    description: "Device mockups and presentation templates.",
  },
  {
    id: "ai-design-vibe-coding",
    name: "AI Design / Vibe Coding",
    emoji: "🤖",
    slug: "ai-design-vibe-coding",
    description: "AI-assisted design, prototyping, and vibe coding tools.",
  },
  {
    id: "frontend-animation",
    name: "Frontend Animation",
    emoji: "💻",
    slug: "frontend-animation",
    description: "Code-first animation libraries and techniques.",
  },
  {
    id: "visual-search-moodboarding",
    name: "Visual Search / Moodboarding",
    emoji: "🔍",
    slug: "visual-search-moodboarding",
    description: "Visual discovery, moodboards, and reference curation.",
  },
  {
    id: "award-winning-experimental",
    name: "Award-Winning / Experimental Web",
    emoji: "🏆",
    slug: "award-winning-experimental",
    description: "Award-winning and experimental web experiences.",
  },
  {
    id: "portfolio-inspiration",
    name: "Portfolio Inspiration",
    emoji: "👨‍🎨",
    slug: "portfolio-inspiration",
    description: "Designer and developer portfolio references.",
  },
  {
    id: "creative-advertising",
    name: "Creative / Advertising",
    emoji: "📣",
    slug: "creative-advertising",
    description: "Creative campaigns and advertising design.",
  },
  {
    id: "design-workflow",
    name: "Design Workflow",
    emoji: "🧰",
    slug: "design-workflow",
    description: "Workflow tools, shortcuts, and productivity resources.",
  },
  {
    id: "learning-vibe-coding",
    name: "Learning / Vibe Coding",
    emoji: "📚",
    slug: "learning-vibe-coding",
    description: "Tutorials, blogs, and learning resources.",
  },
  {
    id: "ui-ux-prototyping",
    name: "UI / UX Prototyping",
    emoji: "✏️",
    slug: "ui-ux-prototyping",
    description: "Prototyping tools for interface and UX design.",
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((c) => [c.id, c])
);

export function getCategoryById(id: string): Category | undefined {
  return categoryMap[id];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
