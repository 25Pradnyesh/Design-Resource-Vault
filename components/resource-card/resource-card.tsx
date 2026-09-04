"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ArrowUpRight, Maximize2 } from "lucide-react";
import { Resource, ScoredResource } from "@/types";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { ResourcePreview } from "@/components/resource-card/resource-preview";

interface ResourceCardProps {
  resource: Resource;
  index?: number;
  scoredMatch?: ScoredResource;
  activeQuery?: string;
  dense?: boolean;
}

function FaviconBadge({ domain }: { domain: string }) {
  const [hasError, setHasError] = useState(false);
  const cleanDomain = domain.replace(/^www\./, "");
  const fallbackLetter = cleanDomain.charAt(0).toUpperCase() || "•";

  return (
    <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
      {!hasError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=32`}
          alt=""
          width={12}
          height={12}
          className="h-3 w-3 object-contain opacity-90"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <span className="font-mono text-[8px] font-bold text-slate-500 leading-none">
          {fallbackLetter}
        </span>
      )}
    </div>
  );
}

export function ResourceCard({
  resource,
  scoredMatch,
  activeQuery,
  dense = false,
}: ResourceCardProps) {
  const { isFavorite, toggleFavorite } = useResources();
  const { setInspectResourceId } = useUI();
  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);

  const matchPercentage = scoredMatch?.matchPercentage;
  const matchExplanation = scoredMatch?.matchExplanation;

  // Curated tags
  const tags = resource.tags || [];
  const displayTags = dense ? tags.slice(0, 1) : tags.slice(0, 2);
  const remainingTagCount = Math.max(0, tags.length - (dense ? 1 : 2));

  return (
    <div
      className={cn(
        "group resource-card relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-white overflow-hidden select-none font-sans transition-all duration-200 hover:border-slate-400 hover:shadow-md",
        dense ? "p-2.5" : "p-3.5"
      )}
    >
      {/* Top Left: Active Match Score Pill (when searching) */}
      {activeQuery && matchPercentage !== undefined && (
        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
          <span
            className={cn(
              "px-2 py-0.5 rounded font-mono text-[9px] font-bold border backdrop-blur-xs shadow-xs",
              matchPercentage >= 85
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-blue-50 text-blue-700 border-blue-300"
            )}
          >
            {matchPercentage}% MATCH
          </span>
        </div>
      )}

      {/* Top Right: Favorite Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(resource.id);
        }}
        className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
        aria-label={favorited ? `Remove ${resource.name} from favorites` : `Add ${resource.name} to favorites`}
      >
        <Heart
          className={cn(
            "h-3.5 w-3.5 transition-colors",
            favorited
              ? "fill-rose-500 text-rose-500"
              : "text-slate-400 opacity-70 group-hover:opacity-100"
          )}
        />
      </button>

      {/* ZONE 1: Visual Specimen Frame with Quick Inspect Trigger */}
      <div className="relative block w-full mb-3 overflow-hidden rounded-lg group/preview">
        <button
          type="button"
          onClick={() => setInspectResourceId(resource.id)}
          className="w-full block text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
          aria-label={`Inspect ${resource.name} specifications`}
        >
          <ResourcePreview resource={resource} dense={dense} />
        </button>

        {/* Quick Inspect Hover Overlay Button */}
        <button
          type="button"
          onClick={() => setInspectResourceId(resource.id)}
          className="absolute bottom-2 right-2 z-10 px-2.5 py-1 rounded bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] font-medium opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 shadow-sm hover:bg-black cursor-pointer"
        >
          <Maximize2 className="h-3 w-3 text-cyan-400" />
          <span>INSPECT</span>
        </button>
      </div>

      {/* Contextual Match Rationale (shown on active search query) */}
      {activeQuery && matchExplanation && (
        <div className="mb-2 px-2.5 py-1 rounded bg-slate-50 text-[10.5px] text-slate-600 line-clamp-1 italic font-sans border border-slate-200">
          &ldquo;{matchExplanation}&rdquo;
        </div>
      )}

      {/* ZONE 2: Identity (Title, Domain & Description) */}
      <div className="flex flex-col gap-1 mb-2.5">
        <div className="flex items-center justify-between gap-1.5">
          <button
            type="button"
            onClick={() => setInspectResourceId(resource.id)}
            className="text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xs group/title block"
            title={`Inspect ${resource.name}`}
          >
            <h3 className="text-[13px] sm:text-[14px] font-bold text-slate-900 group-hover/title:text-blue-600 line-clamp-1 transition-colors leading-snug">
              {resource.name}
            </h3>
          </button>
          {resource.featured && (
            <span className="px-1.5 py-0.2 bg-amber-50 border border-amber-300 text-amber-700 text-[8.5px] font-mono font-bold rounded uppercase shrink-0">
              FEATURED
            </span>
          )}
        </div>

        {/* Domain & Source line */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
          <FaviconBadge domain={domain} />
          <span className="truncate font-medium">{domain}</span>
        </div>

        {!dense && (
          <p className="text-[11.5px] text-slate-600 line-clamp-2 leading-relaxed mt-0.5 font-normal">
            {resource.description}
          </p>
        )}
      </div>

      {/* ZONE 3: Archival Metadata (Tags) & Quick Actions */}
      <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-slate-100 mt-auto">
        {/* Archival Tag Pills */}
        <div className="flex items-center gap-1 overflow-hidden min-w-0 flex-1">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9.5px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded tracking-tight uppercase truncate max-w-[90px]"
              title={tag}
            >
              {tag}
            </span>
          ))}
          {remainingTagCount > 0 && (
            <span
              className="font-mono text-[9px] text-slate-400 font-bold shrink-0"
              title={`${remainingTagCount} more tags`}
            >
              +{remainingTagCount}
            </span>
          )}
        </div>

        {/* Action Affordance Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Detailed Spec Page Link */}
          <Link
            href={`/resources/${resource.slug}`}
            className="p-1 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
            title={`Open full specification page for ${resource.name}`}
            aria-label={`View full dossier for ${resource.name}`}
          >
            <span className="font-mono text-[10px] font-bold uppercase text-slate-500 hover:text-slate-900">
              SPEC
            </span>
          </Link>

          {/* Direct External Link */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors inline-flex items-center justify-center group/arrow focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
            title={`Visit ${domain}`}
            aria-label={`Visit ${resource.name} website`}
          >
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
