"use client";

import React, { useState } from "react";
import { Search, Sparkles, Layers, ArrowRight, Plus, Terminal } from "lucide-react";
import { useUI } from "@/lib/ui-context";
import { useResources } from "@/lib/resource-context";
import { categories, CATEGORY_GROUPS } from "@/data/categories";

interface ArchiveHeroProps {
  onSearchChange?: (q: string) => void;
  activeQuery?: string;
  onCategorySelect?: (catId: string) => void;
  selectedCategory?: string;
}

export function ArchiveHero({
  onSearchChange,
  activeQuery = "",
  onCategorySelect,
  selectedCategory,
}: ArchiveHeroProps) {
  const { setCommandMenuOpen, setAddResourceOpen } = useUI();
  const { resources } = useResources();
  const [localQuery, setLocalQuery] = useState(activeQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localQuery);
    }
  };

  const curatedFeaturedCats = [
    { id: "ui-web-inspiration", label: "UI / Web Inspiration" },
    { id: "3d-interactive-web", label: "3D & WebGL" },
    { id: "animation-motion-tools", label: "Motion & Animation" },
    { id: "ui-components", label: "UI Components" },
    { id: "color-typography", label: "Typography" },
    { id: "ai-design-vibe-coding", label: "AI & Vibe Coding" },
    { id: "award-winning-experimental", label: "Experimental" },
  ];

  return (
    <section className="relative w-full bg-[#FFFFFF] border-b border-slate-200 pt-10 sm:pt-14 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 font-sans select-none overflow-hidden">
      {/* Architectural Fine Grid & Technical Watermark */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none -z-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="space-y-8">

          {/* Eyebrow & Live Archive Ledger Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white font-bold text-[11px] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ARCHIVAL REFERENCE SYSTEM // V2.0</span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-slate-500 text-[11px]">
              <span>CURATED FOR CREATIVE TECHNOLOGISTS & DESIGNERS</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-600 font-bold">{resources.length} VERIFIED SPECIMENS</span>
            </div>
          </div>

          {/* Master Typographic Statement */}
          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 font-display leading-[1.05] uppercase">
              The Permanent Visual Memory <br />
              <span className="text-blue-600">Of The Design Internet</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl leading-relaxed">
              Handpicked visual references, design systems, UI components, motion patterns, WebGL shaders, and creative tools for digital craftspeople.
            </p>
          </div>

          {/* Interactive In-Hero Search Bar */}
          <div className="max-w-3xl">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center w-full rounded-2xl border-2 border-slate-900 bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] focus-within:border-blue-600 transition-colors"
            >
              <div className="flex items-center pl-3 text-slate-400">
                <Search className="h-5 w-5 text-blue-600" />
              </div>

              <input
                type="text"
                value={localQuery}
                onChange={(e) => {
                  setLocalQuery(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                placeholder="Search resources, technologies (WebGL, Three.js, React), styles, or keywords..."
                className="w-full px-3 py-2 text-xs sm:text-sm font-sans text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />

              <div className="flex items-center gap-1.5 pr-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setCommandMenuOpen(true)}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 font-mono text-[11px] font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Open Spotlight Command Menu"
                >
                  <Terminal className="h-3 w-3 text-slate-500" />
                  <span>⌘K</span>
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  EXPLORE
                </button>
              </div>
            </form>
          </div>

          {/* Horizontal Quick-Filter Category Ribbon */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold uppercase tracking-wider text-[10.5px]">QUICK TAXONOMY FILTER:</span>
              <a href="#categories" className="text-blue-600 hover:underline text-[11px]">
                View all 22 categories ↓
              </a>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                type="button"
                onClick={() => onCategorySelect && onCategorySelect("")}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${!selectedCategory
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
              >
                ALL ({resources.length})
              </button>

              {curatedFeaturedCats.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onCategorySelect && onCategorySelect(isSelected ? "" : cat.id)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-Time Catalog Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xl font-bold text-slate-900 font-display">
                {resources.length}+
              </div>
              <div className="text-[10.5px] uppercase font-semibold text-slate-500">
                Verified Resources
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xl font-bold text-slate-900 font-display">
                22
              </div>
              <div className="text-[10.5px] uppercase font-semibold text-slate-500">
                Design Taxonomies
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xl font-bold text-blue-600 font-display">
                100%
              </div>
              <div className="text-[10.5px] uppercase font-semibold text-slate-500">
                Editorial Curation
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xl font-bold text-emerald-600 font-display">
                0ms
              </div>
              <div className="text-[10.5px] uppercase font-semibold text-slate-500">
                Local-First Persistence
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
