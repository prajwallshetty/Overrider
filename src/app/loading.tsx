export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper pt-24" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-px w-40 overflow-hidden bg-ink/10">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-[loading_1.1s_ease-in-out_infinite] bg-red" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">Loading</p>
      </div>
    </div>
  );
}
