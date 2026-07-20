"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
    savePrompt,
    getPrompt,
} from "@/services/promptService";
import { getPromptValidationError } from "@/utils/validators";

export function usePrompt() {
    const [prompt, setPrompt] = useState("");
    const [saveState, setSaveState] = useState("saved");
    // "editing" | "saving" | "saved"

    const saving = saveState === "saving";

    const loadPrompt = useCallback(async () => {
        const conversationId = Number(
            localStorage.getItem("conversationId")
        );

        if (!conversationId) return;

        try {
            const data = await getPrompt(
                conversationId
            );

            setPrompt(data.systemPrompt ?? "");

            localStorage.setItem(
                "systemPrompt",
                data.systemPrompt ?? ""
            );
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void loadPrompt();
        }, 0);

        return () => window.clearTimeout(timer);
    }, [loadPrompt]);

    const save = useCallback(async (showToast = false) => {
        const conversationId = Number(
            localStorage.getItem("conversationId")
        );

        const validationError = getPromptValidationError(prompt);

        if (validationError) {
            setSaveState("editing");
            toast.error(validationError);
            return;
        }

        try {
            setSaveState("saving");

            await savePrompt(conversationId, prompt);

            localStorage.setItem("systemPrompt", prompt);

            setSaveState("saved");

            if (showToast) {
                toast.success("Prompt saved");
            }
        } catch (err) {
            console.error(err);

            setSaveState("editing");

            toast.error("Failed to save prompt");
        }
    }, [prompt]);

    return {
        prompt,
        setPrompt,
        save,
        saveState,
        setSaveState,
        saving,
        hasPrompt: prompt.trim().length > 0,
    };
}