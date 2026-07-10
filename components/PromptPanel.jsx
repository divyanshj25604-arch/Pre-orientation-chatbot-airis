"use client";

import PersonaCard from "./PersonaCard";
import { usePrompt } from "@/hooks/usePrompt";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { useEffect, useState } from "react";
import { AUTO_SAVE_DELAY } from "@/utils/constants";
import { isPromptEmpty, isPromptTooLong } from "@/utils/validators";
import { toast } from "sonner";

const personas = [
  {
    title: "Brutal Senior",
    prompt: "You are a brutally honest senior engineer.",
  },
  {
    title: "Chill Senior",
    prompt: "You are a friendly senior engineer.",
  },
  {
    title: "Placement Mentor",
    prompt: "You help students prepare for placements.",
  },
  {
    title: "Startup Founder",
    prompt: "You advise startup founders.",
  },
  {
    title: "Research Professor",
    prompt: "You answer like an experienced professor.",
  },
  {
    title: "Roast Machine",
    prompt: "You roast the user while still helping.",
  },
];

export default function PromptPanel({
  className = "",
  onPersonaSelect,
  onPromptSaved,
  ...props
}) {
  const {
    prompt,
    setPrompt,
    save,
    saveState,
    setSaveState,
    saving,
  } = usePrompt();
  const [isMobile, setIsMobile] = useState(false);
  const textareaRef = useAutoResizeTextarea({
    value: prompt,
    enabled: isMobile,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mobileQuery.matches);

    updateViewport();
    mobileQuery.addEventListener("change", updateViewport);
    return () => mobileQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (saveState !== "editing") return;

    const timer = setTimeout(() => {
      if (isPromptEmpty(prompt)) {
        toast.error("Prompt cannot be empty");
        return;
      }
      if (isPromptTooLong(prompt)) {
        toast.error("Prompt exceeds 3000 characters");
        return;
      }
      save();
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timer);

  }, [prompt, saveState]);

  return (
    <div
      {...props}
      className={`w-full p-4 md:w-96 md:h-full md:flex md:flex-col md:border-r md:border-white ${className}`}
    >
      <div className="grid grid-cols-2 gap-2 md:min-h-0 md:flex-1 md:overflow-y-auto md:gap-3">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.title}
            title={persona.title}
            prompt={persona.prompt}
            onSelect={(newPrompt) => {
              setPrompt(newPrompt);
              setSaveState("editing");
            }}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-3 md:shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">System Prompt</span>
          <span className="text-xs text-neutral-400">
            {saveState === "editing" && "Editing..."}
            {saveState === "saving" && "Saving..."}
            {saveState === "saved" && "✓ Saved"}
          </span>
        </div>

        <textarea
          ref={textareaRef}
          className="min-h-32 max-h-[50dvh] resize-none overflow-y-auto rounded-lg border bg-transparent p-3 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 md:h-96 md:max-h-none"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setSaveState("editing");
          }}
          placeholder="Write your system prompt..."
        />

        <button
          onClick={async () => {
            if (isPromptEmpty(prompt)) {
              toast.error("Prompt cannot be empty");
              return;
            }
            if (isPromptTooLong(prompt)) {
              toast.error("Prompt exceeds 3000 characters");
              return;
            }
            await save(true);
            onPromptSaved?.();
          }}
          disabled={saving}
          className="border rounded-lg p-3 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Prompt"}
        </button>
      </div>
    </div>
  );
}
