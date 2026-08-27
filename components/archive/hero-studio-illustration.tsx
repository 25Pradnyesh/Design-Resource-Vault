"use client";

import { Code2, Layers, MousePointer2 } from "lucide-react";

export function HeroStudioIllustration() {
  return (
    <div className="relative w-full max-w-[660px] aspect-[4/3] select-none pointer-events-auto">
      {/* 00: Ambient Studio Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/12 via-[var(--accent-secondary)]/6 to-transparent rounded-3xl blur-2xl -z-10 pointer-events-none transform -rotate-1 scale-105" />

      {/* Main Studio Frame Container */}
      <div className="relative w-full h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md shadow-xl overflow-hidden p-3.5 sm:p-5 flex flex-col justify-between">
        
        {/* Studio Window Header Bar (macOS / Figma Studio Style) */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FA5252]/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80 inline-block" />
            </div>
            <span className="hidden sm:inline text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider pl-2 border-l border-[var(--border)]">
              STUDIO_LAB // CANVAS_01
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[10px] text-[var(--accent)] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              LIVE ENGINE
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-wider">100% ZOOM</span>
          </div>
        </div>

        {/* Studio Canvas Area with Isometric Blueprint Grid */}
        <div className="relative flex-1 my-2.5 sm:my-3 rounded-xl border border-[var(--border)]/80 bg-[var(--background)]/70 overflow-hidden">
          
          {/* Subtle Canvas Grid Blueprint */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] [background-size:18px_18px] opacity-75" />

          {/* SVG Composition: Designers, Vectors, Wireframes, Bezier Curves, Code */}
          <svg
            viewBox="0 0 540 320"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for gradients, patterns, and filters */}
            <defs>
              <linearGradient id="tangerineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EB5A28" />
                <stop offset="100%" stopColor="#D44414" />
              </linearGradient>
              <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* 1. Base Studio Desk & Workstation Surface Structure */}
            <g id="desk-environment">
              {/* Studio Desk Workplane */}
              <path
                d="M 40 252 L 500 252 L 470 292 L 70 292 Z"
                fill="var(--surface-muted)"
                stroke="var(--border-strong)"
                strokeWidth="1.5"
                opacity="0.85"
              />
              {/* Support Structure */}
              <line x1="85" y1="292" x2="85" y2="316" stroke="var(--border-strong)" strokeWidth="2" />
              <line x1="455" y1="292" x2="455" y2="316" stroke="var(--border-strong)" strokeWidth="2" />
            </g>

            {/* 2. Left Creative Workstation: Interface Designer */}
            <g id="designer-workstation">
              {/* Designer Laptop Base & Display */}
              <rect x="70" y="210" width="80" height="42" rx="3" fill="#141416" />
              <rect x="74" y="214" width="72" height="34" rx="2" fill="#FFFFFF" />
              
              {/* Miniature Layout Wireframe on Display */}
              <rect x="78" y="218" width="64" height="6" rx="1" fill="#EB5A28" opacity="0.9" />
              <rect x="78" y="226" width="30" height="18" rx="1" fill="#E6E2DA" />
              <rect x="111" y="226" width="31" height="18" rx="1" fill="#10B981" opacity="0.35" />

              {/* Minimal Designer Figure */}
              <circle cx="110" cy="155" r="14" fill="#F59E0B" />
              <path d="M 98 152 Q 110 138 122 152 Q 116 142 98 152 Z" fill="#141416" />
              <path d="M 92 172 C 92 165 128 165 128 172 L 132 215 L 88 215 Z" fill="#EB5A28" />
              <path d="M 98 185 L 84 210 L 96 215" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 122 185 L 136 210 L 126 215" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>

            {/* 3. Right Creative Workstation: Frontend Systems Engineer */}
            <g id="developer-workstation">
              {/* Dual Display Monitor */}
              <rect x="390" y="180" width="90" height="66" rx="4" fill="#141416" />
              <rect x="394" y="184" width="82" height="58" rx="3" fill="#141416" />
              <rect x="430" y="246" width="10" height="12" fill="#78716C" />
              <ellipse cx="435" cy="258" rx="18" ry="4" fill="#524E4A" />

              {/* Code Syntax Highlighting Lines on Developer Monitor */}
              <g opacity="0.95">
                <line x1="400" y1="192" x2="435" y2="192" stroke="#EB5A28" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="440" y1="192" x2="468" y2="192" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="406" y1="201" x2="452" y2="201" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="406" y1="210" x2="462" y2="210" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="412" y1="219" x2="448" y2="219" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="400" y1="228" x2="425" y2="228" stroke="#FA5252" strokeWidth="2.5" strokeLinecap="round" />
              </g>

              {/* Engineer Figure */}
              <circle cx="360" cy="160" r="14" fill="#FA5252" />
              <path d="M 348 155 Q 360 142 372 155 Z" fill="#1E293B" />
              <path d="M 342 178 C 342 170 378 170 378 178 L 382 225 L 338 225 Z" fill="#1E293B" />
              <path d="M 348 190 L 335 212 L 350 216" stroke="#FA5252" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 372 190 L 392 205 L 385 215" stroke="#FA5252" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>

            {/* 4. Centerpiece: Interactive Floating Figma UI Frame (#Frame 01) */}
            <g id="center-ui-artboard">
              {/* Outer Bounding Box & Active Selection Glow */}
              <rect x="160" y="44" width="220" height="152" rx="8" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.75" />
              
              {/* Frame Label Badge (Figma Style) */}
              <rect x="160" y="27" width="94" height="17" rx="3" fill="#EB5A28" />
              <text x="166" y="39" fill="#FFFFFF" fontSize="8.5" fontFamily="ui-monospace, monospace" fontWeight="bold">
                ❖ UI_CANVAS_01
              </text>

              {/* Dimension Guide Badge */}
              <rect x="330" y="27" width="50" height="17" rx="3" fill="#141416" />
              <text x="335" y="39" fill="#FFFFFF" fontSize="7.5" fontFamily="ui-monospace, monospace">
                360 × 240
              </text>

              {/* Artboard Header */}
              <rect x="170" y="54" width="200" height="15" rx="3" fill="#FAF8F5" />
              <circle cx="178" cy="61.5" r="3" fill="#EB5A28" />
              <line x1="186" y1="61.5" x2="230" y2="61.5" stroke="#141416" strokeWidth="2" strokeLinecap="round" />
              <rect x="330" y="57.5" width="32" height="8" rx="2" fill="#EB5A28" />

              {/* Hero Banner inside Frame */}
              <rect x="170" y="75" width="200" height="42" rx="4" fill="url(#tangerineGrad)" />
              <text x="180" y="93" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                DESIGN INTELLIGENCE
              </text>
              <line x1="180" y1="103" x2="250" y2="103" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" />

              {/* Two Card Tiles inside UI Frame */}
              <rect x="170" y="124" width="95" height="62" rx="4" fill="#F8F6F0" stroke="#E6E2DA" strokeWidth="1" />
              <rect x="176" y="130" width="30" height="18" rx="2" fill="#0D9488" opacity="0.3" />
              <line x1="176" y1="156" x2="240" y2="156" stroke="#141416" strokeWidth="2" strokeLinecap="round" />
              <line x1="176" y1="164" x2="220" y2="164" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="176" y="173" width="40" height="6" rx="1.5" fill="#EB5A28" opacity="0.9" />

              <rect x="275" y="124" width="95" height="62" rx="4" fill="#F8F6F0" stroke="#E6E2DA" strokeWidth="1" />
              <rect x="281" y="130" width="30" height="18" rx="2" fill="#10B981" opacity="0.35" />
              <line x1="281" y1="156" x2="345" y2="156" stroke="#141416" strokeWidth="2" strokeLinecap="round" />
              <line x1="281" y1="164" x2="325" y2="164" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="281" y="173" width="40" height="6" rx="1.5" fill="#10B981" opacity="0.9" />

              {/* Active Selection Handles & Dimension Guides */}
              <rect x="156" y="40" width="7" height="7" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.75" />
              <rect x="377" y="40" width="7" height="7" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.75" />
              <rect x="156" y="193" width="7" height="7" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.75" />
              <rect x="377" y="193" width="7" height="7" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.75" />
              <rect x="267" y="40" width="7" height="7" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.75" />
              <rect x="267" y="193" width="7" height="7" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.75" />
            </g>

            {/* 5. Vector Pen Tool & Bezier Curve Construction */}
            <g id="bezier-curve-tool">
              <path
                d="M 50 110 C 90 40, 130 140, 180 80"
                stroke="#EB5A28"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
                opacity="0.8"
              />
              <line x1="90" y1="40" x2="110" y2="70" stroke="#EB5A28" strokeWidth="1.5" />
              <circle cx="90" cy="40" r="3.5" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.5" />
              <circle cx="110" cy="70" r="4" fill="#EB5A28" />

              <line x1="130" y1="140" x2="150" y2="105" stroke="#EB5A28" strokeWidth="1.5" />
              <circle cx="130" cy="140" r="3.5" fill="#FFFFFF" stroke="#EB5A28" strokeWidth="1.5" />
              <circle cx="150" cy="105" r="4" fill="#EB5A28" />
            </g>

            {/* 6. Motion Animation Easing Curve Indicator */}
            <g id="easing-curve-graph" transform="translate(190, 222)">
              <rect x="0" y="0" width="160" height="42" rx="4" fill="#FFFFFF" stroke="#E6E2DA" strokeWidth="1" />
              <text x="8" y="12" fill="#78716C" fontSize="7" fontFamily="ui-monospace, monospace">
                ease-macos: cubic-bezier(0.16, 1, 0.3, 1)
              </text>
              <path
                d="M 10 34 C 25 15, 60 18, 150 18"
                stroke="#EB5A28"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="55" cy="19" r="4" fill="#EB5A28" />
              <line x1="55" y1="14" x2="55" y2="36" stroke="#EB5A28" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* 7. Wireframe Isometric 3D Solid (Polyhedron / Cube) */}
            <g id="isometric-3d-asset" transform="translate(420, 50)">
              <polygon points="40,10 70,25 40,40 10,25" fill="#F2EFE9" stroke="#3B5B75" strokeWidth="1.5" />
              <polygon points="10,25 40,40 40,75 10,60" fill="#E6E2DA" stroke="#3B5B75" strokeWidth="1.5" />
              <polygon points="40,40 70,25 70,60 40,75" fill="#CCC7BC" stroke="#3B5B75" strokeWidth="1.5" />
              <line x1="40" y1="40" x2="40" y2="5" stroke="#EB5A28" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="40" cy="5" r="2.5" fill="#EB5A28" />
            </g>
          </svg>

          {/* Floating UI Specimen 01: Editorial Typography "Aa" Card */}
          <div className="absolute top-4 left-3 hidden sm:flex flex-col gap-1 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)]/95 shadow-md backdrop-blur-xs w-28 animate-studio-float-1">
            <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)] border-b border-[var(--border)] pb-1">
              <span>TYPE // SPEC</span>
              <span className="text-[var(--accent)] font-bold">Aa</span>
            </div>
            <div className="relative h-9 flex items-baseline justify-center overflow-hidden">
              <div className="absolute inset-x-0 top-2 border-b border-dashed border-[#FA5252]/40" />
              <div className="absolute inset-x-0 bottom-2 border-b border-dashed border-[#78716C]/40" />
              <span className="text-2xl font-serif font-black tracking-tight text-[var(--text-primary)]">
                Ag
              </span>
            </div>
            <span className="text-[8px] font-mono text-[var(--text-muted)] truncate">
              Inter + Editorial Serif
            </span>
          </div>

          {/* Floating UI Specimen 02: Dynamic Fresh Color Palette Swatch */}
          <div className="absolute bottom-3 left-4 hidden sm:flex items-center gap-1.5 p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)]/95 shadow-md backdrop-blur-xs animate-studio-float-2">
            <div className="w-5 h-5 rounded-md bg-[#EB5A28] shadow-2xs border border-white/20" title="Tangerine Vermillion #EB5A28" />
            <div className="w-5 h-5 rounded-md bg-[#10B981] shadow-2xs border border-white/20" title="Fresh Green #10B981" />
            <div className="w-5 h-5 rounded-md bg-[#F59E0B] shadow-2xs border border-white/20" title="Warm Amber #F59E0B" />
            <div className="w-5 h-5 rounded-md bg-[#FA5252] shadow-2xs border border-white/20" title="Coral #FA5252" />
            <span className="font-mono text-[9px] text-[var(--text-muted)] pl-1 border-l border-[var(--border)] font-bold">
              PALETTE
            </span>
          </div>

          {/* Floating UI Specimen 03: Live Code Component Badge */}
          <div className="absolute top-3 right-4 hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)]/95 shadow-md backdrop-blur-xs font-mono text-[10px] animate-studio-float-1">
            <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-[var(--text-primary)] font-bold">&lt;VaultEngine /&gt;</span>
            <span className="text-[#10B981] font-bold text-[9px] px-1 py-0.2 rounded bg-[#10B981]/10">200 OK</span>
          </div>

          {/* Floating Designer Cursor Pointer */}
          <div className="absolute top-1/3 left-1/4 hidden lg:flex items-center gap-1 pointer-events-none animate-studio-float-2">
            <MousePointer2 className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" />
            <span className="px-1.5 py-0.5 rounded bg-[var(--accent)] text-white font-mono text-[8px] font-bold shadow-2xs">
              Alex · Spec
            </span>
          </div>
        </div>

        {/* Studio Footer Rulers & Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] font-mono text-[9px] text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-[var(--accent)]" />
              <span className="font-semibold text-[var(--text-primary)]">14 LAYERS</span>
            </span>
            <span className="opacity-40">/</span>
            <span>GRID: 8PT SYSTEM</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="uppercase tracking-wider font-semibold">CREATIVE STUDIO ARCHIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
