"use client";

import PersonaCard from "./PersonaCard";
import { usePrompt } from "@/hooks/usePrompt";
import { useEffect } from "react";

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
      save();
    }, 5000);

    return () => clearTimeout(timer);

  }, [prompt, saveState]);

  return (
    <div className="w-96 border-r p-4 flex flex-col gap-4">

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
        className="border rounded-lg p-3 h-64 bg-transparent"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          setSaveState("editing");
        }}
        placeholder="Write your system prompt..."
      />

      <button
        onClick={() => save(true)}
        disabled={saving}
        className="border rounded-lg p-3 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Prompt"}
      </button>
    </div>
  );
}