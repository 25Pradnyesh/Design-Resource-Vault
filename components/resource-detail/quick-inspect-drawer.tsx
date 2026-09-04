"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Heart,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code,
  Palette,
  Compass,
} from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { categoryMap } from "@/data/categories";
import { getDomainFromUrl, cn } from "@/lib/utils";
import { ResourcePreview } from "@/components/resource-card/resource-preview";

export function QuickInspectDrawer() {
  const { resources, isFavorite, toggleFavorite, trackView } = useResources();
  const { inspectResourceId, setInspectResourceId } = useUI();

  const resource = resources.find((r) => r.id === inspectResourceId);

  useEffect(() => {
    if (resource) {
      trackView(resource.id);
    }
  }, [resource, trackView]);

  // Keyboard ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && inspectResourceId) {
        setInspectResourceId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inspectResourceId, setInspectResourceId]);

  if (!resource) return null;

  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);

  const quadrants = [
    { label: "WHAT IT DOES", value: resource.whatItDoes },
    { label: "WHY USE IT", value: resource.whyUseIt },
    { label: "WHEN TO USE IT", value: resource.whenToUseIt },
    { label: "HOW TO USE IT", value: resource.howToUseIt },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setInspectResourceId(null)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative z-50 w-full max-w-xl bg-white shadow-2xl border-l border-slate-200 flex flex-col h-full overflow-hidden animate-drawer-in font-sans">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 uppercase">
            <span className="h-2 w-2 rounded-full bg-blue-600 inline-block" />
            <span>SPECIFICATION INSPECTOR // {resource.id}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Favorite button */}
            <button
              type="button"
              onClick={() => toggleFavorite(resource.id)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              aria-label={favorited ? "Remove favorite" : "Add favorite"}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  favorited ? "fill-rose-500 text-rose-500" : "text-slate-400"
                )}
              />
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setInspectResourceId(null)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close inspector"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Visual Specimen Preview */}
          <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <ResourcePreview resource={resource} />
          </div>

          {/* Title & Domain Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight">
                  {resource.name}
                </h2>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-blue-600 hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <span>{domain}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
              >
                <span>VISIT</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Taxonomy & Metadata Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="font-mono text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Layers className="h-3 w-3 text-blue-600" />
                <span>CATEGORIES</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {resource.categories.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10.5px] font-medium text-slate-700"
                  >
                    {categoryMap[c]?.name || c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Code className="h-3 w-3 text-emerald-600" />
                <span>TECH STACK</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {(resource.technologies || ["Web Standards"]).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10.5px] font-mono text-emerald-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Quadrant Specifications */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase font-bold text-slate-900 border-b border-slate-200 pb-1.5">
              4-Quadrant Architectural Specifications
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {quadrants.map(({ label, value }) => (
                <div
                  key={label}
                  className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1 shadow-2xs"
                >
                  <div className="font-mono text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {label}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {value || "No detailed specification provided."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <Link
            href={`/resources/${resource.slug}`}
            onClick={() => setInspectResourceId(null)}
            className="text-xs font-mono font-bold text-slate-700 hover:text-blue-600 underline"
          >
            OPEN FULL DOSSIER PAGE →
          </Link>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>LAUNCH WEBSITE</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
