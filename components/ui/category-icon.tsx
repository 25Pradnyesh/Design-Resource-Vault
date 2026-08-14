"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  id: string;
  className?: string;
}

export function CategoryIcon({ id, className }: CategoryIconProps) {
  const baseClass = cn(
    "w-full h-full max-w-[85%] max-h-[85%] transition-transform duration-150 group-hover:scale-105 select-none",
    className
  );

  // Unified visual system: 32x32 viewBox, 1.75px uniform stroke, crisp geometric harmony
  switch (id) {
    case "ui-web-inspiration":
      // 01: Browser frame with address bar and structured viewport blocks
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="3" y="4" width="26" height="24" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M3 10H29" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6.5" cy="7" r="1" fill="currentColor" />
          <circle cx="10" cy="7" r="1" fill="currentColor" opacity="0.5" />
          <circle cx="13.5" cy="7" r="1" fill="currentColor" opacity="0.5" />
          <rect x="6.5" y="13.5" width="8" height="11" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.25" />
          <rect x="17.5" y="13.5" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.7" />
          <rect x="17.5" y="20.5" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 1.5" />
        </svg>
      );

    case "landing-page-inspiration":
      // 02: Hero section layout with prominent title and split content
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="4" y="3" width="24" height="26" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <rect x="7" y="6.5" width="18" height="7" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.25" />
          <path d="M10 10H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="7" y="16.5" width="8" height="9" rx="1.5" fill="currentColor" fillOpacity="0.7" />
          <rect x="17" y="16.5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );

    case "saas-product-design":
      // 03: Layered application dashboard planes
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="4" y="14" width="24" height="15" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.75" />
          <rect x="6" y="8" width="20" height="15" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8" y="3" width="16" height="15" rx="2" fill="currentColor" fillOpacity="0.85" />
          <path d="M11 7H17" stroke="var(--background, #F4F3EE)" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M11 10H14" stroke="var(--background, #F4F3EE)" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );

    case "ux-user-flows":
      // 04: Connected flow matrix with sequence path
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="8" cy="9" r="4" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
          <circle cx="24" cy="9" r="4" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.8" />
          <circle cx="16" cy="23" r="4" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 9H20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M10.5 12.5L13.5 19.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21.5 12.5L18.5 19.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    case "website-animation-inspiration":
      // 05: Concentric kinetic velocity vortex
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 2" />
          <circle cx="16" cy="16" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="14,12 20,16 14,20" fill="currentColor" />
        </svg>
      );

    case "animation-motion-tools":
      // 06: Keyframe timeline diamond and spline curve
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="3" y="6" width="26" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M3 13H29" stroke="currentColor" strokeWidth="1.25" />
          <polygon points="10,19 13.5,15.5 17,19 13.5,22.5" fill="currentColor" />
          <polygon points="19,19 22.5,15.5 26,19 22.5,22.5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.15" />
          <path d="M13.5 13V23" stroke="currentColor" strokeWidth="1.25" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case "ui-components":
      // 07: Modular component token blocks
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="4" y="4" width="10" height="10" rx="2" fill="currentColor" fillOpacity="0.85" />
          <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
          <rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <rect x="18" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 1.5" />
        </svg>
      );

    case "color-typography":
      // 08: Intersecting color spectrum circle and type glyph
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="12" cy="12" r="7" fill="currentColor" fillOpacity="0.2" />
          <circle cx="20" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 26L16 9L21 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 21H19" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );

    case "backgrounds-visual-effects":
      // 09: Wave geometry and contour curves
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="3" y="5" width="26" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M5 13C9 9 13 17 17 13C21 9 25 17 27 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M5 19C9 15 13 23 17 19C21 15 25 23 27 19" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
        </svg>
      );

    case "3d-interactive-web":
      // 10: Spatial isometric cube
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <polygon points="16,4 27,10 27,22 16,28 5,22 5,10" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <polygon points="16,4 27,10 16,16 5,10" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="16,16 27,10 27,22 16,28" fill="currentColor" fillOpacity="0.75" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M16 16V28" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );

    case "visual-assets":
      // 11: Framed graphic canvas with mountain & sun primitives
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="4" y="5" width="24" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="10.5" cy="11.5" r="2.5" fill="currentColor" />
          <path d="M4 22L11 15L17 21L21 17L28 24V25C28 26 27 27 26 27H6C5 27 4 26 4 25V22Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case "mockups-presentation":
      // 12: Nested multi-device presentation frame
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="3" y="5" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <rect x="15" y="11" width="13" height="17" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="21.5" cy="25" r="1" fill="currentColor" />
        </svg>
      );

    case "ai-design-vibe-coding":
      // 13: 4-point neural sparkle star
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <path d="M16 3L18.5 12.5L28 15L18.5 17.5L16 27L13.5 17.5L4 15L13.5 12.5L16 3Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <circle cx="25" cy="7" r="2" fill="currentColor" />
          <circle cx="7" cy="24" r="1.5" fill="currentColor" />
        </svg>
      );

    case "frontend-animation":
      // 14: Code window with velocity vector
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="3" y="5" width="26" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M9 13L13 16L9 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 19H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "visual-search-moodboarding":
      // 15: Search crosshair and moodboard grid
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path d="M21 21L28 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="9.5" y="9.5" width="4" height="4" fill="currentColor" />
          <rect x="14.5" y="9.5" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
          <rect x="9.5" y="14.5" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );

    case "award-winning-experimental":
      // 16: Curated award emblem and rosette star
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="16" cy="13" r="8.5" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
          <polygon points="16,8 17.5,11.5 21,12 18.5,14.5 19,18 16,16 13,18 13.5,14.5 11,12 14.5,11.5" fill="currentColor" />
          <path d="M12 20L8 28L16 25L24 28L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case "portfolio-inspiration":
      // 17: Creator profile showcase frame
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="4" y="5" width="24" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="16" cy="13" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 22C10 19 12.5 18 16 18C19.5 18 22 19 22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "creative-advertising":
      // 18: Bold campaign megaphone beacon
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <path d="M6 12H10L18 7V23L10 18H6C5 18 4 17 4 16V14C4 13 5 12 6 12Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M22 11C23.5 12.5 23.5 17.5 22 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M25 8C27.5 10.5 27.5 19.5 25 22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );

    case "design-workflow":
      // 19: Process slider controls & adjustment points
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="4" y="4" width="24" height="24" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 11H24" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="2.5" fill="currentColor" />
          <path d="M8 21H24" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="21" r="2.5" fill="currentColor" />
        </svg>
      );

    case "learning-vibe-coding":
      // 20: Open knowledge codex & tutorial book
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <path d="M4 8C4 8 9 7 16 9C23 7 28 8 28 8V24C28 24 23 23 16 25C9 23 4 24 4 24V8Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M16 9V25" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 13H12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M20 13H24" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );

    case "ui-ux-prototyping":
      // 21: Precision drafting pen nib and anchor coordinates
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <path d="M16 4L6 24H12L16 14L20 24H26L16 4Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <circle cx="16" cy="10" r="1.5" fill="currentColor" />
          <path d="M10 20H22" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    case "iconography":
      // 22: Geometric icon quartet (circle, square, triangle, diamond)
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <circle cx="9" cy="9" r="4" fill="currentColor" fillOpacity="0.8" />
          <rect x="18" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
          <polygon points="9,18 13.5,26 4.5,26" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <polygon points="22,18 26.5,22.5 22,27 17.5,22.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass}>
          <rect x="5" y="5" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="16" cy="16" r="4" fill="currentColor" />
        </svg>
      );
  }
}
