"use client";

import Link from "next/link";
import { Star, ArrowUpRight, Info } from "lucide-react";
import { Resource } from "@/types";
import { useResources } from "@/lib/resource-context";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { ResourcePreview } from "@/components/resource-card/resource-preview";

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { isFavorite, toggleFavorite } = useResources();
  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);

  return (
    <div className="group resource-card relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3 overflow-hidden hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] select-none font-sans">
      {/* Top Floating Action: Favorite Button (Isolated button, no navigation) */}
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

      {/* Visual Preview (Independent external anchor) */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mb-2.5 overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] group/preview"
        aria-label={`Visit ${resource.name} website`}
      >
        <ResourcePreview resource={resource} />
      </a>

      {/* Bottom Strip: Resource Name & Domain (External Link) + Internal Info Link + External Arrow */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--border)]/60">
        {/* Resource Name and Domain */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 outline-none group/title block"
          title={`Visit ${domain}`}
        >
          <h3 className="text-xs sm:text-[13px] font-semibold text-[var(--text-primary)] group-hover/title:text-[var(--accent)] truncate transition-colors">
            {resource.name}
          </h3>
          <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
            {domain}
          </p>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Detail Page Link (Internal Documentation) */}
          <Link
            href={`/resources/${resource.slug}`}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors inline-flex items-center justify-center"
            title="View resource documentation & details"
            aria-label={`View details for ${resource.name}`}
          >
            <Info className="h-3 w-3" />
          </Link>

          {/* Direct Visit External Arrow Indicator */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center justify-center"
            title={`Open ${domain}`}
            aria-label={`Open ${resource.name} website`}
          >
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
