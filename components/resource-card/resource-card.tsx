"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Star, ArrowUpRight } from "lucide-react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

export function FaviconBadge({ url, name }: { url: string; name: string }) {
  const [imgError, setImgError] = useState(false);
  const domain = getDomainFromUrl(url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 p-1 transition-colors group-hover:border-foreground/20">
      {!imgError ? (
        <img
          src={faviconUrl}
          alt={name}
          className="h-4 w-4 rounded-sm object-contain"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <span className="text-[11px] font-bold tracking-tighter text-muted-foreground uppercase">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  const { isFavorite, toggleFavorite } = useResources();
  const favorited = isFavorite(resource.id);
  
  const primaryCategory = categoryMap[resource.categories[0]];
  const additionalCategoriesCount = resource.categories.length - 1;
  const domain = getDomainFromUrl(resource.url);

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2), ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20"
    >
      <div>
        {/* Header with Favicon, Title, and Favorite Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <FaviconBadge url={resource.url} name={resource.name} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link
                  href={`/resources/${resource.slug}`}
                  className="font-medium text-sm tracking-tight hover:text-foreground text-foreground/90 hover:underline underline-offset-2 transition-colors truncate"
                >
                  {resource.name}
                </Link>
                {resource.featured && (
                  <Badge variant="outline" className="shrink-0 text-[10px] py-0 px-1.5 font-normal bg-accent/40 border-accent text-muted-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground/80 tracking-tight font-mono truncate mt-0.5">
                {domain}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-7 w-7 rounded-md hover:bg-accent/60 text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(resource.id);
            }}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <motion.div
              animate={{ scale: favorited ? [1, 1.25, 1] : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Star
                className={cn(
                  "h-3.5 w-3.5 transition-colors",
                  favorited ? "fill-amber-400 text-amber-400" : "text-muted-foreground/60 group-hover:text-muted-foreground"
                )}
              />
            </motion.div>
          </Button>
        </div>

        {/* Short Description */}
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {resource.description}
        </p>

        {/* Categories & Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {primaryCategory && (
            <Badge variant="secondary" className="text-[10px] font-normal py-0.5 px-2 bg-secondary/70 text-secondary-foreground">
              <span className="mr-1">{primaryCategory.emoji}</span>
              {primaryCategory.name}
            </Badge>
          )}
          {additionalCategoriesCount > 0 && (
            <Badge variant="outline" className="text-[10px] font-normal py-0.5 px-1.5 text-muted-foreground">
              +{additionalCategoriesCount}
            </Badge>
          )}

          {resource.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] font-normal py-0.5 px-1.5 text-muted-foreground/90 border-border/60">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-2.5">
        <Link
          href={`/resources/${resource.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group/link"
        >
          View details
          <ArrowUpRight className="h-3 w-3 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </Link>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-3 w-3" />
          Visit
        </a>
      </div>
    </motion.article>
  );
}
