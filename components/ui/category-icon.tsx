"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  id: string;
  className?: string;
  size?: number;
}

/**
 * DESIGN RESOURCE VAULT — V4 CATEGORY ICONOGRAPHY SYSTEM
 * 
 * Construction Standards:
 * - Base Grid: 32 × 32
 * - Safe Area: 24 × 24 (4px outer margin)
 * - Primary Stroke: 1.75px uniform strokeWidth
 * - Corner Language: Controlled radius (rx="2", strokeLinejoin="round", strokeLinecap="round")
 * - Optical Hierarchy: Foreground stroke with restrained secondary fill layer (12-20% opacity)
 * - Color: Inherits currentColor for monochrome harmony + theme accent support
 */

export function CategoryIcon({ id, className, size }: CategoryIconProps) {
  const baseClass = cn(
    "w-full h-full max-w-[85%] max-h-[85%] transition-transform duration-160 select-none",
    className
  );

  const style = size ? { width: size, height: size } : undefined;

  switch (id) {
    // 01: UI / Web Inspiration — Browser frame with address bar & structured wireframe blocks
    case "ui-web-inspiration":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="5" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M4 11H28" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7.5" cy="8" r="1" fill="currentColor" />
          <circle cx="10.5" cy="8" r="1" fill="currentColor" fillOpacity="0.5" />
          <circle cx="13.5" cy="8" r="1" fill="currentColor" fillOpacity="0.5" />
          <rect x="7" y="14" width="7" height="10" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.25" />
          <rect x="16" y="14" width="9" height="4" rx="1" fill="currentColor" fillOpacity="0.75" />
          <rect x="16" y="20" width="9" height="4" rx="1" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 1.5" />
        </svg>
      );

    // 02: Landing Page Inspiration — Hero billboard frame with title line and dual-column content
    case "landing-page-inspiration":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="5" y="4" width="22" height="24" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <rect x="8" y="7" width="16" height="6.5" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.25" />
          <path d="M11 10.25H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="8" y="16.5" width="7" height="8.5" rx="1.5" fill="currentColor" fillOpacity="0.75" />
          <rect x="17" y="16.5" width="7" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );

    // 03: SaaS / Product Design — Layered application dashboard planes & metric cards
    case "saas-product-design":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="13" width="24" height="15" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.75" />
          <rect x="6" y="8" width="20" height="15" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8" y="4" width="16" height="14" rx="2" fill="currentColor" fillOpacity="0.85" />
          <path d="M11 8H18" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M11 11H15" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );

    // 04: UX / User Flows — 3 connected state nodes with directional flow paths
    case "ux-user-flows":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <circle cx="8" cy="9" r="4" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
          <circle cx="24" cy="9" r="4" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.8" />
          <circle cx="16" cy="23" r="4" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 9H20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M10.5 12.5L13.5 19.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21.5 12.5L18.5 19.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    // 05: Website Animation Inspiration — Kinetic velocity vortex with directional play vector
    case "website-animation-inspiration":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <circle cx="16" cy="16" r="11.5" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 2" />
          <circle cx="16" cy="16" r="6.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="14.5,12.5 19.5,16 14.5,19.5" fill="currentColor" />
        </svg>
      );

    // 06: Animation / Motion Tools — Timeline track with keyframe diamond and spline curve
    case "animation-motion-tools":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M4 12H28" stroke="currentColor" strokeWidth="1.25" />
          <polygon points="10,18.5 13.5,15 17,18.5 13.5,22" fill="currentColor" />
          <polygon points="18.5,18.5 22,15 25.5,18.5 22,22" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.15" />
          <path d="M13.5 12V22" stroke="currentColor" strokeWidth="1.25" strokeDasharray="1.5 1.5" />
        </svg>
      );

    // 07: UI Components — 2x2 modular design system primitive matrix
    case "ui-components":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="5" y="5" width="9.5" height="9.5" rx="2" fill="currentColor" fillOpacity="0.85" />
          <rect x="17.5" y="5" width="9.5" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
          <rect x="5" y="17.5" width="9.5" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <rect x="17.5" y="17.5" width="9.5" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 1.5" />
        </svg>
      );

    // 08: Color / Typography — Intersecting color spectrum circle and type glyph 'A'
    case "color-typography":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <circle cx="12" cy="12" r="6.5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="20" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 26L16 9L21 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 21H19" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );

    // 09: Backgrounds / Visual Effects — Sine wave contours and atmospheric field
    case "backgrounds-visual-effects":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="5" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M6 13C10 9 14 17 18 13C22 9 24 16 26 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M6 19C10 15 14 23 18 19C22 15 24 22 26 19" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
        </svg>
      );

    // 10: 3D / Interactive Web — Spatial isometric cube with dynamic lighting facet
    case "3d-interactive-web":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <polygon points="16,4 27,10.25 27,22.75 16,29 5,22.75 5,10.25" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <polygon points="16,4 27,10.25 16,16.5 5,10.25" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="16,16.5 27,10.25 27,22.75 16,29" fill="currentColor" fillOpacity="0.75" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M16 16.5V29" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );

    // 11: Visual Assets — Graphic canvas frame with sun & mountain primitives
    case "visual-assets":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="5" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="10.5" cy="11.5" r="2.5" fill="currentColor" />
          <path d="M4 22L11 15L17 21L21 17L28 24V25C28 26 27 27 26 27H6C5 27 4 26 4 25V22Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    // 12: Mockups / Presentation — Nested desktop screen and smartphone silhouettes
    case "mockups-presentation":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <rect x="15" y="11" width="13" height="17" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="21.5" cy="25" r="1" fill="currentColor" />
        </svg>
      );

    // 13: AI Design / Vibe Coding — 4-point neural star with satellite spark constellations
    case "ai-design-vibe-coding":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <path d="M16 3L18.5 12.5L28 15L18.5 17.5L16 27L13.5 17.5L4 15L13.5 12.5L16 3Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <circle cx="25" cy="7" r="2" fill="currentColor" />
          <circle cx="7" cy="24" r="1.5" fill="currentColor" />
        </svg>
      );

    // 14: Frontend Animation — Code terminal window with kinetic vector indicator
    case "frontend-animation":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="5" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M9.5 13L13.5 16L9.5 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 19H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 15: Visual Search / Moodboarding — Optical reticle lens over spatial grid cells
    case "visual-search-moodboarding":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <circle cx="14" cy="14" r="8.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M20.5 20.5L27 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="9.5" y="9.5" width="4" height="4" fill="currentColor" />
          <rect x="14.5" y="9.5" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
          <rect x="9.5" y="14.5" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );

    // 16: Award-Winning / Experimental Web — Rosette laurel star medal emblem
    case "award-winning-experimental":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <circle cx="16" cy="13" r="8.5" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
          <polygon points="16,8 17.5,11.5 21,12 18.5,14.5 19,18 16,16 13,18 13.5,14.5 11,12 14.5,11.5" fill="currentColor" />
          <path d="M12 20L8 28L16 25L24 28L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    // 17: Portfolio Inspiration — Creator showcase profile frame with identity badge
    case "portfolio-inspiration":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="5" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="16" cy="13" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 22C10 19 12.5 18 16 18C19.5 18 22 19 22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    // 18: Creative / Advertising — Megaphone beacon broadcasting dynamic acoustic waves
    case "creative-advertising":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <path d="M6 12H10L18 7V23L10 18H6C5 18 4 17 4 16V14C4 13 5 12 6 12Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M22 11C23.5 12.5 23.5 17.5 22 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M25 8C27.5 10.5 27.5 19.5 25 22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );

    // 19: Design Workflow — Dual parameter slider controls with precision alignment tracks
    case "design-workflow":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 11H24" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="2.5" fill="currentColor" />
          <path d="M8 21H24" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="21" r="2.5" fill="currentColor" />
        </svg>
      );

    // 20: Learning / Vibe Coding — Open technical knowledge codex with structured layout
    case "learning-vibe-coding":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <path d="M4 8C4 8 9 7 16 9C23 7 28 8 28 8V24C28 24 23 23 16 25C9 23 4 24 4 24V8Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M16 9V25" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 13H12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M20 13H24" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );

    // 21: UI / UX Prototyping — Precision drafting pen nib with coordinate anchor point
    case "ui-ux-prototyping":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <path d="M16 4L6 24H12L16 14L20 24H26L16 4Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <circle cx="16" cy="10" r="1.5" fill="currentColor" />
          <path d="M10 20H22" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    // 22: Iconography — Geometric symbol quartet: circle, square, triangle, diamond
    case "iconography":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <circle cx="9" cy="9" r="4" fill="currentColor" fillOpacity="0.8" />
          <rect x="17.5" y="5" width="8.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
          <polygon points="9,18 13.5,26 4.5,26" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <polygon points="22,18 26.5,22.5 22,27 17.5,22.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="5" y="5" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="16" cy="16" r="4" fill="currentColor" />
        </svg>
      );
  }
}
