import type { MetadataRoute } from "next";
import { site } from "@/content/company";
import { getArticleCategories, getArticles, getProducts, getServices, getSystems } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [systems, products, articles, categories, services] = await Promise.all([getSystems(), getProducts(), getArticles(), getArticleCategories(), getServices()]);
  const now = new Date();
  const u = (path: string, priority = 0.6, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({ url: `${site.url}${path}`, lastModified: now, priority, changeFrequency });
  return [
    u("/", 1, "weekly"),
    u("/systems", 0.9),
    ...systems.map((s) => u(`/systems/${s.slug}`, 0.9)),
    u("/products", 0.9, "weekly"),
    u("/products/compare", 0.5),
    ...products.map((p) => u(`/products/${p.slug}`, 0.8)),
    u("/shop", 0.7, "weekly"),
    u("/services", 0.8),
    ...services.map((s) => u(`/services/${s.slug}`, 0.7)),
    u("/knowledge", 0.7, "weekly"),
    ...categories.map((c) => u(`/knowledge/category/${c.slug}`, 0.5, "weekly")),
    // Sample articles are excluded until published
    ...articles.filter((a) => !a.sample).map((a) => ({ ...u(`/knowledge/${a.slug}`, 0.6), lastModified: new Date(a.date) })),
    u("/knowledge/faqs", 0.5),
    u("/knowledge/resources", 0.5),
    u("/knowledge/downloads", 0.5),
    u("/knowledge/documentation", 0.5),
    u("/our-story", 0.7),
    u("/our-story/team", 0.5),
    u("/our-story/technology", 0.6),
    u("/our-story/partners", 0.5),
    u("/careers", 0.5),
    u("/contact", 0.8),
    u("/request-quote", 0.8),
    u("/privacy", 0.2, "yearly"),
    u("/terms", 0.2, "yearly"),
  ];
}
