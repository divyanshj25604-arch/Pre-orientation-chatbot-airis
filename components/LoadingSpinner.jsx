"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-start">
      <div className="rounded-xl px-4 py-3">
        <div className="flex gap-2">

          <div className="h-2 w-2 rounded-full bg-white animate-bounce" />

          <div
            className="h-2 w-2 rounded-full bg-white animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />

          <div
            className="h-2 w-2 rounded-full bg-white animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />

        </div>
      </div>
    </div>
  );
}