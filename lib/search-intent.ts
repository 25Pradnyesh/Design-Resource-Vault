import { SearchIntent, QueryParser } from "@/types";

const STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "by", "and", "or",
  "i", "need", "want", "looking", "find", "show", "me", "some", "best", "good",
  "resource", "resources", "tool", "tools", "website", "websites", "site", "sites", "app"
]);

// Curated Technology Vocabulary Matrix
const TECH_MAP: Record<string, string> = {
  webgl: "WebGL",
  threejs: "Three.js",
  "three.js": "Three.js",
  three: "Three.js",
  react: "React",
  nextjs: "Next.js",
  "next.js": "Next.js",
  next: "Next.js",
  gsap: "GSAP",
  framer: "Framer Motion",
  "framer motion": "Framer Motion",
  motion: "Motion",
  spline: "Spline",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  svg: "SVG",
  shader: "Shaders",
  shaders: "Shaders",
  glsl: "GLSL Shaders",
  canvas: "Canvas",
  html5: "HTML5",
  css: "CSS",
  css3: "CSS3",
  lottie: "Lottie",
  figma: "Figma",
  rive: "Rive",
  typescript: "TypeScript",
  ai: "AI",
  llm: "LLM",
};

// Curated Visual & Aesthetic Style Vocabulary Matrix
const STYLE_MAP: Record<string, string> = {
  brutalist: "Brutalist",
  brutalism: "Brutalist",
  minimal: "Minimalist",
  minimalist: "Minimalist",
  minimalism: "Minimalist",
  dark: "Dark Mode",
  "dark mode": "Dark Mode",
  darkmode: "Dark Mode",
  experimental: "Experimental",
  kinetic: "Kinetic Motion",
  "3d": "3D",
  spatial: "3D / Spatial",
  editorial: "Editorial",
  retro: "Retro / Y2K",
  y2k: "Retro / Y2K",
  clean: "Clean / Systematic",
  systematic: "Clean / Systematic",
  monochrome: "Monochrome",
  typography: "Typography-Heavy",
  typographic: "Typography-Heavy",
  glassmorphism: "Glassmorphic",
  glassmorphic: "Glassmorphic",
  neobrutalism: "Neo-Brutalist",
};

// Category Keyword Alias Matrix
const CATEGORY_KEYWORDS: Record<string, string> = {
  portfolio: "portfolio-inspiration",
  portfolios: "portfolio-inspiration",
  resume: "portfolio-inspiration",
  showcase: "portfolio-inspiration",
  landing: "landing-page-inspiration",
  "landing page": "landing-page-inspiration",
  "landing pages": "landing-page-inspiration",
  hero: "landing-page-inspiration",
  saas: "saas-product-design",
  dashboard: "saas-product-design",
  dashboards: "saas-product-design",
  b2b: "saas-product-design",
  ux: "ux-user-flows",
  flows: "ux-user-flows",
  onboarding: "ux-user-flows",
  checkout: "ux-user-flows",
  animation: "website-animation-inspiration",
  animations: "website-animation-inspiration",
  microinteraction: "website-animation-inspiration",
  "motion tools": "animation-motion-tools",
  keyframe: "animation-motion-tools",
  components: "ui-components",
  component: "ui-components",
  primitives: "ui-components",
  ui: "ui-web-inspiration",
  inspiration: "ui-web-inspiration",
  color: "color-typography",
  colors: "color-typography",
  palette: "color-typography",
  typography: "color-typography",
  fonts: "color-typography",
  font: "color-typography",
  backgrounds: "backgrounds-visual-effects",
  background: "backgrounds-visual-effects",
  gradients: "backgrounds-visual-effects",
  gradient: "backgrounds-visual-effects",
  mesh: "backgrounds-visual-effects",
  "3d": "3d-interactive-web",
  webgl: "3d-interactive-web",
  three: "3d-interactive-web",
  icons: "iconography",
  icon: "iconography",
  iconography: "iconography",
  glyphs: "iconography",
  symbols: "iconography",
  mockups: "mockups-presentation",
  mockup: "mockups-presentation",
  devices: "mockups-presentation",
  ai: "ai-design-vibe-coding",
  vibe: "ai-design-vibe-coding",
  "vibe coding": "ai-design-vibe-coding",
  award: "award-winning-experimental",
  awwwards: "award-winning-experimental",
  experimental: "award-winning-experimental",
  fwa: "award-winning-experimental",
  advertising: "creative-advertising",
  marketing: "creative-advertising",
  workflow: "design-workflow",
  plugins: "design-workflow",
  learning: "learning-vibe-coding",
  tutorial: "learning-vibe-coding",
  tutorials: "learning-vibe-coding",
  prototype: "ui-ux-prototyping",
  prototyping: "ui-ux-prototyping",
};

export class DeterministicQueryParser implements QueryParser {
  parse(rawQuery: string): SearchIntent {
    const raw = rawQuery.trim();
    if (!raw) {
      return {
        rawQuery: "",
        normalizedQuery: "",
        keywords: [],
        categories: [],
        tags: [],
        purposes: [],
        technologies: [],
        styles: [],
        adjacentConcepts: [],
      };
    }

    const lower = raw.toLowerCase();
    // Tokenize
    const rawTokens = lower.split(/[\s,+/|;:-]+/).filter(Boolean);
    const keywords = rawTokens.filter((token) => !STOP_WORDS.has(token));

    const detectedCategories = new Set<string>();
    const detectedTech = new Set<string>();
    const detectedStyles = new Set<string>();
    const detectedTags = new Set<string>();

    // 1. Multi-word phrase scan
    for (const [key, catId] of Object.entries(CATEGORY_KEYWORDS)) {
      if (lower.includes(key)) {
        detectedCategories.add(catId);
      }
    }

    for (const [key, techName] of Object.entries(TECH_MAP)) {
      if (lower.includes(key)) {
        detectedTech.add(techName);
      }
    }

    for (const [key, styleName] of Object.entries(STYLE_MAP)) {
      if (lower.includes(key)) {
        detectedStyles.add(styleName);
      }
    }

    // 2. Token-level scan
    for (const token of rawTokens) {
      if (TECH_MAP[token]) {
        detectedTech.add(TECH_MAP[token]);
      }
      if (STYLE_MAP[token]) {
        detectedStyles.add(STYLE_MAP[token]);
      }
      if (CATEGORY_KEYWORDS[token]) {
        detectedCategories.add(CATEGORY_KEYWORDS[token]);
      }
      if (token.length > 2 && !STOP_WORDS.has(token)) {
        detectedTags.add(token.charAt(0).toUpperCase() + token.slice(1));
      }
    }

    // 3. Detect intent type
    let intentType: SearchIntent["intentType"] = "reference";
    if (lower.includes("inspire") || lower.includes("inspiration") || lower.includes("idea") || lower.includes("ideas") || lower.includes("portfolio") || lower.includes("showcase")) {
      intentType = "inspiration";
    } else if (lower.includes("component") || lower.includes("button") || lower.includes("card") || lower.includes("navbar") || lower.includes("primitive")) {
      intentType = "component";
    } else if (lower.includes("generator") || lower.includes("tool") || lower.includes("maker") || lower.includes("optimizer") || lower.includes("convert")) {
      intentType = "tool";
    } else if (lower.includes("learn") || lower.includes("tutorial") || lower.includes("guide") || lower.includes("course") || lower.includes("how")) {
      intentType = "learning";
    } else if (lower.includes("icon") || lower.includes("asset") || lower.includes("illustration") || lower.includes("font") || lower.includes("mockup")) {
      intentType = "asset";
    }

    // 4. Generate Adjacent Discovery Concepts
    const adjacentConcepts: string[] = [];
    const techArray = Array.from(detectedTech);
    const styleArray = Array.from(detectedStyles);
    const catArray = Array.from(detectedCategories);

    if (techArray.includes("WebGL") || lower.includes("webgl")) {
      adjacentConcepts.push("3D Interactive Web", "Three.js References", "Shader Art", "Creative Developer Portfolios");
    }
    if (styleArray.includes("Brutalist") || lower.includes("brutalist")) {
      adjacentConcepts.push("Experimental Portfolios", "Neo-Brutalism", "Typography-Heavy UI", "Award-Winning Sites");
    }
    if (catArray.includes("portfolio-inspiration") || lower.includes("portfolio")) {
      adjacentConcepts.push("Creative Developer Portfolios", "Minimalist Portfolios", "Case Study References", "Interactive Resumes");
    }
    if (catArray.includes("ui-components") || lower.includes("component")) {
      adjacentConcepts.push("Headless Primitives", "Tailwind UI Components", "Micro-Interactions", "Accessible Design Systems");
    }
    if (catArray.includes("ai-design-vibe-coding") || lower.includes("ai")) {
      adjacentConcepts.push("Generative UI Engines", "Prompt-to-App Builders", "AI Design Assistants", "Autonomous Agents");
    }
    if (catArray.includes("iconography") || lower.includes("icon")) {
      adjacentConcepts.push("3D Animated Icons", "Open Source Glyphs", "System Icon Sets", "Bento Icons");
    }
    if (adjacentConcepts.length === 0) {
      adjacentConcepts.push("Featured References", "UI / Web Inspiration", "Interactive 3D", "Motion Components");
    }

    return {
      rawQuery,
      normalizedQuery: keywords.join(" "),
      keywords,
      categories: Array.from(detectedCategories),
      tags: Array.from(detectedTags),
      purposes: keywords,
      technologies: techArray,
      styles: styleArray,
      intentType,
      adjacentConcepts: Array.from(new Set(adjacentConcepts)).slice(0, 5),
    };
  }
}

export const defaultQueryParser = new DeterministicQueryParser();

export function parseSearchIntent(query: string): SearchIntent {
  return defaultQueryParser.parse(query);
}
