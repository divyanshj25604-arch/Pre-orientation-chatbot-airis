"use client";

import PersonaCard from "./PersonaCard";
import { usePrompt } from "@/hooks/usePrompt";
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
    saving,
  } = usePrompt();

  return (
    <div className="w-96 border-r p-4 flex flex-col gap-4">

      <div className="grid grid-cols-2 gap-3">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.title}
            title={persona.title}
            prompt={persona.prompt}
            onSelect={setPrompt}
          />
        ))}
      </div>

      <textarea
        className="border rounded-lg p-3 h-64 bg-transparent"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your system prompt..."
      />

      <button
        onClick={save}
        disabled={saving}
        className="border rounded-lg p-3"
      >
        {saving ? "Saving..." : "Save Prompt"}
      </button>

    </div>
  );
}