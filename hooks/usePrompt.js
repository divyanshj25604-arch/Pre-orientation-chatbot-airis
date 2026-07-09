"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    savePrompt,
    getPrompt,
} from "@/services/promptService";

export function usePrompt() {
    const [prompt, setPrompt] = useState("");
    const [saveState, setSaveState] = useState("saved");
    // "editing" | "saving" | "saved"

    const saving = saveState === "saving";

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

    async function save(showToast = false) {
        const conversationId = Number(
            localStorage.getItem("conversationId")
        );

        try {
            setSaveState("saving");

            await savePrompt(conversationId, prompt);

            setSaveState("saved");

            if (showToast) {
                toast.success("Prompt saved");
            }
        } catch (err) {
            console.error(err);

            setSaveState("editing");

            toast.error("Failed to save prompt");
        }
    }

    return {
        prompt,
        setPrompt,
        save,
        saveState,
        setSaveState,
        saving,
    };
}