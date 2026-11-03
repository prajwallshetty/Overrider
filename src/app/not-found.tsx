import { ButtonLink } from "@/components/ui/button";
import { Visual } from "@/components/visuals/visual";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-ink pt-24 text-white">
      <Visual kind="blueprint" className="absolute inset-0 -z-10 opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      <div className="container-x">
        <p className="font-mono text-sm text-red-400">ERROR 404 · ROUTE NOT FOUND</p>
        <h1 className="mt-6 max-w-3xl text-display font-semibold">This escape route doesn&apos;t lead anywhere.</h1>
        <p className="mt-6 max-w-xl text-lg text-white/60">The page you are looking for may have moved. Let us guide you somewhere safer.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg" arrow>Back to home</ButtonLink>
          <ButtonLink href="/systems" size="lg" variant="outline-light">Explore systems</ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outline-light">Contact us</ButtonLink>
        </div>
      </div>
    </section>
  );
}
