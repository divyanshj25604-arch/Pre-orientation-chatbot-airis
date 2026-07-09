"use client";

import PersonaCard from "./PersonaCard";
import { usePrompt } from "@/hooks/usePrompt";
import { useEffect } from "react";
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
      className={`w-96 h-full flex flex-col border-r border-white p-4 ${className}`}
    >
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-2 gap-2 md:gap-3">
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
      </div>

      <div className="flex flex-col gap-3 pt-3 shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">System Prompt</span>
          <span className="text-xs text-neutral-400">
            {saveState === "editing" && "Editing..."}
            {saveState === "saving" && "Saving..."}
            {saveState === "saved" && "✓ Saved"}
          </span>
        </div>

        <textarea
          className="border rounded-lg p-3 bg-transparent h-56 md:h-96 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
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
