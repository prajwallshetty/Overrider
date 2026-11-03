import { getCategory, getProduct } from "@/lib/content";
import { site } from "@/content/company";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Downloadable, print-ready product information sheet generated from product data. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return new Response("Not found", { status: 404 });
  const cat = getCategory(p.category);
  const v = (x: string | null) => (x ? esc(x) : '<span class="tbc">Awaiting data</span>');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(p.name)} — ${site.name}</title>
<style>body{font:14px/1.6 system-ui,sans-serif;color:#0d1117;max-width:780px;margin:40px auto;padding:0 24px}h1{font-size:28px;margin:4px 0 8px}h2{font-size:15px;text-transform:uppercase;letter-spacing:.1em;color:#d4271d;margin-top:32px;border-bottom:1px solid #ddd;padding-bottom:6px}table{width:100%;border-collapse:collapse}td{padding:6px 0;border-bottom:1px solid #eee;vertical-align:top}td:first-child{color:#555;width:45%}.tbc{color:#a16207;font-family:monospace;font-size:12px}.brand{font-weight:800;letter-spacing:.08em}.brand b{color:#d4271d}.note{margin-top:32px;padding:12px;border:1px dashed #d97706;background:#fffbeb;font-size:12px}</style></head><body>
<p class="brand">OVERRIDE<b>-R</b></p><p>${esc(cat.name)}</p><h1>${esc(p.name)}</h1><p>Model reference: ${v(p.model)}</p><p>${esc(p.summary)}</p>
<h2>Overview</h2>${p.overview.map((o) => `<p>${esc(o)}</p>`).join("")}
<h2>Applications</h2><ul>${p.applications.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
<h2>Features</h2><ul>${p.features.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
${p.specs.map((g) => `<h2>${esc(g.group)}</h2><table>${g.items.map((i) => `<tr><td>${esc(i.label)}</td><td>${v(i.value)}</td></tr>`).join("")}</table>`).join("")}
${p.dimensions.length ? `<h2>Dimensions</h2><table>${p.dimensions.map((i) => `<tr><td>${esc(i.label)}</td><td>${v(i.value)}</td></tr>`).join("")}</table>` : ""}
<h2>Configurations</h2><ul>${p.configurations.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
<p class="note">Draft product information. Values marked "Awaiting data" are not yet confirmed. Contact ${esc(site.contact.email)} for current technical data. Generated ${new Date().toISOString().slice(0, 10)} from ${esc(site.url)}/products/${esc(p.slug)}</p>
</body></html>`;
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-disposition": `attachment; filename="override-r-${p.slug}.html"`,
    },
  });
}
