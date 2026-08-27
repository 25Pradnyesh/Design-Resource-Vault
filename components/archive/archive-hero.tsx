"use client";

import React from "react";
import { LayoutGrid, Zap } from "lucide-react";
import { HeroStudioIllustration } from "./hero-studio-illustration";

interface ArchiveHeroProps {
  query?: string;
  onQueryChange?: (val: string) => void;
}

export function ArchiveHero({ query: _query, onQueryChange: _onQueryChange }: ArchiveHeroProps = {}) {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF] min-h-[78vh] lg:min-h-[88vh] flex flex-col justify-center pt-8 sm:pt-12 lg:pt-16 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-8 lg:px-12 font-sans overflow-hidden select-none">
      {/* 01: Ambient Atmospheric Background Plane (Radial Blooms & Organic Wave Meshes) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute -top-28 right-4 w-[650px] h-[650px] bg-radial from-[#5EEAD4]/28 via-[#00C4CC]/16 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-1/4 left-1/5 w-[520px] h-[520px] bg-radial from-[#FEF08A]/22 via-[#FED7AA]/12 to-transparent rounded-full blur-3xl opacity-65" />
        <div className="absolute -bottom-24 right-1/4 w-[480px] h-[480px] bg-radial from-[#2DD4BF]/22 to-transparent rounded-full blur-3xl opacity-55" />

        {/* Large Flowing Curved Gradient Atmosphere Ribbon */}
        <svg
          className="absolute top-0 right-0 w-full h-full opacity-65 pointer-events-none"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 280 0 C 580 220, 820 80, 1140 360 C 1320 510, 1420 290, 1520 390 L 1520 0 Z"
            fill="url(#ambient_wave_mint)"
            opacity="0.38"
          />
          <path
            d="M 480 0 C 760 310, 960 140, 1340 460 L 1520 0 Z"
            fill="url(#ambient_wave_peach)"
            opacity="0.26"
          />
          <defs>
            <linearGradient id="ambient_wave_mint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="40%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#99F6E4" />
            </linearGradient>
            <linearGradient id="ambient_wave_peach" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 02: Hero Main Content Layout Container */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: Eyebrow, Dominant Headline, Subtitle & Action CTAs (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7">
            
            {/* Curated Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 self-start font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0B132B]">
              <span className="h-2 w-2 rounded-full bg-[#10B981] inline-block shadow-xs" />
              <span>CURATED. ORGANIZED. INSPIRING.</span>
            </div>

            {/* Dominant Editorial Headline: DESIGN / RESOURCE (Electric Cyan) / VAULT */}
            <div className="space-y-0.5">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[86px] xl:text-[98px] font-black tracking-tight text-[#0B132B] leading-[0.92] uppercase font-sans">
                DESIGN<br />
                <span className="bg-gradient-to-r from-[#00C4CC] via-[#06B6D4] to-[#0EA5E9] bg-clip-text text-transparent">
                  RESOURCE
                </span><br />
                VAULT
              </h1>
            </div>

            {/* Editorial Positioning Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-[#334155] font-medium max-w-lg leading-relaxed">
              Handpicked design resources to inspire, create, and ship exceptional digital experiences.
            </p>

            {/* Action CTA Buttons with Smooth Micro-Interactions (200-300ms) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary CTA: BROWSE CATEGORIES (Navy Pill) */}
              <a
                href="#categories"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0B132B] text-white font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider hover:bg-[#1E293B] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer shadow-md group/btn"
              >
                <LayoutGrid className="w-4 h-4 text-[#00C4CC] transition-transform duration-200 group-hover/btn:scale-110" />
                <span>BROWSE CATEGORIES</span>
              </a>

              {/* Secondary CTA: EXPLORE RESOURCES (White Pill) */}
              <a
                href="#resources-library"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#CBD5E1] bg-white text-[#0B132B] font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider hover:border-[#94A3B8] hover:bg-[#F8FAFC] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer shadow-2xs group/btn"
              >
                <Zap className="w-4 h-4 text-[#F59E0B] transition-transform duration-200 group-hover/btn:scale-110" />
                <span>EXPLORE RESOURCES</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Vault Artwork + Floating Stats Panel (Cols 7-12) */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <HeroStudioIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
