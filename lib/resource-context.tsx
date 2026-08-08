"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Resource, CreateResourceInput, UpdateResourceInput, ResourceFilters, SortOption } from "@/types";
import { seedResources } from "@/data/resources";
import { storage, createResource, updateResource as updateResourceData } from "@/lib/storage";
import { filterResources, getCategoryCounts } from "@/lib/search";

interface ResourceContextValue {
  resources: Resource[];
  favorites: string[];
  recentlyViewed: string[];
  viewCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  isLoaded: boolean;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addResource: (input: CreateResourceInput) => Resource;
  updateResource: (input: UpdateResourceInput) => void;
  deleteResource: (id: string) => void;
  trackView: (id: string) => void;
  getFilteredResources: (filters: ResourceFilters) => Resource[];
  getResourceBySlug: (slug: string) => Resource | undefined;
  getResourceById: (id: string) => Resource | undefined;
}

const ResourceContext = createContext<ResourceContextValue | null>(null);

export function ResourceProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState<Resource[]>(seedResources);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setResources(storage.getResources());
    setFavorites(storage.getFavorites());
    setRecentlyViewed(storage.getRecentlyViewed());
    setViewCounts(storage.getViewCounts());
    setIsLoaded(true);
  }, []);

  const categoryCounts = useMemo(() => getCategoryCounts(resources), [resources]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      storage.saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const addResource = useCallback((input: CreateResourceInput) => {
    const newResource = createResource(input);
    setResources((prev) => {
      const next = [...prev, newResource];
      storage.saveResources(next);
      return next;
    });
    return newResource;
  }, []);

  const updateResourceFn = useCallback((input: UpdateResourceInput) => {
    setResources((prev) => {
      const next = prev.map((r) =>
        r.id === input.id ? updateResourceData(r, input) : r
      );
      storage.saveResources(next);
      return next;
    });
  }, []);

  const deleteResource = useCallback((id: string) => {
    setResources((prev) => {
      const next = prev.filter((r) => r.id !== id);
      storage.saveResources(next);
      return next;
    });
    setFavorites((prev) => {
      const next = prev.filter((f) => f !== id);
      storage.saveFavorites(next);
      return next;
    });
  }, []);

  const trackView = useCallback((id: string) => {
    setRecentlyViewed((prev) => {
      const next = [id, ...prev.filter((v) => v !== id)].slice(0, 20);
      storage.saveRecentlyViewed(next);
      return next;
    });
    setViewCounts((prev) => {
      const next = { ...prev, [id]: (prev[id] ?? 0) + 1 };
      storage.saveViewCounts(next);
      return next;
    });
  }, []);

  const getFilteredResources = useCallback(
    (filters: ResourceFilters) =>
      filterResources(resources, filters, favorites, viewCounts),
    [resources, favorites, viewCounts]
  );

  const getResourceBySlug = useCallback(
    (slug: string) => resources.find((r) => r.slug === slug),
    [resources]
  );

  const getResourceById = useCallback(
    (id: string) => resources.find((r) => r.id === id),
    [resources]
  );

  const value = useMemo(
    () => ({
      resources,
      favorites,
      recentlyViewed,
      viewCounts,
      categoryCounts,
      isLoaded,
      toggleFavorite,
      isFavorite,
      addResource,
      updateResource: updateResourceFn,
      deleteResource,
      trackView,
      getFilteredResources,
      getResourceBySlug,
      getResourceById,
    }),
    [
      resources,
      favorites,
      recentlyViewed,
      viewCounts,
      categoryCounts,
      isLoaded,
      toggleFavorite,
      isFavorite,
      addResource,
      updateResourceFn,
      deleteResource,
      trackView,
      getFilteredResources,
      getResourceBySlug,
      getResourceById,
    ]
  );

  return (
    <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>
  );
}

export function useResources() {
  const ctx = useContext(ResourceContext);
  if (!ctx) throw new Error("useResources must be used within ResourceProvider");
  return ctx;
}

export type { SortOption, ResourceFilters };
