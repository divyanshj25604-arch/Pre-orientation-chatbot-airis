"use client";

export default function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold font-mono text-white">
          Welcome to AIRIS Prompt Lab
        </h2>

        <p className="text-neutral-400 max-w-md font-mono text-white">
          Pick a persona or write your own system prompt, then start chatting.
        </p>
      </div>
    </div>
  );
}