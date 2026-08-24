"use client";

import Image from "next/image";
import { useState } from "react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";
import { getDomainFromUrl } from "@/lib/utils";
import { CategoryIcon } from "@/components/ui/category-icon";

interface ResourcePreviewProps {
  resource: Resource;
  className?: string;
}

// Subtle deterministic palette pairing based on resource ID
function getFallbackTheme(id: string): {
  bg: string;
  border: string;
  iconTint: string;
} {
  const hash = id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const themes = [
    { bg: "#F4F0EA", border: "#E5E2DC", iconTint: "#C85A32" },
    { bg: "#EFECE6", border: "#E0DDD6", iconTint: "#18181B" },
    { bg: "#ECEFEA", border: "#D8DED4", iconTint: "#3D6B52" },
    { bg: "#EAF0F4", border: "#D4DEE6", iconTint: "#2B5C8F" },
    { bg: "#F2ECE6", border: "#E5DDD4", iconTint: "#A66B24" },
    { bg: "#EFEFEF", border: "#E2E2E2", iconTint: "#57534E" },
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
  const primaryCatId =
    resource.categories[0] || "ui-web-inspiration";
  const primaryCategory = categoryMap[primaryCatId];
  const theme = getFallbackTheme(resource.id);

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  // Tier 1: Real Static Preview Image
  if (resource.previewImage && !imgError) {
    return (
      <div
        className={`relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] ${className}`}
      >
        <Image
          src={resource.previewImage}
          alt={resource.name}
          width={800}
          height={500}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-103"
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Supporting identity badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs border border-black/8 shadow-2xs font-mono text-[9px] text-[var(--text-primary)]">
          {!faviconError && (
            <img
              src={faviconUrl}
              alt=""
              width={12}
              height={12}
              className="h-3 w-3 rounded-xs object-contain"
              onError={() => setFaviconError(true)}
              loading="lazy"
            />
          )}

          <span className="truncate max-w-[130px] font-medium">
            {domain}
          </span>
        </div>
      </div>
    );
  }

  // Tier 2: Deterministic Local Editorial Preview
  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-lg border flex flex-col justify-between p-3 select-none transition-all duration-200 ${className}`}
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border,
      }}
    >
      {/* Background Graphic Blueprint Geometry */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-28 h-28 rounded-full border-2 border-dashed border-current -translate-x-4 -translate-y-2" />

        <div className="absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Top Bar: Category Label & Mini Favicon */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] truncate max-w-[70%]">
          {primaryCategory?.name ?? "REFERENCE"}
        </span>

        {!faviconError ? (
          <div className="h-4.5 w-4.5 rounded bg-white/90 border border-black/8 flex items-center justify-center p-0.5 shadow-2xs shrink-0">
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
          <span className="h-4 w-4 rounded bg-black/5 flex items-center justify-center font-mono text-[8px] font-bold text-[var(--text-muted)]">
            {resource.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Center: Dominant Category Geometric Symbol */}
      <div className="relative z-10 my-auto flex items-center justify-center py-1">
        <div
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{ color: theme.iconTint }}
        >
          <CategoryIcon
            id={primaryCatId}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Bottom Bar: Monospace Domain Bar */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-black/8 font-mono text-[9px] text-[var(--text-muted)]">
        <span className="truncate max-w-[140px] font-medium">
          {domain}
        </span>

        <span className="text-[8px] uppercase tracking-wider opacity-60">
          REFERENCE
        </span>
      </div>
    </div>
  );
}