import {
  Resource,
  ResourceFilters,
  SortOption,
  ScoredResource,
  SearchIntent,
  MatchReason,
} from "@/types";
import { categoryMap } from "@/data/categories";
import { parseSearchIntent } from "@/lib/search-intent";
import { getResourcePrimaryPurpose } from "@/data/resources";

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

/**
 * Multi-Signal Deterministic Scoring Engine
 * 
 * Signal Weights:
 * - Exact Name Match: 60 pts
 * - Name Substring/Prefix: 40 pts
 * - Category Match: 30 pts
 * - Technology Match: 28 pts
 * - Style / Aesthetic Match: 28 pts
 * - Tag Match: 22 pts
 * - Purpose Match: 18 pts
 * - 4-Quadrant Specs (What/Why/When/How): 12 pts
 * - Description Text: 10 pts
 * - Featured Boost: 5 pts
 * - Usage/View Count Boost: 0-8 pts
 */
export function scoreResource(
  resource: Resource,
  intent: SearchIntent,
  viewCounts: Record<string, number> = {}
): ScoredResource | null {
  const query = intent.rawQuery.trim();
  if (!query) {
    return {
      resource,
      score: 0,
      matchPercentage: 100,
      matchReasons: [],
      matchExplanation: "",
      matchedCategories: [],
      matchedTags: [],
      matchedTechnologies: [],
      matchedStyles: [],
    };
  }

  let score = 0;
  const reasons: MatchReason[] = [];
  const matchedCategories: string[] = [];
  const matchedTags: string[] = [];
  const matchedTechnologies: string[] = [];
  const matchedStyles: string[] = [];

  const normQuery = normalize(query);
  const normName = normalize(resource.name);
  const normDesc = normalize(resource.description);
  const normPurpose = normalize(resource.purpose);
  const normWhat = normalize(resource.whatItDoes);
  const normWhy = normalize(resource.whyUseIt);
  const normWhen = normalize(resource.whenToUseIt);
  const normHow = normalize(resource.howToUseIt);

  const resourceTags = resource.tags.map(normalize);
  const resourceTechs = (resource.technologies ?? []).map(normalize);
  const resourceStyles = (resource.styles ?? []).map(normalize);

  // 1. Exact & Name Matches
  if (normName === normQuery) {
    score += 60;
    reasons.push({ field: "name", label: "Exact Name Match", matchedText: resource.name });
  } else if (normName.includes(normQuery) || normQuery.includes(normName)) {
    score += 40;
    reasons.push({ field: "name", label: "Name Match", matchedText: resource.name });
  } else {
    // Check individual keywords in name
    for (const kw of intent.keywords) {
      if (normName.includes(kw)) {
        score += 25;
        reasons.push({ field: "name", label: "Name Keyword", matchedText: kw });
        break;
      }
    }
  }

  // 2. Category Matches
  for (const catId of resource.categories) {
    const cat = categoryMap[catId];
    const catName = cat ? normalize(cat.name) : "";
    const catSlug = cat ? normalize(cat.slug) : "";

    const matchesCat =
      intent.categories.includes(catId) ||
      intent.keywords.some((kw) => catSlug.includes(kw) || catName.includes(kw));

    if (matchesCat) {
      score += 30;
      matchedCategories.push(cat?.name ?? catId);
      reasons.push({ field: "category", label: "Category", matchedText: cat?.name ?? catId });
    }
  }

  // 3. Technology Matches
  for (const tech of intent.technologies) {
    const normTech = normalize(tech);
    const inExplicitTech = resourceTechs.some((t) => t.includes(normTech) || normTech.includes(t));
    const inTags = resourceTags.some((t) => t.includes(normTech) || normTech.includes(t));
    const inSpecs = normWhat.includes(normTech) || normHow.includes(normTech) || normDesc.includes(normTech);

    if (inExplicitTech || inTags || inSpecs) {
      score += 28;
      matchedTechnologies.push(tech);
      reasons.push({ field: "technology", label: "Technology", matchedText: tech });
    }
  }

  // 4. Style Matches
  for (const style of intent.styles) {
    const normStyle = normalize(style);
    const inExplicitStyle = resourceStyles.some((s) => s.includes(normStyle) || normStyle.includes(s));
    const inTags = resourceTags.some((t) => t.includes(normStyle) || normStyle.includes(t));
    const inSpecs = normDesc.includes(normStyle) || normWhy.includes(normStyle) || normPurpose.includes(normStyle);

    if (inExplicitStyle || inTags || inSpecs) {
      score += 28;
      matchedStyles.push(style);
      reasons.push({ field: "style", label: "Visual Style", matchedText: style });
    }
  }

  // 5. Tag Matches
  for (const tag of resource.tags) {
    const normTag = normalize(tag);
    if (intent.keywords.some((kw) => normTag.includes(kw) || kw.includes(normTag))) {
      score += 22;
      matchedTags.push(tag);
      reasons.push({ field: "tag", label: "Tag", matchedText: tag });
    }
  }

  // 6. Purpose Match
  for (const kw of intent.keywords) {
    if (normPurpose.includes(kw)) {
      score += 18;
      reasons.push({ field: "purpose", label: "Purpose", matchedText: kw });
      break;
    }
  }

  // 7. 4-Quadrant Specifications Match (What/Why/When/How)
  let specHits = 0;
  for (const kw of intent.keywords) {
    if (normWhat.includes(kw) || normWhy.includes(kw) || normWhen.includes(kw) || normHow.includes(kw) || normDesc.includes(kw)) {
      specHits++;
    }
  }
  if (specHits > 0) {
    score += Math.min(24, specHits * 8);
    reasons.push({ field: "spec", label: "Specification", matchedText: `${specHits} contextual match${specHits > 1 ? "es" : ""}` });
  }

  // If score is 0, no signal matched
  if (score <= 0) {
    return null;
  }

  // 8. Quality & Usage Boosters
  if (resource.featured) {
    score += 5;
  }
  const views = viewCounts[resource.id] ?? 0;
  if (views > 0) {
    score += Math.min(8, Math.round(Math.log2(views + 1) * 2));
  }

  // Calculate normalized match percentage
  const maxPossible = 160;
  const matchPercentage = Math.min(99, Math.max(52, Math.round((score / maxPossible) * 100)));

  // Generate explainable match explanation
  const explanationParts: string[] = [];
  if (matchedCategories.length > 0) {
    explanationParts.push(matchedCategories[0]);
  }
  if (matchedStyles.length > 0) {
    explanationParts.push(`${matchedStyles.join(", ")} visual language`);
  }
  if (matchedTechnologies.length > 0) {
    explanationParts.push(`${matchedTechnologies.join(", ")} interaction`);
  }
  if (matchedTags.length > 0 && explanationParts.length < 2) {
    explanationParts.push(`#${matchedTags.slice(0, 2).join(" #")}`);
  }

  let matchExplanation = "";
  if (explanationParts.length >= 2) {
    matchExplanation = `Strong match: combines ${explanationParts.join(", ")}.`;
  } else if (explanationParts.length === 1) {
    matchExplanation = `Relevant match for ${explanationParts[0]}.`;
  } else {
    matchExplanation = `Matched query across operational specifications and purpose.`;
  }

  return {
    resource,
    score,
    matchPercentage,
    matchReasons: reasons,
    matchExplanation,
    matchedCategories,
    matchedTags,
    matchedTechnologies,
    matchedStyles,
  };
}

function sortResources(
  resources: Resource[],
  sort: SortOption,
  viewCounts: Record<string, number>,
  scoredMap?: Map<string, ScoredResource>
): Resource[] {
  const sorted = [...resources];

  switch (sort) {
    case "relevance":
      if (scoredMap) {
        return sorted.sort((a, b) => {
          const scoreA = scoredMap.get(a.id)?.score ?? 0;
          const scoreB = scoredMap.get(b.id)?.score ?? 0;
          return scoreB - scoreA;
        });
      }
      return sorted;
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
  let scoredMap: Map<string, ScoredResource> | undefined;

  let result = resources;

  if (filters.query?.trim()) {
    const intent = parseSearchIntent(filters.query);
    const scoredList: ScoredResource[] = [];
    scoredMap = new Map();

    for (const r of resources) {
      const scored = scoreResource(r, intent, viewCounts);
      if (scored) {
        scoredList.push(scored);
        scoredMap.set(r.id, scored);
      }
    }

    result = scoredList.sort((a, b) => b.score - a.score).map((s) => s.resource);
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

  if (filters.purposes?.length) {
    result = result.filter((r) => {
      const primary = getResourcePrimaryPurpose(r);
      return (
        filters.purposes!.includes(primary) ||
        filters.purposes!.some((p) => normalize(r.purpose).includes(normalize(p)))
      );
    });
  } else if (filters.purpose) {
    result = result.filter((r) => {
      const primary = getResourcePrimaryPurpose(r);
      return (
        primary === filters.purpose ||
        normalize(r.purpose).includes(normalize(filters.purpose!))
      );
    });
  }

  if (filters.technologies?.length) {
    result = result.filter((r) =>
      filters.technologies!.some((tech) =>
        (r.technologies ?? []).some((t) => normalize(t) === normalize(tech)) ||
        r.tags.some((t) => normalize(t) === normalize(tech))
      )
    );
  }

  if (filters.styles?.length) {
    result = result.filter((r) =>
      filters.styles!.some((style) =>
        (r.styles ?? []).some((s) => normalize(s) === normalize(style)) ||
        r.tags.some((t) => normalize(t) === normalize(style))
      )
    );
  }

  if (filters.favoritesOnly) {
    result = result.filter((r) => favorites.includes(r.id));
  }

  const effectiveSort: SortOption =
    filters.sort ?? (filters.query?.trim() ? "relevance" : "recent");

  return sortResources(result, effectiveSort, viewCounts, scoredMap);
}

export function searchWithIntelligence(
  resources: Resource[],
  query: string,
  viewCounts: Record<string, number> = {},
  limit = 20
): {
  scored: ScoredResource[];
  intent: SearchIntent;
  adjacentConcepts: string[];
} {
  const intent = parseSearchIntent(query);
  if (!query.trim()) {
    return {
      scored: [],
      intent,
      adjacentConcepts: ["Brutalist Portfolios with WebGL", "Interactive 3D Web", "Minimal Landing Pages", "Micro-Interaction Primitives"],
    };
  }

  const scored: ScoredResource[] = [];
  for (const r of resources) {
    const result = scoreResource(r, intent, viewCounts);
    if (result) {
      scored.push(result);
    }
  }

  scored.sort((a, b) => b.score - a.score);

  return {
    scored: scored.slice(0, limit),
    intent,
    adjacentConcepts: intent.adjacentConcepts,
  };
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
  const { scored } = searchWithIntelligence(resources, query, {}, limit);
  return scored.map((s) => s.resource);
}
