"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  Star,
  Pencil,
  Trash2,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code,
  Palette,
  Eye,
  Layout,
  Share2,
  Check,
} from "lucide-react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { getRelatedResourcesWithRationale } from "@/lib/related";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { ResourceCard } from "@/components/resource-card/resource-card";
import { ResourcePreview } from "@/components/resource-card/resource-preview";
import { Footer } from "@/components/layout/footer";

interface ResourceDetailProps {
  resource: Resource;
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
  const router = useRouter();
  const {
    resources,
    isFavorite,
    toggleFavorite,
    trackView,
    deleteResource,
  } = useResources();
  const { setEditingResourceId } = useUI();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackView(resource.id);
  }, [resource.id, trackView]);

  const relatedWithRationale = useMemo(
    () => getRelatedResourcesWithRationale(resource, resources, 4),
    [resource, resources]
  );

  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);

  const handleDelete = () => {
    if (window.confirm(`Delete "${resource.name}"? This cannot be undone.`)) {
      deleteResource(resource.id);
      router.push("/");
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const quadrants = [
    { label: "WHAT IT DOES", content: resource.whatItDoes },
    { label: "WHY USE IT", content: resource.whyUseIt },
    { label: "WHEN TO USE IT", content: resource.whenToUseIt },
    { label: "HOW TO USE IT", content: resource.howToUseIt },
  ];

  return (
    <div className="w-full flex-1 bg-white text-slate-900 font-sans select-none">
      <div className="mx-auto max-w-7xl py-8 sm:py-12 px-4 sm:px-8 lg:px-12 space-y-10">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 font-mono text-xs text-slate-500 border-b border-slate-200 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors uppercase font-bold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>BACK TO ALL SPECIMENS</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 hidden sm:inline">INDEXED: {new Date(resource.createdAt).toLocaleDateString()}</span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
              title="Copy Spec URL"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? "COPIED" : "SHARE"}</span>
            </button>
          </div>
        </div>

        {/* Specimen Header & Actions */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-bold uppercase">
              SPECIMEN // {resource.id}
            </span>
            {resource.featured && (
              <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-300 font-bold uppercase">
                FEATURED BENCHMARK
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">
                {resource.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {resource.description}
              </p>

              <div className="flex items-center gap-3 font-mono text-xs pt-1">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>{domain}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => toggleFavorite(resource.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs",
                  favorited
                    ? "bg-rose-50 text-rose-700 border-rose-300"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                )}
              >
                <Star className={cn("h-4 w-4", favorited ? "fill-rose-500 text-rose-500" : "text-slate-400")} />
                <span>{favorited ? "STARRED" : "STAR REFERENCE"}</span>
              </button>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>VISIT WEBSITE</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {resource.isUserAdded && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingResourceId(resource.id)}
                    className="p-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
                    title="Edit custom resource"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="p-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete custom resource"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Specimen Exhibition Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Visual Specimen Frame (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <ResourcePreview resource={resource} />
            </div>

            {/* 4-Quadrant Specifications Matrix */}
            <div className="space-y-4 pt-6">
              <div className="font-mono text-xs uppercase font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span>4-Quadrant Architectural Specifications</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quadrants.map(({ label, content }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                  >
                    <div className="font-mono text-[11px] font-black uppercase text-blue-600 tracking-wider">
                      {label}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {content || "Specification not documented."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Metadata Ledger Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-5">
              <div className="font-mono text-xs uppercase font-bold text-slate-900 border-b border-slate-200 pb-2">
                Taxonomy & Engineering Specs
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <div className="font-mono text-[10.5px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-blue-600" />
                  <span>CATEGORIES</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resource.categories.map((c) => (
                    <Link
                      key={c}
                      href={`/categories/${categoryMap[c]?.slug || c}`}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-800 hover:border-blue-400 font-medium transition-colors"
                    >
                      {categoryMap[c]?.name || c}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <div className="font-mono text-[10.5px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5 text-emerald-600" />
                  <span>TECHNOLOGIES</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(resource.technologies || ["Standard Web"]).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 font-mono text-xs font-semibold text-emerald-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Styles */}
              <div className="space-y-2">
                <div className="font-mono text-[10.5px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 text-amber-600" />
                  <span>VISUAL & INTERACTION STYLES</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(resource.styles || ["Modern Digital"]).map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 font-mono text-xs font-semibold text-amber-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <div className="font-mono text-[10.5px] uppercase font-bold text-slate-500">
                  ARCHIVAL TAGS
                </div>
                <div className="flex flex-wrap gap-1">
                  {(resource.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Adjacent Discovery & Related References */}
        {relatedWithRationale.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
                  Adjacent Discoveries & Related Benchmarks
                </h2>
              </div>
              <span className="font-mono text-xs text-slate-400 uppercase">
                {relatedWithRationale.length} SUGGESTIONS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedWithRationale.map(({ resource: rel, rationale }) => (
                <div key={rel.id} className="space-y-1.5">
                  <ResourceCard resource={rel} dense={true} />
                  <p className="text-[10px] font-mono text-slate-500 italic px-1 truncate">
                    &ldquo;{rationale}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
