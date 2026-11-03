/**
 * Content model for the Override-R website.
 *
 * Every page reads from these typed collections through `src/lib/content.ts`.
 * The shapes are intentionally CMS-friendly: when an admin dashboard / headless
 * CMS is introduced, replace the static imports in `src/lib/content.ts` with API
 * calls that return the same types — no page component needs to change.
 */

export type VisualKey =
  | "smoke"
  | "pressurization"
  | "ventilation"
  | "override"
  | "ai"
  | "building"
  | "panel"
  | "controller"
  | "sensor"
  | "blueprint"
  | "network";

export interface SeoMeta {
  title?: string;
  description?: string;
  ogImage?: string;
}

/** A value that is still awaiting confirmed company data. Rendered as a visible placeholder. */
export type Pending<T = string> = T | null;

/* ------------------------------------------------------------------ Systems */

export type SystemSlug =
  | "smoke-management"
  | "pressurization"
  | "ventilation"
  | "fireman-override-systems"
  | "ai-automation-integration";

export type SystemBlock =
  | { type: "overview"; id?: string; eyebrow: string; title: string; body: string[]; points?: string[] }
  | { type: "principle"; id?: string; title: string; intro: string; steps: { title: string; body: string }[] }
  | {
      type: "architecture";
      id?: string;
      title: string;
      intro: string;
      layers: { title: string; caption: string; items: string[] }[];
    }
  | {
      type: "subsystems";
      id?: string;
      title: string;
      intro: string;
      items: { title: string; body: string; bullets: string[]; visual?: VisualKey }[];
    }
  | {
      type: "modes";
      id?: string;
      title: string;
      intro: string;
      modes: { id: string; label: string; summary: string; sequence: string[]; operator: string }[];
    }
  | { type: "applications"; id?: string; title: string; intro?: string; items: { title: string; body: string }[] }
  | { type: "components"; id?: string; title: string; intro?: string; items: { name: string; role: string }[] }
  | {
      type: "considerations";
      id?: string;
      title: string;
      intro?: string;
      items: { title: string; body: string }[];
    }
  | { type: "callout"; id?: string; tone: "notice" | "info"; title: string; body: string }
  | { type: "faq"; id?: string; title?: string; items: { q: string; a: string }[] }
  | { type: "related-products"; id?: string; title?: string }
  | { type: "enquiry"; id?: string; title: string; body: string };

export interface SystemItem {
  slug: SystemSlug;
  order: number;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  summary: string;
  heroTitle: string;
  heroIntro: string;
  visual: VisualKey;
  /** Short keywords shown in hero fact rail. Descriptive only — never numeric claims. */
  facets: { label: string; value: string }[];
  menuLinks: { label: string; anchor: string }[];
  blocks: SystemBlock[];
  relatedCategories: ProductCategorySlug[];
  status: "established" | "in-development";
  image?: string;
  seo?: SeoMeta;
}

/* ----------------------------------------------------------------- Products */

export type ProductCategorySlug =
  | "fireman-override-panels"
  | "automatic-panels"
  | "semi-automatic-panels"
  | "zone-control-panels"
  | "staircase-pressurization-controls"
  | "static-pressure-controls"
  | "car-park-ventilation-controls"
  | "room-ventilation-controls"
  | "ai-integration-products";

export interface ProductCategory {
  slug: ProductCategorySlug;
  name: string;
  description: string;
  system: SystemSlug;
  visual: VisualKey;
}

export interface SpecGroup {
  group: string;
  items: { label: string; value: Pending }[];
}

export interface Product {
  slug: string;
  name: string;
  /** Manufacturer model reference — null until confirmed. */
  model: Pending;
  category: ProductCategorySlug;
  systems: SystemSlug[];
  summary: string;
  overview: string[];
  applications: string[];
  features: string[];
  specs: SpecGroup[];
  dimensions: { label: string; value: Pending }[];
  configurations: string[];
  /** Path or URL to datasheet PDF. null = not yet published. */
  datasheet: Pending;
  /** Product photography. Empty = branded technical illustration is shown. */
  images: string[];
  visual: VisualKey;
  featured?: boolean;
  status: "available" | "in-development";
  seo?: SeoMeta;
}

/* ---------------------------------------------------------------- Knowledge */

export type ArticleCategorySlug =
  | "blog"
  | "technical-articles"
  | "fire-safety-guides"
  | "industry-insights"
  | "case-studies";

export interface ArticleCategory {
  slug: ArticleCategorySlug;
  name: string;
  description: string;
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; text: string };

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategorySlug;
  authorId: string;
  date: string;
  tags: string[];
  /** Sample editorial content — not yet reviewed for publication. */
  sample: boolean;
  visual: VisualKey;
  image?: string;
  body: ArticleBlock[];
  seo?: SeoMeta;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  kind: "resource" | "download" | "documentation";
  format: string;
  topic: string;
  /** File path / URL. null = awaiting publication. */
  file: Pending;
}

/* ----------------------------------------------------------------- Company */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  group: "founders" | "leadership" | "engineering";
  bio: string;
  photo?: string;
  /** true while profile still contains placeholder data */
  placeholder: boolean;
}

export interface Service {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  visual: VisualKey;
  scope: { title: string; body: string }[];
  deliverables: string[];
  process: string[];
  whenToEngage: string[];
  note?: string;
}

export interface Industry {
  slug: string;
  name: string;
  body: string;
  systems: SystemSlug[];
}

export interface FaqItem {
  q: string;
  a: string;
  topic: string;
}
