"use client";

export default function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold">
          Welcome to AIRIS Prompt Lab
        </h2>

        <p className="text-neutral-400 max-w-md">
          Pick a persona or write your own system prompt, then start chatting.
        </p>
      </div>
    </div>
  );
}