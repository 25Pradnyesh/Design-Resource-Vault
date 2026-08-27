"use client";

import React from "react";
import { LayoutGrid, Zap } from "lucide-react";
import { HeroStudioIllustration } from "./hero-studio-illustration";

interface ArchiveHeroProps {
  query?: string;
  onQueryChange?: (val: string) => void;
}

export function ArchiveHero(_props: ArchiveHeroProps = {}) {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF] min-h-[76vh] lg:min-h-[86vh] flex flex-col justify-center pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-8 lg:px-12 font-sans overflow-hidden select-none">
      {/* 01: Ambient Organic Flow Background Ribbons (Mint, Cyan & Peach) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute -top-24 right-0 w-[600px] h-[600px] bg-radial from-[#5EEAD4]/25 via-[#38BDF8]/15 to-transparent rounded-full blur-3xl opacity-75" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-radial from-[#FDE68A]/20 via-[#FED7AA]/10 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] bg-radial from-[#2DD4BF]/20 to-transparent rounded-full blur-3xl opacity-50" />

        {/* Large Curving Atmospheric Gradient Wave Mesh */}
        <svg
          className="absolute top-0 right-0 w-full h-full opacity-60 pointer-events-none"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 300 0 C 600 200, 800 100, 1100 350 C 1300 500, 1400 300, 1500 400 L 1500 0 Z"
            fill="url(#ambient_wave_teal)"
            opacity="0.35"
          />
          <path
            d="M 500 0 C 750 300, 950 150, 1300 450 L 1500 0 Z"
            fill="url(#ambient_wave_peach)"
            opacity="0.25"
          />
          <defs>
            <linearGradient id="ambient_wave_teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#BAE6FD" />
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

            {/* Dominant Headline: DESIGN / RESOURCE (Cyan Accent) / VAULT */}
            <div className="space-y-0.5">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[84px] xl:text-[96px] font-black tracking-tight text-[#0B132B] leading-[0.92] uppercase font-sans">
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

            {/* Action CTA Buttons matching Reference */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary CTA: BROWSE CATEGORIES (Navy Pill) */}
              <a
                href="#categories"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0B132B] text-white font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider hover:bg-[#1E293B] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-md"
              >
                <LayoutGrid className="w-4 h-4 text-[#00C4CC]" />
                <span>BROWSE CATEGORIES</span>
              </a>

              {/* Secondary CTA: EXPLORE RESOURCES (White Pill) */}
              <a
                href="#resources-library"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#E2E8F0] bg-white text-[#0B132B] font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-2xs"
              >
                <Zap className="w-4 h-4 text-[#F59E0B]" />
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
