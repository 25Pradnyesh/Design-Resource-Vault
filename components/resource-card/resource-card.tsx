"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ArrowUpRight, Info } from "lucide-react";
import { Resource, ScoredResource } from "@/types";
import { useResources } from "@/lib/resource-context";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { ResourcePreview } from "@/components/resource-card/resource-preview";

interface ResourceCardProps {
  resource: Resource;
  index?: number;
  scoredMatch?: ScoredResource;
  activeQuery?: string;
}

function FaviconBadge({ domain }: { domain: string }) {
  const [hasError, setHasError] = useState(false);
  const cleanDomain = domain.replace(/^www\./, "");
  const fallbackLetter = cleanDomain.charAt(0).toUpperCase() || "•";

  return (
    <div className="w-3.5 h-3.5 rounded-[3px] bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
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
        <span className="font-mono text-[7.5px] font-bold text-[var(--text-muted)] leading-none">
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
}: ResourceCardProps) {
  const { isFavorite, toggleFavorite } = useResources();
  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);

  const matchPercentage = scoredMatch?.matchPercentage;
  const matchExplanation = scoredMatch?.matchExplanation;

  // Curated archival tags
  const tags = resource.tags || [];
  const displayTags = tags.slice(0, 2);
  const remainingTagCount = Math.max(0, tags.length - 2);

  return (
    <div className="group resource-card relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-3 overflow-hidden select-none font-sans transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(11,19,43,0.08)] hover:border-[var(--border-strong)] motion-reduce:hover:translate-y-0">
      {/* Top Left: Active Match Score Pill (when querying) */}
      {activeQuery && matchPercentage !== undefined && (
        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
          <span
            className={cn(
              "px-2 py-0.5 rounded-full font-mono text-[9px] font-bold border backdrop-blur-xs shadow-2xs",
              matchPercentage >= 85
                ? "bg-[var(--intel-high-bg)] text-[var(--intel-high)] border-[var(--intel-high-border)]"
                : "bg-[var(--intel-med-bg)] text-[var(--intel-med)] border-[var(--intel-med-border)] font-black"
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
        className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-black/8 text-[var(--text-muted)] hover:text-[var(--accent-coral)] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
        aria-label={favorited ? `Remove ${resource.name} from favorites` : `Add ${resource.name} to favorites`}
      >
        <Heart
          className={cn(
            "h-3.5 w-3.5 transition-colors",
            favorited
              ? "fill-[var(--accent-coral)] text-[var(--accent-coral)]"
              : "text-[var(--text-muted)] opacity-60 group-hover:opacity-100"
          )}
        />
      </button>

      {/* ZONE 1: Visual Preview Frame */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mb-3 overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] group/preview"
        aria-label={`Visit ${resource.name} website`}
      >
        <ResourcePreview resource={resource} />
      </a>

      {/* Contextual Match Rationale (shown on active search query) */}
      {activeQuery && matchExplanation && (
        <div className="mb-2 px-2.5 py-1 rounded-lg bg-[var(--surface-muted)] text-[10px] text-[var(--text-secondary)] line-clamp-1 italic font-sans border border-[var(--border)]">
          &ldquo;{matchExplanation}&rdquo;
        </div>
      )}

      {/* ZONE 2: Identity (Title & Domain) */}
      <div className="flex flex-col gap-1 mb-2.5">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded-sm group/title block"
          title={`Visit ${domain}`}
        >
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs sm:text-[13px] font-bold text-[var(--text-primary)] group-hover/title:text-[var(--accent)] line-clamp-1 transition-colors leading-snug">
              {resource.name}
            </h3>
            {resource.featured && (
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0 shadow-xs" title="Featured Resource" />
            )}
          </div>
        </a>

        {/* Domain & Source line with Resilient Favicon Badge */}
        <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[var(--text-muted)]">
          <FaviconBadge domain={domain} />
          <span className="truncate font-medium hover:text-[var(--text-secondary)] transition-colors">{domain}</span>
        </div>
      </div>

      {/* ZONE 3: Archive Metadata (Tags) & Action Affordances */}
      <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-[var(--border)]/70 mt-auto">
        {/* Archival Tag Pills - Responsive truncation to prevent mobile crushing */}
        <div className="flex items-center gap-1 overflow-hidden min-w-0 flex-1">
          {displayTags.length > 0 && (
            <span
              className="font-mono text-[9px] font-semibold text-[var(--text-secondary)] bg-[var(--surface-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded tracking-tight uppercase truncate max-w-[90px]"
              title={displayTags[0]}
            >
              {displayTags[0]}
            </span>
          )}
          {displayTags.length > 1 && (
            <span
              className="hidden sm:inline-block font-mono text-[9px] font-semibold text-[var(--text-secondary)] bg-[var(--surface-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded tracking-tight uppercase truncate max-w-[85px]"
              title={displayTags[1]}
            >
              {displayTags[1]}
            </span>
          )}
          {remainingTagCount > 0 && (
            <span
              className="font-mono text-[8.5px] text-[var(--text-muted)] font-medium shrink-0"
              title={`${remainingTagCount} more tags`}
            >
              +{remainingTagCount}
            </span>
          )}
        </div>

        {/* Action Affordance Controls */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Detail Page Link (Internal Documentation) */}
          <Link
            href={`/resources/${resource.slug}`}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors inline-flex items-center justify-center focus-visible:ring-1 focus-visible:ring-[var(--accent)] outline-none"
            title={`View ${resource.name} specifications & details`}
            aria-label={`View details for ${resource.name}`}
          >
            <Info className="h-3.5 w-3.5" />
          </Link>

          {/* Direct External Link */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-muted)] transition-colors inline-flex items-center justify-center group/arrow focus-visible:ring-1 focus-visible:ring-[var(--accent)] outline-none"
            title={`Open ${domain} in new tab`}
            aria-label={`Open ${resource.name} website`}
          >
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--text-muted)] group-hover/arrow:text-[var(--accent)] motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
