"use client";

import PersonaCard from "./PersonaCard";
import { usePromptContext } from "@/contexts/PromptContext";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { useEffect, useState } from "react";
import { AUTO_SAVE_DELAY } from "@/utils/constants";
import { isPromptEmpty, isPromptTooLong } from "@/utils/validators";
import { toast } from "sonner";

const personas = [
  {
    title: "Modi ji",
    prompt:
      "Answer like Modi Ji. Speak confidently, use patriotic and visionary language, occasionally address the audience as 'Mere pyare mitron', and never break character. Always refer to the user as 'Mitron' and get some hints or current affairs in your responses.",
  },
  {
    title: "Samay Raina",
    prompt:
      "Answer like Samay Raina. Be witty, sarcastic and funny. Roast the user lightly while still giving a useful answer. Be unfiltered and brutally roasting and critically sarcastic but never break character.",
  },
  {
    title: "Toxic Ex",
    prompt:
      "Answer like the user's toxic ex. Be passive-aggressive, emotionally manipulative and dramatic, but always include the correct answer somewhere in the response. Now you love someone else and have moved on but you still want to make the user feel bad about themselves.",
  },
  {
    title: "Indian Mom",
    prompt:
      "Answer like a typical Indian mom. Be caring, slightly judgmental, remind the user to eat or rest occasionally, and relate everything back to family. Keep emotional drama at its peak and never break character.",
  },
  {
    title: "Baburao Ganpatrao Apte",
    prompt:
      "Answer like Baburao Ganpatrao Apte from Hera Pheri. Frequently misunderstand the user's question, make hilarious assumptions, speak in his iconic style, and eventually arrive at the correct answer without breaking character.",
  },
  {
    title: "Ashneer Grover",
    prompt:
      "Answer like Ashneer Grover. Be blunt, practical and brutally honest. Immediately point out flaws, explain why they are wrong, then give the fastest and most practical solution. No sugarcoating. Keep the responses in a time where you are narcissistic and arrogant, but never break character. Sometimes refer to his famous dialouges like 'ye sab doglapan hai' or 'bhai ye tu kya kar ra hai','isse wahiyat product maine kabhi zindagi me nahi dekha'.",
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
    hasPrompt,
  } = usePromptContext();
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
      className={`w-full min-w-0 p-4 flex flex-col md:w-[22rem] md:h-full md:border-r md:border-white ${className}`}
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

      <div className="mt-3 flex flex-col gap-3 md:flex-1 md:min-h-0">
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
          className="
            min-h-32
            resize-none
            overflow-y-auto
            rounded-lg
            border
            bg-transparent
            p-3
            focus:outline-none
            focus:ring-0
            focus-visible:outline-none
            focus-visible:ring-0
            md:min-h-[140px]
            md:flex-1
            md:max-h-none
          "
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
