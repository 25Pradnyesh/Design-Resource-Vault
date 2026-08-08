import { Resource, UserPreferences, CreateResourceInput, UpdateResourceInput } from "@/types";
import { seedResources } from "@/data/resources";
import { slugify } from "@/lib/utils";

const STORAGE_KEYS = {
  RESOURCES: "drv_resources",
  FAVORITES: "drv_favorites",
  RECENTLY_VIEWED: "drv_recently_viewed",
  THEME: "drv_theme",
  VIEW_COUNTS: "drv_view_counts",
} as const;

export interface StorageAdapter {
  getResources(): Resource[];
  saveResources(resources: Resource[]): void;
  getFavorites(): string[];
  saveFavorites(favorites: string[]): void;
  getRecentlyViewed(): string[];
  saveRecentlyViewed(ids: string[]): void;
  getTheme(): UserPreferences["theme"];
  saveTheme(theme: UserPreferences["theme"]): void;
  getViewCounts(): Record<string, number>;
  saveViewCounts(counts: Record<string, number>): void;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export class LocalStorageAdapter implements StorageAdapter {
  getResources(): Resource[] {
    const userResources = readJSON<Resource[]>(STORAGE_KEYS.RESOURCES, []);
    const seedIds = new Set(seedResources.map((r) => r.id));
    const mergedSeeds = seedResources.map((seed) => {
      const override = userResources.find((u) => u.id === seed.id);
      return override ? { ...seed, ...override } : seed;
    });
    const userAdded = userResources.filter((u) => !seedIds.has(u.id));
    return [...mergedSeeds, ...userAdded];
  }

  saveResources(resources: Resource[]): void {
    const seedIds = new Set(seedResources.map((r) => r.id));
    const toSave = resources.filter((r) => r.isUserAdded || seedIds.has(r.id));
    writeJSON(STORAGE_KEYS.RESOURCES, toSave);
  }

  getFavorites(): string[] {
    return readJSON<string[]>(STORAGE_KEYS.FAVORITES, []);
  }

  saveFavorites(favorites: string[]): void {
    writeJSON(STORAGE_KEYS.FAVORITES, favorites);
  }

  getRecentlyViewed(): string[] {
    return readJSON<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
  }

  saveRecentlyViewed(ids: string[]): void {
    writeJSON(STORAGE_KEYS.RECENTLY_VIEWED, ids);
  }

  getTheme(): UserPreferences["theme"] {
    return readJSON<UserPreferences["theme"]>(STORAGE_KEYS.THEME, "dark");
  }

  saveTheme(theme: UserPreferences["theme"]): void {
    writeJSON(STORAGE_KEYS.THEME, theme);
  }

  getViewCounts(): Record<string, number> {
    return readJSON<Record<string, number>>(STORAGE_KEYS.VIEW_COUNTS, {});
  }

  saveViewCounts(counts: Record<string, number>): void {
    writeJSON(STORAGE_KEYS.VIEW_COUNTS, counts);
  }
}

let adapter: StorageAdapter = new LocalStorageAdapter();

export function setStorageAdapter(newAdapter: StorageAdapter): void {
  adapter = newAdapter;
}

export function getStorageAdapter(): StorageAdapter {
  return adapter;
}

export function createResource(input: CreateResourceInput): Resource {
  const now = new Date().toISOString();
  const id = slugify(input.name);
  return {
    id,
    slug: id,
    ...input,
    isUserAdded: true,
    createdAt: now,
    updatedAt: now,
    viewCount: 0,
  };
}

export function updateResource(existing: Resource, input: UpdateResourceInput): Resource {
  return {
    ...existing,
    ...input,
    id: existing.id,
    slug: existing.slug,
    updatedAt: new Date().toISOString(),
  };
}

export const storage = {
  getResources: () => adapter.getResources(),
  saveResources: (r: Resource[]) => adapter.saveResources(r),
  getFavorites: () => adapter.getFavorites(),
  saveFavorites: (f: string[]) => adapter.saveFavorites(f),
  getRecentlyViewed: () => adapter.getRecentlyViewed(),
  saveRecentlyViewed: (ids: string[]) => adapter.saveRecentlyViewed(ids),
  getTheme: () => adapter.getTheme(),
  saveTheme: (t: UserPreferences["theme"]) => adapter.saveTheme(t),
  getViewCounts: () => adapter.getViewCounts(),
  saveViewCounts: (c: Record<string, number>) => adapter.saveViewCounts(c),
};
