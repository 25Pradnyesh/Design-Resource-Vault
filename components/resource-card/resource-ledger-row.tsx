"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ArrowUpRight, Maximize2 } from "lucide-react";
import { Resource, ScoredResource } from "@/types";
import { categoryMap } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { cn, getDomainFromUrl } from "@/lib/utils";

interface ResourceLedgerRowProps {
  resource: Resource;
  index: number;
  scoredMatch?: ScoredResource;
}

export function ResourceLedgerRow({
  resource,
  index,
  scoredMatch,
}: ResourceLedgerRowProps) {
  const { isFavorite, toggleFavorite } = useResources();
  const { setInspectResourceId } = useUI();
  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);
  const primaryCat = categoryMap[resource.categories[0]];

  const [hasFaviconError, setHasFaviconError] = useState(false);
  const cleanDomain = domain.replace(/^www\./, "");

  return (
    <tr className="group border-b border-slate-200 hover:bg-slate-50 transition-colors font-sans text-xs">
      {/* Index number */}
      <td className="py-3 px-3 font-mono text-[11px] text-slate-400 font-medium">
        {String(index + 1).padStart(3, "0")}
      </td>

      {/* Name, Domain, Favicon */}
      <td className="py-3 px-3 min-w-[200px]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
            {!hasFaviconError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=32`}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5 object-contain"
                onError={() => setHasFaviconError(true)}
                loading="lazy"
              />
            ) : (
              <span className="font-mono text-[9px] font-bold text-slate-500">
                {resource.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => setInspectResourceId(resource.id)}
              className="text-left font-bold text-slate-900 group-hover:text-blue-600 truncate block outline-none hover:underline cursor-pointer"
            >
              {resource.name}
            </button>
            <div className="font-mono text-[10px] text-slate-400 truncate">
              {domain}
            </div>
          </div>
        </div>
      </td>

      {/* Primary Category */}
      <td className="py-3 px-3 hidden md:table-cell">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-700 font-medium truncate max-w-[140px]">
          {primaryCat?.name || "Uncategorized"}
        </span>
      </td>

      {/* Technologies & Tags */}
      <td className="py-3 px-3 hidden lg:table-cell">
        <div className="flex items-center gap-1 flex-wrap">
          {(resource.technologies || resource.tags || []).slice(0, 3).map((item) => (
            <span
              key={item}
              className="font-mono text-[9.5px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </td>

      {/* Style Archetype */}
      <td className="py-3 px-3 hidden xl:table-cell font-mono text-[10.5px] text-slate-600">
        {resource.styles?.[0] || resource.purpose || "—"}
      </td>

      {/* Actions (Favorite, Inspect, Link) */}
      <td className="py-3 px-3 text-right">
        <div className="flex items-center justify-end gap-1.5">
          {/* Favorite */}
          <button
            type="button"
            onClick={() => toggleFavorite(resource.id)}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            aria-label={favorited ? "Remove favorite" : "Add favorite"}
          >
            <Heart
              className={cn(
                "h-3.5 w-3.5",
                favorited ? "fill-rose-500 text-rose-500" : "text-slate-400"
              )}
            />
          </button>

          {/* Quick Inspect Drawer */}
          <button
            type="button"
            onClick={() => setInspectResourceId(resource.id)}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-900 hover:text-white border border-slate-300 font-mono text-[10px] font-bold text-slate-700 transition-all flex items-center gap-1 cursor-pointer"
            title="Inspect full 4-quadrant specifications"
          >
            <Maximize2 className="h-3 w-3" />
            <span>INSPECT</span>
          </button>

          {/* Full Page Link */}
          <Link
            href={`/resources/${resource.slug}`}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors font-mono text-[10px] font-bold"
            title="Open Spec Page"
          >
            SPEC
          </Link>

          {/* Direct Link */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
            title={`Visit ${domain}`}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </td>
    </tr>
  );
}
