import { systems } from "./systems";
import { productCategories } from "./products";

export interface MegaColumn {
  title: string;
  links: { label: string; href: string; description?: string }[];
}
export interface NavItem {
  label: string;
  href: string;
  mega?: {
    intro: { title: string; body: string; cta: { label: string; href: string } };
    columns: MegaColumn[];
    feature?: { eyebrow: string; title: string; href: string };
  };
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Systems",
    href: "/systems",
    mega: {
      intro: {
        title: "Life-safety systems",
        body: "Control solutions for every way air moves in a fire — engineered as one coherent system.",
        cta: { label: "All systems", href: "/systems" },
      },
      columns: [
        {
          title: "System families",
          links: systems.map((s) => ({ label: s.name, href: `/systems/${s.slug}`, description: s.tagline })),
        },
        {
          title: "Services",
          links: [
            { label: "Technical consultation", href: "/services/technical-consultation" },
            { label: "System design support", href: "/services/system-design-support" },
            { label: "System integration", href: "/services/fire-safety-system-integration" },
            { label: "CFD calculation", href: "/services/cfd-calculation" },
            { label: "All services", href: "/services" },
          ],
        },
      ],
      feature: { eyebrow: "In development", title: "AI-assisted fire & smoke detection", href: "/systems/ai-automation-integration" },
    },
  },
  {
    label: "Products",
    href: "/products",
    mega: {
      intro: {
        title: "Product range",
        body: "Override panels and controllers configured to each project's zoning and equipment.",
        cta: { label: "Browse catalogue", href: "/products" },
      },
      columns: [
        {
          title: "Panels",
          links: productCategories.slice(0, 4).map((c) => ({ label: c.name, href: `/products?category=${c.slug}`, description: c.description })),
        },
        {
          title: "Controls & AI",
          links: productCategories.slice(4).map((c) => ({ label: c.name, href: `/products?category=${c.slug}` })),
        },
      ],
      feature: { eyebrow: "Compare", title: "Compare panels side by side", href: "/products/compare" },
    },
  },
  { label: "Shop", href: "/shop" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Our Story", href: "/our-story" },
];

export const footerNav = [
  { title: "Systems", links: systems.map((s) => ({ label: s.name, href: `/systems/${s.slug}` })) },
  {
    title: "Products",
    links: [
      { label: "Product catalogue", href: "/products" },
      { label: "Compare products", href: "/products/compare" },
      { label: "Enquiry shop", href: "/shop" },
      { label: "Enquiry list", href: "/shop/enquiry" },
      { label: "Downloads", href: "/knowledge/downloads" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Technical consultation", href: "/services/technical-consultation" },
      { label: "System design support", href: "/services/system-design-support" },
      { label: "System integration", href: "/services/fire-safety-system-integration" },
      { label: "Project coordination", href: "/services/project-coordination" },
      { label: "CFD calculation", href: "/services/cfd-calculation" },
      { label: "Technical project support", href: "/services/technical-project-support" },
    ],
  },
  {
    title: "Knowledge",
    links: [
      { label: "Knowledge centre", href: "/knowledge" },
      { label: "Technical articles", href: "/knowledge/category/technical-articles" },
      { label: "Fire safety guides", href: "/knowledge/category/fire-safety-guides" },
      { label: "FAQs", href: "/knowledge/faqs" },
      { label: "Documentation", href: "/knowledge/documentation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/our-story" },
      { label: "Team", href: "/our-story/team" },
      { label: "Technology", href: "/our-story/technology" },
      { label: "Partners", href: "/our-story/partners" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
