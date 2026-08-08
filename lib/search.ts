import { Resource, ResourceFilters, SortOption } from "@/types";
import { categoryMap } from "@/data/categories";

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function matchesQuery(resource: Resource, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;

  const categoryNames = resource.categories
    .map((id) => categoryMap[id]?.name ?? "")
    .join(" ");

  const searchFields = [
    resource.name,
    resource.description,
    resource.whatItDoes,
    resource.whyUseIt,
    resource.whenToUseIt,
    resource.howToUseIt,
    resource.purpose,
    categoryNames,
    resource.tags.join(" "),
  ]
    .map(normalize)
    .join(" ");

  return q.split(/\s+/).every((term) => searchFields.includes(term));
}

function sortResources(resources: Resource[], sort: SortOption, viewCounts: Record<string, number>): Resource[] {
  const sorted = [...resources];

  switch (sort) {
    case "alphabetical":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    case "most-used":
      return sorted.sort(
        (a, b) => (viewCounts[b.id] ?? 0) - (viewCounts[a.id] ?? 0)
      );
    case "recent":
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export function filterResources(
  resources: Resource[],
  filters: ResourceFilters,
  favorites: string[],
  viewCounts: Record<string, number> = {}
): Resource[] {
  let result = resources;

  if (filters.query) {
    result = result.filter((r) => matchesQuery(r, filters.query!));
  }

  if (filters.categories?.length) {
    result = result.filter((r) =>
      filters.categories!.some((cat) => r.categories.includes(cat))
    );
  }

  if (filters.tags?.length) {
    result = result.filter((r) =>
      filters.tags!.some((tag) =>
        r.tags.some((t) => normalize(t) === normalize(tag))
      )
    );
  }

  if (filters.purpose) {
    result = result.filter((r) =>
      normalize(r.purpose).includes(normalize(filters.purpose!))
    );
  }

  if (filters.favoritesOnly) {
    result = result.filter((r) => favorites.includes(r.id));
  }

  return sortResources(result, filters.sort ?? "recent", viewCounts);
}

export function getFeaturedResources(resources: Resource[], limit = 6): Resource[] {
  return resources.filter((r) => r.featured).slice(0, limit);
}

export function getRecentResources(resources: Resource[], limit = 8): Resource[] {
  return [...resources]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getResourcesByCategory(resources: Resource[], categoryId: string): Resource[] {
  return resources.filter((r) => r.categories.includes(categoryId));
}

export function getCategoryCounts(resources: Resource[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const resource of resources) {
    for (const cat of resource.categories) {
      counts[cat] = (counts[cat] ?? 0) + 1;
    }
  }
  return counts;
}

export function searchResources(resources: Resource[], query: string, limit = 20): Resource[] {
  if (!query.trim()) return [];
  return filterResources(resources, { query }, [], {}).slice(0, limit);
}
