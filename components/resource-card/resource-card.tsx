"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Star, ArrowUpRight } from "lucide-react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { CategoryIcon } from "@/components/ui/category-icon";

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

export function FaviconBadge({ url, name }: { url: string; name: string }) {
  const [imgError, setImgError] = useState(false);
  const domain = getDomainFromUrl(url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] font-display text-xs font-bold text-[var(--text-muted)] uppercase overflow-hidden">
      {!imgError ? (
        <img
          src={faviconUrl}
          alt={name}
          className="h-4 w-4 rounded-xs object-contain"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <span>{name.charAt(0)}</span>
      )}
    </div>
  );
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { isFavorite, toggleFavorite } = useResources();
  const favorited = isFavorite(resource.id);
  const primaryCategory = categoryMap[resource.categories[0]];
  const domain = getDomainFromUrl(resource.url);

  return (
    <div className="group archive-tile relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 overflow-hidden hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] select-none font-sans">
      <div>
        {/* Header: Badge & Favorite Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <FaviconBadge url={resource.url} name={resource.name} />

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(resource.id);
            }}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 cursor-pointer"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={cn(
                "h-3.5 w-3.5 transition-colors",
                favorited ? "fill-[var(--warm-cream)] text-[var(--deep-muted-green)] font-bold" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
              )}
            />
          </button>
        </div>

        {/* Title & Domain */}
        <Link href={`/resources/${resource.slug}`} className="block group/link">
          <h3 className="font-display text-sm sm:text-base font-bold tracking-tight text-[var(--text-primary)] group-hover/link:text-[var(--accent)] transition-colors truncate">
            {resource.name}
          </h3>
          <p className="text-[11px] font-mono text-[var(--text-muted)] truncate mt-0.5">
            {domain}
          </p>
        </Link>
      </div>

      {/* Footer: Category Tag & Detail Link */}
      <div className="mt-4 pt-3 border-t border-[var(--border)]/60 flex items-center justify-between font-mono text-[10px]">
        {primaryCategory ? (
          <span className="truncate text-[var(--text-secondary)] bg-[var(--surface-muted)] px-2 py-0.5 rounded text-[10px] flex items-center gap-1.5 font-sans">
            <span className="h-3 w-3 shrink-0 flex items-center justify-center">
              <CategoryIcon id={primaryCategory.id} className="h-3 w-3" />
            </span>
            <span className="truncate">{primaryCategory.name}</span>
          </span>
        ) : (
          <span className="text-[var(--text-muted)]">{domain}</span>
        )}

        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <Link
            href={`/resources/${resource.slug}`}
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-0.5"
            title="View Details"
          >
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
            title="Visit Website"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

