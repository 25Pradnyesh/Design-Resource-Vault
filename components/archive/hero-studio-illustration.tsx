"use client";

import React from "react";
import { Folder, Layers, Sparkles, Heart } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { categories } from "@/data/categories";

export function HeroStudioIllustration() {
  const { resources } = useResources();

  return (
    <div className="relative w-full max-w-[650px] select-none pointer-events-auto flex flex-col items-center">
      {/* 00: Deep Multi-Layered Atmosphere Glow (Background Plane) */}
      <div className="absolute -inset-8 bg-gradient-to-tr from-[#00C4CC]/20 via-[#34D399]/18 to-[#FBBF24]/15 rounded-full blur-3xl -z-10 pointer-events-none animate-ribbon-pulse" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-br from-[#5EEAD4]/25 to-[#FED7AA]/20 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Main 3-Layer Dimensional Composition Canvas */}
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
              <stop offset="50%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <linearGradient id="vault_inner_bezel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
            <linearGradient id="dial_metal_outer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDFA" />
              <stop offset="50%" stopColor="#99F6E4" />
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
            <radialGradient id="sphere_gold_spec" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="25%" stopColor="#FDE047" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>

            {/* Foreground Cyan Triangular Prism */}
            <linearGradient id="prism_cyan_front" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="100%" stopColor="#00C4CC" />
            </linearGradient>
            <linearGradient id="prism_cyan_side" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C4CC" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Depth-of-Field & Realistic Shadow Filters */}
            <filter id="shadow_vault_deep" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="#0F766E" floodOpacity="0.28" />
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#042F2E" floodOpacity="0.18" />
            </filter>
            <filter id="shadow_fg_object" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0B132B" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* =================================================== */}
          {/* PLANE 1: BACKGROUND (Atmospheric Ribbons & Waves)    */}
          {/* =================================================== */}
          <g opacity="0.85">
            {/* Primary Fluid Teal/Mint Wave Ribbon */}
            <path
              d="M-30 160 C 140 70, 300 240, 570 90 C 610 70, 650 110, 650 160"
              stroke="#5EEAD4"
              strokeWidth="56"
              strokeLinecap="round"
              fill="none"
              opacity="0.32"
            />
            {/* Secondary Warm Yellow/Peach Ambient Ribbon */}
            <path
              d="M-10 210 C 180 120, 340 280, 590 150"
              stroke="#FDE68A"
              strokeWidth="36"
              strokeLinecap="round"
              fill="none"
              opacity="0.28"
            />
            {/* Faint Background Wireframe Grid Arc */}
            <path
              d="M 60 280 Q 300 180, 540 320"
              stroke="#99F6E4"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              opacity="0.4"
            />
          </g>

          {/* =================================================== */}
          {/* PLANE 2: MIDDLE GROUND (3D MINT/TURQUOISE VAULT)    */}
          {/* =================================================== */}
          <g filter="url(#shadow_vault_deep)">
            {/* Safe Right Isometric Extrusion Side Panel */}
            <path
              d="M 415 105 L 465 142 L 465 345 L 415 312 Z"
              fill="url(#vault_side_chamfer)"
            />

            {/* Safe Top Isometric Chamfer Panel */}
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

            {/* Recessed Door Frame Inner Bezel */}
            <rect
              x="222"
              y="117"
              width="176"
              height="181"
              rx="22"
              fill="#0F766E"
              opacity="0.3"
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

            {/* Combination Dial Wheel Lock Rim & Base */}
            <circle cx="310" cy="207" r="50" fill="#042F2E" opacity="0.35" />
            <circle cx="310" cy="205" r="46" fill="url(#dial_metal_outer)" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="310" cy="205" r="35" fill="url(#vault_front_body)" />

            {/* Dial Calibration Ticks */}
            <g stroke="#F0FDFA" strokeWidth="2" strokeLinecap="round" opacity="0.75">
              <line x1="310" y1="174" x2="310" y2="180" />
              <line x1="341" y1="205" x2="335" y2="205" />
              <line x1="310" y1="236" x2="310" y2="230" />
              <line x1="279" y1="205" x2="285" y2="205" />
              <line x1="332" y1="183" x2="328" y2="187" />
              <line x1="332" y1="227" x2="328" y2="223" />
              <line x1="288" y1="227" x2="292" y2="223" />
              <line x1="288" y1="183" x2="292" y2="187" />
            </g>

            {/* Central Dial Turning Knob Hub */}
            <circle cx="310" cy="205" r="20" fill="#042F2E" />
            <circle cx="310" cy="205" r="16" fill="url(#dial_hub_grad)" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="307" cy="202" r="4" fill="#FFFFFF" opacity="0.85" />

            {/* 3 Heavy Chrome Spokes */}
            <rect x="307" y="172" width="6" height="15" rx="3" fill="#FFFFFF" />
            <rect x="329" y="216" width="15" height="6" rx="3" fill="#FFFFFF" transform="rotate(30 336 219)" />
            <rect x="276" y="216" width="15" height="6" rx="3" fill="#FFFFFF" transform="rotate(-30 283 219)" />
          </g>

          {/* =================================================== */}
          {/* PLANE 3: FOREGROUND (Floating 3D Objects & Panels)  */}
          {/* =================================================== */}

          {/* 1. Floating Top-Left Faceted Coral Crystal */}
          <g className="animate-ambient-float-1" filter="url(#shadow_fg_object)">
            <polygon points="120,95 150,72 172,88 162,126 114,120" fill="url(#gem_coral_front)" />
            <polygon points="120,95 150,72 144,98" fill="url(#gem_coral_facet)" opacity="0.85" />
            <polygon points="150,72 172,88 144,98" fill="#F43F5E" opacity="0.9" />
            <polygon points="172,88 162,126 144,98" fill="#BE123C" />
            <polygon points="120,95 114,120 144,98" fill="#FDA4AF" opacity="0.7" />
            {/* Chromatic Specular Glint */}
            <circle cx="144" cy="98" r="2.5" fill="#FFFFFF" />
          </g>

          {/* 2. Floating Top-Center Glossy Golden Sphere */}
          <g className="animate-ambient-float-2" filter="url(#shadow_fg_object)">
            <circle cx="225" cy="58" r="26" fill="url(#sphere_gold_spec)" />
            <ellipse cx="216" cy="48" rx="8" ry="5.5" fill="#FFFFFF" opacity="0.85" />
          </g>

          {/* 3. Floating Top-Right 3D Cyan Triangular Prism */}
          <g className="animate-ambient-float-1" filter="url(#shadow_fg_object)">
            <polygon points="480,45 525,82 460,98" fill="url(#prism_cyan_side)" />
            <polygon points="480,45 525,82 505,56" fill="url(#prism_cyan_front)" />
            <polygon points="460,98 525,82 495,92" fill="#00C4CC" />
            <line x1="480" y1="45" x2="525" y2="82" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
          </g>

          {/* 4. Floating Right Frosted Glass Photo Card */}
          <g className="animate-ambient-float-2" filter="url(#shadow_fg_object)">
            <rect x="440" y="125" width="76" height="60" rx="12" fill="#CCFBF1" fillOpacity="0.88" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="464" cy="144" r="5.5" fill="#5EEAD4" />
            <polygon points="450,172 472,152 488,165 482,172" fill="#14B8A6" opacity="0.8" />
            <polygon points="472,172 492,148 508,172" fill="#0D9488" opacity="0.9" />
          </g>

          {/* Ambient Stardust Particles */}
          <circle cx="95" cy="250" r="3.5" fill="#FBBF24" opacity="0.85" />
          <circle cx="510" cy="235" r="4" fill="#00C4CC" opacity="0.75" />
          <circle cx="180" cy="65" r="2.5" fill="#34D399" opacity="0.7" />
        </svg>

        {/* 5. FLOATING GLASSMORPHIC STATS PANEL (Foreground Centerpiece) */}
        <div className="absolute -bottom-6 sm:-bottom-8 inset-x-2 sm:inset-x-6 z-20">
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl border border-white/90">
            <div className="grid grid-cols-4 divide-x divide-[#CBD5E1]/60 text-center">
              {/* Stat 01: Categories */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-3 space-y-1">
                <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B132B]" />
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0B132B] tracking-tight">
                  {categories.length}
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  CATEGORIES
                </div>
              </div>

              {/* Stat 02: Resources */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-3 space-y-1">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B132B]" />
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0B132B] tracking-tight">
                  {resources.length > 0 ? resources.length : 198}
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  RESOURCES
                </div>
              </div>

              {/* Stat 03: Handpicked */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-3 space-y-1">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B132B]" />
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0B132B] tracking-tight">
                  100%
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  HANDPICKED
                </div>
              </div>

              {/* Stat 04: Inspiration */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-3 space-y-1">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B132B]" />
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0B132B] tracking-tight leading-none pt-0.5">
                  ∞
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
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
