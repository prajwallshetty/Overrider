# Override-R — Corporate Website

Multi-page corporate website for **Override-R — Intelligent Fire & Building Safety Technology**.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion), Radix UI primitives and Lucide icons.

## Quick start

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and (optionally) ENQUIRY_WEBHOOK_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 20+.

## Deployment

- **Vercel (recommended):** import the repository, set the environment variables from `.env.example`, deploy. No extra configuration is needed.
- **Any Node host:** `npm ci && npm run build && npm start` (port with `-p`).
- Set `NEXT_PUBLIC_SITE_URL` to the production domain. It is used for canonical URLs, the sitemap, robots.txt and Open Graph.
- The enquiry API's rate limiter is in memory. If you run several instances, move it to a shared store such as Redis.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `ENQUIRY_WEBHOOK_URL` | Optional. Each validated enquiry is POSTed here as JSON (CRM, Zapier/Make, HubSpot, custom admin API) |
| `ENQUIRY_WEBHOOK_TOKEN` | Optional. Sent as a `Bearer` token with the webhook request |

Without a webhook, enquiries are validated and logged on the server only, so nothing is stored. **Configure a webhook before launch.**

## Content and CMS readiness

Content does not live in the page components. It is stored in typed collections under `src/content/`:

| File | Content |
| --- | --- |
| `types.ts` | Content model (systems, products, categories, articles, resources, team, services, industries) |
| `systems.ts` | The 5 system families. Each page is an ordered list of **blocks** (overview, principle, architecture, subsystems, modes, applications, components, considerations, callout, FAQ, related products, enquiry) |
| `products.ts` | 9 categories, 11 products, and the spec/dimension skeletons |
| `knowledge.ts` | Article categories, authors, sample articles, FAQs, resources/downloads/documentation |
| `company.ts` | Site settings and contact details, industries, workflow, milestones, team, partners, roles, services |
| `navigation.ts` | Main menu, mega menus and footer |

Pages read data only through the async functions in `src/lib/content.ts`. To connect a headless CMS or admin dashboard, rewrite those functions to call your API and keep the return types the same. No page needs to change.

Images: every `image`, `images[]` or `photo` field is optional. When it is empty, the site shows a branded technical illustration (`src/components/visuals/visual.tsx`). Add photography by filling in the path or URL. For remote hosts, add them to `images.remotePatterns` in `next.config.ts`.

## Routes

```
/                                   Home
/systems                            Systems overview + application matrix
/systems/smoke-management
/systems/pressurization
/systems/ventilation
/systems/fireman-override-systems
/systems/ai-automation-integration
/products                           Catalogue (search, category and availability filters; ?category=&q=)
/products/[slug]                    11 product detail pages
/products/compare                   Side-by-side comparison (?p=slug,slug,slug)
/shop                               B2B enquiry catalogue
/shop/enquiry                       Enquiry basket + quotation request
/services                           Services overview
/services/technical-consultation
/services/system-design-support
/services/fire-safety-system-integration
/services/project-coordination
/services/cfd-calculation
/services/technical-project-support
/knowledge                          Knowledge centre (search + category filter)
/knowledge/category/[slug]          blog, technical-articles, fire-safety-guides, industry-insights, case-studies
/knowledge/[slug]                   Article pages
/knowledge/faqs
/knowledge/resources
/knowledge/downloads
/knowledge/documentation
/our-story                          About, vision, mission, approach, timeline, founders
/our-story/team                     Founders, leadership, engineering
/our-story/technology               Technology maturity roadmap
/our-story/partners                 Partners + partnership enquiry
/careers
/contact                            Multi-type contact form (?type=general|quote|product|consultation|partnership)
/request-quote                      Quotation request (?product=slug)
/privacy, /terms
/api/enquiry                        POST: validated, spam-protected enquiry endpoint
/api/product-sheet/[slug]           GET: downloadable product information sheet
/sitemap.xml, /robots.txt, /opengraph-image, /icon.svg
```

## Components

- **Layout:** `Header` (sticky, adapts to the hero colour, mega menus), `MobileNav` (animated Radix dialog drawer), `Footer`, `PageHero` (split / immersive / light variants), `SectionNav` (sticky scroll-spy), `StoryNav`, `KnowledgeNav`
- **Motion:** `AnimatedHeading` (masked word reveal), `Reveal` / `Stagger`, `Magnetic`, `SpotlightCard`, `Marquee`, `CountUp`, `Timeline` (scroll-linked)
- **UI:** `Button` / `ButtonLink` / `TextLink`, `Accordion`, `Section`, `SectionHeading`, `Badge`, `Placeholder`, `SampleNotice`, `Breadcrumbs`, `Logo`
- **Domain:** `SystemBlocks` (block renderer), `ModesTabs`, `ProductCard`, `ProductExplorer`, `ProductTabs`, `CompareTable`, `AddToEnquiry`, `EnquiryProvider`, `EnquiryBasket`, `BasketBar`, `ArticleCard`, `ArticleExplorer`, `ShareLinks`, `ResourceList`, `IndustriesExplorer`, `TeamCard`, `CtaBand`, `EnquiryForm`, `Visual`

## Content awaiting real company data

Placeholders are marked in the code with `EDIT` / `PLACEHOLDER` comments and on the pages with amber "Awaiting data", "Placeholder" or "Unpublished sample" labels.

- Contact email, phone, WhatsApp number, address and hours: `company.ts → site.contact`
- Registered company name, LinkedIn URL
- All product technical specifications, dimensions, model references and datasheet PDFs (all `null`)
- Product photography, architectural/hero photography or video
- Founders, leadership and engineering profiles (names, photos, bios)
- Company history and milestones, partner names and logos (only with permission)
- Open roles (currently illustrative)
- Knowledge articles: all are flagged `sample: true`, set to `noindex` and left out of the sitemap until published
- Case studies (need client approval)
- Downloads, brochures and documentation files
- Privacy notice and terms (template text for legal review)
- AI products: availability and validation status (currently "in development" and not certified)
