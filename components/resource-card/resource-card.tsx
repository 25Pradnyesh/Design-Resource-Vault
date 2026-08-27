"use client";

import Link from "next/link";
import { Heart, ArrowUpRight, Info } from "lucide-react";
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
    <div className="group resource-card relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-3 overflow-hidden hover:border-[#CBD5E1] hover:bg-white select-none font-sans transition-all duration-200">
      {/* Top Left: Active Match Score Pill (when querying) */}
      {activeQuery && matchPercentage !== undefined && (
        <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold border backdrop-blur-xs shadow-2xs",
              matchPercentage >= 85
                ? "bg-emerald-500 text-white border-emerald-600/30"
                : "bg-[#00C4CC] text-[#0B132B] border-[#00C4CC]/30 font-black"
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
        className="absolute top-3.5 right-3.5 z-20 p-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-black/8 text-[#64748B] hover:text-[#FA5252] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-2xs"
        aria-label={favorited ? `Remove ${resource.name} from favorites` : `Add ${resource.name} to favorites`}
      >
        <Heart
          className={cn(
            "h-3.5 w-3.5 transition-colors",
            favorited
              ? "fill-[#FA5252] text-[#FA5252]"
              : "text-[#94A3B8] group-hover:text-[#64748B]"
          )}
        />
      </button>

      {/* Visual Preview Frame */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mb-2.5 overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#00C4CC] group/preview"
        aria-label={`Visit ${resource.name} website`}
      >
        <ResourcePreview resource={resource} />
      </a>

      {/* Contextual Match Rationale (shown on active search query) */}
      {activeQuery && matchExplanation && (
        <div className="mb-2 px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[10px] text-[#334155] line-clamp-1 italic font-sans border border-[#E2E8F0]">
          &ldquo;{matchExplanation}&rdquo;
        </div>
      )}

      {/* Bottom Metadata & Controls */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E2E8F0]/70">
        {/* Resource Name and Domain */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 outline-none group/title block"
          title={`Visit ${domain}`}
        >
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs sm:text-[13px] font-bold text-[#0B132B] group-hover/title:text-[#00C4CC] truncate transition-colors">
              {resource.name}
            </h3>
            {resource.featured && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C4CC] shrink-0 shadow-xs" title="Featured Resource" />
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#64748B] truncate">
            <span className="truncate font-semibold">{domain}</span>
            {primaryCat && (
              <>
                <span className="opacity-40">·</span>
                <span className="truncate opacity-80">{primaryCat.name}</span>
              </>
            )}
          </div>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Detail Page Link (Internal Documentation) */}
          <Link
            href={`/resources/${resource.slug}`}
            className="p-1.5 rounded-full text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9] transition-colors inline-flex items-center justify-center"
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
            className="p-1.5 rounded-full text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9] transition-colors inline-flex items-center justify-center"
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
