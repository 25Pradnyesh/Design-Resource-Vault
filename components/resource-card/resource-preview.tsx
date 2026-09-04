"use client";

import Image from "next/image";
import { useState } from "react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";

interface ResourcePreviewProps {
  resource: Resource;
  className?: string;
  dense?: boolean;
}

// Visual category archetype blueprint renderer
function SpecimenBlueprint({ resource, catId }: { resource: Resource; catId: string }) {
  const name = resource.name;
  const firstChar = name.charAt(0);
  const tech = resource.technologies?.[0] || resource.tags?.[0] || "SPEC";
  const style = resource.styles?.[0] || "CORE";

  switch (catId) {
    case "3d-interactive-web":
    case "website-animation-inspiration":
    case "frontend-animation":
    case "animation-motion-tools":
      return (
        <div className="relative w-full h-full bg-[#0B0F19] text-white flex flex-col justify-between p-3.5 overflow-hidden">
          {/* Spatial Grid & Kinetic Geometry */}
          <div className="absolute inset-0 opacity-20 pointer-events-none [background-image:linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-cyan-400">
            <span className="font-bold tracking-widest uppercase">SPATIAL // 3D</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/50 text-[8px] uppercase">
              {tech}
            </span>
          </div>

          {/* Isometric wireframe cube */}
          <div className="relative z-10 my-auto flex items-center justify-center">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 border border-cyan-400/40 rotate-45 rounded-sm transition-transform duration-500 group-hover:rotate-90" />
              <div className="absolute inset-2 border border-blue-500/60 rotate-12 transition-transform duration-500 group-hover:-rotate-45" />
              <div className="w-4 h-4 bg-cyan-400/80 rounded-full blur-xs group-hover:scale-125 transition-transform duration-300" />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-white/10 pt-1.5">
            <span className="truncate text-white font-medium">{style}</span>
            <span className="text-[8px] text-cyan-400 font-bold">INTERACTIVE</span>
          </div>
        </div>
      );

    case "color-typography":
      return (
        <div className="relative w-full h-full bg-[#FAFAFC] text-[#090D16] flex flex-col justify-between p-3.5 border border-slate-200 overflow-hidden">
          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span className="font-bold tracking-widest uppercase">TYPE & FOUNDATION</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-[8px] uppercase">
              {tech}
            </span>
          </div>

          <div className="relative z-10 my-auto flex items-baseline justify-center gap-1">
            <span className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-[#090D16] group-hover:scale-105 transition-transform duration-300">
              Aa
            </span>
            <span className="font-mono text-xs font-bold text-blue-600">01</span>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-600 border-t border-slate-200 pt-1.5">
            <span className="truncate font-semibold">{name}</span>
            <span className="text-[8px] text-blue-600 font-bold">SPECIMEN</span>
          </div>
        </div>
      );

    case "ui-components":
    case "ui-ux-prototyping":
    case "saas-product-design":
      return (
        <div className="relative w-full h-full bg-[#0F172A] text-slate-100 flex flex-col justify-between p-3.5 overflow-hidden">
          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-blue-400">
            <span className="font-bold tracking-widest uppercase">SYSTEM // UI</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-700/50 text-[8px] uppercase">
              {tech}
            </span>
          </div>

          {/* Wireframe UI Mockup Skeleton */}
          <div className="relative z-10 my-auto w-full max-w-[140px] mx-auto space-y-1.5 p-2 rounded bg-slate-800/80 border border-slate-700/60 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-10 bg-blue-400/80 rounded-full" />
              <div className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-5 bg-slate-700/80 rounded" />
              <div className="h-5 bg-slate-700/80 rounded" />
              <div className="h-5 bg-blue-600/60 rounded" />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-slate-700 pt-1.5">
            <span className="truncate text-slate-200">{style}</span>
            <span className="text-[8px] text-emerald-400 font-bold">COMPONENT</span>
          </div>
        </div>
      );

    case "award-winning-experimental":
    case "creative-advertising":
    case "portfolio-inspiration":
      return (
        <div className="relative w-full h-full bg-[#18181B] text-amber-300 flex flex-col justify-between p-3.5 overflow-hidden">
          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-amber-400">
            <span className="font-bold tracking-widest uppercase">CURATED // BENCHMARK</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-700/50 text-[8px] uppercase text-amber-300">
              {tech}
            </span>
          </div>

          {/* Editorial Monogram Badge */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-amber-400/40 flex items-center justify-center bg-amber-500/10 group-hover:scale-110 transition-transform duration-300">
              <span className="font-display text-xl font-black text-amber-300">
                {firstChar}
              </span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-zinc-400 border-t border-zinc-700 pt-1.5">
            <span className="truncate text-zinc-200">{name}</span>
            <span className="text-[8px] text-amber-400 font-bold">AWARD</span>
          </div>
        </div>
      );

    case "ai-design-vibe-coding":
    case "learning-vibe-coding":
    case "design-workflow":
      return (
        <div className="relative w-full h-full bg-[#0D1117] text-emerald-300 flex flex-col justify-between p-3.5 overflow-hidden">
          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-emerald-400">
            <span className="font-bold tracking-widest uppercase">CODE // INTELLIGENCE</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/50 text-[8px] uppercase">
              {tech}
            </span>
          </div>

          {/* Terminal prompt snippet */}
          <div className="relative z-10 my-auto w-full max-w-[150px] mx-auto font-mono text-[10px] space-y-1 p-2 rounded bg-black/60 border border-emerald-800/40 text-emerald-400">
            <div className="flex items-center gap-1 text-[8px] text-slate-500 border-b border-emerald-900/40 pb-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 inline-block" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 inline-block" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-1 text-[7.5px] uppercase">SHELL</span>
            </div>
            <p className="truncate text-[9px] text-emerald-300">&gt; vault.get(&quot;{resource.id}&quot;)</p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-emerald-900/60 pt-1.5">
            <span className="truncate text-slate-200">{name}</span>
            <span className="text-[8px] text-emerald-400 font-bold">READY</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full bg-[#F8FAFC] text-[#090D16] flex flex-col justify-between p-3.5 border border-slate-200 overflow-hidden">
          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span className="font-bold tracking-widest uppercase">ARCHIVE // SPECIMEN</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-200/80 border border-slate-300 text-[8px] uppercase font-bold text-blue-600">
              {tech}
            </span>
          </div>

          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            <div className="w-11 h-11 rounded-lg border border-slate-300 bg-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
              <span className="font-display text-lg font-black text-slate-900">
                {firstChar}
              </span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-600 border-t border-slate-200 pt-1.5">
            <span className="truncate font-semibold">{name}</span>
            <span className="text-[8px] text-blue-600 font-bold">INDEXED</span>
          </div>
        </div>
      );
  }
}

export function ResourcePreview({
  resource,
  className = "",
  dense = false,
}: ResourcePreviewProps) {
  const [imgError, setImgError] = useState(false);
  const primaryCatId = resource.categories[0] || "ui-web-inspiration";
  const primaryCategory = categoryMap[primaryCatId];

  if (resource.previewImage && !imgError) {
    return (
      <div
        className={`relative w-full ${dense ? "aspect-[16/9]" : "aspect-[16/10]"} overflow-hidden rounded-xl bg-slate-900 border border-slate-200 select-none ${className}`}
      >
        <Image
          src={resource.previewImage}
          alt={`Preview of ${resource.name}`}
          width={800}
          height={500}
          className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Archival metadata chip overlay */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs border border-white/15 font-mono text-[8.5px] font-bold text-white shadow-xs">
            {primaryCategory?.name?.toUpperCase() || "CURATED"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${dense ? "aspect-[16/9]" : "aspect-[16/10]"} overflow-hidden rounded-xl select-none ${className}`}
    >
      <SpecimenBlueprint resource={resource} catId={primaryCatId} />
    </div>
  );
}