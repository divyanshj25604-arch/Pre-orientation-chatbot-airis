"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  savePrompt,
  getPrompt,
} from "@/services/promptService";

export function usePrompt() {
  const [prompt, setPrompt] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPrompt();
  }, []);

  async function loadPrompt() {
    const conversationId = Number(
      localStorage.getItem("conversationId")
    );

    if (!conversationId) return;

    try {
      const data = await getPrompt(
        conversationId
      );

      setPrompt(data.systemPrompt ?? "");
    } catch (err) {
      console.error(err);
    }
  }

  async function save() {
    const conversationId = Number(
      localStorage.getItem("conversationId")
    );

    try {
      setSaving(true);

      await savePrompt(
        conversationId,
        prompt
      );

      toast.success("Prompt saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save prompt");
    } finally {
      setSaving(false);
    }
  }

  return {
    prompt,
    setPrompt,
    save,
    saving,
  };
}