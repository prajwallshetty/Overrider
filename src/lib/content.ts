/**
 * Content access layer. All pages read data through these functions.
 * To connect a CMS / admin dashboard, re-implement these functions against the
 * API (they are already async) and keep the return types from `content/types`.
 */
import { systems } from "@/content/systems";
import { products, productCategories } from "@/content/products";
import { articles, articleCategories, authors, faqs, resources } from "@/content/knowledge";
import { industries, services, team } from "@/content/company";
import type { ArticleBlock, ArticleCategorySlug, ProductCategorySlug, ResourceItem, SystemSlug } from "@/content/types";
import { readingTime } from "./utils";

export async function getSystems() {
  return [...systems].sort((a, b) => a.order - b.order);
}
export async function getSystem(slug: string) {
  return systems.find((s) => s.slug === slug) ?? null;
}

export async function getProducts() {
  return products;
}
export async function getProduct(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}
export async function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
export async function getProductCategories() {
  return productCategories;
}
export function getCategory(slug: ProductCategorySlug) {
  return productCategories.find((c) => c.slug === slug)!;
}
export async function getProductsByCategories(cats: ProductCategorySlug[]) {
  return products.filter((p) => cats.includes(p.category));
}
export async function getProductsBySystem(system: SystemSlug) {
  return products.filter((p) => p.systems.includes(system));
}
export async function getRelatedProducts(slug: string, limit = 3) {
  const p = products.find((x) => x.slug === slug);
  if (!p) return [];
  return products
    .filter((x) => x.slug !== slug)
    .map((x) => ({ x, score: (x.category === p.category ? 3 : 0) + x.systems.filter((s) => p.systems.includes(s)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.x);
}

function blockText(b: ArticleBlock) {
  if (b.type === "ul") return b.items.join(" ");
  if (b.type === "callout") return `${b.title} ${b.text}`;
  return b.text;
}
function enrich(a: (typeof articles)[number]) {
  return {
    ...a,
    readingTime: readingTime(a.body.map(blockText).join(" ")),
    author: authors.find((x) => x.id === a.authorId) ?? authors[0],
    categoryName: articleCategories.find((c) => c.slug === a.category)?.name ?? a.category,
  };
}
export type EnrichedArticle = ReturnType<typeof enrich>;

export async function getArticles() {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date)).map(enrich);
}
export async function getArticle(slug: string) {
  const a = articles.find((x) => x.slug === slug);
  return a ? enrich(a) : null;
}
export async function getArticlesByCategory(cat: ArticleCategorySlug) {
  return (await getArticles()).filter((a) => a.category === cat);
}
export async function getRelatedArticles(slug: string, limit = 3) {
  const a = articles.find((x) => x.slug === slug);
  const all = await getArticles();
  if (!a) return [];
  return all
    .filter((x) => x.slug !== slug)
    .sort((x, y) => Number(y.category === a.category) - Number(x.category === a.category))
    .slice(0, limit);
}
export async function getArticleCategories() {
  return articleCategories;
}
export async function getFaqs() {
  return faqs;
}
export async function getResources(kind?: ResourceItem["kind"]) {
  return kind ? resources.filter((r) => r.kind === kind) : resources;
}
export async function getServices() {
  return services;
}
export async function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}
export async function getIndustries() {
  return industries;
}
export async function getTeam() {
  return team;
}
