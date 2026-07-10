"use client";

import { createContext, useContext } from "react";
import { usePrompt } from "@/hooks/usePrompt";

const PromptContext = createContext(null);

export function PromptProvider({ children }) {
  const prompt = usePrompt();

  return (
    <PromptContext.Provider value={prompt}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePromptContext() {
  return useContext(PromptContext);
}