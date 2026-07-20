"use client";

export default function EmptyState() {
  return (
    <div className="relative flex flex-1 items-center justify-center p-6">
      <div className="empty-state-core pointer-events-none absolute size-[min(78vw,34rem)]" aria-hidden="true">
        <div className="empty-state-ring empty-state-ring--outer" />
        <div className="empty-state-ring empty-state-ring--middle" />
        <div className="empty-state-ring empty-state-ring--inner" />
        <div className="empty-state-sweep" />
        <span className="empty-state-node empty-state-node--one" />
        <span className="empty-state-node empty-state-node--two" />
        <span className="empty-state-node empty-state-node--three" />
      </div>
      <div className="relative z-10 max-w-lg text-center">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-20 rounded-full bg-violet-500/12 blur-3xl" />
        <h2 className="relative font-mono text-2xl font-semibold text-[var(--accent-bright)] drop-shadow-[0_0_18px_rgba(139,92,246,.35)] md:text-4xl">
          Welcome to AIRIS Prompt Lab
        </h2>

        <p className="relative mx-auto mt-4 max-w-md font-mono text-sm leading-7 text-zinc-400 md:text-base">
          Pick a persona or write your own system prompt, then start chatting.
        </p>
      </div>
    </div>
  );
}
