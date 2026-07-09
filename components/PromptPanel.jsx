"use client";

import PersonaCard from "./PersonaCard";
import { usePrompt } from "@/hooks/usePrompt";
import { useEffect } from "react";
import { AUTO_SAVE_DELAY } from "@/utils/constants";
import { isValidPrompt } from "@/utils/validators";
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

export default function PromptPanel() {
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
    <div className="w-96 border-r border-white p-4 flex flex-col h-full">

      {/* TOP */}
      <div className="grid grid-cols-2 gap-3">
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

      {/* BOTTOM */}
      <div className="mt-auto flex flex-col gap-3">

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            System Prompt
          </span>

          <span className="text-xs text-neutral-400">
            {saveState === "editing" && "Editing..."}
            {saveState === "saving" && "Saving..."}
            {saveState === "saved" && "✓ Saved"}
          </span>
        </div>

        <textarea
          className="border rounded-lg p-3 h-84 bg-transparent"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setSaveState("editing");
          }}
          placeholder="Write your system prompt..."
        />

        <button
          onClick={() => {
            if (isPromptEmpty(prompt)) {
              toast.error("Prompt cannot be empty");
              return;
            }
            if (isPromptTooLong(prompt)) {
              toast.error("Prompt exceeds 3000 characters");
              return;
            }

            save(true);
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