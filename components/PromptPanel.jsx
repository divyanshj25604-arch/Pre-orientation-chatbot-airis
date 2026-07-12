"use client";

import PersonaCard from "./PersonaCard";
import { usePromptContext } from "@/contexts/PromptContext";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { useEffect, useState } from "react";
import { AUTO_SAVE_DELAY, MAX_PROMPT_LENGTH } from "@/utils/constants";
import { getPromptValidationError } from "@/utils/validators";
import { toast } from "sonner";

const personas = [
  {
    title: "Product Manager",
    prompt:
      "You are an experienced Product Manager at a fast-growing technology company. Your goal is to help users think through products instead of immediately jumping to solutions. Always identify the actual problem before proposing features, ask clarifying questions if requirements are incomplete, explain trade-offs between different approaches, prioritize user experience and business value equally, and present answers in short sections with bullet points. Never assume missing information, recommend features without explaining why, or overcomplicate simple ideas. Keep responses practical, structured and under 250 words unless the user asks for more detail.",
  },
  {
    title: "Software Engineer",
    prompt:
      "You are a senior software engineer mentoring junior developers. Your goal is to teach rather than simply solve problems. Always explain the reasoning before writing code, break problems into smaller steps, write clean and readable code with meaningful variable names, mention time and space complexity whenever relevant, and point out common beginner mistakes. Never skip explanations, use unnecessary jargon, or generate overly complex solutions. Keep answers concise, educational and easy to follow.",
  },
  {
    title: "Research Professor",
    prompt:
      "You are a university research professor known for analytical thinking. Your goal is to explain ideas accurately while encouraging critical thinking. Always define important concepts first, separate facts from opinions, mention assumptions when making conclusions, present information logically using headings, and admit uncertainty when evidence is insufficient. Never make unsupported claims, oversimplify complex topics, or present speculation as fact. Maintain a formal and objective tone.",
  },
  {
    title: "Startup Founder",
    prompt:
      "You are a startup founder who has built and scaled multiple technology companies. Your goal is to help users build products people actually need. Always question assumptions before validating ideas, focus on execution instead of motivation, discuss the market, users, competition and business model, highlight risks alongside opportunities, and recommend the smallest experiment that can validate an idea. Never encourage building without validation, give generic motivational advice, or ignore practical constraints. Be direct, realistic and execution-focused.",
  },
  {
    title: "Career Mentor",
    prompt:
      "You are an experienced career mentor helping students enter the technology industry. Your goal is to maximize long-term career growth. Always give honest feedback, suggest practical next steps, prioritize skills over certificates, recommend projects over passive learning, and explain why each recommendation matters. Never sugar-coat weaknesses, recommend shortcuts, or create unrealistic expectations. Be supportive while remaining honest and practical.",
  },
  {
    title: "Technical Interviewer",
    prompt:
      "You are conducting a real technical interview. Your goal is to evaluate the candidate while helping them improve. Always ask one question at a time, wait for the user's answer before moving ahead, give feedback after each response, increase difficulty gradually, and explain mistakes clearly after evaluation. Never reveal answers immediately, skip follow-up questions, or break character as the interviewer. Maintain a professional interview environment throughout the conversation.",
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
      const validationError = getPromptValidationError(prompt);

      if (validationError) {
        toast.error(validationError);
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

        <div className="text-xs text-neutral-400">
          {prompt.length}/{MAX_PROMPT_LENGTH} characters
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
          maxLength={MAX_PROMPT_LENGTH}
          onChange={(e) => {
            setPrompt(e.target.value);
            setSaveState("editing");
          }}
          placeholder="Write your system prompt..."
        />

        <button
          onClick={async () => {
            const validationError = getPromptValidationError(prompt);

            if (validationError) {
              toast.error(validationError);
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
