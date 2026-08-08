"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  Pencil,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { getRelatedResources } from "@/lib/related";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/resource-card/resource-card";

interface ResourceDetailProps {
  resource: Resource;
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
  const {
    resources,
    isFavorite,
    toggleFavorite,
    trackView,
    deleteResource,
  } = useResources();
  const { setEditingResourceId } = useUI();

  useEffect(() => {
    trackView(resource.id);
  }, [resource.id, trackView]);

  const related = getRelatedResources(resource, resources, 6);
  const favorited = isFavorite(resource.id);

  const handleDelete = () => {
    if (window.confirm(`Delete "${resource.name}"? This cannot be undone.`)) {
      deleteResource(resource.id);
      window.history.back();
    }
  };

  const sections = [
    { label: "What It Does", content: resource.whatItDoes },
    { label: "Why Use It", content: resource.whyUseIt },
    { label: "When To Use It", content: resource.whenToUseIt },
    { label: "How To Use It", content: resource.howToUseIt },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to vault
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{resource.name}</h1>
            {resource.featured && (
              <Badge variant="outline">Featured</Badge>
            )}
          </div>
          <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
            {resource.description}
          </p>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {getDomainFromUrl(resource.url)}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant={favorited ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFavorite(resource.id)}
          >
            <Star
              className={cn(
                "h-3.5 w-3.5",
                favorited && "fill-current"
              )}
            />
            {favorited ? "Favorited" : "Favorite"}
          </Button>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            <Button size="sm">
              <ExternalLink className="h-3.5 w-3.5" />
              Open Website
            </Button>
          </a>
          {resource.isUserAdded && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingResourceId(resource.id)}
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {sections.map(({ label, content }) => (
            <section key={label}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {label}
              </h2>
              <p className="text-sm leading-relaxed">{content}</p>
            </section>
          ))}
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Categories
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {resource.categories.map((catId) => {
                const cat = categoryMap[catId];
                if (!cat) return null;
                return (
                  <Link key={catId} href={`/categories/${cat.slug}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                      {cat.emoji} {cat.name}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Tags
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Purpose
            </h2>
            <p className="text-sm text-muted-foreground">{resource.purpose}</p>
          </section>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Preview
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-background border border-border text-xs font-semibold uppercase">
                {getDomainFromUrl(resource.url).slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-medium">{resource.name}</div>
                <div className="text-xs text-muted-foreground">
                  {getDomainFromUrl(resource.url)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold tracking-tight mb-4">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((r, i) => (
              <ResourceCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
