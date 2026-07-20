"use client";

import { useState } from "react";
import { MAX_MESSAGE_LENGTH } from "@/utils/constants";
import { getMessageValidationError } from "@/utils/validators";
import { toast } from "sonner";

export default function ChatInput({
    onSend,
    loading,
    hasPrompt,
    className = "",
}) {
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (loading) return;

        const validationError = getMessageValidationError(text);

        if (validationError) {
            toast.error(validationError);
            return;
        }

        const message = text;

        setText("");

        await onSend(message);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex w-full min-w-0 shrink-0 gap-3 border-t border-[var(--hud-border)] bg-[#080916]/90 p-4 shadow-[0_-10px_30px_rgba(0,0,0,.22)] backdrop-blur-xl ${className}`}
        >
            <input
                value={text}
                maxLength={MAX_MESSAGE_LENGTH}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (loading && e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                disabled={!hasPrompt || loading}
                placeholder={
                    hasPrompt
                        ? "Ask AIRIS anything..."
                        : "Save a system prompt first..."
                }
                className="
                  min-w-0
                  flex-1
                  rounded-md
                  border border-[var(--hud-border)]
                  bg-[#060711]/90
                  font-mono
                  px-4
                  py-2
                  h-14
                  outline-none
                  ring-0
                  focus:ring-0
                  focus-visible:ring-0
                  focus:outline-none
                  text-violet-50 placeholder:text-violet-100/35
                  focus:border-[var(--accent-bright)]
                  focus:shadow-[0_0_14px_rgba(139,92,246,.2)]
                "
            />

            <button
                disabled={!hasPrompt || loading}
                className="hud-button h-14 shrink-0 rounded-md px-6 disabled:opacity-50"
            >
                {loading ? "Thinking..." : "Send"}
            </button>
        </form>
    );
}
