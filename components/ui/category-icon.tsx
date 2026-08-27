"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  id: string;
  className?: string;
  size?: number;
}

/**
 * DESIGN RESOURCE VAULT — V5 CUSTOM EDITORIAL CATEGORY ICONOGRAPHY SYSTEM
 * 
 * Systematic Standards:
 * - Base Grid: 32 × 32
 * - Safe Margin: 3px outer margin for optical balance
 * - Primary Stroke: 1.75px uniform strokeWidth
 * - Fill Contrast: Restrained secondary fill layers (opacity 0.12 - 0.25) + accent emphasis
 * - Line Caps & Joins: round / round for polished digital craft
 * - Color: Inherits currentColor for full theme & accent support
 */

export function CategoryIcon({ id, className, size }: CategoryIconProps) {
  const baseClass = cn(
    "w-full h-full max-w-[88%] max-h-[88%] transition-transform duration-200 select-none",
    className
  );

  const style = size ? { width: size, height: size } : undefined;

  switch (id) {
    // 01: UI / Web Inspiration — Precision browser chrome with column layout and active pointer
    case "ui-web-inspiration":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3" y="4" width="26" height="24" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M3 10.5H29" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6.5" cy="7.25" r="1.25" fill="currentColor" />
          <circle cx="10" cy="7.25" r="1.25" fill="currentColor" fillOpacity="0.5" />
          <circle cx="13.5" cy="7.25" r="1.25" fill="currentColor" fillOpacity="0.3" />
          {/* Address pill */}
          <rect x="17" y="6" width="9" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.15" />
          {/* Left sidebar nav wireframe */}
          <rect x="6" y="13.5" width="5.5" height="11.5" rx="1.5" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.2" />
          {/* Main content grid */}
          <rect x="14" y="13.5" width="12" height="4.5" rx="1" fill="currentColor" fillOpacity="0.8" />
          <rect x="14" y="20.5" width="5.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12" />
          <rect x="20.5" y="20.5" width="5.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
        </svg>
      );

    // 02: Landing Page Inspiration — Hero billboard composition with logo header, bold headline & CTA button
    case "landing-page-inspiration":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3.5" y="3.5" width="25" height="25" rx="3" stroke="currentColor" strokeWidth="1.75" />
          {/* Header row */}
          <rect x="6.5" y="6.5" width="4" height="2" rx="0.75" fill="currentColor" />
          <line x1="13" y1="7.5" x2="25.5" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Dominant Hero Card */}
          <rect x="6.5" y="11" width="19" height="7.5" rx="1.5" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.25" />
          <line x1="9.5" y1="13.5" x2="17" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="9.5" y="15.5" width="6" height="1.75" rx="0.75" fill="currentColor" />
          {/* Split Column Features */}
          <rect x="6.5" y="21" width="8.5" height="5" rx="1.25" fill="currentColor" fillOpacity="0.75" />
          <rect x="17" y="21" width="8.5" height="5" rx="1.25" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
        </svg>
      );

    // 03: SaaS / Product Design — Multi-pane dashboard with interactive analytics trendline
    case "saas-product-design":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3" y="4" width="26" height="24" rx="3" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.05" />
          {/* Sidebar */}
          <rect x="3" y="4" width="7" height="24" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="6.5" cy="8" r="1.2" fill="currentColor" />
          <line x1="5.5" y1="12" x2="7.5" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="5.5" y1="15" x2="7.5" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="5.5" y1="18" x2="7.5" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          {/* Metrics header */}
          <rect x="12.5" y="7" width="6" height="4.5" rx="1" fill="currentColor" fillOpacity="0.8" />
          <rect x="20" y="7" width="6.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12" />
          {/* Analytics chart area with bezier trendline */}
          <rect x="12.5" y="14" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M14.5 22C16.5 19 18 20.5 20.5 17C22 15 23.5 16 25 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20.5" cy="17" r="1.25" fill="currentColor" />
        </svg>
      );

    // 04: UX / User Flows — State node flowchart with conditional branches and directional vectors
    case "ux-user-flows":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Start node */}
          <circle cx="7" cy="9" r="3.75" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.2" />
          <circle cx="7" cy="9" r="1.5" fill="currentColor" />
          {/* Decision diamond node */}
          <polygon points="24,5 28,9 24,13 20,9" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.8" />
          {/* Action state node */}
          <rect x="4" y="20" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.12" />
          {/* Final success node */}
          <circle cx="24" cy="23.5" r="4.25" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.2" />
          <path d="M22 23.5L23.5 25L26.5 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Connecting directional paths */}
          <path d="M11 9H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 1.5" />
          <path d="M7 13V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11.5 23.5H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 13.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 1.5" />
        </svg>
      );

    // 05: Website Animation Inspiration — Kinetic orbital vortex with velocity vector
    case "website-animation-inspiration":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Concentric velocity arcs */}
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="5 3" />
          <circle cx="16" cy="16" r="7.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          {/* Kinetic Play Chevron */}
          <polygon points="14,11.5 20,16 14,20.5" fill="currentColor" />
          {/* Trailing speed lines */}
          <path d="M5.5 11C7 8 10 6 13.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="26.5" cy="11.5" r="1.5" fill="currentColor" />
          <circle cx="7" cy="22" r="1.25" fill="currentColor" fillOpacity="0.6" />
        </svg>
      );

    // 06: Animation / Motion Tools — Motion timeline tracks with keyframe diamond and bezier easing
    case "animation-motion-tools":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3" y="5" width="26" height="22" rx="3" stroke="currentColor" strokeWidth="1.75" />
          {/* Timeline ruler */}
          <path d="M3 11H29" stroke="currentColor" strokeWidth="1.25" />
          <line x1="8" y1="8" x2="8" y2="11" stroke="currentColor" strokeWidth="1.2" />
          <line x1="14" y1="8" x2="14" y2="11" stroke="currentColor" strokeWidth="1.2" />
          <line x1="20" y1="8" x2="20" y2="11" stroke="currentColor" strokeWidth="1.2" />
          <line x1="26" y1="8" x2="26" y2="11" stroke="currentColor" strokeWidth="1.2" />
          {/* Keyframe Track 1 */}
          <line x1="5" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <polygon points="9,16 11.5,13.5 14,16 11.5,18.5" fill="currentColor" />
          <polygon points="21,16 23.5,13.5 26,16 23.5,18.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
          {/* Bezier Easing Spline Curve */}
          <path d="M9 23C13 23 15 17 23 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          {/* Playhead Scrubber */}
          <line x1="16" y1="6" x2="16" y2="25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 1.5" />
          <polygon points="14,6 18,6 16,8.5" fill="currentColor" />
        </svg>
      );

    // 07: UI Components — Modular design system primitive matrix: button, toggle, dropdown, input
    case "ui-components":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* 01: Primary Button Primitive */}
          <rect x="4" y="4.5" width="10.5" height="9.5" rx="2.5" fill="currentColor" fillOpacity="0.85" />
          <line x1="7" y1="9.25" x2="11.5" y2="9.25" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

          {/* 02: Toggle Switch Primitive */}
          <rect x="17.5" y="4.5" width="10.5" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.1" />
          <rect x="19.5" y="7" width="6.5" height="4.5" rx="2.25" stroke="currentColor" strokeWidth="1" />
          <circle cx="24" cy="9.25" r="1.5" fill="currentColor" />

          {/* 03: Input Box Primitive */}
          <rect x="4" y="18" width="10.5" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <line x1="6.5" y1="21.5" x2="10" y2="21.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <line x1="6.5" y1="24" x2="8" y2="24" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />

          {/* 04: Dropdown / Segment Pill Primitive */}
          <rect x="17.5" y="18" width="10.5" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 1.5" fill="currentColor" fillOpacity="0.15" />
          <path d="M21 21.5L23 23.5L25 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // 08: Color / Typography — High-craft typographic ligature 'Aa' intersecting color spectrum ring
    case "color-typography":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Color Spectrum Disc */}
          <circle cx="12" cy="11.5" r="7.5" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.18" />
          <circle cx="12" cy="11.5" r="3.5" fill="currentColor" fillOpacity="0.35" />
          {/* Typographic Serif 'A' */}
          <path d="M12 26.5L18 8.5L24 26.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 20.5H21.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          {/* Serif Foot Brackets */}
          <line x1="10.5" y1="26.5" x2="13.5" y2="26.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="22.5" y1="26.5" x2="25.5" y2="26.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          {/* Lowercase 'a' droplet */}
          <circle cx="25.5" cy="18" r="2.5" fill="currentColor" fillOpacity="0.8" />
        </svg>
      );

    // 09: Backgrounds / Visual Effects — Fluid wave contours, mesh gradients and particle fields
    case "backgrounds-visual-effects":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3.5" y="4.5" width="25" height="23" rx="3" stroke="currentColor" strokeWidth="1.75" />
          {/* Wave Layer 1 */}
          <path d="M4 12C9 7 13 17 18 12C23 7 26 15 28 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          {/* Wave Layer 2 */}
          <path d="M4 18C8 13 13 23 18 18C23 13 25 21 28 18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
          {/* Wave Layer 3 */}
          <path d="M4 23C9 19 14 26 19 22C23 19 26 24 28 22" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.35" strokeLinecap="round" />
          {/* Atmospheric Spark Nodes */}
          <circle cx="23" cy="8.5" r="1.5" fill="currentColor" />
          <circle cx="8" cy="8.5" r="1" fill="currentColor" />
        </svg>
      );

    // 10: 3D / Interactive Web — Spatial isometric wireframe polyhedron cube with coordinate axis
    case "3d-interactive-web":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Isometric Cube Outline */}
          <polygon points="16,3.5 27.5,10 27.5,23 16,29.5 4.5,23 4.5,10" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          {/* Top Facet */}
          <polygon points="16,3.5 27.5,10 16,16.5 4.5,10" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Right Facet */}
          <polygon points="16,16.5 27.5,10 27.5,23 16,29.5" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Center Y-Axis */}
          <line x1="16" y1="16.5" x2="16" y2="29.5" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Coordinate Anchor Marker */}
          <circle cx="16" cy="16.5" r="1.75" fill="#FFFFFF" />
        </svg>
      );

    // 11: Visual Assets — Precision vector canvas with anchor points, geometric shapes & pen guide
    case "visual-assets":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3.5" y="4.5" width="25" height="23" rx="3" stroke="currentColor" strokeWidth="1.75" />
          {/* Geometric Sun primitive */}
          <circle cx="10.5" cy="11.5" r="3.5" fill="currentColor" fillOpacity="0.85" />
          {/* Vector Mountain / Landscape Polygon */}
          <path d="M4 24L11 16L17.5 22.5L21.5 18L28 25V26C28 26.8 27.3 27.5 26.5 27.5H5.5C4.7 27.5 4 26.8 4 26V24Z" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Vector Anchor Handle */}
          <rect x="9.5" y="14.5" width="3" height="3" fill="#FFFFFF" stroke="currentColor" strokeWidth="1" />
          <line x1="6.5" y1="16" x2="15.5" y2="16" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
        </svg>
      );

    // 12: Mockups / Presentation — Layered studio display monitor and mobile viewport mockup frames
    case "mockups-presentation":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Desktop Monitor Frame */}
          <rect x="3.5" y="4.5" width="20.5" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.08" />
          <line x1="3.5" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="11.5" y="20" width="4.5" height="4" fill="currentColor" />
          <line x1="8.5" y1="24" x2="19" y2="24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          {/* Foreground Smartphone Device Frame */}
          <rect x="16.5" y="11" width="12" height="17.5" rx="2.5" fill="currentColor" fillOpacity="0.9" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Phone Screen Speaker & Home Bar */}
          <line x1="20.5" y1="13" x2="24.5" y2="13" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <circle cx="22.5" cy="25.5" r="1" fill="#FFFFFF" />
        </svg>
      );

    // 13: AI Design / Vibe Coding — 4-point generative neural starburst with orbiting algorithmic nodes
    case "ai-design-vibe-coding":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Primary Neural Starburst */}
          <path d="M16 2.5L18.75 12.25L28.5 15L18.75 17.75L16 27.5L13.25 17.75L3.5 15L13.25 12.25L16 2.5Z" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          {/* Star Core Badge */}
          <circle cx="16" cy="15" r="3" fill="currentColor" />
          {/* Satellite Algorithmic Nodes */}
          <circle cx="26" cy="6" r="2.25" fill="currentColor" fillOpacity="0.85" />
          <circle cx="6" cy="24" r="2" fill="currentColor" fillOpacity="0.7" />
          <line x1="23" y1="9" x2="20" y2="12" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <circle cx="25" cy="24" r="1.25" fill="currentColor" />
        </svg>
      );

    // 14: Frontend Animation — Code terminal frame with dynamic kinetic vector waveform
    case "frontend-animation":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3.5" y="4.5" width="25" height="23" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M3.5 10H28.5" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="6.75" cy="7.25" r="1" fill="currentColor" />
          <circle cx="9.75" cy="7.25" r="1" fill="currentColor" fillOpacity="0.5" />
          {/* Terminal Command Prompt '>' */}
          <path d="M8.5 15L13 18.5L8.5 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Kinetic Motion Pulse Wave */}
          <path d="M16 22C17.5 18 19.5 18 21 22C22.5 26 24.5 26 26 22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="16" y1="16" x2="23" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      );

    // 15: Visual Search / Moodboarding — Spatial moodboard grid with precision inspection reticle lens
    case "visual-search-moodboarding":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Background Moodboard Tiles */}
          <rect x="4" y="4" width="9" height="11" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.25" />
          <rect x="15" y="4" width="13" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 1.5" />
          <rect x="4" y="17" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
          {/* Optical Loupe / Reticle Search Lens */}
          <circle cx="21" cy="20" r="7" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.25" />
          <path d="M26 25L29.5 28.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          {/* Reticle Focus Crosshair */}
          <circle cx="21" cy="20" r="2.5" fill="currentColor" />
        </svg>
      );

    // 16: Award-Winning / Experimental Web — Laurel rosette medal emblem with faceted star core
    case "award-winning-experimental":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Medal Outer Rosette */}
          <circle cx="16" cy="13" r="9.5" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.18" />
          {/* Award Star Core */}
          <polygon points="16,7.5 17.75,11.5 22,12 18.75,15 19.75,19 16,16.75 12.25,19 13.25,15 10,12 14.25,11.5" fill="currentColor" />
          {/* Ribbon Tails */}
          <path d="M11.5 21L8 29.5L16 26.5L24 29.5L20.5 21" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
        </svg>
      );

    // 17: Portfolio Inspiration — Creator editorial folio showcase card with avatar badge
    case "portfolio-inspiration":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3.5" y="4.5" width="25" height="23" rx="3" stroke="currentColor" strokeWidth="1.75" />
          {/* Creator Profile Silhouette */}
          <circle cx="16" cy="12.5" r="4.25" fill="currentColor" fillOpacity="0.8" />
          <path d="M9.5 23C9.5 19.5 12.5 18 16 18C19.5 18 22.5 19.5 22.5 23" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          {/* Verified Craft Badge */}
          <circle cx="21" cy="9" r="2" fill="currentColor" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
      );

    // 18: Creative / Advertising — Loudspeaker beacon broadcasting expanding acoustic energy waves
    case "creative-advertising":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Megaphone Body */}
          <path d="M5 12H9.5L18.5 6V26L9.5 20H5C4.2 20 3.5 19.3 3.5 18.5V13.5C3.5 12.7 4.2 12 5 12Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="currentColor" fillOpacity="0.18" />
          <line x1="9.5" y1="12" x2="9.5" y2="20" stroke="currentColor" strokeWidth="1.5" />
          {/* Concentric Sound Waves */}
          <path d="M22.5 11C24.5 12.5 24.5 19.5 22.5 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M26 8C29 10.5 29 21.5 26 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          {/* Creative Spark */}
          <circle cx="18.5" cy="16" r="2" fill="currentColor" />
        </svg>
      );

    // 19: Design Workflow — Dual precision parameter calibration faders with slider thumbs
    case "design-workflow":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="3.5" y="4" width="25" height="24" rx="3" stroke="currentColor" strokeWidth="1.75" />
          {/* Fader Track 1 */}
          <line x1="8" y1="10.5" x2="24" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="10.5" y="7.5" width="5" height="6" rx="1.5" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
          {/* Fader Track 2 */}
          <line x1="8" y1="21.5" x2="24" y2="21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="17.5" y="18.5" width="5" height="6" rx="1.5" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
          {/* Calibration Markings */}
          <line x1="13" y1="14.5" x2="13" y2="17.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="19" y1="14.5" x2="19" y2="17.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      );

    // 20: Learning / Vibe Coding — Open technical knowledge codex with structured layout and bookmark
    case "learning-vibe-coding":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Open Codex Book Spine & Pages */}
          <path d="M4 8C4 8 9 6.5 16 9C23 6.5 28 8 28 8V24.5C28 24.5 23 23 16 25.5C9 23 4 24.5 4 24.5V8Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
          <path d="M16 9V25.5" stroke="currentColor" strokeWidth="1.75" />
          {/* Left Page Code Lines */}
          <line x1="7.5" y1="13.5" x2="12.5" y2="13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <line x1="7.5" y1="17.5" x2="11.5" y2="17.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          {/* Right Page Code Lines */}
          <line x1="19.5" y1="13.5" x2="24.5" y2="13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <line x1="19.5" y1="17.5" x2="23.5" y2="17.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          {/* Bookmark Ribbon */}
          <path d="M16 4V12L18.5 10L21 12V4" fill="currentColor" />
        </svg>
      );

    // 21: UI / UX Prototyping — Precision drafting pen tool nib with coordinate anchor point
    case "ui-ux-prototyping":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Drafting Pen Tool Nib */}
          <path d="M16 3.5L5.5 24H12L16 13.5L20 24H26.5L16 3.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="currentColor" fillOpacity="0.18" />
          <circle cx="16" cy="9.5" r="1.75" fill="currentColor" />
          {/* Pen Grip Band */}
          <line x1="9.5" y1="20" x2="22.5" y2="20" stroke="currentColor" strokeWidth="1.5" />
          {/* Interactive Tap Radii */}
          <circle cx="16" cy="27" r="2.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
        </svg>
      );

    // 22: Iconography — Geometric symbol quartet: circle, square, triangle, diamond matrix
    case "iconography":
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          {/* Top-Left: Solid Circle */}
          <circle cx="9" cy="9" r="4.25" fill="currentColor" fillOpacity="0.85" />
          {/* Top-Right: Outlined Rounded Square */}
          <rect x="17.5" y="4.75" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.1" />
          {/* Bottom-Left: Polygon Triangle */}
          <polygon points="9,18 13.75,26.5 4.25,26.5" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
          {/* Bottom-Right: Diamond Rhombus */}
          <polygon points="22,17.5 26.5,22 22,26.5 17.5,22" fill="currentColor" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={baseClass} style={style} aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="16" cy="16" r="4.5" fill="currentColor" />
        </svg>
      );
  }
}
