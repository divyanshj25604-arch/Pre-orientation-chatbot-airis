"use client";

export default function EmptyState() {
  return (
    <div className="relative flex flex-1 items-center justify-center p-6">
      <div className="relative max-w-lg text-center">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-20 rounded-full bg-violet-500/10 blur-3xl" />
        <h2 className="relative font-mono text-2xl font-semibold text-[var(--accent-bright)] md:text-4xl">
          Welcome to AIRIS Prompt Lab
        </h2>

        <p className="relative mx-auto mt-4 max-w-md font-mono text-sm leading-7 text-zinc-400 md:text-base">
          Pick a persona or write your own system prompt, then start chatting.
        </p>
      </div>
    </div>
  );
}
