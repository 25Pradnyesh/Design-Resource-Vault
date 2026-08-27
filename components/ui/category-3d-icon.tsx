"use client";

import React from "react";

export interface CategoryTheme {
  id: string;
  num: string;
  name: string;
  bg: string;
  hoverBg: string;
  border: string;
  accent: string;
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  "ui-web-inspiration": {
    id: "ui-web-inspiration",
    num: "01",
    name: "UI / WEB INSPIRATION",
    bg: "#EBFBFC",
    hoverBg: "#E0F7FA",
    border: "#B2EBF2",
    accent: "#00C4CC",
  },
  "landing-page-inspiration": {
    id: "landing-page-inspiration",
    num: "02",
    name: "LANDING PAGE INSPIRATION",
    bg: "#ECFDF5",
    hoverBg: "#D1FAE5",
    border: "#A7F3D0",
    accent: "#059669",
  },
  "saas-product-design": {
    id: "saas-product-design",
    num: "03",
    name: "SAAS / PRODUCT DESIGN",
    bg: "#F0FDFA",
    hoverBg: "#CCFBF1",
    border: "#99F6E4",
    accent: "#0D9488",
  },
  "ux-user-flows": {
    id: "ux-user-flows",
    num: "04",
    name: "UX / USER FLOWS",
    bg: "#FEFCE8",
    hoverBg: "#FEF08A",
    border: "#FDE047",
    accent: "#D97706",
  },
  "website-animation-inspiration": {
    id: "website-animation-inspiration",
    num: "05",
    name: "WEBSITE ANIMATION INSPIRATION",
    bg: "#FFF1F2",
    hoverBg: "#FFE4E6",
    border: "#FECDD3",
    accent: "#E11D48",
  },
  "animation-motion-tools": {
    id: "animation-motion-tools",
    num: "06",
    name: "ANIMATION / MOTION TOOLS",
    bg: "#F0FDFA",
    hoverBg: "#CCFBF1",
    border: "#99F6E4",
    accent: "#0D9488",
  },
  "ui-components": {
    id: "ui-components",
    num: "07",
    name: "UI COMPONENTS",
    bg: "#FAF8F5",
    hoverBg: "#F5EFE6",
    border: "#E6E2DA",
    accent: "#475569",
  },
  "color-typography": {
    id: "color-typography",
    num: "08",
    name: "COLOR / TYPOGRAPHY",
    bg: "#FFFBEB",
    hoverBg: "#FEF3C7",
    border: "#FDE68A",
    accent: "#D97706",
  },
  "backgrounds-visual-effects": {
    id: "backgrounds-visual-effects",
    num: "09",
    name: "BACKGROUNDS / VISUAL EFFECTS",
    bg: "#F0FDFA",
    hoverBg: "#CCFBF1",
    border: "#99F6E4",
    accent: "#0D9488",
  },
  "3d-interactive-web": {
    id: "3d-interactive-web",
    num: "10",
    name: "3D / INTERACTIVE WEB",
    bg: "#ECFDF5",
    hoverBg: "#D1FAE5",
    border: "#A7F3D0",
    accent: "#059669",
  },
  "visual-assets": {
    id: "visual-assets",
    num: "11",
    name: "VISUAL ASSETS",
    bg: "#FFF7ED",
    hoverBg: "#FFEDD5",
    border: "#FED7AA",
    accent: "#EA580C",
  },
  "mockups-presentation": {
    id: "mockups-presentation",
    num: "12",
    name: "MOCKUPS / PRESENTATION",
    bg: "#EBFBFC",
    hoverBg: "#E0F7FA",
    border: "#B2EBF2",
    accent: "#00C4CC",
  },
  "ai-design-vibe-coding": {
    id: "ai-design-vibe-coding",
    num: "13",
    name: "AI DESIGN / VIBE CODING",
    bg: "#F0FDFA",
    hoverBg: "#CCFBF1",
    border: "#99F6E4",
    accent: "#0D9488",
  },
  "frontend-animation": {
    id: "frontend-animation",
    num: "14",
    name: "FRONTEND ANIMATION",
    bg: "#FFF1F2",
    hoverBg: "#FFE4E6",
    border: "#FECDD3",
    accent: "#E11D48",
  },
  "visual-search-moodboarding": {
    id: "visual-search-moodboarding",
    num: "15",
    name: "VISUAL SEARCH / MOODBOARDS",
    bg: "#EBFBFC",
    hoverBg: "#E0F7FA",
    border: "#B2EBF2",
    accent: "#00C4CC",
  },
  "award-winning-experimental": {
    id: "award-winning-experimental",
    num: "16",
    name: "AWARD-WINNING / EXPERIMENTS",
    bg: "#FEFCE8",
    hoverBg: "#FEF08A",
    border: "#FDE047",
    accent: "#D97706",
  },
  "portfolio-inspiration": {
    id: "portfolio-inspiration",
    num: "17",
    name: "PORTFOLIO INSPIRATION",
    bg: "#F0FDF4",
    hoverBg: "#DCFCE7",
    border: "#BBF7D0",
    accent: "#16A34A",
  },
  "creative-advertising": {
    id: "creative-advertising",
    num: "18",
    name: "CREATIVE / ADVERTISING",
    bg: "#FFF7ED",
    hoverBg: "#FFEDD5",
    border: "#FED7AA",
    accent: "#EA580C",
  },
  "design-workflow": {
    id: "design-workflow",
    num: "19",
    name: "DESIGN WORKFLOW",
    bg: "#F0FDFA",
    hoverBg: "#CCFBF1",
    border: "#99F6E4",
    accent: "#0D9488",
  },
  "learning-vibe-coding": {
    id: "learning-vibe-coding",
    num: "20",
    name: "LEARNING / VIBE CODING",
    bg: "#FFF7ED",
    hoverBg: "#FFEDD5",
    border: "#FED7AA",
    accent: "#EA580C",
  },
  "ui-ux-prototyping": {
    id: "ui-ux-prototyping",
    num: "21",
    name: "UI / UX PROTOTYPING",
    bg: "#FFF1F2",
    hoverBg: "#FFE4E6",
    border: "#FECDD3",
    accent: "#E11D48",
  },
  "iconography": {
    id: "iconography",
    num: "22",
    name: "ICONOGRAPHY",
    bg: "#ECFDF5",
    hoverBg: "#D1FAE5",
    border: "#A7F3D0",
    accent: "#059669",
  },
};

export function Category3DIcon({
  id,
  className = "w-full h-full",
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    // 01: UI / Web Inspiration — 3D Glossy Cyan Browser Window
    case "ui-web-inspiration":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c01_bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#00C4CC" />
            </linearGradient>
            <linearGradient id="c01_glass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>
            <filter id="c01_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0891B2" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c01_shadow)">
            {/* Main 3D Browser Chassis */}
            <rect x="8" y="10" width="80" height="58" rx="8" fill="url(#c01_bg)" />
            {/* Top Gloss Surface */}
            <rect x="9" y="11" width="78" height="24" rx="7" fill="url(#c01_glass)" opacity="0.4" />
            {/* Titlebar Dots */}
            <circle cx="18" cy="19" r="2.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="25" cy="19" r="2.5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="32" cy="19" r="2.5" fill="#FFFFFF" opacity="0.4" />
            {/* URL bar */}
            <rect x="40" y="16" width="38" height="6" rx="3" fill="#FFFFFF" opacity="0.4" />
            {/* Card Content Grid inside Browser */}
            <rect x="15" y="28" width="28" height="32" rx="4" fill="#FFFFFF" opacity="0.85" />
            <rect x="47" y="28" width="34" height="14" rx="4" fill="#FFFFFF" opacity="0.95" />
            <rect x="47" y="46" width="34" height="14" rx="4" fill="#A5F3FC" opacity="0.75" />
            <circle cx="29" cy="40" r="6" fill="#00C4CC" opacity="0.9" />
          </g>
        </svg>
      );

    // 02: Landing Page Inspiration — 3D Mint Green Browser with Hero Banner
    case "landing-page-inspiration":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c02_bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="c02_glass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>
            <filter id="c02_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#047857" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c02_shadow)">
            <rect x="8" y="10" width="80" height="58" rx="8" fill="url(#c02_bg)" />
            <rect x="9" y="11" width="78" height="24" rx="7" fill="url(#c02_glass)" opacity="0.4" />
            {/* Header row */}
            <circle cx="18" cy="19" r="2.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="25" cy="19" r="2.5" fill="#FFFFFF" opacity="0.6" />
            <rect x="34" y="16.5" width="22" height="5" rx="2.5" fill="#FFFFFF" opacity="0.5" />
            <rect x="68" y="16.5" width="12" height="5" rx="2.5" fill="#FFFFFF" opacity="0.9" />
            {/* Hero Billboard Banner */}
            <rect x="15" y="27" width="66" height="20" rx="4" fill="#FFFFFF" opacity="0.9" />
            <rect x="20" y="32" width="24" height="4" rx="2" fill="#059669" />
            <rect x="20" y="38" width="14" height="4" rx="2" fill="#34D399" />
            {/* Dual Cards */}
            <rect x="15" y="50" width="31" height="12" rx="3" fill="#FFFFFF" opacity="0.75" />
            <rect x="50" y="50" width="31" height="12" rx="3" fill="#FFFFFF" opacity="0.75" />
          </g>
        </svg>
      );

    // 03: SaaS / Product Design — 3D Translucent Cube with Glowing Teal Core
    case "saas-product-design":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c03_cube_top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#99F6E4" />
              <stop offset="100%" stopColor="#5EEAD4" />
            </linearGradient>
            <linearGradient id="c03_cube_left" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <linearGradient id="c03_cube_right" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#115E59" />
            </linearGradient>
            <filter id="c03_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F766E" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c03_shadow)">
            {/* Outer Isometric Cube Facets */}
            <polygon points="48,12 76,26 48,40 20,26" fill="url(#c03_cube_top)" opacity="0.85" />
            <polygon points="20,26 48,40 48,70 20,56" fill="url(#c03_cube_left)" opacity="0.8" />
            <polygon points="48,40 76,26 76,56 48,70" fill="url(#c03_cube_right)" opacity="0.9" />
            {/* Glowing Inner Core Block */}
            <polygon points="48,27 61,33 48,40 35,33" fill="#A7F3D0" opacity="0.95" />
            <polygon points="35,33 48,40 48,54 35,47" fill="#10B981" opacity="0.9" />
            <polygon points="48,40 61,33 61,47 48,54" fill="#059669" opacity="0.95" />
            {/* Specular Highlight lines */}
            <line x1="48" y1="13" x2="75" y2="26" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="48" y1="13" x2="21" y2="26" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
          </g>
        </svg>
      );

    // 04: UX / User Flows — 3D Golden Connected Node Network
    case "ux-user-flows":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c04_gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="c04_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B45309" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c04_shadow)">
            {/* Tubular Connector Bridges */}
            <path d="M28 48 L48 24 L68 48" stroke="#FDE68A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 48 L48 24 L68 48" stroke="url(#c04_gold)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 48 L68 48" stroke="url(#c04_gold)" strokeWidth="4" strokeDasharray="3 3" />
            {/* Top Main Node */}
            <circle cx="48" cy="22" r="14" fill="url(#c04_gold)" />
            <circle cx="44" cy="18" r="4" fill="#FFFFFF" opacity="0.75" />
            {/* Left Node */}
            <circle cx="28" cy="50" r="11" fill="url(#c04_gold)" />
            <circle cx="25" cy="47" r="3" fill="#FFFFFF" opacity="0.7" />
            {/* Right Node */}
            <circle cx="68" cy="50" r="11" fill="url(#c04_gold)" />
            <circle cx="65" cy="47" r="3" fill="#FFFFFF" opacity="0.7" />
            {/* Orbiting particles */}
            <circle cx="58" cy="15" r="2.5" fill="#FBBF24" />
            <circle cx="18" cy="38" r="2" fill="#F59E0B" />
          </g>
        </svg>
      );

    // 05: Website Animation Inspiration — 3D Coral-Pink Play Video Badge
    case "website-animation-inspiration":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c05_bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="c05_glass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
            </linearGradient>
            <filter id="c05_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#BE123C" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c05_shadow)">
            {/* Dimensional TV / Badge Frame */}
            <rect x="14" y="14" width="68" height="52" rx="14" fill="url(#c05_bg)" />
            <rect x="15" y="15" width="66" height="24" rx="13" fill="url(#c05_glass)" opacity="0.4" />
            {/* Layered Inner Display */}
            <rect x="20" y="20" width="56" height="40" rx="9" fill="#881337" opacity="0.25" />
            {/* 3D Play Button Triangle */}
            <polygon points="42,28 62,40 42,52" fill="#FFFFFF" />
            <polygon points="42,28 52,40 42,52" fill="#FFE4E6" />
            {/* Motion Speed Lines */}
            <rect x="74" y="26" width="6" height="3" rx="1.5" fill="#FB7185" />
            <rect x="76" y="33" width="8" height="3" rx="1.5" fill="#FDA4AF" />
            <rect x="74" y="40" width="5" height="3" rx="1.5" fill="#FB7185" />
          </g>
        </svg>
      );

    // 06: Animation / Motion Tools — 3D Teal Clapperboard
    case "animation-motion-tools":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c06_bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <filter id="c06_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F766E" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c06_shadow)">
            {/* Lower Clapper Body */}
            <rect x="16" y="28" width="64" height="40" rx="7" fill="url(#c06_bg)" />
            {/* Dimensional Star in Center */}
            <path d="M48 38 L51 45 L58 46 L53 51 L54 58 L48 54 L42 58 L43 51 L38 46 L45 45 Z" fill="#FFFFFF" />
            {/* Angled Upper Clapper Stick */}
            <g transform="rotate(-10 20 26)">
              <rect x="14" y="16" width="66" height="12" rx="4" fill="#0D9488" />
              {/* White Slanted Stripes */}
              <polygon points="22,16 28,16 22,28 16,28" fill="#FFFFFF" />
              <polygon points="36,16 42,16 36,28 30,28" fill="#FFFFFF" />
              <polygon points="50,16 56,16 50,28 44,28" fill="#FFFFFF" />
              <polygon points="64,16 70,16 64,28 58,28" fill="#FFFFFF" />
            </g>
          </g>
        </svg>
      );

    // 07: UI Components — 3D Geometric Composition (Cylinder + Sphere + Cube)
    case "ui-components":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c07_sphere" x1="20%" y1="20%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="c07_cube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
            <linearGradient id="c07_cone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <filter id="c07_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#334155" floodOpacity="0.2" />
            </filter>
          </defs>
          <g filter="url(#c07_shadow)">
            {/* Left 3D Isometric Cube */}
            <polygon points="32,32 50,42 32,52 14,42" fill="#A5F3FC" />
            <polygon points="14,42 32,52 32,68 14,58" fill="#22D3EE" />
            <polygon points="32,52 50,42 50,58 32,68" fill="#00C4CC" />
            {/* Center Glossy Golden Sphere */}
            <circle cx="64" cy="50" r="16" fill="url(#c07_sphere)" />
            <circle cx="58" cy="44" r="5" fill="#FFFFFF" opacity="0.75" />
            {/* Top Floating Coral Cone / Prism */}
            <polygon points="48,12 60,32 36,32" fill="url(#c07_cone)" />
            <polygon points="48,12 60,32 48,32" fill="#BE123C" opacity="0.6" />
          </g>
        </svg>
      );

    // 08: Color / Typography — 3D Golden "Aa" Letterforms
    case "color-typography":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c08_gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="c08_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B45309" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c08_shadow)">
            {/* Capital 'A' 3D */}
            <path d="M38 18 L20 62 L30 62 L33 52 L47 52 L50 62 L60 62 L42 18 Z" fill="#B45309" transform="translate(3, 3)" />
            <path d="M38 18 L20 62 L30 62 L33 52 L47 52 L50 62 L60 62 L42 18 Z" fill="url(#c08_gold)" />
            <polygon points="40,28 35,44 45,44" fill="#FFFBEB" />
            {/* Small 'a' 3D */}
            <g transform="translate(52, 28)">
              <circle cx="16" cy="20" r="14" fill="#B45309" transform="translate(2, 2)" />
              <circle cx="16" cy="20" r="14" fill="url(#c08_gold)" />
              <circle cx="16" cy="20" r="7" fill="#FFFBEB" />
              <rect x="23" y="8" width="7" height="26" rx="3.5" fill="url(#c08_gold)" />
            </g>
          </g>
        </svg>
      );

    // 09: Backgrounds / Visual Effects — 3D Holographic Gradient Wave
    case "backgrounds-visual-effects":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c09_wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" />
              <stop offset="50%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <linearGradient id="c09_wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#99F6E4" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
            <filter id="c09_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F766E" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c09_shadow)">
            <path d="M12 48 Q 28 22, 48 40 T 84 28 L 84 62 L 12 62 Z" fill="url(#c09_wave1)" opacity="0.75" />
            <path d="M12 36 Q 32 60, 52 38 T 84 48 L 84 64 L 12 64 Z" fill="url(#c09_wave2)" opacity="0.92" />
            <path d="M12 36 Q 32 60, 52 38 T 84 48" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 40 L28 62 M40 38 L42 62 M56 42 L58 62 M70 44 L72 62" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
          </g>
        </svg>
      );

    // 10: 3D / Interactive Web — Glowing Emerald Wireframe Isometric Cube
    case "3d-interactive-web":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c10_emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="c10_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#047857" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c10_shadow)">
            <polygon points="48,14 74,28 48,42 22,28" fill="#6EE7B7" opacity="0.5" />
            <polygon points="22,28 48,42 48,68 22,54" fill="#34D399" opacity="0.6" />
            <polygon points="48,42 74,28 74,54 48,68" fill="#059669" opacity="0.8" />
            <polygon points="48,14 74,28 48,42 22,28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
            <line x1="48" y1="42" x2="48" y2="68" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="28" x2="22" y2="54" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="74" y1="28" x2="74" y2="54" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <polyline points="22,54 48,68 74,54" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
            <circle cx="48" cy="14" r="3" fill="#FFFFFF" />
            <circle cx="74" cy="28" r="3" fill="#FFFFFF" />
            <circle cx="22" cy="28" r="3" fill="#FFFFFF" />
            <circle cx="48" cy="42" r="3" fill="#FFFFFF" />
            <circle cx="48" cy="68" r="3" fill="#FFFFFF" />
          </g>
        </svg>
      );

    // 11: Visual Assets — 3D Peach Photo Picture Frame with Mountain & Sun
    case "visual-assets":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c11_peach" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <filter id="c11_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#C2410C" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c11_shadow)">
            <rect x="14" y="14" width="68" height="52" rx="10" fill="url(#c11_peach)" />
            <rect x="20" y="20" width="56" height="40" rx="6" fill="#FFF7ED" />
            <circle cx="34" cy="34" r="6" fill="#FBBF24" />
            <polygon points="26,54 44,36 56,48 50,54" fill="#FB923C" />
            <polygon points="46,54 60,40 70,54" fill="#EA580C" />
          </g>
        </svg>
      );

    // 12: Mockups / Presentation — 3D Multi-Device Workstation in Cyan/Teal
    case "mockups-presentation":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c12_cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#00C4CC" />
            </linearGradient>
            <filter id="c12_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0891B2" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c12_shadow)">
            <rect x="18" y="14" width="48" height="34" rx="4" fill="url(#c12_cyan)" />
            <rect x="22" y="18" width="40" height="24" rx="2" fill="#F0FDFA" />
            <rect x="38" y="48" width="8" height="10" fill="#94A3B8" />
            <rect x="32" y="58" width="20" height="3" rx="1.5" fill="#64748B" />
            <rect x="58" y="26" width="24" height="38" rx="5" fill="#1E293B" />
            <rect x="61" y="29" width="18" height="30" rx="3" fill="#2DD4BF" />
            <circle cx="70" cy="61" r="1.5" fill="#94A3B8" />
          </g>
        </svg>
      );

    // 13: AI Design / Vibe Coding — Glowing Turquoise 4-Point Magic Stars
    case "ai-design-vibe-coding":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c13_teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" />
              <stop offset="50%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
            <filter id="c13_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0D9488" floodOpacity="0.3" />
            </filter>
          </defs>
          <g filter="url(#c13_shadow)">
            <path
              d="M48 10 Q 48 38, 76 38 Q 48 38, 48 66 Q 48 38, 20 38 Q 48 38, 48 10 Z"
              fill="url(#c13_teal)"
            />
            <circle cx="48" cy="38" r="5" fill="#FFFFFF" />
            <path
              d="M74 16 Q 74 25, 83 25 Q 74 25, 74 34 Q 74 25, 65 25 Q 74 25, 74 16 Z"
              fill="#2DD4BF"
            />
            <path
              d="M24 48 Q 24 55, 31 55 Q 24 55, 24 62 Q 24 55, 17 55 Q 24 55, 24 48 Z"
              fill="#5EEAD4"
            />
          </g>
        </svg>
      );

    // 14: Frontend Animation — 3D Pink Code Window with < >
    case "frontend-animation":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c14_pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <filter id="c14_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#BE123C" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c14_shadow)">
            <rect x="12" y="14" width="72" height="52" rx="8" fill="url(#c14_pink)" />
            <circle cx="22" cy="22" r="2.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="29" cy="22" r="2.5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="36" cy="22" r="2.5" fill="#FFFFFF" opacity="0.4" />
            <rect x="18" y="30" width="60" height="30" rx="4" fill="#881337" opacity="0.35" />
            <path d="M34 40 L28 45 L34 50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M44 52 L50 38" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 40 L66 45 L60 50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );

    // 15: Visual Search / Moodboards — 3D Cyan-Teal Magnifying Glass
    case "visual-search-moodboarding":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c15_lens" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CCFBF1" />
              <stop offset="100%" stopColor="#99F6E4" />
            </linearGradient>
            <linearGradient id="c15_rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <filter id="c15_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F766E" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c15_shadow)">
            <path d="M54 48 L76 70" stroke="url(#c15_rim)" strokeWidth="9" strokeLinecap="round" />
            <path d="M54 48 L76 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <circle cx="40" cy="34" r="22" fill="url(#c15_lens)" stroke="url(#c15_rim)" strokeWidth="6" />
            <path d="M26 26 A 15 15 0 0 1 48 20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    // 16: Award-Winning / Experiments — 3D Golden Trophy Cup
    case "award-winning-experimental":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c16_gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="c16_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B45309" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c16_shadow)">
            <path d="M30 24 C18 24 18 42 32 44" stroke="url(#c16_gold)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M66 24 C78 24 78 42 64 44" stroke="url(#c16_gold)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M28 16 L68 16 L64 42 C64 52 32 52 32 42 Z" fill="url(#c16_gold)" />
            <polygon points="48,24 50,30 56,30 51,34 53,40 48,36 43,40 45,34 40,30 46,30" fill="#FFFFFF" />
            <rect x="44" y="48" width="8" height="12" fill="#D97706" />
            <rect x="32" y="60" width="32" height="8" rx="3" fill="url(#c16_gold)" />
          </g>
        </svg>
      );

    // 17: Portfolio Inspiration — 3D Mint Green ID Badge
    case "portfolio-inspiration":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c17_green" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="c17_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#047857" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c17_shadow)">
            <rect x="16" y="14" width="64" height="52" rx="8" fill="url(#c17_green)" />
            <rect x="42" y="18" width="12" height="4" rx="2" fill="#065F46" opacity="0.6" />
            <circle cx="34" cy="42" r="10" fill="#FFFFFF" />
            <circle cx="34" cy="38" r="4" fill="#059669" />
            <path d="M26 48 C26 44 42 44 42 48 Z" fill="#059669" />
            <rect x="50" y="34" width="22" height="4" rx="2" fill="#FFFFFF" />
            <rect x="50" y="42" width="16" height="3" rx="1.5" fill="#A7F3D0" />
            <rect x="50" y="48" width="18" height="3" rx="1.5" fill="#A7F3D0" />
          </g>
        </svg>
      );

    // 18: Creative / Advertising — 3D Glossy Peach Megaphone
    case "creative-advertising":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c18_horn" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <filter id="c18_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#C2410C" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c18_shadow)" transform="rotate(-15 48 40)">
            <polygon points="32,32 66,16 66,60 32,44" fill="url(#c18_horn)" />
            <rect x="18" y="30" width="16" height="16" rx="4" fill="#9A3412" />
            <ellipse cx="66" cy="38" rx="6" ry="22" fill="#FB923C" />
            <path d="M30 44 L24 64 L34 64 L38 44 Z" fill="#1E293B" />
            <path d="M76 26 A 14 14 0 0 1 76 50" stroke="#F97316" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M83 20 A 22 22 0 0 1 83 56" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );

    // 19: Design Workflow — 3D Toolbox & Productivity Gear
    case "design-workflow":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c19_teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <filter id="c19_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F766E" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c19_shadow)">
            <rect x="18" y="28" width="60" height="38" rx="8" fill="url(#c19_teal)" />
            <path d="M36 28 L36 18 L60 18 L60 28" stroke="#042F2E" strokeWidth="4" strokeLinecap="round" fill="none" />
            <line x1="18" y1="42" x2="78" y2="42" stroke="#042F2E" strokeWidth="2" strokeOpacity="0.4" />
            <rect x="30" y="38" width="8" height="8" rx="2" fill="#FDE047" />
            <rect x="58" y="38" width="8" height="8" rx="2" fill="#FDE047" />
          </g>
        </svg>
      );

    // 20: Learning / Vibe Coding — 3D Graduation Cap & Illuminated Book
    case "learning-vibe-coding":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c20_amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="c20_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B45309" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c20_shadow)">
            <polygon points="48,46 18,36 18,60 48,68" fill="#FEF3C7" />
            <polygon points="48,46 78,36 78,60 48,68" fill="#FDE68A" />
            <polygon points="48,16 80,28 48,40 16,28" fill="url(#c20_amber)" />
            <path d="M30 33 Q 48 48, 66 33 L 66 40 Q 48 54, 30 40 Z" fill="#B45309" />
            <path d="M48 28 L72 38 L72 50" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="72" cy="50" r="3" fill="#FFFFFF" />
          </g>
        </svg>
      );

    // 21: UI / UX Prototyping — 3D Prototyping Compass & Artboard
    case "ui-ux-prototyping":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c21_coral" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <filter id="c21_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#BE123C" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c21_shadow)">
            <rect x="22" y="18" width="52" height="52" rx="6" fill="#FFF1F2" stroke="url(#c21_coral)" strokeWidth="3" />
            <circle cx="36" cy="34" r="5" fill="#FECDD3" />
            <rect x="46" y="30" width="20" height="4" rx="2" fill="#FB7185" />
            <rect x="46" y="38" width="14" height="3" rx="1.5" fill="#FDA4AF" />
            <rect x="30" y="46" width="36" height="14" rx="3" fill="#E11D48" opacity="0.8" />
            <g transform="rotate(-35 60 25)">
              <rect x="52" y="10" width="8" height="36" rx="2" fill="#FBBF24" />
              <polygon points="52,46 60,46 56,54" fill="#E11D48" />
            </g>
          </g>
        </svg>
      );

    // 22: Iconography — 3D Sparkling Gemstone & Icon Matrix
    case "iconography":
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="c22_gem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <filter id="c22_shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#065F46" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#c22_shadow)">
            <polygon points="30,22 66,22 80,38 48,68 16,38" fill="url(#c22_gem)" />
            <polygon points="30,22 66,22 58,34 38,34" fill="#A7F3D0" opacity="0.8" />
            <polygon points="30,22 38,34 16,38" fill="#6EE7B7" opacity="0.6" />
            <polygon points="66,22 80,38 58,34" fill="#059669" opacity="0.9" />
            <polygon points="38,34 58,34 48,68" fill="#10B981" opacity="0.75" />
            <polygon points="16,38 38,34 48,68" fill="#047857" opacity="0.95" />
            <polygon points="80,38 58,34 48,68" fill="#064E3B" opacity="0.95" />
            <circle cx="68" cy="18" r="3" fill="#FFFFFF" />
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 96 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="48" cy="40" r="24" fill="#00C4CC" opacity="0.8" />
        </svg>
      );
  }
}
