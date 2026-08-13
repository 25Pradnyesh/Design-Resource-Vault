"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  id: string;
  className?: string;
}

export function CategoryIcon({ id, className }: CategoryIconProps) {
  // Sizing defaults to fill container or scale appropriately
  const baseClass = cn("w-full h-full max-w-[85%] max-h-[85%] transition-transform duration-200 group-hover:scale-105", className);

  switch (id) {
    case "ui-web-inspiration":
      // Browser & interface composition
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="8" y="12" width="48" height="40" rx="4" fill="#DAEBE8" stroke="#657166" strokeWidth="2.5" />
          <path d="M8 22H56" stroke="#657166" strokeWidth="2.5" />
          <circle cx="15" cy="17" r="2" fill="#657166" />
          <circle cx="21" cy="17" r="2" fill="#99CDDB" />
          <circle cx="27" cy="17" r="2" fill="#F3C3B2" />
          <rect x="14" y="28" width="18" height="18" rx="2" fill="#99CDDB" opacity="0.6" stroke="#657166" strokeWidth="1.5" />
          <rect x="36" y="28" width="14" height="4" rx="1" fill="#657166" />
          <rect x="36" y="36" width="14" height="4" rx="1" fill="#CFD9C4" stroke="#657166" strokeWidth="1" />
          <rect x="36" y="44" width="8" height="4" rx="1" fill="#F3C3B2" />
        </svg>
      );

    case "landing-page-inspiration":
      // Webpage hero layout composition
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="10" y="8" width="44" height="48" rx="4" fill="#FDE8D3" stroke="#657166" strokeWidth="2.5" />
          <rect x="16" y="14" width="32" height="12" rx="2" fill="#F3C3B2" stroke="#657166" strokeWidth="1.5" />
          <rect x="16" y="30" width="14" height="18" rx="2" fill="#99CDDB" opacity="0.7" stroke="#657166" strokeWidth="1.5" />
          <rect x="34" y="30" width="14" height="18" rx="2" fill="#CFD9C4" stroke="#657166" strokeWidth="1.5" />
          <circle cx="22" cy="20" r="3" fill="#657166" />
        </svg>
      );

    case "saas-product-design":
      // Layered product interface structure
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="10" y="26" width="44" height="28" rx="3" fill="#CFD9C4" stroke="#657166" strokeWidth="2.5" />
          <rect x="14" y="18" width="44" height="28" rx="3" fill="#DAEBE8" stroke="#657166" strokeWidth="2.5" />
          <rect x="18" y="10" width="44" height="28" rx="3" fill="#FDE8D3" stroke="#657166" strokeWidth="2.5" />
          <path d="M26 20H48" stroke="#657166" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 26H38" stroke="#657166" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "ux-user-flows":
      // Connected flow nodes / journey path
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="16" cy="20" r="8" fill="#F3C3B2" stroke="#657166" strokeWidth="2.5" />
          <circle cx="48" cy="20" r="8" fill="#99CDDB" stroke="#657166" strokeWidth="2.5" />
          <circle cx="32" cy="46" r="8" fill="#CFD9C4" stroke="#657166" strokeWidth="2.5" />
          <path d="M24 20H40" stroke="#657166" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M21 26L27 40" stroke="#657166" strokeWidth="2.5" />
          <path d="M43 26L37 40" stroke="#657166" strokeWidth="2.5" />
        </svg>
      );

    case "website-animation-inspiration":
      // Motion play & frame transition
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="32" cy="32" r="22" fill="#DAEBE8" stroke="#657166" strokeWidth="2.5" />
          <polygon points="26,20 44,32 26,44" fill="#657166" />
          <path d="M10 32C10 20 20 10 32 10" stroke="#F3C3B2" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "animation-motion-tools":
      // Timeline & keyframe motion symbol
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="8" y="16" width="48" height="32" rx="4" fill="#FDE8D3" stroke="#657166" strokeWidth="2.5" />
          <path d="M8 26H56" stroke="#657166" strokeWidth="1.5" />
          <polygon points="20,36 26,30 32,36 26,42" fill="#99CDDB" stroke="#657166" strokeWidth="2" />
          <polygon points="38,36 44,30 50,36 44,42" fill="#F3C3B2" stroke="#657166" strokeWidth="2" />
          <path d="M26 26V44" stroke="#657166" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case "ui-components":
      // Modular components / blocks
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="10" y="10" width="20" height="20" rx="3" fill="#99CDDB" stroke="#657166" strokeWidth="2.5" />
          <rect x="34" y="10" width="20" height="20" rx="3" fill="#F3C3B2" stroke="#657166" strokeWidth="2.5" />
          <rect x="10" y="34" width="20" height="20" rx="3" fill="#CFD9C4" stroke="#657166" strokeWidth="2.5" />
          <rect x="34" y="34" width="20" height="20" rx="3" fill="#DAEBE8" stroke="#657166" strokeWidth="2.5" />
        </svg>
      );

    case "color-typography":
      // Typographic letterform & palette graphic
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="22" cy="24" r="12" fill="#F3C3B2" opacity="0.8" />
          <circle cx="36" cy="24" r="12" fill="#99CDDB" opacity="0.8" />
          <circle cx="29" cy="38" r="12" fill="#CFD9C4" opacity="0.8" />
          <path d="M22 52L29 16L36 52" stroke="#657166" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 38H34" stroke="#657166" strokeWidth="2.5" />
        </svg>
      );

    case "backgrounds-visual-effects":
      // Gradient aperture & wave effect
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="32" cy="32" r="22" fill="#DAEBE8" stroke="#657166" strokeWidth="2.5" />
          <path d="M12 32C18 24 26 24 32 32C38 40 46 40 52 32" stroke="#657166" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 24C18 16 26 16 32 24C38 32 46 32 52 24" stroke="#F3C3B2" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 40C18 32 26 32 32 40C38 48 46 48 52 40" stroke="#99CDDB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "3d-interactive-web":
      // Spatial 3D cube & dimensional object
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <polygon points="32,8 54,20 54,44 32,56 10,44 10,20" fill="#FDE8D3" stroke="#657166" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="32,8 54,20 32,32 10,20" fill="#99CDDB" stroke="#657166" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="32,32 54,20 54,44 32,56" fill="#F3C3B2" opacity="0.7" stroke="#657166" strokeWidth="2" strokeLinejoin="round" />
          <path d="M32 32V56" stroke="#657166" strokeWidth="2.5" />
        </svg>
      );

    case "visual-assets":
      // Media frame & asset composition
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="10" y="12" width="44" height="40" rx="4" fill="#CFD9C4" stroke="#657166" strokeWidth="2.5" />
          <circle cx="22" cy="24" r="5" fill="#F3C3B2" stroke="#657166" strokeWidth="1.5" />
          <path d="M10 44L24 30L34 40L42 34L54 46V48C54 50.2 52.2 52 50 52H14C11.8 52 10 50.2 10 48V44Z" fill="#99CDDB" stroke="#657166" strokeWidth="2" />
        </svg>
      );

    case "mockups-presentation":
      // Device mockup / presentation canvas
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="8" y="12" width="36" height="26" rx="3" fill="#DAEBE8" stroke="#657166" strokeWidth="2.5" />
          <rect x="36" y="24" width="20" height="30" rx="3" fill="#FDE8D3" stroke="#657166" strokeWidth="2.5" />
          <path d="M26 38H14V48H32" stroke="#657166" strokeWidth="2" strokeLinecap="round" />
          <circle cx="46" cy="50" r="1.5" fill="#657166" />
        </svg>
      );

    case "ai-design-vibe-coding":
      // Intelligent neural node / code spark
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <path d="M32 10L36.5 24.5L51 29L36.5 33.5L32 48L27.5 33.5L13 29L27.5 24.5L32 10Z" fill="#99CDDB" stroke="#657166" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="48" cy="16" r="4" fill="#F3C3B2" stroke="#657166" strokeWidth="1.5" />
          <circle cx="16" cy="46" r="4" fill="#CFD9C4" stroke="#657166" strokeWidth="1.5" />
        </svg>
      );

    case "frontend-animation":
      // Code window & motion arrow
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="8" y="14" width="48" height="36" rx="4" fill="#DAEBE8" stroke="#657166" strokeWidth="2.5" />
          <path d="M18 28L24 34L18 40" stroke="#657166" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 40H38" stroke="#F3C3B2" strokeWidth="3" strokeLinecap="round" />
          <path d="M42 26L48 32L42 38" stroke="#657166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "visual-search-moodboarding":
      // Moodboard grid & search compass
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="28" cy="28" r="16" fill="#FDE8D3" stroke="#657166" strokeWidth="2.5" />
          <path d="M40 40L52 52" stroke="#657166" strokeWidth="4" strokeLinecap="round" />
          <rect x="20" y="20" width="7" height="7" fill="#99CDDB" />
          <rect x="29" y="20" width="7" height="7" fill="#F3C3B2" />
          <rect x="20" y="29" width="7" height="7" fill="#CFD9C4" />
          <rect x="29" y="29" width="7" height="7" fill="#DAEBE8" />
        </svg>
      );

    case "award-winning-experimental":
      // Award emblem & experimental star
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="32" cy="26" r="16" fill="#F3C3B2" stroke="#657166" strokeWidth="2.5" />
          <polygon points="32,15 35,22 42,23 37,28 38,35 32,31 26,35 27,28 22,23 29,22" fill="#99CDDB" stroke="#657166" strokeWidth="1.5" />
          <path d="M24 38L18 54L32 47L46 54L40 38" fill="#DAEBE8" stroke="#657166" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );

    case "portfolio-inspiration":
      // Designer portfolio frame symbol
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="10" y="14" width="44" height="36" rx="4" fill="#CFD9C4" stroke="#657166" strokeWidth="2.5" />
          <circle cx="32" cy="28" r="7" fill="#FDE8D3" stroke="#657166" strokeWidth="2" />
          <path d="M20 44C20 38 25 36 32 36C39 36 44 38 44 44" stroke="#657166" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "creative-advertising":
      // Campaign emblem & creative lightburst
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <path d="M12 24L32 14L52 24V40L32 50L12 40V24Z" fill="#F3C3B2" stroke="#657166" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M32 14V50" stroke="#657166" strokeWidth="2" />
          <path d="M12 24L32 34L52 24" stroke="#657166" strokeWidth="2" />
          <circle cx="32" cy="34" r="5" fill="#99CDDB" stroke="#657166" strokeWidth="1.5" />
        </svg>
      );

    case "design-workflow":
      // Process sliders & workflow gear
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="10" y="16" width="44" height="8" rx="2" fill="#DAEBE8" stroke="#657166" strokeWidth="2" />
          <rect x="10" y="28" width="44" height="8" rx="2" fill="#FDE8D3" stroke="#657166" strokeWidth="2" />
          <rect x="10" y="40" width="44" height="8" rx="2" fill="#CFD9C4" stroke="#657166" strokeWidth="2" />
          <circle cx="24" cy="20" r="5" fill="#657166" />
          <circle cx="40" cy="32" r="5" fill="#F3C3B2" stroke="#657166" strokeWidth="1.5" />
          <circle cx="28" cy="44" r="5" fill="#99CDDB" stroke="#657166" strokeWidth="1.5" />
        </svg>
      );

    case "learning-vibe-coding":
      // Open book & code syntax symbol
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <path d="M10 18C10 18 18 16 32 20C46 16 54 18 54 18V48C54 48 46 46 32 50C18 46 10 48 10 48V18Z" fill="#FDE8D3" stroke="#657166" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M32 20V50" stroke="#657166" strokeWidth="2.5" />
          <path d="M16 28H26" stroke="#657166" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 36H24" stroke="#657166" strokeWidth="2" strokeLinecap="round" />
          <path d="M38 28H48" stroke="#99CDDB" strokeWidth="2" strokeLinecap="round" />
          <path d="M38 36H46" stroke="#F3C3B2" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "ui-ux-prototyping":
      // Wireframe compass & drafting tool
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <path d="M32 10L14 48H22L32 26L42 48H50L32 10Z" fill="#CFD9C4" stroke="#657166" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="32" cy="18" r="3" fill="#F3C3B2" stroke="#657166" strokeWidth="1.5" />
          <path d="M20 38H44" stroke="#657166" strokeWidth="2.5" />
        </svg>
      );

    case "iconography":
      // Shapes & geometric icon grid
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="20" cy="20" r="9" fill="#99CDDB" stroke="#657166" strokeWidth="2" />
          <polygon points="44,11 53,29 35,29" fill="#F3C3B2" stroke="#657166" strokeWidth="2" />
          <rect x="11" y="35" width="18" height="18" rx="2" fill="#CFD9C4" stroke="#657166" strokeWidth="2" />
          <polygon points="44,35 52,43 44,51 36,43" fill="#DAEBE8" stroke="#657166" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="12" y="12" width="40" height="40" rx="6" fill="#DAEBE8" stroke="#657166" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="10" fill="#99CDDB" stroke="#657166" strokeWidth="2" />
        </svg>
      );
  }
}
