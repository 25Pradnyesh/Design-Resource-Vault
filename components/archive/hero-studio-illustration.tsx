"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Folder, Layers, Sparkles, Heart } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { categories } from "@/data/categories";

export function HeroStudioIllustration() {
  const { resources } = useResources();
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  // Layered parallax coordinates (subtle, restrained physical offsets)
  const bgX = mousePos.x * 2;
  const bgY = mousePos.y * 2;
  const midX = mousePos.x * 5;
  const midY = mousePos.y * 5;
  const fgX = mousePos.x * 10;
  const fgY = mousePos.y * 10;

  return (
    <div className="relative w-full max-w-[650px] select-none pointer-events-auto flex flex-col items-center">
      {/* 00: Deep Multi-Layered Atmosphere Glow (Far Background Plane) */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-[#00C4CC]/18 via-[#34D399]/15 to-[#FBBF24]/12 rounded-full blur-3xl -z-10 pointer-events-none animate-ribbon-pulse" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-[#5EEAD4]/20 via-[#FED7AA]/15 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Main 4-Layer Dimensional Composition Canvas */}
      <div className="relative w-full aspect-[16/13] flex items-center justify-center">
        <svg
          viewBox="0 0 580 470"
          className="w-full h-full drop-shadow-2xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Safe 3D Body & Metal Gradients */}
            <linearGradient id="vault_top_chamfer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#99F6E4" />
              <stop offset="100%" stopColor="#5EEAD4" />
            </linearGradient>
            <linearGradient id="vault_side_chamfer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#115E59" />
              <stop offset="100%" stopColor="#042F2E" />
            </linearGradient>
            <linearGradient id="vault_front_body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="45%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <linearGradient id="vault_inner_bezel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
            <linearGradient id="dial_metal_outer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#CCFBF1" />
              <stop offset="80%" stopColor="#5EEAD4" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
            <radialGradient id="dial_hub_grad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#CCFBF1" />
              <stop offset="100%" stopColor="#0F766E" />
            </radialGradient>

            {/* Foreground Coral Gemstone (Chromatic Depth) */}
            <linearGradient id="gem_coral_front" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="gem_coral_facet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE4E6" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>

            {/* Foreground Golden Sphere with 3D Specular Light */}
            <radialGradient id="sphere_gold_spec" cx="32%" cy="28%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FEF08A" />
              <stop offset="65%" stopColor="#FBBF24" />
              <stop offset="90%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#9A3412" />
            </radialGradient>

            {/* Foreground Cyan Triangular Prism */}
            <linearGradient id="prism_cyan_front" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="100%" stopColor="#00C4CC" />
            </linearGradient>
            <linearGradient id="prism_cyan_side" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C4CC" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>

            {/* Depth-of-Field & Realistic Shadow Filters */}
            <filter id="shadow_vault_deep" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="28" stdDeviation="22" floodColor="#042F2E" floodOpacity="0.32" />
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0F766E" floodOpacity="0.22" />
            </filter>
            <filter id="shadow_fg_crystal" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="-4" dy="16" stdDeviation="12" floodColor="#0B132B" floodOpacity="0.28" />
              <feDropShadow dx="-1" dy="4" stdDeviation="4" floodColor="#E11D48" floodOpacity="0.2" />
            </filter>
            <filter id="shadow_fg_sphere" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="4" dy="14" stdDeviation="10" floodColor="#0B132B" floodOpacity="0.24" />
            </filter>
            <filter id="shadow_fg_glass" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#0B132B" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* =================================================== */}
          {/* PLANE 1: BACKGROUND (Atmospheric Ribbons & Studio Marks) */}
          {/* =================================================== */}
          <g
            style={{
              transform: `translate(${bgX}px, ${bgY}px)`,
              transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Primary Fluid Teal/Mint Wave Ribbon */}
            <path
              d="M-40 150 C 130 60, 290 230, 580 80 C 620 60, 660 100, 660 150"
              stroke="#5EEAD4"
              strokeWidth="58"
              strokeLinecap="round"
              fill="none"
              opacity="0.28"
            />
            {/* Secondary Warm Peach/Yellow Wave Ribbon */}
            <path
              d="M-20 200 C 170 110, 330 270, 600 140"
              stroke="#FED7AA"
              strokeWidth="38"
              strokeLinecap="round"
              fill="none"
              opacity="0.24"
            />
            {/* Studio Technical Construction Grid & Measurement Arcs */}
            <g stroke="#99F6E4" strokeWidth="1.2" opacity="0.35">
              <path d="M 50 270 Q 290 170, 530 310" strokeDasharray="4 6" fill="none" />
              <circle cx="310" cy="205" r="140" strokeDasharray="2 8" fill="none" />
              <line x1="80" y1="205" x2="110" y2="205" />
              <line x1="510" y1="205" x2="540" y2="205" />
              <line x1="310" y1="35" x2="310" y2="55" />
            </g>
            {/* Studio Technical Coordinate Marks */}
            <text x="70" y="75" fill="#64748B" opacity="0.45" fontSize="8" fontFamily="monospace" fontWeight="bold">
              REF // 40.71°N 74.00°W
            </text>
            <text x="460" y="325" fill="#64748B" opacity="0.45" fontSize="8" fontFamily="monospace" fontWeight="bold">
              SPEC_V3 · SEC_01
            </text>
          </g>

          {/* =================================================== */}
          {/* PLANE 2: MIDDLE GROUND (3D TACTILE SAFE VAULT)      */}
          {/* =================================================== */}
          <g
            filter="url(#shadow_vault_deep)"
            style={{
              transform: `translate(${midX}px, ${midY}px)`,
              transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Safe Right Isometric Extrusion Side Panel */}
            <path
              d="M 415 105 L 465 142 L 465 345 L 415 312 Z"
              fill="url(#vault_side_chamfer)"
            />

            {/* Safe Top Isometric Chamfer Panel with Directional Highlight */}
            <path
              d="M 235 78 L 415 105 L 465 142 L 285 115 Z"
              fill="url(#vault_top_chamfer)"
            />

            {/* Main Front Safe Chassis */}
            <rect
              x="200"
              y="95"
              width="220"
              height="225"
              rx="32"
              fill="url(#vault_front_body)"
              stroke="#99F6E4"
              strokeWidth="3"
            />

            {/* Recessed Door Frame Inner Bezel Pocket */}
            <rect
              x="222"
              y="117"
              width="176"
              height="181"
              rx="22"
              fill="#0F766E"
              opacity="0.38"
            />
            <rect
              x="224"
              y="119"
              width="172"
              height="177"
              rx="20"
              fill="url(#vault_inner_bezel)"
              stroke="#5EEAD4"
              strokeWidth="2.5"
            />

            {/* Heavy-Duty Metal Hinges on Right Frame */}
            <rect x="390" y="140" width="12" height="28" rx="4.5" fill="#0F766E" stroke="#99F6E4" strokeWidth="1.5" />
            <rect x="390" y="248" width="12" height="28" rx="4.5" fill="#0F766E" stroke="#99F6E4" strokeWidth="1.5" />

            {/* Combination Dial Lock Assembly */}
            <circle cx="310" cy="207" r="52" fill="#042F2E" opacity="0.4" />
            <circle cx="310" cy="205" r="48" fill="url(#dial_metal_outer)" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="310" cy="205" r="36" fill="url(#vault_front_body)" stroke="#0F766E" strokeWidth="1.5" />

            {/* Dial Calibration Ticks */}
            <g stroke="#F0FDFA" strokeWidth="2" strokeLinecap="round" opacity="0.8">
              <line x1="310" y1="173" x2="310" y2="180" />
              <line x1="342" y1="205" x2="335" y2="205" />
              <line x1="310" y1="237" x2="310" y2="230" />
              <line x1="278" y1="205" x2="285" y2="205" />
              <line x1="333" y1="182" x2="328" y2="187" />
              <line x1="333" y1="228" x2="328" y2="223" />
              <line x1="287" y1="228" x2="292" y2="223" />
              <line x1="287" y1="182" x2="292" y2="187" />
            </g>

            {/* Central Dial Turning Knob Hub */}
            <circle cx="310" cy="205" r="21" fill="#042F2E" />
            <circle cx="310" cy="205" r="17" fill="url(#dial_hub_grad)" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="306" cy="201" r="4.5" fill="#FFFFFF" opacity="0.9" />

            {/* 3 Heavy Chrome Spokes */}
            <rect x="307" y="171" width="6" height="16" rx="3" fill="#FFFFFF" />
            <rect x="329" y="216" width="16" height="6" rx="3" fill="#FFFFFF" transform="rotate(30 337 219)" />
            <rect x="275" y="216" width="16" height="6" rx="3" fill="#FFFFFF" transform="rotate(-30 283 219)" />
          </g>

          {/* =================================================== */}
          {/* PLANE 3: FOREGROUND (Occluding Specimen Artifacts)   */}
          {/* =================================================== */}
          <g
            style={{
              transform: `translate(${fgX}px, ${fgY}px)`,
              transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* 1. Foreground Coral Faceted Crystal (Physically Overlaps Bottom-Left Vault) */}
            <g className="animate-ambient-float-1" filter="url(#shadow_fg_crystal)">
              <polygon points="120,230 162,195 192,216 178,268 112,260" fill="url(#gem_coral_front)" />
              <polygon points="120,230 162,195 154,232" fill="url(#gem_coral_facet)" opacity="0.9" />
              <polygon points="162,195 192,216 154,232" fill="#F43F5E" opacity="0.92" />
              <polygon points="192,216 178,268 154,232" fill="#BE123C" />
              <polygon points="120,230 112,260 154,232" fill="#FDA4AF" opacity="0.75" />
              {/* Facet Specular Glint */}
              <circle cx="154" cy="232" r="3" fill="#FFFFFF" />
            </g>

            {/* 2. Floating Glossy Golden Sphere (Overlaps Top-Left Vault Shoulder) */}
            <g className="animate-ambient-float-2" filter="url(#shadow_fg_sphere)">
              <circle cx="215" cy="62" r="28" fill="url(#sphere_gold_spec)" />
              <ellipse cx="205" cy="50" rx="9" ry="6" fill="#FFFFFF" opacity="0.9" />
            </g>

            {/* 3. Floating Cyan Triangular Prism (Top Right) */}
            <g className="animate-ambient-float-1" filter="url(#shadow_fg_crystal)">
              <polygon points="485,50 532,88 465,105" fill="url(#prism_cyan_side)" />
              <polygon points="485,50 532,88 510,62" fill="url(#prism_cyan_front)" />
              <polygon points="465,105 532,88 500,98" fill="#00C4CC" />
              <line x1="485" y1="50" x2="532" y2="88" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.9" />
              <circle cx="510" cy="62" r="2" fill="#FFFFFF" />
            </g>

            {/* 4. Frosted Glass Specimen Card (Physically Overlaps Right Vault Face) */}
            <g className="animate-ambient-float-2" filter="url(#shadow_fg_glass)">
              <rect
                x="410"
                y="145"
                width="95"
                height="75"
                rx="14"
                fill="#FFFFFF"
                fillOpacity="0.85"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <rect x="420" y="155" width="22" height="6" rx="2" fill="#0D9488" opacity="0.8" />
              <rect x="420" y="166" width="65" height="3" rx="1.5" fill="#0B132B" opacity="0.35" />
              <rect x="420" y="173" width="45" height="3" rx="1.5" fill="#64748B" opacity="0.25" />
              <circle cx="488" cy="198" r="8" fill="#5EEAD4" opacity="0.6" />
              <circle cx="488" cy="198" r="4" fill="#0D9488" />
            </g>

            {/* Ambient Foreground Stardust */}
            <circle cx="85" cy="140" r="3.5" fill="#FBBF24" opacity="0.9" />
            <circle cx="525" cy="245" r="4" fill="#00C4CC" opacity="0.85" />
            <circle cx="170" cy="45" r="2.5" fill="#34D399" opacity="0.8" />
          </g>
        </svg>

        {/* =================================================== */}
        {/* PLANE 4: FOREGROUND STATS PANEL (Grounded Anchor)   */}
        {/* =================================================== */}
        <div className="absolute -bottom-6 sm:-bottom-8 inset-x-2 sm:inset-x-6 z-30">
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl border border-white/95 backdrop-blur-md bg-white/90">
            <div className="grid grid-cols-4 divide-x divide-[var(--border)] text-center">
              {/* Stat 01: Categories */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-3 space-y-1">
                <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-primary)]" />
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  {categories.length}
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  CATEGORIES
                </div>
              </div>

              {/* Stat 02: Resources */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-3 space-y-1">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-primary)]" />
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  {resources.length > 0 ? resources.length : 89}
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  RESOURCES
                </div>
              </div>

              {/* Stat 03: Handpicked */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-3 space-y-1">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-primary)]" />
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  100%
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  HANDPICKED
                </div>
              </div>

              {/* Stat 04: Inspiration */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-3 space-y-1">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-primary)]" />
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none pt-0.5">
                  ∞
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  INSPIRATION
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
