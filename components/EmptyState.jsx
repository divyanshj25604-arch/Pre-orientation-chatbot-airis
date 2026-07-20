"use client";

export default function EmptyState() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6">
      <div className="pointer-events-none absolute size-[min(78vw,38rem)] rounded-full border border-violet-300/20 shadow-[0_0_0_28px_rgba(139,92,246,.025),0_0_0_56px_rgba(139,92,246,.018),0_0_70px_rgba(139,92,246,.16)]" />
      <div className="pointer-events-none absolute size-[min(54vw,25rem)] rounded-full border border-violet-200/15 border-dashed" />
      <div className="relative max-w-lg text-center">
        <p className="hud-label mb-5">Prompt analysis · ready</p>
        <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-violet-300/60 to-transparent shadow-[0_0_10px_rgba(139,92,246,.7)]" />
        <h2 className="font-mono text-2xl font-semibold text-[var(--accent-bright)] drop-shadow-[0_0_14px_rgba(139,92,246,.55)] md:text-4xl">
          Welcome to AIRIS Prompt Lab
        </h2>

        <p className="mx-auto mt-4 max-w-md font-mono text-sm leading-7 text-violet-100/70 md:text-base">
          Pick a persona or write your own system prompt, then start chatting.
        </p>
      </div>
    </div>
  );
}
