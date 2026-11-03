"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="flex min-h-[80vh] items-center bg-paper pt-24">
      <div className="container-x">
        <p className="font-mono text-sm text-red">SYSTEM FAULT</p>
        <h1 className="mt-6 max-w-2xl text-display font-semibold">Something went wrong.</h1>
        <p className="mt-6 max-w-xl text-lg text-ink/60">An unexpected error occurred while loading this page. Please try again.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" onClick={reset} arrow>Try again</Button>
          <ButtonLink href="/" size="lg" variant="outline">Back to home</ButtonLink>
        </div>
        {error.digest && <p className="mt-8 font-mono text-xs text-ink/40">Ref: {error.digest}</p>}
      </div>
    </section>
  );
}
