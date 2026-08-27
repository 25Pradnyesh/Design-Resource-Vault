"use client";

import React from "react";
import { Folder, Layers, Sparkles, Heart } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { categories } from "@/data/categories";

export function HeroStudioIllustration() {
  const { resources } = useResources();

  return (
    <div className="relative w-full max-w-[620px] select-none pointer-events-auto flex flex-col items-center">
      {/* 00: Ambient Flow Atmosphere Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#00C4CC]/20 via-[#34D399]/20 to-[#FB923C]/15 rounded-full blur-3xl -z-10 pointer-events-none animate-ribbon-pulse" />

      {/* Main 3D Composition Container */}
      <div className="relative w-full aspect-[16/13] flex items-center justify-center">
        {/* SVG Composition: 3D Mint/Turquoise Safe Vault, Gemstone, Sphere, Prism, Floating Card */}
        <svg
          viewBox="0 0 560 460"
          className="w-full h-full drop-shadow-xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Safe Outer Gradients */}
            <linearGradient id="vault_body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" />
              <stop offset="40%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
            <linearGradient id="vault_front" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
            <linearGradient id="vault_rim" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#99F6E4" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <linearGradient id="dial_metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDFA" />
              <stop offset="50%" stopColor="#CCFBF1" />
              <stop offset="100%" stopColor="#5EEAD4" />
            </linearGradient>

            {/* Floating Coral Gemstone */}
            <linearGradient id="gem_coral_1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
            <linearGradient id="gem_coral_2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>

            {/* Floating Golden Sphere */}
            <radialGradient id="sphere_gold" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* Floating Cyan Prism */}
            <linearGradient id="prism_cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Drop Shadow Filters */}
            <filter id="shadow_vault" x="-15%" y="-15%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#0F766E" floodOpacity="0.25" />
            </filter>
            <filter id="shadow_float" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0B132B" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* 1. Ambient Background Waves / Gradient Streamers */}
          <g opacity="0.8">
            <path
              d="M-40 180 C 120 100, 280 260, 560 120 C 620 90, 680 140, 680 180"
              stroke="#5EEAD4"
              strokeWidth="48"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
            />
            <path
              d="M-20 220 C 160 140, 320 290, 580 180"
              stroke="#FDE68A"
              strokeWidth="32"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
          </g>

          {/* 2. Floating Top-Left Faceted Coral Gemstone / Crystal */}
          <g className="animate-ambient-float-1" filter="url(#shadow_float)">
            <polygon points="120,90 145,70 165,85 155,120 115,115" fill="url(#gem_coral_1)" opacity="0.9" />
            <polygon points="120,90 145,70 140,95" fill="#FFE4E6" opacity="0.6" />
            <polygon points="145,70 165,85 140,95" fill="url(#gem_coral_2)" opacity="0.85" />
            <polygon points="165,85 155,120 140,95" fill="url(#gem_coral_2)" />
            <polygon points="120,90 115,115 140,95" fill="url(#gem_coral_1)" />
          </g>

          {/* 3. Floating Top-Center Glossy Golden Sphere */}
          <g className="animate-ambient-float-2" filter="url(#shadow_float)">
            <circle cx="215" cy="55" r="24" fill="url(#sphere_gold)" />
            <ellipse cx="207" cy="46" rx="7" ry="5" fill="#FFFFFF" opacity="0.75" />
          </g>

          {/* 4. Floating Top-Right 3D Cyan Triangular Prism */}
          <g className="animate-ambient-float-1" filter="url(#shadow_float)">
            <polygon points="460,40 500,75 440,90" fill="url(#prism_cyan)" />
            <polygon points="460,40 500,75 480,50" fill="#E0F2FE" opacity="0.8" />
            <polygon points="440,90 500,75 470,85" fill="#0369A1" opacity="0.9" />
          </g>

          {/* 5. Floating Right Frosted Glass Photo Card */}
          <g className="animate-ambient-float-2" filter="url(#shadow_float)">
            <rect x="420" y="115" width="70" height="55" rx="10" fill="#CCFBF1" opacity="0.85" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="442" cy="132" r="5" fill="#5EEAD4" />
            <polygon points="430,158 450,140 465,152 460,158" fill="#14B8A6" opacity="0.7" />
            <polygon points="450,158 468,136 482,158" fill="#0D9488" opacity="0.8" />
          </g>

          {/* 6. MAIN 3D MINT/TURQUOISE SAFE VAULT CENTERPIECE */}
          <g filter="url(#shadow_vault)">
            {/* Safe 3D Isometric Body Chamfers */}
            {/* Right Extrusion Panel */}
            <path
              d="M 400 100 L 445 135 L 445 330 L 400 300 Z"
              fill="#0F766E"
              opacity="0.95"
            />
            {/* Top Extrusion Panel */}
            <path
              d="M 230 75 L 400 100 L 445 135 L 275 110 Z"
              fill="#5EEAD4"
              opacity="0.8"
            />

            {/* Front Main Safe Face */}
            <rect
              x="195"
              y="90"
              width="210"
              height="215"
              rx="28"
              fill="url(#vault_front)"
              stroke="#99F6E4"
              strokeWidth="3"
            />

            {/* Recessed Door Frame Bezel */}
            <rect
              x="215"
              y="110"
              width="170"
              height="175"
              rx="20"
              fill="#115E59"
              opacity="0.25"
            />
            <rect
              x="217"
              y="112"
              width="166"
              height="171"
              rx="18"
              fill="url(#vault_front)"
              stroke="#5EEAD4"
              strokeWidth="2"
            />

            {/* Safe Hinges on Right Frame */}
            <rect x="375" y="130" width="10" height="26" rx="4" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1.5" />
            <rect x="375" y="235" width="10" height="26" rx="4" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1.5" />

            {/* Center Dial Combination Wheel Lock Base */}
            <circle cx="300" cy="198" r="46" fill="#0F766E" opacity="0.4" />
            <circle cx="300" cy="196" r="42" fill="url(#vault_rim)" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="300" cy="196" r="32" fill="url(#dial_metal)" />

            {/* Dial Lock Number Ticks */}
            <g stroke="#0F766E" strokeWidth="2" strokeLinecap="round" opacity="0.6">
              <line x1="300" y1="168" x2="300" y2="173" />
              <line x1="328" y1="196" x2="323" y2="196" />
              <line x1="300" y1="224" x2="300" y2="219" />
              <line x1="272" y1="196" x2="277" y2="196" />
              <line x1="320" y1="176" x2="316" y2="180" />
              <line x1="320" y1="216" x2="316" y2="212" />
              <line x1="280" y1="216" x2="284" y2="212" />
              <line x1="280" y1="176" x2="284" y2="180" />
            </g>

            {/* Center Dial Handle Turn Knob & Spokes */}
            <circle cx="300" cy="196" r="18" fill="#134E4A" />
            <circle cx="300" cy="196" r="14" fill="url(#dial_metal)" />
            <circle cx="297" cy="193" r="4" fill="#FFFFFF" opacity="0.8" />

            {/* 3 Radiating Wheel Handle Spokes */}
            <rect x="297" y="166" width="6" height="12" rx="3" fill="#FFFFFF" />
            <rect x="318" y="206" width="12" height="6" rx="3" fill="#FFFFFF" transform="rotate(30 324 209)" />
            <rect x="270" y="206" width="12" height="6" rx="3" fill="#FFFFFF" transform="rotate(-30 276 209)" />
          </g>

          {/* Floating Small Accent Particles */}
          <circle cx="100" cy="240" r="3" fill="#FBBF24" opacity="0.8" />
          <circle cx="490" cy="220" r="3.5" fill="#38BDF8" opacity="0.7" />
          <circle cx="170" cy="60" r="2.5" fill="#34D399" opacity="0.6" />
        </svg>

        {/* 7. FLOATING HERO STAT PANEL (Matching Reference Benchmark) */}
        <div className="absolute -bottom-6 sm:-bottom-8 inset-x-2 sm:inset-x-6 z-20">
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl">
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
