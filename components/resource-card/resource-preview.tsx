"use client";

import Image from "next/image";
import { useState } from "react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";
import { getDomainFromUrl } from "@/lib/utils";
import { Category3DIcon } from "@/components/ui/category-3d-icon";

interface ResourcePreviewProps {
  resource: Resource;
  className?: string;
}

// Deterministic fresh multi-color palette pairing based on resource ID
function getFallbackTheme(id: string): {
  bg: string;
  border: string;
  iconTint: string;
} {
  const hash = id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const themes = [
    { bg: "#EBF5FF", border: "#BFDBFE", iconTint: "#0284C7" },
    { bg: "#ECFDF5", border: "#A7F3D0", iconTint: "#059669" },
    { bg: "#F0FDFA", border: "#99F6E4", iconTint: "#0D9488" },
    { bg: "#FFFBEB", border: "#FDE68A", iconTint: "#D97706" },
    { bg: "#FFF1F2", border: "#FECDD3", iconTint: "#E11D48" },
    { bg: "#F8FAFC", border: "#E2E8F0", iconTint: "#2563EB" },
  ];

  return themes[hash % themes.length];
}

export function ResourcePreview({
  resource,
  className = "",
}: ResourcePreviewProps) {
  const [imgError, setImgError] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  const domain = getDomainFromUrl(resource.url);
  const primaryCatId = resource.categories[0] || "ui-web-inspiration";
  const primaryCategory = categoryMap[primaryCatId];
  const theme = getFallbackTheme(resource.id);

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  // Tier 1: Real Static Preview Image
  if (resource.previewImage && !imgError) {
    return (
      <div
        className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[var(--surface-muted)] border border-[#E2E8F0] ${className}`}
      >
        <Image
          src={resource.previewImage}
          alt={resource.name}
          width={800}
          height={500}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Supporting identity badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-black/8 shadow-2xs font-mono text-[9px] text-[#0B132B]">
          {!faviconError && (
            <img
              src={faviconUrl}
              alt=""
              width={12}
              height={12}
              className="h-3 w-3 rounded-full object-contain"
              onError={() => setFaviconError(true)}
              loading="lazy"
            />
          )}

          <span className="truncate max-w-[130px] font-bold">
            {domain}
          </span>
        </div>
      </div>
    );
  }

  // Tier 2: Deterministic Fresh 3D Vector Preview
  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl border flex flex-col justify-between p-3 select-none transition-all duration-200 ${className}`}
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border,
      }}
    >
      {/* Subtle Background Radial Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-28 h-28 rounded-full border border-dashed border-current -translate-x-4 -translate-y-2" />
        <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Top Bar: Category Label & Mini Favicon */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="font-mono text-[9px] font-black uppercase tracking-wider text-[#64748B] truncate max-w-[70%]">
          {primaryCategory?.name ?? "REFERENCE"}
        </span>

        {!faviconError ? (
          <div className="h-5 w-5 rounded-full bg-white/95 border border-black/8 flex items-center justify-center p-0.5 shadow-2xs shrink-0">
            <img
              src={faviconUrl}
              alt=""
              width={12}
              height={12}
              className="h-3 w-3 object-contain"
              onError={() => setFaviconError(true)}
              loading="lazy"
            />
          </div>
        ) : (
          <span className="h-4 w-4 rounded-full bg-black/5 flex items-center justify-center font-mono text-[8px] font-bold text-[#64748B]">
            {resource.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Center: Dominant 3D Category Artwork */}
      <div className="relative z-10 my-auto flex items-center justify-center py-1">
        <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Category3DIcon id={primaryCatId} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Bottom Bar: Monospace Domain Bar */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-black/8 font-mono text-[9px] text-[#64748B]">
        <span className="truncate max-w-[140px] font-bold text-[#0B132B]">
          {domain}
        </span>

        <span className="text-[8px] uppercase tracking-wider font-semibold opacity-60">
          INDEX
        </span>
      </div>
    </div>
  );
}