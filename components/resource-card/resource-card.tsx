"use client";

import Link from "next/link";
import { Star, ArrowUpRight, Info } from "lucide-react";
import { Resource, ScoredResource } from "@/types";
import { categoryMap } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { ResourcePreview } from "@/components/resource-card/resource-preview";

interface ResourceCardProps {
  resource: Resource;
  index?: number;
  scoredMatch?: ScoredResource;
  activeQuery?: string;
}

export function ResourceCard({
  resource,
  scoredMatch,
  activeQuery,
}: ResourceCardProps) {
  const { isFavorite, toggleFavorite } = useResources();
  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);
  const primaryCat = categoryMap[resource.categories[0]];

  const matchPercentage = scoredMatch?.matchPercentage;
  const matchExplanation = scoredMatch?.matchExplanation;

  return (
    <div className="group resource-card relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3 overflow-hidden hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] select-none font-sans">
      {/* Top Left: Active Match Score Pill (when querying) */}
      {activeQuery && matchPercentage !== undefined && (
        <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
          <span
            className={cn(
              "px-2 py-0.5 rounded-md font-mono text-[9px] font-bold border backdrop-blur-xs shadow-2xs",
              matchPercentage >= 85
                ? "bg-emerald-500/90 text-white border-emerald-600/30"
                : "bg-[var(--accent)]/90 text-white border-[var(--accent-hover)]/30"
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
        className="absolute top-3.5 right-3.5 z-20 p-1.5 rounded-md bg-white/90 backdrop-blur-xs border border-black/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:scale-105 transition-all cursor-pointer shadow-2xs"
        aria-label={favorited ? `Remove ${resource.name} from favorites` : `Add ${resource.name} to favorites`}
      >
        <Star
          className={cn(
            "h-3.5 w-3.5 transition-colors",
            favorited
              ? "fill-[var(--accent)] text-[var(--accent)] font-bold"
              : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
          )}
        />
      </button>

      {/* Visual Preview Frame */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mb-2.5 overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] group/preview"
        aria-label={`Visit ${resource.name} website`}
      >
        <ResourcePreview resource={resource} />
      </a>

      {/* Contextual Match Rationale (shown on active search query) */}
      {activeQuery && matchExplanation && (
        <div className="mb-2 px-2 py-1 rounded-md bg-[var(--surface-muted)] text-[10px] text-[var(--text-secondary)] line-clamp-1 italic font-sans border border-[var(--border)]/50">
          &ldquo;{matchExplanation}&rdquo;
        </div>
      )}

      {/* Bottom Metadata & Controls */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--border)]/60">
        {/* Resource Name and Domain */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 outline-none group/title block"
          title={`Visit ${domain}`}
        >
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs sm:text-[13px] font-semibold text-[var(--text-primary)] group-hover/title:text-[var(--accent)] truncate transition-colors">
              {resource.name}
            </h3>
            {resource.featured && (
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" title="Featured Resource" />
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)] truncate">
            <span className="truncate">{domain}</span>
            {primaryCat && (
              <>
                <span className="opacity-40">·</span>
                <span className="truncate opacity-75">{primaryCat.name}</span>
              </>
            )}
          </div>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Detail Page Link (Internal Documentation) */}
          <Link
            href={`/resources/${resource.slug}`}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors inline-flex items-center justify-center"
            title="View resource specifications & details"
            aria-label={`View details for ${resource.name}`}
          >
            <Info className="h-3.5 w-3.5" />
          </Link>

          {/* Direct External Link */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center justify-center"
            title={`Open ${domain}`}
            aria-label={`Open ${resource.name} website`}
          >
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-140 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
