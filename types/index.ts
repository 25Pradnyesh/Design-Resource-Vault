export interface Category {
  id: string;
  name: string;
  emoji: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Resource {
  id: string;
  slug: string;
  name: string;
  url: string;
  description: string;
  whatItDoes: string;
  whyUseIt: string;
  whenToUseIt: string;
  howToUseIt: string;
  categories: string[];
  tags: string[];
  purpose: string;
  featured: boolean;
  isUserAdded?: boolean;
  previewImage?: string;
  technologies?: string[];
  styles?: string[];
  visualKeywords?: string[];
  relatedResourceIds?: string[];
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
}

export type SortOption = "recent" | "featured" | "most-used" | "relevance";

export type ViewMode = "gallery" | "dense" | "ledger";

export interface ResourceFilters {
  query?: string;
  categories?: string[];
  tags?: string[];
  purpose?: string;
  purposes?: string[];
  technologies?: string[];
  styles?: string[];
  favoritesOnly?: boolean;
  sort?: SortOption;
}

export interface SearchIntent {
  rawQuery: string;
  normalizedQuery: string;
  keywords: string[];
  categories: string[];
  tags: string[];
  purposes: string[];
  technologies: string[];
  styles: string[];
  intentType?: "inspiration" | "component" | "tool" | "learning" | "asset" | "reference";
  adjacentConcepts: string[];
}

export interface MatchReason {
  field: "name" | "domain" | "category" | "tag" | "technology" | "style" | "purpose" | "spec";
  label: string;
  matchedText: string;
}

export interface ScoredResource {
  resource: Resource;
  score: number;
  matchPercentage: number;
  matchReasons: MatchReason[];
  matchExplanation: string;
  matchedCategories: string[];
  matchedTags: string[];
  matchedTechnologies: string[];
  matchedStyles: string[];
}

export interface QueryParser {
  parse(rawQuery: string): SearchIntent;
}

export interface UserPreferences {
  favorites: string[];
  recentlyViewed: string[];
  theme: "light" | "dark" | "system";
}

export interface UrlImportDraft {
  url: string;
  status: "idle" | "fetching" | "analyzing" | "ready" | "error";
  suggestedName?: string;
  suggestedDescription?: string;
  suggestedCategories?: string[];
  suggestedTags?: string[];
  suggestedPurpose?: string;
  suggestedWhatItDoes?: string;
  suggestedWhyUseIt?: string;
  suggestedWhenToUseIt?: string;
  suggestedHowToUseIt?: string;
  suggestedTechnologies?: string[];
  suggestedStyles?: string[];
  relatedResources?: string[];
  error?: string;
}

export interface CreateResourceInput {
  name: string;
  url: string;
  description: string;
  whatItDoes: string;
  whyUseIt: string;
  whenToUseIt: string;
  howToUseIt: string;
  categories: string[];
  tags: string[];
  purpose: string;
  featured: boolean;
  previewImage?: string;
  technologies?: string[];
  styles?: string[];
}

export interface UpdateResourceInput extends Partial<CreateResourceInput> {
  id: string;
}

