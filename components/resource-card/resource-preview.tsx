"use client";

import Image from "next/image";
import { useState } from "react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";
import { Category3DIcon, CATEGORY_THEMES } from "@/components/ui/category-3d-icon";

interface ResourcePreviewProps {
  resource: Resource;
  className?: string;
}

export function ResourcePreview({
  resource,
  className = "",
}: ResourcePreviewProps) {
  const [imgError, setImgError] = useState(false);

  const primaryCatId = resource.categories[0] || "ui-web-inspiration";
  const primaryCategory = categoryMap[primaryCatId];
  const theme = CATEGORY_THEMES[primaryCatId] || CATEGORY_THEMES["ui-web-inspiration"];

  // Tier 1: High-Fidelity Static Preview Image
  if (resource.previewImage && !imgError) {
    return (
      <div
        className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] select-none ${className}`}
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

        {/* Archival category specimen watermark mark */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs border border-black/8 font-mono text-[9px] font-bold text-[#0B132B] shadow-2xs">
            CAT // {theme.num}
          </span>
        </div>
      </div>
    );
  }

  // Tier 2: Systematic Archival Specimen Artwork
  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl border flex flex-col justify-between p-3 select-none transition-all duration-300 ${className}`}
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border,
      }}
    >
      {/* Subtle Background Radial/Grid Pattern & Technical Blueprint Geometry */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-36 h-36 rounded-full border border-dashed border-current -translate-x-6 -translate-y-4" />
        <div className="absolute inset-0 bg-[radial-gradient(#0000000e_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Top Bar: Archival Specimen Tag */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="px-1.5 py-0.5 rounded bg-white/85 backdrop-blur-xs border border-black/6 font-mono text-[8.5px] font-bold text-[#334155] tracking-wider uppercase truncate shadow-2xs">
          CAT // {theme.num}
        </span>
      </div>

      {/* Center: Dominant 3D Category Specimen Artwork with Subtle Buoyancy */}
      <div className="relative z-10 my-auto flex items-center justify-center py-0.5">
        <div className="w-13 h-13 sm:w-15 sm:h-15 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:-translate-y-0.5 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0">
          <Category3DIcon id={primaryCatId} className="w-full h-full object-contain drop-shadow-xs" />
        </div>
      </div>

      {/* Bottom Bar: Collision-Proof Category Identity Label */}
      <div className="relative z-10 flex items-center justify-between gap-1.5 pt-1.5 border-t border-black/6 font-mono text-[8.5px] text-[#64748B] overflow-hidden">
        <span className="truncate font-semibold uppercase tracking-wider text-[#475569]">
          {primaryCategory?.name ?? "SPECIMEN"}
        </span>
        <span className="shrink-0 text-[8px] uppercase tracking-wider font-bold text-[#94A3B8]">
          ARCHIVE
        </span>
      </div>
    </div>
  );
}